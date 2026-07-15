import { ArrowUpRight, Users, Eye, TrendingUp } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <select className="glass bg-white/5 border border-white/10 text-sm rounded-lg px-3 py-2 outline-none">
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
          <option>All Time</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: "$165,700", change: "+12.5%", icon: TrendingUp },
          { label: "Total Backers", value: "1,717", change: "+8.2%", icon: Users },
          { label: "Page Views", value: "45.2K", change: "+24.1%", icon: Eye },
          { label: "Conversion Rate", value: "3.8%", change: "-1.2%", icon: ArrowUpRight, negative: true },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-primary/20 rounded-lg">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <span className={`text-xs font-medium ${stat.negative ? 'text-red-400' : 'text-green-400'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-white/10">
        <h3 className="text-lg font-bold mb-6">Traffic Sources (Mock)</h3>
        <div className="space-y-4">
          {[
            { source: "Direct", percentage: 45, color: "bg-primary" },
            { source: "Social Media", percentage: 30, color: "bg-blue-500" },
            { source: "Referral", percentage: 15, color: "bg-purple-500" },
            { source: "Organic Search", percentage: 10, color: "bg-green-500" },
          ].map((item, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{item.source}</span>
                <span className="text-muted-foreground">{item.percentage}%</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2">
                <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.percentage}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
