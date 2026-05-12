import { Crown } from 'lucide-react';
import Link from 'next/link';

import { type LeaderboardEntryType } from '@/backend/leaderboard/schema';

import PodiumCircle from './podium-circle';

type PodiumProps = {
	users: LeaderboardEntryType[];
};

const Podium = ({ users }: PodiumProps) => {
	const [first, second, third] = users || [];

	return (
		<div className="grid w-full max-w-2xl grid-cols-3 items-end gap-x-2 sm:gap-x-6">
			<Link
				href={`/app/profile/${second?.id}`}
				className="flex flex-col items-center gap-y-3 pb-2 transition-opacity hover:opacity-80"
			>
				<PodiumCircle rank={2} avatar={second?.image} />

				<div className="w-full text-center">
					<p className="truncate px-1 text-sm font-bold">
						{second?.name ?? 'King'}
					</p>

					<span className="flex flex-wrap items-center justify-center gap-x-1 text-sm font-bold tracking-wider uppercase opacity-50 sm:gap-x-2">
						<span>#2</span>
						<span className="opacity-40">—</span>
						<span>{second?.totalPoints.toLocaleString() ?? '0'} XP</span>
					</span>
				</div>
			</Link>

			<Link
				href={`/app/profile/${first?.id}`}
				className="flex flex-col items-center gap-y-4 transition-opacity hover:opacity-80"
			>
				<div className="relative">
					<div className="absolute -top-10 left-1/2 z-10 -translate-x-1/2 sm:-top-12">
						<Crown className="text-primary fill-primary/10 h-10 w-10 drop-shadow-[0_0_10px_rgba(var(--primary),0.5)] sm:h-12 sm:w-12" />
					</div>

					<PodiumCircle rank={1} avatar={first?.image} />
				</div>

				<div className="w-full text-center">
					<p className="text-primary truncate px-1 text-base leading-tight font-black tracking-tighter uppercase italic sm:text-xl">
						{first?.name ?? 'Goat'}
					</p>

					<div className="text-primary/80 flex flex-wrap items-center justify-center gap-x-1 text-xl leading-none font-black italic sm:gap-x-2">
						<span>#1</span>
						<span className="text-base opacity-30">—</span>
						<span>{first?.totalPoints.toLocaleString() ?? '0'} XP</span>
					</div>
				</div>
			</Link>

			<Link
				href={`/app/profile/${third?.id}`}
				className="flex flex-col items-center gap-y-3 pb-2 transition-opacity hover:opacity-80"
			>
				<PodiumCircle rank={3} avatar={third?.image} />
				<div className="w-full text-center">
					<p className="truncate px-1 text-sm font-bold">
						{third?.name ?? 'Warrior'}
					</p>

					<span className="flex flex-wrap items-center justify-center gap-x-1 text-sm font-bold tracking-wider uppercase opacity-50 sm:gap-x-2">
						<span>#3</span>
						<span className="opacity-40">—</span>
						<span>{third?.totalPoints.toLocaleString() ?? '0'} XP</span>
					</span>
				</div>
			</Link>
		</div>
	);
};

export default Podium;
