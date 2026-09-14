export default function DeleteCart({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <line
          id="vertical-line"
          x1={0}
          y1={0}
          x2={0}
          y2={20}
          stroke="#fff"
          strokeWidth={3}
          strokeLinecap="round"
        />
      </defs>
      <path
        d="M 5,10 l 40,0 a 5,5 0 0 0 -5,-5 l -10,0 l 0,-2.5 l -10,0 l 0,2.5 l -10,0 a 5,5 0 0 0 -5,5"
        stroke="#fff"
        fill="none"
      />
      <path
        d="M 10,15 l 0,25 a 5,5 0 0 0 5,5 l 20,0 a 5,5 0 0 0 5,-5 l 0,-25 Z"
        fill="none"
        stroke="#fff"
      />
      <use href="#vertical-line" x={15} y={20} />
      <use href="#vertical-line" x={25} y={20} />
      <use href="#vertical-line" x={35} y={20} />
    </svg>
  );
}
