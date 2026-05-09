import Stats from '@/components/home-page/stats';
import Badges from '@/components/home-page/badges';
import Hero from '@/components/home-page/hero';

const HomePage = () => (
	<section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-x-hidden py-8 md:py-24">
		<div className="relative z-10 flex max-w-5xl flex-col items-center px-6 text-center">
			<Badges />
			<Hero />
			<Stats />
		</div>
	</section>
);

export default HomePage;
