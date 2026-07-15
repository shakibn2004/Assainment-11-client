"use client";

import { Button } from "@/components/ui/button";
import { CreditCard, Plus } from "lucide-react";

export default function PaymentSettingsPage() {
  return (
    <div className="glass-card p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Payment Methods</h3>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <Plus className="w-3 h-3" />
          Add Card
        </Button>
      </div>
      
      <div className="space-y-4">
        <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 rounded bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center border border-white/10">
              <CreditCard className="w-5 h-5 text-gray-400" />
            </div>
            <div>
              <p className="font-medium">•••• •••• •••• 4242</p>
              <p className="text-xs text-muted-foreground">Expires 12/28</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-primary bg-primary/20 px-2 py-0.5 rounded-full">Default</span>
            <button className="text-xs text-muted-foreground hover:text-destructive transition-colors">Remove</button>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-white/10 bg-white/5 flex items-center justify-between opacity-70">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 rounded bg-gradient-to-br from-blue-800 to-blue-900 flex items-center justify-center border border-white/10">
              <span className="text-xs font-bold italic text-white">VISA</span>
            </div>
            <div>
              <p className="font-medium">•••• •••• •••• 8888</p>
              <p className="text-xs text-muted-foreground">Expires 09/25</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-xs font-medium text-primary hover:underline">Make Default</button>
            <button className="text-xs text-muted-foreground hover:text-destructive transition-colors">Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
}
