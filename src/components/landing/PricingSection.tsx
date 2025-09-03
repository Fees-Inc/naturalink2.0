import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Users, Building, Factory } from "lucide-react";
import { useState } from "react";

export function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState("producers");

  const plans = [
    {
      id: "consumers",
      icon: Users,
      title: "Consommateurs",
      subtitle: "Accès libre à la traçabilité",
      price: "Gratuit",
      period: "",
      description: "Scannez et découvrez l'origine de vos produits",
      features: [
        "Scan NFC/QR illimité",
        "Historique complet des produits",
        "Vérification blockchain",
        "Informations nutritionnelles",
        "Notation et avis",
        "Alertes anti-gaspillage"
      ],
      cta: "Accéder",
      variant: "outline",
      popular: false
    },
    {
      id: "producers",
      icon: Factory,
      title: "Producteurs / Coopératives",
      subtitle: "Étiquetage intelligent NFC",
      price: "250 FCFA",
      period: "/ étiquette NFC",
      description: "Traçabilité complète de vos produits agricoles",
      features: [
        "Étiquettes NFC personnalisées",
        "Dashboard producteur",
        "Suivi des lots en temps réel",
        "Certification Made in CI",
        "Support technique dédié",
        "Formation incluse"
      ],
      packages: [
        { quantity: 100, price: "20,000 FCFA", savings: "5,000 FCFA" },
        { quantity: 500, price: "112,500 FCFA", savings: "12,500 FCFA" },
        { quantity: 1000, price: "200,000 FCFA", savings: "50,000 FCFA" }
      ],
      cta: "Acheter",
      variant: "hero",
      popular: true
    },
    {
      id: "distributors",
      icon: Building,
      title: "Entreprises / Distributeurs",
      subtitle: "Data-as-a-Service",
      price: "250,000 FCFA",
      period: "/ an",
      description: "Accès aux données de traçabilité pour votre chaîne d'approvisionnement",
      features: [
        "API de traçabilité complète",
        "Analytics avancés",
        "Monitoring chaîne d'approvisionnement",
        "Gestion des partenaires coopératives",
        "Outils logistiques intelligents",
        "Support prioritaire 24/7"
      ],
      cta: "Souscrire",
      variant: "nature",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Plans & Tarifs
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Choisissez votre plan NaturaLink
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Des solutions adaptées à chaque acteur de la chaîne agri-alimentaire ivoirienne
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            return (
              <Card 
                key={plan.id} 
                className={`relative transition-smooth hover:shadow-medium ${
                  plan.popular ? 'ring-2 ring-primary shadow-medium' : ''
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-foreground">
                    Plus populaire
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 mx-auto mb-4 nature-gradient rounded-xl flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl font-bold">{plan.title}</CardTitle>
                  <p className="text-muted-foreground">{plan.subtitle}</p>
                  
                  <div className="py-6">
                    <div className="text-4xl font-bold text-primary">
                      {plan.price}
                    </div>
                    {plan.period && (
                      <div className="text-muted-foreground">{plan.period}</div>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.packages && (
                    <div className="mt-6 p-4 bg-secondary rounded-lg">
                      <h4 className="font-semibold mb-3 text-sm">Packs disponibles :</h4>
                      {plan.packages.map((pkg, index) => (
                        <div key={index} className="flex justify-between items-center py-2 text-sm">
                          <span>{pkg.quantity} étiquettes</span>
                          <div className="text-right">
                            <span className="font-semibold text-primary">{pkg.price}</span>
                            <div className="text-xs text-muted-foreground">
                              Économie: {pkg.savings}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
                
                <CardFooter>
                  <Button 
                    variant={plan.variant as any} 
                    size="lg" 
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}