import { relations } from 'drizzle-orm';

import { challenges } from './challenges';
import { users } from './users';

export const userRelations = relations(users, ({ many }) => ({
	challenges: many(challenges)
}));

export const challengeRelations = relations(challenges, ({ one }) => ({
	creator: one(users, {
		fields: [challenges.creatorId],
		references: [users.id]
	})
}));
