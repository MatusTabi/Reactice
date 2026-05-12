import Link from 'next/link';

import { Button } from '@/components/ui/button';

const ResultErrorPage = () => (
	<main className="bg-surface flex h-[calc(100vh-69px)] w-full flex-col items-center justify-center gap-6 text-center">
		<h1 className="text-foreground text-3xl font-bold">Evaluation failed</h1>
		<p className="text-muted-foreground max-w-lg text-base">
			We could not evaluate your submission. Please try again in a moment.
		</p>
		<Link href="/catalog">
			<Button>Back to catalog</Button>
		</Link>
	</main>
);

export default ResultErrorPage;
