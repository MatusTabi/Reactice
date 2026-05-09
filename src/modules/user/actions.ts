'use server';

import { eq } from 'drizzle-orm';

import { auth } from '@/auth';
import { users } from '@/db/schema';
import { db } from '@/lib/db';

import { updateUserProfileSchema, type UpdateUserProfileInput } from './schema';

type ActionResult = { success: true } | { success: false; error: string };

/**
 * Server Action — update the currently authenticated user's profile.
 *
 * Pattern:
 *  1. Authenticate  — reject unauthenticated callers
 *  2. Validate      — parse & validate input with Zod (throws ZodError on failure)
 *  3. Authorise     — ensure the caller may only mutate their own record
 *  4. Persist       — write to the database
 */
export const updateUserProfile = async (
	input: UpdateUserProfileInput
): Promise<ActionResult> => {
	const session = await auth();

	if (!session?.user?.id) {
		return { success: false, error: 'Unauthorized' };
	}

	const data = updateUserProfileSchema.parse(input);

	await db
		.update(users)
		.set({ name: data.name, image: data.image ?? null })
		.where(eq(users.id, session.user.id));

	return { success: true };
};
