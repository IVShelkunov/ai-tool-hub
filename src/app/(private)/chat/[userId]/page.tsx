import { getMessage } from "@/app/actions/chat";
import { ChatWindow } from "@/components/shared/ChatWindow";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const initialMessages = await getMessage(userId);
  return <ChatWindow initialMsg={initialMessages} receiverId={userId} />;
}
