"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useModal } from "@/hooks/useModal";
import { UseAvatar } from "@/components/main/teams/UseAvatar";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { JSX } from "react";

const roleIconMap = {
  MEMBER: null,
  ADMIN: <ShieldCheck className="w-4 h-4 ml-2 text-indigo-500" />,
  OWNER: <ShieldAlert className="w-4 h-4 ml-2 text-rose-500" />,
} as Record<string, JSX.Element | null>;

export function MembersModal() {
  const { isOpen, type, onClose, data } = useModal();

  const isInviteOpen = isOpen && type === "members";

  const { team } = data;

  return (
    <Dialog open={isInviteOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-800 border-0 text-white">
        <DialogHeader>
          <DialogTitle>Manage Members</DialogTitle>
          <DialogDescription className="text-zinc-300/70">
            {team?.members.length} Members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          {team?.members.map((member: any) => (
            <div key={member.id} className="flex items-center gap-x-2 mb-6 ">
              <UseAvatar src="cn" />
              <div className="flex flex-col gap-y-1">
                <p className="font-semibold text-sm flex items-center gap-x-1">
                  {member.user.name}
                  {roleIconMap[member.role]}
                </p>

                <p className="text-xs text-zinc-400">{member.user.email}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
