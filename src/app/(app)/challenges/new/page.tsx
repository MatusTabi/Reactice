import { Suspense } from 'react';
import { redirect } from 'next/navigation';

import { getUserServerCtx } from '@/app/server/user-server-ctx';
import { CreateChallengeForm } from '@/modules/challenge/components/create-challenge-form';

const NewChallengeContent = async () => {
	const { loggedInUser } = await getUserServerCtx();

	if (!loggedInUser) {
		redirect('/sign-in');
	}

	return (
		<main className="bg-background/80 flex h-full w-full justify-center px-4 pt-16 pb-16">
			<div className="w-full max-w-2xl">
				<h1 className="text-foreground mb-8 text-2xl font-semibold">
					Create a Challenge
				</h1>
				<CreateChallengeForm />
			</div>
		</main>
	);
};

const NewChallengePage = () => (
	<Suspense>
		<NewChallengeContent />
	</Suspense>
);

export default NewChallengePage;
