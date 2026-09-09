import { FavoriteButton } from "@/components/shared/FavoriteButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/db";
import { aiTools, favorites } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function Home() {
  const tools = await db.select().from(aiTools);
  const favoritesTools = await db
    .select({
      toolId: favorites.toolId,
    })
    .from(favorites)
    .where(eq(favorites.userId, "system_user"));
  const favoritesIds = new Set(favoritesTools.map((f) => f.toolId));
  return (
    <main className="p-10">
      <h1 className="md:text-5xl text-3xl font-bold mb-6 text-transparent tracking-widest [-webkit-text-stroke:1px_var(--color-sky-500)] ">
        AI TOOL HUB
      </h1>
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
            <CardContent>
              <FavoriteButton
                isFavorites={favoritesIds.has(tool.id)}
                toolId={tool.id}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
