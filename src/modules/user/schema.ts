import { z } from 'zod';

export const updateUserProfileSchema = z.object({
	name: z
		.string()
		.min(2, 'Name must be at least 2 characters')
		.max(100, 'Name must be at most 100 characters'),
	image: z.string().url('Must be a valid URL').optional()
});

export type UpdateUserProfileInput = z.infer<typeof updateUserProfileSchema>;
