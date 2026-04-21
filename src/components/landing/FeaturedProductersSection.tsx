import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QrCode, Scan } from "lucide-react";
import { motion } from "framer-motion";
import { ProductDetailModal } from "@/components/ui/ProductDetailModal";
import nfcProductImage from "@/assets/nfc-product.jpg";

// Interface pour les produits
interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  tags: string[];
  producer: string;
  origin: string;
  certifications: string[];
  harvestDate: string;
  nutritionalScore: string;
  sustainability: number;
  traceabilitySteps: number;
  /** Absent = bandeau sans photo (ex. cajou : pas de cliché fiable en démo). */
  productImage?: string;
}

export function FeaturedProductersSection() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fonction pour gérer le clic sur une carte
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Fonction pour gérer le scan QR code
  const handleQRScan = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      setIsModalOpen(true);
    }
  };

  // Fonction pour générer un QR code simple (simulation)
  const generateQRCode = (productId: string) => {
    // En réalité, vous utiliseriez une vraie librairie QR code
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="white"/>
        <rect x="10" y="10" width="80" height="80" fill="black"/>
        <rect x="20" y="20" width="60" height="60" fill="white"/>
        <rect x="30" y="30" width="40" height="40" fill="black"/>
        <text x="50" y="70" text-anchor="middle" font-size="8" fill="black">${productId}</text>
      </svg>
    `)}`;
  };

