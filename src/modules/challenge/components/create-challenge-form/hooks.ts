import { useMutation } from '@tanstack/react-query';

import { createChallengeAction } from '@/modules/challenge/actions';

export const useCreateChallengeMutation = () =>
	useMutation({ mutationFn: createChallengeAction });
