import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <Card>
        {children}
        <nav className="flex items-center justify-center gap-4">
          <Link href={"/login"}>LOGIN</Link>
          <Link href={"/login/register"}>REGISTER</Link>
        </nav>
      </Card>
    </div>
  );
}
