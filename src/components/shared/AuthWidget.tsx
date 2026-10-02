import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { UserWidget } from "./UserWidget";
import { MobileUserWidget } from "./MobileUserWidget";

export async function AuthWidget({ userId }: { userId: string }) {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });
  return (
    <div className="flex items-center gap-4">
      {user && (
        <>
          <MobileUserWidget user={user} />
          <UserWidget user={user} />
        </>
      )}
    </div>
  );
}
