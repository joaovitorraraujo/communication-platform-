import { Mail, Lock, User, DockIcon, Calendar } from "lucide-react";
import { registerAPI } from "@/api/authRequest";
import { useRouter } from "next/navigation";
import { useState } from "react";

// IMPORTS DO REACT HOOK FORM
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DatePicker } from "@/components/ui/date-picker";

const formSchema = z.object({
  name: z.string().min(3),
  email: z.string().email({
    message: "Invalid email",
  }),
  password: z.string().min(3),
  cpf: z.string().min(14, { message: "CPF inválido" }),
  birth: z.coerce
    .date()
    .min(new Date("1900-01-01"), { message: "Data muito antiga" })
    .refine((date) => date <= new Date(), {
      message: "A data de nascimento não pode ser no futuro",
    }),
});

type FormData = z.infer<typeof formSchema>;

export default function FormInputs() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const [error, setError] = useState("");
  const router = useRouter();

  function formatCPF(value: string) {
    value = value.replace(/\D/g, "").slice(0, 11); // Mantém só os 11 dígitos

    if (value.length <= 3) return value;
    if (value.length <= 6) return `${value.slice(0, 3)}.${value.slice(3)}`;
    if (value.length <= 9)
      return `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6)}`;
    return `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(
      6,
      9
    )}-${value.slice(9, 11)}`;
  }

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
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
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
          placeholder="123.456.789-00"
          required
          className="p-2 outline-none bg-transparent text-white"
          type="text"
          {...register("cpf", {
            onChange: (e) => {
              const formattedValue = formatCPF(e.target.value);
              setValue("cpf", formattedValue);
            },
          })}
        />
      </div>

      {errors.cpf && (
        <p className="text-red-500 text-sm">{errors.cpf.message}</p>
      )}

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

      {errors.birth && (
        <p className="text-red-500 text-sm">{errors.birth.message}</p>
      )}

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
