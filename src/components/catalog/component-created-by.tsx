import { User } from 'lucide-react';

type CreatedByProps = {
	createdBy?: string;
};

const CreatedBy = ({ createdBy }: CreatedByProps) => (
	<p className="text-muted-foreground mt-2 text-xs">
		<User className="mr-1 inline-block h-4 w-4" />
		by {createdBy}
	</p>
);

export default CreatedBy;
