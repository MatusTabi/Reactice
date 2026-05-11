import FeedbackComponent from '@/components/result/feedback';
import DonutScore from '@/components/result/score';
import FeedbackTitle from '@/components/result/title';

const ResultPage = () => {
	const score = 83;

	return (
		<main className="bg-surface flex h-[calc(100vh-69px)] w-full flex-col items-center justify-center gap-8">
			<DonutScore score={score} size={250} strokeWidth={16} />
			<FeedbackTitle score={score} />
			<FeedbackComponent />
		</main>
	);
};

export default ResultPage;
