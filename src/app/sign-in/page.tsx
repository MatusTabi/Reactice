import Link from 'next/link';

import { signIn } from '@/auth';
import { Button } from '@/components/ui/button';

const SignInPage = () => (
	<main className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center gap-6 p-6">
		<h1 className="text-2xl font-semibold">Sign in</h1>
		<p className="text-sm text-gray-600">
			Continue with GitHub to access your account.
		</p>

		<form
			action={async () => {
				'use server';
				await signIn('github', { redirectTo: '/app/profile' });
			}}
		>
			<Button className="w-full" type="submit">
				Continue with GitHub
			</Button>
		</form>

		<p className="text-sm text-gray-600">
			No account yet?{' '}
			<Link className="underline" href="/sign-up">
				Create one
			</Link>
		</p>
	</main>
);

export default SignInPage;
