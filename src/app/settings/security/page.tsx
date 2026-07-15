"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SecuritySettingsPage() {
  return (
    <div className="glass-card p-8">
      <h3 className="text-xl font-bold mb-6">Security & Password</h3>
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Current Password</Label>
            <Input type="password" placeholder="Enter current password" className="glass bg-white/5 max-w-md" />
          </div>
          <div className="space-y-2">
            <Label>New Password</Label>
            <Input type="password" placeholder="Enter new password" className="glass bg-white/5 max-w-md" />
          </div>
          <div className="space-y-2">
            <Label>Confirm New Password</Label>
            <Input type="password" placeholder="Confirm new password" className="glass bg-white/5 max-w-md" />
          </div>
        </div>
        <div className="pt-2">
          <Button className="bg-primary text-white hover:bg-primary/90">Update Password</Button>
        </div>

        <div className="border-t border-white/10 pt-6 mt-6">
          <h4 className="text-lg font-semibold mb-2">Two-Factor Authentication</h4>
          <p className="text-sm text-muted-foreground mb-4">Add an extra layer of security to your account.</p>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">Enable 2FA</Button>
        </div>
      </div>
    </div>
  );
}
