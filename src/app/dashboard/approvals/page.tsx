"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, Search, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const initialApprovals = [
  {
    id: "APP-4091",
    title: "Quantum Keyboard: The Future of Typing",
    creator: "TechNova Inc.",
    goal: 50000,
    submittedAt: "2 hours ago",
    risk: "Low",
    description: "A revolutionary new mechanical keyboard with customizable magnetic switches and a programmable OLED screen. Perfect for developers and gamers alike.",
    category: "Technology",
  },
  {
    id: "APP-4092",
    title: "Solaris: Portable Solar Generator",
    creator: "EcoPower",
    goal: 150000,
    submittedAt: "5 hours ago",
    risk: "Medium",
    description: "Compact and powerful, Solaris provides 2000W of clean energy on the go. Great for camping, emergencies, or off-grid living.",
    category: "Design & Tech",
  },
  {
    id: "APP-4093",
    title: "Mystic Valley: Board Game",
    creator: "Tabletop Legends",
    goal: 15000,
    submittedAt: "1 day ago",
    risk: "Low",
    description: "A strategic worker-placement game set in a fantasy valley. Gather resources, build magical structures, and earn victory points to win.",
    category: "Games",
  }
];

export default function ApprovalsPage() {
  const [approvals, setApprovals] = useState(initialApprovals);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApproval, setSelectedApproval] = useState<typeof initialApprovals[0] | null>(null);

  const handleApprove = (id: string, title: string) => {
    setApprovals(approvals.filter(app => app.id !== id));
    toast.success(`Approved campaign: ${title}`);
    if (selectedApproval?.id === id) setSelectedApproval(null);
  };

  const handleReject = (id: string, title: string) => {
    setApprovals(approvals.filter(app => app.id !== id));
    toast.error(`Rejected campaign: ${title}`);
    if (selectedApproval?.id === id) setSelectedApproval(null);
  };

  const filteredApprovals = approvals.filter(app => 
    app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.creator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Pending Approvals</h1>
        <Badge variant="secondary" className="px-3 py-1 text-sm bg-primary/20 text-primary">
          {approvals.length} in Queue
        </Badge>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search campaigns..." 
            className="pl-10 glass bg-white/5 border-white/10" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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
              {filteredApprovals.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    No pending approvals found.
                  </td>
                </tr>
              ) : (
                filteredApprovals.map((item) => (
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
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs hover:bg-white/10"
                        onClick={() => setSelectedApproval(item)}
                      >
                        Review
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-green-500 hover:text-green-400 hover:bg-green-500/10"
                        onClick={() => handleApprove(item.id, item.title)}
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-red-500/10"
                        onClick={() => handleReject(item.id, item.title)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={selectedApproval !== null} onOpenChange={(isOpen) => !isOpen && setSelectedApproval(null)}>
        {selectedApproval && (
          <DialogContent className="sm:max-w-[500px] bg-background dark:bg-black/95 border-border dark:border-white/10 backdrop-blur-xl">
            <DialogHeader>
              <DialogTitle className="text-xl">{selectedApproval.title}</DialogTitle>
              <DialogDescription>
                Review campaign details before taking action.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-medium tracking-wider mb-1">Creator</p>
                  <p className="font-medium text-sm">{selectedApproval.creator}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-medium tracking-wider mb-1">Category</p>
                  <p className="font-medium text-sm">{selectedApproval.category}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-medium tracking-wider mb-1">Funding Goal</p>
                  <p className="font-medium text-sm">${selectedApproval.goal.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-medium tracking-wider mb-1">Risk Assessment</p>
                  <Badge variant="outline" className={`
                    ${selectedApproval.risk === 'Low' ? 'border-green-500 text-green-500' : ''}
                    ${selectedApproval.risk === 'Medium' ? 'border-yellow-500 text-yellow-500' : ''}
                  `}>
                    {selectedApproval.risk}
                  </Badge>
                </div>
              </div>
              <div className="pt-2 border-t border-border dark:border-white/10">
                <p className="text-xs text-muted-foreground uppercase font-medium tracking-wider mb-2">Description</p>
                <div className="bg-muted/50 dark:bg-white/5 p-3 rounded-md border border-border dark:border-white/10">
                  <p className="text-sm text-foreground leading-relaxed flex gap-2">
                    <FileText className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                    {selectedApproval.description}
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter className="bg-transparent border-t border-border dark:border-white/10 pt-4 mt-2 sm:justify-between">
              <Button variant="ghost" onClick={() => setSelectedApproval(null)}>Cancel</Button>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="text-red-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-500/10 border-red-500/20"
                  onClick={() => handleReject(selectedApproval.id, selectedApproval.title)}
                >
                  <X className="w-4 h-4 mr-1" />
                  Reject
                </Button>
                <Button 
                  className="bg-green-600 hover:bg-green-700 dark:hover:bg-green-500 text-white"
                  onClick={() => handleApprove(selectedApproval.id, selectedApproval.title)}
                >
                  <Check className="w-4 h-4 mr-1" />
                  Approve
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
