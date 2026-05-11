import CardComponentOverview from './card-component-overview';
import CardComponentPreview from './card-component-preview';
import CategoryTag from './category-tag';
import DifficultyTag from './difficulty-tag';

const CatalogCard = () => (
	<div className="relative flex h-108 justify-center rounded-lg border border-[#3d494d] bg-[#262a31]">
		<div className="flex w-full flex-col">
			<CardComponentPreview className="h-1/2" />
			<CardComponentOverview className="h-1/2" />
		</div>
		<div className="absolute top-4 right-4 flex flex-col items-end gap-2">
			<CategoryTag category="UI" />
			<DifficultyTag difficulty="Intermediate" />
		</div>
	</div>
);

export default CatalogCard;
