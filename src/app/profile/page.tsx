"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MapPin, Link as LinkIcon, Calendar, Edit3 } from "lucide-react";
import { campaignApi } from "@/services/api/campaigns";
import { Campaign } from "@/types";
import { useEffect, useState } from "react";
import { TiltCard } from "@/components/shared/TiltCard";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter(); // Initialize router
  const { data: session } = authClient.useSession();
  const user = session?.user;

  if (!user) return <div className="min-h-screen pt-24 text-center">Please log in to view profile.</div>;

  const [userCampaigns, setUserCampaigns] = useState<Campaign[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editImage, setEditImage] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Initialize edit form when user is available
  useEffect(() => {
    if (user) {
      setEditName(user.name || "");
      setEditImage(user.image || (user as any).avatarUrl || "");
    }
  }, [user]);

  useEffect(() => {
    if (user?.id) {
      campaignApi.getCampaignsByCreator(user.id).then(setUserCampaigns);
    }
  }, [user?.id]);

  const role = (user as any)?.role?.toLowerCase();
  const canStartCampaign = role === "admin" || role === "creator";

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await authClient.updateUser({
        name: editName,
        image: editImage
      });
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Profile Header */}
        <div className="glass-panel p-8 rounded-3xl relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[60px] rounded-full pointer-events-none" />
          
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center relative z-10">
            <Avatar className="w-32 h-32 border-4 border-background shadow-2xl">
              {/* Better Auth defaults to 'image', fallback to 'avatarUrl' safely */}
              <AvatarImage src={user.image || (user as any).avatarUrl || ""} />
              <AvatarFallback className="text-4xl">{user.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <Dialog open={isEditing} onOpenChange={setIsEditing}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="glass border-white/10">
                      <Edit3 className="w-4 h-4 mr-2" /> Edit Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-xl border-white/10">
                    <DialogHeader>
                      <DialogTitle>Edit Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleUpdateProfile} className="space-y-6 pt-4">
                      <div className="space-y-2">
                        <Label>Name</Label>
                        <Input 
                          value={editName} 
                          onChange={e => setEditName(e.target.value)} 
                          required 
                          className="glass bg-white/5 border-white/10"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Profile Image</Label>
                        <div className="relative border-2 border-dashed border-white/20 rounded-xl overflow-hidden flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors bg-white/5 min-h-[150px]">
                          {isUploadingImage ? (
                            <div className="flex flex-col items-center justify-center p-8">
                              <div className="w-8 h-8 rounded-full border-t-2 border-primary animate-spin mb-4"></div>
                              <p className="text-sm text-muted-foreground">Uploading image...</p>
                            </div>
                          ) : editImage ? (
                            <div className="relative w-full h-full p-4 flex justify-center">
                              <Avatar className="w-24 h-24 border-2 border-primary">
                                <AvatarImage src={editImage} />
                                <AvatarFallback>U</AvatarFallback>
                              </Avatar>
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                <Button 
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => setEditImage("")}
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <label className="flex flex-col items-center justify-center w-full h-full p-6 cursor-pointer">
                              <UploadCloud className="w-8 h-8 text-muted-foreground mb-2" />
                              <p className="text-sm font-medium">Click to upload image</p>
                              <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (!file) return;

                                  setIsUploadingImage(true);
                                  try {
                                    const formData = new FormData();
                                    formData.append("image", file);
                                    
                                    const key = process.env.NEXT_PUBLIC_IMGBB_KEY;
                                    if (!key) throw new Error("ImgBB API key is missing");

                                    const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
                                      method: "POST",
                                      body: formData,
                                    });
                                    
                                    const data = await res.json();
                                    if (data.success) {
                                      setEditImage(data.data.url);
                                      toast.success("Image uploaded to ImgBB!");
                                    } else {
                                      throw new Error("Upload failed");
                                    }
                                  } catch (error) {
                                    console.error(error);
                                    toast.error("Failed to upload image.");
                                  } finally {
                                    setIsUploadingImage(false);
                                  }
                                }}
                              />
                            </label>
                          )}
                        </div>
                      </div>

                      <DialogFooter>
                        <Button type="submit" disabled={isUpdating || isUploadingImage} className="w-full">
                          {isUpdating ? "Saving..." : "Save Changes"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
              <p className="text-muted-foreground text-lg">Digital Creator & Technologist</p>
              
              <div className="flex flex-wrap gap-4 pt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1"><MapPin className="w-4 h-4" /> San Francisco, CA</div>
                <div className="flex items-center gap-1"><LinkIcon className="w-4 h-4" /> website.com</div>
                {/* Better Auth defaults to 'createdAt', fallback to 'joinedAt' safely */}
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> 
                  Joined {new Date(user.createdAt || (user as any).joinedAt || Date.now()).getFullYear()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="space-y-8">
          {canStartCampaign && <h2 className="text-2xl font-bold">Created Campaigns</h2>}
          
          {canStartCampaign && userCampaigns.length === 0 && (
            <div className="glass-card p-12 text-center">
              <p className="text-muted-foreground mb-4">You haven't created any campaigns yet.</p>
              <Button onClick={() => router.push("/campaigns/create")}>
                Start a Campaign
              </Button>
            </div>
          )}
          
          {canStartCampaign && userCampaigns.length > 0 && (
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