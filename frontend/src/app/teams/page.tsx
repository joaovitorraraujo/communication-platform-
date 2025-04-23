import { LucidePlusSquare } from "lucide-react";
import Card from "./components/TeamCard";

export default function TeamsPage() {
  return (
    <div className="bg-zinc-900 w-full min-h-screen rounded-2xl p-6 ">
      <div className="flex border-b-2 border-zinc-600 p-4">
        <h2 className="text-zinc-300 text-2xl md:text-4xl font-semibold">
          Teams
        </h2>
        <div className="border border-zinc-400 ml-auto flex gap-2 items-center p-2 rounded-sm">
          <LucidePlusSquare className="w-6 h-6 hidden sm:block" />
          <span className="text-sm md:text-base">Create or join a team</span>
        </div>
      </div>
      <div className="scroll grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 p-4 ">
        {Array.from({ length: 9 }).map((_, idx) => (
          <div key={idx} className="flex justify-center">
            <Card />
          </div>
        ))}
      </div>
    </div>
  );
}
