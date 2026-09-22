import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ResendButton } from "@/components/ui/ResendButton";
import { db } from "@/db";
import { users, verificationTokens } from "@/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

export default async function VerifyUserPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const tokenRecord = await db.query.verificationTokens.findFirst({
    where: eq(verificationTokens.token, token),
  });
  if (!tokenRecord) {
    return (
      <Card>
        <CardContent className="justify-center">Токен не найден.</CardContent>
      </Card>
    );
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, tokenRecord.userId),
  });
  if (!user) {
    return (
      <Card>
        <CardContent className="justify-center">
          Пользователь не найден.
        </CardContent>
      </Card>
    );
  }
  if (tokenRecord.expiresAt < new Date()) {
    return (
      <Card>
        <CardContent className="justify-center">
          Токен недействителен или просрочен.
          <ResendButton userId={tokenRecord?.userId} email={user.email} />
        </CardContent>
      </Card>
    );
  }
  await db
    .update(users)
    .set({ isVerified: true })
    .where(eq(users.id, tokenRecord.userId));
  await db
    .delete(verificationTokens)
    .where(eq(verificationTokens.id, tokenRecord.id));
  return (
    <Card>
      <CardTitle className="p-4 text-center flex flex-col ">
        Success!You account verify!
        <Link href={"/login"}>LOGIN</Link>
      </CardTitle>
    </Card>
  );
}
