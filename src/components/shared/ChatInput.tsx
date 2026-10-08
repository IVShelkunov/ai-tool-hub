"use client";

import { sendMessageAction } from "@/app/actions/chat";
import { useState, useTransition } from "react";

export function ChatInput({ receiverId }: { receiverId: string }) {
  const [content, setContent] = useState("");
  const [isPending, startTransition] = useTransition();
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const messageContent = content;
    setContent("");

    startTransition(async () => {
      await sendMessageAction(receiverId, messageContent);
    });
  };

  return (
    <form onSubmit={handleSend} className="flex gap-2">
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 p-2 rounded-lg bg-slate-900 border border-white/10"
        placeholder="Type a message..."
      />
      <button type="submit" disabled={isPending}>
        SEND
      </button>
    </form>
  );
}
