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

	// Atomic: challenge + files succeed together, or neither does.
	const created = await db.transaction(async tx => {
		const [row] = await tx
			.insert(challenges)
			.values({
				...challengeData,
				referenceImageUrl: challengeData.referenceImageUrl ?? null,
				creatorId: loggedInUser.id
			})
			.returning();

		if (!row) {
			throw new Error('Failed to create challenge');
		}

		await tx
			.insert(challengeFiles)
			.values(files.map(f => ({ ...f, challengeId: row.id })));

		return row;
	});

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

	// Atomic: ownership check, metadata update, and file replacement all in one tx.
	// Also avoids TOCTOU between the existence check and the update.
	const updated = await db.transaction(async tx => {
		const existing = await tx.query.challenges.findFirst({
			where: (c, { eq: eqFn }) => eqFn(c.id, id)
		});

		if (!existing) {
			throw new Error('Challenge not found');
		}

		if (existing.creatorId !== loggedInUser.id) {
			throw new Error('You can only update your own challenges');
		}

		const [row] = await tx
			.update(challenges)
			.set(data)
			.where(eq(challenges.id, id))
			.returning();

		if (!row) {
			throw new Error('Failed to update challenge');
		}

		if (files) {
			await tx.delete(challengeFiles).where(eq(challengeFiles.challengeId, id));
			await tx
				.insert(challengeFiles)
				.values(files.map(f => ({ ...f, challengeId: id })));
		}

		return row;
	});

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
