import { submissions, db } from '@/db';

import { type UserDetailType } from '../user/schema';

import { submissionMapper } from './mapper';
import { createSubmissionSchema, type CreateSubmissionType } from './schema';

const create = async ({
	loggedInUser,
	input
}: {
	loggedInUser: UserDetailType | null;
	input: CreateSubmissionType;
}) => {
	if (!loggedInUser) {
		throw new Error('You must be logged in to submit a solution');
	}

	const parsed = createSubmissionSchema.parse(input);

	const [created] = await db
		.insert(submissions)
		.values({ ...parsed, userId: loggedInUser.id })
		.returning();

	if (!created) {
		throw new Error('Failed to create submission');
	}

	return submissionMapper.toBasic(created);
};

export const submissionMutations = {
	create
};
