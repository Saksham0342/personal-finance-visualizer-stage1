import { useState, useEffect } from "react";
import { Transaction } from "@/types/transaction";

export default function TransactionForm({
  onSubmit,
  editingTransaction,
  clearEditing,
}: {
  onSubmit: () => void;
  editingTransaction: Transaction | null;
  clearEditing: () => void;
}) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (editingTransaction) {
      setAmount(editingTransaction.amount.toString());
      setDescription(editingTransaction.description);
      setDate(editingTransaction.date.substring(0, 10)); // trim ISO
    }
  }, [editingTransaction]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!amount || !description || !date) {
      alert("Please fill out all fields");
      return;
    }

    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      alert("Amount must be a number greater than zero");
      return;
    }

    if (description.trim().length < 3) {
      alert("Description must be at least 3 characters");
      return;
    }

    const payload = {
      amount: Number(amount),
      description,
      date,
    };

    if (editingTransaction) {
      await fetch("/api/transactions/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingTransaction._id,
          amount,
          description,
          date,
        }),
      });
      clearEditing();
    } else {
      await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    setAmount("");
    setDescription("");
    setDate("");
    onSubmit();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/70 backdrop-blur-sm shadow-xl p-6 rounded-xl border space-y-4 transition"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        {editingTransaction ? "✏️ Edit Transaction" : "➕ Add Transaction"}
      </h2>

      {/* Fields same as before */}
      <input
        className="w-full px-4 py-2 border rounded"
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        className="w-full px-4 py-2 border rounded"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        className="w-full px-4 py-2 border rounded"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {editingTransaction ? "Update" : "Add"}
        </button>
        {editingTransaction && (
          <button
            type="button"
            onClick={clearEditing}
            className="flex-1 bg-gray-300 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
