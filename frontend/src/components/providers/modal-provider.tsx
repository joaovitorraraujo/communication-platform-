"use client";

import { InvitePeopleModal } from "@/components/main/modals/InvitePeopleModal";
import { CreateServerModal } from "@/components/main/modals/CreateServerModal";
import { useEffect, useState } from "react";
import { JoinTeamModal } from "@/components/main/modals/JoinTeamModal";
import { MembersModal } from "@/components/main/modals/MembersModal";

export default function ModalsProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateServerModal />
      <InvitePeopleModal />
      <JoinTeamModal />
      <MembersModal />
    </>
  );
}
