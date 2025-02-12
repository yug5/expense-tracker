import React from "react";
import DashBoard from "./comp/dashBoard";
import Graph from "./comp/graph";
import Homepage from "./homepage";
import ProtectedRoute from "@/app/comp/ProtectedRoute";
import { BalanceProvider } from "@/context/balance";

export default function Home() {
  return (
    <ProtectedRoute>
      <BalanceProvider>
        <div>
          <Homepage />
          <div className="flex flex-col md:flex-row gap-32">
            <DashBoard />
            <Graph />
          </div>
        </div>
      </BalanceProvider>
    </ProtectedRoute>
  );
}
