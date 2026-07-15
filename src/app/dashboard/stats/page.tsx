import { Activity, DollarSign, Users, Target } from "lucide-react";

export default function PlatformStatsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Platform Statistics</h1>
        <div className="flex items-center gap-2 bg-green-500/10 text-green-500 px-3 py-1.5 rounded-full text-sm font-medium border border-green-500/20">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          System Operational
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Volume", value: "$2,450,000", change: "+15.2%", icon: DollarSign },
          { label: "Active Users", value: "14,200", change: "+5.1%", icon: Users },
          { label: "Live Campaigns", value: "342", change: "+12.4%", icon: Target },
          { label: "Server Load", value: "24%", change: "-2.1%", icon: Activity, negative: true },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-primary/5 rounded-full transition-transform group-hover:scale-150 duration-500"></div>
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                <stat.icon className="w-5 h-5 text-muted-foreground" />
              </div>
              <span className={`text-xs font-medium ${stat.negative ? 'text-green-400' : 'text-green-400'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-sm font-medium text-muted-foreground mb-1 relative z-10">{stat.label}</p>
            <h3 className="text-3xl font-bold relative z-10">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-8 rounded-2xl border border-white/10">
          <h3 className="text-lg font-bold mb-6">Revenue Growth (Q3)</h3>
          <div className="flex items-end gap-2 h-48 mt-4">
            {[40, 55, 45, 70, 65, 85, 100].map((height, i) => (
              <div key={i} className="flex-1 bg-primary/20 hover:bg-primary/40 transition-colors rounded-t-md relative group cursor-pointer" style={{ height: `${height}%` }}>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs py-1 px-2 rounded">
                  ${height}k
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-muted-foreground">
            <span>Jul 1</span>
            <span>Jul 15</span>
            <span>Aug 1</span>
          </div>
        </div>
        
        <div className="glass-panel p-8 rounded-2xl border border-white/10">
          <h3 className="text-lg font-bold mb-6">Recent Activity Logs</h3>
          <div className="space-y-4">
            {[
              { text: "New campaign 'EcoSphere' submitted for review.", time: "2 mins ago" },
              { text: "Payout PO-0091 processed successfully.", time: "15 mins ago" },
              { text: "User 'johndoe' escalated a support ticket.", time: "1 hour ago" },
              { text: "System backup completed.", time: "3 hours ago" },
              { text: "Database optimization finished.", time: "5 hours ago" }
            ].map((log, i) => (
              <div key={i} className="flex justify-between items-start text-sm border-b border-white/5 pb-3 last:border-0 last:pb-0">
                <span className="text-foreground">{log.text}</span>
                <span className="text-muted-foreground whitespace-nowrap ml-4 text-xs">{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
