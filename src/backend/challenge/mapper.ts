import { type Challenge, type ChallengeFile, type User } from '@/db';

import { challengeBasicSchema, challengeDetailSchema } from './schema';

export const challengeMapper = {
	toBasic: (challenge: Challenge) => challengeBasicSchema.parse(challenge),
	// challengeDetailSchema already validates `creator` and `files` via its
	// extended shape — a single outer .parse() is enough.
	toDetail: (
		challenge: Challenge & { creator: User; files: ChallengeFile[] }
	) => challengeDetailSchema.parse(challenge)
};
