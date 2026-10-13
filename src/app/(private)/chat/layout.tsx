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
    <div className="flex flex-col overflow-hidden   ">
      <h2 className="text-center text-2xl tracking-widest">Chat</h2>
      <div className="flex-1 grid  grid-cols-4 gap-4">
        <div className="md:col-span-1 col-span-4 flex flex-col">
          {allUsers
            .filter((u) => u.id !== userId)
            .map((user) => (
              <Link key={user.id} href={`/chat/${user.id}`}>
                <Card>{user.email} </Card>
              </Link>
            ))}
        </div>
        <div className="md:col-span-3 md:col-start-2 col-span-4 col-start-1">
          {children}
        </div>
      </div>
    </div>
  );
}
