import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

// Answers one accounting question from the indexed sources (Plan Comptable
// Marocain and Loi de finances 2026). Retrieval runs here, on the server, so the
// AI and search keys never reach the browser and the question limit cannot be
// skipped by calling a backend directly.

const MAX_QUESTIONS = 3;
const RESET_INTERVAL = 72 * 60 * 60; // seconds
const MAX_QUESTION_LENGTH = 500;
const TOP_K = 6;
const EMBEDDING_MODEL = 'openai/text-embedding-3-small';
const CHAT_MODEL = 'openai/gpt-4o-mini';
const NAMESPACE = 'v2';

const SYSTEM_PROMPT = `Tu es un assistant comptable pour le Maroc. Tu réponds uniquement à partir des extraits fournis (Plan Comptable Marocain PCGE et Loi de finances 2026, BO 7465 bis).
Règles :
- Réponds dans la langue de la question (français ou arabe), de façon courte et claire.
- Cite les numéros de comptes ou d'articles quand ils figurent dans les extraits.
- Termine par une ligne « Source : » avec le nom du ou des documents utilisés.
- Si les extraits ne contiennent pas la réponse, dis-le simplement et conseille de vérifier avec un expert-comptable. N'invente jamais un taux, un compte ou un article.`;

interface Match {
  score?: number;
  metadata?: { text?: string; source?: string };
}

function getIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  if (forwarded) return forwarded.split(',')[0].trim();
  if (realIP) return realIP.trim();
  return 'unknown';
}

function missingConfig(): string[] {
  return ['OPENROUTER_API_KEY', 'PINECONE_API_KEY', 'PINECONE_INDEX_HOST', 'UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN']
    .filter((name) => !process.env[name]);
}

async function embed(question: string): Promise<number[]> {
  const res = await fetch('https://openrouter.ai/api/v1/embeddings', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: EMBEDDING_MODEL, input: question }),
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) throw new Error(`embedding ${res.status}`);
  const data = await res.json();
  return data.data[0].embedding;
}

async function search(vector: number[]): Promise<Match[]> {
  const res = await fetch(`https://${process.env.PINECONE_INDEX_HOST}/query`, {
    method: 'POST',
    headers: {
      'Api-Key': process.env.PINECONE_API_KEY as string,
      'Content-Type': 'application/json',
      'X-Pinecone-API-Version': '2025-04',
    },
    body: JSON.stringify({ vector, topK: TOP_K, includeMetadata: true, namespace: NAMESPACE }),
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) throw new Error(`search ${res.status}`);
  const data = await res.json();
  return data.matches ?? [];
}

async function answer(question: string, matches: Match[]): Promise<string> {
  const context = matches
    .filter((m) => m.metadata?.text)
    .map((m, i) => `[${i + 1}] (${m.metadata?.source ?? 'source inconnue'})\n${m.metadata?.text}`)
    .join('\n\n');
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: CHAT_MODEL,
      temperature: 0.1,
      max_tokens: 700,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Extraits :\n${context || '(aucun extrait trouvé)'}\n\nQuestion : ${question}` },
      ],
    }),
    signal: AbortSignal.timeout(40000),
  });
  if (!res.ok) throw new Error(`chat ${res.status}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? '';
}

export async function POST(request: NextRequest) {
  const missing = missingConfig();
  if (missing.length) {
    console.error('ask: missing configuration', missing.join(', '));
    return NextResponse.json({ error: 'unavailable' }, { status: 503 });
  }

  let question = '';
  try {
    const body = await request.json();
    question = typeof body?.question === 'string' ? body.question.trim() : '';
  } catch {
    return NextResponse.json({ error: 'invalid' }, { status: 400 });
  }
  if (!question || question.length > MAX_QUESTION_LENGTH) {
    return NextResponse.json({ error: 'invalid' }, { status: 400 });
  }

  // Count the question before answering. INCR is atomic, so parallel requests
  // from one address cannot slip past the limit.
  const redis = new Redis({ url: process.env.UPSTASH_REDIS_REST_URL!, token: process.env.UPSTASH_REDIS_REST_TOKEN! });
  const key = `rl:${getIP(request)}`;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, RESET_INTERVAL);
  if (count > MAX_QUESTIONS) {
    const ttl = await redis.ttl(key);
    return NextResponse.json(
      { allowed: false, remaining: 0, resetIn: ttl > 0 ? Math.ceil(ttl / 3600) : 0 },
      { status: 429 },
    );
  }

  try {
    const matches = await search(await embed(question));
    const text = await answer(question, matches);
    return NextResponse.json({ answer: text, remaining: Math.max(0, MAX_QUESTIONS - count) });
  } catch (error) {
    console.error('ask: failed', error instanceof Error ? error.message : 'unknown');
    // A failed answer should not cost the visitor one of their questions.
    await redis.decr(key);
    return NextResponse.json({ error: 'failed' }, { status: 502 });
  }
}
