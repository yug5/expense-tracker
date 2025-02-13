"use client";
import { useBalance } from "@/context/balance";

import React, { useState, useRef, useEffect } from "react";
import { Wallet, UserCircle, LogOut, Edit3 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { updateProfile } from "firebase/auth";
import { db } from "@/lib/firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { format } from "date-fns";

export default function Homepage() {
  const { user, logout } = useAuth();
  const [username, setUsername] = useState(user?.displayName || "User");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [newName, setNewName] = useState(username);
  const [showMonth, setShowMonth] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { balance } = useBalance();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (user?.displayName) {
      setUsername(user.displayName);
    }
  }, [user]);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!user) return;

      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      const transactionsRef = collection(db, "transactions");
      const q = query(
        transactionsRef,
        where("userId", "==", user.uid),
        where("date", ">=", Timestamp.fromDate(startOfMonth)),
        where("date", "<=", Timestamp.fromDate(endOfMonth))
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        console.log(doc.data());
      });
    };
    if (user) {
      fetchBalance();
    }
  }, [user]);

  const handleNameChange = async () => {
    if (user) {
      try {
        await updateProfile(user, { displayName: newName });
        setUsername(newName);
        setEditModalOpen(false);
      } catch (error) {
        console.error("Error updating name:", error);
      }
    }
  };
  return (
    <div className="relative flex justify-between items-center px-8 py-4 bg-black text-white">
      <h1 className="text-2xl font-bold">Expense Tracker</h1>
      <div className="flex items-center md:gap-6 gap-2 flex-col md:flex-row">
        <div
          className="relative flex items-center text-xl font-semibold cursor-pointer"
          onMouseEnter={() => setShowMonth(true)}
          onMouseLeave={() => setShowMonth(false)}
        >
          <Wallet className="mr-2" size={24} /> ₹{balance}
          {showMonth && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded-md">
              {format(new Date(), "MMMM")}
            </div>
          )}
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition-all"
          >
            <UserCircle size={36} />
            <span className="text-lg font-medium">{username}</span>
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-gray-900 text-white rounded-lg shadow-lg">
              <button
                className="flex items-center w-full px-4 py-2 hover:bg-gray-800"
                onClick={() => {
                  setDropdownOpen(false);
                  setEditModalOpen(true);
                }}
              >
                <Edit3 size={18} className="mr-2" /> Change Name
              </button>
              <button
                className="flex items-center w-full px-4 py-2 hover:bg-gray-800"
                onClick={logout}
              >
                <LogOut size={18} className="mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-black">
            <h2 className="text-xl font-semibold mb-4">Change Your Name</h2>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setEditModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleNameChange}
                className="px-4 py-2 bg-black text-white rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
