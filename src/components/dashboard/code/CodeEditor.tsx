import CodeEditorHeader from './CodeEditorHeader';
import ScriptArea from './ScriptArea';

const CodeEditor = () => (
	<div className="flex h-full w-full flex-col">
		<CodeEditorHeader />
		<ScriptArea />
	</div>
);

export default CodeEditor;
