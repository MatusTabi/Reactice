'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type PropsWithChildren, useState } from 'react';
import { Toaster } from 'sonner';

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
		<QueryClientProvider client={queryClient}>
			{children}
			<Toaster richColors position="top-right" />
		</QueryClientProvider>
	);
};
