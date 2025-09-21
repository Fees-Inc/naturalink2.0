import { useState } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, QrCode, Smartphone, Leaf, Award, Clock, TrendingUp, Target, Zap, Globe, Trophy, Gift, BarChart3, Calendar, AlertCircle, CheckCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ProductDetailModal } from "@/components/ui/ProductDetailModal";
import { ProducerDetailModal } from "@/components/ui/ProducerDetailModal";
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

interface NutritionalEntry {
  id: string;
  productName: string;
  origin: string;
  type: 'bio' | 'conventionnel' | 'local';
  nutritionalValue: {
    vitamins: number;
    minerals: number;
    fiber: number;
    protein: number;
  };
  scanDate: string;
  carbonFootprint: number;
}

interface HealthBioScore {
  overall: number;
  bioPercentage: number;
  localPercentage: number;
  sustainabilityScore: number;
  nutritionalScore: number;
  monthlyTrend: 'up' | 'down' | 'stable';
}

interface Recommendation {
  id: string;
  type: 'nutrition' | 'local' | 'sustainability';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  action: string;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
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

// Mock data pour les nouvelles fonctionnalités
const mockNutritionalHistory: NutritionalEntry[] = [
  {
    id: "1",
    productName: "Bananes Bio Premium",
    origin: "Abidjan, Côte d'Ivoire",
    type: "bio",
    nutritionalValue: {
      vitamins: 85,
      minerals: 78,
      fiber: 92,
      protein: 45
    },
    scanDate: "2024-01-15",
    carbonFootprint: 0.2
  },
  {
    id: "2",
    productName: "Ananas Victoria",
    origin: "Grand-Bassam, Côte d'Ivoire",
    type: "local",
    nutritionalValue: {
      vitamins: 90,
      minerals: 82,
      fiber: 88,
      protein: 38
    },
    scanDate: "2024-01-14",
    carbonFootprint: 0.1
  },
  {
    id: "3",
    productName: "Riz Conventionnel",
    origin: "Asie",
    type: "conventionnel",
    nutritionalValue: {
      vitamins: 60,
      minerals: 65,
      fiber: 70,
      protein: 85
    },
    scanDate: "2024-01-13",
    carbonFootprint: 1.2
  }
];

const mockHealthBioScore: HealthBioScore = {
  overall: 72,
  bioPercentage: 65,
  localPercentage: 80,
  sustainabilityScore: 78,
  nutritionalScore: 85,
  monthlyTrend: 'up'
};

const mockRecommendations: Recommendation[] = [
  {
    id: "1",
    type: "nutrition",
    title: "Augmentez votre apport en fibres locales",
    description: "Vous consommez peu de fibres locales (manioc, igname). Découvrez des producteurs certifiés près de chez vous.",
    priority: "high",
    action: "Voir les producteurs de manioc"
  },
  {
    id: "2",
    type: "sustainability",
    title: "Réduisez votre empreinte carbone",
    description: "Privilégiez les produits locaux pour réduire votre impact environnemental.",
    priority: "medium",
    action: "Découvrir les producteurs locaux"
  }
];

const mockBadges: Badge[] = [
  {
    id: "1",
    name: "Pionnier Bio",
    description: "Premier scan d'un produit bio",
    icon: "🌱",
    earned: true,
    earnedDate: "2024-01-10"
  },
  {
    id: "2",
    name: "Local Hero",
    description: "10 produits locaux scannés",
    icon: "🏆",
    earned: true,
    earnedDate: "2024-01-15"
  },
  {
    id: "3",
    name: "Éco-Consommateur",
    description: "Score environnemental > 80%",
    icon: "🌍",
    earned: false
  }
];

export default function Consumer() {
  const [scanInput, setScanInput] = useState("");
  const { user, profile } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProducer, setSelectedProducer] = useState<Producer | null>(null);
  const [isProducerModalOpen, setIsProducerModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  useEffect(() => {
    // Seulement rediriger si l'utilisateur est connecté mais n'a pas le bon rôle
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
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Espace Consommateur
            </h1>
            <p className="text-xl text-muted-foreground">
              Découvrez l'origine et l'authenticité de vos produits
            </p>
          </div>

          {/* Tabs Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              <TabsTrigger value="impact">Impact</TabsTrigger>
              <TabsTrigger value="gamification">Badges</TabsTrigger>
            </TabsList>

            {/* Tab Content */}
            <TabsContent value="overview" className="space-y-8">
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
                          onClick={() => {
                            setSelectedProduct(product);
                            setIsModalOpen(true);
                          }}
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
            </TabsContent>

            {/* Nutrition Tab */}
            <TabsContent value="nutrition" className="space-y-8">
              {/* Score Santé-Bio */}
              <Card className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-6 h-6 text-green-600" />
                    Votre Score Santé-Bio
                  </CardTitle>
                  <CardDescription>
                    Un indicateur unique de vos choix alimentaires sains et durables
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-6xl font-bold text-green-600 mb-2">
                      {mockHealthBioScore.overall}%
                    </div>
                    <p className="text-lg text-muted-foreground">
                      Votre alimentation est {mockHealthBioScore.overall}% bio-local ce mois-ci 🌱
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-600">+5% ce mois</span>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-semibold text-green-600 mb-1">
                        {mockHealthBioScore.bioPercentage}%
                      </div>
                      <p className="text-sm text-muted-foreground">Produits Bio</p>
                      <Progress value={mockHealthBioScore.bioPercentage} className="mt-2" />
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-semibold text-blue-600 mb-1">
                        {mockHealthBioScore.localPercentage}%
                      </div>
                      <p className="text-sm text-muted-foreground">Produits Locaux</p>
                      <Progress value={mockHealthBioScore.localPercentage} className="mt-2" />
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-semibold text-purple-600 mb-1">
                        {mockHealthBioScore.sustainabilityScore}%
                      </div>
                      <p className="text-sm text-muted-foreground">Durabilité</p>
                      <Progress value={mockHealthBioScore.sustainabilityScore} className="mt-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Historique Nutritionnel */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-6 h-6" />
                    Historique Nutritionnel Personnel
                  </CardTitle>
                  <CardDescription>
                    Suivez vos choix alimentaires et leur impact nutritionnel
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockNutritionalHistory.map((entry) => (
                      <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-semibold">{entry.productName}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {entry.origin}
                            </span>
                            <Badge variant={entry.type === 'bio' ? 'default' : entry.type === 'local' ? 'secondary' : 'outline'}>
                              {entry.type}
                            </Badge>
                            <span>{entry.scanDate}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-sm font-medium">Score Nutrition</div>
                            <div className="text-lg font-semibold text-green-600">
                              {Math.round((entry.nutritionalValue.vitamins + entry.nutritionalValue.minerals + entry.nutritionalValue.fiber + entry.nutritionalValue.protein) / 4)}%
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">CO₂</div>
                            <div className="text-lg font-semibold text-orange-600">
                              {entry.carbonFootprint}kg
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recommandations Personnalisées */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-6 h-6" />
                    Recommandations Personnalisées
                  </CardTitle>
                  <CardDescription>
                    Suggestions pour optimiser votre alimentation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockRecommendations.map((rec) => (
                      <div key={rec.id} className={`p-4 border rounded-lg ${
                        rec.priority === 'high' ? 'border-red-200 bg-red-50' : 
                        rec.priority === 'medium' ? 'border-yellow-200 bg-yellow-50' : 
                        'border-blue-200 bg-blue-50'
                      }`}>
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            rec.priority === 'high' ? 'bg-red-500' : 
                            rec.priority === 'medium' ? 'bg-yellow-500' : 
                            'bg-blue-500'
                          }`} />
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1">{rec.title}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                            <Button size="sm" variant="outline">
                              {rec.action}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Impact Tab */}
            <TabsContent value="impact" className="space-y-8">
              {/* Impact Environnemental */}
              <Card className="bg-gradient-to-r from-blue-50 to-cyan-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-6 h-6 text-blue-600" />
                    Votre Impact Positif
                  </CardTitle>
                  <CardDescription>
                    Estimation de votre contribution à un monde plus durable
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-blue-600 mb-2">-2.3kg</div>
                        <p className="text-muted-foreground">CO₂ économisé ce mois</p>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Produits locaux</span>
                          <span className="font-semibold">-1.8kg CO₂</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Produits bio</span>
                          <span className="font-semibold">-0.5kg CO₂</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-green-600 mb-2">85%</div>
                        <p className="text-muted-foreground">Moins de pesticides</p>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Vitamines préservées</span>
                          <span className="font-semibold">+23%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Minéraux naturels</span>
                          <span className="font-semibold">+18%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bénéfices Santé */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-6 h-6 text-red-500" />
                    Bénéfices Santé
                  </CardTitle>
                  <CardDescription>
                    Les avantages de vos choix alimentaires pour votre santé
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                        <div>
                          <h4 className="font-semibold mb-1">Moins de pesticides</h4>
                          <p className="text-sm text-muted-foreground">
                            Réduction de 85% de l'exposition aux résidus chimiques
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                        <div>
                          <h4 className="font-semibold mb-1">Plus de vitamines</h4>
                          <p className="text-sm text-muted-foreground">
                            +23% de vitamines naturelles préservées
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                        <div>
                          <h4 className="font-semibold mb-1">Frais et local</h4>
                          <p className="text-sm text-muted-foreground">
                            Produits consommés dans les 48h après récolte
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                        <div>
                          <h4 className="font-semibold mb-1">Saison optimal</h4>
                          <p className="text-sm text-muted-foreground">
                            Consommation respectueuse des cycles naturels
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Gamification Tab */}
            <TabsContent value="gamification" className="space-y-8">
              {/* Badges */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                    Vos Badges
                  </CardTitle>
                  <CardDescription>
                    Collectionnez des récompenses pour vos choix durables
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    {mockBadges.map((badge) => (
                      <div key={badge.id} className={`p-6 border rounded-lg text-center ${
                        badge.earned ? 'border-yellow-200 bg-yellow-50' : 'border-gray-200 bg-gray-50'
                      }`}>
                        <div className="text-4xl mb-3">{badge.icon}</div>
                        <h4 className="font-semibold mb-2">{badge.name}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{badge.description}</p>
                        {badge.earned ? (
                          <div className="text-xs text-green-600 font-medium">
                            Obtenu le {badge.earnedDate}
                          </div>
                        ) : (
                          <div className="text-xs text-muted-foreground">
                            En cours...
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Classement Régional */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-6 h-6" />
                    Classement Régional
                  </CardTitle>
                  <CardDescription>
                    Comparez votre score avec les autres consommateurs de votre région
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                        <div>
                          <div className="font-semibold">Vous</div>
                          <div className="text-sm text-muted-foreground">Abidjan, Côte d'Ivoire</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-yellow-600">72%</div>
                        <div className="text-sm text-muted-foreground">Score Santé-Bio</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold">2</div>
                        <div>
                          <div className="font-semibold">Marie K.</div>
                          <div className="text-sm text-muted-foreground">Abidjan, Côte d'Ivoire</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-600">68%</div>
                        <div className="text-sm text-muted-foreground">Score Santé-Bio</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold">3</div>
                        <div>
                          <div className="font-semibold">Ahmed D.</div>
                          <div className="text-sm text-muted-foreground">Abidjan, Côte d'Ivoire</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-orange-600">65%</div>
                        <div className="text-sm text-muted-foreground">Score Santé-Bio</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Récompenses */}
              <Card className="bg-gradient-to-r from-purple-50 to-pink-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="w-6 h-6 text-purple-600" />
                    Récompenses Disponibles
                  </CardTitle>
                  <CardDescription>
                    Des avantages concrets pour vos choix durables
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border border-purple-200 rounded-lg bg-white">
                      <h4 className="font-semibold mb-2">Réduction 10%</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Sur votre prochain achat chez Ferme Bio Abidjan
                      </p>
                      <Button size="sm" className="w-full">
                        Utiliser
                      </Button>
                    </div>
                    <div className="p-4 border border-purple-200 rounded-lg bg-white">
                      <h4 className="font-semibold mb-2">Livraison gratuite</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Pour votre prochaine commande de produits locaux
                      </p>
                      <Button size="sm" className="w-full">
                        Utiliser
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
      />

      {/* Producer Detail Modal */}
      <ProducerDetailModal
        producer={selectedProducer}
        isOpen={isProducerModalOpen}
        onClose={() => {
          setIsProducerModalOpen(false);
          setSelectedProducer(null);
        }}
      />
    </div>
  );
}