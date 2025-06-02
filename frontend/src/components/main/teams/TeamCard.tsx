import Link from "next/link";
import { TeamType } from "@/types/teamType";

export default function TeamCard({ team }: { team: TeamType }) {
  return (
    <Link
      href={`/teams/${team.id}/chat`}
      className="shadow-2xl hover:bg-zinc-900 hover:shadow-lg duration-300 shadow-zinc-950 bg-zinc-800 h-28 w-60 rounded-lg"
    >
      <div className="flex items-center h-full w-full  p-2 gap-4">
        <div className="bg-zinc-300 rounded-lg h-16 w-16 flex items-center justify-center">
          <p className="text-zinc-800 font-bold text-3xl">EC</p>
        </div>
        <p className="text-zinc-300 font-medium">{team.name}</p>
      </div>
    </Link>
  );
}
