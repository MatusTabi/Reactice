import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { User as UserIcon } from 'lucide-react';

import { leaderboardQueries } from '@/backend/leaderboard/queries';
import PageLoader from '@/components/ui/page-loader';

const PublicProfileContent = async ({ id }: { id: string }) => {
	const profile = await leaderboardQueries.getPublicProfile(id);

	if (!profile) notFound();

	return (
		<main className="mx-auto flex w-full max-w-3xl flex-col gap-4 p-6">
			<h1 className="text-2xl font-semibold">Profile</h1>
			<div className="rounded-lg border bg-background p-4">
				<div className="flex items-center gap-4">
					<div className="bg-muted border-foreground/10 relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border">
						{profile.image ? (
							<Image
								src={profile.image}
								alt={profile.name ?? 'User'}
								fill
								className="object-cover"
								sizes="64px"
							/>
						) : (
							<UserIcon className="text-muted-foreground h-8 w-8" />
						)}
					</div>
					<div>
						<p className="text-lg font-bold">{profile.name ?? 'Anonymous'}</p>
						{profile.seqId && (
							<p className="text-muted-foreground text-sm">
								User #{profile.seqId}
							</p>
						)}
					</div>
				</div>
			</div>
			<div className="rounded-lg border bg-background p-4">
				<h2 className="mb-3 text-base font-semibold">Stats</h2>
				<div className="flex gap-6">
					<div className="flex flex-col">
						<span className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
							Score
						</span>
						<span className="text-primary text-2xl font-black">
							{profile.totalPoints.toLocaleString()}
							<span className="text-muted-foreground ml-1 text-sm font-bold">
								XP
							</span>
						</span>
					</div>
					<div className="flex flex-col">
						<span className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
							Rank
						</span>
						<span className="text-2xl font-black">#{profile.rank}</span>
					</div>
					<div className="flex flex-col">
						<span className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
							Completed
						</span>
						<span className="text-2xl font-black">{profile.completed}</span>
					</div>
				</div>
			</div>
		</main>
	);
};

const PublicProfilePage = async ({
	params
}: {
	params: Promise<{ id: string }>;
}) => {
	const { id } = await params;

	return (
		<Suspense fallback={<PageLoader />}>
			<PublicProfileContent id={id} />
		</Suspense>
	);
};

export default PublicProfilePage;
