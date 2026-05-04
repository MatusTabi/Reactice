import { redirect } from 'next/navigation';

import { auth } from '@/auth';

const ProfilePage = async () => {
	const session = await auth();

	if (!session?.user) {
		redirect('/sign-in');
	}

	return (
		<main className="mx-auto flex w-full max-w-3xl flex-col gap-4 p-6">
			<h1 className="text-2xl font-semibold">Profile</h1>
			<div className="rounded-lg border bg-white p-4">
				<p>
					<span className="font-medium">Id:</span> {session.user.id}
				</p>
				<p>
					<span className="font-medium">Name:</span> {session.user.name ?? 'N/A'}
				</p>
				<p>
					<span className="font-medium">Email:</span> {session.user.email ?? 'N/A'}
				</p>
			</div>
		</main>
	);
};

export default ProfilePage;
