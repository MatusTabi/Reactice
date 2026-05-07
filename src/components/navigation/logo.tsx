import { Code2 } from 'lucide-react';
import Link from 'next/link';

const Logo = () => (
	<Link href="/" className="group flex items-center gap-x-2 select-none">
		<div className="bg-primary rounded-md p-1 transition-all duration-300 group-hover:scale-105 group-hover:-rotate-3 group-hover:shadow-[0_0_15px_color-mix(in_oklch,var(--primary),transparent_70%)] dark:group-hover:shadow-[0_0_15px_color-mix(in_oklch,var(--primary),transparent_30%)]">
			<Code2 className="text-primary-foreground h-5 w-5 transition-transform duration-300 group-hover:rotate-3" />
		</div>

		<span className="text-2xl leading-none font-bold tracking-tight">
			React
			<span className="text-primary transition-all duration-300 group-hover:brightness-110 group-hover:drop-shadow-[0_0_15px_color-mix(in_oklch,var(--primary),transparent_20%)]">
				ice
			</span>
		</span>
	</Link>
);

export default Logo;

// End of logo.tsx
