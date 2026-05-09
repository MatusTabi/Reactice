import Link from 'next/link';
import Image from 'next/image';
import { User as UserIcon } from 'lucide-react';
import { type User } from 'next-auth';

import { Button } from '../ui/button';

const UserProfile = ({ user }: { user: User }) => (
	<Button
		asChild
		variant="ghost"
		size="icon"
		className="group border-foreground/10 bg-muted/20 relative h-9 w-9 overflow-hidden rounded-full border transition-all duration-300 active:scale-[0.97]"
	>
		<Link href="/app/profile">
			{user?.image ? (
				<Image
					src={user.image}
					alt={user.name ?? 'Profile'}
					width={36}
					height={36}
					className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-85"
				/>
			) : (
				<UserIcon className="group-hover:text-foreground/95 h-5 w-5 transition-colors duration-300" />
			)}
		</Link>
	</Button>
);

export default UserProfile;
