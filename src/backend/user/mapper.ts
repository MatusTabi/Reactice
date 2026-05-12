import type { Session } from 'next-auth';

import { userDetailSchema } from './schema';

export const userMapper = {
	fromSession: (user: NonNullable<Session['user']>) =>
		userDetailSchema.parse({
			id: user.id,
			name: user.name ?? null,
			email: user.email ?? null,
			image: user.image ?? null,
			seqId: user.seqId ?? null
		})
};
