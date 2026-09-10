import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/db";
import { aiTools } from "@/db/schema";

export default async function Home() {
  const tools = await db.select().from(aiTools);
  return (
    <div className="p-10">
      <div className="grid gap-4">
        {tools.map((tool) => (
          <Card
            key={tool.id}
            className="border-indigo-500 hover:scale-102 transition-all duration-200 "
          >
            <CardHeader>
              <CardTitle>{tool.name}</CardTitle>
              <CardDescription>{tool.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
