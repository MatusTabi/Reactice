'use client';

import {
	SandpackCodeEditor,
	SandpackConsole,
	SandpackPreview,
	SandpackProvider,
	useSandpack
} from '@codesandbox/sandpack-react';
import { Suspense, useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import Pills from '@/components/ui/pills';
import {
	type ChallengeDetailType,
	type ChallengeFileType
} from '@/backend/challenge/schema';
import { useSubmitMutation } from '@/modules/ai/hooks/api';
import { useEvaluationResult } from '@/modules/ai/context/evaluation-result-context';

import ScriptAreaHeader from './ScriptAreaHeader';

type ScriptAreaContentProps = {
	challengeId?: string;
	referenceUrl?: string | null;
	referenceFiles: ChallengeFileType[];
};

const ScriptAreaContent = ({
	challengeId,
	referenceUrl,
	referenceFiles
}: ScriptAreaContentProps) => {
	const { sandpack } = useSandpack();
	const [previewTab, setPreviewTab] = useState<'live' | 'target'>('live');
	const [mobilePanel, setMobilePanel] = useState<'code' | 'preview'>('code');
	const { mutate, isPending } = useSubmitMutation();
	const router = useRouter();
	const { setResult } = useEvaluationResult();

	const activeFile = sandpack.activeFile;
	const activeCode = sandpack.files[activeFile]?.code ?? '';
	const canSubmit = referenceFiles.length > 0 && activeCode.trim().length > 0;

	useEffect(() => {
		if (!isPending) return;

		const handleBeforeUnload = (e: BeforeUnloadEvent) => {
			e.preventDefault();
		};

		window.addEventListener('beforeunload', handleBeforeUnload);
		return () => window.removeEventListener('beforeunload', handleBeforeUnload);
	}, [isPending]);

	const handleSubmit = () => {
		if (!canSubmit || isPending) {
			return;
		}

		mutate(
			{
				challengeId: challengeId ?? '',
				submittedCode: activeCode
			},
			{
				onSuccess: data => {
					setResult(data.evaluation);
					router.push(`${challengeId}/result`);
				},
				onError: () => {
					router.push(`${challengeId}/result/error`);
				}
			}
		);
	};

	return (
		<div className="relative flex h-full min-h-0 w-full flex-col overflow-hidden md:flex-row">
			{isPending && (
				<div className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/60 backdrop-blur-sm">
					<div className="relative flex items-center justify-center">
						<div className="border-primary/30 h-16 w-16 rounded-full border-4" />
						<div className="border-primary absolute h-16 w-16 animate-spin rounded-full border-4 border-t-transparent" />
						<div className="bg-primary absolute h-3 w-3 animate-pulse rounded-full" />
					</div>
					<p className="text-sm font-medium text-white">
						Evaluating your submission…
					</p>
					<p className="text-xs text-white/60">
						Please wait, do not navigate away
					</p>
				</div>
			)}

			{/* Mobile tab switcher */}
			<div className="bg-muted border-accent flex shrink-0 border-b md:hidden">
				<button
					type="button"
					onClick={() => setMobilePanel('code')}
					className={`flex-1 py-2 text-xs font-medium transition ${
						mobilePanel === 'code'
							? 'bg-background text-foreground'
							: 'text-muted-foreground hover:text-foreground'
					}`}
				>
					Code
				</button>
				<button
					type="button"
					onClick={() => setMobilePanel('preview')}
					className={`flex-1 py-2 text-xs font-medium transition ${
						mobilePanel === 'preview'
							? 'bg-background text-foreground'
							: 'text-muted-foreground hover:text-foreground'
					}`}
				>
					Preview
				</button>
			</div>

			<div
				className={`flex min-h-0 flex-col overflow-hidden md:flex md:w-1/2 ${
					mobilePanel === 'code' ? 'flex h-full w-full' : 'hidden'
				}`}
			>
				<div className="flex min-h-0 flex-3 flex-col">
					<ScriptAreaHeader title="Code Editor">
						<Button
							className="bg-primary text-primary-foreground cursor-pointer"
							disabled={!canSubmit || isPending}
							onClick={handleSubmit}
						>
							Submit{' '}
							{isPending && (
								<div role="status">
									<svg
										aria-hidden="true"
										className="text-neutral-tertiary fill-brand h-8 w-8 animate-spin"
										viewBox="0 0 100 101"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
											fill="currentColor"
										/>
										<path
											d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
											fill="currentFill"
										/>
									</svg>
								</div>
							)}
						</Button>
					</ScriptAreaHeader>
					<SandpackCodeEditor
						showLineNumbers
						showInlineErrors
						wrapContent
						className="border-accent min-h-0 flex-1 overflow-auto border"
						style={{ fontFamily: 'var(--font-mono)' }}
					/>
				</div>
				<div className="flex min-h-0 flex-1 flex-col">
					<ScriptAreaHeader title="Console" />
					<SandpackConsole className="border-accent min-h-0 flex-1 overflow-auto border" />
				</div>
			</div>
			<div
				className={`flex min-h-0 flex-col overflow-hidden md:flex md:w-1/2 ${
					mobilePanel === 'preview' ? 'flex h-full w-full' : 'hidden'
				}`}
			>
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
								style={{ height: '100%', border: '1px solid var(--border)' }}
							/>
						</div>
						<div
							className={`absolute inset-0 flex items-center justify-center ${
								previewTab === 'target'
									? 'opacity-100'
									: 'pointer-events-none opacity-0'
							}`}
						>
							<Image
								src={referenceUrl ?? '/placeholder.png'}
								alt="Target output"
								fill
								className="object-contain object-top"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

type ScriptAreaProps = {
	challenge: ChallengeDetailType | null;
};

const ScriptArea = ({ challenge }: ScriptAreaProps) => {
	const { theme } = useTheme();

	return (
		<div className="flex h-full min-h-0 w-full flex-1 flex-col border">
			<Suspense>
				<SandpackProvider
					style={{ height: '100%', border: '1px solid var(--border)' }}
					template="react-ts"
					files={{
						'/App.tsx': `export default function App() {
	return (
		<h1>Hello, Reactice!</h1>
	);
}`
					}}
					theme={
						theme === 'dark'
							? {
									colors: {
										surface1: '#10141a'
									},
									font: {
										body: 'var(--font-sans)'
									}
								}
							: {
									font: {
										body: 'var(--font-sans)'
									}
								}
					}
					options={{
						externalResources: ['https://cdn.tailwindcss.com']
					}}
				>
					<ScriptAreaContent
						challengeId={challenge?.id}
						referenceUrl={challenge?.referenceImageUrl}
						referenceFiles={challenge?.files ?? []}
					/>
				</SandpackProvider>
			</Suspense>
		</div>
	);
};

export default ScriptArea;
