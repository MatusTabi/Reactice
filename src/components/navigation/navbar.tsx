import Actions from './actions';
import Links from './links';
import Logo from './logo';

const Navbar = () => (
	<header className="border-foreground/10 bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-xl">
		<nav className="container mx-auto flex h-16 items-center justify-between px-4">
			<Logo />
			<Links />
			<Actions />
		</nav>
	</header>
);

export default Navbar;

// End of navbar.tsx
