import { ToolCard } from "@/components/shared/ToolCard";
import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { db } from "@/db";
import { aiTools, favorites } from "@/db/schema";
import { getSession } from "@/lib/auth-utils";
import { eq } from "drizzle-orm";

export default async function Home() {
  const currentUserId = await getSession();
  let favoritesIds = new Set<string>();
  if (currentUserId) {
    const userFavorites = await db
      .select({ toolId: favorites.toolId })
      .from(favorites)
      .where(eq(favorites.userId, currentUserId));
    favoritesIds = new Set(userFavorites.map((f) => f.toolId));
  }
  const tools = await db.select().from(aiTools);
  return (
    <div className="p-10">
      <div className="grid gap-4">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool}>
            {currentUserId && (
              <FavoriteButton
                userId={currentUserId}
                toolId={tool.id}
                isFavorites={favoritesIds.has(tool.id)}
              />
            )}
          </ToolCard>
        ))}
      </div>
    </div>
  );
}
