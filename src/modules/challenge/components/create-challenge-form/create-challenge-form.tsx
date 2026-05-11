'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { uploadChallengeImageAction } from '@/modules/challenge/actions';

import { useCreateChallengeMutation } from './hooks';

const CATEGORIES = ['Buttons', 'Cards', 'Forms', 'Navigation', 'UI'] as const;
const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2 MB

const formSchema = z.object({
	title: z.string().min(1, 'Title is required').max(100),
	description: z.string().min(1, 'Description is required').max(1000),
	difficulty: z.enum(['easy', 'medium', 'hard']),
	category: z.string().min(1, 'Category is required').max(50),
	// Reference code becomes files: [{ name: '/App.tsx', content }]
	referenceCode: z.string().min(1, 'Reference code is required')
});

type FormValues = z.infer<typeof formSchema>;

export const CreateChallengeForm = () => {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			description: '',
			difficulty: 'easy',
			category: 'UI',
			referenceCode: ''
		}
	});

	const mutation = useCreateChallengeMutation();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [imageError, setImageError] = useState<string | null>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] ?? null;
		setImageError(null);

		if (!file) {
			setImageFile(null);
			setImagePreview(null);
			return;
		}

		if (file.size > MAX_IMAGE_SIZE) {
			setImageError('Image must be under 2 MB');
			setImageFile(null);
			setImagePreview(null);
			e.target.value = '';
			return;
		}

		setImageFile(file);
		setImagePreview(URL.createObjectURL(file));
	};

	const onSubmit = async (values: FormValues) => {
		let referenceImageUrl: string | null = null;

		if (imageFile) {
			try {
				const formData = new FormData();
				formData.append('file', imageFile);
				referenceImageUrl = await uploadChallengeImageAction(formData);
			} catch (err) {
				toast.error(err instanceof Error ? err.message : 'Image upload failed');
				return;
			}
		}

		mutation.mutate(
			{
				title: values.title,
				description: values.description,
				difficulty: values.difficulty,
				category: values.category,
				referenceImageUrl,
				files: [{ name: '/App.tsx', content: values.referenceCode }]
			},
			{
				onSuccess: () => {
					toast.success('Challenge created');
					form.reset();
					setImageFile(null);
					setImagePreview(null);
					if (fileInputRef.current) fileInputRef.current.value = '';
				},
				onError: err => toast.error(err.message)
			}
		);
	};

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = form;

	return (
		<FormProvider {...form}>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
				{/* Title */}
				<div className="flex flex-col gap-1">
					<label htmlFor="title" className="text-sm font-medium">
						Title
					</label>
					<input
						id="title"
						{...register('title')}
						className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
						placeholder="e.g. Profile Card"
					/>
					{errors.title && (
						<p className="text-sm text-red-500">{errors.title.message}</p>
					)}
				</div>

				{/* Description */}
				<div className="flex flex-col gap-1">
					<label htmlFor="description" className="text-sm font-medium">
						Description
					</label>
					<textarea
						id="description"
						{...register('description')}
						rows={3}
						className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
						placeholder="What should the user build?"
					/>
					{errors.description && (
						<p className="text-sm text-red-500">{errors.description.message}</p>
					)}
				</div>

				{/* Difficulty + Category */}
				<div className="flex gap-4">
					<div className="flex flex-1 flex-col gap-1">
						<label htmlFor="difficulty" className="text-sm font-medium">
							Difficulty
						</label>
						<select
							id="difficulty"
							{...register('difficulty')}
							className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
						>
							<option value="easy">Easy</option>
							<option value="medium">Medium</option>
							<option value="hard">Hard</option>
						</select>
					</div>
					<div className="flex flex-1 flex-col gap-1">
						<label htmlFor="category" className="text-sm font-medium">
							Category
						</label>
						<select
							id="category"
							{...register('category')}
							className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
						>
							{CATEGORIES.map(c => (
								<option key={c} value={c}>
									{c}
								</option>
							))}
						</select>
						{errors.category && (
							<p className="text-sm text-red-500">{errors.category.message}</p>
						)}
					</div>
				</div>

				{/* Reference code */}
				<div className="flex flex-col gap-1">
					<label htmlFor="referenceCode" className="text-sm font-medium">
						Reference code <span className="text-gray-400">(/App.tsx)</span>
					</label>
					<textarea
						id="referenceCode"
						{...register('referenceCode')}
						rows={12}
						className="rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
						placeholder="Paste the reference React component here..."
					/>
					{errors.referenceCode && (
						<p className="text-sm text-red-500">
							{errors.referenceCode.message}
						</p>
					)}
				</div>

				{/* Preview image */}
				<div className="flex flex-col gap-1">
					<label htmlFor="imageFile" className="text-sm font-medium">
						Preview image{' '}
						<span className="text-gray-400">(optional, max 2 MB)</span>
					</label>
					<input
						id="imageFile"
						ref={fileInputRef}
						type="file"
						accept="image/png,image/jpeg,image/webp"
						onChange={handleFileChange}
						className="text-sm"
					/>
					{imageError && <p className="text-sm text-red-500">{imageError}</p>}
					{imagePreview && (
						// eslint-disable-next-line @next/next/no-img-element
						<img
							src={imagePreview}
							alt="Preview"
							className="mt-2 h-40 w-auto rounded-md border object-contain"
						/>
					)}
				</div>

				<Button
					type="submit"
					disabled={mutation.isPending}
					className="self-start"
				>
					{mutation.isPending ? 'Creating...' : 'Create Challenge'}
				</Button>
			</form>
		</FormProvider>
	);
};
