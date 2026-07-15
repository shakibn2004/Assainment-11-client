import { Campaign } from "@/types";
import { MOCK_CAMPAIGNS } from "../mock/data";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const campaignApi = {
  getCampaigns: async (): Promise<Campaign[]> => {
    await delay(800); // Simulate network latency
    return MOCK_CAMPAIGNS;
  },

  getCampaignById: async (id: string): Promise<Campaign | null> => {
    await delay(500);
    const campaign = MOCK_CAMPAIGNS.find(c => c.id === id);
    return campaign || null;
  },

  getFeaturedCampaigns: async (): Promise<Campaign[]> => {
    await delay(600);
    return MOCK_CAMPAIGNS.filter(c => c.featured);
  }
};
