'use client';

import { useController } from 'react-hook-form';

import { Input } from '@/components/ui/input';

type FormInputProps = {
	label: string;
	name: string;
	placeholder?: string;
};

export const FormInput = ({ label, name, placeholder }: FormInputProps) => {
	const {
		field,
		fieldState: { error }
	} = useController({ name });

	return (
		<div className="flex flex-col gap-1">
			<label htmlFor={name} className="text-sm font-medium text-gray-700">
				{label}
			</label>
			<Input id={name} placeholder={placeholder} {...field} />
			{error?.message && (
				<p className="text-sm text-red-500">{error.message}</p>
			)}
		</div>
	);
};
