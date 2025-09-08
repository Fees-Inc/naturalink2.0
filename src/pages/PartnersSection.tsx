import { Button } from "@/components/ui/button";
import { PartnerCircleCard } from "./PartnerCircleCard";
import { ArrowRight, Building2 } from "lucide-react";
import supermarketImage from "@/assets/supermarket-interior.jpg";
import distributorImage from "@/assets/distributor-warehouse.jpg";
import cooperativeImage from "@/assets/cooperative-interior.jpg";
import farmMarketImage from "@/assets/farm-market.jpg";
import { Badge } from "@/components/ui/badge";

const PartnersSection = () => {
  const partners = [
    {
      image: supermarketImage,
      company: "Super Bio",
      category: "Supermarché",
      productsCount: "15 247",
      scanRate: "89%",
      location: "Paris, Lyon, Marseille",
      delay: "0"
    },
    {
      image: distributorImage,
      company: "DistribuNature",
      category: "Distributeur",
      productsCount: "8 534",
      scanRate: "94%",
      location: "Île-de-France",
      delay: "200"
    },
    {
      image: cooperativeImage,
      company: "Coop Locale",
      category: "Coopérative",
      productsCount: "3 891",
      scanRate: "96%",
      location: "Bordeaux",
      delay: "400"
    },
    {
      image: farmMarketImage,
      company: "Marché du Terroir",
      category: "Marché Local",
      productsCount: "1 205",
      scanRate: "98%",
      location: "Provence-Alpes",
      delay: "600"
    },
        {
      image: cooperativeImage,
      company: "Coop Locale",
      category: "Coopérative",
      productsCount: "3 891",
      scanRate: "96%",
      location: "Bordeaux",
      delay: "400"
    },
    {
      image: farmMarketImage,
      company: "Marché du Terroir",
      category: "Marché Local",
      productsCount: "1 205",
      scanRate: "98%",
      location: "Provence-Alpes",
      delay: "600"
    },
        {
      image: cooperativeImage,
      company: "Coop Locale",
      category: "Coopérative",
      productsCount: "3 891",
      scanRate: "96%",
      location: "Bordeaux",
      delay: "400"
    },
    {
      image: farmMarketImage,
      company: "Marché du Terroir",
      category: "Marché Local",
      productsCount: "1 205",
      scanRate: "98%",
      location: "Provence-Alpes",
      delay: "600"
    }
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
             <Badge variant="outline" className="mb-4">
                Nos Entreprises Partenaires
            </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Nos entreprises partenaires distribuent en toute{" "}
            <span className="text-primary">transparence</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Découvrez les espaces commerciaux qui utilisent NaturaLink pour certifier leurs produits
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 max-w-6xl mx-auto">
          {partners.map((partner, index) => (
            <PartnerCircleCard
              key={index}
              {...partner}
            />
          ))}
        </div>

        {/* Stats Summary */}
        {/* <div className="bg-card shadow-soft rounded-2xl p-8 mb-16 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">28 877</div>
              <div className="text-muted-foreground">Produits certifiés au total</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">91%</div>
              <div className="text-muted-foreground">Taux de scan moyen</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-nature-secondary mb-2">12</div>
              <div className="text-muted-foreground">Régions couvertes</div>
            </div>
          </div>
        </div> */}

        {/* Call to Action */}
        {/* <div className="text-center">
          <div className="bg-card shadow-medium rounded-2xl p-12 max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-6">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Vous êtes distributeur ou grande surface ?
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Rejoignez le réseau NaturaLink et offrez à vos clients une transparence totale 
                sur l'origine et la qualité des produits.
              </p>
            </div>
            
            <Button 
              size="lg" 
              className="accent-gradient text-accent-foreground px-8 py-4 text-lg font-medium rounded-xl transition-bounce hover:scale-105 shadow-glow group"
            >
              Devenir partenaire
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-smooth" />
            </Button>
            
            <p className="text-sm text-muted-foreground mt-4">
              Contactez-nous pour découvrir tous les avantages
            </p>
          </div>
        </div> */}
          <div className="text-center">
          <Button variant="outline" size="lg">
            Voir tous nos produits
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;