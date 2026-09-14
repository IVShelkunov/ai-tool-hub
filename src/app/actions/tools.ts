'use server'

import { db } from "@/db"
import { favorites } from "@/db/schema"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const toggleFavorite = async (toolId: string, userId: string) => {
    const existing = await db.select().from(favorites).where(and(eq(favorites.toolId, toolId), eq(favorites.userId, userId)));
    if (existing.length > 0) {
        await db.delete(favorites).where(eq(favorites.id, existing[0].id));
    } else {
        await db.insert(favorites).values({
            toolId,
            userId
        });
    }
    revalidatePath('/dashboard');
}