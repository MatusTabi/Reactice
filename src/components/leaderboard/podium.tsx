import { Crown } from 'lucide-react';

import PodiumCircle from './podium-circle';

type LeaderboardUser = {
	id: string;
	name: string;
	image?: string | null;
	score: number;
};

type PodiumProps = {
	topUsers: LeaderboardUser[];
};

const Podium = ({ topUsers }: PodiumProps) => {
	const [first, second, third] = topUsers || [];

	return (
		<div className="grid w-full max-w-2xl grid-cols-3 items-end gap-x-2 sm:gap-x-6">
			<div className="flex flex-col items-center gap-y-3 pb-2">
				<PodiumCircle rank={2} avatar={second?.image} />

				<div className="w-full text-center">
					<p className="truncate px-1 text-sm font-bold">
						{second?.name ?? 'Challenger'}
					</p>

					<span className="text-sm font-bold tracking-wider uppercase opacity-50">
						#2
					</span>
				</div>
			</div>

			<div className="flex flex-col items-center gap-y-4">
				<div className="relative">
					<div className="absolute -top-10 left-1/2 z-10 -translate-x-1/2 sm:-top-12">
						<Crown className="text-primary fill-primary/10 h-10 w-10 drop-shadow-[0_0_10px_rgba(var(--primary),0.5)] sm:h-12 sm:w-12" />
					</div>

					<PodiumCircle rank={1} avatar={first?.image} />
				</div>

				<div className="w-full text-center">
					<p className="text-primary truncate px-1 text-base leading-tight font-black tracking-tighter uppercase italic sm:text-xl">
						{first?.name ?? 'King'}
					</p>

					<span className="text-primary/80 text-xl font-black italic sm:text-2xl">
						#1
					</span>
				</div>
			</div>

			<div className="flex flex-col items-center gap-y-3 pb-2">
				<PodiumCircle rank={3} avatar={third?.image} />

				<div className="w-full text-center">
					<p className="truncate px-1 text-sm font-bold">
						{third?.name ?? 'Challenger'}
					</p>

					<span className="text-sm font-bold tracking-wider uppercase opacity-50">
						#3
					</span>
				</div>
			</div>
		</div>
	);
};

export default Podium;
