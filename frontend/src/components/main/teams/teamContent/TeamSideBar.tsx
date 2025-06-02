"use client";

import { getTeamApi } from "@/api/teamRequest";
import { TeamType } from "@/types/teamType";
import { useEffect, useState } from "react";

interface TeamSideBarProps {
  teamId: string;
}

export const TeamSideBar = ({ teamId }: TeamSideBarProps) => {
  const [team, setTeam] = useState<TeamType>();

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await getTeamApi(teamId);
        setTeam(data.team);
      } catch (error) {
        console.error("Erro ao buscar time:", error);
      }
    };

    fetchTeam();
  }, [teamId]);

  if (!team) return <p>Carregando...</p>;

  return (
    <>
      <aside className="hidden md:block w-64 border-r border-zinc-800 p-4">
        <h2 className="text-lg font-bold mb-2">{team.name}</h2>
        {team.channels.map((channel: any) => (
          <p key={channel.id}>{channel.name}</p>
        ))}
        <p className="text-blue-500 mt-4 cursor-pointer">+ Add Channel</p>
      </aside>
    </>
  );
};
