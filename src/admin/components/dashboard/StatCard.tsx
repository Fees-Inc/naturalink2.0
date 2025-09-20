import { ReactNode } from "react";
import { ArrowUp, ArrowDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  onClick?: () => void;
  className?: string;
  color?: "primary" | "accent" | "success" | "warning";
}

export function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend, 
  onClick,
  className,
  color = "primary"
}: StatCardProps) {
  const colorClasses = {
    primary: "from-[hsl(var(--nature-primary))] to-[hsl(var(--nature-secondary))]",
    accent: "from-[hsl(var(--accent))] to-[hsl(var(--accent-glow))]",
    success: "from-[hsl(var(--nature-primary))] to-[hsl(120_60%_50%)]",
    warning: "from-[hsl(var(--accent))] to-[hsl(47_96%_63%)]",
  };

  return (
    <div 
      className={cn(
        "stat-card group",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn(
          "p-3 rounded-xl bg-gradient-to-br text-white shadow-md transition-transform group-hover:scale-110",
          colorClasses[color]
        )}>
          {icon}
        </div>
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-lg",
            trend.isPositive 
              ? "text-[hsl(var(--nature-primary))] bg-[hsl(var(--nature-primary))]/10" 
              : "text-destructive bg-destructive/10"
          )}>
            {trend.isPositive ? (
              <ArrowUp className="h-3 w-3" />
            ) : (
              <ArrowDown className="h-3 w-3" />
            )}
            {Math.abs(trend.value)}%
          </div>
        )}
      </div>

      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-foreground">
          {value}
        </h3>
        <p className="text-sm font-medium text-muted-foreground">
          {title}
        </p>
        {subtitle && (
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
            <TrendingUp className="h-3 w-3" />
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}