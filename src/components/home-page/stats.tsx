import { count } from 'drizzle-orm';

import { challenges, db } from '@/db';

const getChallengeCount = async () => {
	const [result] = await db.select({ count: count() }).from(challenges);
	return result?.count ?? 0;
};
const Stats = async () => {
	const count = await getChallengeCount();

	const stats = [
		{ value: `${count}+`, label: 'Challenges' },
		{ value: 'AI', label: 'Scoring' },
		{ value: 'LIVE', label: 'Leaderboard' }
	] as const;

	return (
		<div className="border-foreground/10 mt-8 grid w-full max-w-3xl grid-cols-1 gap-8 border-t pt-8 sm:mt-14 sm:grid-cols-3 md:mt-24 md:gap-12">
			{stats.map(stat => (
				<div key={stat.label} className="flex flex-col items-center gap-1">
					<span className="text-foreground text-2xl font-bold tracking-tighter">
						{stat.value}
					</span>

					<span className="text-muted-foreground text-[10px] font-black tracking-[0.2em] uppercase">
						{stat.label}
					</span>
				</div>
			))}
		</div>
	);
};

export default Stats;
