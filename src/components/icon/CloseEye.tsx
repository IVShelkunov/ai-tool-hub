import { cn } from "cn";

export const CloseEye = ({ className }: { className?: string }) => {
  return (
    <svg viewBox="0 0 50 50" className={cn("cursor-pointer", className)}>
      <path
        d="M 5,25 a 30 30 0 0 1 40,0 a 30 30 0 0 1 -40,0"
        fill="none"
        stroke="#1a9cb0"
      ></path>
      <path
        d="M 5,30 a 30 30 0 0 0 40,0 "
        fill="none"
        stroke="#1a9cb0"
        strokeWidth={5}
        strokeDasharray="2 5"
      ></path>
    </svg>
  );
};
