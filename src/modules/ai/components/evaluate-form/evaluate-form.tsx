'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { FormTextarea } from '@/components/form/form-textarea';
import { SubmitButton } from '@/components/form/submit-button';
import { type EvaluateRequest } from '@/modules/ai/schema';

import { useEvaluateMutation } from './hooks';
import { evaluateFormSchema } from './schema';

export const EvaluateForm = () => {
	const form = useForm<EvaluateRequest>({
		resolver: zodResolver(evaluateFormSchema),
		defaultValues: {
			userCode: ''
		}
	});

	const mutation = useEvaluateMutation();

	const onSubmit = (data: EvaluateRequest) => {
		mutation.mutate(data, {
			onError: error => {
				toast.error(error.message);
			}
		});
	};

	return (
		<div className="flex flex-col gap-6">
			<FormProvider {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-4"
				>
					<FormTextarea
						label="React component code"
						name="userCode"
						placeholder="Paste your React component here..."
					/>
					<SubmitButton isLoading={mutation.isPending} label="Evaluate" />
				</form>
			</FormProvider>

			{mutation.data && (
				<div className="flex flex-col gap-2 rounded-md border border-gray-200 bg-gray-50 p-4">
					<p className="text-sm font-medium text-gray-700">
						Score: <span className="font-bold text-gray-900">{mutation.data.score} / 100</span>
					</p>
					<p className="text-sm text-gray-700">
						Feedback: <span className="text-gray-900">{mutation.data.feedback}</span>
					</p>
				</div>
			)}
		</div>
	);
};
