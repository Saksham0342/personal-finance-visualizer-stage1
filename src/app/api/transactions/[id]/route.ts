import { connectDB } from '@/lib/mongoose';
import { Transaction } from '@/models/Transaction';
import { NextRequest, NextResponse } from 'next/server';

// ✅ Correct handler for DELETE
export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  await connectDB();
  await Transaction.findByIdAndDelete(context.params.id);
  return NextResponse.json({ success: true });
}
