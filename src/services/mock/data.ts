import { Campaign, User } from "@/types";

export const MOCK_USERS: User[] = [
  {
    id: "user-1",
    name: "Alex Supporter",
    email: "alex@example.com",
    role: "SUPPORTER",
    avatarUrl: "https://i.pravatar.cc/150?u=user-1",
    joinedAt: "2023-01-15T10:00:00Z",
  },
  {
    id: "user-2",
    name: "Sarah Creator",
    email: "sarah@example.com",
    role: "CREATOR",
    avatarUrl: "https://i.pravatar.cc/150?u=user-2",
    joinedAt: "2022-11-20T14:30:00Z",
  },
  {
    id: "user-3",
    name: "Admin Boss",
    email: "admin@fundbridge.com",
    role: "ADMIN",
    avatarUrl: "https://i.pravatar.cc/150?u=user-3",
    joinedAt: "2021-05-01T09:00:00Z",
  }
];

export const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: "camp-1",
    title: "Aura: The Next Generation Smart Ring",
    tagline: "Track your health, sleep, and activity with the most elegant smart ring ever designed.",
    description: "Aura is a beautifully crafted titanium smart ring that blends seamlessly into your life while providing clinical-grade health metrics.",
    creatorId: "user-2",
    creatorName: "Sarah Creator",
    category: "Technology",
    coverImage: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2072&auto=format&fit=crop",
    goalAmount: 50000,
    currentAmount: 125000,
    backersCount: 845,
    daysLeft: 12,
    status: "ACTIVE",
    featured: true,
    story: "We designed Aura because we were tired of bulky smartwatches...",
    rewards: [
      {
        id: "rew-1",
        title: "Early Bird Aura",
        description: "Get one Aura ring at 40% off retail price.",
        amount: 199,
        estimatedDelivery: "Dec 2026",
        stock: 500,
        claimed: 450,
      },
      {
        id: "rew-2",
        title: "Aura Duo",
        description: "Two Aura rings for you and your partner.",
        amount: 350,
        estimatedDelivery: "Dec 2026",
        claimed: 120,
      }
    ]
  },
  {
    id: "camp-2",
    title: "Nomad Minimalist Backpack",
    tagline: "The ultimate travel companion built from recycled ocean plastics.",
    description: "Waterproof, lightweight, and incredibly durable. Designed for the modern digital nomad.",
    creatorId: "user-4",
    creatorName: "EcoGear Co.",
    category: "Design",
    coverImage: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=2072&auto=format&fit=crop",
    goalAmount: 20000,
    currentAmount: 15400,
    backersCount: 120,
    daysLeft: 25,
    status: "ACTIVE",
    story: "Every year, millions of tons of plastic enter our oceans...",
    rewards: [
      {
        id: "rew-3",
        title: "Nomad Backpack",
        description: "One Nomad Minimalist Backpack in stealth black.",
        amount: 120,
        estimatedDelivery: "Oct 2026",
        claimed: 120,
      }
    ]
  },
  {
    id: "camp-3",
    title: "Lumina: AI Desktop Lamp",
    tagline: "A lamp that adjusts to your circadian rhythm and focus levels.",
    description: "Using advanced sensors, Lumina adjusts its color temperature and brightness to optimize your productivity.",
    creatorId: "user-5",
    creatorName: "LightWorks",
    category: "Technology",
    coverImage: "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1987&auto=format&fit=crop",
    goalAmount: 100000,
    currentAmount: 340000,
    backersCount: 2100,
    daysLeft: 3,
    status: "ACTIVE",
    featured: true,
    story: "Good lighting is the foundation of good work...",
    rewards: [
      {
        id: "rew-4",
        title: "Lumina Standard",
        description: "One Lumina AI Lamp.",
        amount: 149,
        estimatedDelivery: "Jan 2027",
        claimed: 1500,
      }
    ]
  }
];
