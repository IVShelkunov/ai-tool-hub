import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    id: uuid("id").defaultRandom().primaryKey(),
    email: text("email").notNull().unique(),
    password: text("password").notNull()
});
export const aiTools = pgTable('ai_tools', {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    url: text('url').notNull(),
    category: text('category').notNull(),
    createdAt: timestamp('createdAt').defaultNow()
});
export const favorites = pgTable('favorites', {
    id: uuid("id").defaultRandom().primaryKey(),
    toolId: uuid("tool_id").references(() => aiTools.id).notNull(),
    userId: uuid("user_id").references(() => users.id).notNull()
}, (table) => ({
    uniqueIdx: uniqueIndex("unique_favorite").on(table.toolId, table.userId)
}));
export const sessions = pgTable('sessions', {
    id: uuid("id").defaultRandom().primaryKey(),
    sessionToken: text("session_token").notNull().unique(),
    userId: uuid("user_id").references(() => users.id).notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true, mode: 'date' }).notNull()
});

export const userRelation = relations(users, ({ many }) => ({
    favorites: many(favorites)
}));
export const favoritesRelation = relations(favorites, ({ one }) => ({
    user: one(users, { fields: [favorites.userId], references: [users.id] }),
    tool: one(aiTools, { fields: [favorites.toolId], references: [aiTools.id] })
}));
export const sessionRelation = relations(sessions, ({ one }) => ({
    user: one(users, { fields: [sessions.userId], references: [users.id] })
}));

