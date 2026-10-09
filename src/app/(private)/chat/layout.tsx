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
  return (
    <div className="flex flex-col">
      <h2 className="text-center text-2xl tracking-widest">Chat</h2>
      <div className="grid grid-cols-4">
        <Card className="col-span-1 flex flex-col">
          {allUsers
            .filter((u) => u.id !== userId)
            .map((user) => (
              <Link key={user.id} href={`/chat/${user.id}`}>
                {user.email}
              </Link>
            ))}
        </Card>
        <div className="col-span-3 col-start-2">{children}</div>
      </div>
    </div>
  );
}
