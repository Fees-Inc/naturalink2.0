import React from "react";
import { useId } from "react";

export function FeaturesSectionWithCardGradient() {
  return (
    <div className="py-20 lg:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Fonctionnalités de la Plateforme
          </h2>
          <p className="text-lg text-muted-foreground">
            Une solution complète pour tous les acteurs de la chaîne agroalimentaire
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-2">
          {grid.map((feature) => (
            <div
              key={feature.title}
              className="relative bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white p-6 rounded-3xl overflow-hidden"
            >
              <Grid size={20} />
              <p className="text-base font-bold text-neutral-800 dark:text-white relative z-20">
                {feature.title}
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const grid = [
  {
    title: "Profil Producteur",
    description:
      "Gestion complète du profil producteur avec infos, logo, historique, localisation et certifications.",
  },
  {
    title: "Gestion Produits",
    description:
      "Ajout facile de produits avec nom, variété, origine, méthode de culture, photos et vidéos.",
  },
  {
    title: "Stickers NFC Automatiques",
    description:
      "Génération automatique de stickers NFC liés à chaque produit pour la traçabilité.",
  },
  {
    title: "Fiches Interactives",
    description:
      "Fiches produits avec infos traçabilité, vidéos d'origine et carte interactive du parcours.",
  },
  {
    title: "Suivi des Lots",
    description:
      "Traçabilité complète : production, récolte, quantités, ventes et historique détaillé.",
  },
  {
    title: "Alertes Expiration",
    description:
      "Notifications automatiques pour les produits proches de l'expiration.",
  },
  {
    title: "Scan NFC/QR",
    description:
      "Vérification instantanée de l'authenticité et de l'origine des produits par les consommateurs.",
  },
  {
    title: "Carte de Traçabilité",
    description:
      "Visualisation du parcours complet du produit de la récolte au consommateur.",
  },
  {
    title: "Avis Consommateurs",
    description:
      "Système de notation et d'avis pour créer une communauté de confiance.",
  },
  {
    title: "Dashboard Distributeur",
    description:
      "Suivi approvisionnement, données de consommation et gestion des partenaires.",
  },
  {
    title: "Outils Logistiques",
    description:
      "Gestion des invendus avec recommandations durables (compost, biogaz, alimentation animale).",
  },
  {
    title: "Communauté",
    description:
      "Espace forum et messagerie pour échanger avec le support et la communauté NaturaLink.",
  },
];

export const Grid = ({
  pattern,
  size,
}: {
  pattern?: number[][];
  size?: number;
}) => {
  const p = pattern ?? [
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
  ];
  return (
    <div className="pointer-events-none absolute left-1/2 top-0  -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r  [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-zinc-100/30 to-zinc-300/30 dark:to-zinc-900/30 opacity-100">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={p}
          className="absolute inset-0 h-full w-full  mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10"
        />
      </div>
    </div>
  );
};

export function GridPattern({ width, height, x, y, squares, ...props }: any) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]: any) => (
            <rect
              strokeWidth="0"
              key={`${x}-${y}`}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}