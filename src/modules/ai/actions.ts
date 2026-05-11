'use server';

import { ZodError } from 'zod';

import {
	evaluateRequestSchema,
	evaluationResultSchema,
	openRouterResponseSchema,
	type EvaluateRequest,
	type EvaluationResult
} from '@/modules/ai/schema';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODELS = [
	'google/gemma-4-26b-a4b-it:free',
	'google/gemma-4-31b-it:free',
	'nvidia/nemotron-3-super-120b-a12b:free'
];

const QUALITY_SYSTEM_PROMPT = `You are an expert React developer and UI evaluator.
You will receive a React component submitted by a user.
Evaluate its quality and return ONLY a valid JSON object — no explanation, no markdown, no code fences.
The JSON must match exactly this shape:
{ "score": number, "feedback": string }
Where:
- "score" is an integer from 0 to 100 representing the overall quality of the component
- "feedback" is a concise string explaining the score and pointing out specific strengths or issues`;

const ACCURACY_SYSTEM_PROMPT = `You are an expert React developer and UI evaluator.
You will receive a user's React component and the reference solution it should match.
Compare the user's implementation against the reference and score its visual and structural accuracy.
Return ONLY a valid JSON object — no explanation, no markdown, no code fences.
The JSON must match exactly this shape:
{ "score": number, "feedback": string }
Where:
- "score" is an integer from 0 to 100 representing how accurately the user's component matches the reference (100 = perfect match)
- "feedback" is a concise string explaining the score and pointing out specific visual or structural differences from the reference`;

const buildUserMessage = (
	userCode: string,
	referenceFiles?: Array<{ name: string; content: string }>
): string => {
	if (!referenceFiles?.length) {
		return `Evaluate this React component:\n\n${userCode}`;
	}

	const referenceSection = referenceFiles
		.map(f => `--- ${f.name} ---\n${f.content}`)
		.join('\n\n');

	return `Reference solution:\n\n${referenceSection}\n\nUser's submission:\n\n${userCode}`;
};

export const evaluateComponent = async (
	data: EvaluateRequest
): Promise<EvaluationResult> => {
	const apiKey = process.env.OPENROUTER_API_KEY;

	if (!apiKey) {
		throw new Error('OpenRouter API key is not configured');
	}

	const { userCode, referenceFiles } = evaluateRequestSchema.parse(data);

	const systemPrompt = referenceFiles?.length
		? ACCURACY_SYSTEM_PROMPT
		: QUALITY_SYSTEM_PROMPT;

	const openRouterResponse = await fetch(OPENROUTER_API_URL, {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${apiKey}`,
			'Content-Type': 'application/json',
			'HTTP-Referer': 'https://reactice.vercel.app',
			'X-OpenRouter-Title': 'Reactice'
		},
		body: JSON.stringify({
			models: MODELS,
			route: 'fallback',
			messages: [
				{ role: 'system', content: systemPrompt },
				{
					role: 'user',
					content: buildUserMessage(userCode, referenceFiles)
				}
			]
		})
	});

	if (!openRouterResponse.ok) {
		const errorBody = await openRouterResponse.json();
		throw new Error(`OpenRouter API error: ${JSON.stringify(errorBody)}`);
	}

	const rawData = await openRouterResponse.json();
	const parsed = openRouterResponseSchema.parse(rawData);

	const content = parsed.choices[0]?.message.content;

	if (!content) {
		throw new Error('No content returned from AI model');
	}

	const stripped = content
		.replace(/^```(?:json)?\s*/i, '')
		.replace(/\s*```$/, '')
		.trim();

	try {
		return evaluationResultSchema.parse(JSON.parse(stripped));
	} catch (error) {
		if (error instanceof ZodError) {
			throw new Error(`Invalid response shape from AI model: ${error.message}`);
		}
		throw new Error('Failed to parse AI model response');
	}
};
