import SEO from "@/components/SEO";
import { ProducerCard } from "@/components/ui/producer-card";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/ui/navigation";
import { Plus } from "lucide-react";

export default function Producers() {
  const producers = [
    { name: "Coopérative Bio Vallée", location: "Bouaké, Côte d'Ivoire", certifications: ["Bio", "Équitable", "NaturaLink"], productsCount: 24, status: "verified" as const },
    { name: "Ferme Kouassi", location: "Yamoussoukro", certifications: ["Bio", "NaturaLink"], productsCount: 12, status: "pending" as const },
    { name: "Coopérative des Jardins", location: "Abidjan", certifications: ["Équitable"], productsCount: 8, status: "new" as const },
  ];

  return (
    <div className="flex min-h-screen w-full bg-background">
      <SEO title="Producteurs & Coopératives | NaturaLink" description="Gérez les profils producteurs, localisations, certifications et historiques des coopératives NaturaLink." />
      
      {/* Navigation Sidebar */}
      <Navigation />
      
      {/* Main Content */}
      <main className="flex-1 p-8 pb-12 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          <header className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Producteurs & Coopératives</h1>
              <p className="text-muted-foreground">Gérez vos producteurs et coopératives partenaires</p>
            </div>
            <Button variant="hero" className="gap-2 shadow-soft">
              <Plus className="w-4 h-4" /> 
              Nouveau Producteur
            </Button>
          </header>
          
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {producers.map((p, i) => (
              <ProducerCard key={i} {...p} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
