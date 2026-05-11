import CardComponentOverview from './card-component-overview';
import CardComponentPreview from './card-component-preview';
import CategoryTag from './category-tag';
import DifficultyTag from './difficulty-tag';

type CatalogCardProps = {
	title: string;
	description: string;
	referenceUrl: string;
	creatorName: string;
	difficulty: 'easy' | 'medium' | 'hard';
	rating?: number;
};

const CatalogCard = ({
	title,
	description,
	referenceUrl,
	creatorName,
	difficulty,
	rating
}: CatalogCardProps) => (
	<div className="bg-card relative flex h-108 justify-center rounded-lg border border-[#3d494d]">
		<div className="flex w-full flex-col">
			<CardComponentPreview className="h-1/2" referenceUrl={referenceUrl} />
			<CardComponentOverview
				className="h-1/2"
				title={title}
				description={description}
				creatorName={creatorName}
				rating={rating}
			/>
		</div>
		<div className="absolute top-4 right-4 flex flex-col items-end gap-2">
			<CategoryTag category="UI" />
			<DifficultyTag difficulty={difficulty} />
		</div>
	</div>
);

export default CatalogCard;
