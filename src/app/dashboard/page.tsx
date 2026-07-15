"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";
import { CreatorDashboard } from "@/components/dashboard/CreatorDashboard";
import { SupporterDashboard } from "@/components/dashboard/SupporterDashboard";

export default function DashboardPage() {
  const { user } = useAuthStore();

  if (!user) return null;

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
