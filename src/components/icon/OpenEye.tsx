import { cn } from "cn";

export const OpenEye = ({ className }: { className?: string }) => {
  return (
    <svg viewBox="0 0 50 50" className={cn("cursor-pointer", className)}>
      <path
        d="M 5,25 a 30 30 0 0 1 40,0 a 30 30 0 0 1 -40,0"
        fill="none"
        stroke="#1a9cb0"
      ></path>
      <circle cx={25} cy={25} r={5} fill="#1a9cb0" />
    </svg>
  );
};
