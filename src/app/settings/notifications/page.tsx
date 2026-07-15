"use client";

import { Switch } from "@/components/ui/switch";

export default function NotificationsSettingsPage() {
  return (
    <div className="glass-card p-8">
      <h3 className="text-xl font-bold mb-6">Email Notifications</h3>
      <div className="space-y-6">
        {[
          { title: "Campaign Updates", desc: "Receive updates from campaigns you've backed." },
          { title: "New Rewards", desc: "Get notified when new rewards are added to saved campaigns." },
          { title: "SparkLift Newsletter", desc: "Weekly highlights of the best new projects." },
          { title: "Account Alerts", desc: "Security and account-related alerts (Required)." }
        ].map((notif, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
            <div>
              <p className="font-medium">{notif.title}</p>
              <p className="text-sm text-muted-foreground">{notif.desc}</p>
            </div>
            <Switch defaultChecked={i !== 2} disabled={i === 3} />
          </div>
        ))}
      </div>
    </div>
  );
}
