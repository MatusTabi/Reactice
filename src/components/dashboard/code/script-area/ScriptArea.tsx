'use client';

import {
	SandpackCodeEditor,
	SandpackConsole,
	SandpackPreview,
	SandpackProvider,
	useSandpack
} from '@codesandbox/sandpack-react';
import { Suspense, useEffect, useState } from 'react';
import ScriptAreaHeader from './ScriptAreaHeader';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { Button } from '@/components/ui/button';
import Pills from '@/components/ui/pills';
import { useTheme } from 'next-themes';

const EVALUATION_DEBOUNCE_MS = 600;

const ScriptAreaContent = () => {
	const { sandpack } = useSandpack();
	const [previewTab, setPreviewTab] = useState<'live' | 'target'>('live');

	const activeFile = sandpack.activeFile;
	const activeCode = sandpack.files[activeFile]?.code ?? '';
	const debouncedCode = useDebouncedValue(activeCode, EVALUATION_DEBOUNCE_MS);

	useEffect(() => {
		if (!debouncedCode.trim()) {
			return;
		}
	}, [debouncedCode]);

	return (
		<div className="flex h-full min-h-0 w-full flex-row overflow-hidden">
			<div className="flex h-full min-h-0 w-1/2 flex-col overflow-hidden">
				<div className="flex min-h-0 flex-3 flex-col">
					<ScriptAreaHeader title="Code Editor">
						<Button className="bg-primary text-primary-foreground">
							Submit
						</Button>
					</ScriptAreaHeader>
					<SandpackCodeEditor className="border-outline min-h-0 flex-1 overflow-auto border" />
				</div>
				<div className="flex min-h-0 flex-1 flex-col">
					<ScriptAreaHeader title="Console" />
					<SandpackConsole className="border-outline min-h-0 flex-1 overflow-auto border" />
				</div>
			</div>
			<div className="flex h-full min-h-0 w-1/2 flex-col overflow-hidden">
				<div className="flex min-h-0 flex-1 flex-col">
					<ScriptAreaHeader title="Live Preview">
						<Pills previewTab={previewTab} setPreviewTab={setPreviewTab} />
					</ScriptAreaHeader>
					<div className="relative min-h-0 flex-1">
						<div
							className={`absolute inset-0 ${
								previewTab === 'live'
									? 'opacity-100'
									: 'pointer-events-none opacity-0'
							}`}
						>
							<SandpackPreview
								style={{ height: '100%', border: '1px solid #3d494d' }}
							/>
						</div>
						<div
							className={`absolute inset-0 flex items-center justify-center ${
								previewTab === 'target'
									? 'opacity-100'
									: 'pointer-events-none opacity-0'
							}`}
						>
							<p className="text-white">Target component will be here...</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const ScriptArea = () => {
	const { theme } = useTheme();

	return (
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
					theme={theme === 'dark' ? 'dark' : 'light'}
					options={{
						externalResources: ['https://cdn.tailwindcss.com']
					}}
				>
					<ScriptAreaContent />
				</SandpackProvider>
			</Suspense>
		</div>
	);
};

export default ScriptArea;
