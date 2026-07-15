import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus, Edit, Eye } from "lucide-react";
import Link from "next/link";

const mockCampaigns = [
  {
    id: "CAMP-001",
    title: "NeuroBand: Focus Enhancing Wearable",
    status: "Live",
    raised: 45200,
    goal: 50000,
    backers: 312,
    daysLeft: 8
  },
  {
    id: "CAMP-002",
    title: "Lumina: Smart Desk Lamp",
    status: "Ended",
    raised: 120500,
    goal: 20000,
    backers: 1405,
    daysLeft: 0
  },
  {
    id: "CAMP-003",
    title: "Apex: The Ultimate Travel Backpack",
    status: "Draft",
    raised: 0,
    goal: 30000,
    backers: 0,
    daysLeft: null
  }
];

export default function CampaignsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My Campaigns</h1>
        <Link href="/campaigns/create">
          <Button className="gap-2 bg-primary text-white hover:bg-primary/90">
            <Plus className="w-4 h-4" /> New Campaign
          </Button>
        </Link>
      </div>
      
      <div className="glass-panel overflow-hidden rounded-xl border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-medium text-muted-foreground">Campaign</th>
                <th className="px-6 py-4 font-medium text-muted-foreground">Status</th>
                <th className="px-6 py-4 font-medium text-muted-foreground">Raised / Goal</th>
                <th className="px-6 py-4 font-medium text-muted-foreground">Backers</th>
                <th className="px-6 py-4 font-medium text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockCampaigns.map((camp) => (
                <tr key={camp.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-foreground">{camp.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {camp.daysLeft !== null ? (camp.daysLeft > 0 ? `${camp.daysLeft} days left` : "Ended") : "Not launched"}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="outline" className={`
                      ${camp.status === 'Live' ? 'border-green-500 text-green-500' : ''}
                      ${camp.status === 'Draft' ? 'border-yellow-500 text-yellow-500' : ''}
                      ${camp.status === 'Ended' ? 'border-blue-500 text-blue-500' : ''}
                    `}>
                      {camp.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium">${camp.raised.toLocaleString()}</span>
                    <span className="text-muted-foreground text-xs ml-1">/ ${camp.goal.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {camp.backers.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
