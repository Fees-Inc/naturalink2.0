import { useState, useEffect } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, TrendingUp, Users, MapPin, Building, Globe, 
  Calendar,
  Filter,
  Download,
  Settings,
  ArrowUpRight,
  Eye, 
  Package, 
  Target,
  AlertTriangle, 
  Truck,
  PieChart,
  Recycle,
  Heart,
  Leaf,
  Factory,
  ArrowRight,
 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const expiringProducts = [
  {
    name: "Pommes de terre bio Normandie",
    quantity: "450 kg",
    expiry: "2 jours",
    location: "Entrepôt Rungis",
    recommendation: "Compost industriel",
    urgency: "haute"
  },
  {
    name: "Carottes Nantaises",
    quantity: "280 kg", 
    expiry: "3 jours",
    location: "Hub Lyon",
    recommendation: "Transformation jus",
    urgency: "moyenne"
  },
  {
    name: "Courgettes locales",
    quantity: "120 kg",
    expiry: "1 jour",
    location: "Centre Paris",
    recommendation: "Don association",
    urgency: "critique"
  }
];

const cooperatives = [
  {
    name: "Coop Bio Bretagne",
    reliability: 94,
    regularity: 87,
    volumes: "2.4T/mois",
    speciality: "Légumes bio",
    rating: 4.8
  },
  {
    name: "Producteurs Unis Normandie", 
    reliability: 91,
    regularity: 93,
    volumes: "3.1T/mois",
    speciality: "Fruits & légumes",
    rating: 4.6
  },
  {
    name: "Circuit Court Val de Loire",
    reliability: 88,
    regularity: 90,
    volumes: "1.8T/mois", 
    speciality: "Maraîchage",
    rating: 4.5
  }
];

const redirectionCircuits = [
  {
    type: "Compost Industriel",
    description: "Valorisation en compost de qualité",
    capacity: "500T/mois",
    cost: "€45/tonne",
    impact: "-85% déchets",
    icon: Recycle
  },
  {
    type: "Alimentation Animale",
    description: "Transformation pour nutrition animale",
    capacity: "300T/mois", 
    cost: "€25/tonne",
    impact: "+40% valeur",
    icon: Users
  },
  {
    type: "Biogaz",
    description: "Production d'énergie renouvelable",
    capacity: "800T/mois",
    cost: "€35/tonne", 
    impact: "12 MWh/T",
    icon: Leaf
  }
];



