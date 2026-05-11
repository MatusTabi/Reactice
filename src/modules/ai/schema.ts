import { z } from 'zod';

export const referenceFileSchema = z.object({
	name: z.string(),
	content: z.string()
});

export const evaluateRequestSchema = z.object({
	userCode: z.string().min(1),
	referenceFiles: z.array(referenceFileSchema).optional()
});

export type EvaluateRequest = z.infer<typeof evaluateRequestSchema>;

export const evaluationResultSchema = z.object({
	score: z.number().min(0).max(100),
	feedback: z.string()
});

export type EvaluationResult = z.infer<typeof evaluationResultSchema>;

export const openRouterResponseSchema = z.object({
	choices: z.array(
		z.object({
			message: z.object({
				content: z.string().nullable()
			})
		})
	)
});
