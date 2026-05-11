import { Star } from 'lucide-react';

const ComponentRating = ({ rating }: { rating: number }) => (
	<>
		<div className="flex items-center gap-1">
			<Star className="text-lime-500" />
			<span className="text-sm text-gray-400">{rating}</span>
		</div>
	</>
);

export default ComponentRating;
