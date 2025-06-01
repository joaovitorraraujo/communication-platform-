"use client";

import Card from "./components/TeamCard";
import { TeamType } from "../../../types/teamType";
import { useEffect, useState } from "react";
import { getTeams } from "@/api/userRequest";
import CreateServerButton from "@/components/main/teams/CreateSeverButton";

export default function TeamsPage() {
  const [teams, setTeams] = useState<TeamType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      setIsLoading(true);
      try {
        const data = await getTeams();
        setTeams(data.teams);
      } catch (error) {
        console.error("Erro ao buscar teams", error);
      } finally {
        setIsLoading(false);
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
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <>
          {teams.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full gap-3">
              <h3 className="text-zinc-300 text-5xl">
                It seems you are not on any team yet
              </h3>
              <p className="text-zinc-300/70 text-2xl">
                Join or create a team now
              </p>
            </div>
          )}
          <div className="scroll grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 p-4 ">
            {teams.map((team) => (
              <div key={team.id} className="flex justify-center">
                <Card team={team} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
