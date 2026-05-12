import { Suspense } from 'react';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import SignOutButton from '@/components/auth/sign-out-button';
import PageLoader from '@/components/ui/page-loader';
import { leaderboardQueries } from '@/backend/leaderboard/queries';

const ProfileContent = async () => {
	const session = await auth();

	if (!session?.user) {
		redirect('/sign-in');
	}

	const stats = await leaderboardQueries.getUserRank(session.user.id!);

	return (
		<main className="mx-auto flex w-full max-w-3xl flex-col gap-4 p-6">
			<div className="flex items-center justify-between gap-3">
				<h1 className="text-2xl font-semibold">Profile</h1>
				<SignOutButton />
			</div>
			<div className="rounded-lg border bg-background p-4">
				<p>
					<span className="font-medium">User #</span>
					{session.user.seqId}
				</p>
				<p>
					<span className="font-medium">Name:</span>{' '}
					{session.user.name ?? 'N/A'}
				</p>
				<p>
					<span className="font-medium">Email:</span>{' '}
					{session.user.email ?? 'N/A'}
				</p>
				<hr className="my-3" />
				<div className="flex gap-6">
					<div className="flex flex-col">
						<span className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
							Score
						</span>
						<span className="text-primary text-2xl font-black">
							{stats ? stats.totalPoints.toLocaleString() : 0}
							<span className="text-muted-foreground ml-1 text-sm font-bold">
								XP
							</span>
						</span>
					</div>
					<div className="flex flex-col">
						<span className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
							Rank
						</span>
						<span className="text-2xl font-black">
							{stats ? `#${stats.rank}` : '—'}
						</span>
					</div>
					<div className="flex flex-col">
						<span className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
							Completed
						</span>
						<span className="text-2xl font-black">
							{stats ? stats.completed : 0}
						</span>
					</div>
				</div>
			</div>
		</main>
	);
};

const ProfilePage = () => (
	<Suspense fallback={<PageLoader />}>
		<ProfileContent />
	</Suspense>
);

export default ProfilePage;
