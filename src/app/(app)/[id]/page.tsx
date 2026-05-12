import { Suspense } from 'react';

import { challengeQueries } from '@/backend/challenge/queries';
import CodeEditor from '@/components/dashboard/code/CodeEditor';

const ChallengeContent = async ({ id }: { id: string }) => {
	const challenge = await challengeQueries.getById(id ?? '');

	return <CodeEditor challenge={challenge} />;
};

const ParamsContent = async ({
	params
}: {
	params: Promise<{ id: string }>;
}) => {
	const { id } = await params;

	return <ChallengeContent id={id} />;
};

const LearningDashboard = ({ params }: { params: Promise<{ id: string }> }) => (
	<main className="bg-surface h-[calc(100vh-69px)] w-full">
		<Suspense
			fallback={<div className="bg-muted/20 h-full w-full animate-pulse" />}
		>
			<ParamsContent params={params} />
		</Suspense>
	</main>
);

export default LearningDashboard;
