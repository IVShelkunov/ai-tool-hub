"use client";
import { useOptimistic, useTransition } from "react";
import { FavoriteIcon } from "./FavoriteIcon";
import { toggleFavorite } from "@/app/actions";

interface FavoriteButtonProps {
  toolId: string;
  isFavorites: boolean;
}
export function FavoriteButton({ toolId, isFavorites }: FavoriteButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [optimisticIsFavorite, toggleOptimistic] = useOptimistic(
    isFavorites,
    (current) => !current,
  );
  const handleClick = () => {
    startTransition(async () => {
      toggleOptimistic(null);
      try {
        await toggleFavorite(toolId);
      } catch (e) {
        console.error("Network error", e);
      }
    });
  };
  return (
    <button
      disabled={isPending}
      onClick={handleClick}
      className="cursor-pointer "
    >
      <FavoriteIcon className="w-10 h-10" isFavorites={optimisticIsFavorite} />
    </button>
  );
}
