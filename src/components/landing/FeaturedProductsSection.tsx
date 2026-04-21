import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import nfcProductImage from "@/assets/nfc-product.jpg";

type ShowcaseProduct = {
  name: string;
  description: string;
  /** Photo uniquement si elle correspond au titre ; sinon omis = zone vide */
  image?: string;
  tags: string[];
};

/**
 * Photos Unsplash uniquement quand le sujet est clair (cacao, café, NFC…).
 * Pas d’image pour le cajou : les clichés libres prêtent souvent à confusion.
 */
const products: ShowcaseProduct[] = [
  {
    name: "Cacao",
    description:
      "Fèves et fermentation suivies du champ au séchage — filière Nawa / Sud-Comoé (démo).",
    image:
      "https://images.unsplash.com/photo-1614350296597-20e04c87821d?auto=format&fit=crop&w=900&q=85",
    tags: ["Soubré", "Export", "NFC"],
  },
  {
    name: "Café",
    description:
      "Arabica des montagnes de l'Ouest : lavage, séchage et traçabilité lot par lot (démo).",
    image:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=900&q=85",
    tags: ["Man", "Tonkpi", "Qualité"],
  },
  {
    name: "Noix de cajou",
    description:
      "Tri et séchage au nord — chaîne jusqu'à l'unité de transformation (démo).",
    tags: ["Korhogo", "Savanes", "Filière"],
  },
  {
    name: "Igname & vivrier",
    description:
      "Tubercules et plantain : stockage, lots et livraison vers les marchés (démo).",
    tags: ["Gbêkê", "Bouaké", "Frais"],
  },
  {
    name: "Maraîchage",
    description:
      "Légumes frais pour Abidjan et périphérie — récolte datée sur le passeport (démo).",
    tags: ["Lagunes", "Bingerville", "Local"],
  },
  {
    name: "Étiquette NFC",
    description:
      "Sticker sur l'emballage : scan instantané vers le passeport numérique (démo).",
    image: nfcProductImage,
    tags: ["VeChain", "Anti-fraude", "Simple"],
  },
];

export function FeaturedProductsSection() {
  return (
    <section className="py-20 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Nos produits phares
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-foreground mb-4">
            Filières certifiées (aperçu)
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Une photo n&apos;est affichée que lorsqu&apos;elle illustre clairement la filière ; sinon la vignette reste
            volontairement vide (aperçu démo).
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product) => (
            <Link key={product.name} to="/products" className="block group">
              <Card className="h-full overflow-hidden border-border/80 shadow-sm hover:shadow-md transition-shadow">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                  {product.image ? (
                    <>
                      <img
                        src={product.image}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                      <span className="absolute bottom-3 left-3 right-3 text-lg font-semibold text-white drop-shadow-md">
                        {product.name}
                      </span>
                    </>
                  ) : (
                    <div className="flex h-full min-h-[9rem] flex-col justify-end p-4">
                      <span className="text-lg font-semibold text-foreground">{product.name}</span>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{product.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {product.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link to="/products">Voir tous les produits démo</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
