"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function ProfileSettingsPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  
  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
    }
  }, [user]);
  
  if (!user) return null;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await authClient.updateUser({ name });
      toast.success("Profile settings updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile settings");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="glass-card p-8">
      <h3 className="text-xl font-bold mb-6">Profile Information</h3>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="glass bg-white/5" 
            />
          </div>
          <div className="space-y-2">
            <Label>Email Address</Label>
            <Input
              defaultValue={user.email}
              className="glass bg-white/5"
              readOnly
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Bio</Label>
          <textarea
            className="flex w-full rounded-md border border-white/10 bg-white/5 glass px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[100px]"
            placeholder="Tell us a little about yourself"
          />
        </div>
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="bg-primary text-white hover:bg-primary/90"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}