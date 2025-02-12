"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { useAuth } from "@/context/AuthContext";

const BalanceContext = createContext<{
  balance: number;
  refreshBalance: () => void;
}>({
  balance: 0,
  refreshBalance: () => {},
});

export const BalanceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuth();
  const [balance, setBalance] = useState(0);

  const fetchBalance = async () => {
    if (!user) return;
    const q = query(
      collection(db, "transactions"),
      where("userId", "==", user.uid)
    );
    const querySnapshot = await getDocs(q);

    let totalBalance = 0;
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      totalBalance += data.type === "income" ? data.amount : -data.amount;
    });

    setBalance(totalBalance);
  };

  useEffect(() => {
    fetchBalance();
  }, [user]);

  return (
    <BalanceContext.Provider value={{ balance, refreshBalance: fetchBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalance = () => useContext(BalanceContext);
