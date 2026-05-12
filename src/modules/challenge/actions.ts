'use server';

import { revalidatePath } from 'next/cache';

import { getUserServerCtx } from '@/app/server/user-server-ctx';
import { uploadChallengeImage } from '@/backend/blob/upload';
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

// Accepts a FormData with a single 'file' field (File, max 2 MB).
// Returns the public Blob URL to store as referenceImageUrl.
export const uploadChallengeImageAction = async (
	formData: FormData
): Promise<string> => {
	const { loggedInUser } = await getUserServerCtx();

	if (!loggedInUser) {
		throw new Error('You must be logged in to upload an image');
	}

	const file = formData.get('file');

	if (!(file instanceof File) || file.size === 0) {
		throw new Error('No file provided');
	}

	return uploadChallengeImage(file);
};

export const deleteChallengeAction = async (id: string) => {
	const { loggedInUser } = await getUserServerCtx();

	await challengeMutations.delete({
		loggedInUser,
		id
	});

	revalidatePath('/challenges');
};
