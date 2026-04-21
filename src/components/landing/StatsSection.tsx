import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import supplyChainImage from "@/assets/supply-chain.jpg";

export function StatsSection() {
  const stats = [
    { value: "6", label: "Filières démo (lots NFC)" },
    { value: "48", label: "Producteurs simulés (dashboard)" },
    { value: "100%", label: "Données de démonstration CI" },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-foreground mb-6 leading-tight">
              Une base saine pour convaincre demain
            </h2>

            <p className="text-lg text-muted-foreground mb-8">
              Les chiffres affichés ici servent à illustrer le fonctionnement de la plateforme lors de nos pitchs et
              entretiens,ils ne reflètent pas une base installée à grande échelle pour le moment.
            </p>

            <div className="flex flex-wrap gap-8 mb-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center sm:text-left">
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground max-w-[10rem]">{stat.label}</div>
                </div>
              ))}
            </div>

            <Button asChild variant="default" size="lg" className="group rounded-full">
              <Link to="/products">
                Parcourir le catalogue démo
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-smooth" />
              </Link>
            </Button>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-large ring-1 ring-border">
              <img
                src={supplyChainImage}
                alt="Chaîne de valeur agricole"
                className="w-full h-[min(400px,50vh)] object-cover sm:h-[400px]"
              />
              <div className="absolute inset-0 hero-gradient opacity-25" />
              <div className="absolute top-6 left-6 rounded-xl bg-background/90 px-3 py-2 text-sm font-medium shadow-md backdrop-blur">
                Pilote régional
              </div>
              <div className="absolute bottom-6 right-6 rounded-xl bg-orange-500 text-white px-3 py-2 text-sm font-medium shadow-md">
                Soubré · Man · Korhogo
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
