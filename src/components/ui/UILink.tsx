import { cn } from "cn";
import Link from "next/link";

interface UILinkProps {
  text: string;
  href: string;
  className?: string;
  onClick?: () => void;
}

export function UILink({ text, href, className, onClick }: UILinkProps) {
  return (
    <Link
      onClick={onClick}
      className={cn(
        " font-medium text-slate-300 hover:text-white transition-colors",
        className,
      )}
      href={href}
    >
      {text}
    </Link>
  );
}
