import { type Challenge, type ChallengeFile, type User } from '@/db';

import { userDetailSchema } from '../user/schema';

import {
	challengeBasicSchema,
	challengeDetailSchema,
	challengeFileSchema
} from './schema';

export const challengeMapper = {
	toBasic: (challenge: Challenge) => challengeBasicSchema.parse(challenge),
	toDetail: (
		challenge: Challenge & { creator: User; files: ChallengeFile[] }
	) =>
		challengeDetailSchema.parse({
			...challenge,
			creator: userDetailSchema.parse(challenge.creator),
			files: challenge.files.map(f => challengeFileSchema.parse(f))
		})
};
