"use client";

import { useRouter } from "next/navigation";

export function LoginButton() {
  const router = useRouter();
  return <button onClick={() => router.push("/login")}>LOGIN</button>;
}
