"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { campaignApi } from "@/services/api/campaigns";
import { Campaign } from "@/types";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CampaignsPage() {
  const { data: session } = authClient.useSession();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Edit Modal State
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editCampaign, setEditCampaign] = useState<Campaign | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchCampaigns = async () => {
    if (session?.user?.id) {
      setIsLoading(true);
      try {
        const data = await campaignApi.getCampaignsByCreator(session.user.id);
        setCampaigns(data);
      } catch (error) {
        toast.error("Failed to load campaigns.");
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [session?.user?.id]);

  const handleDelete = async (campaign: Campaign) => {
    if (confirm(`Are you sure you want to delete "${campaign.title}"?`)) {
      try {
        await campaignApi.deleteCampaign(campaign.id);
        toast.success("Campaign deleted successfully.");
        fetchCampaigns();
      } catch (error) {
        toast.error("Failed to delete campaign.");
      }
    }
  };

  const openEditModal = (campaign: Campaign) => {
    setEditCampaign(campaign);
    setNewTitle(campaign.title);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editCampaign) return;
    if (!newTitle.trim()) {
      toast.error("Title cannot be empty.");
      return;
    }
    
    setIsUpdating(true);
    try {
      await campaignApi.updateCampaign(editCampaign.id, { title: newTitle });
      toast.success("Campaign updated successfully.");
      setIsEditDialogOpen(false);
      fetchCampaigns();
    } catch (error) {
      toast.error("Failed to update campaign.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">My Campaigns</h1>
        <Link href="/campaigns/create">
          <Button className="gap-2 bg-primary text-white hover:bg-primary/90">
            <Plus className="w-4 h-4" /> New Campaign
          </Button>
        </Link>
      </div>
      
      <div className="glass-panel overflow-hidden rounded-xl border border-white/10">
        <div className="overflow-x-auto min-w-0">
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
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    Loading your campaigns...
                  </td>
                </tr>
              ) : campaigns.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    You haven't created any campaigns yet.
                  </td>
                </tr>
              ) : (
                campaigns.map((camp) => (
                  <tr key={camp.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-foreground max-w-[200px] sm:max-w-xs truncate" title={camp.title}>{camp.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {camp.daysLeft !== null && camp.daysLeft !== undefined ? (camp.daysLeft > 0 ? `${camp.daysLeft} days left` : "Ended") : "Not launched"}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="outline" className={`
                        ${camp.status === 'ACTIVE' ? 'border-green-500 text-green-500' : ''}
                        ${camp.status === 'DRAFT' ? 'border-yellow-500 text-yellow-500' : ''}
                        ${camp.status === 'COMPLETED' ? 'border-blue-500 text-blue-500' : ''}
                      `}>
                        {camp.status || "Draft"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium">${(camp.currentAmount || 0).toLocaleString()}</span>
                      <span className="text-muted-foreground text-xs ml-1">/ ${(camp.goalAmount || 0).toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {(camp.backersCount || 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right space-x-1">
                      <Link href={`/campaign/${camp.id}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button onClick={() => openEditModal(camp)} variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button onClick={() => handleDelete(camp)} variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Campaign</DialogTitle>
            <DialogDescription>
              Make changes to your campaign here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} disabled={isUpdating}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} disabled={isUpdating}>
              {isUpdating ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
