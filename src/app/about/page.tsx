"use client";

import { motion } from "framer-motion";
import { Rocket, Target, Globe, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
          >
            Empowering the <span className="text-gradient">Visionaries</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-muted-foreground leading-relaxed"
          >
            SparkLift was built on a simple belief: great ideas shouldn't be gated by traditional funding models. We're creating the world's most elegant platform for bringing dreams to life.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10 flex flex-col justify-center"
          >
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Founded in 2026, SparkLift emerged from the frustration of seeing incredible products fail to launch due to complex, outdated, and uninspiring crowdfunding platforms.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We assembled a team of world-class designers and engineers to build a platform that feels as premium as the products it hosts. We believe the medium is the message, and your funding platform should reflect your project's quality.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden border border-white/10"
          >
            <Image 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
              alt="Team collaborating" 
              width={2070}
              height={1380}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Rocket, title: "Innovation First", desc: "We support projects that push the boundaries of what's possible." },
              { icon: ShieldCheck, title: "Absolute Trust", desc: "Bank-grade security and strict vetting for every campaign." },
              { icon: Target, title: "Creator Success", desc: "We only succeed when our creators succeed. Period." },
              { icon: Globe, title: "Global Community", desc: "Connecting visionaries with backers across the world." }
            ].map((val, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-2xl flex flex-col items-center text-center hover:bg-white/10 transition-colors"
              >
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-6">
                  <val.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2">{val.title}</h3>
                <p className="text-sm text-muted-foreground">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
