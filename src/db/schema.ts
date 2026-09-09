import { pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";

export const aiTools = pgTable('ai_tools', {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    url: text('url').notNull(),
    category: text('category').notNull(),
    createdAt: timestamp('createdAt').defaultNow()
});
export const favorites = pgTable("favorites", {
    id: uuid("id").defaultRandom().primaryKey(),
    toolId: uuid("tool_id").references(() => aiTools.id).notNull(),
    userId: text("user_id").default("system_user").notNull(),
}, (table) => ({
    uniqueIdx: uniqueIndex("unique_favorite").on(table.toolId, table.userId),
}));