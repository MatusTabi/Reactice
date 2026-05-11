import { db } from '@/db';

import { challengeMapper } from './mapper';
import { type DifficultyType } from './schema';

const getById = async (id: string) => {
	const challenge = await db.query.challenges.findFirst({
		where: (c, { eq }) => eq(c.id, id),
		with: { creator: true, files: true }
	});

	return challenge ? challengeMapper.toDetail(challenge) : null;
};

const getAll = async ({ difficulty }: { difficulty?: DifficultyType } = {}) => {
	const allChallenges = await db.query.challenges.findMany({
		where: difficulty ? (c, { eq }) => eq(c.difficulty, difficulty) : undefined,
		with: { creator: true, files: true },
		orderBy: (c, { desc }) => desc(c.createdAt)
	});

	return allChallenges.map(c => challengeMapper.toDetail(c));
};

export const challengeQueries = {
	getById,
	getAll
};
