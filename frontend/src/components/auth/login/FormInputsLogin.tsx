import { Mail, Lock } from "lucide-react";
import { loginAPI } from "@/api/authRequest";
import { useRouter } from "next/navigation";
import { useState } from "react";

// IMPORTS DO REACT HOOK FORM
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

type FormData = z.infer<typeof formSchema>;

export default function FormInputsLogin() {
  // VALIDAÇÕES PARA OS INPUTS
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (data: FormData) => {
    setError("");

    try {
      await loginAPI(data.email, data.password);
      router.push("/"); // redireciona após login
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao fazer login");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-4">
      <label className="text-lg" htmlFor="email">
        Email
      </label>

      <div className="border-2 rounded-sm border-zinc-700 flex items-center focus-within:border-zinc-400 transition-colors">
        <Mail className="w-6 h-6 ml-2" />
        <input
          className="p-2 outline-none bg-transparent text-white"
          type="email"
          {...register("email")}
          placeholder="user@email.com"
          id="email"
        />
      </div>
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}

      <label className="text-lg" htmlFor="password">
        Password
      </label>
      <div className="border-2 rounded-sm border-zinc-700 flex items-center focus-within:border-zinc-400 transition-colors">
        <Lock className="w-6 h-6 ml-2" />
        <input
          className="p-2 outline-none bg-transparent text-white"
          type="password"
          {...register("password")}
          placeholder="**********"
          id="password"
        />
      </div>
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex items-center justify-end">Forgot Password?</div>

      <button
        className="rounded-sm p-4 text-zinc-900 font-semibold bg-zinc-100"
        type="submit"
      >
        Sign In
      </button>
    </form>
  );
}
