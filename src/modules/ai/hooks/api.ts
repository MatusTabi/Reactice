import { useMutation } from '@tanstack/react-query';

import { evaluateComponent } from '@/modules/ai/actions';
import { submitSolutionAction } from '@/modules/submission/actions';

export const useEvaluateMutation = () =>
	useMutation({
		mutationFn: evaluateComponent
	});

export const useSubmitMutation = () =>
	useMutation({
		mutationFn: submitSolutionAction
	});
