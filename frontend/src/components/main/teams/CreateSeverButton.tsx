import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";

import { LucidePlusSquare } from "lucide-react";
import { CreateServerModal } from "../modals/CreateServerModal";

import { useState } from "react";

export default function CreateServerButton() {
  const [open, setOpen] = useState(false);

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
          <DropdownMenuItem className="data-[highlighted]:bg-zinc-700 data-[highlighted]:text-white">
            Join a team
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="data-[highlighted]:bg-zinc-700 data-[highlighted]:text-white"
            onSelect={() => setOpen(true)}
          >
            Create a team
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CreateServerModal open={open} onOpenChange={setOpen} />
    </>
  );
}
