"use server"

import { db } from "@/db";
import { messages } from "@/db/schema";
import { pusherServer } from "@/lib/pusher";
import { getSession } from "@/lib/utils/auth-utils"
import { getChatRoomId } from "@/lib/utils/chat";
import { and, asc, eq, or } from "drizzle-orm";

export async function sendMessageAction(senderId: string, receiverId: string, content: string) {
    const roomId = getChatRoomId(senderId, receiverId);
    if (!senderId) throw new Error("Unauthorized");
    const createdAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const [msg] = await db.insert(messages).values({
        senderId,
        receiverId,
        content,
        createdAt
    }).returning();
    await pusherServer.trigger(`chat-${roomId}`, 'new-message', msg);
    return { success: true, message: msg }
}
export async function getMessage(receiverId: string) {
    const senderId = await getSession();
    if (!senderId) throw new Error("Unauthorized");
    const msgs = await db.query.messages.findMany({
        where: or(
            and(eq(messages.senderId, senderId), eq(messages.receiverId, receiverId)),
            and(eq(messages.senderId, receiverId), eq(messages.receiverId, senderId))
        ),
        orderBy: [asc(messages.createdAt)]
    });
    return msgs;
}