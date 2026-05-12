type PillsProps = {
	previewTab: 'live' | 'target';
	setPreviewTab: (tab: 'live' | 'target') => void;
};

const Pills = ({ previewTab, setPreviewTab }: PillsProps) => (
	<div className="bg-muted flex items-center gap-1 rounded-full p-1">
		<button
			type="button"
			onClick={() => setPreviewTab('live')}
			className={`rounded-full px-3 py-1 text-xs font-medium transition ${
				previewTab === 'live'
					? 'bg-background text-foreground shadow-sm'
					: 'text-muted-foreground hover:text-foreground'
			}`}
		>
			Live Preview
		</button>
		<button
			type="button"
			onClick={() => setPreviewTab('target')}
			className={`rounded-full px-3 py-1 text-xs font-medium transition ${
				previewTab === 'target'
					? 'bg-background text-foreground shadow-sm'
					: 'text-muted-foreground hover:text-foreground'
			}`}
		>
			Target Output
		</button>
	</div>
);

export default Pills;
