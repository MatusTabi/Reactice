type FeedbackTitleProps = {
	score: number;
};

const FeedbackTitle = ({ score }: FeedbackTitleProps) => (
	<h1 className="text-foreground text-3xl font-bold">
		{score >= 80
			? 'Excellent work!'
			: score >= 60
				? 'Good job!'
				: 'Needs improvement'}
	</h1>
);

export default FeedbackTitle;
