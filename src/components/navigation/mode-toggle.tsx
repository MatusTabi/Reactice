// Source based on: https://ui.shadcn.com/docs/dark-mode/next

'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

const ModeToggle = () => {
	const { theme, setTheme } = useTheme();

	return (
		<Button
			variant="outline"
			size="icon"
			className="group relative h-9 w-9 cursor-pointer transition-all duration-300 active:scale-[0.97]"
			onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
		>
			<Sun className="h-5 w-5 transition-all duration-300 group-hover:rotate-45 dark:scale-0 dark:-rotate-90" />

			<Moon className="absolute h-5 w-5 scale-0 rotate-90 transition-all duration-300 dark:scale-100 dark:rotate-0 dark:group-hover:-rotate-15" />

			<span className="sr-only">Toggle theme</span>
		</Button>
	);
};

export default ModeToggle;

// End of mode-toggle.tsx
