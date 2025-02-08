"use client";
import React from "react";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function ExpenseTracker() {
  const expenses = [
    { name: "Rent", value: 1500 },
    { name: "Groceries", value: 500 },
    { name: "Electricity", value: 200 },
    { name: "Internet", value: 100 },
    { name: "Transport", value: 300 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A833FF"];

  return (
    <div className="bg-white shadow-lg rounded-lg p-5">
      <h2 className="text-xl font-semibold text-center mb-4">Expense Breakdown</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie dataKey="value" data={expenses} cx="50%" cy="50%" outerRadius={80} label>
            {expenses.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
