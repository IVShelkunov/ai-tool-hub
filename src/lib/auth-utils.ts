import { db } from "@/db";
import { sessions } from "@/db/schema";
import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
}

export const verifyPassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
}

export const getSession = async () => {
    const token = (await cookies()).get("session_token")?.value;
    if (!token) return null;
    const session = await db.query.sessions.findFirst({
        where: eq(sessions.sessionToken, token),
    });
    return session?.userId || null;
}