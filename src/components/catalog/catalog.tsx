'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { type ChallengeDetailType } from '@/backend/challenge/schema';

import { Button } from '../ui/button';

import SearchComponentsBar from './search-bar';
import FilterDropdown from './filter-dropdown';
import CatalogGrid from './catalog-grid';

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
		<div className="bg-background/80 h-full w-full px-4 pt-8 pb-16 sm:px-8 md:px-16 lg:px-32 xl:px-64">
			{challenges.length === 0 ? (
				<>
					<div className="flex h-full w-full flex-col items-center justify-center gap-4">
						<p className="text-foreground/80 text-lg">No components found.</p>
					</div>
					<div className="flex justify-end">
						<Button asChild variant="outline" className="p-2">
							<Link href="/challenges/new">
								<Plus className="h-4 w-4" />
								Create Your Own
							</Link>
						</Button>
					</div>
				</>
			) : (
				<>
					<section className="mb-8 flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
						<SearchComponentsBar value={search} onChange={setSearch} />
						<div className="flex flex-wrap items-center gap-2">
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
							<Button asChild variant="outline" className="h-10 p-2">
								<Link href="/challenges/new">
									<Plus className="h-4 w-4" />
									Create Your Own
								</Link>
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
