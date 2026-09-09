"use server"

import { and, eq } from "drizzle-orm"
import { db } from "../db"
import { favorites } from "../db/schema"
import { revalidatePath } from "next/cache";

export async function toggleFavorite(toolId: string) {
    const existingFavorite = await db.select().from(favorites).where(and(
        eq(favorites.toolId, toolId),
        eq(favorites.userId, "system_user")
    ));
    if (existingFavorite.length > 0) {
        await db.delete(favorites).where(eq(favorites.id, existingFavorite[0].id))
    } else {
        await db.insert(favorites).values({
            toolId,
            userId: "system_user"
        });
    }
}
revalidatePath('/');