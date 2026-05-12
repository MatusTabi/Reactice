import { Suspense } from 'react';

import { leaderboardQueries } from '@/backend/leaderboard/queries';
import PageLoader from '@/components/ui/page-loader';
import { getUserServerCtx } from '@/app/server/user-server-ctx';
import PersonalRank from '@/components/leaderboard/personal-rank';
import Podium from '@/components/leaderboard/podium';
import UserRanks from '@/components/leaderboard/user-ranks';
import { cn } from '@/lib/cn';

const LeaderboardContent = async () => {
	const { loggedInUser } = await getUserServerCtx();
	const userId = loggedInUser?.id;

	const topUsers = await leaderboardQueries.getTop();

	if (topUsers.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center pt-16 sm:pt-22">
				<h1 className="text-2xl font-black tracking-tighter uppercase italic sm:text-3xl md:text-4xl">
					No rankings <span className="text-primary">yet</span>
				</h1>
				<p className="text-muted-foreground mt-2 text-base font-medium">
					Submit your first challenge to claim the podium.
				</p>
			</div>
		);
	}

	const userStats = userId
		? await leaderboardQueries.getUserRank(userId)
		: null;

	const isTop10 = topUsers.some(u => u.id === userId);

	const podiumUsers = topUsers.slice(0, 3);
	const otherUsers = topUsers.slice(3, 10).map(u => ({
		...u,
		isCurrentUser: u.id === userId
	}));

	return (
		<div
			className={cn(
				'mx-auto flex max-w-5xl flex-col items-center px-6 pt-16 sm:pt-22',
				!isTop10 && userStats && 'pb-40'
			)}
		>
			<Podium users={podiumUsers} />

			{otherUsers.length > 0 && <UserRanks users={otherUsers} />}

			{!isTop10 && userStats && (
				<>
					<div className="from-background via-background/80 pointer-events-none fixed bottom-0 left-0 z-40 h-35 w-full bg-linear-to-t to-transparent" />
					<PersonalRank rank={userStats.rank} xp={userStats.totalPoints} />
				</>
			)}
		</div>
	);
};

const LeaderboardPage = () => (
	<Suspense fallback={<PageLoader />}>
		<LeaderboardContent />
	</Suspense>
);

export default LeaderboardPage;
