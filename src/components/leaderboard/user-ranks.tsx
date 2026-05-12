import { User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { type LeaderboardEntryType } from '@/backend/leaderboard/schema';
import { cn } from '@/lib/cn';

type RankedUser = LeaderboardEntryType & {
	isCurrentUser?: boolean;
};

type UserRanksProps = {
	users: RankedUser[];
};

const UserRanks = ({ users }: UserRanksProps) => (
	<div className="mx-auto flex w-full max-w-2xl flex-col gap-2 pt-8 sm:pt-12">
		{users.map(user => (
			<Link
				href={`/app/profile/${user.id}`}
				key={user.id}
				className={cn(
					'border-foreground/5 bg-foreground/2 group flex items-center justify-between rounded-xl border p-3 transition-all sm:p-4',
					'hover:bg-foreground/5 hover:translate-x-1',
					user.isCurrentUser && 'bg-primary/7 border-primary/15'
				)}
			>
				<div className="flex items-center gap-3 overflow-hidden sm:gap-4">
					<span
						className={cn(
							'w-5 font-mono text-sm font-bold italic sm:w-6 sm:text-base',
							user.isCurrentUser ? 'text-primary' : 'text-muted-foreground/40'
						)}
					>
						{user.rank}
					</span>

					<div className="bg-muted border-foreground/5 relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border sm:h-10 sm:w-10">
						{user.image ? (
							<Image
								fill
								src={user.image}
								alt={user.name ?? 'User'}
								className="object-cover"
								sizes="40px"
							/>
						) : (
							<User className="text-muted-foreground h-5 w-5 sm:h-6 sm:w-6" />
						)}
					</div>

					<span
						className={cn(
							'truncate font-bold',
							user.isCurrentUser ? 'text-primary' : 'text-foreground/90'
						)}
					>
						{user.name ?? 'Challenger'}
					</span>
				</div>

				<div className="ml-4 flex shrink-0 items-center gap-2">
					<span
						className={cn(
							'text-base font-bold sm:text-lg',
							user.isCurrentUser ? 'text-primary' : 'text-foreground'
						)}
					>
						{user.totalPoints.toLocaleString()}
					</span>

					<span className="text-muted-foreground mt-1 text-[10px] font-bold tracking-wide uppercase">
						XP
					</span>
				</div>
			</Link>
		))}
	</div>
);

export default UserRanks;
