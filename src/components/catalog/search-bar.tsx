'use client';

import { Input } from '../ui/input';

type SearchComponentsBarProps = {
	value: string;
	onChange: (value: string) => void;
};

const SearchComponentsBar = ({ value, onChange }: SearchComponentsBarProps) => (
	<Input
		type="search"
		placeholder="Search components..."
		className="text-foreground h-10 w-full rounded-md border-[#3d494d] sm:w-64"
		value={value}
		onChange={e => onChange(e.target.value)}
	/>
);

export default SearchComponentsBar;
