import { ChatContainer } from "@/components/shared/ChatContainer";
import { AvatarIcon } from "@/components/ui/AvatarIcon";
import { Card } from "@/components/ui/card";
import { db } from "@/db";
import { users } from "@/db/schema";
import { getSession } from "@/lib/utils/auth-utils";
import Link from "next/link";
import { ReactNode } from "react";

export default async function ChatLayout({
  children,
}: {
  children: ReactNode;
}) {
  const userId = await getSession();
  if (!userId) return null;
  const allUsers = await db.select().from(users);
  const sidebar = (
    <div className="flex flex-col gap-2 ">
      {allUsers
        .filter((u) => u.id !== userId)
        .map((user) => (
          <Link key={user.id} href={`/chat/${user.id}`}>
            <Card className="p-3 hover:bg-slate-800 transition-colors cursor-pointer flex items-center justify-between">
              <p className="truncate text-sm text-slate-200">{user.email}</p>
              <AvatarIcon url={user.avatarUrl} className="w-10 h-10" />
            </Card>
          </Link>
        ))}
    </div>
  );
  return (
    <div className="flex flex-col gap-2 overflow-hidden">
      <h2 className="text-center text-2xl tracking-widest">Chat</h2>
      <ChatContainer sidebar={sidebar}>{children}</ChatContainer>
    </div>
  );
}
