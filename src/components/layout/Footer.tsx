import { Rocket, MessageCircle, Globe, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background relative overflow-hidden">
      {/* Decorative gradient orb */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[800px] h-[300px] bg-primary/20 blur-[120px] rounded-[100%] pointer-events-none" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4 col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-8 h-8 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-full opacity-30 group-hover:opacity-70 blur-md transition-opacity duration-500 animate-pulse"></div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="relative z-10 drop-shadow-md">
                  <defs>
                    <linearGradient id="sparklift-grad-footer" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#10B981" />
                    </linearGradient>
                  </defs>
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#sparklift-grad-footer)" />
                </svg>
              </div>
              <span className="text-xl font-sans tracking-tight flex items-center">
                <span className="font-medium text-foreground">Spark</span>
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Lift</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              The premium platform for creators and visionaries to bring their boldest ideas to life.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><MessageCircle size={20} /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Globe size={20} /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><LinkIcon size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Platform</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/explore" className="hover:text-primary transition-colors">Explore Projects</Link></li>
              <li><Link href="/campaigns" className="hover:text-primary transition-colors">Start a Campaign</Link></li>
              <li><Link href="/success" className="hover:text-primary transition-colors">Success Stories</Link></li>
              <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Resources</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link href="/creator-guide" className="hover:text-primary transition-colors">Creator Guide</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/guidelines" className="hover:text-primary transition-colors">Community Guidelines</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} SparkLift. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span>Made with precision</span>
            <span className="w-1 h-1 rounded-full bg-primary/50 self-center"></span>
            <span>Premium Quality</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
