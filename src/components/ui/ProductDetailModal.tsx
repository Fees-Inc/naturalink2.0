import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Calendar, Shield, Leaf, Truck, Star, Heart, Play, ChefHat, Clock, Award, Users, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Product {
  id: string;
  name: string;
  producer: string;
  origin: string;
  certifications: string[];
  harvestDate: string;
  nutritionalScore: string;
  sustainability: number;
  traceabilitySteps: number;
  image: string;
}

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  if (!product) return null;

  const getScoreColor = (score: string) => {
    switch (score) {
      case "A+": return "text-green-600 bg-green-100";
      case "A": return "text-green-600 bg-green-100";
      case "B": return "text-yellow-600 bg-yellow-100";
      case "C": return "text-orange-600 bg-orange-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getSustainabilityColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-yellow-600";
    if (score >= 70) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-background rounded-2xl shadow-2xl overflow-hidden border border-border/50"
              >
                {/* Header avec image hero */}
                <div className="relative h-64 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Close button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 bg-background/80 hover:bg-background text-foreground"
                    onClick={onClose}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                  
                  {/* Product title overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
                    <div className="flex items-center gap-2 text-white/90">
                      <MapPin className="w-4 h-4" />
                      <span>{product.origin}</span>
                      <span>•</span>
                      <span>{product.producer}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
                  {/* Certifications et scores */}
                  <div className="flex flex-wrap items-center gap-4">
                    {product.certifications.map((cert, index) => (
                      <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                        {cert}
                      </Badge>
                    ))}
                    <Badge className={`${getScoreColor(product.nutritionalScore)} text-sm px-3 py-1`}>
                      Score: {product.nutritionalScore}
                    </Badge>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="border-primary/20">
                      <CardContent className="p-4 text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Leaf className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="text-2xl font-bold text-green-600">{product.sustainability}%</div>
                        <div className="text-sm text-muted-foreground">Durabilité</div>
                        <Progress 
                          value={product.sustainability} 
                          className="mt-2 h-2"
                        />
                      </CardContent>
                    </Card>

                    <Card className="border-blue-200">
                      <CardContent className="p-4 text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Truck className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="text-2xl font-bold text-blue-600">{product.traceabilitySteps}</div>
                        <div className="text-sm text-muted-foreground">Étapes de traçabilité</div>
                      </CardContent>
                    </Card>

                    <Card className="border-yellow-200">
                      <CardContent className="p-4 text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Calendar className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div className="text-sm font-semibold text-yellow-600">
                          {new Date(product.harvestDate).toLocaleDateString('fr-FR')}
                        </div>
                        <div className="text-sm text-muted-foreground">Date de récolte</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Traçabilité détaillée */}
                  <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Shield className="w-5 h-5 text-blue-600" />
                        Parcours de Traçabilité
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { step: 1, title: "Plantation", description: "Graines plantées dans des conditions optimales", status: "completed" },
                          { step: 2, title: "Culture", description: "Suivi de la croissance avec techniques durables", status: "completed" },
                          { step: 3, title: "Récolte", description: "Cueillette manuelle respectueuse de l'environnement", status: "completed" },
                          { step: 4, title: "Tri & Contrôle", description: "Sélection rigoureuse des meilleurs produits", status: "completed" },
                          { step: 5, title: "Emballage", description: "Conditionnement écologique et traçable", status: "completed" },
                          { step: 6, title: "Transport", description: "Logistique optimisée et contrôlée", status: "completed" },
                          { step: 7, title: "Distribution", description: "Mise en rayon avec suivi température", status: "completed" },
                          { step: 8, title: "Vente", description: "Achat par le consommateur final", status: "current" }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                              item.status === 'completed' 
                                ? 'bg-green-100 text-green-600' 
                                : item.status === 'current'
                                ? 'bg-blue-100 text-blue-600'
                                : 'bg-gray-100 text-gray-400'
                            }`}>
                              {item.step}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm">{item.title}</h4>
                              <p className="text-xs text-muted-foreground">{item.description}</p>
                            </div>
                            {item.status === 'completed' && (
                              <Shield className="w-4 h-4 text-green-600" />
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Actions durables */}
                  <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Leaf className="w-5 h-5 text-green-600" />
                        Actions Durables
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <ChefHat className="w-5 h-5 text-green-600 mt-1" />
                            <div>
                              <h4 className="font-semibold">Recettes Anti-Gaspillage</h4>
                              <p className="text-sm text-muted-foreground">
                                Découvrez comment utiliser ce produit au maximum
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Clock className="w-5 h-5 text-orange-600 mt-1" />
                            <div>
                              <h4 className="font-semibold">Conservation Optimale</h4>
                              <p className="text-sm text-muted-foreground">
                                Conseils pour prolonger la fraîcheur
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Button variant="outline" className="w-full justify-start">
                            <ChefHat className="w-4 h-4 mr-2" />
                            Voir les recettes
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <Clock className="w-4 h-4 mr-2" />
                            Conseils conservation
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t">
                    <Button className="flex-1 min-w-[200px]">
                      <Heart className="w-4 h-4 mr-2" />
                      Ajouter aux favoris
                    </Button>
                    <Button variant="outline" className="flex-1 min-w-[200px]">
                      <Play className="w-4 h-4 mr-2" />
                      Voir la vidéo d'origine
                    </Button>
                    <Button variant="outline" className="flex-1 min-w-[200px]">
                      <MapPin className="w-4 h-4 mr-2" />
                      Carte de traçabilité
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}