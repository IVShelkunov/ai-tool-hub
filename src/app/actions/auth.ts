"use server"

import { db } from "@/db";
import { sessions, users, verificationTokens } from "@/db/schema";
import { hashPassword, verifyPassword } from "@/lib/auth-utils";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import z from "zod";

export const loginAction = async (prevState: any, formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const [user] = await db.select().from(users).where(eq(users.email, email));
    if (!user) return { message: "Неверный email или пароль", success: false };
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) return { message: "Неверный email или пароль", success: false };
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
    redirect('/dashboard');
}
export const logoutAction = async () => {
    const cookiesStore = await cookies();
    const token = cookiesStore.get('session_token')?.value;
    if (token) {
        await db.delete(sessions).where(eq(sessions.sessionToken, token));
        cookiesStore.delete("session_token");
    }
    redirect('/login');
}
const registerSchema = z.object({
    email: z.email({ error: "Неверный формат почты" }),
    password: z.string().min(6, "Пароль должен быть от 6 символов")
});
export const registerAction = async (prevState: any, formData: FormData) => {
    const rawData = Object.entries(formData.entries());
    const validatedFields = registerSchema.safeParse(rawData);
    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors }
    }
    const { email, password } = validatedFields.data;
    const hashedPassword = await hashPassword(password);
    const token = crypto.randomUUID();
    try {
        await db.transaction(async (tx) => {
            const [newUser] = await tx.insert(users).values({
                email, password: hashedPassword
            }).returning();
            const [userVerify] = await tx.insert(verificationTokens).values({
                token: token,
                userId: newUser.id,
                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
            }).returning();
        });
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Подтверждение регистрации',
            html: `<p>Перейди по ссылке для подтверждения:
         <a href="${process.env.APP_URL}/verify-email/${token}">Подтвердить</a></p>`
        });

    } catch (err) {
        return { error: "Ошибка регистрации" };
    }

    redirect('/verify-email');
}