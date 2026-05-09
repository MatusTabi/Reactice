type PillsProps = {
	previewTab: 'live' | 'target';
	setPreviewTab: (tab: 'live' | 'target') => void;
};

const Pills = ({ previewTab, setPreviewTab }: PillsProps) => (
	<div className="border-outline bg-surface-container-heighest flex items-center gap-1 rounded-full border p-1">
		<button
			type="button"
			onClick={() => setPreviewTab('live')}
			className={`rounded-full px-3 py-1 text-xs font-medium transition ${
				previewTab === 'live'
					? 'bg-white text-black'
					: 'text-on-surface hover:text-white'
			}`}
		>
			Live Preview
		</button>
		<button
			type="button"
			onClick={() => setPreviewTab('target')}
			className={`rounded-full px-3 py-1 text-xs font-medium transition ${
				previewTab === 'target'
					? 'bg-white text-black'
					: 'text-on-surface hover:text-white'
			}`}
		>
			Target Output
		</button>
	</div>
);

export default Pills;
