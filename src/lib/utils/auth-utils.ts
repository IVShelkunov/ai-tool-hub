import { db } from "@/db";
import { sessions, verificationTokens } from "@/db/schema";
import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { Resend } from "resend";

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

export async function createAndSendVerification(tx: any, userId: string, email: string) {
    const token = crypto.randomUUID();
    await tx.insert(verificationTokens).values({
        token: token,
        userId: userId,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
    });
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Подтверждение регистрации',
        html: `<p>Перейди по ссылке для подтверждения:
             <a href="${process.env.APP_URL}/verify-email/${token}">Подтвердить</a></p>`
    });
}