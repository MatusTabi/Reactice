import { Star } from 'lucide-react';

type ComponentRatingProps = {
	rating?: number;
};

const ComponentRating = ({ rating }: ComponentRatingProps) => (
	<>
		<div className="flex items-center gap-1">
			<Star className="text-lime-500" />
			<span className="text-foreground text-sm">{rating}</span>
		</div>
	</>
);

export default ComponentRating;
