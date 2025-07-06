'use client';

import { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';

type Transaction = {
  _id: string;
  amount: number;
  date: string;
};

type ChartData = {
  month: string;
  total: number;
};

export default function MonthlyBarChart({ refresh }: { refresh: boolean }) {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/transactions');
      const transactions: Transaction[] = await res.json();

      const monthlyTotals: { [key: string]: number } = {};

      for (const t of transactions) {
        const date = new Date(t.date);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        monthlyTotals[key] = (monthlyTotals[key] || 0) + t.amount;
      }

      const chartData: ChartData[] = Object.entries(monthlyTotals).map(([month, total]) => ({
        month,
        total,
      }));

      chartData.sort((a, b) => a.month.localeCompare(b.month));
      setData(chartData);
    }

    fetchData();
  }, [refresh]);

  return (
    <div className="mt-10 p-6 bg-white/70 backdrop-blur-sm rounded-2xl border shadow-xl">
      <h2 className="text-xl font-semibold text-indigo-700 mb-4">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
