'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { FormTextarea } from '@/components/form/form-textarea';
import { SubmitButton } from '@/components/form/submit-button';

import { useEvaluateMutation } from './hooks';

// Local form schema: two plain textareas; we construct referenceFiles on submit.
const formSchema = z.object({
	referenceCode: z.string().min(1, 'Reference code is required'),
	userCode: z.string().min(1, 'Your code is required')
});

type FormValues = z.infer<typeof formSchema>;

export const EvaluateForm = () => {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: { referenceCode: '', userCode: '' }
	});

	const mutation = useEvaluateMutation();

	const onSubmit = ({ referenceCode, userCode }: FormValues) => {
		mutation.mutate(
			{
				userCode,
				referenceFiles: [{ name: 'App.tsx', content: referenceCode }]
			},
			{ onError: error => toast.error(error.message) }
		);
	};

	return (
		<div className="flex flex-col gap-6">
			<FormProvider {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-4"
				>
					<FormTextarea
						label="Reference component (target)"
						name="referenceCode"
						placeholder="Paste the reference / target React component here..."
					/>
					<FormTextarea
						label="Your component (submission)"
						name="userCode"
						placeholder="Paste your React component here..."
					/>
					<SubmitButton isLoading={mutation.isPending} label="Evaluate" />
				</form>
			</FormProvider>

			{mutation.data && (
				<div className="flex flex-col gap-4 rounded-md border border-gray-200 bg-gray-50 p-4 text-sm">
					<p className="font-medium">
						Score:{' '}
						<span className="font-bold">{mutation.data.score} / 100</span>
					</p>
					<p>{mutation.data.feedback}</p>
					{mutation.data.strengths.length > 0 && (
						<div>
							<p className="font-medium text-green-700">Strengths</p>
							<ul className="mt-1 list-inside list-disc text-green-800">
								{mutation.data.strengths.map((s, i) => (
									<li key={i}>{s}</li>
								))}
							</ul>
						</div>
					)}
					{mutation.data.weaknesses.length > 0 && (
						<div>
							<p className="font-medium text-red-700">Weaknesses</p>
							<ul className="mt-1 list-inside list-disc text-red-800">
								{mutation.data.weaknesses.map((w, i) => (
									<li key={i}>{w}</li>
								))}
							</ul>
						</div>
					)}
					{mutation.data.suggestions.length > 0 && (
						<div>
							<p className="font-medium text-blue-700">Suggestions</p>
							<ul className="mt-1 list-inside list-disc text-blue-800">
								{mutation.data.suggestions.map((s, i) => (
									<li key={i}>{s}</li>
								))}
							</ul>
						</div>
					)}
				</div>
			)}
		</div>
	);
};
