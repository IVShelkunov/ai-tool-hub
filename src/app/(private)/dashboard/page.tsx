import { ToolCard } from "@/components/shared/ToolCard";
import { Card, CardContent } from "@/components/ui/card";
import { DeleteToolsButton } from "@/components/ui/DeleteToolsButton";
import { db } from "@/db";
import { favorites } from "@/db/schema";
import { getSession } from "@/lib/auth-utils";
import { eq } from "drizzle-orm";

export default async function DashboardPage() {
  const currentUserId = await getSession();
  if (currentUserId) {
    const favoriteTools = await db.query.favorites.findMany({
      where: eq(favorites.userId, currentUserId),
      with: {
        tool: true,
      },
    });
    return (
      <div className="flex flex-col gap-4">
        <h2>YOUR TOOLS</h2>
        {favoriteTools.length === 0 && (
          <Card>
            <CardContent>You have no favorite instruments</CardContent>
          </Card>
        )}
        {favoriteTools && (
          <>
            {favoriteTools.map((fTools) => (
              <ToolCard tool={fTools.tool} key={fTools.id}>
                <DeleteToolsButton
                  userId={currentUserId}
                  toolId={fTools.tool.id}
                />
              </ToolCard>
            ))}
          </>
        )}
      </div>
    );
  }
}
