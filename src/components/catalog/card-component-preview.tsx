import { cn } from '@/lib/cn';

type CardComponentPreviewProps = {
	className?: string;
};

const CardComponentPreview = ({ className }: CardComponentPreviewProps) => (
	<div className={cn('flex items-center justify-center', className)}></div>
);

export default CardComponentPreview;
