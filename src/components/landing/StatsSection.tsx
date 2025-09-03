import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import supplyChainImage from "@/assets/supply-chain.jpg";

export function StatsSection() {
  const stats = [
    { value: "20,000+", label: "Producteurs partenaires" },
    { value: "20+", label: "Coopératives connectées" }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-6 leading-tight">
              Des milliers de personnes font confiance à nos produits agricoles
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8">
              Notre solution d'étiquetage intelligent est en cours de déploiement 
              dans tout le pays pour vous, et juste vous.
            </p>
            
            {/* Stats */}
            <div className="flex items-center gap-8 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="nature" size="lg" className="group">
              Rejoindre NaturaLink
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-smooth" />
            </Button>
          </div>
          
          {/* Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-large">
              <img 
                src={supplyChainImage} 
                alt="Chaîne d'approvisionnement moderne"
                className="w-full h-[400px] object-cover"
              />
              
              {/* Overlay elements */}
              <div className="absolute inset-0 hero-gradient opacity-20"></div>
              
              {/* Floating elements */}
              <div className="absolute top-6 left-6 bg-primary-foreground rounded-xl p-3 shadow-medium">
                <div className="text-sm font-semibold text-primary">
                  Traçabilité en temps réel
                </div>
              </div>
              
              <div className="absolute bottom-6 right-6 bg-accent rounded-xl p-3 shadow-medium">
                <div className="text-sm font-semibold text-foreground">
                  Blockchain VeChain
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}