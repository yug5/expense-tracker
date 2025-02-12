"use client";

import { ChevronLeft, ChevronRight, X, Pencil } from "lucide-react";
import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebaseConfig";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { useBalance } from "@/context/balance";
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function Inex() {
  const { refreshBalance } = useBalance();
  const { user } = useAuth();
  const [currentMonthIndex, setCurrentMonthIndex] = useState(
    new Date().getMonth()
  );
  interface Transaction {
    id: string;
    userId: string;
    name: string;
    emoji?: string; // Ensure emoji exists and is optional
    amount: number;
    type: "income" | "expense";
    date: string;
    description?: string;
  }

  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [transactions, setTransactions] = useState<
    Record<string, Transaction[]>
  >({});

  const [isEditing, setIsEditing] = useState(false);
  const [editedAmount, setEditedAmount] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "transactions"),
      where("userId", "==", user.uid),
      where("month", "==", monthNames[currentMonthIndex])
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const groupedData = data.reduce((acc, tx) => {
        const date = tx.date.split("T")[0];
        if (!acc[date]) acc[date] = [];
        acc[date].push(tx);
        return acc;
      }, {});
      setTransactions(groupedData);
    });
    return () => unsubscribe();
  }, [user, currentMonthIndex]);

  const handleMonthChange = (direction) => {
    setCurrentMonthIndex((prev) =>
      direction === "prev"
        ? prev === 0
          ? 11
          : prev - 1
        : prev === 11
        ? 0
        : prev + 1
    );
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "transactions", id));
    setSelectedTransaction(null);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedAmount(selectedTransaction.amount);
    setEditedDescription(selectedTransaction.description || "");
  };

  const handleSaveEdit = async () => {
    if (!selectedTransaction) return;

    const transactionRef = doc(db, "transactions", selectedTransaction.id);
    await updateDoc(transactionRef, {
      amount: parseFloat(editedAmount),
      description: editedDescription,
    });

    setIsEditing(false);
    setSelectedTransaction(null);
  };

  return (
    <div className="h-[700px] md:h-[800px] p-10 m-5 rounded-lg shadow-md shadow-gray-200">
      <div className="flex flex-row text-2xl justify-around">
        <ChevronLeft
          size={26}
          className="rounded-full hover:bg-gray-100 transition-all duration-75 cursor-pointer"
          onClick={() => handleMonthChange("prev")}
        />
        <div className="text-3xl font-normal text-black">
          {monthNames[currentMonthIndex]}
        </div>
        <ChevronRight
          size={26}
          className="rounded-full hover:bg-gray-100 transition-all duration-75 cursor-pointer"
          onClick={() => handleMonthChange("next")}
        />
      </div>
      <div className="shadow-inner shadow-slate-100 p-3 mt-10 h-[90%] rounded-2xl overflow-y-auto">
        {Object.entries(transactions).map(([date, txs]) => (
          <div key={date} className="mb-4">
            <div className="text-sm text-black font-semibold mt-4">{date}</div>
            <hr className="border-gray-300 mb-2" />
            {txs.map((tx) => (
              <div
                key={tx.id}
                className="shadow-md rounded-lg flex justify-between text-2xl p-5 shadow-gray-200 w-full cursor-pointer"
                onClick={() => setSelectedTransaction(tx)}
              >
                <span>
                  {tx.emoji} {tx.name}
                </span>
                <span
                  className={
                    tx.type === "income" ? "text-green-500" : "text-red-500"
                  }
                >
                  {tx.type === "income" ? "+₹" : "-₹"}
                  {tx.amount}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {selectedTransaction && !isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg w-[400px] max-w-full">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold">Transaction Details</h2>
              <button
                onClick={() => setSelectedTransaction(null)}
                className="text-gray-600 hover:text-black"
              >
                <X size={20} />
              </button>
            </div>
            <div className="mt-4 text-lg">
              <p>
                <strong>Category:</strong> {selectedTransaction.emoji}{" "}
                {selectedTransaction.name}
              </p>
              <p>
                <strong>Amount:</strong>{" "}
                {selectedTransaction.type === "income" ? "+₹" : "-₹"}
                {selectedTransaction.amount}
              </p>
              <p>
                <strong>Date:</strong> {selectedTransaction.date.split("T")[0]}
              </p>
              {selectedTransaction.description && (
                <p>
                  <strong>Description:</strong>{" "}
                  {selectedTransaction.description}
                </p>
              )}
            </div>
            <div className="mt-4 flex justify-between">
              <button
                className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
                onClick={handleEdit}
              >
                <Pencil size={18} /> Edit
              </button>
              <button
                className="text-red-500 hover:text-red-700 flex items-center gap-1"
                onClick={() => handleDelete(selectedTransaction.id)}
              >
                <X size={18} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg w-[400px] max-w-full">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold">Edit Transaction</h2>
              <button
                onClick={() => setIsEditing(false)}
                className="text-gray-600 hover:text-black"
              >
                <X size={20} />
              </button>
            </div>
            <input
              type="number"
              value={editedAmount}
              onChange={(e) => setEditedAmount(e.target.value)}
              className="w-full p-2 mt-4 border rounded bg-gray-100 text-black"
            />
            <input
              type="text"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="w-full p-2 mt-2 border rounded bg-gray-100 text-black"
              placeholder="Description"
            />
            <button
              className="mt-4 w-full bg-black text-white px-3 py-2 rounded hover:bg-gray-900"
              onClick={handleSaveEdit}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
