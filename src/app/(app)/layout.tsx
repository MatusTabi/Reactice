import { type ReactNode } from 'react';

type AppLayoutProps = {
	children: ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => (
	<div className="min-h-screen bg-gray-50 text-gray-900">
		<div className="mx-auto w-full max-w-6xl">{children}</div>
	</div>
);

export default AppLayout;
