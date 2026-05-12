import { User } from 'lucide-react';
import Image from 'next/image';

import { cn } from '@/lib/cn';

type PodiumCircleProps = {
	rank: 1 | 2 | 3;
	avatar?: string | null;
};

const PodiumCircle = ({ rank, avatar }: PodiumCircleProps) => {
	const isFirst = rank === 1;

	const sizes = {
		1: 'h-20 w-20 sm:h-22 sm:w-22 lg:h-26 lg:w-26 border-4 border-primary drop-shadow-[0_0_20px_rgba(var(--primary),0.3)]',
		2: 'h-16 w-16 sm:h-18 sm:w-18 lg:h-22 lg:w-22 border-2 border-border',
		3: 'h-14 w-14 sm:h-16 sm:w-16 lg:h-18 lg:w-18 border-2 border-border'
	};

	return (
		<div
			className={cn(
				'bg-muted/20 relative flex items-center justify-center overflow-hidden rounded-full transition-all duration-500',
				sizes[rank]
			)}
		>
			{avatar ? (
				<Image
					fill
					src={avatar}
					alt={`Rank ${rank}`}
					className="object-cover"
					sizes="(max-width: 768px) 100px, 150px"
					priority={isFirst}
				/>
			) : (
				<User
					className={cn(
						isFirst
							? 'text-primary h-12 w-12'
							: 'text-muted-foreground h-8 w-8',
						rank === 3 && 'h-6 w-6'
					)}
				/>
			)}
		</div>
	);
};

export default PodiumCircle;
