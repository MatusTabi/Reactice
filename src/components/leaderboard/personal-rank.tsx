import { Medal } from 'lucide-react';

type PersonalRankProps = {
	rank: number;
	xp: number;
};

const PersonalRank = ({ rank, xp }: PersonalRankProps) => (
	<div className="fixed bottom-8 left-1/2 z-50 w-[calc(100%-3rem)] max-w-xl -translate-x-1/2">
		<div className="border-primary/20 bg-background/60 flex items-center justify-between rounded-2xl border p-4 shadow-2xl backdrop-blur-xl">
			<div className="flex items-center gap-4">
				<div className="bg-primary flex h-10 w-10 items-center justify-center rounded-full shadow-[0_0_15px_rgba(var(--primary),0.4)]">
					<Medal className="h-5 w-5 text-black" />
				</div>

				<div>
					<p className="text-[10px] leading-tight font-black tracking-[0.2em] uppercase opacity-50">
						Your Standing
					</p>

					<p className="text-sm font-bold sm:text-base">#{rank}</p>
				</div>
			</div>

			<div className="text-right">
				<p className="text-primary font-mono text-lg leading-none font-black sm:text-xl">
					{xp.toLocaleString()} XP
				</p>
			</div>
		</div>
	</div>
);

export default PersonalRank;
