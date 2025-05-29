"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  HomeIcon,
  Users2Icon,
  Bell,
  Menu,
  UserCircle2Icon,
  Settings,
  LogOutIcon,
} from "lucide-react";
import NavItem from "./NavItem";
import { useState } from "react";

import { signOutAPI } from "../../api/authRequest";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    await signOutAPI();

    router.push("/login");
  };

  return (
    <aside
      className={`hidden md:block h-full bg-zinc-950 border-t border-zinc-600 transition-all duration-300 ${
        isOpen ? "w-52" : "w-0 md:w-16"
      }`}
    >
      <div className="h-full px-2 py-4 flex flex-col">
        <button onClick={() => setIsOpen(!isOpen)} className="mb-4 ml-2.5">
          <Menu className="w-6 h-6 text-zinc-300" />
        </button>

        <nav className="flex flex-col h-full">
          <ul className="space-y-1">
            <NavItem icon={HomeIcon} label="Home" url="/" isOpen={isOpen} />
            <NavItem
              icon={Users2Icon}
              label="Teams"
              url="/teams"
              isOpen={isOpen}
            />
            <NavItem icon={Bell} label="Pending" url="/" isOpen={isOpen} />
          </ul>

          <ul className="mt-auto space-y-1 border-t border-zinc-600 pt-2">
            <DropdownMenu>
              <DropdownMenuTrigger className={cn("w-full")}>
                <NavItem
                  icon={UserCircle2Icon}
                  label="Profile"
                  isOpen={isOpen}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className={cn("bg-zinc-800 text-white border-0 shadow-2xl ")}
              >
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="data-[highlighted]:bg-zinc-700 data-[highlighted]:text-white">
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="data-[highlighted]:bg-zinc-700 data-[highlighted]:text-white"
                  onSelect={handleSignOut}
                >
                  Logout
                  <LogOutIcon className="ml-auto w-4 h-4 text-white" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <NavItem icon={Settings} label="Settings" url="/" isOpen={isOpen} />
          </ul>
        </nav>
      </div>
    </aside>
  );
}
