import CatalogGrid from '@/components/catalog/catalog-grid';
import FilterDropdown from '@/components/catalog/filter-dropdown';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ListFilter, Plus } from 'lucide-react';
import { Suspense } from 'react';
import { challengeQueries } from '@/backend/challenge/queries';
import SearchComponentsBar from '@/components/catalog/search-bar';

const CatalogContent = async () => {
	const challenges = await challengeQueries.getAll();
	return (
		<div className="bg-background/80 h-full w-full px-64 pt-16 pb-16">
			{challenges.length === 0 ? (
				<>
					<div className="flex h-full w-full flex-col items-center justify-center gap-4">
						<p className="text-foreground/80 text-lg">No components found.</p>
					</div>
					<div className="flex justify-end">
						<Button className="p-2">
							<Plus className="h-4 w-4" />
							Create Your Own
						</Button>
					</div>
				</>
			) : (
				<>
					<section className="mb-12 flex w-full justify-between">
						<SearchComponentsBar />
						<div className="flex items-center">
							{/* <FilterDropdown
								title="Categories"
								content={['All', 'Navbar', 'Card', 'Form']}
								preIcon={<ListFilter className="inline h-4 w-4" />}
							/> */}
							<FilterDropdown
								title="Sort By"
								content={['Name', 'Date Added']}
							/>
							<FilterDropdown
								title="Difficulty"
								content={['All', 'Easy', 'Medium', 'Hard']}
							/>
							<Button className="ml-4 h-10 p-2">
								<Plus className="h-4 w-4" />
								Create Your Own
							</Button>
						</div>
					</section>
					<CatalogGrid challenges={challenges} />
				</>
			)}
		</div>
	);
};

const CatalogPage = async () => (
	<Suspense fallback={<div>Loading...</div>}>
		<CatalogContent />
	</Suspense>
);

export default CatalogPage;
