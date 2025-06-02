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
import { Check, Copy } from "lucide-react";
import { useOrigin } from "@/hooks/useOrigin";
import { useState } from "react";

export function InvitePeopleModal() {
  const { isOpen, type, onClose, data } = useModal();
  const origin = useOrigin();

  const [copied, setCopied] = useState(false);

  const isInviteOpen = isOpen && type === "invite";

  const { team } = data;

  const inviteCode = `${origin}/invite/${team?.code}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <Dialog open={isInviteOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-800 border-0 text-white">
        <DialogHeader>
          <DialogTitle>Invite people to your team</DialogTitle>
          <DialogDescription className="text-zinc-300/70">
            Copy this Link and send it to the people you want to invite
          </DialogDescription>
        </DialogHeader>
        <Label className="uppercase font-bold text-xs text-zinc-300">
          Link to invite
        </Label>
        <div className="flex items-center gap-x-2 mt-2">
          <Input
            className="focus-visible:ring-0 border-0 bg-zinc-900/70 text-white focus-visible:ring-offset-0"
            value={inviteCode}
            readOnly
          />
          <Button
            onClick={onCopy}
            size="icon"
            className="w-9 h-9 bg-zinc-900/70"
          >
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
