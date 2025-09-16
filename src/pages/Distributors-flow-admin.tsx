import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
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
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Distributors() {
  const distributors = [
    {
      id: 1,
      name: "Auchan Dakar",
      type: "Supermarché",
      avatar: "/placeholder.svg",
      location: "Dakar, Sénégal",
      volumeMonth: "12,500 kg",
      revenue: "4,200,000 FCFA",
      products: 45,
      performance: 92,
      status: "active",
      lastOrder: "Il y a 3 heures"
    },
    {
      id: 2,
      name: "Casino Saint-Louis",
      type: "Hypermarché",
      avatar: "/placeholder.svg",
      location: "Saint-Louis, Sénégal",
      volumeMonth: "8,300 kg",
      revenue: "2,800,000 FCFA",
      products: 32,
      performance: 85,
      status: "active",
      lastOrder: "Il y a 1 jour"
    },
    {
      id: 3,
      name: "Marché Bio Thiès",
      type: "Marché local",
      avatar: "/placeholder.svg",
      location: "Thiès, Sénégal",
      volumeMonth: "3,200 kg",
      revenue: "980,000 FCFA",
      products: 18,
      performance: 78,
      status: "pending",
      lastOrder: "Il y a 2 jours"
    }
  ];

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
              Gérer les points de distribution et partenaires commerciaux
            </p>
          </div>
          <Button className="bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))]/90 text-accent-foreground">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau distributeur
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total distributeurs</p>
                  <p className="text-2xl font-bold">10</p>
                  <p className="text-xs text-[hsl(var(--nature-primary))] mt-1">+2 ce mois</p>
                </div>
                <Building2 className="h-8 w-8 text-[hsl(var(--accent))]" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Volume mensuel</p>
                  <p className="text-2xl font-bold">24T</p>
                  <p className="text-xs text-[hsl(var(--nature-primary))] mt-1">+15%</p>
                </div>
                <Package className="h-8 w-8 text-[hsl(var(--nature-primary))]" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">CA généré</p>
                  <p className="text-2xl font-bold">8M</p>
                  <p className="text-xs text-muted-foreground mt-1">FCFA ce mois</p>
                </div>
                <DollarSign className="h-8 w-8 text-[hsl(var(--nature-secondary))]" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Livraisons</p>
                  <p className="text-2xl font-bold">142</p>
                  <p className="text-xs text-muted-foreground mt-1">Cette semaine</p>
                </div>
                <Truck className="h-8 w-8 text-[hsl(var(--accent))]" />
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
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="supermarket">Supermarché</SelectItem>
              <SelectItem value="hypermarket">Hypermarché</SelectItem>
              <SelectItem value="local">Marché local</SelectItem>
              <SelectItem value="online">E-commerce</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Zone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les zones</SelectItem>
              <SelectItem value="dakar">Dakar</SelectItem>
              <SelectItem value="thies">Thiès</SelectItem>
              <SelectItem value="saint-louis">Saint-Louis</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Plus de filtres
          </Button>
        </div>

        {/* Distributors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {distributors.map((distributor) => (
            <Card key={distributor.id} className="glass-card hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={distributor.avatar} />
                      <AvatarFallback>{distributor.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{distributor.name}</CardTitle>
                      <Badge variant="outline" className="mt-1">
                        {distributor.type}
                      </Badge>
                    </div>
                  </div>
                  {distributor.status === "active" && (
                    <Badge className="badge-success">
                      Actif
                    </Badge>
                  )}
                  {distributor.status === "pending" && (
                    <Badge variant="outline" className="text-[hsl(var(--accent))]">
                      En validation
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{distributor.location}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Performance</span>
                    <span className="font-semibold">{distributor.performance}%</span>
                  </div>
                  <Progress value={distributor.performance} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Volume/mois</p>
                    <p className="font-semibold">{distributor.volumeMonth}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">CA généré</p>
                    <p className="font-semibold">{distributor.revenue}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Produits</p>
                    <p className="font-semibold flex items-center gap-1">
                      <Package className="h-4 w-4" />
                      {distributor.products}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Dernière cmd</p>
                    <p className="text-sm">{distributor.lastOrder}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Statistiques
                  </Button>
                  <Button size="sm" className="flex-1 bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))]/90 text-accent-foreground">
                    Gérer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}