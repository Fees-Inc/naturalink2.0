import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
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
  Calendar
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AddProducerDialog } from "../components/dialogs/AddProducerDialog";


export default function Producers() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [producers, setProducers] = useState([
    {
      id: 1,
      name: "Coopérative Bio Sénégal",
      avatar: "/placeholder.svg",
      members: 45,
      location: "Dakar, Sénégal",
      certified: true,
      products: 12,
      lastActive: "Il y a 2 heures",
      revenue: "850,000 FCFA",
      status: "active"
    },
    {
      id: 2,
      name: "Ferme Écologique Ndioum",
      avatar: "/placeholder.svg",
      members: 1,
      location: "Saint-Louis, Sénégal",
      certified: true,
      products: 8,
      lastActive: "Il y a 1 jour",
      revenue: "320,000 FCFA",
      status: "active"
    },
    {
      id: 3,
      name: "Association Agricole Thiès",
      avatar: "/placeholder.svg",
      members: 28,
      location: "Thiès, Sénégal",
      certified: false,
      products: 5,
      lastActive: "Il y a 3 jours",
      revenue: "150,000 FCFA",
      status: "pending"
    }
  ]);

  const handleAddProducer = (newProducer: any) => {
    setProducers([...producers, newProducer]);
  };

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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total producteurs</p>
                  <p className="text-2xl font-bold">250</p>
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
                  <p className="text-2xl font-bold">22</p>
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
                  <p className="text-2xl font-bold">185</p>
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
                  <p className="text-2xl font-bold">15</p>
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
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="active">Actif</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="suspended">Suspendu</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="individual">Individuel</SelectItem>
              <SelectItem value="cooperative">Coopérative</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Plus de filtres
          </Button>
        </div>

        {/* Producers List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {producers.map((producer) => (
            <Card key={producer.id} className="glass-card hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={producer.avatar} />
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
                  {producer.certified && (
                    <Badge className="badge-success">
                      <ShieldCheck className="h-3 w-3 mr-1" />
                      Certifié
                    </Badge>
                  )}
                  {producer.status === "pending" && (
                    <Badge variant="outline" className="text-[hsl(var(--accent))]">
                      En attente
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Membres</p>
                    <p className="font-semibold flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {producer.members}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Produits</p>
                    <p className="font-semibold flex items-center gap-1">
                      <Package className="h-4 w-4" />
                      {producer.products}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Revenus</p>
                    <p className="font-semibold flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-[hsl(var(--nature-primary))]" />
                      {producer.revenue}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Activité</p>
                    <p className="text-sm">{producer.lastActive}</p>
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
          ))}
        </div>

        <AddProducerDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onAddProducer={handleAddProducer}
        />
      </div>
    </div>
  );
}