import { useMutation } from '@tanstack/react-query';

import {
	evaluationResultSchema,
	type EvaluateRequest,
	type EvaluationResult
} from '@/modules/ai/schema';

const evaluateComponent = async (
	data: EvaluateRequest
): Promise<EvaluationResult> => {
	const response = await fetch('/api/ai/evaluate', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});

	const json = await response.json();

	if (!response.ok) {
		throw new Error(json.error ?? 'Failed to evaluate component');
	}

	return evaluationResultSchema.parse(json);
};

export const useEvaluateMutation = () =>
	useMutation({
		mutationFn: evaluateComponent
	});
