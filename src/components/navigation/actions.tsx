import { LogIn, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { auth } from '@/auth';

import ModeToggle from './mode-toggle';

const Actions = async () => {
	const session = await auth();

	return (
		<div className="flex items-center gap-x-2 sm:gap-x-3">
			<ModeToggle />

			<div className="bg-foreground/10 hidden h-6 w-px sm:block" />

			{session?.user ? (
				<div className="flex items-center gap-x-3">
					<Button
						asChild
						variant="ghost"
						size="icon"
						className="group border-foreground/10 bg-muted/20 relative h-9 w-9 overflow-hidden rounded-full border transition-all duration-300 active:scale-[0.97]"
					>
						<Link href="/app/profile">
							{session?.user?.image ? (
								<Image
									src={session.user.image}
									alt={session.user.name ?? 'Profile'}
									width={36}
									height={36}
									className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-85"
								/>
							) : (
								<User className="group-hover:text-foreground/95 h-5 w-5 transition-colors duration-300" />
							)}
						</Link>
					</Button>
				</div>
			) : (
				<Button
					asChild
					size="sm"
					className="dark:bg-primary/90 hover:bg-primary! dark:hover:bg-primary/90! text-primary-foreground! h-9 cursor-pointer gap-2 px-4 font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
				>
					<Link href="/sign-in">
						<LogIn className="h-4 w-4" />

						<span className="hidden text-sm sm:inline">Sign In</span>
					</Link>
				</Button>
			)}
		</div>
	);
};

export default Actions;

// End of actions.tsx
