import { useMutation } from '@tanstack/react-query';

import { evaluateComponent } from '@/modules/ai/actions';

export const useEvaluateMutation = () =>
	useMutation({
		mutationFn: evaluateComponent
	});
