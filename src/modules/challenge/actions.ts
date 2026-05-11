'use server';

import { revalidatePath } from 'next/cache';

import { getUserServerCtx } from '@/app/server/user-server-ctx';
import { challengeMutations } from '@/backend/challenge/mutations';
import {
	type CreateChallengeType,
	type UpdateChallengeType
} from '@/backend/challenge/schema';

export const createChallengeAction = async (input: CreateChallengeType) => {
	const { loggedInUser } = await getUserServerCtx();

	const challenge = await challengeMutations.create({
		loggedInUser,
		input
	});

	revalidatePath('/challenges');

	return challenge;
};

export const updateChallengeAction = async (input: UpdateChallengeType) => {
	const { loggedInUser } = await getUserServerCtx();

	const challenge = await challengeMutations.update({
		loggedInUser,
		input
	});

	revalidatePath('/challenges');
	revalidatePath(`/challenges/${input.id}`);

	return challenge;
};

export const deleteChallengeAction = async (id: string) => {
	const { loggedInUser } = await getUserServerCtx();

	await challengeMutations.delete({
		loggedInUser,
		id
	});

	revalidatePath('/challenges');
};
