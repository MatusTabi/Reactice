import { z } from 'zod';

import { userDetailSchema } from '../user/schema';

export const difficultySchema = z.enum(['easy', 'medium', 'hard']);
export type DifficultyType = z.infer<typeof difficultySchema>;

// File schemas

export const challengeFileInputSchema = z.object({
	name: z.string().min(1),
	content: z.string()
});

export type ChallengeFileInputType = z.infer<typeof challengeFileInputSchema>;

export const challengeFileSchema = z.object({
	id: z.string(),
	challengeId: z.string(),
	name: z.string(),
	content: z.string()
});

export type ChallengeFileType = z.infer<typeof challengeFileSchema>;

// Input schemas

export const createChallengeSchema = z.object({
	title: z.string().min(1).max(100),
	description: z.string().min(1).max(1000),
	difficulty: difficultySchema,
	referenceImageUrl: z.string().url().nullish(),
	files: z.array(challengeFileInputSchema).min(1)
});

export type CreateChallengeType = z.infer<typeof createChallengeSchema>;

export const updateChallengeSchema = z.object({
	id: z.string(),
	title: z.string().min(1).max(100).optional(),
	description: z.string().min(1).max(1000).optional(),
	difficulty: difficultySchema.optional(),
	referenceImageUrl: z.string().url().nullish(),
	files: z.array(challengeFileInputSchema).min(1).optional()
});

export type UpdateChallengeType = z.infer<typeof updateChallengeSchema>;

// DTOs

export const challengeBasicSchema = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string(),
	difficulty: difficultySchema,
	referenceImageUrl: z.string().nullable(),
	creatorId: z.string(),
	createdAt: z.number()
});

export type ChallengeBasicType = z.infer<typeof challengeBasicSchema>;

export const challengeDetailSchema = challengeBasicSchema.extend({
	creator: userDetailSchema,
	files: z.array(challengeFileSchema)
});

export type ChallengeDetailType = z.infer<typeof challengeDetailSchema>;
