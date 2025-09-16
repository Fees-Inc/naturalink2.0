import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Plus } from "lucide-react";

export default function Certifications() {
  const requests = [
    { product: "Tomates Bio", producer: "Ferme Kouassi", status: "En attente" },
    { product: "Mangues", producer: "Coopérative Bio Vallée", status: "Validée" },
    { product: "Cacao", producer: "Coopérative des Jardins", status: "Refusée" },
  ];

  const statusBadge = (s: string) =>
    s === "Validée" ? (
      <Badge className="bg-nature-secondary text-white">Validée</Badge>
    ) : s === "Refusée" ? (
      <Badge variant="destructive">Refusée</Badge>
    ) : (
      <Badge variant="secondary">En attente</Badge>
    );

  return (
    <section className="space-y-6">
      <SEO title="Certifications | NaturaLink" description="Soumettez des demandes, suivez les statuts et gérez les stickers NFC pour les produits NaturaLink." />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Demandes de Certification</h1>
        <Button className="gap-2" variant="nature"><Plus className="w-4 h-4" /> Nouvelle Demande</Button>
      </header>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Award className="w-5 h-5 text-nature-tertiary" /> Suivi des Demandes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {requests.map((r, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div>
                <p className="font-medium">{r.product}</p>
                <p className="text-sm text-muted-foreground">{r.producer}</p>
              </div>
              {statusBadge(r.status)}
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
