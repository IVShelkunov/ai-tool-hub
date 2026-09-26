import { cookies } from "next/headers";
import { LoginButton } from "../ui/LoginButton";
import Link from "next/link";
import { LogoutButton } from "../ui/LogoutButton";

export async function Header() {
  const coockieStore = await cookies();
  const token = coockieStore.get("session_token");
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <nav
        className="container mx-auto flex h-16 items-center justify-between px-4 md:px-10"
        aria-label="Global"
      >
        <div className="flex md:flex-row flex-col gap-2 items-center md:gap-8">
          <Link href={"/"}>
            <span className="md:text-5xl text-3xl font-bold  text-transparent bg-clip-text bg-linear-to-r from-sky-300 via-indigo-500 to-sky-400 shine-base hover-shine ">
              AI TOOL HUB
            </span>
          </Link>
          {token && (
            <>
              <Link
                href={"/dashboard"}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                DASHBOARD
              </Link>
              <Link
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                href={"/profile"}
              >
                PROFILE
              </Link>
            </>
          )}
        </div>
        <div className="flex items-center gap-4">
          {token ? <LogoutButton /> : <LoginButton />}
        </div>
      </nav>
    </header>
  );
}
