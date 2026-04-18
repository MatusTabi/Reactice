import { type z } from 'zod';

import { evaluateRequestSchema } from '@/modules/ai/schema';

export const evaluateFormSchema = evaluateRequestSchema;

export type EvaluateFormValues = z.infer<typeof evaluateFormSchema>;
