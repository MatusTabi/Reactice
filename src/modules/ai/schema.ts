import { z } from 'zod';

export const referenceFileSchema = z.object({
	name: z.string(),
	content: z.string()
});

export const evaluateRequestSchema = z.object({
	userCode: z
		.string()
		.min(1)
		// ~20k chars ≈ 5k tokens — fits comfortably alongside the system prompt
		// and reference files within the 8k-context free-tier OpenRouter models,
		// while still bounding the request against abuse.
		.max(20000),
	referenceFiles: z.array(referenceFileSchema).min(1)
});

export type EvaluateRequest = z.infer<typeof evaluateRequestSchema>;

export const evaluationResultSchema = z.object({
	score: z.number().int().min(0).max(100),
	feedback: z.string(),
	strengths: z.array(z.string()),
	weaknesses: z.array(z.string()),
	suggestions: z.array(z.string())
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
