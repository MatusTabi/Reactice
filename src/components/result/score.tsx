type DonutScoreProps = {
	score: number;
	size?: number;
	strokeWidth?: number;
};

const DonutScore = ({
	score,
	size = 140,
	strokeWidth = 12
}: DonutScoreProps) => {
	const radius = (size - strokeWidth) / 2;
	const circumference = radius * 2 * Math.PI;

	const progress = circumference - (score / 100) * circumference;

	return (
		<div className="relative flex items-center justify-center">
			<svg width={size} height={size} className="-rotate-90">
				<circle
					stroke="#27272a"
					fill="transparent"
					strokeWidth={strokeWidth}
					r={radius}
					cx={size / 2}
					cy={size / 2}
				/>

				<circle
					stroke="url(#gradient)"
					fill="transparent"
					strokeWidth={strokeWidth}
					strokeLinecap="round"
					strokeDasharray={circumference}
					strokeDashoffset={progress}
					r={radius}
					cx={size / 2}
					cy={size / 2}
					className="transition-all duration-700 ease-out"
				/>

				<defs>
					<linearGradient id="gradient">
						<stop offset="0%" stopColor="#22c55e" />
						<stop offset="100%" stopColor="#3b82f6" />
					</linearGradient>
				</defs>
			</svg>

			<div className="absolute flex flex-col items-center">
				<span className="text-foreground text-6xl font-bold">{score}</span>
				<span className="text-muted-foreground text-xl">/ 100</span>
			</div>
		</div>
	);
};

export default DonutScore;
