'use client';

import { useState } from 'react';
import { Input } from '../ui/input';

const SearchComponentsBar = () => {
	const [search, setSearch] = useState('');

	return (
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
	);
};

export default SearchComponentsBar;
