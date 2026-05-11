import { z } from 'zod';

// DTO returned by leaderboard queries.
// rank       — 1-based position, computed from query order
// totalPoints — sum of pointsAwarded across all submissions (= "XP" / "score" in the UI)
// completed  — number of submitted challenges
// isCurrentUser is a UI concern; the page sets it by comparing entries to the logged-in user.

export const leaderboardEntrySchema = z.object({
	rank: z.number(),
	id: z.string(),
	name: z.string().nullable(),
	image: z.string().nullable(),
	totalPoints: z.number(),
	completed: z.number()
});

export type LeaderboardEntryType = z.infer<typeof leaderboardEntrySchema>;
