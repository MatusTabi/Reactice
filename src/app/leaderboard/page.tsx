import PersonalRank from '@/components/leaderboard/personal-rank';
import Podium from '@/components/leaderboard/podium';
import UserRanks from '@/components/leaderboard/user-ranks';

const topUsers = [
	{
		id: '1',
		name: 'Dan Abramov',
		image: null,
		score: 98450
	},
	{
		id: '2',
		name: 'SaraVieira',
		image: null,
		score: 82300
	},
	{
		id: '3',
		name: 'Matus_Tabi',
		image: null,
		score: 75100
	}
];

const otherUsers = [
	{ rank: 4, name: 'PixelPusher', xp: 67111 },
	{ rank: 5, name: 'ReactNinja', xp: 55432, isCurrentUser: true },
	{ rank: 6, name: 'TailwindWizard', xp: 42000 },
	{ rank: 7, name: 'NextLevel', xp: 38123 }
];

const LeaderboardPage = () => (
	<div className="mx-auto flex max-w-5xl flex-col items-center px-6 py-22">
		<Podium topUsers={topUsers} />
		<UserRanks users={otherUsers} />
		<PersonalRank />
	</div>
);

export default LeaderboardPage;
