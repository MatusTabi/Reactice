import type { Metadata } from 'next';
import { type ReactNode } from 'react';

import { Providers } from '@/components/providers';

import './globals.css';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
	title: {
		default: 'Reactice',
		template: '%s | Reactice'
	},
	description: 'React component practice platform with AI evaluation'
};

const RootLayout = ({ children }: { children: ReactNode }) => (
	<html lang="en" className={cn("font-sans", geist.variable)}>
		<body>
			<Providers>{children}</Providers>
		</body>
	</html>
);

export default RootLayout;
