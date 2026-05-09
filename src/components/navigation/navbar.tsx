import { Suspense } from 'react';

import Actions from './actions';
import Links from './links';
import Logo from './logo';

const Navbar = () => (
	<header className="border-foreground/10 bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-xl">
		<nav className="container mx-auto flex h-16 items-center justify-between px-4">
			<Logo />
			<Links />
			<Suspense
				fallback={
					<div className="bg-muted/20 h-9 w-24 animate-pulse rounded-md" />
				}
			>
				<Actions />
			</Suspense>
		</nav>
	</header>
);

export default Navbar;
