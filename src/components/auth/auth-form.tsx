import Link from 'next/link';

import { signIn } from '@/auth';
import { Button } from '@/components/ui/button';

type AuthFormProps = {
	title: string;
	description: string;
	buttonText: string;
	linkPrefix: string;
	linkText: string;
	linkHref: string;
};

export const AuthForm = ({
	title,
	description,
	buttonText,
	linkPrefix,
	linkText,
	linkHref
}: AuthFormProps) => (
	<main className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center gap-6 p-6">
		<h1 className="text-2xl font-semibold">{title}</h1>
		<p className="text-sm text-gray-600">{description}</p>

		<form
			action={async () => {
				'use server';
				await signIn('github', { redirectTo: '/app/profile' });
			}}
		>
			<Button className="w-full" type="submit">
				{buttonText}
			</Button>
		</form>

		<p className="text-sm text-gray-600">
			{linkPrefix}{' '}
			<Link className="underline" href={linkHref}>
				{linkText}
			</Link>
		</p>
	</main>
);
