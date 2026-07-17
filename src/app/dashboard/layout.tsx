"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Wallet,
  Settings,
  Heart,
  BarChart,
  Users,
  Bell,
  ShieldCheck,
  FolderKanban,
  Menu,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";

// RoleLinks constant hisebe define kora holo
const ROLE_LINKS = {
  SUPPORTER: [
    { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Backed Projects", icon: Heart, href: "/dashboard/backed-projects" },
    { name: "Rewards", icon: Wallet, href: "/dashboard/rewards" },
  ],
  CREATOR: [
    { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    { name: "My Campaigns", icon: FolderKanban, href: "/dashboard/campaigns" },
    { name: "Analytics", icon: BarChart, href: "/dashboard/analytics" },
    { name: "Payouts", icon: Wallet, href: "/dashboard/payouts" },
  ],
  ADMIN: [
    { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Platform Stats", icon: BarChart, href: "/dashboard/stats" },
    { name: "Approvals", icon: ShieldCheck, href: "/dashboard/approvals" },
    { name: "Users", icon: Users, href: "/dashboard/users" },
  ],
} as const;

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isPending && !session) {
      router.push("/login");
    }
  }, [mounted, isPending, session, router]);

  if (!mounted) return null;

  // STRICT NULL CHECK: session evong session.user dutoi check kora hocche
  if (!session || !session.user) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 min-h-[calc(100vh-80px)]">
        <div className="glass-card p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
          <p className="text-muted-foreground mb-6">
            You need to be logged in to view the dashboard.
          </p>
        </div>
      </div>
    );
  }

  // Ekhon TypeScript 100% sure je session.user exist kore
  const user = session.user;
  
  // Safe type casting for role (Bypasses TS error if 'role' isn't explicitly in the User type)
  const userRole = ((user as Record<string, any>).role as keyof typeof ROLE_LINKS) || "SUPPORTER";
  const links = ROLE_LINKS[userRole] || ROLE_LINKS.SUPPORTER;

  // React anti-pattern (nested component) erate simple function use kora holo
  const renderNavContent = () => (
    <div className="p-6 h-full flex flex-col">
      <div className="mb-8">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Role
        </h3>
        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary">
          {userRole}
        </div>
      </div>

      <nav className="space-y-1 flex-1">
        {links.map((link) => {
          // Assert Icon as a React element type so TS doesn't complain about rendering it
          const Icon = link.icon as React.ElementType;
          return (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
            >
              <Icon className="w-4 h-4" />
              {link.name}
            </Link>
          );
        })}

        <div className="pt-8 mt-8 border-t border-border dark:border-white/10 space-y-1">
          <Link
            href="/settings"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
          >
            <Settings className="w-4 h-4" />
            Settings
          </Link>
          <Link
            href="/settings/notifications"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
          >
            <Bell className="w-4 h-4" />
            Notifications
          </Link>
        </div>
      </nav>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col bg-background relative">
      <div className="md:hidden sticky top-20 z-40 w-full glass border-b border-border dark:border-white/10 px-4 py-3 flex items-center justify-between">
        <span className="font-semibold text-foreground">Dashboard</span>
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger className="h-8 px-3 flex items-center justify-center rounded-md hover:bg-foreground/10 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20">
            <Menu className="w-5 h-5 mr-2" />
            Menu
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[280px] p-0 glass-panel border-r border-border dark:border-white/10"
          >
            <SheetTitle className="sr-only">Dashboard Navigation</SheetTitle>
            {renderNavContent()}
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex-1 flex flex-row relative h-[calc(100vh-5rem)] md:h-auto">
        <aside className="hidden md:block w-64 glass border-r border-border dark:border-white/10 flex-shrink-0 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
          {renderNavContent()}
        </aside>

        <main className="flex-1 p-4 md:p-10 overflow-y-auto h-[calc(100vh-5rem-3.5rem)] md:h-auto">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}