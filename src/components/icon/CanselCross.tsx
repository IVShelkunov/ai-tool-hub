import { cn } from "cn";

export default function CancelCross({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("transition-all duration-300 hover:scale-125 ", className)}
    >
      <defs>
        <g id="cross">
          <rect x={20} y={5} width={10} height={40} />
          <rect x={5} y={20} width={40} height={10} />
        </g>
      </defs>
      <use
        href={"#cross"}
        transform="translate(25,-10) rotate(45) "
        className="fill-sky-400 transition-all duration-300 hover:fill-sky-300"
      />
    </svg>
  );
}
