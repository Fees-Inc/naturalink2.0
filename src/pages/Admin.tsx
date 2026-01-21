import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/landing/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  Package, 
  BarChart3, 
  Settings, 
  Shield, 
  Activity,
  Scan,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role: string;
  kyc_status: string;
  is_verified: boolean;
  created_at: string;
}

interface Product {
  id: string;
  name: string;
  status: string;
  origin_location?: string;
  created_at: string;
  user_id: string;
}

interface Analytics {
  totalUsers: number;
  totalProducts: number;
  totalScans: number;
  activeUsers: number;
  verifiedProducts: number;
}

export default function Admin() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [analytics, setAnalytics] = useState<Analytics>({
    totalUsers: 0,
    totalProducts: 0,
    totalScans: 0,
    activeUsers: 0,
    verifiedProducts: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user has admin role
    if (!user || !profile || profile.role !== 'admin') {
      navigate('/');
      return;
    }

    fetchDashboardData();
  }, [user, profile, navigate]);

  const fetchDashboardData = async () => {
    try {
      await Promise.all([
        fetchUsers(),
        fetchProducts(),
        fetchAnalytics()
      ]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    setUsers((data || []) as User[]);
  };

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    setProducts((data || []) as Product[]);
  };

  const fetchAnalytics = async () => {
    // Simulate analytics data
    setAnalytics({
      totalUsers: users.length,
      totalProducts: products.length,
      totalScans: 12847,
      activeUsers: Math.floor(users.length * 0.7),
      verifiedProducts: products.filter(p => p.status === 'active').length
    });
  };

  const updateUserStatus = async (userId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ kyc_status: status })
        .eq('user_id', userId);

      if (error) throw error;
      fetchUsers(); // Refresh users list
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const updateProductStatus = async (productId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ status })
        .eq('id', productId);

      if (error) throw error;
      fetchProducts(); // Refresh products list
    } catch (error) {
      console.error('Error updating product status:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      'approved': 'bg-green-100 text-green-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'rejected': 'bg-red-100 text-red-800',
      'active': 'bg-green-100 text-green-800',
      'inactive': 'bg-gray-100 text-gray-800'
    };

    return (
      <Badge className={statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'}>
        {status}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!profile || profile.role !== 'admin') {
    return (
      <div className="min-h-screen bg-secondary/30">
        <Navbar />
        <main className="pt-20 pb-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Accès non autorisé</h1>
            <p className="text-muted-foreground mb-6">
              Cette page est réservée aux administrateurs.
            </p>
            <Button onClick={() => navigate('/')}>
              Retour à l'accueil
            </Button>
          </div>
        </main>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary/30">
        <Navbar />
        <main className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-muted-foreground">Chargement du tableau de bord...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Shield className="w-8 h-8" />
              Tableau de bord Admin
            </h1>
            <p className="text-muted-foreground mt-2">
              Gérez les utilisateurs, produits et surveillez la plateforme NaturaLink
            </p>
          </div>

          {/* Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Utilisateurs</p>
                    <p className="text-2xl font-bold">{analytics.totalUsers}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Produits</p>
                    <p className="text-2xl font-bold">{analytics.totalProducts}</p>
                  </div>
                  <Package className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Scans NFC</p>
                    <p className="text-2xl font-bold">{analytics.totalScans.toLocaleString()}</p>
                  </div>
                  <Scan className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Utilisateurs Actifs</p>
                    <p className="text-2xl font-bold">{analytics.activeUsers}</p>
                  </div>
                  <Activity className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Produits Vérifiés</p>
                    <p className="text-2xl font-bold">{analytics.verifiedProducts}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-emerald-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="users" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="users">Utilisateurs</TabsTrigger>
              <TabsTrigger value="products">Produits</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Paramètres</TabsTrigger>
            </TabsList>

            {/* Users Tab */}
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>Gestion des Utilisateurs</CardTitle>
                  <CardDescription>
                    Approuvez, suspendez ou activez les comptes utilisateurs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold">
                              {user.first_name} {user.last_name}
                            </h4>
                            <Badge variant="outline">{user.role}</Badge>
                            {getStatusBadge(user.kyc_status)}
                          </div>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <p className="text-xs text-muted-foreground">
                            Inscrit le {formatDate(user.created_at)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Select
                            value={user.kyc_status}
                            onValueChange={(status) => updateUserStatus(user.id, status)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">En attente</SelectItem>
                              <SelectItem value="approved">Approuvé</SelectItem>
                              <SelectItem value="rejected">Rejeté</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Products Tab */}
            <TabsContent value="products">
              <Card>
                <CardHeader>
                  <CardTitle>Gestion des Produits</CardTitle>
                  <CardDescription>
                    Surveillez les produits enregistrés et gérez leur statut
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {products.map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold">{product.name}</h4>
                            {getStatusBadge(product.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Origine: {product.origin_location}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Ajouté le {formatDate(product.created_at)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Select
                            value={product.status}
                            onValueChange={(status) => updateProductStatus(product.id, status)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Actif</SelectItem>
                              <SelectItem value="inactive">Inactif</SelectItem>
                              <SelectItem value="flagged">Signalé</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Statistiques de Scanning</CardTitle>
                    <CardDescription>
                      Nombre de scans NFC par période
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">2,340</p>
                        <p className="text-sm text-muted-foreground">Aujourd'hui</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">16,420</p>
                        <p className="text-sm text-muted-foreground">Cette semaine</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">67,890</p>
                        <p className="text-sm text-muted-foreground">Ce mois</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Répartition par Région</CardTitle>
                    <CardDescription>
                      Consommation par région géographique
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { region: 'Abidjan', scans: 45230, percentage: 35 },
                        { region: 'Bouaké', scans: 23150, percentage: 18 },
                        { region: 'San-Pédro', scans: 18920, percentage: 15 },
                        { region: 'Yamoussoukro', scans: 15670, percentage: 12 },
                        { region: 'Autres', scans: 25480, percentage: 20 }
                      ].map((item) => (
                        <div key={item.region} className="flex items-center justify-between">
                          <span className="font-medium">{item.region}</span>
                          <div className="flex items-center gap-3">
                            <div className="w-24 bg-secondary rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full"
                                style={{ width: `${item.percentage}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground w-16 text-right">
                              {item.scans.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Gestion NFC/Blockchain</CardTitle>
                    <CardDescription>
                      Outils pour la génération et le suivi des étiquettes NFC
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full" variant="outline">
                      Générer de nouvelles étiquettes NFC
                    </Button>
                    <Button className="w-full" variant="outline">
                      Surveiller la blockchain VeChain
                    </Button>
                    <Button className="w-full" variant="outline">
                      Détecter les fraudes
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Outils Marketing</CardTitle>
                    <CardDescription>
                      Gérez les newsletters et campagnes
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full" variant="outline">
                      Créer une newsletter
                    </Button>
                    <Button className="w-full" variant="outline">
                      Campagnes ciblées
                    </Button>
                    <Button className="w-full" variant="outline">
                      Analytics marketing
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}