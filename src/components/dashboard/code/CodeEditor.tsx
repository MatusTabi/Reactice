import { ChallengeDetailType } from '@/backend/challenge/schema';
import ScriptArea from './script-area/ScriptArea';

type CodeEditorProps = {
	challenge: ChallengeDetailType | null;
};

const CodeEditor = ({ challenge }: CodeEditorProps) => (
	<div className="flex h-full min-h-0 w-full flex-col">
		<ScriptArea challenge={challenge} />
	</div>
);

export default CodeEditor;
