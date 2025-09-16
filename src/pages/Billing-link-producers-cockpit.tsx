import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Download } from "lucide-react";

export default function Billing() {
  return (
    <section className="space-y-6">
      <SEO title="Facturation | NaturaLink" description="Facturation automatique au prix fixe de 250 FCFA par sticker NFC. Historique et téléchargements de factures." />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Facturation</h1>
      </header>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><CreditCard className="w-5 h-5" /> Résumé mensuel</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">Tarif: <Badge>250 FCFA</Badge> / sticker NFC</p>
          <div className="flex gap-4">
            <div className="flex-1 p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground">Stickers utilisés</p>
              <p className="text-2xl font-bold">1,250</p>
            </div>
            <div className="flex-1 p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground">Montant dû</p>
              <p className="text-2xl font-bold">312,500 FCFA</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button>Générer Facture</Button>
            <Button variant="outline" className="gap-2"><Download className="w-4 h-4" /> Télécharger la dernière</Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
