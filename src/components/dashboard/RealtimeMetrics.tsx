import { useEffect, useState } from "react";
import { Activity, Scan, Package, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface Metric {
  label: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  color: string;
}

export function RealtimeMetrics() {
  const [metrics, setMetrics] = useState<Metric[]>([
    {
      label: "Scans actifs",
      value: 1450,
      unit: "aujourd'hui",
      icon: <Scan className="h-4 w-4" />,
      color: "text-[hsl(var(--nature-primary))]",
    },
    {
      label: "Produits traités",
      value: 48,
      unit: "cette heure",
      icon: <Package className="h-4 w-4" />,
      color: "text-[hsl(var(--accent))]",
    },
    {
      label: "Utilisateurs actifs",
      value: 127,
      unit: "en ligne",
      icon: <Users className="h-4 w-4" />,
      color: "text-[hsl(var(--nature-secondary))]",
    },
    {
      label: "Transactions",
      value: 89,
      unit: "en cours",
      icon: <Activity className="h-4 w-4" />,
      color: "text-[hsl(var(--sky-blue))]",
    },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.value + Math.floor(Math.random() * 10) - 5
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="p-4 rounded-lg border border-border bg-background hover:shadow-md transition-all duration-300 animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={cn("p-2 rounded-lg bg-muted/50", metric.color)}>
              {metric.icon}
            </span>
            <span className="animate-pulse h-2 w-2 rounded-full bg-[hsl(var(--nature-primary))]" />
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold">{metric.value}</p>
            <p className="text-sm text-muted-foreground">{metric.label}</p>
            <p className="text-xs text-muted-foreground">{metric.unit}</p>
          </div>
        </div>
      ))}
    </div>
  );
}