import { type Challenge, type User } from '@/db';

import { userDetailSchema } from '../user/schema';

import { challengeBasicSchema, challengeDetailSchema } from './schema';

export const challengeMapper = {
	toBasic: (challenge: Challenge) => challengeBasicSchema.parse(challenge),
	toDetail: (challenge: Challenge & { creator: User }) =>
		challengeDetailSchema.parse({
			...challenge,
			creator: userDetailSchema.parse(challenge.creator)
		})
};
