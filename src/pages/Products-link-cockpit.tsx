import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf } from "lucide-react";

export default function Products() {
  const products = [
    { name: "Tomates Bio", lot: "TMB-2025-04-12", trace: "Récolte → Transformation → Transport", scans: 342 },
    { name: "Mangues", lot: "MNG-2025-04-09", trace: "Récolte → Conditionnement → Transport", scans: 128 },
    { name: "Cacao", lot: "CAC-2025-03-30", trace: "Récolte → Séchage → Transport", scans: 512 },
  ];

  return (
    <section className="space-y-6">
      <SEO title="Produits Certifiés | NaturaLink" description="Visualisez et suivez la traçabilité complète des produits certifiés NaturaLink." />
      <header>
        <h1 className="text-2xl font-bold">Produits Certifiés</h1>
      </header>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.map((p, i) => (
          <Card key={i} className="hover:shadow-medium transition-smooth">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Leaf className="w-5 h-5 text-nature-primary" /> {p.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">Lot: {p.lot}</p>
              <p className="text-sm">Traçabilité: {p.trace}</p>
              <Badge variant="secondary">Scans: {p.scans}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