const products: Product[] = [
  {
    id: "1",
    name: "Cacao",
    description: "Traçabilité complète du cacao ivoirien, de la plantation à l'exportation, avec certification biologique et commerce équitable.",
    image: "🍫",
    tags: ["Bio", "Commerce Équitable"],
    producer: "Coopérative Cacao Sud",
    origin: "San-Pédro, Côte d'Ivoire",
    certifications: ["Bio", "Commerce Équitable", "NaturaLink"],
    harvestDate: "2024-01-15",
    nutritionalScore: "A+",
    sustainability: 95,
    traceabilitySteps: 8,
    productImage: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=400&h=300&fit=crop"
  },
  {
    id: "2",
    name: "Riz",
    description: "Riz local cultivé dans les régions du Nord, avec suivi des pratiques agricoles durables et certification qualité.",
    image: "🌾",
    tags: ["Local", "Durable"],
    producer: "Coopérative Riz Nord",
    origin: "Korhogo, Côte d'Ivoire",
    certifications: ["Local", "Durable", "NaturaLink"],
    harvestDate: "2024-01-10",
    nutritionalScore: "A",
    sustainability: 88,
    traceabilitySteps: 6,
    productImage: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop"
  },
  {
    id: "3",
    name: "Igname",
    description: "Igname fraîche des coopératives du Centre, avec traçabilité complète des méthodes de culture traditionnelles.",
    image: "🍠",
    tags: ["Traditionnel", "Frais"],
    producer: "Coopérative Centre",
    origin: "Bouaké, Côte d'Ivoire",
    certifications: ["Traditionnel", "Frais", "NaturaLink"],
    harvestDate: "2024-01-05",
    nutritionalScore: "A",
    sustainability: 92,
    traceabilitySteps: 5,
    productImage: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop"
  },
  {
    id: "4",
    name: "Légumes",
    description: "Légumes variés cultivés selon les pratiques agricoles responsables avec certification de qualité nutritionnelle.",
    image: "🥬",
    tags: ["Responsable", "Nutritif"],
    producer: "Ferme Bio Abidjan",
    origin: "Abidjan, Côte d'Ivoire",
    certifications: ["Bio", "Responsable", "Nutritif"],
    harvestDate: "2024-01-12",
    nutritionalScore: "A+",
    sustainability: 90,
    traceabilitySteps: 7,
    productImage: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop"
  },
  {
    id: "5",
    name: "Café",
    description: "Café arabica et robusta cultivé dans les montagnes de l'Ouest, certifié durable et issu de petites exploitations.",
    image: "☕",
    tags: ["Durable", "Arôme Riche"],
    producer: "Coopérative Café Ouest",
    origin: "Man, Côte d'Ivoire",
    certifications: ["Durable", "Arôme Riche", "NaturaLink"],
    harvestDate: "2024-01-08",
    nutritionalScore: "A+",
    sustainability: 94,
    traceabilitySteps: 9,
    productImage: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop"
  },
  {
    id: "6",
    name: "Huile de Palme",
    description: "Huile de palme rouge produite localement avec un contrôle strict de la durabilité et de l'impact environnemental.",
    image: "🥥",
    tags: ["Local", "Traçable"],
    producer: "Huilerie Moderne",
    origin: "Dabou, Côte d'Ivoire",
    certifications: ["Local", "Traçable", "Durable"],
    harvestDate: "2024-01-14",
    nutritionalScore: "B",
    sustainability: 85,
    traceabilitySteps: 6,
    productImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
  },
  {
    id: "7",
    name: "Banane",
    description: "Banane douce et plantain cultivés dans le Sud, avec suivi logistique de la récolte à la distribution.",
    image: "🍌",
    tags: ["Énergie", "Export"],
    producer: "Plantation Sud",
    origin: "Grand-Bassam, Côte d'Ivoire",
    certifications: ["Export", "Énergie", "NaturaLink"],
    harvestDate: "2024-01-11",
    nutritionalScore: "A",
    sustainability: 89,
    traceabilitySteps: 7,
    productImage: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop"
  },
  {
    id: "8",
    name: "Ananas",
    description: "Ananas sucré de la région de Bonoua, certifié pour son goût unique et ses pratiques agricoles responsables.",
    image: "🍍",
    tags: ["Export", "Savoureux"],
    producer: "Coopérative Ananas Bonoua",
    origin: "Bonoua, Côte d'Ivoire",
    certifications: ["Export", "Savoureux", "NaturaLink"],
    harvestDate: "2024-01-09",
    nutritionalScore: "A+",
    sustainability: 91,
    traceabilitySteps: 8,
    productImage: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&h=300&fit=crop"
  },
  {
    id: "9",
    name: "Mangue",
    description: "Mangue fraîche de saison avec traçabilité des vergers, respectant des normes de qualité internationale.",
    image: "🥭",
    tags: ["Saisonnière", "Qualité Premium"],
    producer: "Vergers Premium",
    origin: "Yamoussoukro, Côte d'Ivoire",
    certifications: ["Saisonnière", "Qualité Premium", "NaturaLink"],
    harvestDate: "2024-01-13",
    nutritionalScore: "A+",
    sustainability: 93,
    traceabilitySteps: 7,
    productImage: "https://images.unsplash.com/photo-1605027990121-4755b9a5a7a2?w=400&h=300&fit=crop"
  },
  {
    id: "10",
    name: "Noix de Cajou",
    description: "Noix de cajou transformées localement avec certification qualité et traçabilité de la filière.",
    image: "🌰",
    tags: ["Local", "Export"],
    producer: "Transformation Cajou",
    origin: "Bondoukou, Côte d'Ivoire",
    certifications: ["Local", "Export", "NaturaLink"],
    harvestDate: "2024-01-07",
    nutritionalScore: "A",
    sustainability: 87,
    traceabilitySteps: 6,
  },
  {
    id: "11",
    name: "Poisson",
    description: "Poisson frais issu de la pêche artisanale et de l'aquaculture durable en Côte d'Ivoire.",
    image: "🐟",
    tags: ["Fraîcheur", "Durable"],
    producer: "Pêche Artisanale CI",
    origin: "San-Pédro, Côte d'Ivoire",
    certifications: ["Fraîcheur", "Durable", "NaturaLink"],
    harvestDate: "2024-01-16",
    nutritionalScore: "A+",
    sustainability: 88,
    traceabilitySteps: 5,
    productImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop"
  },
  {
    id: "12",
    name: "Poulet Fermier",
    description: "Poulet élevé en plein air avec alimentation naturelle et certification sanitaire.",
    image: "🍗",
    tags: ["Naturel", "Traçable"],
    producer: "Élevage Naturel",
    origin: "Bouaké, Côte d'Ivoire",
    certifications: ["Naturel", "Traçable", "NaturaLink"],
    harvestDate: "2024-01-14",
    nutritionalScore: "A",
    sustainability: 86,
    traceabilitySteps: 6,
    productImage: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop"
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
            Exemples de filières et de circuits : la démo met en avant des profils types de coopératives et de
            producteurs ivoiriens, sans engagement contractuel.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product, index) => {
            const isQRCard = index % 2 === 1; // Alternance : carte normale, puis QR code
            
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {isQRCard ? (
                  // Carte avec QR code intégré
                  <Card 
                    className="group hover:shadow-medium transition-smooth cursor-pointer overflow-hidden"
                    onClick={() => handleProductClick(product)}
                  >
                    <div className="relative">
                      {/* Image de fond du produit */}
                      <div className="h-48 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 relative overflow-hidden">
                        {product.productImage ? (
                          <img
                            src={product.productImage}
                            alt=""
                            className="w-full h-full object-cover opacity-80"
                          />
                        ) : null}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* QR Code en overlay */}
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
                          <img
                            src={generateQRCode(product.id)}
                            alt="QR Code"
                            className="w-16 h-16"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQRScan(product.id);
                            }}
                          />
                          <div className="text-xs text-center mt-1 font-medium text-primary">
                            Scanner
                          </div>
                        </div>
                        
                        {/* Icône de scan */}
                        <div className="absolute bottom-4 left-4 bg-primary/90 text-white p-2 rounded-full">
                          <Scan className="w-5 h-5" />
                        </div>
                      </div>
                      
                      <CardContent className="p-4">
                        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex flex-wrap gap-1 justify-center">
                          {product.tags.slice(0, 2).map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ) : (
                  // Carte normale
                  <Card 
                    className="group hover:shadow-medium transition-smooth cursor-pointer"
                    onClick={() => handleProductClick(product)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        {product.image}
                      </div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
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
                )}
              </motion.div>
            );
          })}
        </div>
        
        <div className="text-center">
          <Button variant="outline" size="lg">
            Voir tous nos produits
          </Button>
        </div>
        
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
      />
      
    </section>
  );
}