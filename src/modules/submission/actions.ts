'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { getUserServerCtx } from '@/app/server/user-server-ctx';
import { challengeQueries } from '@/backend/challenge/queries';
import { type DifficultyType } from '@/backend/challenge/schema';
import { submissionMutations } from '@/backend/submission/mutations';
import { evaluateComponent } from '@/modules/ai/actions';

// Client-supplied input is limited to identifying the challenge and the code.
// All trust-sensitive fields (score, feedback, pointsAwarded) are derived
// server-side below.
const submitSolutionSchema = z.object({
	challengeId: z.string().min(1),
	submittedCode: z.string().min(1)
});

export type SubmitSolutionInput = z.infer<typeof submitSolutionSchema>;

const POINTS_BY_DIFFICULTY: Record<DifficultyType, number> = {
	easy: 10,
	medium: 25,
	hard: 50
};

const computePointsAwarded = (
	difficulty: DifficultyType,
	score: number
): number => Math.round((POINTS_BY_DIFFICULTY[difficulty] * score) / 100);

export const submitSolutionAction = async (input: SubmitSolutionInput) => {
	const { loggedInUser } = await getUserServerCtx();

	if (!loggedInUser) {
		throw new Error('You must be logged in to submit a solution');
	}

	const { challengeId, submittedCode } = submitSolutionSchema.parse(input);

	const challenge = await challengeQueries.getById(challengeId);

	if (!challenge) {
		throw new Error('Challenge not found');
	}

	const evaluation = await evaluateComponent({
		userCode: submittedCode,
		referenceFiles: challenge.files.map(f => ({
			name: f.name,
			content: f.content
		}))
	});

	const pointsAwarded = computePointsAwarded(
		challenge.difficulty,
		evaluation.score
	);

	const submission = await submissionMutations.create({
		loggedInUser,
		input: {
			challengeId,
			submittedCode,
			score: evaluation.score,
			feedback: evaluation.feedback,
			pointsAwarded
		}
	});

	revalidatePath('/leaderboard');
	revalidatePath('/profile');

	return { submission, evaluation };
};
