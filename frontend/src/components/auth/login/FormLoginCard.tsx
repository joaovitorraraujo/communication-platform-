import { ReactNode } from "react";

export default function FormLoginCard({ children }: { children: ReactNode }) {
  return (
    <div className="bg-zinc-950/70 p-6 rounded-sm flex flex-col items-center justify-center shadow-2xl shadow-zinc-950">
      <div className="text-2xl mb-4 w-full border-b-1 border-zinc-600 pb-4 flex items-center justify-center">
        Sign In
      </div>
      {children}
    </div>
  );
}
