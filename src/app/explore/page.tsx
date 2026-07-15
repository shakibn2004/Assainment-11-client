"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search, Filter, ArrowRight, Users } from "lucide-react";
import { MOCK_CAMPAIGNS } from "@/services/mock/data";
import { TiltCard } from "@/components/shared/TiltCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  
  const filtered = MOCK_CAMPAIGNS.filter(c => 
    c.title.toLowerCase().includes(search.toLowerCase()) || 
    c.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-12 pt-24 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Explore Campaigns</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Discover innovative projects created by visionary founders from around the world.
          </p>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              className="pl-10 glass bg-white/5 border-white/10 focus-visible:ring-primary"
              placeholder="Search projects..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" className="glass border-white/10 hover:bg-white/10 px-4">
            <Filter className="w-4 h-4 mr-2" /> Filters
          </Button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-muted-foreground text-lg">No campaigns found matching "{search}".</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((campaign, i) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={`/campaign/${campaign.id}`}>
                <TiltCard className="h-full flex flex-col">
                  <div className="relative h-56 -mx-6 -mt-6 mb-6 overflow-hidden rounded-t-2xl border-b border-white/5">
                    <img 
                      src={campaign.coverImage} 
                      alt={campaign.title}
                      className="object-cover w-full h-full transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-black/50 backdrop-blur-md text-white border border-white/10">
                        {campaign.category}
                      </span>
                      {campaign.featured && (
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/80 backdrop-blur-md text-white border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.5)]">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 line-clamp-1">{campaign.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6 line-clamp-2 flex-grow">
                    {campaign.tagline}
                  </p>
                  
                  <div className="mt-auto space-y-4">
                    <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                      <motion.div 
                        className="bg-primary h-full rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.min((campaign.currentAmount / campaign.goalAmount) * 100, 100)}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                    
                    <div className="flex justify-between items-center text-sm font-medium">
                      <div className="text-primary">${campaign.currentAmount.toLocaleString()} <span className="text-muted-foreground text-xs font-normal">raised</span></div>
                      <div>{Math.round((campaign.currentAmount / campaign.goalAmount) * 100)}%</div>
                    </div>
                    
                    <div className="flex justify-between items-center text-xs text-muted-foreground pt-4 border-t border-white/5">
                      <span className="flex items-center gap-1"><Users size={14}/> {campaign.backersCount} backers</span>
                      <span>{campaign.daysLeft} days left</span>
                    </div>
                  </div>
                </TiltCard>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
