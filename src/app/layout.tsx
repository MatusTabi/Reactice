import type { Metadata } from 'next';
import { type ReactNode } from 'react';

import { Providers } from '@/components/providers';

import './globals.css';

export const metadata: Metadata = {
	title: {
		default: 'Reactice',
		template: '%s | Reactice'
	},
	description: 'React component practice platform with AI evaluation'
};

const RootLayout = ({ children }: { children: ReactNode }) => (
	<html lang="en">
		<body>
			<Providers>{children}</Providers>
		</body>
	</html>
);

export default RootLayout;
