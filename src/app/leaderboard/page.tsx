import PersonalRank from '@/components/leaderboard/personal-rank';
import Podium from '@/components/leaderboard/podium';
import UserRanks from '@/components/leaderboard/user-ranks';
import { cn } from '@/lib/cn';

// TODO: Remove mock data with actual users.
const topUsers = [
	{ id: '1', name: 'Person 1', image: null, score: 98450 },
	{ id: '2', name: 'Person 2', image: null, score: 82300 },
	{ id: '3', name: 'Person 3', image: null, score: 75100 }
];

const otherUsers = [
	{ rank: 4, name: 'Person 4', xp: 67111 },
	{ rank: 5, name: 'Person 5', xp: 55432, isCurrentUser: true },
	{ rank: 6, name: 'Person 6', xp: 42000 },
	{ rank: 7, name: 'Person 7', xp: 38123 },
	{ rank: 8, name: 'Person 8', xp: 35123 },
	{ rank: 9, name: 'Person 9', xp: 32123 },
	{ rank: 10, name: 'Person 10', xp: 30123 }
];

const LeaderboardPage = () => {
	const isTop3 = topUsers.some(u => (u as any).isCurrentUser);
	const isTop10 = otherUsers.some(u => u.isCurrentUser);
	const isRanked = isTop3 || isTop10;

	return (
		<div
			className={cn(
				'mx-auto flex max-w-5xl flex-col items-center px-6 pt-16 sm:pt-22',
				!isRanked && 'pb-40'
			)}
		>
			<Podium topUsers={topUsers} />

			<UserRanks users={otherUsers} />

			{!isRanked && (
				<>
					<div className="from-background via-background/80 pointer-events-none fixed bottom-0 left-0 z-40 h-35 w-full bg-linear-to-t to-transparent" />
					
					<PersonalRank />
				</>
			)}
		</div>
	);
};

export default LeaderboardPage;
