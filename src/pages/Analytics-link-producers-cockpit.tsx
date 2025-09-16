import SEO from "@/components/SEO";
import { StatCard } from "@/components/ui/stat-card";
import { Users, TrendingUp, Activity, BarChart3 } from "lucide-react";

export default function Analytics() {
  const stats = [
    { title: "Scans Totaux", value: "12,348", subtitle: "+1,234 ce mois", trend: { value: "+11%", isPositive: true }, icon: <Activity className="w-5 h-5" />, variant: "primary" as const },
    { title: "Ventes", value: "8,241", subtitle: "+642 ce mois", trend: { value: "+8%", isPositive: true }, icon: <TrendingUp className="w-5 h-5" />, variant: "default" as const },
    { title: "Clients", value: "3,902", subtitle: "+210 ce mois", trend: { value: "+6%", isPositive: true }, icon: <Users className="w-5 h-5" />, variant: "accent" as const },
    { title: "Durabilité", value: "92%", subtitle: "Retour réduit", trend: { value: "+3%", isPositive: true }, icon: <BarChart3 className="w-5 h-5" />, variant: "primary" as const },
  ];

  return (
    <section className="space-y-6">
      <SEO title="Analytics & Insights | NaturaLink" description="Consultez les performances: scans, ventes, retours et indicateurs de durabilité." />
      <header>
        <h1 className="text-2xl font-bold">Analytics & Insights</h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <StatCard key={i} {...s} />
        ))}
      </div>
    </section>
  );
}
