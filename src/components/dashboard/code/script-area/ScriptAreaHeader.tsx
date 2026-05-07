import { PropsWithChildren } from 'react';

type ScriptAreaHeaderProps = PropsWithChildren & {
	title: string;
};

const ScriptAreaHeader = ({ children, title }: ScriptAreaHeaderProps) => (
	<header className="bg-surface-container-heighest border-outline flex h-10 w-full items-center justify-between border px-4 py-2">
		<h2 className="text-on-surface">{title}</h2>
		{children}
	</header>
);

export default ScriptAreaHeader;
