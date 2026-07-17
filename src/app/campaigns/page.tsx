"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function StartCampaignPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending) {
      const role = (session?.user as any)?.role?.toLowerCase();
      if (role !== "admin" && role !== "creator") {
        router.push("/");
      }
    }
  }, [session, isPending, router]);

  if (isPending) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen pt-24 pb-12 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          <div className="flex-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-accent/30 text-accent mb-2"
            >
              <span className="text-sm font-medium tracking-wide">For Creators</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight"
            >
              Bring your creative project to <span className="text-gradient-primary">life.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground"
            >
              SparkLift is where the world's most innovative products are born. Launch your campaign with the most powerful tools in the industry.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4 pt-4"
            >
              <Button size="lg" className="h-14 px-8 text-lg rounded-xl shadow-[0_0_30px_rgba(var(--primary),0.3)] hover:shadow-[0_0_50px_rgba(var(--primary),0.5)]">
                <Link href="/campaigns/create" className="flex items-center gap-2">
                  Start Your Campaign <ArrowRight size={18} />
                </Link>
              </Button>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1 w-full"
          >
            <div className="glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl relative">
              <div className="absolute -left-6 -top-6 w-24 h-24 bg-primary/30 rounded-full blur-2xl" />
              <div className="space-y-6">
                <h3 className="text-2xl font-bold mb-6">Why creators choose us</h3>
                {[
                  "Highest conversion rate in the industry",
                  "Dedicated success manager for featured projects",
                  "Built-in post-campaign fulfillment tools",
                  "0% platform fees on your first $10k raised",
                  "Global payment processing in 135+ currencies"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                    <p className="text-lg text-foreground/90">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
