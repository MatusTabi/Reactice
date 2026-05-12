import Image from 'next/image';

import { cn } from '@/lib/cn';

type CardComponentPreviewProps = {
	referenceUrl?: string;
	className?: string;
};

const CardComponentPreview = ({
	referenceUrl,
	className
}: CardComponentPreviewProps) => (
	<div className={cn('relative flex items-center justify-center', className)}>
		<Image
			fill
			sizes="100vw"
			src={referenceUrl ?? '/images/react-js.png'}
			alt="Image preview"
			className="rounded-tl-lg rounded-tr-lg object-cover"
		/>
	</div>
);

export default CardComponentPreview;
