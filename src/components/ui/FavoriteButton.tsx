"use client";
import { toggleFavorite } from "@/app/actions/tools";
import { useOptimistic, useTransition } from "react";
import { FavoriteIcon } from "./FavoriteIcon";

interface FavoriteButtonProps {
  userId: string;
  toolId: string;
  isFavorites: boolean;
}
export function FavoriteButton({
  toolId,
  isFavorites,
  userId,
}: FavoriteButtonProps) {
  const [optimisticIsFavorite, toggleOptimistic] = useOptimistic(
    isFavorites,
    (current) => !current,
  );
  const [isPending, startTransition] = useTransition();
  const handleClick = () => {
    startTransition(async () => {
      toggleOptimistic(null);
      await toggleFavorite(toolId, userId);
    });
  };
  return (
    <button disabled={isPending} onClick={handleClick}>
      <FavoriteIcon className="w-10 h-10" isFavorites={optimisticIsFavorite} />
    </button>
  );
}
