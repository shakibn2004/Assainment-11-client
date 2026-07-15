"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Activity, Users, ShieldAlert } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: 'Mon', revenue: 4000, active: 2400 },
  { name: 'Tue', revenue: 3000, active: 1398 },
  { name: 'Wed', revenue: 2000, active: 9800 },
  { name: 'Thu', revenue: 2780, active: 3908 },
  { name: 'Fri', revenue: 1890, active: 4800 },
  { name: 'Sat', revenue: 2390, active: 3800 },
  { name: 'Sun', revenue: 3490, active: 4300 },
];

export function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Admin Overview</h1>
        <p className="text-muted-foreground">Platform statistics and management console.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Revenue", value: "$4.2M", icon: BarChart, trend: "+12%" },
          { title: "Active Campaigns", value: "2,845", icon: Activity, trend: "+5%" },
          { title: "Total Users", value: "142.3K", icon: Users, trend: "+18%" },
          { title: "Pending Approvals", value: "14", icon: ShieldAlert, trend: "-2", textClass: "text-amber-500" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Card className="glass-card bg-card/40">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.textClass || "text-muted-foreground"}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-primary font-medium mt-1">
                  {stat.trend} from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="glass-card p-6"
      >
        <h3 className="text-lg font-semibold mb-6">Revenue & Activity</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px' }}
                itemStyle={{ color: 'var(--foreground)' }}
              />
              <Line type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="active" stroke="var(--accent)" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
