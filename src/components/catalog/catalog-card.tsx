import Link from 'next/link';

import { type ChallengeDetailType } from '@/backend/challenge/schema';

import CardComponentOverview from './card-component-overview';
import CardComponentPreview from './card-component-preview';
import CategoryTag from './category-tag';
import DifficultyTag from './difficulty-tag';

type CatalogCardProps = {
	challenge: ChallengeDetailType;
};

const CatalogCard = ({ challenge }: CatalogCardProps) => (
	<Link href={`/${challenge.id}`}>
		<div className="bg-card relative flex h-108 justify-center rounded-lg border border-[#3d494d]">
			<div className="flex w-full flex-col">
				<CardComponentPreview
					className="h-1/2"
					referenceUrl={challenge.referenceImageUrl ?? undefined}
				/>
				<CardComponentOverview
					className="h-1/2"
					title={challenge.title}
					description={challenge.description}
					creatorName={challenge.creator.name ?? undefined}
				/>
			</div>
			<div className="absolute top-4 right-4 flex flex-col items-end gap-2">
				<CategoryTag category="UI" />
				<DifficultyTag difficulty={challenge.difficulty} />
			</div>
		</div>
	</Link>
);

export default CatalogCard;
