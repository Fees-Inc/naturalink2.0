import { useState } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, QrCode, Smartphone, Leaf, Award, Clock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Scan, 
  Shield, 
  MapPin, 
  Users, 
  Truck,
  ChefHat,
  Bell,
  Heart,
  Star,
  Play
} from "lucide-react";
  // nouveau code avec framer-motion pour les animations
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

interface Producer {
  id: string;
  name: string;
  location: string;
  products: number;
  rating: number;
  certifications: string[];
  image: string;
}
  const mockProducts: Product[] = [
  {
    id: "1",
    name: "Bananes Bio Premium",
    producer: "Ferme Bio Abidjan",
    origin: "Abidjan, Côte d'Ivoire",
    certifications: ["Bio", "NaturaLink", "Commerce Équitable"],
    harvestDate: "2024-01-15",
    nutritionalScore: "A",
    sustainability: 92,
    traceabilitySteps: 8,
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop"
  },
  {
    id: "2",
    name: "Ananas Victoria",
    producer: "Coopérative Sud",
    origin: "Grand-Bassam, Côte d'Ivoire",
    certifications: ["NaturaLink", "Durable"],
    harvestDate: "2024-01-10",
    nutritionalScore: "A+",
    sustainability: 88,
    traceabilitySteps: 6,
    image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&h=300&fit=crop"
  }
];

const mockProducers: Producer[] = [
  {
    id: "1",
    name: "Ferme Bio Abidjan",
    location: "Abidjan",
    products: 25,
    rating: 4.8,
    certifications: ["Bio", "NaturaLink"],
    image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop"
  },
  {
    id: "2",
    name: "Coopérative Sud",
    location: "Grand-Bassam",
    products: 18,
    rating: 4.6,
    certifications: ["NaturaLink", "Commerce Équitable"],
    image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=400&h=300&fit=crop"
  }
];
  // Fin du nouveau code
