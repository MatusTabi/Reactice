import { LogIn } from 'lucide-react';
import Link from 'next/link';

import { Button } from '../ui/button';

const SignInButton = () => (
	<Link href="/sign-in">
		<Button
			size="sm"
			className="dark:bg-primary/90 text-primary-foreground h-9 cursor-pointer gap-2 px-4 font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.97]"
		>
			<LogIn className="h-4 w-4" />
			<span className="hidden text-sm sm:inline">Sign In</span>
		</Button>
	</Link>
);

export default SignInButton;
