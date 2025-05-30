import { Mail, Lock, User, DockIcon, Calendar } from "lucide-react";
import { registerAPI } from "@/api/authRequest";
import { useRouter } from "next/navigation";
import { useState } from "react";

// IMPORTS DO REACT HOOK FORM
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DatePicker } from "@/components/ui/date-picker";
import { error } from "console";

const formSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(3),
  cpf: z.string(),
  birth: z.coerce.date().min(new Date("1900-01-01")).max(new Date()),
});

type FormData = z.infer<typeof formSchema>;

export default function FormInputs() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (data: FormData) => {
    const dateBirth = data.birth.toISOString().split("T")[0];
    setError("");

    try {
      await registerAPI(
        data.name,
        data.email,
        data.password,
        data.cpf,
        dateBirth
      );
      router.push("/"); // redireciona após register
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao cadastrar");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
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
          {...register("name")}
          type="name"
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
              {...register("email")}
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
              {...register("password")}
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
          {...register("cpf")}
          id="cpf"
        />
      </div>

      <label className="text-lg" htmlFor="birth">
        Date of birth *
      </label>
      <Controller
        name="birth"
        control={control}
        render={({ field }) => (
          <DatePicker value={field.value} onChange={field.onChange} />
        )}
      />

      <div className="flex items-center justify-end">Forgot Password?</div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        className="rounded-sm p-4 text-zinc-900 font-semibold bg-zinc-100"
        type="submit"
      >
        Sign Up
      </button>
    </form>
  );
}
