import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { Transaction } from '@/models/Transaction';

export async function GET() {
  await connectDB();
  const data = await Transaction.find().sort({ date: -1 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const created = await Transaction.create(body);
  return NextResponse.json(created);
}
