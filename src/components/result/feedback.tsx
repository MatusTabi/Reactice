import { MessageSquareText } from 'lucide-react';

const FeedbackComponent = () => (
	<section className="bg-surface border-outline w-1/2 rounded-lg border p-6 shadow-md">
		<h2 className="mb-4 text-2xl text-white">
			<MessageSquareText className="mr-2 inline-block" />
			Feedback
		</h2>
		<hr className="mb-4 border-[#3d494d]" />
		<p className="mb-4 text-white">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
			tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
			veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
			commodo consequat.
		</p>
	</section>
);

export default FeedbackComponent;
