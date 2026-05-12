import { Suspense } from 'react';

import { challengeQueries } from '@/backend/challenge/queries';
import Catalog from '@/components/catalog/catalog';

const CatalogContent = async () => {
	const challenges = await challengeQueries.getAll();

	return <Catalog challenges={challenges} />;
};

const CatalogPage = async () => (
	<Suspense fallback={<div>Loading...</div>}>
		<CatalogContent />
	</Suspense>
);

export default CatalogPage;
