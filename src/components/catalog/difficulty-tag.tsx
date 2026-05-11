const DifficultyTag = ({ difficulty }: { difficulty: string }) => (
	<span className="rounded-md border border-[#3d494d] bg-[#262a31] px-2 py-1 text-sm text-white">
		{difficulty}
	</span>
);

export default DifficultyTag;
