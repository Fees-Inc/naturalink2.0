import { StatCard } from "@/components/dashboard/StatCard";
import { RealtimeMetrics } from "@/components/dashboard/RealtimeMetrics";
import { ActivityChart } from "@/components/dashboard/ActivityChart";
import { 
  Users, 
  Package, 
  Wheat, 
  Building2, 
  CreditCard, 
  ShieldCheck,
  TrendingUp,
  Leaf
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Producteurs actifs",
      value: "250",
      subtitle: "+12% ce mois",
      icon: <Wheat className="h-5 w-5" />,
      trend: { value: 12, isPositive: true },
      onClick: () => navigate("/producers"),
      color: "primary" as const,
    },
    {
      title: "Coopératives",
      value: "22",
      subtitle: "3 en attente de validation",
      icon: <Users className="h-5 w-5" />,
      trend: { value: 8, isPositive: true },
      onClick: () => navigate("/producers"),
      color: "success" as const,
    },
    {
      title: "Produits certifiés",
      value: "480",
      subtitle: "35 en attente",
      icon: <Package className="h-5 w-5" />,
      trend: { value: 15, isPositive: true },
      onClick: () => navigate("/products"),
      color: "accent" as const,
    },
    {
      title: "Distributeurs",
      value: "10",
      subtitle: "2 nouveaux ce mois",
      icon: <Building2 className="h-5 w-5" />,
      trend: { value: 20, isPositive: true },
      onClick: () => navigate("/distributors"),
      color: "warning" as const,
    },
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Tableau de bord
            </h1>
            <p className="text-muted-foreground mt-1">
              Vue d'ensemble de l'écosystème NaturaLink
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="px-3 py-1.5 text-sm">
              <div className="h-2 w-2 rounded-full bg-[hsl(var(--nature-primary))] animate-pulse mr-2" />
              Système actif
            </Badge>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <StatCard {...stat} />
            </div>
          ))}
        </div>

        {/* Real-time Metrics */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Métriques temps réel</h2>
          <RealtimeMetrics />
        </div>

        {/* Charts and Additional Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ActivityChart />
          
          {/* Blockchain Status Card */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-[hsl(var(--nature-primary))]" />
                Blockchain Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Scans validés</span>
                  <span className="font-semibold">1,450</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Smart contracts actifs</span>
                  <span className="font-semibold">15</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Taux de validation</span>
                  <span className="font-semibold">99.8%</span>
                </div>
                <Progress value={99.8} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-[hsl(var(--accent))]" />
                Aperçu financier
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">320,000 FCFA</p>
                    <p className="text-sm text-muted-foreground">Revenus ce mois</p>
                  </div>
                  <Badge className="badge-success">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +24%
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Stickers NFC vendus</span>
                    <span className="font-medium">1,280 unités</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Abonnements actifs</span>
                    <span className="font-medium">32</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Factures en attente</span>
                    <span className="font-medium text-[hsl(var(--accent))]">5</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Leaf className="h-5 w-5 text-[hsl(var(--nature-primary))]" />
                Impact environnemental
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-[hsl(var(--nature-primary))]/10">
                    <p className="text-2xl font-bold text-[hsl(var(--nature-primary))]">2.5T</p>
                    <p className="text-xs text-muted-foreground">CO₂ économisé</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-[hsl(var(--accent))]/10">
                    <p className="text-2xl font-bold text-[hsl(var(--accent))]">850</p>
                    <p className="text-xs text-muted-foreground">Produits recyclés</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Déchets compostés</span>
                    <span className="font-medium">342 kg</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Biogaz produit</span>
                    <span className="font-medium">125 m³</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}