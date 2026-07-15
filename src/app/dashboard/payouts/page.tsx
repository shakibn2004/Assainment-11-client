import { Badge } from "@/components/ui/badge";
import { ArrowDownLeft, CheckCircle, Clock } from "lucide-react";

const mockPayouts = [
  {
    id: "PO-0091",
    date: "July 12, 2026",
    amount: 14500.00,
    destination: "Chase Bank ****4242",
    status: "Completed"
  },
  {
    id: "PO-0092",
    date: "July 15, 2026",
    amount: 3200.50,
    destination: "Chase Bank ****4242",
    status: "Processing"
  }
];

export default function PayoutsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Payouts</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-panel p-6 rounded-2xl md:col-span-2 bg-gradient-to-br from-primary/20 to-accent/20 border-primary/30">
          <p className="text-sm font-medium mb-1 text-primary-foreground/80">Available Balance</p>
          <h2 className="text-4xl font-bold mb-4">$12,450.00</h2>
          <button className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
            Withdraw Funds
          </button>
        </div>
        <div className="glass-panel p-6 rounded-2xl flex flex-col justify-center">
          <p className="text-sm font-medium mb-1 text-muted-foreground">Total Withdrawn</p>
          <h2 className="text-2xl font-bold">$45,200.00</h2>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-4">Transaction History</h3>
      <div className="glass-panel overflow-hidden rounded-xl border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-medium text-muted-foreground">Transaction ID</th>
                <th className="px-6 py-4 font-medium text-muted-foreground">Date</th>
                <th className="px-6 py-4 font-medium text-muted-foreground">Amount</th>
                <th className="px-6 py-4 font-medium text-muted-foreground">Destination</th>
                <th className="px-6 py-4 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockPayouts.map((payout) => (
                <tr key={payout.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-muted-foreground">
                    {payout.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {payout.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-foreground flex items-center gap-2">
                    <ArrowDownLeft className="w-4 h-4 text-green-400" />
                    ${payout.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                    {payout.destination}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="outline" className={`
                      ${payout.status === 'Completed' ? 'border-green-500 text-green-500' : ''}
                      ${payout.status === 'Processing' ? 'border-yellow-500 text-yellow-500' : ''}
                    `}>
                      {payout.status === 'Completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {payout.status === 'Processing' && <Clock className="w-3 h-3 mr-1" />}
                      {payout.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
