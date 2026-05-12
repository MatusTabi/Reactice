'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/form/form-input';
import { FormTextarea } from '@/components/form/form-textarea';
import { uploadChallengeImageAction } from '@/modules/challenge/actions';

import { useCreateChallengeMutation } from './hooks';

const CATEGORIES = ['Buttons', 'Cards', 'Forms', 'Navigation', 'UI'] as const;
const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2 MB

const selectClasses =
	'h-8 w-full min-w-0 rounded-lg border border-input bg-background px-2.5 py-1 text-sm focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50';

const formSchema = z.object({
	title: z.string().min(1, 'Title is required').max(100),
	description: z.string().min(1, 'Description is required').max(1000),
	difficulty: z.enum(['easy', 'medium', 'hard']),
	category: z.string().min(1, 'Category is required').max(50),
	referenceCode: z.string().min(1, 'Reference code is required')
});

type FormValues = z.infer<typeof formSchema>;

export const CreateChallengeForm = () => {
	const router = useRouter();

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
					router.push('/challenges');
				},
				onError: err => toast.error(err.message)
			}
		);
	};

	const { register, formState: { errors } } = form;

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
				{/* Title */}
				<FormInput name="title" label="Title" placeholder="e.g. Profile Card" />

				{/* Description */}
				<div className="flex flex-col gap-1">
					<label
						htmlFor="description"
						className="text-sm font-medium text-gray-700"
					>
						Description
					</label>
					<textarea
						id="description"
						{...register('description')}
						rows={3}
						placeholder="What should the user build?"
						className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 w-full rounded-lg border bg-transparent px-2.5 py-2 text-base focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
					/>
					{errors.description && (
						<p className="text-sm text-red-500">{errors.description.message}</p>
					)}
				</div>

				{/* Difficulty + Category */}
				<div className="flex gap-4">
					<div className="flex flex-1 flex-col gap-1">
						<label
							htmlFor="difficulty"
							className="text-sm font-medium text-gray-700"
						>
							Difficulty
						</label>
						<select
							id="difficulty"
							{...register('difficulty')}
							className={selectClasses}
						>
							<option value="easy">Easy</option>
							<option value="medium">Medium</option>
							<option value="hard">Hard</option>
						</select>
					</div>
					<div className="flex flex-1 flex-col gap-1">
						<label
							htmlFor="category"
							className="text-sm font-medium text-gray-700"
						>
							Category
						</label>
						<select
							id="category"
							{...register('category')}
							className={selectClasses}
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
				<FormTextarea
					name="referenceCode"
					label="Reference code (/App.tsx)"
					placeholder="Paste the reference React component here..."
				/>

				{/* Preview image */}
				<div className="flex flex-col gap-1">
					<label
						htmlFor="imageFile"
						className="text-sm font-medium text-gray-700"
					>
						Preview image (optional, max 2 MB)
					</label>
					<input
						id="imageFile"
						ref={fileInputRef}
						type="file"
						accept="image/png,image/jpeg,image/webp"
						onChange={handleFileChange}
						className="text-foreground file:border-input file:bg-secondary file:text-secondary-foreground text-sm file:mr-3 file:rounded-md file:border file:px-2.5 file:py-1 file:text-xs"
					/>
					{imageError && (
						<p className="text-sm text-red-500">{imageError}</p>
					)}
					{imagePreview && (
						// eslint-disable-next-line @next/next/no-img-element
						<img
							src={imagePreview}
							alt="Preview"
							className="border-border mt-2 h-40 w-auto rounded-lg border object-contain"
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
