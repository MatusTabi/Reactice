'use client';

import {
	SandpackCodeEditor,
	SandpackConsole,
	SandpackLayout,
	SandpackPreview,
	SandpackProvider
} from '@codesandbox/sandpack-react';
import { dracula } from '@codesandbox/sandpack-themes';
import { Suspense, useEffect } from 'react';
import { useSandpack } from '@codesandbox/sandpack-react';
import ScriptAreaHeader from './ScriptAreaHeader';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { useEvaluateMutation } from '@/modules/ai/hooks/api';

const draculaThemeWithCustomBackground = {
	...dracula,
	colors: {
		...dracula.colors,
		surface1: '#10141a'
	}
};

const EVALUATION_DEBOUNCE_MS = 600;

const ScriptAreaContent = () => {
	const { sandpack } = useSandpack();
	const { mutate } = useEvaluateMutation();

	const activeFile = sandpack.activeFile;
	const activeCode = sandpack.files[activeFile]?.code ?? '';
	const debouncedCode = useDebouncedValue(activeCode, EVALUATION_DEBOUNCE_MS);

	useEffect(() => {
		if (!debouncedCode.trim()) {
			return;
		}

		mutate({ userCode: debouncedCode });
	}, [debouncedCode, mutate]);

	return (
		<div className="flex h-full min-h-0 w-full flex-row overflow-hidden">
			<div className="flex h-full min-h-0 w-1/2 flex-col overflow-hidden">
				<div className="flex min-h-0 flex-3 flex-col">
					<ScriptAreaHeader title="Code Editor" />
					<SandpackCodeEditor className="border-outline min-h-0 flex-1 overflow-auto border" />
				</div>
				<div className="flex min-h-0 flex-1 flex-col">
					<ScriptAreaHeader title="Console" />
					<SandpackConsole className="border-outline min-h-0 flex-1 overflow-auto border" />
				</div>
			</div>
			<div className="flex h-full min-h-0 w-1/2 flex-col overflow-hidden">
				<div className="flex min-h-0 flex-1 flex-col">
					<ScriptAreaHeader title="Live Preview" />
					<div className="min-h-0 flex-1">
						<SandpackPreview
							style={{ height: '100%', border: '1px solid #3d494d' }}
						/>
					</div>
				</div>
				{/* <div className="flex min-h-0 flex-1 flex-col">
					<ScriptAreaHeader title="Target Output" />
					<div className="flex h-full w-full items-center justify-center">
						<p className="text-white">Target component will be here...</p>
					</div>
				</div> */}
			</div>
		</div>
	);
};

const ScriptArea = () => (
	<div className="flex h-full min-h-0 w-full flex-1 flex-col border">
		<Suspense>
			<SandpackProvider
				style={{ height: '100%', border: '1px solid #3d494d' }}
				template="react-ts"
				files={{
					'/App.tsx': `export default function App() {
	return <main className="bg-[#262a31] h-screen w-screen">
		<h1 className="text-2xl font-bold text-white">
			Hello, Sandpack!
		</h1>
	</main>;
}`
				}}
				theme={draculaThemeWithCustomBackground}
				options={{
					externalResources: ['https://cdn.tailwindcss.com']
				}}
			>
				<ScriptAreaContent />
			</SandpackProvider>
		</Suspense>
	</div>
);

export default ScriptArea;
