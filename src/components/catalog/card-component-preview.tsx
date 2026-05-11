import { cn } from '@/lib/cn';

type CardComponentPreviewProps = {
	referenceUrl?: string;
	className?: string;
};

const CardComponentPreview = ({
	referenceUrl,
	className
}: CardComponentPreviewProps) => (
	<div className={cn('flex items-center justify-center', className)}>
		<img
			src={referenceUrl}
			className="h-full w-full rounded-tl-lg rounded-tr-lg object-cover"
		/>
	</div>
);

export default CardComponentPreview;
