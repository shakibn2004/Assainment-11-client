"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, CreditCard, Clock, Gift } from "lucide-react";
import { MOCK_CAMPAIGNS } from "@/services/mock/data";
import Link from "next/link";
import { TiltCard } from "../shared/TiltCard";

export function SupporterDashboard() {
  // Mock backed campaigns
  const backedCampaigns = MOCK_CAMPAIGNS.slice(1, 3);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">My Contributions</h1>
        <p className="text-muted-foreground">Track the projects you've supported and your rewards.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Backed", value: "$420", icon: CreditCard, trend: "3 projects" },
          { title: "Rewards Pending", value: "2", icon: Gift, trend: "Arriving Oct-Dec" },
          { title: "Saved Projects", value: "5", icon: Heart, trend: "View list" },
          { title: "Avg. Contribution", value: "$140", icon: Clock, trend: "Last 12 months" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.trend}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <h3 className="text-xl font-bold mt-12 mb-6">Backed Campaigns</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {backedCampaigns.map((campaign, i) => {
          const progress = Math.min((campaign.currentAmount / campaign.goalAmount) * 100, 100);
          
          return (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={`/campaign/${campaign.id}`}>
                <TiltCard className="h-full">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="w-full sm:w-1/3 h-32 rounded-lg overflow-hidden shrink-0">
                      <img src={campaign.coverImage} alt={campaign.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-lg leading-tight mb-1">{campaign.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-1">{campaign.creatorName}</p>
                      </div>
                      <div className="mt-4">
                        <div className="w-full bg-foreground/5 dark:bg-white/5 rounded-full h-1.5 overflow-hidden mb-2">
                          <div className="bg-primary h-full rounded-full" style={{ width: `${progress}%` }} />
                        </div>
                        <div className="flex justify-between text-xs font-medium">
                          <span className="text-primary">{Math.round(progress)}% funded</span>
                          <span className="text-muted-foreground">{campaign.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
