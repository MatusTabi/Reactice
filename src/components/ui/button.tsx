import { forwardRef, type ButtonHTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

export const Button = forwardRef<
	HTMLButtonElement,
	ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
	<button
		ref={ref}
		className={cn(
			'inline-flex cursor-pointer items-center justify-center rounded-md bg-gray-800 px-4 py-2 text-sm font-semibold text-white transition duration-200 ease-in-out hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-600 focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50',
			className
		)}
		{...props}
	>
		{children}
	</button>
));

Button.displayName = 'Button';

