import { countDistinct, desc, eq, sum } from 'drizzle-orm';

import { db, submissions, users } from '@/db';

import { leaderboardEntrySchema, type LeaderboardEntryType } from './schema';

// Runs the aggregation and assigns 1-based ranks by position.
// Pass limit to cap results; omit for the full ranked list.
const getRanked = async (limit?: number): Promise<LeaderboardEntryType[]> => {
	const query = db
		.select({
			id: users.id,
			name: users.name,
			image: users.image,
			totalPoints: sum(submissions.pointsAwarded),
			// Distinct so re-submissions of the same challenge count once.
			completed: countDistinct(submissions.challengeId)
		})
		.from(users)
		.leftJoin(submissions, eq(submissions.userId, users.id))
		.groupBy(users.id)
		.orderBy(desc(sum(submissions.pointsAwarded)));

	const rows = limit !== undefined ? await query.limit(limit) : await query;

	return rows.map((row, index) =>
		leaderboardEntrySchema.parse({
			rank: index + 1,
			id: row.id,
			name: row.name,
			image: row.image,
			// drizzle sum() returns string | null for SQLite aggregates
			totalPoints: Number(row.totalPoints ?? 0),
			completed: row.completed
		})
	);
};

const getTop = ({ limit = 10 }: { limit?: number } = {}) => getRanked(limit);

// O(N): fetches the full ranked list and finds the user in JS.
// Fine for our scale; for a production leaderboard with many users this should
// be a single query using a window function (RANK() OVER (ORDER BY ...)).
const getUserRank = async (
	userId: string
): Promise<LeaderboardEntryType | null> => {
	const all = await getRanked();
	return all.find(e => e.id === userId) ?? null;
};

export const leaderboardQueries = { getTop, getUserRank };
