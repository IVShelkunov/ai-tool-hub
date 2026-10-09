import { users } from "@/db/schema";
import { LogoutButton } from "../ui/LogoutButton";
import { Card } from "../ui/card";
import { UILink } from "../ui/UILink";
import { AvatarIcon } from "../ui/AvatarIcon";

export async function UserWidget({
  user,
}: {
  user: typeof users.$inferSelect;
}) {
  return (
    <div className="hidden  relative group md:flex cursor-pointer group">
      <AvatarIcon url={user.avatarUrl} className="w-10 h-10" />
      <Card className="opacity-0 pointer-events-none  absolute  flex flex-col items-center justify-center top-full right-0 group-hover:opacity-100 group-hover:pointer-events-auto z-50">
        <UILink href="/profile" text="PROFILE" />
        <UILink href="/chat" text="CHAT" />
        <LogoutButton />
      </Card>
    </div>
  );
}
