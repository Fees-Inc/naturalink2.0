import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Trophy, Rocket, Users } from "lucide-react";

const milestones = [
  {
    icon: Trophy,
    title: "Concours & programmes startup",
    body:
      "Naturalink a été accompagnée et sélectionnée dans plusieurs concours et programmes d'incubation (données de démonstration pour la présentation).",
    tone: "from-orange-500/15 to-transparent",
  },
  {
    icon: Rocket,
    title: "Phase pilote",
    body:
      "Objectif : déployer un premier réseau de lots certifiés avec étiquettes NFC et passeports numériques sur VeChain, en Côte d'Ivoire.",
    tone: "from-emerald-600/15 to-transparent",
  },
  {
    icon: Users,
    title: "Ouverture aux acteurs",
    body:
      "Producteurs, transformateurs, distributeurs et consommateurs : la plateforme est pensée pour toute la chaîne — sans partenaires commerciaux annoncés à ce stade.",
    tone: "from-orange-500/10 to-emerald-600/10",
  },
];

export function RecognitionSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-muted/40 to-background">
      <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full border border-emerald-500/20" />
      <div className="pointer-events-none absolute -left-16 bottom-10 h-56 w-56 rounded-full border border-orange-400/20" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center mb-14">
          <Badge variant="outline" className="mb-4 border-orange-400/50 text-orange-700 dark:text-orange-300">
            Parcours & reconnaissance
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-foreground">
            Une startup ivoirienne en{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-emerald-700">
              construction
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Pas de partenariats commerciaux officialisés dans cette démo : nous mettons l'accent sur la vision,
            la technologie (NFC + VeChain) et les scénarios d'usage pour la Côte d'Ivoire.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto mb-12">
          {milestones.map(({ icon: Icon, title, body, tone }) => (
            <div
              key={title}
              className={`rounded-3xl border border-border/80 bg-gradient-to-br ${tone} p-6 shadow-sm`}
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-background/80 text-orange-600 shadow-sm ring-1 ring-border">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link to="/products">Voir les produits démo</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-orange-400/50">
            <Link to="/admin/naturalink">Espace tableau de bord (démo)</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
