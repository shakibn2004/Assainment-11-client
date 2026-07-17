"use client";

import { AdminDashboard } from "@/components/dashboard/AdminDashboard";
import { CreatorDashboard } from "@/components/dashboard/CreatorDashboard";
import { SupporterDashboard } from "@/components/dashboard/SupporterDashboard";
import { authClient } from "@/lib/auth-client";
import { User } from "@/types";

export default function DashboardPage() {
  const { data: session, isPending, error } = authClient.useSession();
  if (!session) return null;

  const user = session.user as unknown as User;
  
  switch (user.role) {
    case "ADMIN":
      return <AdminDashboard />;
    case "CREATOR":
      return <CreatorDashboard />;
    case "SUPPORTER":
    default:
      return <SupporterDashboard />;
  }
}
