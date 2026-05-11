import { cache } from 'react';

import { userQueries } from '@/backend/user/queries';

export const getUserServerCtx = cache(async () => ({
	loggedInUser: await userQueries.getLoggedIn()
}));
