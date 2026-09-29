import { db } from "@/db";
import { users } from "@/db/schema";
import { getSession } from "@/lib/utils/auth-utils";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { LogoutButton } from "../ui/LogoutButton";
import { Card } from "../ui/card";
import { UILink } from "../ui/UILink";

export async function UserWidget() {
  const userId = await getSession();
  if (!userId) {
    return null;
  }
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });
  if (user)
    return (
      <div className=" relative group md:flex cursor-pointer group">
        <Image
          src={user.avatarUrl || "/placeholder"}
          width={50}
          height={50}
          alt="avatar"
          priority
          className="rounded-full"
        />
        <Card className="opacity-0 pointer-events-none  absolute  flex flex-col items-center justify-center top-full right-0 group-hover:opacity-100 group-hover:pointer-events-auto z-50">
          <UILink href="/profile" text="PROFILE" />
          <LogoutButton />
        </Card>
      </div>
    );
}
