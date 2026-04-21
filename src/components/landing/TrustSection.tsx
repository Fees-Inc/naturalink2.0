import { Badge } from "@/components/ui/badge";
import { Link2, Leaf, Shield } from "lucide-react";

const pillars = [
  {
    label: "Blockchain VeChain",
    hint: "Intégrité & horodatage des événements (démo)",
    icon: Link2,
  },
  {
    label: "Étiquettes NFC",
    hint: "Accès instantané au passeport produit",
    icon: Shield,
  },
  {
    label: "ODD 12",
    hint: "Consommation et production responsables",
    icon: Leaf,
  },
];

export function TrustSection() {
  return (
    <section className="py-16 md:py-20 bg-muted/30 border-y border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="outline" className="mb-3">
            Technologie & confiance
          </Badge>
          <h3 className="font-serif text-2xl sm:text-3xl font-medium text-foreground">
            Transparence vérifiable, pensée pour le terrain ivoirien
          </h3>
          <p className="mt-3 text-muted-foreground">
            Aucune mention de partenariat institutionnel ou commercial sur cette démo : nous présentons uniquement
            notre approche produit et les briques techniques.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {pillars.map(({ label, hint, icon: Icon }) => (
            <div
              key={label}
              className="flex flex-col items-center text-center rounded-2xl border border-border bg-background p-6 shadow-sm"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <p className="font-semibold text-foreground">{label}</p>
              <p className="mt-2 text-sm text-muted-foreground">{hint}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
