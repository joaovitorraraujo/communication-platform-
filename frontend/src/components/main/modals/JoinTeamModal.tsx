"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/useModal";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { joinTeamApi } from "@/api/teamRequest";
import { useRouter } from "next/navigation";

export function JoinTeamModal() {
  const { isOpen, type, onClose } = useModal();
  const router = useRouter();

  const isJoinOpen = isOpen && type === "join";

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleJoin = () => {
    if (!code) return;
    router.push(`${code}`);
    onClose();
  };

  return (
    <Dialog open={isJoinOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-800 border-0 text-white">
        <DialogHeader>
          <DialogTitle>Join a Team</DialogTitle>
          <DialogDescription className="text-zinc-300/70">
            Enter the invite code to join a team
          </DialogDescription>
        </DialogHeader>

        <Label className="uppercase font-bold text-xs text-zinc-300">
          Invite Code
        </Label>
        <Input
          className="focus-visible:ring-0 border-0 bg-zinc-900/70 text-white focus-visible:ring-offset-0 mt-2"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter invite code..."
        />

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <Button
          onClick={handleJoin}
          className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white w-full"
          disabled={loading || !code}
        >
          {loading ? "Joining..." : "Join Team"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
