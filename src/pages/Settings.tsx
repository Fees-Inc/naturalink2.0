import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Settings() {
  return (
    <section className="space-y-6">
      <SEO title="Paramètres | NaturaLink" description="Configurez votre organisation, notifications et préférences de compte NaturaLink." />
      <header>
        <h1 className="text-2xl font-bold">Paramètres</h1>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Préférences Générales</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground">Nom de l'organisation</label>
              <input className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2" placeholder="NaturaLink" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Email de contact</label>
              <input className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2" placeholder="support@naturalink.com" />
            </div>
          </div>
          <Button className="mt-2">Enregistrer</Button>
        </CardContent>
      </Card>
    </section>
  );
}
