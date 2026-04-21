import { Badge } from "@/components/ui/badge";
import { MapPinOff, ShieldAlert, Trash2, UserX } from "lucide-react";

const pains = [
  {
    icon: MapPinOff,
    title: "Traçabilité fragile",
    text: "Peu d'outils simples pour prouver l'origine réelle des produits locaux sur toute la chaîne.",
  },
  {
    icon: ShieldAlert,
    title: "Contrefaçon & labels douteux",
    text: "Risques sur l'authenticité des mentions « local » ou « bio » sans preuve vérifiable.",
  },
  {
    icon: Trash2,
    title: "Pertes & gaspillage",
    text: "Des pertes importantes entre production et consommation faute de visibilité sur la qualité et les stocks.",
  },
  {
    icon: UserX,
    title: "Producteurs peu visibles",
    text: "Difficile pour les petits producteurs et coopératives de valoriser leur savoir-faire auprès des acheteurs.",
  },
];

export function ProblemSection() {
  return (
    <section className="py-20 md:py-24 bg-background relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <Badge variant="outline" className="mb-4">
            Contexte
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-foreground tracking-tight">
            Une chaîne agroalimentaire qui manque de{" "}
            <span className="text-orange-600">transparence</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Naturalink répond aux freins du terrain en Côte d'Ivoire : confiance, preuves et simplicité pour tous les acteurs.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pains.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-orange-700 group-hover:bg-emerald-600/10 group-hover:text-emerald-800 transition-colors">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
