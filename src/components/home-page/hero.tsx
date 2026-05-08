import { ArrowRight } from "lucide-react"
import { Button } from "../ui/button"

const Hero = () => {
    return (
        <>
            <h1 className="text-foreground mt-8 md:mt-12 max-w-4xl text-4xl leading-[1.1] font-black tracking-tight sm:text-6xl lg:text-7xl lg:leading-[0.9]">
                Master React components <br />
                <span className="text-primary tracking-tighter">
                    one pixel at a time.
                </span>
            </h1>

            <p className="text-muted-foreground mt-6 md:mt-8 max-w-2xl text-balance text-base leading-relaxed sm:text-xl">
                Rebuild real-world UI challenges in our live editor. Get instant AI
                feedback on your code and visual accuracy.
            </p>

            {/* TODO: Use links here in the future. */}
            <div className="mt-8 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
                <Button
                    size="lg"
                    className="group h-12 w-full sm:w-auto cursor-pointer gap-2 px-10 text-base font-bold shadow-2xl shadow-primary/20 transition-all active:scale-[0.98] dark:bg-primary/90"
                >
                    Start Coding
                    
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>

                <Button
                    size="lg"
                    variant="outline"
                    className="h-12 w-full sm:w-auto cursor-pointer px-10 text-base font-bold transition-all hover:bg-muted/50 active:scale-[0.98] border-foreground/10"
                >
                    Browse Gallery
                </Button>
            </div>
        </>
    )
}

export default Hero;

// End of hero.tsx