"use client";

import { sendMessageAction } from "@/app/actions/chat";
import { useState } from "react";

export function ChatInput({
  onSend,
  isPending,
}: {
  onSend: (content: string) => void;
  isPending: boolean;
}) {
  const [content, setContent] = useState("");
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSend(content);
    setContent("");
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
