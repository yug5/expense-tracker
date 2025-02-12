"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation"; 
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login"); // Redirect to the correct login page
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>; // Show loading until Firebase resolves auth state

  return user ? children : null;
}
