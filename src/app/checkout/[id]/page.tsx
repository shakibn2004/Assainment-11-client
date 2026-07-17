"use client";
import Image from "next/image";

import { use, useEffect, useState, Suspense } from "react";
import { campaignApi } from "@/services/api/campaigns";
import { Campaign } from "@/types";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  AddressElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

function CheckoutForm({
  campaign,
  amount,
  clientSecret,
}: {
  campaign: Campaign;
  amount: number;
  clientSecret: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/dashboard`,
      },
      redirect: "if_required",
    });

    if (error) {
      toast.error(error.message || "An unexpected error occurred.");
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      try {
        await campaignApi.updateCampaign(campaign.id, {
          currentAmount: (campaign.currentAmount || 0) + amount,
          backersCount: (campaign.backersCount || 0) + 1,
        });

        toast.success("Payment successful!", {
          description: `Thank you for supporting ${campaign.title}.`,
        });
        router.push("/dashboard");
      } catch (err) {
        toast.error("Failed to update campaign, but payment succeeded.");
      }
    }
  };

  return (
    <form onSubmit={handlePayment} className="space-y-8">
      <div className="glass-card p-8 space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Shipping Information</h3>
          <AddressElement options={{ mode: 'shipping' }} />
        </div>
        
        <div className="pt-6 border-t border-white/10">
          <h3 className="text-xl font-bold mb-4">Payment Details</h3>
          <PaymentElement />
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground p-4 bg-primary/10 rounded-xl border border-primary/20">
        <ShieldCheck className="w-8 h-8 text-primary shrink-0" />
        <p>
          SparkLift uses industry-standard encryption to protect your personal
          and payment information. We never store your full credit card
          details.
        </p>
      </div>

      <Button
        type="submit"
        disabled={isProcessing || !stripe || !elements}
        className="w-full h-14 text-lg font-bold shadow-[0_0_20px_rgba(var(--primary),0.3)]"
      >
        {isProcessing ? "Processing..." : `Pay $${amount.toLocaleString()}`}
      </Button>
    </form>
  );
}

function CheckoutContent({ id }: { id: string }) {
  const searchParams = useSearchParams();
  const rewardId = searchParams.get("reward");

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [rewardTitle, setRewardTitle] = useState("Custom Pledge");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    campaignApi.getCampaignById(id).then((found) => {
      if (!found) {
        notFound();
        return;
      }
      setCampaign(found);

      // Determine amount
      let orderTotal = 50; // default $50 pledge
      let rTitle = "Custom Pledge";
      if (rewardId) {
        const reward = found.rewards?.find((r) => r.id === rewardId);
        if (reward) {
          orderTotal = reward.amount;
          rTitle = reward.title;
        }
      }
      // Add flat $15 shipping if it's a reward (simplified logic)
      if (rewardId) {
        orderTotal += 15;
      }
      setAmount(orderTotal);
      setRewardTitle(rTitle);

      // Fetch Payment Intent
      if (found.status === 'ACTIVE') {
        fetch(`${process.env.NEXT_PUBLIC_LOCAL_URI || 'http://localhost:8000'}/create-payment-intent`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: orderTotal * 100 }), // Stripe expects cents
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.clientSecret) {
              setClientSecret(data.clientSecret);
            } else {
              toast.error("Failed to initialize payment.");
            }
            setLoading(false);
          })
          .catch(() => {
            toast.error("Failed to connect to payment server.");
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, [id, rewardId]);

  if (!campaign) return null;

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-8">
          <Link
            href={`/campaign/${campaign.id}`}
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Campaign
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {campaign.status !== "ACTIVE" ? (
            <div className="flex-1 text-center py-24 glass-card">
              <h2 className="text-2xl font-bold mb-4">This campaign is not active</h2>
              <p className="text-muted-foreground mb-8">
                You cannot process payments for a campaign that is currently {campaign.status.toLowerCase()}.
              </p>
              <Link
                href={`/campaign/${campaign.id}`}
                className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors"
              >
                Return to Campaign
              </Link>
            </div>
          ) : (
            <>
              {/* Left Column: Payment Form */}
              <div className="flex-1 space-y-8">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Complete your contribution</h1>
                  <p className="text-muted-foreground">
                    You're supporting {campaign.title} by {campaign.creatorName}
                  </p>
                </div>
                {loading ? (
                  <div className="py-24 text-center text-muted-foreground">Initializing secure payment...</div>
                ) : clientSecret ? (
                  <Elements
                    stripe={stripePromise}
                    options={{
                      clientSecret,
                      appearance: {
                        theme: "night",
                        variables: {
                          colorPrimary: "#0ea5e9", // Adjust based on your primary
                          colorBackground: "#09090b",
                          colorText: "#ffffff",
                        },
                      },
                    }}
                  >
                    <CheckoutForm campaign={campaign} amount={amount} clientSecret={clientSecret} />
                  </Elements>
                ) : (
                  <div className="py-24 text-center text-red-500">Failed to load payment form. Please try again later.</div>
                )}
                {!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-sm">
                    <strong>Developer Error:</strong> NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is missing from the client environment. You MUST restart the frontend Next.js server (`npm run dev`) to pick up the new keys from `.env.local`.
                  </div>
                )}
              </div>

              {/* Right Column: Order Summary */}
              <div className="w-full lg:w-[400px] shrink-0">
                <div className="sticky top-28 glass-card p-6 border-primary/20">
                  <h3 className="text-lg font-bold mb-6">Order Summary</h3>

                  <div className="flex gap-4 mb-6 pb-6 border-b border-border dark:border-white/10">
                    <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                      <Image
                        width={800}
                        height={600}
                        src={campaign.coverImage}
                        className="w-full h-full object-cover"
                        alt="Campaign"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-sm line-clamp-2">{campaign.title}</p>
                      <p className="text-muted-foreground text-xs mt-1">{campaign.creatorName}</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-sm mb-6 pb-6 border-b border-border dark:border-white/10">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Reward: {rewardTitle}</span>
                      <span className="font-medium">
                        ${rewardId ? (amount - 15).toLocaleString() : amount.toLocaleString()}
                      </span>
                    </div>
                    {rewardId && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="font-medium">$15.00</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Taxes</span>
                      <span className="font-medium">$0.00</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-2xl font-bold text-primary">${amount.toLocaleString()}</span>
                  </div>

                  <p className="text-xs text-muted-foreground text-center">
                    By confirming your payment, you agree to SparkLift's Terms of Use and Privacy Policy.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);

  return (
    <Suspense fallback={<div className="min-h-screen pt-24 text-center">Loading checkout...</div>}>
      <CheckoutContent id={resolvedParams.id} />
    </Suspense>
  );
}
