import { ChevronDown, ListFilter } from 'lucide-react';
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
	content: string[];
	preIcon?: React.ReactNode;
};

const FilterDropdown = ({ title, content, preIcon }: FilterDropdownProps) => (
	<DropdownMenu>
		<DropdownMenuTrigger asChild>
			<Button className="ml-4 h-10 gap-2 border border-[#3d494d] bg-transparent">
				{preIcon}
				{title}
				<ChevronDown className="inline h-4 w-4" />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent className="w-40" align="start">
			<DropdownMenuGroup>
				{content.map(item => (
					<DropdownMenuItem key={item}>{item}</DropdownMenuItem>
				))}
			</DropdownMenuGroup>
		</DropdownMenuContent>
	</DropdownMenu>
);

export default FilterDropdown;
