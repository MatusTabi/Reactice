import { signOut } from '@/auth';
import { Button } from '@/components/ui/button';

export const SignOutButton = () => (
	<form
		action={async () => {
			'use server';
			await signOut({ redirectTo: '/sign-in' });
		}}
	>
		<Button type="submit">Sign out</Button>
	</form>
);
