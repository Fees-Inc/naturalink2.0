import { useState } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, QrCode, Smartphone, Leaf, Award, Clock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Consumer() {
  const [scanInput, setScanInput] = useState("");
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Seulement rediriger si l’utilisateur est connecté mais n’a pas le bon rôle
    if (profile && user && profile.role !== "consumer") {
      navigate(`/${profile.role}`);
    }
  }, [user, profile, navigate]);

  const recentScans = [
    {
      id: "1",
      productName: "Ananas Bio Victoria",
      producer: "Coopérative ANADER",
      location: "Bonoua, Côte d'Ivoire",
      scanDate: "2024-01-15",
      certifications: ["Bio", "Made in CI"]
    },
    {
      id: "2",
      productName: "Café Robusta Premium",
      producer: "SCOOP-CA Daloa",
      location: "Daloa, Côte d'Ivoire", 
      scanDate: "2024-01-14",
      certifications: ["UTZ", "Made in CI"]
    }
  ];

  return (
    <div className="min-h-screen bg-secondary/30">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Espace Consommateur
            </h1>
            <p className="text-xl text-muted-foreground">
              Découvrez l'origine et l'authenticité de vos produits
            </p>
          </div>

          {/* Scan Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="w-6 h-6" />
                Scanner un produit
              </CardTitle>
              <CardDescription>
                Scannez le code NFC ou QR d'un produit pour découvrir son histoire
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Entrez l'ID du produit ou scannez le code"
                    value={scanInput}
                    onChange={(e) => setScanInput(e.target.value)}
                  />
                </div>
                <Button>
                  <Search className="w-4 h-4 mr-2" />
                  Rechercher
                </Button>
                <Button variant="outline">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Scanner NFC
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="cursor-pointer hover:shadow-medium transition-smooth">
              <CardHeader className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 nature-gradient rounded-xl flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle>Produits Certifiés</CardTitle>
                <CardDescription>
                  Explorez tous les produits NFC certifiés
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:shadow-medium transition-smooth">
              <CardHeader className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 nature-gradient rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle>Mes Favoris</CardTitle>
                <CardDescription>
                  Produits que vous avez aimés
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:shadow-medium transition-smooth">
              <CardHeader className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 nature-gradient rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle>Alertes Anti-Gaspillage</CardTitle>
                <CardDescription>
                  Produits proches de l'expiration
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Recent Scans */}
          <Card>
            <CardHeader>
              <CardTitle>Scans Récents</CardTitle>
              <CardDescription>
                Vos dernières découvertes de produits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentScans.map((scan) => (
                  <div key={scan.id} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{scan.productName}</h4>
                      <p className="text-sm text-muted-foreground">{scan.producer}</p>
                      <p className="text-sm text-muted-foreground">{scan.location}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex gap-2">
                        {scan.certifications.map((cert, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">{scan.scanDate}</span>
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