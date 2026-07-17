import { Campaign } from "@/types";


const API_URL = process.env.NEXT_PUBLIC_LOCAL_URI || 'http://localhost:8000';

export const campaignApi = {
  getCampaigns: async (filters?: { status?: string }): Promise<Campaign[]> => {
    try {
      let url = `${API_URL}/campaigns`;
      if (filters?.status) {
        url += `?status=${filters.status}`;
      }
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch campaigns');
      return await res.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  getCampaignsByCreator: async (creatorId: string): Promise<Campaign[]> => {
    try {
      const res = await fetch(`${API_URL}/campaigns?creatorId=${creatorId}`);
      if (!res.ok) throw new Error('Failed to fetch creator campaigns');
      return await res.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  getCampaignById: async (id: string): Promise<Campaign | null> => {
    try {
      const res = await fetch(`${API_URL}/campaigns/${id}`);
      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error('Failed to fetch campaign');
      }
      return await res.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  getFeaturedCampaigns: async (): Promise<Campaign[]> => {
    try {
      const res = await fetch(`${API_URL}/campaigns?featured=true`);
      if (!res.ok) throw new Error('Failed to fetch featured campaigns');
      return await res.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  createCampaign: async (data: Omit<Campaign, 'id' | 'currentAmount' | 'backersCount' | 'status'>): Promise<Campaign> => {
    const res = await fetch(`${API_URL}/campaigns`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        currentAmount: 0,
        backersCount: 0,
        status: "DRAFT",
      }),
    });
    if (!res.ok) throw new Error('Failed to create campaign');
    return await res.json();
  },

  updateCampaign: async (id: string, data: Partial<Campaign>): Promise<Campaign> => {
    const res = await fetch(`${API_URL}/campaigns/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update campaign');
    return await res.json();
  },

  deleteCampaign: async (id: string): Promise<void> => {
    const res = await fetch(`${API_URL}/campaigns/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error('Failed to delete campaign');
  }
};
