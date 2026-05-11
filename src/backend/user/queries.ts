import { auth } from '@/auth';

import { userMapper } from './mapper';

const getLoggedIn = async () => {
	const session = await auth();

	if (!session?.user) {
		return null;
	}

	return userMapper.fromSession(session.user);
};

export const userQueries = {
	getLoggedIn
};
