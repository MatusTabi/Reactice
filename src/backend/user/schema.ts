import { z } from 'zod';

export const userDetailSchema = z.object({
	id: z.string(),
	name: z.string().nullable(),
	email: z.string().nullable(),
	image: z.string().nullable(),
	seqId: z.number().nullable()
});

export type UserDetailType = z.infer<typeof userDetailSchema>;
