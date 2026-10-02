import { AvatarUploader } from "@/components/shared/AvatarUploader";
import { ProfileEditForm } from "@/components/shared/ProfileEditForm";
import { AvatarIcon } from "@/components/ui/AvatarIcon";
import { Card } from "@/components/ui/card";
import { db } from "@/db";
import { users } from "@/db/schema";
import { getSession } from "@/lib/utils/auth-utils";
import { eq } from "drizzle-orm";

export default async function ProfilePage() {
  const userId = await getSession();
  if (!userId) {
    return <Card>User is not found</Card>;
  }
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (user)
    return (
      <div className="flex flex-col items-center justify-center gap-4 ">
        <h2 className="text-2xl text-center tracking-widest ">PROFILE</h2>

        <div className="relative group cursor-pointer">
          <AvatarIcon
            url={user.avatarUrl}
            className="w-32 h-32 rounded-full object-cover border-2 border-indigo-500"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <AvatarUploader userId={user.id} />
          </div>
        </div>
        {userId && <ProfileEditForm user={user} initialValue={user.name} />}
      </div>
    );
}
