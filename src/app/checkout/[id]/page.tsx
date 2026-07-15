"use client";

import { use, useEffect, useState } from "react";
import { MOCK_CAMPAIGNS } from "@/services/mock/data";
import { Campaign } from "@/types";
import { notFound, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";

export default function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { user } = useAuthStore();
  const router = useRouter();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  useEffect(() => {
    const found = MOCK_CAMPAIGNS.find(c => c.id === resolvedParams.id);
    if (!found) notFound();
    setCampaign(found);
  }, [resolvedParams.id]);

  if (!campaign) return null;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Mock processing
    setTimeout(() => {
      setIsProcessing(false);
      router.push("/dashboard"); // Route back to supporter dashboard after success
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-8">
          <Link href={`/campaign/${campaign.id}`} className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Campaign
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column: Payment Form */}
          <div className="flex-1 space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Complete your contribution</h1>
              <p className="text-muted-foreground">You're supporting {campaign.title} by {campaign.creatorName}</p>
            </div>

            <form onSubmit={handlePayment} className="space-y-8">
              {/* Shipping Address */}
              <div className="glass-card p-8">
                <h3 className="text-xl font-bold mb-6">Shipping Address</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>First Name</Label>
                      <Input placeholder="John" className="h-12 glass bg-foreground/5 dark:bg-white/5 border-border dark:border-white/10" required />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Name</Label>
                      <Input placeholder="Doe" className="h-12 glass bg-foreground/5 dark:bg-white/5 border-border dark:border-white/10" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Street Address</Label>
                    <Input placeholder="123 Main St" className="h-12 glass bg-foreground/5 dark:bg-white/5 border-border dark:border-white/10" required />
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="space-y-2 md:col-span-1">
                      <Label>City</Label>
                      <Input placeholder="New York" className="h-12 glass bg-foreground/5 dark:bg-white/5 border-border dark:border-white/10" required />
                    </div>
                    <div className="space-y-2 md:col-span-1">
                      <Label>State / Province</Label>
                      <Input placeholder="NY" className="h-12 glass bg-foreground/5 dark:bg-white/5 border-border dark:border-white/10" required />
                    </div>
                    <div className="space-y-2 md:col-span-1">
                      <Label>ZIP / Postal Code</Label>
                      <Input placeholder="10001" className="h-12 glass bg-foreground/5 dark:bg-white/5 border-border dark:border-white/10" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Country</Label>
                    <select className="flex h-12 w-full rounded-md border border-border dark:border-white/10 bg-foreground/5 dark:bg-white/5 glass px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      <option className="bg-background">United States</option>
                      <option className="bg-background">United Kingdom</option>
                      <option className="bg-background">Canada</option>
                      <option className="bg-background">Australia</option>
                      <option className="bg-background">Germany</option>
                      <option className="bg-background">France</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="glass-card p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Secure Checkout</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  You will be redirected to Stripe's secure payment gateway to complete your transaction. No payment information is stored on our servers.
                </p>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground p-4 bg-primary/10 rounded-xl border border-primary/20">
                <ShieldCheck className="w-8 h-8 text-primary shrink-0" />
                <p>SparkLift uses industry-standard encryption to protect your personal and payment information. We never store your full credit card details.</p>
              </div>

              <Button type="submit" disabled={isProcessing} className="w-full h-14 text-lg font-bold shadow-[0_0_20px_rgba(var(--primary),0.3)]">
                {isProcessing ? "Redirecting to Stripe..." : "Proceed to Payment"}
              </Button>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="w-full lg:w-[400px] shrink-0">
            <div className="sticky top-28 glass-card p-6 border-primary/20">
              <h3 className="text-lg font-bold mb-6">Order Summary</h3>
              
              <div className="flex gap-4 mb-6 pb-6 border-b border-border dark:border-white/10">
                <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                  <img src={campaign.coverImage} className="w-full h-full object-cover" alt="Campaign" />
                </div>
                <div>
                  <p className="font-semibold text-sm line-clamp-2">{campaign.title}</p>
                  <p className="text-muted-foreground text-xs mt-1">{campaign.creatorName}</p>
                </div>
              </div>

              <div className="space-y-4 text-sm mb-6 pb-6 border-b border-border dark:border-white/10">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reward: Early Bird</span>
                  <span className="font-medium">$199.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">$15.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxes</span>
                  <span className="font-medium">$0.00</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold text-primary">$214.00</span>
              </div>
              
              <p className="text-xs text-muted-foreground text-center">
                By confirming your payment, you agree to SparkLift's Terms of Use and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
