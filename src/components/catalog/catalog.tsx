'use client';

import { ChallengeDetailType } from '@/backend/challenge/schema';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import SearchComponentsBar from './search-bar';
import FilterDropdown from './filter-dropdown';
import CatalogGrid from './catalog-grid';
import { useState } from 'react';

type CatalogProps = {
	challenges: ChallengeDetailType[];
};

const Catalog = ({ challenges }: CatalogProps) => {
	const [search, setSearch] = useState('');
	const [difficultyFilter, setDifficultyFilter] = useState('All');
	const [sortBy, setSortBy] = useState('Name');

	const filteredChallenges = challenges
		.filter(challenge => {
			if (difficultyFilter === 'All') return true;
			return challenge.difficulty === difficultyFilter.toLowerCase();
		})
		.filter(challenge =>
			challenge.title.toLowerCase().includes(search.toLowerCase())
		)
		.sort((a, b) => {
			if (sortBy === 'Name') {
				return a.title.localeCompare(b.title);
			} else if (sortBy === 'Date Added') {
				return (
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				);
			}
			return 0;
		});

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
						<SearchComponentsBar value={search} onChange={setSearch} />
						<div className="flex items-center">
							{/* <FilterDropdown
								title="Categories"
								content={['All', 'Navbar', 'Card', 'Form']}
								preIcon={<ListFilter className="inline h-4 w-4" />}
							/> */}
							<FilterDropdown
								title="Sort By"
								content={['Name', 'Date Added']}
								value={sortBy}
								onChange={setSortBy}
							/>
							<FilterDropdown
								title="Difficulty"
								content={['All', 'Easy', 'Medium', 'Hard']}
								value={difficultyFilter}
								onChange={setDifficultyFilter}
							/>
							<Button className="ml-4 h-10 p-2">
								<Plus className="h-4 w-4" />
								Create Your Own
							</Button>
						</div>
					</section>
					<CatalogGrid challenges={filteredChallenges} />
				</>
			)}
		</div>
	);
};

export default Catalog;
