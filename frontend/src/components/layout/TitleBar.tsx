import { Menu } from "lucide-react";

export default function TitleBar() {
  return (
    <div className=" bg-zinc-950 w-full flex items-center justify-between p-2">
      <button className="md:hidden">
        <Menu className="w-6 h-6 text-zinc-300" />
      </button>
      <h1 className="text-zinc-400 font-semibold text-sm md:text-base">
        Communication platform for programmers
      </h1>
    </div>
  );
}
