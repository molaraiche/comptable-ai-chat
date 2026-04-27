import { NextRequest, NextResponse } from 'next/server';

const MAX_QUESTIONS = 3;
const RESET_INTERVAL = 72 * 60 * 60 * 1000; // 72 hours in milliseconds

interface RateLimitData {
  count: number;
  resetTime: number;
}

const questionCounts = new Map<string, RateLimitData>();

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of questionCounts.entries()) {
    if (now >= data.resetTime) {
      questionCounts.delete(ip);
    }
  }
}, 60 * 60 * 1000); // Clean up every hour

export async function POST(request: NextRequest) {
  // Get IP address
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
  
  const now = Date.now();
  
  // Get current data
  let data = questionCounts.get(ip);
  
  // Reset if expired
  if (!data || now >= data.resetTime) {
    data = {
      count: 0,
      resetTime: now + RESET_INTERVAL
    };
    questionCounts.set(ip, data);
  }
  
  // Check if limit reached
  if (data.count >= MAX_QUESTIONS) {
    const hoursUntilReset = Math.ceil((data.resetTime - now) / (60 * 60 * 1000));
    return NextResponse.json({
      allowed: false,
      remaining: 0,
      resetIn: hoursUntilReset,
      message: `Limite atteinte. Réinitialisation dans ${hoursUntilReset}h.`
    });
  }
  
  // Increment count
  data.count++;
  questionCounts.set(ip, data);
  
  const hoursUntilReset = Math.ceil((data.resetTime - now) / (60 * 60 * 1000));
  
  return NextResponse.json({
    allowed: true,
    remaining: MAX_QUESTIONS - data.count,
    resetIn: hoursUntilReset,
    message: 'Question autorisée'
  });
}

export async function GET(request: NextRequest) {
  // Get IP address
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
  
  const now = Date.now();
  
  // Get current data
  let data = questionCounts.get(ip);
  
  // Reset if expired
  if (!data || now >= data.resetTime) {
    data = {
      count: 0,
      resetTime: now + RESET_INTERVAL
    };
    questionCounts.set(ip, data);
  }
  
  const hoursUntilReset = Math.ceil((data.resetTime - now) / (60 * 60 * 1000));
  
  return NextResponse.json({
    used: data.count,
    remaining: MAX_QUESTIONS - data.count,
    total: MAX_QUESTIONS,
    resetIn: hoursUntilReset
  });
}
