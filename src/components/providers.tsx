'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { type PropsWithChildren, useState } from 'react';
import { Toaster } from 'sonner';

import { ThemeProvider } from './theme-provider';
import { EvaluationResultProvider } from '@/modules/ai/context/evaluation-result-context';

export const Providers = ({ children }: PropsWithChildren) => {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						retry: 1,
						refetchOnWindowFocus: false
					}
				}
			})
	);

	return (
		<SessionProvider>
			<QueryClientProvider client={queryClient}>
				<EvaluationResultProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						{children}
						<Toaster richColors position="top-right" />
					</ThemeProvider>
				</EvaluationResultProvider>
			</QueryClientProvider>
		</SessionProvider>
	);
};
