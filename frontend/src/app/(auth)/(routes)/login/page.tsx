"use client";

import { useEffect } from "react";
import Link from "next/link";
import FormLoginCard from "@/components/auth/login/FormLoginCard";
import FormInputsLogin from "@/components/auth/login/FormInputsLogin";

export default function LoginPage() {
  useEffect(() => {
    // Verificar se o token está presente no localStorage
    const token = localStorage.getItem("token");

    if (token) {
      localStorage.removeItem("token");
    }
  });

  return (
    <FormLoginCard>
      <FormInputsLogin />

      <Link href={"/register"} className="text-zinc-300 mt-4">
        Don’t have account? Sign Up
      </Link>
    </FormLoginCard>
  );
}
