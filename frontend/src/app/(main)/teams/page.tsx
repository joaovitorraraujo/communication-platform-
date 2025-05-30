"use client";

import Card from "./components/TeamCard";
import { TeamType } from "../../../types/teamType";
import { useEffect, useState } from "react";
import { getTeams } from "@/api/userRequest";
import CreateServerButton from "@/components/main/teams/CreateSeverButton";

export default function TeamsPage() {
  const [teams, setTeams] = useState<TeamType[]>([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await getTeams();
        setTeams(data.teams); // supondo que sua API retorna { teams: [...] }
      } catch (error) {
        console.error("Erro ao buscar teams", error);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div className="bg-zinc-900 w-full min-h-screen rounded-2xl p-6 ">
      <div className="flex border-b-2 border-zinc-600 p-4">
        <h2 className="text-zinc-300 text-2xl md:text-4xl font-semibold">
          Teams
        </h2>
        <CreateServerButton />
        {/* <div className="border border-zinc-400 ml-auto flex gap-2 items-center p-2 rounded-sm">
          <LucidePlusSquare className="w-6 h-6 hidden sm:block" />
          <span className="text-sm md:text-base">Create or join a team</span>
        </div> */}
      </div>
      {teams.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full gap-3">
          <h3 className="text-zinc-300 text-5xl">
            It seems you are not on any team yet
          </h3>
          <p className="text-zinc-300/70 text-2xl">Join or create a team now</p>
        </div>
      )}
      <div className="scroll grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 p-4 ">
        {teams.map((team) => (
          <div key={team.id} className="flex justify-center">
            <Card team={team} /> {/* passando o time para o Card */}
          </div>
        ))}
      </div>
    </div>
  );
}
