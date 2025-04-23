"use client";

import {
  HomeIcon,
  Users2Icon,
  Bell,
  Menu,
  UserCircle2Icon,
  Settings,
} from "lucide-react";
import NavItem from "./NavItem";
import { useState } from "react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

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
            <NavItem
              icon={UserCircle2Icon}
              label="Profile"
              url="/"
              isOpen={isOpen}
            />
            <NavItem icon={Settings} label="Settings" url="/" isOpen={isOpen} />
          </ul>
        </nav>
      </div>
    </aside>
  );
}
