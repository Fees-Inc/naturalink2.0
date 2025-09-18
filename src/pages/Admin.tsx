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
    // Simulate loading demo data
    setTimeout(() => {
      setUsers([
        {
          id: "1",
          email: "demo@example.com",
          first_name: "Demo",
          last_name: "User",
          role: "producer",
          kyc_status: "approved",
          is_verified: true,
          created_at: "2024-01-01"
        }
      ]);
      setProducts([
        {
          id: "1",
          name: "Bananes Bio",
          status: "active",
          origin_location: "Côte d'Ivoire",
          created_at: "2024-01-01",
          user_id: "1"
        }
      ]);
      setAnalytics({
        totalUsers: 125,
        totalProducts: 340,
        totalScans: 12847,
        activeUsers: 87,
        verifiedProducts: 298
      });
      setLoading(false);
    }, 1000);
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary/30">
        <Navbar />
        <main className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-muted-foreground">Chargement du tableau de bord... (Mode démo)</p>
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
              Tableau de bord Admin (Mode démo)
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
          <Card>
            <CardHeader>
              <CardTitle>Données de démonstration</CardTitle>
              <CardDescription>
                Ceci est une version de démonstration. Les données affichées sont simulées.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Dans la version complète, vous auriez accès à la gestion des utilisateurs, 
                des produits, aux analyses détaillées et aux paramètres système.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}