import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Building2, 
  MapPin, 
  Package, 
  TrendingUp,
  Truck,
  DollarSign,
  Calendar,
  Plus,
  Filter,
  Search,
  AlertTriangle
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AddDistributorDialog } from "../components/dialogs/AddDistributorDialog";
import { distributorService } from "@/services/distributorService";

export default function Distributors() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { 
    data: distributorsData,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["distributors", statusFilter],
    queryFn: () => distributorService.getDistributors({ page: 1, limit: 50 }),
    retry: 1,
  });

  const distributors = distributorsData?.data ?? [];
  const filteredDistributors = distributors.filter(distributor =>
    distributor.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    distributor.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Distributeurs & Partenaires
            </h1>
            <p className="text-muted-foreground mt-1">
              Gérer le réseau de distribution et les points de vente
            </p>
          </div>
          <Button 
            className="bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))]/90"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Nouveau distributeur
          </Button>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Erreur lors du chargement des distributeurs. <Button variant="link" size="sm" onClick={() => refetch()}>Réessayer</Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total distributeurs</p>
                  <p className="text-2xl font-bold">{isLoading ? "-" : (distributorsData?.total || "0")}</p>
                </div>
                <Building2 className="h-8 w-8 text-[hsl(var(--accent))]" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Produits distribués</p>
                  <p className="text-2xl font-bold">{isLoading ? "-" : distributors.reduce((sum, d) => sum + (d.total_products_distributed || 0), 0)}</p>
                </div>
                <Package className="h-8 w-8 text-[hsl(var(--nature-primary))]" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Achats totaux</p>
                  <p className="text-2xl font-bold">{isLoading ? "-" : `${(distributors.reduce((sum, d) => sum + (Number(d.total_purchases) || 0), 0) / 1000000).toFixed(1)}M`}</p>
                </div>
                <DollarSign className="h-8 w-8 text-[hsl(var(--nature-secondary))]" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Performance moyenne</p>
                  <p className="text-2xl font-bold">{isLoading ? "-" : "87%"}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Rechercher un distributeur..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter} disabled={isLoading}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="active">Actifs</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" disabled={isLoading}>
            <Filter className="h-4 w-4 mr-2" />
            Plus de filtres
          </Button>
        </div>

        {/* Distributors List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {isLoading ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">Chargement des distributeurs...</p>
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">Impossible de charger les distributeurs. Vérifiez votre connexion au serveur.</p>
            </div>
          ) : filteredDistributors.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">Aucun distributeur trouvé.</p>
            </div>
          ) : (
            filteredDistributors.map((distributor) => (
              <Card key={distributor.id} className="glass-card hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={distributor.profile?.avatar_url} />
                        <AvatarFallback>{distributor.company_name.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{distributor.company_name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{distributor.location}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-[hsl(var(--accent))]/20 text-[hsl(var(--accent))]">
                      <Truck className="h-3 w-3 mr-1" />
                      Actif
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Produits distribués</p>
                      <p className="font-semibold flex items-center gap-1">
                        <Package className="h-4 w-4" />
                        {distributor.total_products_distributed || 0}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Achats totaux</p>
                      <p className="font-semibold flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-[hsl(var(--accent))]" />
                        {(Number(distributor.total_purchases) || 0).toLocaleString()} FCFA
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium text-muted-foreground">Performance</span>
                      <span className="text-xs font-semibold">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground mb-2">Personne de contact</p>
                    <p className="text-sm font-medium">{distributor.contact_person || "N/A"}</p>
                    <p className="text-xs text-muted-foreground">{distributor.email}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Voir détails
                    </Button>
                    <Button size="sm" className="flex-1 bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))]/90">
                      Gérer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <AddDistributorDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
        />
      </div>
    </div>
  );
}
