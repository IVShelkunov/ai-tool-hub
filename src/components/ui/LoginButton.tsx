"use client";

import { useRouter } from "next/navigation";

export function LoginButton() {
  const router = useRouter();
  return (
    <button
      className="transition-all duration-300 p-1 cursor-pointer rounded-lg border border-transparent  hover:border-white/50"
      onClick={() => router.push("/login")}
    >
      LOGIN
    </button>
  );
}
