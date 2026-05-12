import { type Challenge, type Submission, type User } from '@/db';

import { submissionBasicSchema, submissionDetailSchema } from './schema';

export const submissionMapper = {
	toBasic: (submission: Submission) => submissionBasicSchema.parse(submission),
	// submissionDetailSchema already validates `user` and `challenge` via its
	// extended shape — a single outer .parse() is enough.
	toDetail: (submission: Submission & { user: User; challenge: Challenge }) =>
		submissionDetailSchema.parse(submission)
};
