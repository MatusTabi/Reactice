import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { users } from './users';

export const challenges = sqliteTable('challenge', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	title: text('title').notNull(),
	description: text('description').notNull(),
	difficulty: text('difficulty', {
		enum: ['easy', 'medium', 'hard']
	}).notNull(),
	referenceCode: text('reference_code').notNull(),
	referenceImageUrl: text('reference_image_url'),
	creatorId: text('creator_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	createdAt: integer('created_at')
		.notNull()
		.$defaultFn(() => Date.now())
});

export type Challenge = typeof challenges.$inferSelect;
