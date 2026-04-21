import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ButtonHTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

const buttonVariants = cva(
	'inline-flex cursor-pointer items-center justify-center rounded-md text-sm font-semibold transition duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 active:scale-95',
	{
		variants: {
			variant: {
				default:
					'bg-gray-800 text-white hover:bg-gray-700 focus-visible:ring-gray-600'
			},
			size: {
				default: 'px-4 py-2'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	}
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button';

		return (
			<Comp
				ref={ref}
				className={cn(buttonVariants({ variant, size, className }))}
				{...props}
			/>
		);
	}
);

Button.displayName = 'Button';
