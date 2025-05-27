import { ReactNode } from "react";

export default function AuthFormCard({ children }: { children: ReactNode }) {
  return (
    <div className="bg-zinc-950/70 p-6 rounded-sm flex flex-col items-center justify-center shadow-2xl shadow-zinc-950">
      <div className="text-base text-zinc-400 w-full pb-4 flex items-center justify-center">
        Register as Individual
      </div>
      <div className="text-2xl w-full border-b-1 mb-4 border-zinc-600 pb-4 flex items-center justify-center">
        Create new account
      </div>
      {children}
    </div>
  );
}
