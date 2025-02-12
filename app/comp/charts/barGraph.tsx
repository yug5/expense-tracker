"use client";
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  Rectangle,
} from "recharts";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { useAuth } from "@/context/AuthContext";

export default function BarGraph() {
  const { user } = useAuth();
  const [data, setData] = useState<
    { name: string; income: number; expense: number }[]
  >([]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "transactions"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const monthlyData: {
        [key: string]: { income: number; expense: number };
      } = {
        Jan: { income: 0, expense: 0 },
        Feb: { income: 0, expense: 0 },
        Mar: { income: 0, expense: 0 },
        Apr: { income: 0, expense: 0 },
        May: { income: 0, expense: 0 },
        Jun: { income: 0, expense: 0 },
        Jul: { income: 0, expense: 0 },
        Aug: { income: 0, expense: 0 },
        Sep: { income: 0, expense: 0 },
        Oct: { income: 0, expense: 0 },
        Nov: { income: 0, expense: 0 },
        Dec: { income: 0, expense: 0 },
      };

      snapshot.forEach((doc) => {
        const { amount, type, date } = doc.data();
        const monthIndex = new Date(date).getMonth();
        const monthNames = Object.keys(monthlyData);
        const monthName = monthNames[monthIndex];

        if (type === "income") {
          monthlyData[monthName].income += amount;
        } else {
          monthlyData[monthName].expense += amount;
        }
      });

      const formattedData = Object.keys(monthlyData).map((month) => ({
        name: month,
        ...monthlyData[month],
      }));

      setData(formattedData);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="w-full max-w-4xl h-96 bg-white shadow-lg rounded-lg p-5">
      <h2 className="text-xl font-semibold text-center mb-4">
        Income vs Expense
      </h2>

      <ResponsiveContainer width="100%" height="80%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300" />
          <XAxis dataKey="name" className="text-sm" />
          <YAxis className="text-sm" />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              borderRadius: "5px",
              padding: "10px",
            }}
          />
          <Legend />
          <Bar
            dataKey="income"
            fill="#4CAF50"
            activeBar={<Rectangle fill="limegreen" stroke="black" />}
          />
          <Bar
            dataKey="expense"
            fill="#F44336"
            activeBar={<Rectangle fill="red" stroke="black" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
