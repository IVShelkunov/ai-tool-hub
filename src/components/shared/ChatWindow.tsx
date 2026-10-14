"use client";
import { messages } from "@/db/schema";
import { pusherClient } from "@/lib/pusher";
import { cn } from "cn";
import {
  useEffect,
  useOptimistic,
  useRef,
  useState,
  useTransition,
} from "react";
import { ChatInput } from "./ChatInput";
import { sendMessageAction } from "@/app/actions/chat";
import { getChatRoomId } from "@/lib/utils/chat";
import { MessageCard } from "./MessageCard";
type StatusMessage = "pending" | "sent" | "error";
type DBMessage = typeof messages.$inferSelect;
export type UIMessage = DBMessage & {
  status: StatusMessage;
};
export function ChatWindow({
  senderId,
  receiverId,
  initialMsg,
}: {
  senderId: string;
  receiverId: string;
  initialMsg: DBMessage[];
}) {
  const chatMsgRef = useRef<HTMLDivElement>(null);
  const [isPending, startTransition] = useTransition();
  const [msgs, setMsgs] = useState<UIMessage[]>(() =>
    initialMsg.map((m) => ({ ...m, status: "sent" })),
  );
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    msgs,
    (state: UIMessage[], newMsg: UIMessage) => [...state, newMsg],
  );

  useEffect(() => {
    const roomId = getChatRoomId(senderId, receiverId);
    const channel = pusherClient.subscribe(`chat-${roomId}`);
    const handleMessage = (data: DBMessage) => {
      if (data.senderId === senderId) return;
      setMsgs((prev) => [...prev, { ...data, status: "sent" }]);
    };
    channel.bind("new-message", handleMessage);
    return () => {
      channel.unbind("new-message", handleMessage);
      pusherClient.unsubscribe(`chat-${receiverId}`);
    };
  }, [receiverId]);
  const handleSend = (content: string) => {
    startTransition(async () => {
      const tempId = crypto.randomUUID();
      const tempMsg: UIMessage = {
        id: tempId,
        content,
        senderId,
        receiverId,
        createdAt: new Date(),
        status: "pending",
      };
      addOptimisticMessage(tempMsg);
      try {
        const result = await sendMessageAction(senderId, receiverId, content);
        setMsgs((prev) => [...prev, { ...result.message, status: "sent" }]);
      } catch (err) {
        console.error("Ошибка отправки");
      }
    });
  };
  useEffect(() => {
    if (chatMsgRef.current) {
      chatMsgRef.current.scrollTop = chatMsgRef.current.scrollHeight;
    }
  }, [optimisticMessages]);
  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] p-6">
      <div
        ref={chatMsgRef}
        className="flex flex-1 flex-col gap-4 py-4 overflow-y-auto"
      >
        {optimisticMessages.length === 0 && (
          <div>Chat is empty.Be the first to write!</div>
        )}
        {optimisticMessages.map((msg) => (
          <MessageCard key={msg.id} senderId={senderId} message={msg} />
        ))}
      </div>
      <ChatInput isPending={isPending} onSend={handleSend} />
    </div>
  );
}
