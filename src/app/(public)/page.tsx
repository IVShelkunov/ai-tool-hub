import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { db } from "@/db";
import { aiTools, favorites, sessions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export default async function Home() {
  const coockieStore = await cookies();
  const token = coockieStore.get("session_token")?.value;
  let currentUserId: string | null = null;
  if (token) {
    const session = await db.query.sessions.findFirst({
      where: eq(sessions.sessionToken, token),
    });
    currentUserId = session?.userId || null;
  }
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
          <Card
            key={tool.id}
            className="border-indigo-500 hover:scale-102 transition-all duration-200 "
          >
            <CardHeader>
              <CardTitle>{tool.name}</CardTitle>
              <CardDescription>{tool.description}</CardDescription>
              {currentUserId && (
                <CardContent>
                  <FavoriteButton
                    userId={currentUserId}
                    toolId={tool.id}
                    isFavorites={favoritesIds.has(tool.id)}
                  />
                </CardContent>
              )}
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
