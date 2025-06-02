import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";

import { LogIn, LucidePlusSquare, PlusCircle } from "lucide-react";
import { useModal } from "@/hooks/useModal";

export default function CreateServerButton() {
  const { onOpen } = useModal();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="ml-auto">
          <div className="border border-zinc-400 ml-auto flex gap-2 items-center p-2 rounded-sm">
            <LucidePlusSquare className="w-6 h-6 hidden sm:block" />
            <span className="text-sm md:text-base">Create or join a team</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className={cn("bg-zinc-800 text-white border-0 shadow-2xl ")}
        >
          <DropdownMenuItem
            className="data-[highlighted]:bg-zinc-700 data-[highlighted]:text-white"
            onSelect={() => onOpen("join")}
          >
            Join a team
            <LogIn className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="data-[highlighted]:bg-zinc-700 data-[highlighted]:text-white"
            onSelect={() => onOpen("createServer")}
          >
            Create a team
            <PlusCircle className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
