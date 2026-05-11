import { z } from 'zod';

import { challengeBasicSchema } from '../challenge/schema';
import { userDetailSchema } from '../user/schema';

// Input schema

export const createSubmissionSchema = z.object({
	challengeId: z.string(),
	submittedCode: z.string().min(1),
	score: z.number().int().min(0).max(100),
	feedback: z.string(),
	pointsAwarded: z.number().int().min(0)
});

export type CreateSubmissionType = z.infer<typeof createSubmissionSchema>;

// DTOs

export const submissionBasicSchema = z.object({
	id: z.string(),
	userId: z.string(),
	challengeId: z.string(),
	submittedCode: z.string(),
	score: z.number(),
	feedback: z.string(),
	pointsAwarded: z.number(),
	submittedAt: z.number()
});

export type SubmissionBasicType = z.infer<typeof submissionBasicSchema>;

export const submissionDetailSchema = submissionBasicSchema.extend({
	user: userDetailSchema,
	challenge: challengeBasicSchema
});

export type SubmissionDetailType = z.infer<typeof submissionDetailSchema>;
