import { EvaluateForm } from '@/modules/ai/components/evaluate-form';

const EvaluatePage = () => (
	<main className="mx-auto flex w-full max-w-4xl flex-col gap-6 p-6">
		<h1 className="text-2xl font-semibold">AI Evaluation Test</h1>
		<EvaluateForm />
	</main>
);

export default EvaluatePage;
