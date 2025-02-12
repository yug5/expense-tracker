"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebaseConfig";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

export default function TopTransactions() {
  const [topExpenses, setTopExpenses] = useState<
    { name: string; amount: number }[]
  >([]);
  const [topIncome, setTopIncome] = useState<
    { name: string; amount: number }[]
  >([]);

  useEffect(() => {
    const transactionsQuery = query(
      collection(db, "transactions"),
      orderBy("amount", "desc")
    );

    const unsubscribe = onSnapshot(transactionsQuery, (snapshot) => {
      const expenses: { name: string; amount: number }[] = [];
      const income: { name: string; amount: number }[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.type === "expense") {
          expenses.push({ name: data.name || "Unknown", amount: data.amount });
        } else if (data.type === "income") {
          income.push({ name: data.name || "Unknown", amount: data.amount });
        }
      });

      setTopExpenses(expenses.slice(0, 5));
      setTopIncome(income.slice(0, 5));
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-5 mt-6">
      <h2 className="text-xl font-semibold text-center mb-4">
        Top Transactions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-red-500 mb-2">
            Highest Expenses
          </h3>
          <ul className="space-y-2">
            {topExpenses.length > 0 ? (
              topExpenses.map((expense, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-red-100 p-2 rounded-md"
                >
                  <span>{expense.name}</span>
                  <span className="font-bold text-red-500">
                    ₹{expense.amount}
                  </span>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No expenses recorded</p>
            )}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-green-500 mb-2">
            Highest Income
          </h3>
          <ul className="space-y-2">
            {topIncome.length > 0 ? (
              topIncome.map((income, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-green-100 p-2 rounded-md"
                >
                  <span>{income.name}</span>
                  <span className="font-bold text-green-500">
                    ₹{income.amount}
                  </span>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No income recorded</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
