import { cn } from '@/lib/cn';

type User = {
	rank: number;
	name: string;
	xp: number;
	isCurrentUser?: boolean;
};

const UserRanks = ({ users }: { users: User[] }) => (
	<div className="mx-auto flex w-full max-w-2xl flex-col gap-2 pt-8 sm:pt-12">
		{users.map(user => (
			<div
				key={user.rank}
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

					<div className="bg-muted border-foreground/5 h-9 w-10 shrink-0 rounded-full border sm:h-10 sm:w-10" />

					<span
						className={cn(
							'truncate font-bold',
							user.isCurrentUser ? 'text-primary' : 'text-foreground/90'
						)}
					>
						{user.name}
					</span>
				</div>

				<div className="ml-4 flex shrink-0 items-center gap-2">
					<span
						className={cn(
							'text-base font-bold sm:text-lg',
							user.isCurrentUser ? 'text-primary' : 'text-foreground'
						)}
					>
						{user.xp.toLocaleString()}
					</span>

					<span className="text-muted-foreground mt-1 text-[10px] font-bold tracking-wide uppercase">
						XP
					</span>
				</div>
			</div>
		))}
	</div>
);

export default UserRanks;
