import { eq } from 'drizzle-orm';

import { challengeFiles, challenges, db } from '@/db';

import { type UserDetailType } from '../user/schema';

import { challengeMapper } from './mapper';
import {
	createChallengeSchema,
	updateChallengeSchema,
	type CreateChallengeType,
	type UpdateChallengeType
} from './schema';

const create = async ({
	loggedInUser,
	input
}: {
	loggedInUser: UserDetailType | null;
	input: CreateChallengeType;
}) => {
	if (!loggedInUser) {
		throw new Error('You must be logged in to create a challenge');
	}

	const { files, ...challengeData } = createChallengeSchema.parse(input);

	const [created] = await db
		.insert(challenges)
		.values({
			...challengeData,
			referenceImageUrl: challengeData.referenceImageUrl ?? null,
			creatorId: loggedInUser.id
		})
		.returning();

	if (!created) {
		throw new Error('Failed to create challenge');
	}

	await db
		.insert(challengeFiles)
		.values(files.map(f => ({ ...f, challengeId: created.id })));

	return challengeMapper.toBasic(created);
};

const update = async ({
	loggedInUser,
	input
}: {
	loggedInUser: UserDetailType | null;
	input: UpdateChallengeType;
}) => {
	if (!loggedInUser) {
		throw new Error('You must be logged in to update a challenge');
	}

	const { id, files, ...data } = updateChallengeSchema.parse(input);

	const existing = await db.query.challenges.findFirst({
		where: (c, { eq: eqFn }) => eqFn(c.id, id)
	});

	if (!existing) {
		throw new Error('Challenge not found');
	}

	if (existing.creatorId !== loggedInUser.id) {
		throw new Error('You can only update your own challenges');
	}

	const [updated] = await db
		.update(challenges)
		.set(data)
		.where(eq(challenges.id, id))
		.returning();

	if (!updated) {
		throw new Error('Failed to update challenge');
	}

	if (files) {
		await db.delete(challengeFiles).where(eq(challengeFiles.challengeId, id));
		await db
			.insert(challengeFiles)
			.values(files.map(f => ({ ...f, challengeId: id })));
	}

	return challengeMapper.toBasic(updated);
};

const remove = async ({
	loggedInUser,
	id
}: {
	loggedInUser: UserDetailType | null;
	id: string;
}) => {
	if (!loggedInUser) {
		throw new Error('You must be logged in to delete a challenge');
	}

	const existing = await db.query.challenges.findFirst({
		where: (c, { eq: eqFn }) => eqFn(c.id, id)
	});

	if (!existing) {
		throw new Error('Challenge not found');
	}

	if (existing.creatorId !== loggedInUser.id) {
		throw new Error('You can only delete your own challenges');
	}

	await db.delete(challenges).where(eq(challenges.id, id));
};

export const challengeMutations = {
	create,
	update,
	delete: remove
};
