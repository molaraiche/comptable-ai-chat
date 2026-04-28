import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const MAX_QUESTIONS = 3;
const RESET_INTERVAL = 72 * 60 * 60; // 72 hours in seconds

function getIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  if (forwarded) return forwarded.split(',')[0].trim();
  if (realIP) return realIP.trim();
  return 'unknown';
}

export async function GET(request: NextRequest) {
  const ip = getIP(request);
  const key = `rl:${ip}`;

  const count = (await redis.get<number>(key)) ?? 0;
  const ttl = await redis.ttl(key);
  const hoursUntilReset = ttl > 0 ? Math.ceil(ttl / 3600) : RESET_INTERVAL / 3600;

  return NextResponse.json({
    used: count,
    remaining: Math.max(0, MAX_QUESTIONS - count),
    total: MAX_QUESTIONS,
    resetIn: hoursUntilReset,
  });
}

export async function POST(request: NextRequest) {
  const ip = getIP(request);
  const key = `rl:${ip}`;

  const count = (await redis.get<number>(key)) ?? 0;

  if (count >= MAX_QUESTIONS) {
    const ttl = await redis.ttl(key);
    const hoursUntilReset = ttl > 0 ? Math.ceil(ttl / 3600) : 0;
    return NextResponse.json({
      allowed: false,
      remaining: 0,
      resetIn: hoursUntilReset,
      message: `Limite atteinte. Réinitialisation dans ${hoursUntilReset}h.`,
    });
  }

  // Increment and set TTL only on first question
  const newCount = count + 1;
  await redis.set(key, newCount, { ex: RESET_INTERVAL, keepTtl: count > 0 });

  const ttl = await redis.ttl(key);
  const hoursUntilReset = ttl > 0 ? Math.ceil(ttl / 3600) : RESET_INTERVAL / 3600;

  return NextResponse.json({
    allowed: true,
    remaining: Math.max(0, MAX_QUESTIONS - newCount),
    resetIn: hoursUntilReset,
    message: 'Question autorisée',
  });
}
