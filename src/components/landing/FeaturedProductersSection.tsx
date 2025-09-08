import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import nfcProductImage from "@/assets/nfc-product.jpg";

export function FeaturedProductersSection() {
const products = [
  {
    name: "Cacao",
    description: "Traçabilité complète du cacao ivoirien, de la plantation à l'exportation, avec certification biologique et commerce équitable.",
    image: "🍫",
    tags: ["Bio", "Commerce Équitable"]
  },
  {
    name: "Riz",
    description: "Riz local cultivé dans les régions du Nord, avec suivi des pratiques agricoles durables et certification qualité.",
    image: "🌾",
    tags: ["Local", "Durable"]
  },
  {
    name: "Igname",
    description: "Igname fraîche des coopératives du Centre, avec traçabilité complète des méthodes de culture traditionnelles.",
    image: "🍠",
    tags: ["Traditionnel", "Frais"]
  },
  {
    name: "Légumes",
    description: "Légumes variés cultivés selon les pratiques agricoles responsables avec certification de qualité nutritionnelle.",
    image: "🥬",
    tags: ["Responsable", "Nutritif"]
  },
  {
    name: "Café",
    description: "Café arabica et robusta cultivé dans les montagnes de l’Ouest, certifié durable et issu de petites exploitations.",
    image: "☕",
    tags: ["Durable", "Arôme Riche"]
  },
  {
    name: "Huile de Palme",
    description: "Huile de palme rouge produite localement avec un contrôle strict de la durabilité et de l’impact environnemental.",
    image: "🥥",
    tags: ["Local", "Traçable"]
  },
  {
    name: "Banane",
    description: "Banane douce et plantain cultivés dans le Sud, avec suivi logistique de la récolte à la distribution.",
    image: "🍌",
    tags: ["Énergie", "Export"]
  },
  {
    name: "Ananas",
    description: "Ananas sucré de la région de Bonoua, certifié pour son goût unique et ses pratiques agricoles responsables.",
    image: "🍍",
    tags: ["Export", "Savoureux"]
  },
  {
    name: "Mangue",
    description: "Mangue fraîche de saison avec traçabilité des vergers, respectant des normes de qualité internationale.",
    image: "🥭",
    tags: ["Saisonnière", "Qualité Premium"]
  },
  {
    name: "Noix de Cajou",
    description: "Noix de cajou transformées localement avec certification qualité et traçabilité de la filière.",
    image: "🌰",
    tags: ["Local", "Export"]
  },
  {
    name: "Poisson",
    description: "Poisson frais issu de la pêche artisanale et de l’aquaculture durable en Côte d’Ivoire.",
    image: "🐟",
    tags: ["Fraîcheur", "Durable"]
  },
  {
    name: "Poulet Fermier",
    description: "Poulet élevé en plein air avec alimentation naturelle et certification sanitaire.",
    image: "🍗",
    tags: ["Naturel", "Traçable"]
  }
];


  return (
    <section className="py-20 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Nos Produits Phares
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Nos Produits Certifiés
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Nous avons une large gamme de produits agricoles que nous avons exportés 
            partout dans le monde vers des milliers de nos partenaires.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product, index) => (
            <Card key={index} className="group hover:shadow-medium transition-smooth cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="text-6xl mb-4">{product.image}</div>
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {product.description}
                </p>
                <div className="flex flex-wrap gap-1 justify-center">
                  {product.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button variant="outline" size="lg">
            Voir tous nos produits
          </Button>
        </div>
        
      </div>
      
    </section>
  );
}