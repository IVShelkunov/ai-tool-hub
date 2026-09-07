import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const aiTools = pgTable('ai_tools', {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    url: text('url').notNull(),
    category: text('category').notNull(),
    createdAt: timestamp('createdAt').defaultNow()
});