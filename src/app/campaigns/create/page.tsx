"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, ChevronRight, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CreateCampaignForm() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
    else {
      // Mock submit
      toast.success("Campaign created successfully!", {
        description: "Your campaign is now under review and will be live soon."
      });
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-background flex flex-col items-center">
      <div className="w-full max-w-3xl px-4">
        
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className={`flex flex-col items-center ${step >= s ? "text-primary" : "text-muted-foreground"}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-colors ${step > s ? "bg-primary text-white" : step === s ? "bg-primary/20 text-primary border-2 border-primary" : "bg-white/5 border border-white/10"}`}>
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
                  <h2 className="text-3xl font-bold mb-2">Let's start with the basics</h2>
                  <p className="text-muted-foreground">What are you building?</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Project Title</Label>
                    <Input placeholder="e.g. Aura: The Smart Ring" className="h-12 glass bg-white/5 border-white/10" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Short Tagline</Label>
                    <Input placeholder="One sentence description" className="h-12 glass bg-white/5 border-white/10" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <select className="flex h-12 w-full rounded-md border border-white/10 bg-white/5 glass px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
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
                  <p className="text-muted-foreground">Set your goal and upload your project cover.</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Funding Goal ($ USD)</Label>
                    <Input type="number" placeholder="50000" className="h-12 glass bg-white/5 border-white/10" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Campaign Duration (Days)</Label>
                    <Input type="number" placeholder="30" defaultValue="30" className="h-12 glass bg-white/5 border-white/10" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Cover Image</Label>
                    <div className="border-2 border-dashed border-white/20 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors cursor-pointer bg-white/5">
                      <UploadCloud className="w-10 h-10 text-muted-foreground mb-4" />
                      <p className="font-medium">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Create your first reward</h2>
                  <p className="text-muted-foreground">Give backers a reason to support you.</p>
                </div>
                <div className="space-y-4 p-6 border border-white/10 rounded-xl bg-white/5">
                  <div className="space-y-2">
                    <Label>Reward Title</Label>
                    <Input placeholder="Early Bird Special" className="glass bg-white/5 border-white/10" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Pledge Amount ($ USD)</Label>
                    <Input type="number" placeholder="99" className="glass bg-white/5 border-white/10" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <textarea 
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
                <Button type="button" variant="ghost" onClick={() => setStep(step - 1)}>
                  Back
                </Button>
              ) : (
                <div />
              )}
              <Button type="submit" className="px-8 bg-primary hover:bg-primary/90 text-white">
                {step < 3 ? (
                  <>Continue <ChevronRight className="w-4 h-4 ml-2" /></>
                ) : (
                  "Launch Campaign"
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
