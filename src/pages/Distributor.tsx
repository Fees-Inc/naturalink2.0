import { useState, useEffect } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Users, MapPin, Building, Globe } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Distributor() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    } else if (profile && profile.role !== 'distributor') {
      navigate(`/${profile.role}`);
    }
  }, [user, profile, navigate]);

  const stats = [
    { label: "Produits Suivis", value: "1,247", icon: BarChart3 },
    { label: "Partenaires Actifs", value: "23", icon: Users },
    { label: "Scans ce mois", value: "8,945", icon: TrendingUp },
    { label: "Régions Couvertes", value: "12", icon: MapPin }
  ];

  const partners = [
    {
      id: "1",
      name: "Coopérative ANADER",
      location: "Bonoua",
      products: 45,
      lastUpdate: "2024-01-15",
      quality: "Excellente"
    },
    {
      id: "2",
      name: "SCOOP-CA Daloa", 
      location: "Daloa",
      products: 32,
      lastUpdate: "2024-01-14",
      quality: "Très bonne"
    }
  ];

  return (
    <div className="min-h-screen bg-secondary/30">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Dashboard Distributeur
              </h1>
              <p className="text-xl text-muted-foreground">
                Bienvenue {profile?.first_name} - {profile?.company_name}
              </p>
            </div>
            <Button onClick={() => navigate('/distributor/subscribe')}>
              <Building className="w-4 h-4 mr-2" />
              Gérer Abonnement
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index}>
                  <CardContent className="flex items-center p-6">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                    <div className="w-12 h-12 nature-gradient rounded-lg flex items-center justify-center ml-4">
                      <IconComponent className="w-6 h-6 text-primary-foreground" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="cursor-pointer hover:shadow-medium transition-smooth">
              <CardHeader className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-blue-500 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">Analytics API</CardTitle>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:shadow-medium transition-smooth">
              <CardHeader className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-green-500 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">Chaîne Supply</CardTitle>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:shadow-medium transition-smooth">
              <CardHeader className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-purple-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">Partenaires</CardTitle>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:shadow-medium transition-smooth">
              <CardHeader className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-orange-500 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">Logistique</CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Partners Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Partenaires Coopératives</CardTitle>
              <CardDescription>
                Suivi de la qualité et performance de vos partenaires producteurs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {partners.map((partner) => (
                  <div key={partner.id} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{partner.name}</h4>
                      <p className="text-sm text-muted-foreground">📍 {partner.location}</p>
                      <p className="text-sm text-muted-foreground">{partner.products} produits actifs</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant="secondary">
                        {partner.quality}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        MAJ: {partner.lastUpdate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}