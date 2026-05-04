import Link from 'next/link';

import { signIn } from '@/auth';
import { Button } from '@/components/ui/button';

const SignUpPage = () => (
	<main className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center gap-6 p-6">
		<h1 className="text-2xl font-semibold">Create account</h1>
		<p className="text-sm text-gray-600">Sign up with GitHub in one click.</p>

		<form
			action={async () => {
				'use server';
				await signIn('github', { redirectTo: '/app/profile' });
			}}
		>
			<Button className="w-full" type="submit">
				Sign up with GitHub
			</Button>
		</form>

		<p className="text-sm text-gray-600">
			Already have an account?{' '}
			<Link className="underline" href="/sign-in">
				Sign in
			</Link>
		</p>
	</main>
);

export default SignUpPage;
