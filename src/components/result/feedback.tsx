import { MessageSquareText } from 'lucide-react';

type FeedbackComponentProps = {
	feedback: string;
	strengths: string[];
	weaknesses: string[];
	suggestions: string[];
};

const FeedbackComponent = ({
	feedback,
	strengths,
	weaknesses,
	suggestions
}: FeedbackComponentProps) => (
	<section className="bg-background border-border w-full rounded-lg border p-6 shadow-md sm:w-3/4 lg:w-1/2">
		<h2 className="text-foreground mb-4 text-2xl">
			<MessageSquareText className="mr-2 inline-block" />
			Feedback
		</h2>
		<hr className="border-border mb-4" />
		<p className="text-foreground mb-4">
			{feedback || 'No feedback available yet.'}
		</p>
		{strengths.length > 0 && (
			<div className="mb-4">
				<p className="font-medium text-green-500 dark:text-green-400">Strengths</p>
				<ul className="mt-2 list-inside list-disc text-green-700 dark:text-green-200">
					{strengths.map((item, index) => (
						<li key={index}>{item}</li>
					))}
				</ul>
			</div>
		)}
		{weaknesses.length > 0 && (
			<div className="mb-4">
				<p className="font-medium text-red-500 dark:text-red-400">Weaknesses</p>
				<ul className="mt-2 list-inside list-disc text-red-700 dark:text-red-200">
					{weaknesses.map((item, index) => (
						<li key={index}>{item}</li>
					))}
				</ul>
			</div>
		)}
		{suggestions.length > 0 && (
			<div>
				<p className="font-medium text-blue-500 dark:text-blue-400">Suggestions</p>
				<ul className="mt-2 list-inside list-disc text-blue-700 dark:text-blue-200">
					{suggestions.map((item, index) => (
						<li key={index}>{item}</li>
					))}
				</ul>
			</div>
		)}
	</section>
);

export default FeedbackComponent;
