"use client";
import { useState } from "react";
import { AvatarIcon } from "../ui/AvatarIcon";
import { Card } from "../ui/card";
import { UILink } from "../ui/UILink";
import { LogoutButton } from "../ui/LogoutButton";
import { users } from "@/db/schema";
import CancelCross from "../icon/CanselCross";

export function MobileUserWidget({
  user,
}: {
  user: typeof users.$inferSelect;
}) {
  const [isShowMenu, setIsShow] = useState(false);
  return (
    <div
      onClick={() => setIsShow(true)}
      className="md:hidden group flex cursor-pointer group"
    >
      <AvatarIcon url={user.avatarUrl} className="w-10 h-10" />
      {isShowMenu && (
        <Card
          onClick={(e) => e.stopPropagation()}
          className="bg-indigo-900/70  absolute inset-0 h-screen flex flex-col justify-center text-2xl items-center gap-4"
        >
          <button onClick={() => setIsShow(false)}>
            <CancelCross className="w-10 h-10 absolute top-4 left-4" />
          </button>
          <UILink
            onClick={() => setIsShow(false)}
            href="/profile"
            text="PROFILE"
          />
          <LogoutButton />
        </Card>
      )}
    </div>
  );
}
