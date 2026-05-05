import Link from 'next/link';

import { auth } from '@/auth';
import { SignOutButton } from '@/components/auth/sign-out-button';

export const Navbar = async () => {
	const session = await auth();

	return (
		<nav className="border-b border-gray-200 bg-white">
			<div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
				<Link href="/" className="text-xl font-bold text-gray-900">
					Reactice
				</Link>

				<div className="flex items-center gap-4">
					{session?.user ? (
						<>
							<div className="text-sm text-gray-700">
								Logged in as <span className="font-semibold">{session.user.name || session.user.email}</span>
							</div>
							<SignOutButton />
						</>
					) : (
						<Link href="/sign-in">
							<button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
								Sign In
							</button>
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
};
