"use client";

import { cn } from "cn";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface ChatContainerProps {
  sidebar: ReactNode;
  children: ReactNode;
}

export function ChatContainer({ sidebar, children }: ChatContainerProps) {
  const pathname = usePathname();
  const isInsideChat = pathname !== "/chat";
  return (
    <div className="flex-1 grid  grid-cols-4 gap-4 items-start">
      <aside
        className={cn(
          "col-span-4 md:col-span-1 flex flex-col overflow-y-auto",
          isInsideChat ? "hidden md:flex" : "flex",
        )}
      >
        {sidebar}
      </aside>
      <section
        className={cn(
          "md:col-span-3 md:col-start-2 col-span-4 col-start-1 h-full overflow-hidden",
        )}
      >
        {children}
      </section>
    </div>
  );
}
