import { User } from 'lucide-react';

const CreatedBy = ({ createdBy }: { createdBy: string }) => (
	<p className="mt-2 text-xs text-gray-400">
		<User className="mr-1 inline-block h-4 w-4" />
		by {createdBy}
	</p>
);

export default CreatedBy;
