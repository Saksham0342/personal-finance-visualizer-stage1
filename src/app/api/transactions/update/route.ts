import { connectDB } from '@/lib/mongoose';
import { Transaction } from '@/models/Transaction';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { id, amount, description, date } = await request.json();

    if (!id || !amount || !description || !date) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const updated = await Transaction.findByIdAndUpdate(
      id,
      { amount, description, date },
      { new: true }
    );

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Update failed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
