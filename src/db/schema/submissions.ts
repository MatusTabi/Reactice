import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { challenges } from './challenges';
import { users } from './users';

export const submissions = sqliteTable('submission', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	challengeId: text('challenge_id')
		.notNull()
		.references(() => challenges.id, { onDelete: 'cascade' }),
	submittedCode: text('submitted_code').notNull(),
	score: integer('score').notNull(),
	feedback: text('feedback').notNull(),
	pointsAwarded: integer('points_awarded').notNull(),
	submittedAt: integer('submitted_at')
		.notNull()
		.$defaultFn(() => Date.now())
});

export type Submission = typeof submissions.$inferSelect;
