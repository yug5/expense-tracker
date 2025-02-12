"use client";
import React, { useState } from "react";
import { Menu, LogOut } from "lucide-react";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`fixed h-screen ${
        open ? "w-[15rem]" : "w-[5rem]"
      } text-black bg-white rounded-lg shadow-lg transition-all duration-300 p-4 flex flex-col justify-between`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="text-black p-2 rounded-md hover:bg-gray-200 transition">
        <Menu size={24} />
      </button>

      <div className="flex flex-col gap-4">
        <button className="bg-black p-3 text-white rounded-sm w-full hover:bg-slate-900 shadow-md shadow-black">
          {open ? "+ Income" : "+"}
        </button>
        <button className="bg-black p-3 text-white rounded-sm w-full hover:bg-slate-900">
          {open ? "- Expense" : "-"}
        </button>
      </div>
      
      <button className="text-black p-2 rounded-md hover:bg-gray-200 transition flex items-center gap-2">
        <LogOut size={24} />
        {open && <span>Logout</span>}
      </button>
    </div>
  );
}
