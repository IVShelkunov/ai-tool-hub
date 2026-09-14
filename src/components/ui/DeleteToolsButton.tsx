"use client";
import { useTransition } from "react";
import DeleteCart from "../icon/DeleteCart";
import { toggleFavorite } from "@/app/actions/tools";

interface DeleteToolsButtonProps {
  userId: string;
  toolId: string;
}

export function DeleteToolsButton({ userId, toolId }: DeleteToolsButtonProps) {
  const [isPending, startTransition] = useTransition();
  const handleClick = () => {
    startTransition(async () => {
      await toggleFavorite(toolId, userId);
    });
  };
  return (
    <button disabled={isPending} onClick={handleClick}>
      <DeleteCart className="w-10 h-10" />
    </button>
  );
}
