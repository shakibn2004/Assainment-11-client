"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

export default function ProfileSettingsPage() {
  const { data: session, isPending, error } = authClient.useSession();
  let user = session?.user;
  if (!user) return null;

  return (
    <div className="glass-card p-8">
      <h3 className="text-xl font-bold mb-6">Profile Information</h3>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input defaultValue={user.name} className="glass bg-white/5" />
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
        <Button className="bg-primary text-white hover:bg-primary/90">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
