import { db } from '@/db';

import { submissionMapper } from './mapper';

const getByUserId = async (userId: string) => {
	const results = await db.query.submissions.findMany({
		where: (s, { eq }) => eq(s.userId, userId),
		with: { user: true, challenge: true },
		orderBy: (s, { desc }) => desc(s.submittedAt)
	});

	return results.map(s => submissionMapper.toDetail(s));
};

const getByChallengeId = async (challengeId: string) => {
	const results = await db.query.submissions.findMany({
		where: (s, { eq }) => eq(s.challengeId, challengeId),
		with: { user: true, challenge: true },
		orderBy: (s, { desc }) => desc(s.submittedAt)
	});

	return results.map(s => submissionMapper.toDetail(s));
};

export const submissionQueries = {
	getByUserId,
	getByChallengeId
};
