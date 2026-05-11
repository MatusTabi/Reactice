'use client';

import CatalogCard from '@/components/catalog/catalog-card';
import FilterDropdown from '@/components/catalog/filter-dropdown';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { ListFilter } from 'lucide-react';
import { useState } from 'react';

const ComponentCatalog = () => {
	const [search, setSearch] = useState('');

	return (
		<div className="bg-background/80 h-full w-full px-64 pt-16 pb-16">
			<section className="mb-12 flex w-full justify-between">
				<Input
					type="search"
					placeholder="Search components..."
					className="text-foreground h-10 w-1/3 rounded-md border-[#3d494d]"
					value={search}
					onChange={e => {
						setSearch(e.target.value);
						console.log(e.target.value);
					}}
				/>
				<div className="flex items-center">
					<FilterDropdown
						title="Categories"
						content={['All', 'Navbar', 'Card', 'Form']}
						preIcon={<ListFilter className="inline h-4 w-4" />}
					/>
					<FilterDropdown
						title="Sort By"
						content={['Name', 'Date Added', 'Popularity']}
					/>
					<FilterDropdown
						title="Difficulty"
						content={['All', 'Beginner', 'Intermediate', 'Advanced']}
					/>
				</div>
			</section>
			<section className="grid grid-cols-3 items-stretch gap-8">
				<CatalogCard />
				<CatalogCard />
				<CatalogCard />
				<CatalogCard />
				<CatalogCard />
				<CatalogCard />
			</section>
			<Button className="mx-auto mt-12 flex items-center p-4">Load More</Button>
		</div>
	);
};

export default ComponentCatalog;
