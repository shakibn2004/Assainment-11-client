"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MapPin, Link as LinkIcon, Calendar, Edit3 } from "lucide-react";
import { MOCK_CAMPAIGNS } from "@/services/mock/data";
import { TiltCard } from "@/components/shared/TiltCard";
import Link from "next/link";

export default function ProfilePage() {
  const { user } = useAuthStore();

  if (!user) return <div className="min-h-screen pt-24 text-center">Please log in to view profile.</div>;

  const userCampaigns = MOCK_CAMPAIGNS.filter(c => c.creatorId === user.id);

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Profile Header */}
        <div className="glass-panel p-8 rounded-3xl relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[60px] rounded-full pointer-events-none" />
          
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center relative z-10">
            <Avatar className="w-32 h-32 border-4 border-background shadow-2xl">
              <AvatarImage src={user.avatarUrl} />
              <AvatarFallback className="text-4xl">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <Button variant="outline" className="glass border-white/10">
                  <Edit3 className="w-4 h-4 mr-2" /> Edit Profile
                </Button>
              </div>
              <p className="text-muted-foreground text-lg">Digital Creator & Technologist</p>
              
              <div className="flex flex-wrap gap-4 pt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1"><MapPin className="w-4 h-4" /> San Francisco, CA</div>
                <div className="flex items-center gap-1"><LinkIcon className="w-4 h-4" /> website.com</div>
                <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Joined {new Date(user.joinedAt).getFullYear()}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold">Created Campaigns</h2>
          
          {userCampaigns.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <p className="text-muted-foreground mb-4">You haven't created any campaigns yet.</p>
              <Button>
                <Link href="/campaigns/create">Start a Campaign</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userCampaigns.map(campaign => (
                <Link key={campaign.id} href={`/campaign/${campaign.id}`}>
                  <TiltCard>
                    <div className="relative h-40 -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-2xl border-b border-white/5">
                      <img src={campaign.coverImage} className="w-full h-full object-cover" alt={campaign.title} />
                    </div>
                    <h3 className="font-bold mb-1">{campaign.title}</h3>
                    <p className="text-xs text-muted-foreground mb-4 line-clamp-1">{campaign.tagline}</p>
                    <div className="text-sm font-medium text-primary">
                      ${campaign.currentAmount.toLocaleString()} raised
                    </div>
                  </TiltCard>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
