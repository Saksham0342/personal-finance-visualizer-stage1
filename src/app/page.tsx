'use client';

import { useState } from 'react';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import MonthlyBarChart from '@/components/MonthlyBarChart';
import type { Transaction } from '@/types/transaction'; // Adjust the import path as needed

export default function Home() {
  const [refresh, setRefresh] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-tr from-blue-100 via-indigo-100 to-white py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-10">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
            💰 Personal Finance Visualizer
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Track, edit and manage your expenses beautifully.
          </p>
        </div>

        <TransactionForm
          onSubmit={() => setRefresh(!refresh)}
          editingTransaction={editingTransaction}
          clearEditing={() => setEditingTransaction(null)}
        />
        <TransactionList
          refresh={refresh}
          setEditingTransaction={setEditingTransaction}
        />
        <MonthlyBarChart refresh={refresh} />
      </div>
    </main>
  );
}
