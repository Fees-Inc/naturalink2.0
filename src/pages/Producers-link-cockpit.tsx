import SEO from "@/components/SEO";
import { ProducerCard } from "@/components/ui/producer-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Producers() {
  const producers = [
    { name: "Coopérative Bio Vallée", location: "Bouaké, Côte d'Ivoire", certifications: ["Bio", "Équitable", "NaturaLink"], productsCount: 24, status: "verified" as const },
    { name: "Ferme Kouassi", location: "Yamoussoukro", certifications: ["Bio", "NaturaLink"], productsCount: 12, status: "pending" as const },
    { name: "Coopérative des Jardins", location: "Abidjan", certifications: ["Équitable"], productsCount: 8, status: "new" as const },
  ];

  return (
    <section className="space-y-6">
      <SEO title="Producteurs & Coopératives | NaturaLink" description="Gérez les profils producteurs, localisations, certifications et historiques des coopératives NaturaLink." />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Producteurs & Coopératives</h1>
        <Button variant="hero" className="gap-2"><Plus className="w-4 h-4" /> Nouveau Producteur</Button>
      </header>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {producers.map((p, i) => (
          <ProducerCard key={i} {...p} />
        ))}
      </div>
    </section>
  );
}
