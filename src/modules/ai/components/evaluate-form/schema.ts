import { evaluateRequestSchema } from '@/modules/ai/schema';

export const evaluateFormSchema = evaluateRequestSchema;

export type EvaluateFormValues = {
	userCode: string;
};
