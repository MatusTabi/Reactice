import { Suspense } from 'react';

import { challengeQueries } from '@/backend/challenge/queries';
import Catalog from '@/components/catalog/catalog';
import PageLoader from '@/components/ui/page-loader';

const CatalogContent = async () => {
	const challenges = await challengeQueries.getAll();

	return <Catalog challenges={challenges} />;
};

const CatalogPage = async () => (
	<Suspense fallback={<PageLoader />}>
		<CatalogContent />
	</Suspense>
);

export default CatalogPage;
