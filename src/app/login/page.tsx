"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/useAuthStore";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      // In a real app, you would validate credentials here.
      // Since this is a demo, any email will just mock login.
      login(email || "alex@example.com");
      toast.success("Successfully logged in", {
        description: "Welcome back to SparkLift!",
      });
      router.push("/dashboard");
    }, 1000);
  };

  const demoLogin = (mockEmail: string) => {
    login(mockEmail);
    toast.success("Demo Login Successful", {
      description: `Logged in as ${mockEmail}`,
    });
    router.push("/dashboard");
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 blur-[100px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-accent text-white mb-6 shadow-lg shadow-primary/20">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16v16H4z" stroke="none" fill="currentColor" fillOpacity="0.1" />
              <path d="M8 8h8M8 12h5M8 16h8" />
              <path d="M4 12h16" strokeOpacity="0.3" />
            </svg>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
          <p className="text-muted-foreground">Log in to your SparkLift account</p>
        </div>

        <div className="glass-card p-8 rounded-3xl mb-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Email address</Label>
              <Input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com" 
                className="h-12 glass bg-white/5 border-white/10" 
                required 
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Password</Label>
                <Link href="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
              </div>
              <Input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••" 
                className="h-12 glass bg-white/5 border-white/10" 
                required 
              />
            </div>
            
            <Button type="submit" disabled={isLoading} className="w-full h-12 text-md shadow-[0_0_20px_rgba(var(--primary),0.3)]">
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-muted-foreground mb-8">
          Don't have an account? <Link href="/register" className="text-primary hover:underline font-medium">Sign up</Link>
        </p>

        {/* Demo Section for Reviewers */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <p className="text-xs text-center text-muted-foreground mb-4 font-medium uppercase tracking-wider">Demo Accounts (1-Click Login)</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button variant="outline" size="sm" onClick={() => demoLogin("alex@example.com")} className="glass border-white/10 text-xs">
              Supporter
            </Button>
            <Button variant="outline" size="sm" onClick={() => demoLogin("sarah@example.com")} className="glass border-white/10 text-xs">
              Creator
            </Button>
            <Button variant="outline" size="sm" onClick={() => demoLogin("admin@fundbridge.com")} className="glass border-primary/30 text-primary text-xs">
              <ShieldCheck className="w-3 h-3 mr-1" /> Admin
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
