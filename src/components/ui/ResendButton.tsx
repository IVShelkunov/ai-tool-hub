"use client";
import { resendVerificationAction } from "@/app/actions/auth";
import { useTransition } from "react";

export function ResendButton({
  userId,
  email,
}: {
  userId: string;
  email: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      disabled={isPending}
      onClick={() =>
        startTransition(() => resendVerificationAction(userId, email))
      }
      className="text-sky-400 hover:underline"
    >
      {isPending ? "SENDING..." : "RESEND THE MAIL"}
    </button>
  );
}
