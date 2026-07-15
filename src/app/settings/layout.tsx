"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bell, Shield, CreditCard, User as UserIcon, ArrowLeft } from "lucide-react";
import { ReactNode } from "react";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  const { user } = useAuthStore();
  const pathname = usePathname();

  if (!user) return <div className="min-h-screen pt-24 text-center">Please log in.</div>;

  const links = [
    { id: "profile", label: "Public Profile", icon: UserIcon, href: "/settings" },
    { id: "security", label: "Security", icon: Shield, href: "/settings/security" },
    { id: "notifications", label: "Notifications", icon: Bell, href: "/settings/notifications" },
    { id: "payment", label: "Payment Methods", icon: CreditCard, href: "/settings/payment" },
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard" className="p-2 rounded-full hover:bg-foreground/5 text-muted-foreground hover:text-foreground transition-colors group">
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          </Link>
          <h1 className="text-3xl font-bold">Account Settings</h1>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Responsive Navigation: Horizontal scrolling on mobile, Sidebar on desktop */}
          <div className="w-full md:w-64 flex md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 scrollbar-hide shrink-0">
            {links.map(item => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.id}
                  href={item.href}
                  className={`flex-shrink-0 md:w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive ? "bg-primary/20 text-primary" : "hover:bg-foreground/5 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="whitespace-nowrap">{item.label}</span>
                </Link>
              );
            })}
          </div>
          
          {/* Main Settings Content */}
          <div className="flex-1 space-y-8 min-w-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
