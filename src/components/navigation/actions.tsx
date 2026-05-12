import { auth } from '@/auth';

import SignInButton from '../auth/sign-in-button';

import ModeToggle from './mode-toggle';
import UserProfile from './user-profile';

const Actions = async () => {
	const session = await auth();

	return (
		<div className="flex items-center gap-x-2 sm:gap-x-3">
			<ModeToggle />

			<div className="bg-foreground/10 hidden h-6 w-px sm:block" />

			{session?.user ? <UserProfile user={session.user} /> : <SignInButton />}
		</div>
	);
};

export default Actions;
