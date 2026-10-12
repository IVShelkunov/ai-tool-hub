import { getMessage } from "@/app/actions/chat";
import { ChatWindow } from "@/components/shared/ChatWindow";
import { getSession } from "@/lib/utils/auth-utils";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const myUserId = await getSession();
  if (!myUserId) return null;
  const { userId } = await params;
  const initialMessages = await getMessage(userId);
  return (
    <ChatWindow
      senderId={myUserId}
      initialMsg={initialMessages}
      receiverId={userId}
    />
  );
}
