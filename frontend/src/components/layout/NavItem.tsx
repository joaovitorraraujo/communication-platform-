import Link from "next/link";
import { ElementType } from "react";

interface NavItemProps {
  icon: ElementType;
  label: string;
  url?: string;
  isOpen: boolean;
}

export default function NavItem({
  icon: Icon,
  label,
  url,
  isOpen,
}: NavItemProps) {
  const content = (
    <div className="flex items-center gap-1 p-3 duration-300 hover:bg-zinc-800 focus-within:bg-zinc-800 transition-colors py-1 rounded-md cursor-pointer">
      <Icon className="w-5 h-5 text-zinc-300" />
      {isOpen && <span className="text-zinc-300 p-2 text-sm">{label}</span>}
    </div>
  );

  return <li>{url ? <Link href={url}>{content}</Link> : content}</li>;
}
