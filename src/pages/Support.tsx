import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Video, BookOpen } from "lucide-react";

export default function Support() {
  return (
    <section className="space-y-6">
      <SEO title="Support & Communauté | NaturaLink" description="Forum des producteurs, messagerie avec le support et guides pratiques NaturaLink." />
      <header>
        <h1 className="text-2xl font-bold">Support & Communauté</h1>
      </header>
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><MessageSquare className="w-5 h-5" /> Forum Producteurs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">Échangez avec la communauté.</p>
            <Button variant="outline">Accéder au forum</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Video className="w-5 h-5" /> Tutoriels Vidéo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">Apprenez pas à pas.</p>
            <Button variant="outline">Voir les tutoriels</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BookOpen className="w-5 h-5" /> Guides Pratiques</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">Documentation et bonnes pratiques.</p>
            <Button variant="outline">Lire les guides</Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
