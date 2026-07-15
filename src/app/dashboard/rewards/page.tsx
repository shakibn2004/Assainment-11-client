import { Badge } from "@/components/ui/badge";
import { Package, Truck, CheckCircle } from "lucide-react";

const mockRewards = [
  {
    id: "RW-10492",
    campaign: "EcoSphere: Self-Sustaining Indoor Garden",
    tier: "Early Bird EcoSphere",
    status: "Shipped",
    estDelivery: "Aug 2026",
    tracking: "TRK992834710US"
  },
  {
    id: "RW-10884",
    campaign: "Aura: Next-Gen Noise Canceling Headphones",
    tier: "Pro Tier + Case",
    status: "Processing",
    estDelivery: "Oct 2026",
    tracking: null
  }
];

export default function RewardsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Your Rewards</h1>
      </div>
      
      <div className="glass-panel overflow-hidden rounded-xl border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-medium text-muted-foreground">Reward & Campaign</th>
                <th className="px-6 py-4 font-medium text-muted-foreground">Est. Delivery</th>
                <th className="px-6 py-4 font-medium text-muted-foreground">Status</th>
                <th className="px-6 py-4 font-medium text-muted-foreground">Tracking</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockRewards.map((reward) => (
                <tr key={reward.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-foreground mb-1">{reward.tier}</p>
                    <p className="text-xs text-muted-foreground max-w-[250px] truncate">{reward.campaign}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {reward.estDelivery}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="outline" className={`
                      ${reward.status === 'Shipped' ? 'border-green-500 text-green-500' : ''}
                      ${reward.status === 'Processing' ? 'border-blue-500 text-blue-500' : ''}
                    `}>
                      {reward.status === 'Shipped' && <Truck className="w-3 h-3 mr-1" />}
                      {reward.status === 'Processing' && <Package className="w-3 h-3 mr-1" />}
                      {reward.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                    {reward.tracking ? (
                      <span className="font-mono text-xs text-primary hover:underline cursor-pointer">
                        {reward.tracking}
                      </span>
                    ) : (
                      <span className="italic">Not available yet</span>
                    )}
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
