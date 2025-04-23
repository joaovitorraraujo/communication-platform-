"use client";
import { useState } from "react";
export default function ChatHeader() {
  const [activeTab, setActiveTab] = useState("chat");
  return (
    <div className="border-b-1 border-zinc-950 w-full">
      <div className="flex gap-4 items-end p-4">
        <div className="size-10 bg-zinc-300 rounded-md flex items-center justify-center">
          <p className="font-medium text-zinc-800">EC</p>
        </div>
        <h2 className="font-semibold text-2xl">Main</h2>

        <button
          onClick={() => setActiveTab("chat")}
          className={`border-b-2 ${
            activeTab === "chat"
              ? "border-zinc-50 text-zinc-50"
              : "border-transparent text-zinc-500"
          } text-lg hover:text-zinc-50 transition`}
        >
          Chat
        </button>

        <button
          onClick={() => setActiveTab("files")}
          className={`border-b-2 ${
            activeTab === "files"
              ? "border-zinc-50 text-zinc-50"
              : "border-transparent text-zinc-500"
          } text-lg hover:text-zinc-50 transition`}
        >
          Files
        </button>
      </div>
    </div>
  );
}
