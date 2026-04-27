import { NextRequest, NextResponse } from 'next/server';

const MAX_QUESTIONS = 3;
const questionCounts = new Map<string, number>();

export async function POST(request: NextRequest) {
  // Get IP address
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
  
  // Get current count
  const currentCount = questionCounts.get(ip) || 0;
  
  // Check if limit reached
  if (currentCount >= MAX_QUESTIONS) {
    return NextResponse.json({
      allowed: false,
      remaining: 0,
      message: 'Limite de questions atteinte. Ceci est une version de test.'
    });
  }
  
  // Increment count
  questionCounts.set(ip, currentCount + 1);
  
  return NextResponse.json({
    allowed: true,
    remaining: MAX_QUESTIONS - (currentCount + 1),
    message: 'Question autorisée'
  });
}

export async function GET(request: NextRequest) {
  // Get IP address
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
  
  // Get current count
  const currentCount = questionCounts.get(ip) || 0;
  
  return NextResponse.json({
    used: currentCount,
    remaining: MAX_QUESTIONS - currentCount,
    total: MAX_QUESTIONS
  });
}
