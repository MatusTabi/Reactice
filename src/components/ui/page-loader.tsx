const PageLoader = () => (
	<div className="fixed inset-0 flex items-center justify-center">
		<div className="relative flex items-center justify-center">
			<div className="border-primary/30 h-16 w-16 rounded-full border-4" />
			<div className="border-primary absolute h-16 w-16 animate-spin rounded-full border-4 border-t-transparent" />
			<div className="bg-primary absolute h-3 w-3 animate-pulse rounded-full" />
		</div>
	</div>
);

export default PageLoader;
