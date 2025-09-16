import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  variant?: "default" | "primary" | "accent";
}

export function StatCard({ 
  title, 
  value, 
  subtitle, 
  trend, 
  icon, 
  variant = "default" 
}: StatCardProps) {
  return (
    <Card className={cn(
      "transition-smooth hover:shadow-medium",
      variant === "primary" && "border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10",
      variant === "accent" && "border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10"
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && (
          <div className={cn(
            "p-2 rounded-lg",
            variant === "primary" && "bg-primary/10 text-primary",
            variant === "accent" && "bg-accent/10 text-accent",
            variant === "default" && "bg-muted text-muted-foreground"
          )}>
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <div className="flex items-center justify-between mt-2">
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center gap-1">
              {trend.isPositive ? (
                <TrendingUp className="w-4 h-4 text-nature-secondary" />
              ) : (
                <TrendingDown className="w-4 h-4 text-destructive" />
              )}
              <Badge 
                variant={trend.isPositive ? "default" : "destructive"}
                className="text-xs"
              >
                {trend.value}
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}