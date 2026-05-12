const DifficultyTag = ({ difficulty }: { difficulty: string }) => (
	<span className="bg-secondary text-secondary-foreground rounded-md border border-[#3d494d] px-2 py-1 text-sm">
		{difficulty}
	</span>
);

export default DifficultyTag;