export default function Consumer() {
  const [scanInput, setScanInput] = useState("");
  const { user, profile } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Seulement rediriger si l’utilisateur est connecté mais n’a pas le bon rôle
    if (profile && user && profile.role !== "consumer") {
      navigate(`/${profile.role}`);
    }
  }, [user, profile, navigate]);
    useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const recentScans = [
    {
      id: "1",
      productName: "Ananas Bio Victoria",
      producer: "Coopérative ANADER",
      location: "Bonoua, Côte d'Ivoire",
      scanDate: "2024-01-15",
      certifications: ["Bio", "Made in CI"]
    },
    {
      id: "2",
      productName: "Café Robusta Premium",
      producer: "SCOOP-CA Daloa",
      location: "Daloa, Côte d'Ivoire", 
      scanDate: "2024-01-14",
      certifications: ["UTZ", "Made in CI"]
    }
  ];

    if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-secondary/30">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Espace Consommateur
            </h1>
            <p className="text-xl text-muted-foreground">
              Découvrez l'origine et l'authenticité de vos produits
            </p>
          </div>

          {/* Scan Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="w-6 h-6" />
                Scanner un produit
              </CardTitle>
              <CardDescription>
                Scannez le code NFC ou QR d'un produit pour découvrir son histoire
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Entrez l'ID du produit ou scannez le code"
                    value={scanInput}
                    onChange={(e) => setScanInput(e.target.value)}
                  />
                </div>
                <Button>
                  <Search className="w-4 h-4 mr-2" />
                  Rechercher
                </Button>
                <Button variant="outline">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Scanner NFC
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="cursor-pointer hover:shadow-medium transition-smooth">
              <CardHeader className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 nature-gradient rounded-xl flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle>Produits Certifiés</CardTitle>
                <CardDescription>
                  Explorez tous les produits NFC certifiés
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:shadow-medium transition-smooth">
              <CardHeader className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 nature-gradient rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle>Mes Favoris</CardTitle>
                <CardDescription>
                  Produits que vous avez aimés
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:shadow-medium transition-smooth">
              <CardHeader className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 nature-gradient rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle>Alertes Anti-Gaspillage</CardTitle>
                <CardDescription>
                  Produits proches de l'expiration
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Recent Scans */}
          <Card>
            <CardHeader>
              <CardTitle>Scans Récents</CardTitle>
              <CardDescription>
                Vos dernières découvertes de produits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentScans.map((scan) => (
                  <div key={scan.id} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{scan.productName}</h4>
                      <p className="text-sm text-muted-foreground">{scan.producer}</p>
                      <p className="text-sm text-muted-foreground">{scan.location}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex gap-2">
                        {scan.certifications.map((cert, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">{scan.scanDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
           {/* Another Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Products */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    Produits Certifiés en Vedette
                  </CardTitle>
                  <CardDescription>
                    Découvrez les derniers produits certifiés NaturaLink
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-6">
                    {mockProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex gap-6 p-6 border rounded-xl hover:shadow-md transition-all cursor-pointer"
                        onClick={() => setSelectedProduct(product)}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-24 h-24 rounded-lg object-cover"
                        />
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-xl font-semibold">{product.name}</h3>
                            <Button variant="ghost" size="sm">
                              <Heart className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{product.origin}</span>
                            <span className="text-sm text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">{product.producer}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 mb-3">
                            {product.certifications.map((cert, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {cert}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-1">
                              <Shield className="w-4 h-4 text-green-600" />
                              <span>Score: {product.nutritionalScore}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Leaf className="w-4 h-4 text-green-600" />
                              <span>{product.sustainability}% durable</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Truck className="w-4 h-4 text-blue-600" />
                              <span>{product.traceabilitySteps} étapes</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Engagement Durable */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-green-600" />
                    Engagement Durable
                  </CardTitle>
                  <CardDescription>
                    Conseils anti-gaspillage et pratiques durables
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <ChefHat className="w-5 h-5 text-green-600 mt-1" />
                        <div>
                          <h4 className="font-semibold mb-1">Recettes Anti-Gaspillage</h4>
                          <p className="text-sm text-muted-foreground">
                            Découvrez comment utiliser vos produits au maximum
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-orange-600 mt-1" />
                        <div>
                          <h4 className="font-semibold mb-1">Alertes Expiration</h4>
                          <p className="text-sm text-muted-foreground">
                            Notifications pour optimiser la consommation
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full justify-start">
                        <ChefHat className="w-4 h-4 mr-2" />
                        Voir les recettes
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Bell className="w-4 h-4 mr-2" />
                        Configurer les alertes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Actions Rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Scan className="w-4 h-4 mr-2" />
                  Scanner un nouveau produit
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="w-4 h-4 mr-2" />
                  Carte de traçabilité
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Play className="w-4 h-4 mr-2" />
                  Voir une vidéo d'origine
                </Button>
              </CardContent>
            </Card>

            {/* Producteurs Certifiés */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Producteurs Certifiés
                  </span>
                  <Button variant="ghost" size="sm">Voir tout</Button>
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {mockProducers.map((producer, index) => (
                    <motion.div
                      key={producer.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <img
                        src={producer.image}
                        alt={producer.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{producer.name}</h4>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span>{producer.location}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <Star className="w-3 h-3 text-yellow-500" />
                          <span>{producer.rating}</span>
                          <span className="text-muted-foreground">• {producer.products} produits</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Blockchain Verification */}
            <Card className="bg-gradient-to-r from-blue-50 to-cyan-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Vérification Blockchain
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Authenticité Garantie</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Chaque produit est vérifié sur la blockchain NaturaLink
                  </p>
                  <Button size="sm" className="w-full">
                    En savoir plus
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
           {/* Another Main Content */}
           <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Products */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    Produits Certifiés en Vedette
                  </CardTitle>
                  <CardDescription>
                    Découvrez les derniers produits certifiés NaturaLink
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-6">
                    {mockProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex gap-6 p-6 border rounded-xl hover:shadow-md transition-all cursor-pointer"
                        onClick={() => setSelectedProduct(product)}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-24 h-24 rounded-lg object-cover"
                        />
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-xl font-semibold">{product.name}</h3>
                            <Button variant="ghost" size="sm">
                              <Heart className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{product.origin}</span>
                            <span className="text-sm text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">{product.producer}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 mb-3">
                            {product.certifications.map((cert, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {cert}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-1">
                              <Shield className="w-4 h-4 text-green-600" />
                              <span>Score: {product.nutritionalScore}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Leaf className="w-4 h-4 text-green-600" />
                              <span>{product.sustainability}% durable</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Truck className="w-4 h-4 text-blue-600" />
                              <span>{product.traceabilitySteps} étapes</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Engagement Durable */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-green-600" />
                    Engagement Durable
                  </CardTitle>
                  <CardDescription>
                    Conseils anti-gaspillage et pratiques durables
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <ChefHat className="w-5 h-5 text-green-600 mt-1" />
                        <div>
                          <h4 className="font-semibold mb-1">Recettes Anti-Gaspillage</h4>
                          <p className="text-sm text-muted-foreground">
                            Découvrez comment utiliser vos produits au maximum
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-orange-600 mt-1" />
                        <div>
                          <h4 className="font-semibold mb-1">Alertes Expiration</h4>
                          <p className="text-sm text-muted-foreground">
                            Notifications pour optimiser la consommation
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full justify-start">
                        <ChefHat className="w-4 h-4 mr-2" />
                        Voir les recettes
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Bell className="w-4 h-4 mr-2" />
                        Configurer les alertes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Actions Rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Scan className="w-4 h-4 mr-2" />
                  Scanner un nouveau produit
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="w-4 h-4 mr-2" />
                  Carte de traçabilité
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Play className="w-4 h-4 mr-2" />
                  Voir une vidéo d'origine
                </Button>
              </CardContent>
            </Card>

            {/* Producteurs Certifiés */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Producteurs Certifiés
                  </span>
                  <Button variant="ghost" size="sm">Voir tout</Button>
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {mockProducers.map((producer, index) => (
                    <motion.div
                      key={producer.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <img
                        src={producer.image}
                        alt={producer.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{producer.name}</h4>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span>{producer.location}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <Star className="w-3 h-3 text-yellow-500" />
                          <span>{producer.rating}</span>
                          <span className="text-muted-foreground">• {producer.products} produits</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Blockchain Verification */}
            <Card className="bg-gradient-to-r from-blue-50 to-cyan-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Vérification Blockchain
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Authenticité Garantie</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Chaque produit est vérifié sur la blockchain NaturaLink
                  </p>
                  <Button size="sm" className="w-full">
                    En savoir plus
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
        </div>
      </main>
    </div>
  );
}