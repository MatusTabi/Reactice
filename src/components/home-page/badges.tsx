import { Trophy, Zap } from 'lucide-react';

import { cn } from '@/lib/cn';

const badges = [
	{ label: 'AI Visual Analysis', icon: Zap, variant: 'primary' },
	{ label: 'Global Rankings', icon: Trophy, variant: 'muted' }
] as const;

const Badges = () => (
	<div className="flex flex-wrap justify-center gap-3">
		{badges.map(badge => (
			<div
				key={badge.label}
				className={cn(
					'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-bold tracking-wider uppercase transition-all duration-300',
					badge.variant === 'primary'
						? 'bg-primary/5 border-primary/20 text-primary hover:bg-primary/10'
						: 'bg-muted/50 border-border text-muted-foreground hover:bg-muted'
				)}
			>
				<badge.icon
					className={cn(
						'h-3 w-3 transition-transform duration-300 group-hover:scale-110',
						badge.variant === 'primary' && 'fill-current'
					)}
				/>
				<span>{badge.label}</span>
			</div>
		))}
	</div>
);

export default Badges;
