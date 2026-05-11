import { relations } from 'drizzle-orm';

import { challenges } from './challenges';
import { submissions } from './submissions';
import { users } from './users';

export const userRelations = relations(users, ({ many }) => ({
	challenges: many(challenges),
	submissions: many(submissions)
}));

export const challengeRelations = relations(challenges, ({ one, many }) => ({
	creator: one(users, {
		fields: [challenges.creatorId],
		references: [users.id]
	}),
	submissions: many(submissions)
}));

export const submissionRelations = relations(submissions, ({ one }) => ({
	user: one(users, {
		fields: [submissions.userId],
		references: [users.id]
	}),
	challenge: one(challenges, {
		fields: [submissions.challengeId],
		references: [challenges.id]
	})
}));
