import { cookies } from "next/headers";
import { LoginButton } from "../ui/LoginButton";
import Link from "next/link";
import { UILink } from "../ui/UILink";
import { UserWidget } from "./UserWidget";
import { MobileUserWidget } from "./MobileUserWidget";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { getSession } from "@/lib/utils/auth-utils";
import { users } from "@/db/schema";
import { AuthWidget } from "./AuthWidget";

export async function Header() {
  const userId = await getSession();

  return (
    <header className=" p-2 sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <nav
        className="container mx-auto flex h-16 items-center justify-between px-4 md:px-10"
        aria-label="Global"
      >
        <div className=" flex md:flex-row flex-col gap-2 items-center md:gap-8">
          <Link href={"/"}>
            <span className="md:text-5xl text-3xl font-bold  text-transparent bg-clip-text bg-linear-to-r from-sky-300 via-indigo-500 to-sky-400 shine-base hover-shine ">
              AI TOOL HUB
            </span>
          </Link>
          {userId ? (
            <>
              <UILink href="/dashboard" text="DASHBOARD" />
            </>
          ) : (
            <LoginButton />
          )}
        </div>
        {userId && <AuthWidget userId={userId} />}
      </nav>
    </header>
  );
}
