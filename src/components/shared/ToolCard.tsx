import { aiTools } from "@/db/schema";
import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface ToolCardProps {
  tool: typeof aiTools.$inferSelect;
  children: ReactNode;
}
export function ToolCard({ tool, children }: ToolCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{tool.name}</CardTitle>
        <CardDescription>{tool.description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
