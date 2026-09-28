import { cn } from "cn";
import Link from "next/link";

interface UILinkProps {
  text: string;
  href: string;
  className?: string;
}

export function UILink({ text, href, className }: UILinkProps) {
  return (
    <Link
      className={cn(
        "text-sm font-medium text-slate-300 hover:text-white transition-colors",
        className,
      )}
      href={href}
    >
      {text}
    </Link>
  );
}
