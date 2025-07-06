import { connectDB } from '@/lib/mongoose';
import { Transaction } from '@/models/Transaction';
import { NextRequest, NextResponse } from 'next/server';

// ✅ Correct handler for DELETE
export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  await connectDB();
  await Transaction.findByIdAndDelete(context.params.id);
  return NextResponse.json({ success: true });
}

// ✅ Correct handler for PUT
export async function PUT(req: Request, context: { params: { id: string } }) {
  const { id } = context.params;
  const body = await req.json();
  const { amount, description, date } = body;

  try {
    await connectDB();
    const updated = await Transaction.findByIdAndUpdate(
      id,
      { amount, description, date },
      { new: true }
    );

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to update transaction' },
      { status: 500 }
    );
  }
}
