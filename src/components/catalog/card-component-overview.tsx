import ComponentTitle from './component-title';
import ComponentRating from './component-rating';
import { cn } from '@/lib/cn';
import ComponentDescription from './component-description';
import CreatedBy from './component-created-by';
import { ArrowRight } from 'lucide-react';

type CardComponentOverviewProps = {
	className?: string;
};

const CardComponentOverview = ({ className }: CardComponentOverviewProps) => (
	<div className={cn('flex flex-col justify-center px-8 py-2', className)}>
		<div className="flex items-center justify-between">
			<ComponentTitle title="Component title" />
			<ComponentRating rating={4.5} />
		</div>
		<ComponentDescription description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
		<hr className="my-4 border-gray-700" />
		<div className="flex items-center justify-between">
			<CreatedBy createdBy="John Doe" />
			<ArrowRight className="text-muted-foreground" />
		</div>
	</div>
);

export default CardComponentOverview;
