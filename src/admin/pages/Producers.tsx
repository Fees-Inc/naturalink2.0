import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Wheat, 
  MapPin, 
  ShieldCheck, 
  Users,
  Search,
  Filter,
  Plus,
  TrendingUp,
  Package,
  Calendar,
  AlertTriangle
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AddProducerDialog } from "../components/dialogs/AddProducerDialog";
import { producerService } from "@/services/producerService";

export default function Producers() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { 
    data: producersData, 
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["producers", statusFilter],
    queryFn: () => producerService.getProducers({ page: 1, limit: 50 }),
    retry: 1,
  });

  const producers = producersData?.data ?? [];
  const filteredProducers = producers.filter(producer =>
    producer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const certifiedCount = producers.filter(p => p.certification_status === 'certified').length;
  const pendingCount = producers.filter(p => p.certification_status === 'pending').length;

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Producteurs & Coopératives
            </h1>
            <p className="text-muted-foreground mt-1">
              Gérer les producteurs et coopératives agricoles
            </p>
          </div>
          <Button 
            className="bg-[hsl(var(--nature-primary))] hover:bg-[hsl(var(--nature-primary))]/90"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Nouveau producteur
          </Button>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Erreur lors du chargement des producteurs. <Button variant="link" size="sm" onClick={() => refetch()}>Réessayer</Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total producteurs</p>
                  <p className="text-2xl font-bold">{isLoading ? "-" : (producersData?.total || "0")}</p>
                </div>
                <Wheat className="h-8 w-8 text-[hsl(var(--nature-primary))]" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Coopératives</p>
                  <p className="text-2xl font-bold">-</p>
                </div>
                <Users className="h-8 w-8 text-[hsl(var(--accent))]" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Certifiés</p>
                  <p className="text-2xl font-bold">{isLoading ? "-" : certifiedCount}</p>
                </div>
                <ShieldCheck className="h-8 w-8 text-[hsl(var(--nature-secondary))]" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">En attente</p>
                  <p className="text-2xl font-bold">{isLoading ? "-" : pendingCount}</p>
                </div>
                <Calendar className="h-8 w-8 text-[hsl(var(--accent))]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Rechercher un producteur..." 
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
              <SelectItem value="certified">Certifiés</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" disabled={isLoading}>
            <Filter className="h-4 w-4 mr-2" />
            Plus de filtres
          </Button>
        </div>

        {/* Producers List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">Chargement des producteurs...</p>
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">Impossible de charger les producteurs. Vérifiez votre connexion au serveur.</p>
            </div>
          ) : filteredProducers.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">Aucun producteur trouvé.</p>
            </div>
          ) : (
            filteredProducers.map((producer) => (
              <Card key={producer.id} className="glass-card hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={producer.avatar_url} />
                        <AvatarFallback>{producer.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{producer.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{producer.location}</span>
                        </div>
                      </div>
                    </div>
                    {producer.certification_status === 'certified' && (
                      <Badge className="badge-success">
                        <ShieldCheck className="h-3 w-3 mr-1" />
                        Certifié
                      </Badge>
                    )}
                    {producer.certification_status === 'pending' && (
                      <Badge variant="outline" className="text-[hsl(var(--accent))]">
                        En attente
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Produits</p>
                      <p className="font-semibold flex items-center gap-1">
                        <Package className="h-4 w-4" />
                        {producer.products_count || 0}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Gains</p>
                      <p className="font-semibold flex items-center gap-1">
                        <TrendingUp className="h-4 w-4 text-[hsl(var(--nature-primary))]" />
                        {(producer.total_earnings || 0).toLocaleString()} FCFA
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Voir détails
                    </Button>
                    <Button size="sm" className="flex-1 bg-[hsl(var(--nature-primary))] hover:bg-[hsl(var(--nature-primary))]/90">
                      Gérer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <AddProducerDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
        />
      </div>
    </div>
  );
}