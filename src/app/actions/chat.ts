"use server"

import { db } from "@/db";
import { messages } from "@/db/schema";
import { pusherServer } from "@/lib/pusher";
import { getSession } from "@/lib/utils/auth-utils"

export async function sendMessageAction(receiverId: string, content: string) {
    const senderId = await getSession();
    if (!senderId) throw new Error("Unauthorized");
    const createdAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const [msg] = await db.insert(messages).values({
        senderId,
        receiverId,
        content,
        createdAt
    }).returning();
    await pusherServer.trigger(`chat-${receiverId}`, 'new-message', msg);
    return { success: true, message: msg }
}