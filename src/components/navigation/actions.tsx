import { User } from 'lucide-react';

import { Button } from '@/components/ui/button';

import ModeToggle from './mode-toggle';

const Actions = () => (
	<div className="flex items-center gap-x-2 sm:gap-x-3">
		<ModeToggle />

		<div className="bg-foreground/10 hidden h-6 w-px sm:block" />

		<Button
			size="sm"
			className="dark:bg-primary/90 h-9 cursor-pointer gap-2 px-4 font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
		>
			<User className="h-4 w-4" />

			<span className="hidden text-sm sm:inline">Sign In</span>
		</Button>
	</div>
);

export default Actions;

// End of actions.tsx
