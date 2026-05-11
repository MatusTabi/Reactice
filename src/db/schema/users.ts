import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('user', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	seqId: integer('seq_id').unique(),
	name: text('name'),
	email: text('email').unique().notNull(),
	emailVerified: integer('emailVerified', { mode: 'timestamp_ms' }),
	image: text('image')
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
