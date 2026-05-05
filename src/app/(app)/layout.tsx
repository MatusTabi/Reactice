import { Suspense, type ReactNode } from 'react';

import { Navbar } from '@/components/navbar';

type AppLayoutProps = {
	children: ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => (
	<div className="min-h-screen bg-gray-50 text-gray-900">
		<Suspense
			fallback={<div className="border-b border-gray-200 bg-white px-6 py-4" />}
		>
			<Navbar />
		</Suspense>
		<div className="mx-auto w-full max-w-6xl">{children}</div>
	</div>
);

export default AppLayout;
