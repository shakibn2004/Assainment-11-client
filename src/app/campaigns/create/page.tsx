"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, ChevronRight, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { campaignApi } from "@/services/api/campaigns";

export default function CreateCampaignForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  // Store Data of each input field onchange
  const [campTitle, setCampTitle] = useState("");
  const [campTagline, setCampTagline] = useState("");
  const [campCategory, setCampCategory] = useState("Technology");
  const [campFunding, setCampFunding] = useState("");
  const [campDuration, setCampDuration] = useState("30");
  const [campRewardTitle, setCampRewardTitle] = useState("");
  const [campRewardAmount, setCampRewardAmount] = useState("");
  const [campRewardDesc, setCampRewardDesc] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  useEffect(() => {
    if (!isPending) {
      const role = (session?.user as any)?.role?.toLowerCase();
      if (role !== "admin" && role !== "creator") {
        router.push("/");
      }
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step < 3) setStep(step + 1);
    else {
      setIsSubmitting(true);
      try {
        const campaignDetails = {
          title: campTitle,
          tagline: campTagline,
          description: campTagline, // Use tagline as short description
          category: campCategory,
          goalAmount: Number(campFunding),
          daysLeft: Number(campDuration),
          coverImage: coverImage || "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop", // placeholder image if none uploaded
          creatorId: (session?.user as any)?.id || "user-1",
          creatorName: session?.user?.name || "Unknown Creator",
          story: "We are excited to launch this campaign. Thank you for your support!",
          rewards: [
            {
              id: `rew-${Date.now()}`,
              title: campRewardTitle,
              description: campRewardDesc,
              amount: Number(campRewardAmount),
              estimatedDelivery: "Dec 2026",
              claimed: 0
            }
          ]
        };

        const res = await campaignApi.createCampaign(campaignDetails);

        if (!res) {
          throw new Error("Failed to create campaign");
        }

        toast.success("Campaign created successfully!", {
          description: "Your campaign is now under review and will be live soon.",
        });
        router.push("/dashboard");
      } catch (error) {
        toast.error("Failed to create campaign. Please try again.");
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-background flex flex-col items-center">
      <div className="w-full max-w-3xl px-4">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex flex-col items-center ${step >= s ? "text-primary" : "text-muted-foreground"}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-colors ${step > s ? "bg-primary text-white" : step === s ? "bg-primary/20 text-primary border-2 border-primary" : "bg-white/5 border border-white/10"}`}
                >
                  {step > s ? <CheckCircle2 size={20} /> : s}
                </div>
                <span className="text-xs font-medium">
                  {s === 1 ? "Basics" : s === 2 ? "Story & Funding" : "Rewards"}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: "33%" }}
              animate={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Container */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="glass-card p-8 md:p-12"
        >
          <form onSubmit={handleNext} className="space-y-8">
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    Let's start with the basics
                  </h2>
                  <p className="text-muted-foreground">
                    What are you building?
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Project Title</Label>
                    <Input
                      value={campTitle}
                      onChange={(e) => setCampTitle(e.target.value)}
                      placeholder="e.g. Aura: The Smart Ring"
                      className="h-12 glass bg-white/5 border-white/10"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Short Tagline</Label>
                    <Input
                      value={campTagline}
                      onChange={(e) => setCampTagline(e.target.value)}
                      placeholder="One sentence description"
                      className="h-12 glass bg-white/5 border-white/10"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <select
                      value={campCategory}
                      onChange={(e) => setCampCategory(e.target.value)}
                      className="flex h-12 w-full rounded-md border border-white/10 bg-white/5 glass px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option className="bg-background">Technology</option>
                      <option className="bg-background">Design</option>
                      <option className="bg-background">Film & Video</option>
                      <option className="bg-background">Games</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Funding & Media</h2>
                  <p className="text-muted-foreground">
                    Set your goal and upload your project cover.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Funding Goal ($ USD)</Label>
                    <Input
                      type="number"
                      value={campFunding}
                      onChange={(e) => setCampFunding(e.target.value)}
                      placeholder="50000"
                      className="h-12 glass bg-white/5 border-white/10"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Campaign Duration (Days)</Label>
                    <Input
                      type="number"
                      value={campDuration}
                      onChange={(e) => setCampDuration(e.target.value)}
                      placeholder="30"
                      className="h-12 glass bg-white/5 border-white/10"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Cover Image</Label>
                    <div className="relative border-2 border-dashed border-white/20 rounded-xl overflow-hidden flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors bg-white/5 min-h-[200px]">
                      {isUploadingImage ? (
                        <div className="flex flex-col items-center justify-center p-8">
                          <div className="w-8 h-8 rounded-full border-t-2 border-primary animate-spin mb-4"></div>
                          <p className="text-sm text-muted-foreground">Uploading image...</p>
                        </div>
                      ) : coverImage ? (
                        <div className="relative w-full h-full">
                          <Image width={800} height={600} src={coverImage} alt="Cover preview" className="w-full h-full object-cover max-h-[300px]" />
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <Button 
                              type="button"
                              variant="destructive"
                              onClick={() => setCoverImage("")}
                            >
                              Remove Image
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-full h-full p-8 cursor-pointer">
                          <UploadCloud className="w-10 h-10 text-muted-foreground mb-4" />
                          <p className="font-medium">
                            Click to upload cover image
                          </p>
                          <p className="text-xs text-muted-foreground mt-1 mb-4">
                            SVG, PNG, JPG or GIF (max. 5MB)
                          </p>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;

                              setIsUploadingImage(true);
                              try {
                                const formData = new FormData();
                                formData.append("image", file);
                                
                                const key = process.env.NEXT_PUBLIC_IMGBB_KEY;
                                if (!key) throw new Error("ImgBB API key is missing");

                                const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
                                  method: "POST",
                                  body: formData,
                                });
                                
                                const data = await res.json();
                                if (data.success) {
                                  setCoverImage(data.data.url);
                                  toast.success("Image uploaded successfully!");
                                } else {
                                  throw new Error("Upload failed");
                                }
                              } catch (error) {
                                console.error(error);
                                toast.error("Failed to upload image. Please try again.");
                              } finally {
                                setIsUploadingImage(false);
                              }
                            }}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    Create your first reward
                  </h2>
                  <p className="text-muted-foreground">
                    Give backers a reason to support you.
                  </p>
                </div>
                <div className="space-y-4 p-6 border border-white/10 rounded-xl bg-white/5">
                  <div className="space-y-2">
                    <Label>Reward Title</Label>
                    <Input
                      value={campRewardTitle}
                      onChange={(e) => setCampRewardTitle(e.target.value)}
                      placeholder="Early Bird Special"
                      className="glass bg-white/5 border-white/10"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Pledge Amount ($ USD)</Label>
                    <Input
                      type="number"
                      value={campRewardAmount}
                      onChange={(e) => setCampRewardAmount(e.target.value)}
                      placeholder="99"
                      className="glass bg-white/5 border-white/10"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <textarea
                      value={campRewardDesc}
                      onChange={(e) => setCampRewardDesc(e.target.value)}
                      className="flex w-full rounded-md border border-white/10 bg-white/5 glass px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[100px]"
                      placeholder="What's included in this tier?"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="pt-6 flex justify-between items-center border-t border-white/10">
              {step > 1 ? (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep(step - 1)}
                >
                  Back
                </Button>
              ) : (
                <div />
              )}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="px-8 bg-primary hover:bg-primary/90 text-white"
              >
                {step < 3 ? (
                  <>
                    Continue <ChevronRight className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  isSubmitting ? "Launching..." : "Launch Campaign"
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
