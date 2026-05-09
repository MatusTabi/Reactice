import { type PropsWithChildren, Suspense } from 'react';

import { Navbar } from '@/components/navbar';

const AppPrefixLayout = ({ children }: PropsWithChildren) => (
	<div className="min-h-screen bg-gray-50 text-gray-900">
		<Suspense
			fallback={<div className="border-b border-gray-200 bg-white px-6 py-4" />}
		>
			<Navbar />
		</Suspense>
		<div className="mx-auto w-full max-w-6xl">{children}</div>
	</div>
);

export default AppPrefixLayout;
