'use client';

import { ChevronDown } from 'lucide-react';

import { Button } from '../ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '../ui/dropdown-menu';

type FilterDropdownProps = {
	title: string;
	value?: string;
	onChange?: (value: string) => void;
	content: string[];
	preIcon?: React.ReactNode;
};

const FilterDropdown = ({
	title,
	onChange,
	content,
	preIcon
}: FilterDropdownProps) => (
	<DropdownMenu>
		<DropdownMenuTrigger asChild>
			<Button className="bg-primary text-primary-foreground border-primary h-10 gap-2 border">
				{preIcon}
				{title}
				<ChevronDown className="inline h-4 w-4" />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent className="w-40" align="start">
			<DropdownMenuGroup>
				{content.map(item => (
					<DropdownMenuItem key={item} onClick={() => onChange?.(item)}>
						{item}
					</DropdownMenuItem>
				))}
			</DropdownMenuGroup>
		</DropdownMenuContent>
	</DropdownMenu>
);

export default FilterDropdown;
