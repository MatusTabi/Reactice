import { LogOut } from 'lucide-react';

import { signOut } from '@/auth';
import { Button } from '@/components/ui/button';

export const SignOutButton = () => (
	<form
		action={async () => {
			'use server';
			await signOut({ redirectTo: '/sign-in' });
		}}
	>
		<Button
			variant="outline"
			type="submit"
			size="sm"
			className="h-9 cursor-pointer gap-2 px-2 font-semibold transition-all duration-300 active:scale-[0.97]"
		>
			<LogOut className="h-4 w-4" />
			<span className="sr-only">Sign Out</span>
		</Button>
	</form>
);

// End of sign-out-button.tsx
