"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useModal } from "@/hooks/useModal";

import { TeamType } from "@/types/teamType";

import {
  ChevronDown,
  ChevronLeft,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";
import Link from "next/link";

interface HeaderSideBarProps {
  team: TeamType;
  role: "OWNER" | "ADMIN" | "MEMBER";
}

export const HeaderSideBar = ({ team, role }: HeaderSideBarProps) => {
  const { onOpen } = useModal();

  const isOwner = role === "OWNER";
  const isAdmin = role === "ADMIN" || isOwner;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center">
        <Link href="/teams">
          <ChevronLeft className="w-8 h-8" />
        </Link>

        <p className="text-zinc-300 text-lg font-semibold ml-auto mr-auto">
          All teams
        </p>
      </div>

      {/* FUTURA FOTO DA EQUIPE */}
      <div className="size-20 bg-zinc-300 rounded-md flex items-center justify-center mt-4">
        <p className="font-medium text-zinc-800 text-2xl">EC</p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none" asChild>
          <button className="w-full text-base font-semibold px-3 flex items-center h-12 border-neutral-800 border-b-2 hover:bg-zinc-700/10">
            {team.name}
            <ChevronDown className="w-4 h-4 ml-auto" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="border-0 w-56 text-sm font-medium text-neutral-400 space-y-[2px] bg-zinc-950">
          {isOwner && (
            <DropdownMenuItem
              className="text-sm text-indigo-400 px-3 py-2 cursor-pointer"
              onClick={() => onOpen("invite", { team })}
            >
              Invite people
              <UserPlus className="w-4 h-4 ml-auto" />
            </DropdownMenuItem>
          )}

          {isAdmin && (
            <DropdownMenuItem className="text-sm px-3 py-2 cursor-pointer">
              Team Settings
              <Settings className="w-4 h-4 ml-auto" />
            </DropdownMenuItem>
          )}

          {isAdmin && (
            <DropdownMenuItem
              className="text-sm px-3 py-2 cursor-pointer"
              onClick={() => onOpen("members", { team })}
            >
              Manage Members
              <Users className="w-4 h-4 ml-auto" />
            </DropdownMenuItem>
          )}

          {isAdmin && (
            <DropdownMenuItem className="text-sm px-3 py-2 cursor-pointer">
              Create Channel
              <PlusCircle className="w-4 h-4 ml-auto" />
            </DropdownMenuItem>
          )}

          {isOwner && (
            <>
              <DropdownMenuSeparator className="bg-zinc-900" />
              <DropdownMenuItem className="text-rose-500 text-sm px-3 py-2 cursor-pointer">
                Delete Team
                <Trash className="w-4 h-4 ml-auto" />
              </DropdownMenuItem>
            </>
          )}

          {!isOwner && (
            <DropdownMenuItem className="text-rose-500 text-sm px-3 py-2 cursor-pointer">
              Leave Team
              <LogOut className="w-4 h-4 ml-auto" />
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
