import { relations } from 'drizzle-orm';

import { challengeFiles } from './challenge-files';
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
	files: many(challengeFiles),
	submissions: many(submissions)
}));

export const challengeFileRelations = relations(challengeFiles, ({ one }) => ({
	challenge: one(challenges, {
		fields: [challengeFiles.challengeId],
		references: [challenges.id]
	})
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
