"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth, googleAuthProvider } from "@/lib/firebaseConfig";
import { Mail, Key, User } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
      router.push("/");
    } catch (error) {
      setError("Google Sign-In Failed.");
    }
  };

  const handleEmailAuth = async () => {
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and Password are required.");
      return;
    }

    try {
      if (isSignUp) {
        const methods = await fetchSignInMethodsForEmail(auth, email);
        if (methods.length > 0) {
          setError("Email is already in use. Please login.");
          return;
        }
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("No account found. Please sign up.");
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password.");
      } else {
        setError("Authentication failed. Try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-black">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-[95%] max-w-lg">
        <h2 className="text-3xl font-semibold text-center text-black dark:text-gray-900">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <div className="mt-6">
          <div className="relative flex items-center border rounded-md p-3 mb-4 bg-gray-50">
            <Mail className="absolute left-3 text-gray-500" size={20} />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-3 py-2 bg-transparent outline-none text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative flex items-center border rounded-md p-3 bg-gray-50">
            <Key className="absolute left-3 text-gray-500" size={20} />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-3 py-2 bg-transparent outline-none text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleEmailAuth}
            className="mt-5 w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>

          <button
            onClick={handleGoogleLogin}
            className="mt-4 w-full flex items-center justify-center gap-2 border py-3 rounded-md bg-gray-50 hover:bg-gray-200 transition"
          >
            <User size={20} /> Continue with Google
          </button>

          <p className="mt-5 text-center text-gray-600">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              className="text-blue-500 hover:underline"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError("");
              }}
            >
              {isSignUp ? "Login" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
