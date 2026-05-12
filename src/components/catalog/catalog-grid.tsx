'use client';

import { useState } from 'react';

import type { ChallengeDetailType } from '@/backend/challenge/schema';
import CatalogCard from '@/components/catalog/catalog-card';
import { Button } from '@/components/ui/button';

type CatalogGridProps = {
	challenges: ChallengeDetailType[];
	pageSize?: number;
};

const CatalogGrid = ({ challenges, pageSize = 6 }: CatalogGridProps) => {
	const [visibleCount, setVisibleCount] = useState(pageSize);

	const visibleChallenges = challenges.slice(0, visibleCount);

	const canLoadMore = visibleCount < challenges.length;

	return (
		<>
			<section className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{visibleChallenges.map(challenge => (
					<CatalogCard key={challenge.id} challenge={challenge} />
				))}
			</section>
			{canLoadMore ? (
				<Button
					className="mx-auto mt-12 flex items-center p-4"
					onClick={() => {
						setVisibleCount(current =>
							Math.min(current + pageSize, challenges.length)
						);
					}}
				>
					Load More
				</Button>
			) : null}
		</>
	);
};

export default CatalogGrid;
