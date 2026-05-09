import { type PropsWithChildren, Suspense } from 'react';

import { Navbar } from '@/components/navbar';

const AppLayout = ({ children }: PropsWithChildren) => (
	<div className="min-h-screen w-screen bg-gray-50 text-gray-900">
		<Suspense
			fallback={<div className="border-b border-gray-200 bg-white px-6 py-4" />}
		>
			<Navbar />
		</Suspense>
		{children}
	</div>
);

export default AppLayout;
