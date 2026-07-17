export type UserRole = "SUPPORTER" | "CREATOR" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  joinedAt: string;
}

export interface Campaign {
  id: string;
  title: string;
  tagline: string;
  description: string;
  creatorId: string;
  creatorName: string;
  category: string;
  coverImage: string;
  goalAmount: number;
  currentAmount: number;
  backersCount: number;
  daysLeft: number;
  status: "ACTIVE" | "COMPLETED" | "DRAFT" | "REJECTED" | "PENDING";
  rewards: Reward[];
  story: string;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  amount: number;
  estimatedDelivery: string;
  stock?: number;
  claimed: number;
}

export interface Contribution {
  id: string;
  campaignId: string;
  userId: string;
  amount: number;
  rewardId?: string;
  date: string;
  status: "SUCCESS" | "PENDING" | "FAILED";
}
