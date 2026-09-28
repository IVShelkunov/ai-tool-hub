import { Card } from "@/components/ui/card";
import { UILink } from "@/components/ui/UILink";
import Link from "next/link";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <Card>
        {children}
        <nav className="flex items-center justify-center gap-4">
          <UILink href="/login" text="LOGIN" />
          <UILink href="/login/register" text="REGISTER" />
        </nav>
      </Card>
    </div>
  );
}
