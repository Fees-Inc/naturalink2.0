import { useState } from "react";
import { 
  Search, 
  Filter, 
  UserPlus, 
  MoreVertical,
  Shield,
  Ban,
  Edit,
  Mail
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface User {
  id: string;
  name: string;
  email: string;
  role: "producteur" | "cooperative" | "distributeur" | "entreprise";
  status: "active" | "pending" | "suspended";
  members?: number;
  joinDate: string;
  lastActive: string;
}

const users: User[] = [
  {
    id: "1",
    name: "Ferme du Soleil",
    email: "contact@fermesoleil.com",
    role: "producteur",
    status: "active",
    joinDate: "2024-01-15",
    lastActive: "Il y a 2h",
  },
  {
    id: "2",
    name: "Coopérative Bio Valley",
    email: "admin@biovalley.com",
    role: "cooperative",
    status: "active",
    members: 45,
    joinDate: "2023-11-20",
    lastActive: "En ligne",
  },
  {
    id: "3",
    name: "Distribution Nature",
    email: "info@distribution-nature.com",
    role: "distributeur",
    status: "pending",
    joinDate: "2024-03-10",
    lastActive: "Il y a 1j",
  },
  {
    id: "4",
    name: "AgroTech Solutions",
    email: "contact@agrotech.com",
    role: "entreprise",
    status: "active",
    joinDate: "2024-02-28",
    lastActive: "Il y a 5h",
  },
  {
    id: "5",
    name: "Ferme Écologique",
    email: "ferme@eco.com",
    role: "producteur",
    status: "suspended",
    joinDate: "2023-12-05",
    lastActive: "Il y a 1 sem",
  },
];

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const getRoleBadgeColor = (role: User["role"]) => {
    switch (role) {
      case "producteur":
        return "badge-success";
      case "cooperative":
        return "bg-[hsl(var(--nature-secondary))]/10 text-[hsl(var(--nature-secondary))]";
      case "distributeur":
        return "badge-warning";
      case "entreprise":
        return "bg-[hsl(var(--sky-blue))]/10 text-[hsl(var(--sky-blue))]";
    }
  };

  const getStatusBadgeColor = (status: User["status"]) => {
    switch (status) {
      case "active":
        return "badge-success";
      case "pending":
        return "badge-warning";
      case "suspended":
        return "badge-danger";
    }
  };

  const getRoleLabel = (role: User["role"]) => {
    switch (role) {
      case "producteur":
        return "Producteur";
      case "cooperative":
        return "Coopérative";
      case "distributeur":
        return "Distributeur";
      case "entreprise":
        return "Entreprise";
    }
  };

  const getStatusLabel = (status: User["status"]) => {
    switch (status) {
      case "active":
        return "Actif";
      case "pending":
        return "En attente";
      case "suspended":
        return "Suspendu";
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Gestion des Utilisateurs
            </h1>
            <p className="text-muted-foreground mt-1">
              {users.length} utilisateurs enregistrés
            </p>
          </div>
          <Button className="nature-gradient text-white">
            <UserPlus className="h-4 w-4 mr-2" />
            Nouvel utilisateur
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 glass-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">250</p>
                <p className="text-sm text-muted-foreground">Producteurs</p>
              </div>
              <div className="p-2 rounded-lg bg-[hsl(var(--nature-primary))]/10">
                <Shield className="h-5 w-5 text-[hsl(var(--nature-primary))]" />
              </div>
            </div>
          </Card>
          <Card className="p-4 glass-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">22</p>
                <p className="text-sm text-muted-foreground">Coopératives</p>
              </div>
              <div className="p-2 rounded-lg bg-[hsl(var(--nature-secondary))]/10">
                <Shield className="h-5 w-5 text-[hsl(var(--nature-secondary))]" />
              </div>
            </div>
          </Card>
          <Card className="p-4 glass-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">10</p>
                <p className="text-sm text-muted-foreground">Distributeurs</p>
              </div>
              <div className="p-2 rounded-lg bg-[hsl(var(--accent))]/10">
                <Shield className="h-5 w-5 text-[hsl(var(--accent))]" />
              </div>
            </div>
          </Card>
          <Card className="p-4 glass-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">En attente</p>
              </div>
              <div className="p-2 rounded-lg bg-[hsl(var(--accent))]/10">
                <Shield className="h-5 w-5 text-[hsl(var(--accent))]" />
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un utilisateur..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[200px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filtrer par rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les rôles</SelectItem>
                <SelectItem value="producteur">Producteur</SelectItem>
                <SelectItem value="cooperative">Coopérative</SelectItem>
                <SelectItem value="distributeur">Distributeur</SelectItem>
                <SelectItem value="entreprise">Entreprise</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="active">Actif</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="suspended">Suspendu</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Users Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date d'inscription</TableHead>
                <TableHead>Dernière activité</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {user.role === "cooperative" && user.members ? (
                        <div className="flex -space-x-2">
                          {[...Array(Math.min(3, user.members))].map((_, i) => (
                            <Avatar key={i} className="h-8 w-8 border-2 border-background">
                              <AvatarFallback className="text-xs bg-gradient-to-br from-[hsl(var(--nature-primary))] to-[hsl(var(--nature-secondary))] text-white">
                                {user.name.substring(0, 1)}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {user.members > 3 && (
                            <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                              <span className="text-xs text-muted-foreground">+{user.members - 3}</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-gradient-to-br from-[hsl(var(--nature-primary))] to-[hsl(var(--nature-secondary))] text-white">
                            {user.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRoleBadgeColor(user.role)}>
                      {getRoleLabel(user.role)}
                      {user.members && ` (${user.members} membres)`}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(user.status)}>
                      {getStatusLabel(user.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(user.joinDate).toLocaleDateString('fr-FR')}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {user.lastActive === "En ligne" && (
                        <div className="h-2 w-2 rounded-full bg-[hsl(var(--nature-primary))] animate-pulse" />
                      )}
                      <span className="text-sm text-muted-foreground">{user.lastActive}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="h-4 w-4 mr-2" />
                          Envoyer un email
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Ban className="h-4 w-4 mr-2" />
                          Suspendre
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}