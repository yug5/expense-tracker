"use client";
import { Minus, Plus, X } from "lucide-react";
import React, { useState } from "react";

export default function DashBoard() {
  const [isOpen, setOpen] = useState(false);
  const [isExpenseOpen, setExpenseOpen] = useState(false);

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

  return (
    <div className="lg:w-3/4 sm:w-full mt-5 mx-auto">
      <div className="flex flex-row gap-6 justify-center">
        
        <button
          className="bg-black flex gap-2 justify-center items-center p-3 text-white rounded-lg w-[10rem] hover:bg-gray-800 shadow-lg"
          onClick={() => setOpen(true)}
        >
          <Plus size={18} /> Add Income
        </button>

        <button
          className="bg-black flex justify-center items-center gap-2 p-3 text-white rounded-lg w-[10rem] hover:bg-gray-800 shadow-lg"
          onClick={() => setExpenseOpen(true)}
        >
          <Minus size={18} /> Add Expense
        </button>
      </div>

      
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg w-[600px] max-w-full">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold">Select Income Type</h2>
              <button onClick={() => setOpen(false)} className="text-gray-600 hover:text-black">
                <X size={20} />
              </button>
            </div>
            <input
                type="number"
                placeholder="Amount"
                className="w-full p-2 mt-4 border rounded bg-gray-100 text-black"
              />
            <div className="grid grid-cols-4 gap-2 mt-4 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {income.map((item, index) => (
                <div key={index} className="p-2 bg-gray-200 rounded-md shadow">
                  {item.emoji} {item.name}
                </div>
              ))}
            </div>
            <input
        type="text"
        placeholder="Description (max 50 chars)"
        maxLength={50}
        className="w-full p-2 mt-2 border rounded bg-gray-100 text-black"
      />
            <button
              className="mt-4 w-full bg-black text-white px-3 py-2 rounded hover:bg-gray-900"
              onClick={() => setOpen(false)}
            >
              Submit
            </button>
          </div>
        </div>
      )}
{isExpenseOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md">
    <div className="bg-white text-black p-6 rounded-lg shadow-lg w-[600px] h-[600px] max-w-full">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Select Spending Type</h2>
        <button onClick={() => setExpenseOpen(false)} className="text-gray-600 hover:text-black">
          <X size={20} />
        </button>
      </div>

      <input
        type="number"
        placeholder="Amount"
        className="w-full p-2 mt-4 border rounded bg-gray-100 text-black"
      />
      <div className="grid grid-cols-4 gap-2 mt-4 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {spending.map((item, index) => (
          <div key={index} className="p-2 bg-gray-200 rounded-md shadow">
            {item.emoji} {item.name}
          </div>
        ))}
      </div>

      <input
        type="text"
        placeholder="Description (max 50 chars)"
        maxLength={50}
        className="w-full p-2 mt-2 border rounded bg-gray-100 text-black"
      />

      <button
        className="mt-4 w-full bg-black text-white px-3 py-2 rounded hover:bg-gray-900"
        onClick={() => setExpenseOpen(false)}
      >
        Submit
      </button>
    </div>
  </div>
)}
  

    </div>
  );
}
