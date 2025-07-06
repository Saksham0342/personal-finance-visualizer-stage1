"use client";

import { useEffect, useState } from "react";

import { Transaction } from "@/types/transaction";

export default function TransactionList({
  refresh,
  setEditingTransaction,
}: {
  refresh: boolean;
  setEditingTransaction: (t: Transaction) => void;
}) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function fetchData() {
    const res = await fetch("/api/transactions");
    const data = await res.json();
    setTransactions(data);
  }

  async function deleteTransaction(id: string) {
    await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    fetchData();
  }

  useEffect(() => {
    fetchData();
  }, [refresh]);

  return (
    <div className="bg-white/70 backdrop-blur-sm border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md hover:scale-[1.01] transition-all">
      <h2 className="text-xl font-semibold text-gray-800">All Transactions</h2>
      {transactions.map((t) => (
        <div key={t._id} className="flex justify-between items-center m-4">
          <div>
            <p className="text-lg font-bold text-green-600">₹{t.amount}</p>
            <p className="text-sm text-gray-700">{t.description}</p>
            <p className="text-xs text-gray-400">
              {new Date(t.date).toLocaleDateString()}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setEditingTransaction(t)}
              className="text-blue-500 hover:text-blue-700 font-semibold transition"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTransaction(t._id!)}
              className="text-red-500 hover:text-red-700 font-semibold transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
