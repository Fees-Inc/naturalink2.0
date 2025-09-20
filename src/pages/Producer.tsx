import { useState, useEffect } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Plus, Package, BarChart3, Users, Settings, 

    User, 
  History, 
  Award, 
  TrendingUp, 
  AlertTriangle, 
  MessageCircle, 

  Calendar,
  MapPin,
  Phone,
  Mail
 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";


interface Product {
  id: string;
  name: string;
  status: "available" | "sold" | "expired";
  quantity: number;
  harvestDate: string;
  expiryDate: string;
  location: string;
}

interface Producer {
  name: string;
  location: string;
  phone: string;
  email: string;
  joinDate: string;
  certifications: string[];
  totalProducts: number;
  totalSales: number;
}

const mockProducer: Producer = {
  name: "Ferme Bio Abidjan",
  location: "Abidjan, Côte d'Ivoire",
  phone: "+225 07 12 34 56 78",
  email: "contact@fermebio-abidjan.ci",
  joinDate: "2023-01-15",
  certifications: ["Bio", "NaturaLink Certifié", "Commerce Équitable"],
  totalProducts: 156,
  totalSales: 89
};

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Bananes Biologiques",
    status: "available",
    quantity: 50,
    harvestDate: "2024-01-15",
    expiryDate: "2024-01-25",
    location: "Champ A1"
  },
  {
    id: "2",
    name: "Ananas Victoria",
    status: "sold",
    quantity: 30,
    harvestDate: "2024-01-10",
    expiryDate: "2024-01-30",
    location: "Champ B2"
  },
  {
    id: "3",
    name: "Mangues Kent",
    status: "available",
    quantity: 25,
    harvestDate: "2024-01-20",
    expiryDate: "2024-02-05",
    location: "Champ C1"
  }
];
export default function Producer() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
   const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Seulement si l’utilisateur est connecté ET n’a pas le bon rôle
    if (user && profile && profile.role !== "producer") {
      navigate(`/${profile.role}`);
    }
  }, [user, profile, navigate]);
   useEffect(() => {
      // Simuler le chargement des données
      setTimeout(() => {
        setProducts(mockProducts);
        setLoading(false);
      }, 1000);
    }, []);

      const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-100 text-green-800";
      case "sold": return "bg-blue-100 text-blue-800";
      case "expired": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "available": return "Disponible";
      case "sold": return "Vendu";
      case "expired": return "Expiré";
      default: return status;
    }
  };

  const stats = [
    { label: "Produits Actifs", value: "24", icon: Package },
    { label: "Vues ce mois", value: "1,245", icon: BarChart3 },
    { label: "Étiquettes NFC", value: "156", icon: Package },
    { label: "Clients Atteints", value: "89", icon: Users }
  ];

  const recentProducts = [
    {
      id: "1",
      name: "Ananas Bio Victoria",
      lot: "LOT-2024-001",
      quantity: 50,
      status: "Actif",
      nfcCount: 48
    },
    {
      id: "2", 
      name: "Café Robusta Premium",
      lot: "LOT-2024-002",
      quantity: 100,
      status: "Actif",
      nfcCount: 95
    }
  ];

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* <Navbar /> */}
            {/* Header */}
      <div className="border-b bg-card/50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
          >
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Espace Producteur
              </h1>
              <p className="text-muted-foreground text-lg">
                Gérez vos produits et communiquez avec votre communauté
              </p>
            </div>
            
            <div className="flex gap-4">
              <Button variant="outline" size="lg">
                <MessageCircle className="w-5 h-5 mr-2" />
                Support
              </Button>
              {/* <Button size="lg">
                <Package className="w-5 h-5 mr-2" />
                Ajouter un produit
              </Button> */}
            </div>
          </motion.div>
        </div>
      </div>
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index}>
                  <CardContent className="flex items-center p-6">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                    <div className="w-12 h-12 nature-gradient rounded-lg flex items-center justify-center ml-4">
                      <IconComponent className="w-6 h-6 text-primary-foreground" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">

            <Card className="cursor-pointer hover:shadow-medium transition-smooth" onClick={() => navigate('/producer/purchase')}>
              <CardHeader className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">Acheter NFC</CardTitle>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:shadow-medium transition-smooth">
              <CardHeader className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-purple-500 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">Analytics</CardTitle>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:shadow-medium transition-smooth">
              <CardHeader className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-orange-500 rounded-xl flex items-center justify-center">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">Paramètres</CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Recent Products */}

      <div className="max-w-7xl mx-auto  py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card className="p-6">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{mockProducer.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {mockProducer.location}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{mockProducer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{mockProducer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Membre depuis {new Date(mockProducer.joinDate).getFullYear()}</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Certifications
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {mockProducer.certifications.map((cert, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{mockProducer.totalProducts}</div>
                    <div className="text-xs text-muted-foreground">Produits total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{mockProducer.totalSales}</div>
                    <div className="text-xs text-muted-foreground">Vendus</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6 p-6">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Actions Rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Forum Producteurs
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Mes Statistiques
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Alertes (3)
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {products.filter(p => p.status === "available").length}
                </div>
                <div className="text-sm text-muted-foreground">Produits Disponibles</div>
              </Card>
              
              <Card className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {products.filter(p => p.status === "sold").length}
                </div>
                <div className="text-sm text-muted-foreground">Produits Vendus</div>
              </Card>
              
              <Card className="p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                </div>
                <div className="text-3xl font-bold text-orange-600 mb-1">
                  {products.filter(p => new Date(p.expiryDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).length}
                </div>
                <div className="text-sm text-muted-foreground">Bientôt Expirés</div>
              </Card>
            </div>

            {/* Products List */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <History className="w-5 h-5" />
                    Mes Produits Récents
                  </CardTitle>
                  <CardDescription>
                    Suivi de vos derniers produits ajoutés
                  </CardDescription>
                </div>
                <Button variant="outline">Voir tout</Button>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {products.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold">{product.name}</h4>
                          <Badge className={getStatusColor(product.status)}>
                            {getStatusText(product.status)}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <div>Quantité: {product.quantity} kg • Lieu: {product.location}</div>
                          <div>
                            Récolte: {new Date(product.harvestDate).toLocaleDateString()} • 
                            Expiration: {new Date(product.expiryDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Modifier
                        </Button>
                        <Button variant="outline" size="sm">
                          Détails
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      <div className="flex">
              <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => navigate('/')}>
                            Retour
                          </Button>
                        </div>
               </div>
        </div>

        
      </main>
    </div>
  );
}