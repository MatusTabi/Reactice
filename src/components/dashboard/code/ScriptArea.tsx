'use client';

import {
	Sandpack,
	SandpackCodeEditor,
	SandpackLayout,
	SandpackProvider
} from '@codesandbox/sandpack-react';
import { dracula } from '@codesandbox/sandpack-themes';
import { Suspense } from 'react';

const ScriptArea = () => (
	<div className="h-screen w-full border">
		<Suspense>
			<SandpackProvider
				style={{ height: '100%' }}
				template="react-ts"
				files={{
					'/App.tsx': `export default function App() {
  return <h1 className="text-blue-500">Hi from Sandpack</h1>;
}`
				}}
				theme={dracula}
				options={{
					externalResources: ['https://cdn.tailwindcss.com']
				}}
			>
				<SandpackLayout className="flex h-full">
					<div className="h-full w-1/2">
						<SandpackCodeEditor className="h-full" />
					</div>
				</SandpackLayout>
			</SandpackProvider>
		</Suspense>
	</div>
);

export default ScriptArea;
