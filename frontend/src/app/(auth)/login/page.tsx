import { Mail, Lock } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="bg-zinc-900 p-6 rounded-sm flex flex-col items-center justify-center shadow-2xl shadow-zinc-800">
      <div className="text-2xl mb-4 w-full border-b-1 border-zinc-600 pb-4 flex items-center justify-center">
        Sign In
      </div>
      <form className="flex flex-col gap-4">
        <label className="text-lg" htmlFor="email">
          Email
        </label>

        <div className="border-2 rounded-sm border-zinc-700 flex items-center focus-within:border-zinc-400 transition-colors">
          <Mail className="w-6 h-6 ml-2" />
          <input
            className="p-2 outline-none bg-transparent text-white"
            type="email"
            name="email"
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
            id="password"
          />
        </div>

        <div className="flex items-center justify-end">Forgot Password?</div>

        <button
          className="rounded-sm p-4 text-zinc-900 font-semibold bg-zinc-100"
          type="submit"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
