import CatalogCard from '@/components/catalog/catalog-card';
import FilterDropdown from '@/components/catalog/filter-dropdown';
import { Button } from '@/components/ui/button';
import {
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenu
} from '@/components/ui/dropdown-menu';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { ListFilter } from 'lucide-react';

const ComponentCatalog = () => (
	<div className="h-full w-full bg-[#10141a] px-64 pt-16 pb-16">
		<section className="mb-12 flex w-full justify-between">
			<Field orientation="horizontal" className="w-1/3">
				<Input
					type="search"
					placeholder="Search components..."
					className="h-10 rounded-md text-white"
				/>
				<Button className="h-10 border border-[#3d494d] bg-transparent">
					Search
				</Button>
			</Field>
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

export default ComponentCatalog;
