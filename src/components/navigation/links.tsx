'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Trophy, LayoutGrid } from 'lucide-react';

import { cn } from '@/lib/cn';

const links = [
	{ href: '/challenges', label: 'Challenges', icon: LayoutGrid },
	{ href: '/leaderboard', label: 'Leaderboard', icon: Trophy }
] as const;

const Links = () => {
	const pathname = usePathname();

	return (
		<nav className="hidden items-center gap-x-1 md:flex">
			{links.map(({ href, label, icon: Icon }) => {
				const isActive = pathname.startsWith(href);

				return (
					<Link
						key={href}
						href={href}
						className={cn(
							'group relative flex items-center gap-x-2 rounded-lg px-3 py-2 font-medium transition-colors select-none',
							isActive
								? 'text-foreground'
								: 'text-muted-foreground hover:text-foreground'
						)}
					>
						<Icon
							className={cn(
								'h-4 w-4 transition-all duration-300',
								isActive
									? 'scale-110'
									: 'group-hover:text-foreground group-hover:scale-110 group-hover:rotate-3'
							)}
						/>

						<span>{label}</span>

						<span
							className={cn(
								'bg-primary absolute inset-x-3 -bottom-px h-0.5 rounded-full transition-transform duration-300 ease-out',
								isActive
									? 'scale-x-100 opacity-100'
									: 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
							)}
						/>
					</Link>
				);
			})}
		</nav>
	);
};

export default Links;
