import { ArrowRight } from 'lucide-react';

import { cn } from '@/lib/cn';

import ComponentTitle from './component-title';
import ComponentDescription from './component-description';
import CreatedBy from './component-created-by';

type CardComponentOverviewProps = {
	title: string;
	description: string;
	creatorName: string;
	rating?: number;
	className?: string;
};

const CardComponentOverview = ({
	title,
	description,
	creatorName,
	className
}: CardComponentOverviewProps) => (
	<div className={cn('flex flex-col justify-center px-8 py-2', className)}>
		<div className="flex items-center justify-between">
			<ComponentTitle title={title} />
			{/* <ComponentRating rating={rating} /> */}
		</div>
		<ComponentDescription description={description} />
		<hr className="my-4 border-gray-700" />
		<div className="flex items-center justify-between">
			<CreatedBy createdBy={creatorName} />
			<ArrowRight className="text-muted-foreground" />
		</div>
	</div>
);

export default CardComponentOverview;
