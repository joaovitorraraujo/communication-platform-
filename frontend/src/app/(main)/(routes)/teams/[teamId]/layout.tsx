import { TeamSideBar } from "@/components/main/teams/teamContent/TeamSideBar";

const TeamLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { teamId: string };
}) => {
  const { teamId } = await params;

  return (
    <div className="bg-zinc-900 w-full min-h-screen flex rounded-2xl">
      {/* Sidebar dos canais */}

      <TeamSideBar teamId={teamId} />

      {/* Conteúdo principal: chat, arquivos, etc */}
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default TeamLayout;
