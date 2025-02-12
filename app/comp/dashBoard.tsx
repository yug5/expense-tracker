"use client";
import { Minus, Plus, X } from "lucide-react";
import React, { useState } from "react";
import { db } from "@/lib/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import InEx from "./in-ex";
import { useBalance } from "@/context/balance";

export default function DashBoard() {
  const { user } = useAuth();
  const [isOpen, setOpen] = useState(false);
  const [isExpenseOpen, setExpenseOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedCategory, setSelectedCategory] = useState<{
    name: string;
    emoji: string;
  } | null>(null);
  const [transactionType, setTransactionType] = useState<"income" | "expense">(
    "income"
  );
  const { refreshBalance } = useBalance();
  const income = [
    { name: "Salary", emoji: "💼" },
    { name: "Pocket Money", emoji: "🤑" },
    { name: "Freelancing", emoji: "💻" },
    { name: "Investments", emoji: "📈" },
    { name: "Dividends", emoji: "💵" },
    { name: "Rental Income", emoji: "🏠" },
    { name: "Side Hustle", emoji: "🚀" },
    { name: "Business Revenue", emoji: "🏢" },
    { name: "Stocks", emoji: "📊" },
    { name: "Crypto Earnings", emoji: "₿" },
    { name: "Royalties", emoji: "🎵" },
    { name: "YouTube/Ads", emoji: "🎥" },
    { name: "Affiliate Marketing", emoji: "🔗" },
    { name: "Reselling", emoji: "📦" },
    { name: "Others", emoji: "🔹" },
  ];

  const spending = [
    { name: "Food", emoji: "🍲" },
    { name: "Fast Food", emoji: "🍔" },
    { name: "Fruits", emoji: "🍎" },
    { name: "Juice", emoji: "🥤" },
    { name: "Rent/Mortgage", emoji: "🏠" },
    { name: "Groceries", emoji: "🛒" },
    { name: "Dining Out", emoji: "🍽️" },
    { name: "Transportation", emoji: "🚗" },
    { name: "Gas/Fuel", emoji: "⛽" },
    { name: "Public Transport", emoji: "🚌" },
    { name: "Insurance", emoji: "🛡️" },
    { name: "Healthcare", emoji: "🏥" },
    { name: "Electricity Bill", emoji: "⚡" },
    { name: "Water Bill", emoji: "🚰" },
    { name: "Internet", emoji: "🌐" },
    { name: "Phone Bill", emoji: "📱" },
    { name: "Streaming Services", emoji: "📺" },
    { name: "Subscriptions", emoji: "💳" },
    { name: "Clothing", emoji: "👕" },
    { name: "Education", emoji: "📚" },
    { name: "Personal Grooming", emoji: "💇‍♂️" },
    { name: "Gym Membership", emoji: "🏋️" },
    { name: "Entertainment", emoji: "🎮" },
    { name: "Travel", emoji: "✈️" },
    { name: "Loans/EMI", emoji: "💰" },
    { name: "Pets", emoji: "🐶" },
    { name: "Gifts", emoji: "🎁" },
    { name: "Charity", emoji: "❤️" },
    { name: "Repairs", emoji: "🔧" },
    { name: "Others", emoji: "🔹" },
  ];

  const handleSaveTransaction = async () => {
    if (!user || !amount || !selectedCategory) return;

    const transactionData = {
      userId: user.uid,
      type: transactionType,
      name: selectedCategory.name,
      emoji: selectedCategory.emoji,
      amount: parseFloat(amount),
      description,
      date: new Date(date).toISOString(),
      month: new Date(date).toLocaleString("default", { month: "short" }),
    };

    try {
      await addDoc(collection(db, "transactions"), transactionData);
      console.log("Transaction added successfully!");
      refreshBalance();
      setAmount("");
      setDescription("");
      setDate(new Date().toISOString().split("T")[0]);
      setSelectedCategory(null);
      setOpen(false);
      setExpenseOpen(false);
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };

  return (
    <div className="lg:w-3/4 sm:w-full mx-auto">
      {(isOpen || isExpenseOpen) && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg w-[600px] max-w-full">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold">
                {transactionType === "income"
                  ? "Select Income Type"
                  : "Select Spending Type"}
              </h2>
              <button
                onClick={() => {
                  setOpen(false);
                  setExpenseOpen(false);
                }}
                className="text-gray-600 hover:text-black"
              >
                <X size={20} />
              </button>
            </div>

            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 mt-4 border rounded bg-gray-100 text-black"
            />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 mt-2 border rounded bg-gray-100 text-black"
            />

            <div className="grid grid-cols-4 gap-2 mt-4 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
              {(transactionType === "income" ? income : spending).map(
                (item, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedCategory(item)}
                    className={`p-2 rounded-md shadow cursor-pointer hover:bg-gray-300 ${
                      selectedCategory?.name === item.name
                        ? "bg-gray-800 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {item.emoji} {item.name}
                  </div>
                )
              )}
            </div>

            <input
              type="text"
              placeholder="Description (max 50 chars)"
              maxLength={50}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 mt-2 border rounded bg-gray-100 text-black"
            />

            <button
              className="mt-4 w-full bg-black text-white px-3 py-2 rounded hover:bg-gray-900"
              onClick={handleSaveTransaction}
            >
              Submit
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col">
        <InEx />
        <div className="flex flex-row gap-20  justify-center">
          <button
            className="bg-black flex gap-2 justify-center items-center p-3 text-white rounded-lg w-[10rem] hover:bg-gray-800 shadow-lg"
            onClick={() => {
              setTransactionType("income");
              setOpen(true);
              setExpenseOpen(false);
            }}
          >
            <Plus size={18} /> Add Income
          </button>

          <button
            className="bg-black flex justify-center items-center gap-2 p-3 text-white rounded-lg w-[10rem] hover:bg-gray-800 shadow-lg"
            onClick={() => {
              setTransactionType("expense");
              setExpenseOpen(true);
              setOpen(false);
            }}
          >
            <Minus size={18} /> Add Expense
          </button>
        </div>
      </div>
    </div>
  );
}
