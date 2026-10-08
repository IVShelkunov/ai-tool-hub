"use client";
import { messages } from "@/db/schema";
import { pusherClient } from "@/lib/pusher";
import { cn } from "cn";
import { useEffect, useState } from "react";
import { ChatInput } from "./ChatInput";

type Message = typeof messages.$inferSelect;
export function ChatWindow({ receiverId }: { receiverId: string }) {
  const [msgs, setMsgs] = useState<Message[]>([]);
  useEffect(() => {
    const channel = pusherClient.subscribe(`chat-${receiverId}`);
    channel.bind("new-message", (data: Message) => {
      setMsgs((prev) => [...prev, data]);
    });
  }, [receiverId]);
  return (
    <div className="flex flex-col ">
      <div className="flex flex-col">
        {msgs.length === 0 && <div>Chat is empty.Be the first to write!</div>}
        {msgs.map((msg) => (
          <div
            className={cn(
              "flex",
              msg.receiverId === receiverId ? "justify-end" : "justify-start",
            )}
          >
            {msg.content}
          </div>
        ))}
        <form>
          <input type="text" />
          <ChatInput receiverId={receiverId} />
        </form>
      </div>
    </div>
  );
}
