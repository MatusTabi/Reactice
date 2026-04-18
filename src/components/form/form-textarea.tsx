'use client';

import { useController } from 'react-hook-form';

import { Textarea } from '@/components/ui/textarea';

type FormTextareaProps = {
	label: string;
	name: string;
	placeholder?: string;
};

export const FormTextarea = ({
	label,
	name,
	placeholder
}: FormTextareaProps) => {
	const {
		field,
		fieldState: { error }
	} = useController({ name });

	return (
		<div className="flex flex-col gap-1">
			<label htmlFor={name} className="text-sm font-medium text-gray-700">
				{label}
			</label>
			<Textarea id={name} placeholder={placeholder} rows={12} {...field} />
			{error?.message && (
				<p className="text-sm text-red-500">{error.message}</p>
			)}
		</div>
	);
};
