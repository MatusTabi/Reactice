import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { type ReactNode } from 'react';

import { Providers } from '@/components/providers';
import Navbar from '@/components/navigation/navbar';
import './globals.css';
import { cn } from '@/lib/cn';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
	title: {
		default: 'Reactice',
		template: '%s | Reactice'
	},
	description: 'React component practice platform with AI evaluation'
};

const RootLayout = ({ children }: { children: ReactNode }) => (
	<html
		lang="en"
		className={cn('font-sans antialiased', 'font-sans', inter.variable)}
		suppressHydrationWarning
	>
		<body className="min-h-screen">
			<Providers>
				<div className="relative flex flex-col">
					<Navbar />
					<main className="flex-1">{children}</main>
				</div>
			</Providers>
		</body>
	</html>
);

export default RootLayout;

// End of layout.tsx
