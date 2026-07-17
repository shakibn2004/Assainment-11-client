"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, Eye, TrendingUp, Edit, Trash2 } from "lucide-react";
import { campaignApi } from "@/services/api/campaigns";
import { useEffect, useState } from "react";
import { Campaign } from "@/types";
import { authClient } from "@/lib/auth-client";

export function CreatorDashboard() {
  const { data: session } = authClient.useSession();
  const [activeCampaign, setActiveCampaign] = useState<Campaign | null>(null);

  const fetchCampaigns = () => {
    if (session?.user?.id) {
      campaignApi.getCampaignsByCreator(session.user.id).then(campaigns => {
        if (campaigns.length > 0) {
          setActiveCampaign(campaigns[0]);
        } else {
          setActiveCampaign(null);
        }
      });
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [session?.user?.id]);

  const handleDelete = async () => {
    if (!activeCampaign) return;
    if (confirm("Are you sure you want to delete this campaign?")) {
      await campaignApi.deleteCampaign(activeCampaign.id);
      fetchCampaigns();
    }
  };

  const handleEdit = async () => {
    if (!activeCampaign) return;
    const newTitle = prompt("Enter new title for campaign:", activeCampaign.title);
    if (newTitle) {
      await campaignApi.updateCampaign(activeCampaign.id, { title: newTitle });
      fetchCampaigns();
    }
  };

  if (!activeCampaign) return <div className="text-center py-12 text-muted-foreground">No active campaigns found.</div>;

  const progress = Math.min((activeCampaign.currentAmount / activeCampaign.goalAmount) * 100, 100);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Creator Hub</h1>
          <p className="text-muted-foreground">Manage your campaigns and track funding.</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
          Create New Campaign
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Raised", value: `$${activeCampaign.currentAmount.toLocaleString()}`, icon: DollarSign, trend: "+12.5%" },
          { title: "Total Backers", value: activeCampaign.backersCount.toString(), icon: Users, trend: "+4.2%" },
          { title: "Page Views", value: "45.2K", icon: Eye, trend: "+18.1%" },
          { title: "Conversion Rate", value: "3.2%", icon: TrendingUp, trend: "+0.4%" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className="p-2 rounded-md bg-foreground/5 dark:bg-white/5 text-primary">
                  <stat.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-emerald-500 font-medium mt-1">
                  {stat.trend} this week
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          className="lg:col-span-2 glass-card p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Active Campaign</h3>
            <div className="flex gap-2">
              <button onClick={handleEdit} className="p-2 hover:bg-white/10 rounded-md transition-colors text-muted-foreground hover:text-foreground">
                <Edit className="w-4 h-4" />
              </button>
              <button onClick={handleDelete} className="p-2 hover:bg-red-500/20 rounded-md transition-colors text-muted-foreground hover:text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex gap-6">
            <div className="w-1/3 rounded-xl overflow-hidden border border-border dark:border-white/10 hidden md:block">
              <img src={activeCampaign.coverImage} alt={activeCampaign.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 space-y-4">
              <h4 className="text-xl font-bold">{activeCampaign.title}</h4>
              <p className="text-muted-foreground text-sm">{activeCampaign.tagline}</p>
              
              <div className="pt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold text-primary">${activeCampaign.currentAmount.toLocaleString()} raised</span>
                  <span className="text-muted-foreground">of ${activeCampaign.goalAmount.toLocaleString()}</span>
                </div>
                <div className="w-full bg-foreground/5 dark:bg-white/5 rounded-full h-2 overflow-hidden mb-2">
                  <div className="bg-primary h-full rounded-full" style={{ width: `${progress}%` }} />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{Math.round(progress)}% funded</span>
                  <span>{activeCampaign.daysLeft} days remaining</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="glass-card p-6 flex flex-col"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="text-lg font-semibold mb-6">Recent Backers</h3>
          <div className="flex-1 space-y-4 overflow-y-auto">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-foreground/5 dark:hover:bg-white/5 transition-colors">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center font-bold text-sm">
                  U{i}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Anonymous Backer</p>
                  <p className="text-xs text-muted-foreground">Backed Reward Tier {i}</p>
                </div>
                <div className="text-sm font-bold text-primary">
                  ${i * 50}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
