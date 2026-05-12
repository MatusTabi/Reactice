import { countDistinct, desc, eq, ne, sum } from 'drizzle-orm';

import { db, submissions, users } from '@/db';

import { leaderboardEntrySchema, type LeaderboardEntryType } from './schema';

// Fixed UUID of the seed creator bot — excluded from the leaderboard.
const SEED_BOT_ID = '00000000-0000-4000-8000-000000000001';

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
		.where(ne(users.id, SEED_BOT_ID))
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

const getPublicProfile = async (
	userId: string
): Promise<(LeaderboardEntryType & { seqId: number | null }) | null> => {
	const [user] = await db
		.select({ seqId: users.seqId, name: users.name, image: users.image })
		.from(users)
		.where(eq(users.id, userId))
		.limit(1);

	if (!user) return null;

	const stats = await getUserRank(userId);

	return {
		id: userId,
		name: user.name,
		image: user.image,
		seqId: user.seqId,
		rank: stats?.rank ?? 0,
		totalPoints: stats?.totalPoints ?? 0,
		completed: stats?.completed ?? 0
	};
};

export const leaderboardQueries = { getTop, getUserRank, getPublicProfile };
