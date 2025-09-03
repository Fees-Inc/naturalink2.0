import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import cooperativeImage from "@/assets/cooperative-farmers.jpg";

export function StorySection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-large">
              <img 
                src={cooperativeImage} 
                alt="Coopératives agricoles en Côte d'Ivoire"
                className="w-full h-[500px] object-cover"
              />
              
              {/* Overlay badge */}
              <div className="absolute bottom-6 left-6 bg-primary-foreground rounded-2xl p-4 shadow-medium">
                <div className="text-3xl font-bold text-primary mb-1">
                  Depuis 2024
                </div>
                <div className="text-sm text-muted-foreground">
                  Innovation Made in CI
                </div>
              </div>
            </div>
            
            {/* Floating star */}
            <div className="absolute -top-4 -right-4 w-8 h-8 accent-gradient rounded-lg rotate-12 opacity-80"></div>
          </div>
          
          {/* Content */}
          <div>
            <Badge variant="outline" className="mb-6">
              Notre Histoire
            </Badge>
            
            <h2 className="text-4xl font-bold text-foreground mb-6 leading-tight">
              Notre mission est de révolutionner la traçabilité alimentaire
            </h2>
            
            <div className="space-y-4 text-muted-foreground mb-8">
              <p>
                Une part importante de notre mission est dédiée aux aliments locaux qui proviennent 
                d'Ivoiriens : riz, maïs, ignames, plantain, maïs, manioc, sorgho, mil, 
                aubergines, tomates, etc.
              </p>
              
              <p>
                La santé et la sécurité de l'agriculture ivoirienne passent par la traçabilité 
                pour permettre d'identifier, de garantir la qualité et quantifier les produits 
                agricoles qui alimentent nos marchés locaux.
              </p>
              
              <p>
                Chez NaturaLink, nous exploitons la puissance de la technologie blockchain 
                VeChain pour apporter une traçabilité complète aux produits agricoles, 
                avec une couverture nationale. Notre mission est de donner les meilleurs 
                outils pour permettre aux producteurs d'être plus transparents sur leurs 
                pratiques agricoles pour nos consommateurs locaux et nos partenaires 
                internationaux.
              </p>
            </div>
            
            <Button variant="nature" size="lg">
              En savoir plus
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}