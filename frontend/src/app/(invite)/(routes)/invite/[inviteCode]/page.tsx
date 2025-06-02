"use client";

import { joinTeamApi } from "@/api/teamRequest";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

interface InviteCodePageProps {
  params: Promise<{ inviteCode: string }>;
}

const InviteCodePage = ({ params }: InviteCodePageProps) => {
  const { inviteCode } = use(params);

  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const joinTeam = async () => {
      try {
        const team = await joinTeamApi(inviteCode);
        setStatus("success");
        router.push(`/teams/${team.id}/chat`);
      } catch (error: any) {
        console.error("Erro ao entrar na equipe:", error);
        setStatus("error");
        setMessage(error.response?.data?.message || "Failed to join the team.");
      }
    };

    joinTeam();
  }, [inviteCode, router]);

  if (!inviteCode) {
    return redirect("/teams");
  }

  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      {status === "loading" && <p>Joining team...</p>}
      {status === "error" && <p>{message}</p>}
    </div>
  );
};

export default InviteCodePage;
