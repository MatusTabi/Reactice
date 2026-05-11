import { type Challenge, type Submission, type User } from '@/db';

import { challengeBasicSchema } from '../challenge/schema';
import { userDetailSchema } from '../user/schema';

import { submissionBasicSchema, submissionDetailSchema } from './schema';

export const submissionMapper = {
	toBasic: (submission: Submission) => submissionBasicSchema.parse(submission),
	toDetail: (submission: Submission & { user: User; challenge: Challenge }) =>
		submissionDetailSchema.parse({
			...submission,
			user: userDetailSchema.parse(submission.user),
			challenge: challengeBasicSchema.parse(submission.challenge)
		})
};
