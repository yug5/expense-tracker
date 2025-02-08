"use client";
import React from "react";
import { BarChart, Bar, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Legend, Tooltip, Rectangle } from "recharts";

const data = [
  { name: "Jan", income: 4000, expense: 2400 },
  { name: "Feb", income: 3000, expense: 1398 },
  { name: "Mar", income: 2000, expense: 9800 },
  { name: "Apr", income: 2780, expense: 3908 },
  { name: "May", income: 1890, expense: 4800 },
  { name: "Jun", income: 2390, expense: 3800 },
];

export default function BarGraph() {
  return (
    <div className="w-full max-w-4xl h-96 bg-white shadow-lg rounded-lg p-5">
      <h2 className="text-xl font-semibold text-center mb-4">Income vs Expense</h2>

      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300" />
          <XAxis dataKey="name" className="text-sm" />
          <YAxis className="text-sm" />
          <Tooltip contentStyle={{ backgroundColor: "white", borderRadius: "5px", padding: "10px" }} />
          <Legend />
          <Bar dataKey="income" fill="#4CAF50" activeBar={<Rectangle fill="limegreen" stroke="black" />} />
          <Bar dataKey="expense" fill="#F44336" activeBar={<Rectangle fill="red" stroke="black" />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
