import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Star, Award, Users, Package, Shield, Leaf, Calendar, Phone, Mail, Globe, Heart, MessageCircle, BarChart3, Truck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Producer {
  id: string;
  name: string;
  location: string;
  products: number;
  rating: number;
  certifications: string[];
  image: string;
}

interface ProducerDetailModalProps {
  producer: Producer | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProducerDetailModal({ producer, isOpen, onClose }: ProducerDetailModalProps) {
  if (!producer) return null;

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600 bg-green-100";
    if (rating >= 4.0) return "text-yellow-600 bg-yellow-100";
    if (rating >= 3.5) return "text-orange-600 bg-orange-100";
    return "text-red-600 bg-red-100";
  };

  const getCertificationColor = (cert: string) => {
    switch (cert.toLowerCase()) {
      case "bio": return "text-green-600 bg-green-100";
      case "naturaLink": return "text-blue-600 bg-blue-100";
      case "commerce équitable": return "text-purple-600 bg-purple-100";
      case "durable": return "text-emerald-600 bg-emerald-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  // Données mockées pour les détails du producteur
  const producerDetails = {
    description: "Producteur engagé dans l'agriculture durable depuis plus de 15 ans, spécialisé dans la production de fruits tropicaux de qualité supérieure.",
    foundedYear: 2009,
    employees: 45,
    farmSize: "25 hectares",
    annualProduction: "150 tonnes",
    contact: {
      phone: "+225 07 12 34 56 78",
      email: "contact@fermebioabidjan.ci",
      website: "www.fermebioabidjan.ci"
    },
    sustainability: {
      waterConservation: 95,
      soilHealth: 88,
      biodiversity: 92,
      carbonFootprint: 15
    },
    recentProducts: [
      { name: "Bananes Bio Premium", harvest: "2024-01-15", rating: 4.8 },
      { name: "Ananas Victoria", harvest: "2024-01-10", rating: 4.6 },
      { name: "Mangues Kent", harvest: "2024-01-05", rating: 4.9 }
    ],
    achievements: [
      "Certification Bio depuis 2012",
      "Prix Excellence Agricole 2023",
      "Partenariat Commerce Équitable",
      "Innovation Technologique 2022"
    ]
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
            <div className="w-full max-w-5xl max-h-[90vh] overflow-hidden">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-background rounded-2xl shadow-2xl overflow-hidden border border-border/50"
              >
                {/* Header avec image hero */}
                <div className="relative h-64 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20">
                  <img
                    src={producer.image}
                    alt={producer.name}
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
                  
                  {/* Producer info overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-4 mb-2">
                      <h1 className="text-3xl font-bold text-white">{producer.name}</h1>
                      <Badge className={`${getRatingColor(producer.rating)} text-sm px-3 py-1`}>
                        <Star className="w-3 h-3 mr-1" />
                        {producer.rating}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-white/90">
                      <MapPin className="w-4 h-4" />
                      <span>{producer.location}</span>
                      <span>•</span>
                      <span>{producer.products} produits</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
                  {/* Certifications */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm font-medium text-muted-foreground">Certifications :</span>
                    {producer.certifications.map((cert, index) => (
                      <Badge key={index} className={`${getCertificationColor(cert)} text-sm px-3 py-1`}>
                        <Award className="w-3 h-3 mr-1" />
                        {cert}
                      </Badge>
                    ))}
                  </div>

                  {/* Description */}
                  <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                    <CardContent className="p-4">
                      <p className="text-muted-foreground leading-relaxed">
                        {producerDetails.description}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Stats Grid */}
                  <div className="grid md:grid-cols-4 gap-4">
                    <Card className="border-primary/20">
                      <CardContent className="p-4 text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Calendar className="w-6 h-6 text-primary" />
                        </div>
                        <div className="text-2xl font-bold text-primary">{producerDetails.foundedYear}</div>
                        <div className="text-sm text-muted-foreground">Année de création</div>
                      </CardContent>
                    </Card>

                    <Card className="border-blue-200">
                      <CardContent className="p-4 text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="text-2xl font-bold text-blue-600">{producerDetails.employees}</div>
                        <div className="text-sm text-muted-foreground">Employés</div>
                      </CardContent>
                    </Card>

                    <Card className="border-green-200">
                      <CardContent className="p-4 text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Leaf className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="text-2xl font-bold text-green-600">{producerDetails.farmSize}</div>
                        <div className="text-sm text-muted-foreground">Surface cultivée</div>
                      </CardContent>
                    </Card>

                    <Card className="border-yellow-200">
                      <CardContent className="p-4 text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Package className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div className="text-2xl font-bold text-yellow-600">{producerDetails.annualProduction}</div>
                        <div className="text-sm text-muted-foreground">Production annuelle</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Durabilité */}
                  <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Leaf className="w-5 h-5 text-green-600" />
                        Indicateurs de Durabilité
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Conservation de l'eau</span>
                              <span className="font-semibold">{producerDetails.sustainability.waterConservation}%</span>
                            </div>
                            <Progress value={producerDetails.sustainability.waterConservation} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Santé des sols</span>
                              <span className="font-semibold">{producerDetails.sustainability.soilHealth}%</span>
                            </div>
                            <Progress value={producerDetails.sustainability.soilHealth} className="h-2" />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Biodiversité</span>
                              <span className="font-semibold">{producerDetails.sustainability.biodiversity}%</span>
                            </div>
                            <Progress value={producerDetails.sustainability.biodiversity} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Empreinte carbone</span>
                              <span className="font-semibold">{producerDetails.sustainability.carbonFootprint}%</span>
                            </div>
                            <Progress value={100 - producerDetails.sustainability.carbonFootprint} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Produits récents */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Package className="w-5 h-5 text-primary" />
                        Produits Récents
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {producerDetails.recentProducts.map((product, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                            <div>
                              <h4 className="font-semibold text-sm">{product.name}</h4>
                              <p className="text-xs text-muted-foreground">
                                Récolté le {new Date(product.harvest).toLocaleDateString('fr-FR')}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm font-semibold">{product.rating}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Réalisations */}
                  <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Award className="w-5 h-5 text-blue-600" />
                        Réalisations & Distinctions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-3">
                        {producerDetails.achievements.map((achievement, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-background rounded-lg">
                            <Award className="w-5 h-5 text-blue-600" />
                            <span className="text-sm font-medium">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Contact */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Phone className="w-5 h-5 text-primary" />
                        Contact
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-primary" />
                          <div>
                            <p className="text-sm font-medium">Téléphone</p>
                            <p className="text-sm text-muted-foreground">{producerDetails.contact.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-primary" />
                          <div>
                            <p className="text-sm font-medium">Email</p>
                            <p className="text-sm text-muted-foreground">{producerDetails.contact.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Globe className="w-5 h-5 text-primary" />
                          <div>
                            <p className="text-sm font-medium">Site web</p>
                            <p className="text-sm text-muted-foreground">{producerDetails.contact.website}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t">
                    <Button className="flex-1 min-w-[200px]">
                      <Heart className="w-4 h-4 mr-2" />
                      Suivre ce producteur
                    </Button>
                    <Button variant="outline" className="flex-1 min-w-[200px]">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contacter
                    </Button>
                    <Button variant="outline" className="flex-1 min-w-[200px]">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Voir les statistiques
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