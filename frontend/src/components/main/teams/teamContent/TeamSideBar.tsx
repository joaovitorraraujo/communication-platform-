"use client";

import { getTeamApi } from "@/api/teamRequest";
import { TeamType, UserType } from "@/types/teamType";
import { useEffect, useState } from "react";
import { HeaderSideBar } from "@/components/main/teams/teamContent/HeaderSideBar";
import { getMyUser } from "@/api/userRequest";

interface TeamSideBarProps {
  teamId: string;
}

export const TeamSideBar = ({ teamId }: TeamSideBarProps) => {
  const [team, setTeam] = useState<TeamType>();
  const [userAuth, setUserAuth] = useState<UserType>();

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const dataUser = await getMyUser();
        setUserAuth(dataUser.user);

        const dataTeam = await getTeamApi(teamId);
        setTeam(dataTeam.team);
      } catch (error) {
        console.error("Erro ao buscar time:", error);
      }
    };

    fetchTeam();
  }, [teamId]);

  if (!team) return <p>Carregando...</p>;

  const members = team.members.filter(
    (member: any) => member.userId !== userAuth!.id
  );

  const role = team.members.find(
    (member: any) => member.userId === userAuth!.id
  )?.role;

  if (!role) {
    throw new Error("Usuário não faz parte do time");
  }

  return (
    <>
      <aside className="hidden md:block w-64 border-r border-zinc-800 p-4">
        <HeaderSideBar team={team} role={role} />
      </aside>
    </>
  );
};
