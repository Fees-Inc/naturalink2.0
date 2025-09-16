import { StatCard } from "@/components/ui/stat-card";
import { ProducerCard } from "@/components/ui/producer-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Package, 
  Award, 
  TrendingUp, 
  DollarSign,
  ShoppingCart,
  AlertTriangle,
  Plus,
  BarChart3
} from "lucide-react";

export function DashboardOverview() {
  const stats = [
    {
      title: "Producteurs Actifs",
      value: "156",
      subtitle: "12 nouveaux ce mois",
      trend: { value: "+12%", isPositive: true },
      icon: <Users className="w-5 h-5" />,
      variant: "primary" as const
    },
    {
      title: "Produits Certifiés",
      value: "2,847",
      subtitle: "436 en attente",
      trend: { value: "+8%", isPositive: true },
      icon: <Package className="w-5 h-5" />,
      variant: "default" as const
    },
    {
      title: "Stickers NFC Utilisés",
      value: "18,924",
      subtitle: "250 FCFA/unité",
      trend: { value: "+15%", isPositive: true },
      icon: <Award className="w-5 h-5" />,
      variant: "accent" as const
    },
    {
      title: "Revenus Mensuels",
      value: "4,731,000 FCFA",
      subtitle: "Facturation automatique",
      trend: { value: "+23%", isPositive: true },
      icon: <DollarSign className="w-5 h-5" />,
      variant: "primary" as const
    }
  ];

  const producers = [
    {
      name: "Coopérative Bio Vallée",
      location: "Bouaké, Côte d'Ivoire",
      certifications: ["Bio", "Équitable", "NaturaLink"],
      productsCount: 24,
      status: "verified" as const
    },
    {
      name: "Ferme Kouassi",
      location: "Yamoussoukro",
      certifications: ["Bio", "NaturaLink"],
      productsCount: 12,
      status: "pending" as const
    },
    {
      name: "Coopérative des Jardins",
      location: "Abidjan",
      certifications: ["Équitable"],
      productsCount: 8,
      status: "new" as const
    }
  ];

  const recentActivities = [
    {
      type: "certification",
      title: "Nouvelle certification approuvée",
      description: "Tomates bio - Ferme Kouassi",
      time: "Il y a 2h",
      status: "success"
    },
    {
      type: "payment",
      title: "Facture générée",
      description: "1,250 stickers NFC - 312,500 FCFA",
      time: "Il y a 4h",
      status: "info"
    },
    {
      type: "alert",
      title: "Stock faible détecté",
      description: "Mangues - Coopérative Bio Vallée",
      time: "Il y a 6h",
      status: "warning"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="hero-gradient rounded-xl p-8 text-primary-foreground shadow-large">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Tableau de Bord NaturaLink</h1>
            <p className="text-primary-foreground/80 text-lg">
              Pilotez votre écosystème agricole en temps réel
            </p>
          </div>
          <div className="flex gap-3">
            <Button size="lg" variant="secondary" className="gap-2">
              <Plus className="w-5 h-5" />
              Nouveau Producteur
            </Button>
            <Button size="lg" variant="outline" className="gap-2 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
              <BarChart3 className="w-5 h-5" />
              Rapport Complet
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Producers */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Producteurs Récents</h2>
            <Button variant="outline" size="sm">Voir tout</Button>
          </div>
          <div className="grid gap-4">
            {producers.map((producer, index) => (
              <ProducerCard key={index} {...producer} />
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div>
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-nature-primary" />
                Activité Récente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'success' ? 'bg-nature-secondary' :
                    activity.status === 'warning' ? 'bg-accent' : 'bg-sky'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Actions Rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start gap-3" variant="outline">
                <Award className="w-4 h-4" />
                Nouvelle Certification
              </Button>
              <Button className="w-full justify-start gap-3" variant="outline">
                <ShoppingCart className="w-4 h-4" />
                Commande Stickers NFC
              </Button>
              <Button className="w-full justify-start gap-3" variant="outline">
                <AlertTriangle className="w-4 h-4" />
                Signaler un Problème
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Objectifs Mensuels</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Nouveaux Producteurs</span>
                <span>12/15</span>
              </div>
              <Progress value={80} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Certifications Traitées</span>
                <span>48/50</span>
              </div>
              <Progress value={96} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Revenus Cible</span>
                <span>4.7M/5M FCFA</span>
              </div>
              <Progress value={94} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alertes Système</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/10 border border-accent/20">
              <AlertTriangle className="w-5 h-5 text-accent" />
              <div>
                <p className="font-medium text-sm">Stock Stickers Faible</p>
                <p className="text-xs text-muted-foreground">Réapprovisionnement recommandé</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-nature-secondary/10 border border-nature-secondary/20">
              <Award className="w-5 h-5 text-nature-secondary" />
              <div>
                <p className="font-medium text-sm">5 Certifications en Attente</p>
                <p className="text-xs text-muted-foreground">Validation requise</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}