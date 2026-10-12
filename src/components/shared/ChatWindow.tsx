"use client";
import { messages } from "@/db/schema";
import { pusherClient } from "@/lib/pusher";
import { cn } from "cn";
import { useEffect, useOptimistic, useState, useTransition } from "react";
import { ChatInput } from "./ChatInput";
import { sendMessageAction } from "@/app/actions/chat";
import { getChatRoomId } from "@/lib/utils/chat";

type Message = typeof messages.$inferSelect;
export function ChatWindow({
  senderId,
  receiverId,
  initialMsg,
}: {
  senderId: string;
  receiverId: string;
  initialMsg: (typeof messages.$inferSelect)[];
}) {
  const [isPending, startTransition] = useTransition();
  const [msgs, setMsgs] = useState<Message[]>(initialMsg);
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    msgs,
    (state: Message[], newMsg: Message) => [...state, newMsg],
  );
  useEffect(() => {
    const roomId = getChatRoomId(senderId, receiverId);
    const channel = pusherClient.subscribe(`chat-${roomId}`);
    const handleMessage = (data: Message) => {
      setMsgs((prev) => [...prev, data]);
    };
    channel.bind("new-message", handleMessage);
    return () => {
      channel.unbind("new-message", handleMessage);
      pusherClient.unsubscribe(`chat-${receiverId}`);
    };
  }, [receiverId]);
  const handleSend = (content: string) => {
    startTransition(async () => {
      addOptimisticMessage({
        id: crypto.randomUUID(),
        content,
        senderId: senderId,
      } as Message);
      await sendMessageAction(senderId, receiverId, content);
    });
  };
  return (
    <div className="flex flex-col p-6">
      <div className="flex flex-col gap-4 overflow-y-scroll">
        {optimisticMessages.length === 0 && (
          <div>Chat is empty.Be the first to write!</div>
        )}
        {optimisticMessages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              " rounded-2xl p-2 ",
              msg.receiverId === senderId
                ? " bg-slate-500/70"
                : " bg-sky-600/70",
            )}
          >
            {msg.content}
          </div>
        ))}
        <ChatInput isPending={isPending} onSend={handleSend} />
      </div>
    </div>
  );
}
