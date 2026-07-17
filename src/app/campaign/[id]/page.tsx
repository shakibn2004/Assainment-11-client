"use client";

import { use, useEffect, useState } from "react";
import { campaignApi } from "@/services/api/campaigns";
import { Campaign } from "@/types";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users, Clock, Target, ArrowLeft, Share2, Heart } from "lucide-react";
import Link from "next/link";
import { TiltCard } from "@/components/shared/TiltCard";
import { LoadingScreen } from "@/components/shared/Spinner";

export default function CampaignDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  
  useEffect(() => {
    campaignApi.getCampaignById(resolvedParams.id).then(found => {
      if (!found) notFound();
      setCampaign(found);
    });
  }, [resolvedParams.id]);

  if (!campaign) return <LoadingScreen text="Loading campaign details..." />;

  const progress = Math.min((campaign.currentAmount / campaign.goalAmount) * 100, 100);

  return (
    <div className="min-h-screen bg-background">
      {/* Immersive Hero Video/Image */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
        <img 
          src={campaign.coverImage} 
          alt={campaign.title}
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        
        <div className="absolute inset-0 z-20 flex flex-col justify-end pb-12">
          <div className="container mx-auto px-4">
            <Link href="/explore" className="inline-flex items-center text-sm font-medium text-white/80 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Explore
            </Link>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-4 py-1.5 text-sm font-semibold rounded-full bg-primary/90 text-white backdrop-blur-md border border-primary/20 shadow-lg">
                {campaign.category}
              </span>
              {campaign.featured && (
                <span className="px-4 py-1.5 text-sm font-semibold rounded-full bg-accent/90 text-white backdrop-blur-md shadow-lg">
                  Featured Project
                </span>
              )}
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 max-w-4xl drop-shadow-lg"
            >
              {campaign.title}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/90 max-w-2xl drop-shadow-md"
            >
              {campaign.tagline}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-12 relative z-30 -mt-8">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column: Story & Details */}
          <div className="flex-1 space-y-12">
            {/* Story Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-panel p-8 md:p-12 rounded-3xl"
            >
              <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-accent p-1">
                    <div className="w-full h-full bg-background rounded-full flex items-center justify-center font-bold text-xl">
                      {campaign.creatorName.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Created by</p>
                    <p className="text-lg font-bold">{campaign.creatorName}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="rounded-full glass hover:bg-white/10 border-white/10">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full glass hover:bg-white/10 border-white/10">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="prose prose-invert prose-lg max-w-none">
                <h3 className="text-2xl font-bold mb-6">About this project</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {campaign.description}
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  {campaign.story}
                </p>
                {/* Fake extensive content to show scrolling */}
                <div className="mt-8 space-y-6 text-muted-foreground">
                  <p>Our team has spent the last 18 months perfecting the engineering and design. We didn't want to just make another product; we wanted to create a paradigm shift in how people interact with this category.</p>
                  <div className="my-12 rounded-xl overflow-hidden border border-white/10">
                    <img src={campaign.coverImage} className="w-full h-[400px] object-cover" alt="Detail view" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground">Why we need your help</h4>
                  <p>Manufacturing at scale requires significant upfront capital for tooling and minimum order quantities. By backing us now, you are not just pre-ordering a product, you are bringing this vision to reality.</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Funding Widget & Rewards */}
          <div className="w-full lg:w-[420px] shrink-0 space-y-8">
            <div className="sticky top-28 space-y-8">
              {/* Funding Stats Widget */}
              <TiltCard className="p-2" glowColor="rgba(var(--primary), 0.2)">
                <div className="space-y-6">
                  <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden mb-2">
                    <motion.div 
                      className="bg-primary h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-4xl font-extrabold text-primary">${campaign.currentAmount.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground font-medium flex items-center gap-2">
                      <Target className="w-4 h-4" /> pledged of ${campaign.goalAmount.toLocaleString()} goal
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-6 border-y border-white/5">
                    <div>
                      <div className="text-2xl font-bold flex items-center gap-2">
                        <Users className="w-5 h-5 text-muted-foreground" />
                        {campaign.backersCount}
                      </div>
                      <div className="text-sm text-muted-foreground">backers</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold flex items-center gap-2">
                        <Clock className="w-5 h-5 text-muted-foreground" />
                        {campaign.daysLeft}
                      </div>
                      <div className="text-sm text-muted-foreground">days to go</div>
                    </div>
                  </div>

                  <Button 
                    onClick={() => document.getElementById('rewards-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-full h-14 text-lg font-bold rounded-xl shadow-[0_0_30px_rgba(var(--primary),0.3)] hover:shadow-[0_0_50px_rgba(var(--primary),0.5)] transition-shadow"
                  >
                    Back this project
                  </Button>
                  
                  <p className="text-xs text-center text-muted-foreground">
                    All or nothing. This project will only be funded if it reaches its goal by {new Date(Date.now() + campaign.daysLeft * 24 * 60 * 60 * 1000).toLocaleDateString()}.
                  </p>
                </div>
              </TiltCard>

              {/* Rewards List */}
              <div id="rewards-section" className="space-y-4 pt-4">
                <h3 className="text-xl font-bold mb-4 px-2">Select a Reward</h3>
                {campaign.rewards.map((reward, i) => (
                  <Link href={`/checkout/${campaign.id}?reward=${reward.id}`} key={reward.id} className="block">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                      className="glass-card p-6 border border-white/5 hover:border-primary/50 cursor-pointer group transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-lg font-bold group-hover:text-primary transition-colors">{reward.title}</h4>
                        <span className="text-xl font-bold text-primary">${reward.amount}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{reward.description}</p>
                      <div className="text-xs text-muted-foreground bg-white/5 p-3 rounded-lg flex justify-between items-center">
                        <div>
                          <span className="block font-medium text-foreground">Estimated Delivery</span>
                          {reward.estimatedDelivery}
                        </div>
                        <div className="text-right">
                          <span className="block font-medium text-foreground">Claimed</span>
                          {reward.claimed} {reward.stock && `/ ${reward.stock}`}
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
