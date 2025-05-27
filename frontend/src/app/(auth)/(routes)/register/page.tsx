"use client";

import AuthFormCard from "@/components/auth/register/AuthFormCard";
import FormInputs from "@/components/auth/register/FormInputsRegister";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <AuthFormCard>
      <FormInputs />
      <Link href={"/login"} className="text-zinc-300 mt-4">
        Already have an account? Sign in
      </Link>
    </AuthFormCard>
  );
}
