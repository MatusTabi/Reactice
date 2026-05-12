'use client';

import {
	createContext,
	useContext,
	useMemo,
	useState,
	type PropsWithChildren
} from 'react';

import { type EvaluationResult } from '@/modules/ai/schema';

type EvaluationResultState = {
	result: EvaluationResult | null;
	setResult: (result: EvaluationResult | null) => void;
};

const EvaluationResultContext = createContext<EvaluationResultState | null>(
	null
);

export const EvaluationResultProvider = ({ children }: PropsWithChildren) => {
	const [result, setResult] = useState<EvaluationResult | null>(null);
	const value = useMemo(() => ({ result, setResult }), [result]);

	return (
		<EvaluationResultContext.Provider value={value}>
			{children}
		</EvaluationResultContext.Provider>
	);
};

export const useEvaluationResult = () => {
	const context = useContext(EvaluationResultContext);

	if (!context) {
		throw new Error(
			'useEvaluationResult must be used within EvaluationResultProvider'
		);
	}

	return context;
};
