"use client";

import { Mail, Lock } from "lucide-react";
import { login } from "@/api/authRequest";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      router.push("/"); // redireciona após login
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao fazer login");
    }
  };

  return (
    <div className="bg-zinc-950/70 p-6 rounded-sm flex flex-col items-center justify-center shadow-2xl shadow-zinc-950">
      <div className="text-2xl mb-4 w-full border-b-1 border-zinc-600 pb-4 flex items-center justify-center">
        Sign In
      </div>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <label className="text-lg" htmlFor="email">
          Email
        </label>

        <div className="border-2 rounded-sm border-zinc-700 flex items-center focus-within:border-zinc-400 transition-colors">
          <Mail className="w-6 h-6 ml-2" />
          <input
            className="p-2 outline-none bg-transparent text-white"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
          />
        </div>

        <label className="text-lg" htmlFor="password">
          Password
        </label>
        <div className="border-2 rounded-sm border-zinc-700 flex items-center focus-within:border-zinc-400 transition-colors">
          <Lock className="w-6 h-6 ml-2" />
          <input
            className="p-2 outline-none bg-transparent text-white"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
          />
        </div>

        <div className="flex items-center justify-end">Forgot Password?</div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          className="rounded-sm p-4 text-zinc-900 font-semibold bg-zinc-100"
          type="submit"
        >
          Sign In
        </button>
      </form>
      <Link href={"/register"} className="text-zinc-300 mt-4">
        Don’t have account? Sign Up
      </Link>
    </div>
  );
}
