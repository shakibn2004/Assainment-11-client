import Link from "next/link";
import { ArrowRight, Search, Home } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-background dark:bg-[#050505] relative overflow-hidden">
      
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] opacity-40" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
        
        {/* Error Code */}
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-foreground/10 bg-foreground/5 dark:border-white/10 dark:bg-white/5 backdrop-blur-xl mb-8">
          <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
          <span className="text-xs uppercase tracking-[0.2em] font-medium text-foreground/80 dark:text-white/80">
            Error 404
          </span>
        </div>

        {/* Main Typography */}
        <h1 className="text-5xl sm:text-7xl font-medium leading-[1.1] tracking-[-0.04em] mb-6 text-foreground dark:text-white">
          Lost in the <br />
          <span className="italic font-serif text-foreground/50 dark:text-white/50">Unknown.</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-foreground/60 dark:text-white/60 mb-12 font-light leading-relaxed max-w-xl mx-auto">
          The page you're looking for has drifted off the map. It might have been moved, deleted, or never existed in the first place.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/" className={buttonVariants({ variant: "default", size: "lg", className: "h-14 px-8 rounded-full bg-foreground text-background hover:bg-foreground/90 dark:bg-white dark:text-black dark:hover:bg-white/90 text-base font-medium transition-transform hover:scale-105" })}>
            <Home className="w-4 h-4 mr-2" />
            Return Home
          </Link>
          
          <Link href="/explore" className={buttonVariants({ variant: "outline", size: "lg", className: "h-14 px-8 rounded-full border-foreground/20 text-foreground hover:bg-foreground/10 dark:border-white/20 dark:text-white dark:hover:bg-white/10 dark:hover:text-white glass text-base font-medium transition-transform hover:scale-105" })}>
            <Search className="w-4 h-4 mr-2" />
            Explore Projects
          </Link>
        </div>

      </div>
    </div>
  );
}
