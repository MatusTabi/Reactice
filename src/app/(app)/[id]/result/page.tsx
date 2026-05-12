'use client';

import FeedbackComponent from '@/components/result/feedback';
import DonutScore from '@/components/result/score';
import FeedbackTitle from '@/components/result/title';
import { useEvaluationResult } from '@/modules/ai/context/evaluation-result-context';

const ResultPage = () => {
	const { result } = useEvaluationResult();
	const score = result?.score ?? 0;

	return (
		<main className="bg-surface flex h-[calc(100vh-69px)] w-full flex-col items-center justify-center gap-8">
			<DonutScore score={score} size={250} strokeWidth={16} />
			<FeedbackTitle score={score} />
			<FeedbackComponent
				feedback={result?.feedback ?? ''}
				strengths={result?.strengths ?? []}
				weaknesses={result?.weaknesses ?? []}
				suggestions={result?.suggestions ?? []}
			/>
		</main>
	);
};

export default ResultPage;
