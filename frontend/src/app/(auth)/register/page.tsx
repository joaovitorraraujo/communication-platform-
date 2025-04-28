"use client";

import { Mail, Lock, User, DockIcon, Calendar } from "lucide-react";
import { register } from "@/api/authRequest";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  // USE SATATES FOR INPUTS
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [birth, setBirth] = useState("");

  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await register(name, email, password, cpf, birth);
      router.push("/"); // redireciona após register
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao cadastrar");
    }
  };

  return (
    <div className="bg-zinc-950/70 p-6 rounded-sm flex flex-col items-center justify-center shadow-2xl shadow-zinc-950">
      {/* title */}
      <div className="text-base text-zinc-400  w-full  pb-4 flex items-center justify-center">
        Register as Individual
      </div>
      <div className="text-2xl w-full border-b-1 mb-4 border-zinc-600  pb-4 flex items-center justify-center">
        Create new account
      </div>

      <form
        onSubmit={handleRegister}
        className="max-h-[400px] md:max-h-[500px] scrollbar-thin overflow-y-auto w-full flex flex-col gap-4"
      >
        <label className="text-lg" htmlFor="name">
          Name *
        </label>

        <div className="border-2 rounded-sm border-zinc-700 flex items-center focus-within:border-zinc-400 transition-colors">
          <User className="w-6 h-6 ml-2" />
          <input
            placeholder="Your username"
            required
            className="p-2 outline-none bg-transparent text-white"
            type="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="flex flex-col">
            <label className="text-lg" htmlFor="email">
              Email *
            </label>

            <div className="border-2 rounded-sm border-zinc-700 flex items-center focus-within:border-zinc-400 transition-colors">
              <Mail className="w-6 h-6 ml-2" />
              <input
                placeholder="joao@email.com"
                required
                className="p-2 outline-none bg-transparent text-white"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-lg" htmlFor="password">
              Password *
            </label>
            <div className="border-2 rounded-sm border-zinc-700 flex items-center focus-within:border-zinc-400 transition-colors">
              <Lock className="w-6 h-6 ml-2" />
              <input
                placeholder="************"
                required
                className="p-2 outline-none bg-transparent text-white"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
              />
            </div>
          </div>
        </div>

        <label className="text-lg" htmlFor="cpf">
          CPF *
        </label>
        <div className="border-2 rounded-sm border-zinc-700 flex items-center focus-within:border-zinc-400 transition-colors">
          <DockIcon className="w-6 h-6 ml-2" />
          <input
            placeholder="123.123.123-00"
            required
            className="p-2 outline-none bg-transparent text-white"
            type="cpf"
            name="cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            id="cpf"
          />
        </div>

        <label className="text-lg" htmlFor="birth">
          Date of birth *
        </label>
        <div className="border-2 rounded-sm border-zinc-700 flex items-center focus-within:border-zinc-400 transition-colors">
          <Calendar className="w-6 h-6 ml-2" />
          <input
            placeholder="12/12/2000"
            required
            className="p-2 outline-none bg-transparent text-white"
            type="birth"
            name="birth"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
            id="birth"
          />
        </div>

        <div className="flex items-center justify-end">Forgot Password?</div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          className="rounded-sm p-4 text-zinc-900 font-semibold bg-zinc-100"
          type="submit"
        >
          Sign Up
        </button>
      </form>
      <Link href={"/login"} className="text-zinc-300 mt-4">
        Already have an account? Sign in
      </Link>
    </div>
  );
}
