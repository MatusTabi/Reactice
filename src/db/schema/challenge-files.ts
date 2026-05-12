import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { challenges } from './challenges';

export const challengeFiles = sqliteTable('challenge_file', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	challengeId: text('challenge_id')
		.notNull()
		.references(() => challenges.id, { onDelete: 'cascade' }),
	name: text('name').notNull(),
	content: text('content').notNull()
});

export type ChallengeFile = typeof challengeFiles.$inferSelect;
