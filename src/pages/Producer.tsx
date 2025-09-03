import { useState, useEffect } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Package, BarChart3, Users, Settings } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Producer() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    } else if (profile && profile.role !== 'producer') {
      navigate(`/${profile.role}`);
    }
  }, [user, profile, navigate]);

  const stats = [
    { label: "Produits Actifs", value: "24", icon: Package },
    { label: "Vues ce mois", value: "1,245", icon: BarChart3 },
    { label: "Étiquettes NFC", value: "156", icon: Package },
    { label: "Clients Atteints", value: "89", icon: Users }
  ];

  const recentProducts = [
    {
      id: "1",
      name: "Ananas Bio Victoria",
      lot: "LOT-2024-001",
      quantity: 50,
      status: "Actif",
      nfcCount: 48
    },
    {
      id: "2", 
      name: "Café Robusta Premium",
      lot: "LOT-2024-002",
      quantity: 100,
      status: "Actif",
      nfcCount: 95
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
                Dashboard Producteur
              </h1>
              <p className="text-xl text-muted-foreground">
                Bienvenue {profile?.first_name} - {profile?.company_name}
              </p>
            </div>
            <Button onClick={() => navigate('/producer/add-product')}>
              <Plus className="w-4 h-4 mr-2" />
              Nouveau Produit
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
            <Card className="cursor-pointer hover:shadow-medium transition-smooth" onClick={() => navigate('/producer/add-product')}>
              <CardHeader className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-green-500 rounded-xl flex items-center justify-center">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">Ajouter Produit</CardTitle>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:shadow-medium transition-smooth" onClick={() => navigate('/producer/purchase')}>
              <CardHeader className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">Acheter NFC</CardTitle>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:shadow-medium transition-smooth">
              <CardHeader className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-purple-500 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">Analytics</CardTitle>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:shadow-medium transition-smooth">
              <CardHeader className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-orange-500 rounded-xl flex items-center justify-center">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">Paramètres</CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Recent Products */}
          <Card>
            <CardHeader>
              <CardTitle>Produits Récents</CardTitle>
              <CardDescription>
                Gestion de vos produits et leur traçabilité
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">Lot: {product.lot}</p>
                      <p className="text-sm text-muted-foreground">Quantité: {product.quantity} unités</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant="secondary">
                        {product.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        NFC: {product.nfcCount}/{product.quantity}
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