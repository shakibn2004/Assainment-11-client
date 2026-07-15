"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { TrendingUp, ShieldCheck, Play, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MOCK_CAMPAIGNS } from "@/services/mock/data";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="flex flex-col min-h-screen bg-background dark:bg-[#050505] selection:bg-primary/30">
      
      {/* NOISE TEXTURE OVERLAY */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* ULTRA LUXURY HERO SECTION */}
      <section className="relative min-h-[95vh] flex items-center pt-20 overflow-hidden">
        {/* Deep Atmospheric Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 dark:bg-primary/10 rounded-full blur-[120px] opacity-60 animate-pulse-slow" />
          <div className="absolute bottom-0 left-[-20%] w-[600px] h-[600px] bg-accent/20 dark:bg-accent/10 rounded-full blur-[150px] opacity-40" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Typography */}
            <motion.div 
              style={{ y: y1 }}
              className="lg:col-span-7 pt-12 lg:pt-0"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-foreground/10 bg-foreground/5 dark:border-white/10 dark:bg-white/5 backdrop-blur-xl mb-8"
              >
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs uppercase tracking-[0.2em] font-medium text-foreground/80 dark:text-white/80">Redefining Creation</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-6xl sm:text-7xl lg:text-[7.5rem] font-medium leading-[0.9] tracking-[-0.04em] mb-8 text-foreground dark:text-white"
              >
                Fund the<br/>
                <span className="italic font-serif text-foreground/50 dark:text-white/50">Extraordinary.</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg sm:text-xl text-foreground/60 dark:text-white/60 max-w-xl mb-12 font-light leading-relaxed"
              >
                An exclusive platform where visionary creators meet discerning backers. Discover curated hardware, art, and design.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row gap-5"
              >
                <Button size="lg" className="h-16 px-10 rounded-full bg-foreground text-background hover:bg-foreground/90 dark:bg-white dark:text-black dark:hover:bg-white/90 text-lg font-medium transition-transform hover:scale-105 active:scale-95">
                  <Link href="/explore">Explore Collection</Link>
                </Button>
                <Button size="lg" variant="outline" className="h-16 px-8 rounded-full border-foreground/20 text-foreground hover:bg-foreground/10 dark:border-white/20 dark:text-white dark:hover:bg-white/10 dark:hover:text-white glass text-lg font-medium">
                  <Link href="/campaigns/create" className="flex items-center gap-2">
                    <Play className="w-4 h-4" /> View Showcase
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Asymmetrical Composition */}
            <motion.div 
              style={{ y: y2 }}
              className="lg:col-span-5 relative h-[600px] hidden lg:block"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: -2 }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-10 right-0 w-[300px] h-[400px] rounded-[2rem] overflow-hidden border border-border dark:border-white/10 shadow-2xl z-20"
              >
                <img src={MOCK_CAMPAIGNS[0]?.coverImage} className="w-full h-full object-cover scale-110" alt="Featured 1" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-bold text-lg leading-tight mb-1">{MOCK_CAMPAIGNS[0]?.title}</p>
                  <p className="text-primary font-medium text-sm">Funded in 4 hours</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                animate={{ opacity: 1, scale: 1, rotate: 4 }}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-0 left-0 w-[280px] h-[350px] rounded-[2rem] overflow-hidden border border-border dark:border-white/10 shadow-2xl z-10 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 hover:z-30 transition-all duration-700"
              >
                <img src={MOCK_CAMPAIGNS[1]?.coverImage} className="w-full h-full object-cover scale-110" alt="Featured 2" />
              </motion.div>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* CURATED COLLECTION (Bento Layout) */}
      <section className="py-32 relative z-20 bg-background dark:bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 text-foreground dark:text-white">The Curated Collection.</h2>
              <p className="text-foreground/50 dark:text-white/50 text-lg font-light max-w-md">Exceptionally crafted projects pushing the boundaries of design and engineering.</p>
            </div>
            <Link href="/explore" className="group flex items-center gap-2 text-foreground/70 hover:text-foreground dark:text-white/70 dark:hover:text-white transition-colors uppercase tracking-widest text-xs font-semibold">
              View Entire Gallery <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>

          {/* Asymmetrical Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 grid-rows-2 gap-6 h-[1200px] md:h-[800px]">
            {/* Main Feature */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="md:col-span-8 row-span-2 relative group overflow-hidden rounded-[2rem]"
            >
              <Link href={`/campaign/${MOCK_CAMPAIGNS[0]?.id}`} className="block w-full h-full">
                <img src={MOCK_CAMPAIGNS[0]?.coverImage} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Main Feature" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-xs font-semibold text-white uppercase tracking-wider">{MOCK_CAMPAIGNS[0]?.category}</span>
                    <span className="px-4 py-1.5 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-semibold uppercase tracking-wider">Editor's Choice</span>
                  </div>
                  <h3 className="text-4xl font-medium text-white mb-2">{MOCK_CAMPAIGNS[0]?.title}</h3>
                  <p className="text-white/60 mb-6 max-w-xl">{MOCK_CAMPAIGNS[0]?.tagline}</p>
                  <div className="flex gap-8 items-end">
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Pledged</p>
                      <p className="text-2xl font-medium text-white">${MOCK_CAMPAIGNS[0]?.currentAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Funded</p>
                      <p className="text-2xl font-medium text-primary">{Math.round((MOCK_CAMPAIGNS[0]?.currentAmount || 0) / (MOCK_CAMPAIGNS[0]?.goalAmount || 1) * 100)}%</p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Sub Feature 1 */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:col-span-4 row-span-1 relative group overflow-hidden rounded-[2rem]"
            >
              <Link href={`/campaign/${MOCK_CAMPAIGNS[1]?.id}`} className="block w-full h-full">
                <img src={MOCK_CAMPAIGNS[1]?.coverImage} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Sub Feature 1" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <span className="px-3 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-[10px] font-semibold text-white uppercase tracking-wider w-fit mb-3">{MOCK_CAMPAIGNS[1]?.category}</span>
                  <h3 className="text-xl font-medium text-white mb-1">{MOCK_CAMPAIGNS[1]?.title}</h3>
                  <p className="text-white/60 text-sm line-clamp-2">{MOCK_CAMPAIGNS[1]?.tagline}</p>
                </div>
              </Link>
            </motion.div>

            {/* Sub Feature 2 */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="md:col-span-4 row-span-1 relative group overflow-hidden rounded-[2rem]"
            >
              <Link href={`/campaign/${MOCK_CAMPAIGNS[2]?.id || MOCK_CAMPAIGNS[1]?.id}`} className="block w-full h-full">
                <img src={MOCK_CAMPAIGNS[2]?.coverImage || MOCK_CAMPAIGNS[1]?.coverImage} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Sub Feature 2" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <span className="px-3 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-[10px] font-semibold text-white uppercase tracking-wider w-fit mb-3">{MOCK_CAMPAIGNS[2]?.category || 'Design'}</span>
                  <h3 className="text-xl font-medium text-white mb-1">{MOCK_CAMPAIGNS[2]?.title || 'Next Gen Product'}</h3>
                  <p className="text-white/60 text-sm line-clamp-2">{MOCK_CAMPAIGNS[2]?.tagline || 'A new way to experience everyday life.'}</p>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LUXURY STATS */}
      <section className="py-24 border-y border-foreground/5 dark:border-white/5 bg-secondary/20 dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16">
            {[
              { label: "Total Capital Raised", value: "$500M+" },
              { label: "Visionary Backers", value: "2.5M" },
              { label: "Products Launched", value: "12,000" },
              { label: "Success Rate", value: "89%" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-5xl font-light text-foreground dark:text-white mb-4">{stat.value}</div>
                <div className="text-foreground/50 dark:text-white/40 font-medium tracking-[0.2em] uppercase text-[10px] md:text-xs">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES / DESIGNED FOR SUCCESS */}
      <section className="py-32 relative overflow-hidden bg-background dark:bg-black">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-medium mb-6 text-foreground dark:text-white">Engineered for Excellence.</h2>
            <p className="text-foreground/50 dark:text-white/50 text-lg font-light leading-relaxed">We provide creators with an uncompromising toolkit designed to elevate their vision and guarantee absolute security for backers.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:col-span-2 bg-card dark:bg-[#0d0d0d] rounded-[2rem] p-10 border border-border hover:border-foreground/20 dark:border-white/[0.03] dark:hover:border-white/[0.08] transition-colors relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                <TrendingUp className="w-32 h-32 text-primary" strokeWidth={1} />
              </div>
              <div className="relative z-10 max-w-md h-full flex flex-col justify-end pt-32">
                <h3 className="text-2xl font-medium text-foreground dark:text-white mb-4">Unrivaled Conversion</h3>
                <p className="text-foreground/50 dark:text-white/50 font-light leading-relaxed">Our proprietary discovery algorithm and streamlined checkout process ensure creators convert visitors into backers seamlessly, resulting in industry-leading success rates.</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-card dark:bg-[#0d0d0d] rounded-[2rem] p-10 border border-border hover:border-foreground/20 dark:border-white/[0.03] dark:hover:border-white/[0.08] transition-colors flex flex-col justify-end"
            >
              <ShieldCheck className="w-12 h-12 text-foreground/80 dark:text-white/80 mb-8" strokeWidth={1.5} />
              <h3 className="text-xl font-medium text-foreground dark:text-white mb-4">Bank-Grade Security</h3>
              <p className="text-foreground/50 dark:text-white/50 font-light text-sm leading-relaxed">Every transaction utilizes military-grade encryption. Escrow services protect both creator and backer.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONTINUOUS MARQUEE TESTIMONIALS */}
      <section className="py-24 bg-background dark:bg-[#050505] overflow-hidden border-y border-border dark:border-white/[0.02]">
        <div className="mb-12 px-4 text-center">
           <h2 className="text-sm font-medium tracking-[0.2em] text-foreground/40 dark:text-white/40 uppercase">Trusted by Visionaries</h2>
        </div>
        <div className="relative flex overflow-x-hidden w-full">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-16 py-4">
            {[
              "The most elegant crowdfunding experience ever built.",
              "SparkLift elevated our brand immediately.",
              "Flawless checkout. We hit our goal in hours.",
              "A digital art gallery that also funds hardware.",
              "The new gold standard for raising capital."
            ].map((quote, i) => (
              <span key={i} className="text-4xl md:text-6xl font-light text-foreground/20 hover:text-foreground/80 dark:text-white/20 dark:hover:text-white/80 transition-colors duration-500 cursor-default">
                "{quote}"
              </span>
            ))}
          </div>
          {/* Duplicate for seamless looping */}
          <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center gap-16 py-4">
            {[
              "The most elegant crowdfunding experience ever built.",
              "SparkLift elevated our brand immediately.",
              "Flawless checkout. We hit our goal in hours.",
              "A digital art gallery that also funds hardware.",
              "The new gold standard for raising capital."
            ].map((quote, i) => (
              <span key={`dup-${i}`} className="text-4xl md:text-6xl font-light text-foreground/20 hover:text-foreground/80 dark:text-white/20 dark:hover:text-white/80 transition-colors duration-500 cursor-default">
                "{quote}"
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* LUXURY CTA */}
      <section className="py-40 relative z-20 text-center bg-background dark:bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-5xl md:text-7xl font-medium tracking-tight mb-8 text-foreground dark:text-white leading-tight">
              Bring your vision<br/>to the world.
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6 mt-16">
              <Button size="lg" className="h-16 px-12 rounded-full bg-foreground text-background hover:bg-foreground/90 dark:bg-white dark:text-black dark:hover:bg-white/90 text-lg font-medium transition-transform hover:scale-105">
                <Link href="/campaigns/create">Start a Project</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