export default function Distributor() {

  const [activeTab, setActiveTab] = useState('dashboard');
  const { user, profile } = useAuth();
  const navigate = useNavigate();
useEffect(() => {
// Rediriger seulement si un utilisateur est connecté avec un autre rôle
if (user && profile && profile.role !== "distributor") {
  navigate(`/${profile.role}`);
}
}, [user, profile, navigate]);


  const stats = [
    { label: "Produits Suivis", value: "1,247", icon: BarChart3 },
    { label: "Partenaires Actifs", value: "23", icon: Users },
    { label: "Scans ce mois", value: "8,945", icon: TrendingUp },
    { label: "Régions Couvertes", value: "12", icon: MapPin }
  ];

  const partners = [
    {
      id: "1",
      name: "Coopérative ANADER",
      location: "Bonoua",
      products: 45,
      lastUpdate: "2024-01-15",
      quality: "Excellente"
    },
    {
      id: "2",
      name: "SCOOP-CA Daloa", 
      location: "Daloa",
      products: 32,
      lastUpdate: "2024-01-14",
      quality: "Très bonne"
    }
  ];
    const StatCard = ({ icon: Icon, title, value, change, trend }: any) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="p-6 border border-border bg-card hover:shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{title}</p>
              <p className="text-2xl font-bold text-foreground">{value}</p>
            </div>
          </div>
          <div className={`flex items-center gap-1 ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
            <ArrowUpRight className="w-4 h-4" />
            <span className="text-sm font-medium">{change}</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );

  const SupplyChainCard = ({ title, origin, destination, status, products }: any) => (
    <Card className="p-6 border border-border bg-card">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-foreground">{title}</h4>
        <Badge variant={status === 'active' ? 'default' : 'secondary'}>
          {status}
        </Badge>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{origin} → {destination}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Package className="w-4 h-4" />
          <span>{products} products</span>
        </div>
      </div>
    </Card>
  );

  const AlertCard = ({ type, message, priority, time }: any) => {
    const getPriorityColor = (priority: string) => {
      switch (priority) {
        case 'high': return 'text-red-500 bg-red-50 border-red-200';
        case 'medium': return 'text-yellow-500 bg-yellow-50 border-yellow-200';
        case 'low': return 'text-blue-500 bg-blue-50 border-blue-200';
        default: return 'text-gray-500 bg-gray-50 border-gray-200';
      }
    };

    return (
      <Card className={`p-4 border ${getPriorityColor(priority)}`}>
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 mt-0.5" />
          <div className="flex-1">
            <p className="font-medium text-sm">{message}</p>
            <p className="text-xs opacity-75 mt-1">{time}</p>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* <Navbar /> */}
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Dashboard Distributeur
              </h1>
              <p className="text-xl text-muted-foreground">
                Bienvenue {profile?.first_name} - {profile?.company_name}
              </p>
            </div>
            <Button onClick={() => navigate('/distributor/subscribe')}>
              <Building className="w-4 h-4 mr-2" />
              Gérer Abonnement
            </Button>
          </div>

          {/* Stats Grid
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
          </div> */}

          {/* Quick Actions */}
          {/* <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="cursor-pointer hover:shadow-medium transition-smooth">
              <CardHeader className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-blue-500 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">Analytics API</CardTitle>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:shadow-medium transition-smooth">
              <CardHeader className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-green-500 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">Chaîne Supply</CardTitle>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:shadow-medium transition-smooth">
              <CardHeader className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-purple-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">Partenaires</CardTitle>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:shadow-medium transition-smooth">
              <CardHeader className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-orange-500 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">Logistique</CardTitle>
              </CardHeader>
            </Card>
          </div> */}

          {/* Partners Overview */}
          {/* <Card>
            <CardHeader>
              <CardTitle>Partenaires Coopératives</CardTitle>
              <CardDescription>
                Suivi de la qualité et performance de vos partenaires producteurs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {partners.map((partner) => (
                  <div key={partner.id} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{partner.name}</h4>
                      <p className="text-sm text-muted-foreground">📍 {partner.location}</p>
                      <p className="text-sm text-muted-foreground">{partner.products} produits actifs</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant="secondary">
                        {partner.quality}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        MAJ: {partner.lastUpdate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card> */}
        </div>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">📊 Dashboard</TabsTrigger>
            <TabsTrigger value="supply-chain">📦 Supply Chain</TabsTrigger>
            <TabsTrigger value="unsold">🗂️ Unsold Products</TabsTrigger>
            <TabsTrigger value="redirection">♻️ Redirection</TabsTrigger>
            <TabsTrigger value="partners">🤝 Partners</TabsTrigger>
            <TabsTrigger value="logistics">⚠️ Logistics</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >

            

                  
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                  icon={BarChart3}
                  title="Total Scans This Month"
                  value="24,583"
                  change="+12.5%"
                  trend="up"
                />
                <StatCard
                  icon={Users}
                  title="Active Consumers"
                  value="8,429"
                  change="+8.2%"
                  trend="up"
                />
                <StatCard
                  icon={Package}
                  title="Products Tracked"
                  value="1,247"
                  change="+3.1%"
                  trend="up"
                />
                <StatCard
                  icon={TrendingUp}
                  title="Revenue Growth"
                  value="15.8%"
                  change="+2.3%"
                  trend="up"
                />
              </div>

              {/* Analytics Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Consumer Behavior Analysis</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Product Scans</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Location Tracking</span>
                        <span>72%</span>
                      </div>
                      <Progress value={72} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Repeat Scans</span>
                        <span>64%</span>
                      </div>
                      <Progress value={64} className="h-2" />
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Geographic Distribution</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Paris Region</span>
                      <Badge>32%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Lyon Region</span>
                      <Badge variant="secondary">24%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Marseille Region</span>
                      <Badge variant="secondary">18%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Other Regions</span>
                      <Badge variant="outline">26%</Badge>
                    </div>
                  </div>
                </Card>
                
              {/* Produits necessitant */}
                    <Card className="shadow-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-orange" />
                          Produits Nécessitant une Attention
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {[
                            { produit: "Pommes de terre bio", quantite: "450kg", expiration: "2 jours", action: "Redirection compost" },
                            { produit: "Carottes Nantaises", quantite: "280kg", expiration: "3 jours", action: "Transformation jus" },
                            { produit: "Courgettes locales", quantite: "120kg", expiration: "1 jour", action: "Don association" }
                          ].map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                              <div className="flex-1">
                                <div className="font-medium">{item.produit}</div>
                                <div className="text-sm text-muted-foreground">{item.quantite} • Exp. dans {item.expiration}</div>
                              </div>
                              <Badge variant="outline" className="border-orange text-orange">
                                {item.action}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    {/* Traçabilité */}
                    <Card className="shadow-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Target className="h-5 w-5 text-leaf" />
                          Traçabilité & Qualité
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-4 bg-secondary/50 rounded-lg">
                            <div className="text-2xl font-bold text-primary">94%</div>
                            <div className="text-sm text-muted-foreground">Traçabilité complète</div>
                          </div>
                          <div className="text-center p-4 bg-leaf/10 rounded-lg">
                            <div className="text-2xl font-bold text-leaf">87%</div>
                            <div className="text-sm text-muted-foreground">Certification bio</div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Produits locaux (&lt;100km)</span>
                            <Badge variant="secondary" className="bg-gold/20 text-gold-foreground">76%</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Emballage recyclable</span>
                            <Badge variant="secondary" className="bg-leaf/20 text-leaf">91%</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Transport vert</span>
                            <Badge variant="secondary" className="bg-primary/20 text-primary">68%</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                          {/* Main Analytics */}

              </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Comportements Consommateurs */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Comportements Consommateurs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-leaf/10 rounded-lg">
                <div className="text-2xl font-bold text-leaf">68%</div>
                <div className="text-sm text-muted-foreground">Achat bio privilégié</div>
              </div>
              <div className="text-center p-4 bg-gold/10 rounded-lg">
                <div className="text-2xl font-bold text-gold">3.2x</div>
                <div className="text-sm text-muted-foreground">Fréquence semaine</div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Préférences par Zone</h4>
              {[
                { zone: "Centre-ville", preference: "Produits premium", pourcentage: 85 },
                { zone: "Périphérie", preference: "Rapport qualité-prix", pourcentage: 72 },
                { zone: "Rural", preference: "Produits locaux", pourcentage: 91 }
              ].map((item) => (
                <div key={item.zone} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                  <div>
                    <div className="font-medium">{item.zone}</div>
                    <div className="text-sm text-muted-foreground">{item.preference}</div>
                  </div>
                  <Badge variant="secondary" className="bg-primary/20 text-primary">
                    {item.pourcentage}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cartographie Interactive */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-leaf" />
              Circuits Logistiques
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-48 bg-secondary/20 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Carte interactive des circuits</p>
                <p className="text-xs text-muted-foreground mt-1">Visualisation temps réel</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-primary/10 rounded-lg text-center">
                <div className="text-lg font-bold text-primary">847km</div>
                <div className="text-xs text-muted-foreground">Distance moyenne</div>
              </div>
              <div className="p-3 bg-leaf/10 rounded-lg text-center">
                <div className="text-lg font-bold text-leaf">12h</div>
                <div className="text-xs text-muted-foreground">Temps transport</div>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="text-sm font-medium">Routes Optimisées</h5>
              {[
                { route: "Paris ↔ Normandie", efficacite: "92%", co2: "-15%" },
                { route: "Lyon ↔ Provence", efficacite: "89%", co2: "-12%" },
                { route: "Lille ↔ Belgique", efficacite: "94%", co2: "-18%" }
              ].map((route) => (
                <div key={route.route} className="flex items-center justify-between text-sm p-2 bg-secondary/20 rounded">
                  <span className="font-medium">{route.route}</span>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs border-leaf text-leaf">{route.efficacite}</Badge>
                    <Badge variant="outline" className="text-xs border-primary text-primary">{route.co2}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rapports ESG */}
      
      <Card className="shadow-card my-4 p-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5 text-accent" />
            Indicateurs ESG & RSE
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Environnemental</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Réduction CO₂</span>
                  <span className="text-leaf font-medium">-23%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Déchets valorisés</span>
                  <span className="text-leaf font-medium">89%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Eau économisée</span>
                  <span className="text-leaf font-medium">156L/kg</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Social</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Producteurs soutenus</span>
                  <span className="text-accent font-medium">234</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Emplois créés</span>
                  <span className="text-accent font-medium">89</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Formation dispensées</span>
                  <span className="text-accent font-medium">156h</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Gouvernance</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Transparence données</span>
                  <span className="text-orange font-medium">94%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Audits réalisés</span>
                  <span className="text-orange font-medium">12</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Conformité RGPD</span>
                  <span className="text-orange font-medium">100%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
            </motion.div>
               <div className="flex">
              <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Exporter
                          </Button>
                          <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90">
                            Rapport ESG
                          </Button>
                        </div>
               </div>
          </TabsContent>

          {/* Supply Chain Tab */}
          <TabsContent value="supply-chain" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Supply Chain Circuits</h3>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View Map
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <SupplyChainCard
                  title="Organic Vegetables Circuit"
                  origin="Normandy Farms"
                  destination="Paris Distribution Center"
                  status="active"
                  products="145"
                />
                <SupplyChainCard
                  title="Dairy Products Circuit"
                  origin="Bretagne Cooperative"
                  destination="Lyon Hub"
                  status="active"
                  products="89"
                />
                <SupplyChainCard
                  title="Seasonal Fruits Circuit"
                  origin="Provence Orchards"
                  destination="Marseille Market"
                  status="pending"
                  products="67"
                />
              </div>

              <Card className="p-6 mt-8">
                <h4 className="text-lg font-semibold mb-4">Logistics Flow Visualization</h4>
                <div className="flex items-center justify-center h-64 bg-muted/30 rounded-lg">
                  <div className="text-center">
                    <Truck className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Interactive logistics map will be displayed here</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Unsold Products Tab */}
          <TabsContent value="unsold" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold mb-6">Unsold Products Inventory</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Package className="w-8 h-8 text-primary" />
                    <div>
                      <h4 className="font-semibold">Total Unsold</h4>
                      <p className="text-2xl font-bold">2,341</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">Products awaiting redistribution</p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="w-8 h-8 text-yellow-500" />
                    <div>
                      <h4 className="font-semibold">Expiring Soon</h4>
                      <p className="text-2xl font-bold">156</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">Next 7 days</p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="w-8 h-8 text-blue-500" />
                    <div>
                      <h4 className="font-semibold">Zones Active</h4>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">Distribution zones</p>
                </Card>
              </div>

              <Card className="p-6">
                <h4 className="text-lg font-semibold mb-4">Unsold by Zone</h4>
                <div className="space-y-4">
                  {['Zone A - Paris Nord', 'Zone B - Lyon Est', 'Zone C - Marseille Sud'].map((zone, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium">{zone}</p>
                        <p className="text-sm text-muted-foreground">234 products • 45% of capacity</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Redirection Tab */}
          <TabsContent value="redirection" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold mb-6">Recovery Channels</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="p-6 text-center">
                  <Recycle className="w-8 h-8 text-green-500 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Composting</h4>
                  <p className="text-2xl font-bold">1,245</p>
                  <p className="text-sm text-muted-foreground">kg redirected</p>
                </Card>

                <Card className="p-6 text-center">
                  <Factory className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Biogas</h4>
                  <p className="text-2xl font-bold">890</p>
                  <p className="text-sm text-muted-foreground">kg processed</p>
                </Card>

                <Card className="p-6 text-center">
                  <Heart className="w-8 h-8 text-red-500 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Donations</h4>
                  <p className="text-2xl font-bold">567</p>
                  <p className="text-sm text-muted-foreground">kg donated</p>
                </Card>

                <Card className="p-6 text-center">
                  <Package className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Animal Feed</h4>
                  <p className="text-2xl font-bold">345</p>
                  <p className="text-sm text-muted-foreground">kg converted</p>
                </Card>
              </div>

              <Card className="p-6">
                <h4 className="text-lg font-semibold mb-4">Recovery Partners</h4>
                <div className="space-y-3">
                  {[
                    { name: 'EcoCompost France', type: 'Composting', capacity: '85%' },
                    { name: 'Biogas Solutions', type: 'Energy', capacity: '92%' },
                    { name: 'Food Banks Network', type: 'Donations', capacity: '67%' },
                    { name: 'Agricultural Feed Co.', type: 'Animal Feed', capacity: '78%' }
                  ].map((partner, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium">{partner.name}</p>
                        <p className="text-sm text-muted-foreground">{partner.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{partner.capacity}</p>
                        <p className="text-sm text-muted-foreground">Capacity</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expiring Products */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange" />
              Produits Proches d'Expiration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {expiringProducts.map((product, index) => (
              <div key={index} className="p-4 bg-secondary/20 rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{product.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Package className="h-3 w-3" />
                        {product.quantity}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {product.location}
                      </span>
                    </div>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={`${
                      product.urgency === "critique" 
                        ? "bg-destructive/20 text-destructive" 
                        : product.urgency === "haute"
                        ? "bg-orange/20 text-orange"
                        : "bg-accent/20 text-accent"
                    }`}
                  >
                    {product.expiry}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Recycle className="h-4 w-4 text-leaf" />
                    <span className="text-sm font-medium text-leaf">{product.recommendation}</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Rediriger
                  </Button>
                </div>
              </div>
            ))}
            
            <Button variant="outline" className="w-full">
              Voir Tous les Produits
            </Button>
          </CardContent>
        </Card>

        {/* Redirection Circuits */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowRight className="h-5 w-5 text-primary" />
              Circuits de Redirection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {redirectionCircuits.map((circuit, index) => (
              <div key={index} className="p-4 bg-secondary/20 rounded-lg space-y-3">
                <div className="flex items-center gap-3">
                  <circuit.icon className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{circuit.type}</h4>
                    <p className="text-sm text-muted-foreground">{circuit.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-2 bg-background rounded">
                    <div className="text-sm font-medium text-foreground">{circuit.capacity}</div>
                    <div className="text-xs text-muted-foreground">Capacité</div>
                  </div>
                  <div className="p-2 bg-background rounded">
                    <div className="text-sm font-medium text-foreground">{circuit.cost}</div>
                    <div className="text-xs text-muted-foreground">Coût</div>
                  </div>
                  <div className="p-2 bg-background rounded">
                    <div className="text-sm font-medium text-leaf">{circuit.impact}</div>
                    <div className="text-xs text-muted-foreground">Impact</div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

    {/* Transport Optimization */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-leaf" />
            Optimisation Transport
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Routes Actives</h4>
              {[
                { route: "Paris → Rungis", status: "En cours", vehicles: 3, efficiency: 94 },
                { route: "Lyon → Provence", status: "Programmé", vehicles: 2, efficiency: 87 },
                { route: "Lille → Nord", status: "Terminé", vehicles: 1, efficiency: 91 }
              ].map((route, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Truck className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium text-foreground">{route.route}</div>
                      <div className="text-sm text-muted-foreground">{route.vehicles} véhicules</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant="secondary" 
                      className={`mb-1 ${
                        route.status === "En cours" 
                          ? "bg-orange/20 text-orange" 
                          : route.status === "Programmé"
                          ? "bg-accent/20 text-accent"
                          : "bg-leaf/20 text-leaf"
                      }`}
                    >
                      {route.status}
                    </Badge>
                    <div className="text-sm font-medium text-foreground">{route.efficiency}%</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Métriques Transport</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-primary/10 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary">847km</div>
                  <div className="text-sm text-muted-foreground">Distance totale</div>
                </div>
                <div className="p-4 bg-leaf/10 rounded-lg text-center">
                  <div className="text-2xl font-bold text-leaf">-23%</div>
                  <div className="text-sm text-muted-foreground">CO₂ vs mois dernier</div>
                </div>
                <div className="p-4 bg-accent/10 rounded-lg text-center">
                  <div className="text-2xl font-bold text-accent">12.4h</div>
                  <div className="text-sm text-muted-foreground">Temps moyen</div>
                </div>
                <div className="p-4 bg-gold/10 rounded-lg text-center">
                  <div className="text-2xl font-bold text-gold">94%</div>
                  <div className="text-sm text-muted-foreground">Taux livraison</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>


            </motion.div>
          </TabsContent>

          {/* Partners Tab */}
          <TabsContent value="partners" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold mb-6">Partner Cooperative Management</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <Card className="p-6">
                  <h4 className="text-lg font-semibold mb-4">Contracted Producers</h4>
                  <div className="space-y-4">
                    {[
                      { name: 'Normandy Organic Farms', region: 'Normandy', quality: '98%', products: 45 },
                      { name: 'Bretagne Cooperative', region: 'Brittany', quality: '96%', products: 32 },
                      { name: 'Provence Orchards', region: 'Provence', quality: '94%', products: 28 }
                    ].map((producer, index) => (
                      <div key={index} className="p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium">{producer.name}</h5>
                          <Badge>{producer.quality} Quality</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{producer.region} • {producer.products} products</p>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h4 className="text-lg font-semibold mb-4">Quality Monitoring</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Overall Quality Score</span>
                        <span>96%</span>
                      </div>
                      <Progress value={96} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Certification Compliance</span>
                        <span>98%</span>
                      </div>
                      <Progress value={98} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Delivery Timeliness</span>
                        <span>92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          </TabsContent>

          {/* Logistics Tab */}
          <TabsContent value="logistics" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold mb-6">Logistics Tools & Alerts</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h4 className="text-lg font-semibold mb-4">Recent Alerts</h4>
                  <div className="space-y-3">
                    <AlertCard
                      type="expiration"
                      message="156 products expiring in next 3 days in Zone A"
                      priority="high"
                      time="2 hours ago"
                    />
                    <AlertCard
                      type="reallocation"
                      message="Recommend redirecting 45 items to food bank"
                      priority="medium"
                      time="4 hours ago"
                    />
                    <AlertCard
                      type="quality"
                      message="Quality inspection required for Batch #2341"
                      priority="low"
                      time="6 hours ago"
                    />
                  </div>
                </Card>

                <Card className="p-6">
                  <h4 className="text-lg font-semibold mb-4">Recommended Actions</h4>
                  <div className="space-y-3">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h5 className="font-medium text-green-800 mb-2">Composting Opportunity</h5>
                      <p className="text-sm text-green-700">234 kg of vegetable waste ready for composting</p>
                      <Button size="sm" className="mt-2">
                        Schedule Pickup
                      </Button>
                    </div>
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h5 className="font-medium text-blue-800 mb-2">Donation Match</h5>
                      <p className="text-sm text-blue-700">Food bank requests match 89 available items</p>
                      <Button size="sm" variant="outline" className="mt-2">
                        Arrange Donation
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
      </main>
    </div>
  );
}