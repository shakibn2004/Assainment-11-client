"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";

import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    const { name, email, password } = userData;

    const { data, error } = await authClient.signUp.email(
      {
        name,
        email,
        password,
        role: 'ADMIN',
      },
      {
        onSuccess: () => {
          router.push("/dashboard");
          toast.success("Account created successfully", {
            description: "Welcome to SparkLift!",
          });
          setIsLoading(false);
        },
        onError: (ctx) => {
          toast.success(ctx.error.message, {});
          setIsLoading(false);
        },
      },
    );
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col md:flex-row items-center justify-center relative overflow-hidden">
      {/* Decorative Left Side */}
      <div className="hidden md:flex flex-1 flex-col justify-center p-12 lg:p-24 relative z-10 border-r border-white/10 bg-background/50 backdrop-blur-3xl min-h-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Join the revolution.
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            SparkLift is the most elegant way to bring your boldest ideas to
            life.
          </p>

          <div className="space-y-6">
            {[
              "0% platform fees on your first $10k raised",
              "Exclusive access to the Creator Network",
              "Premium analytics and post-campaign tools",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <CheckCircle2 size={18} />
                </div>
                <p className="font-medium text-foreground/90">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 w-full max-w-xl p-8 lg:p-24 relative z-10 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="text-left mb-8">
            <h1 className="text-3xl font-bold mb-2">Create an account</h1>
            <p className="text-muted-foreground">
              Start backing or creating projects today.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl mb-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input
                  type="text"
                  value={name}
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="h-12 glass bg-white/5 border-white/10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Email address</Label>
                <Input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="h-12 glass bg-white/5 border-white/10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  value={password}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="h-12 glass bg-white/5 border-white/10"
                  required
                  minLength={8}
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 text-md shadow-[0_0_20px_rgba(var(--primary),0.3)] mt-2"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
