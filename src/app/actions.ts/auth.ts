"use server"

import { db } from "@/db";
import { sessions, users } from "@/db/schema";
import { verifyPassword } from "@/lib/auth-utils";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export const loginAction = async (prevState: any, formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const [user] = await db.select().from(users).where(eq(users.email, email));
    if (!user) return { error: "Неверный email или пароль" };
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) return { error: "Неверный email или пароль" };
    const session_token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await db.insert(sessions).values({
        sessionToken: session_token,
        userId: user.id,
        expiresAt: expiresAt
    });
    (await cookies()).set("session_token", session_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: expiresAt,
        sameSite: "lax"
    });
    return { success: true };

}