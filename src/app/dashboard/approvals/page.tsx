import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const mockApprovals = [
  {
    id: "APP-4091",
    title: "Quantum Keyboard: The Future of Typing",
    creator: "TechNova Inc.",
    goal: 50000,
    submittedAt: "2 hours ago",
    risk: "Low"
  },
  {
    id: "APP-4092",
    title: "Solaris: Portable Solar Generator",
    creator: "EcoPower",
    goal: 150000,
    submittedAt: "5 hours ago",
    risk: "Medium"
  },
  {
    id: "APP-4093",
    title: "Mystic Valley: Board Game",
    creator: "Tabletop Legends",
    goal: 15000,
    submittedAt: "1 day ago",
    risk: "Low"
  }
];

export default function ApprovalsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Pending Approvals</h1>
        <Badge variant="secondary" className="px-3 py-1 text-sm bg-primary/20 text-primary">3 in Queue</Badge>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search campaigns..." className="pl-10 glass bg-white/5 border-white/10" />
        </div>
      </div>
      
      <div className="glass-panel overflow-hidden rounded-xl border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-medium text-muted-foreground">Campaign & Creator</th>
                <th className="px-6 py-4 font-medium text-muted-foreground">Funding Goal</th>
                <th className="px-6 py-4 font-medium text-muted-foreground">Submitted</th>
                <th className="px-6 py-4 font-medium text-muted-foreground">Risk Level</th>
                <th className="px-6 py-4 font-medium text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockApprovals.map((item) => (
                <tr key={item.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-foreground mb-1">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.creator}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    ${item.goal.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-muted-foreground text-xs">
                    {item.submittedAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="outline" className={`
                      ${item.risk === 'Low' ? 'border-green-500 text-green-500' : ''}
                      ${item.risk === 'Medium' ? 'border-yellow-500 text-yellow-500' : ''}
                    `}>
                      {item.risk}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right space-x-2 flex items-center justify-end">
                    <Button variant="outline" size="sm" className="text-xs hover:bg-white/10">
                      Review
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-green-500 hover:text-green-400 hover:bg-green-500/10">
                      <Check className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-red-500/10">
                      <X className="w-4 h-4" />
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
