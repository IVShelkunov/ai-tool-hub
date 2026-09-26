"use server"

import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const updateAvatarAction = async (userId: string, avatarUrl: string) => {
    await db.update(users).set({ avatarUrl }).where(eq(users.id, userId));
    revalidatePath('/profile');
}

export const updateNameAction = async (userId: string, formData: FormData) => {
    const name = formData.get("name") as string;
    await db.update(users).set({ name }).where(eq(users.id, userId));
    revalidatePath('/profile');
}