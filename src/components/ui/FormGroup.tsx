import { cn } from "cn";
import { ReactNode } from "react";

export const FormGroup = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col gap-2 ", className)}>{children}</div>
  );
};
