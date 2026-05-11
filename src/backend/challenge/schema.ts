import { z } from 'zod';

import { userDetailSchema } from '../user/schema';

export const difficultySchema = z.enum(['easy', 'medium', 'hard']);
export type DifficultyType = z.infer<typeof difficultySchema>;

// Input schemas

export const createChallengeSchema = z.object({
	title: z.string().min(1).max(100),
	description: z.string().min(1).max(1000),
	difficulty: difficultySchema,
	referenceCode: z.string().min(1),
	referenceImageUrl: z.string().url().nullish()
});

export type CreateChallengeType = z.infer<typeof createChallengeSchema>;

export const updateChallengeSchema = z.object({
	id: z.string(),
	title: z.string().min(1).max(100).optional(),
	description: z.string().min(1).max(1000).optional(),
	difficulty: difficultySchema.optional(),
	referenceCode: z.string().min(1).optional(),
	referenceImageUrl: z.string().url().nullish()
});

export type UpdateChallengeType = z.infer<typeof updateChallengeSchema>;

// DTOs

export const challengeBasicSchema = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string(),
	difficulty: difficultySchema,
	referenceCode: z.string(),
	referenceImageUrl: z.string().nullable(),
	creatorId: z.string(),
	createdAt: z.number()
});

export type ChallengeBasicType = z.infer<typeof challengeBasicSchema>;

export const challengeDetailSchema = challengeBasicSchema.extend({
	creator: userDetailSchema
});

export type ChallengeDetailType = z.infer<typeof challengeDetailSchema>;
