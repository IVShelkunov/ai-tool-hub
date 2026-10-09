"use client";
import { messages } from "@/db/schema";
import { pusherClient } from "@/lib/pusher";
import { cn } from "cn";
import { useEffect, useState } from "react";
import { ChatInput } from "./ChatInput";

type Message = typeof messages.$inferSelect;
export function ChatWindow({
  receiverId,
  initialMsg,
}: {
  receiverId: string;
  initialMsg: (typeof messages.$inferSelect)[];
}) {
  const [msgs, setMsgs] = useState<Message[]>(initialMsg);
  useEffect(() => {
    const channel = pusherClient.subscribe(`chat-${receiverId}`);
    const handleMessage = (data: Message) => {
      setMsgs((prev) => [...prev, data]);
    };
    channel.bind("new-message", handleMessage);
    return () => {
      channel.unbind("new-message", handleMessage);
      pusherClient.unsubscribe(`chat-${receiverId}`);
    };
  }, [receiverId]);
  return (
    <div className="flex flex-col ">
      <div className="flex flex-col gap-4">
        {msgs.length === 0 && <div>Chat is empty.Be the first to write!</div>}
        {msgs.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex",
              msg.receiverId === receiverId ? "justify-end" : "justify-start",
            )}
          >
            {msg.content}
          </div>
        ))}
        <ChatInput receiverId={receiverId} />
      </div>
    </div>
  );
}
