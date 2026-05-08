const getChallengeCount = async () => {
    // TODO: Change this for actual db call.
    return 150;
};

const Stats = async () => {
    const count = await getChallengeCount();

    const stats = [
        { value: `${count}+`, label: 'Challenges' },
        { value: 'AI', label: 'Scoring' },
        { value: 'LIVE', label: 'Leaderboard' }
    ] as const;

    return (
        <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 border-t border-foreground/10 pt-8 mt-8 md:mt-24">
            {stats.map(stat => (
                <div key={stat.label} className="flex flex-col items-center gap-1">
                    <span className="text-foreground text-2xl font-bold tracking-tighter">
                        {stat.value}
                    </span>

                    <span className="text-muted-foreground text-[10px] font-black tracking-[0.2em] uppercase">
                        {stat.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default Stats;

// End of stats.tsx