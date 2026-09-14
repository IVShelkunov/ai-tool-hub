import { cn } from "cn";

interface FavoriteIconProps {
  isFavorites: boolean;
  className: string;
}
export const FavoriteIcon = ({ isFavorites, className }: FavoriteIconProps) => {
  return (
    <svg viewBox="0 0 50 50" className={cn(className)}>
      <path
        d="M 25,5 l -5,15 l -15,0 l 10,10 l -5,15 l 15,-10 l 15,10 l -5,-15 l 10-10 l -15,0 Z"
        fill="none"
        className={cn(isFavorites && "fill-sky-400")}
        stroke="oklch(74.6% 0.16 232.661)"
      />
    </svg>
  );
};
