import CardComponentOverview from './card-component-overview';
import CardComponentPreview from './card-component-preview';

const CatalogCard = () => (
	<div className="relative flex h-108 justify-center rounded-lg border border-[#3d494d] bg-[#262a31]">
		<div className="flex w-full flex-col">
			<CardComponentPreview className="h-1/2" />
			<CardComponentOverview className="h-1/2" />
		</div>
		<div className="absolute top-4 right-4">
			<h1 className="rounded-md border border-[#3d494d] bg-[#262a31] px-2 py-1 text-sm text-white">
				Category
			</h1>
		</div>
	</div>
);

export default CatalogCard;
