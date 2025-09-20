import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { 
  Mail, 
  MessageSquare, 
  Bell, 
  Megaphone,
  Users,
  Send,
  Calendar,
  Target,
  Zap,
  TrendingUp,
  Eye,
  MousePointer,
  Plus,
  Edit,
  Trash2
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Marketing() {
  const campaigns = [
    {
      id: 1,
      name: "Promo Mangues Bio",
      type: "Email",
      status: "active",
      audience: "2,450",
      sent: 1850,
      opened: 1240,
      clicked: 450,
      conversion: 12
    },
    {
      id: 2,
      name: "Nouveaux Producteurs",
      type: "SMS",
      status: "scheduled",
      audience: "850",
      sent: 0,
      opened: 0,
      clicked: 0,
      conversion: 0
    },
    {
      id: 3,
      name: "Newsletter Mensuelle",
      type: "Email",
      status: "completed",
      audience: "5,200",
      sent: 5200,
      opened: 3640,
      clicked: 890,
      conversion: 8
    }
  ];

  const notifications = [
    {
      title: "Nouveau producteur certifié",
      message: "Un nouveau producteur bio a rejoint votre région",
      target: "Distributeurs Dakar",
      scheduled: "Dans 2 heures"
    },
    {
      title: "Promotion spéciale",
      message: "20% de réduction sur les produits locaux",
      target: "Tous les utilisateurs",
      scheduled: "Demain 10h00"
    }
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Marketing & Communication
            </h1>
            <p className="text-muted-foreground mt-1">
              Campagnes, newsletters et notifications
            </p>
          </div>
          <Button className="bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))]/90 text-accent-foreground">
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle campagne
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Mail className="h-8 w-8 text-[hsl(var(--nature-primary))]" />
                <Badge className="badge-success">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +18%
                </Badge>
              </div>
              <p className="text-2xl font-bold">65%</p>
              <p className="text-sm text-muted-foreground">Taux d'ouverture</p>
              <Progress value={65} className="h-2 mt-3" />
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <MousePointer className="h-8 w-8 text-[hsl(var(--accent))]" />
                <span className="text-xs text-[hsl(var(--nature-primary))]">CTR</span>
              </div>
              <p className="text-2xl font-bold">24%</p>
              <p className="text-sm text-muted-foreground">Taux de clic</p>
              <Progress value={24} className="h-2 mt-3" />
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-8 w-8 text-[hsl(var(--nature-secondary))]" />
                <Zap className="h-4 w-4 text-[hsl(var(--accent))]" />
              </div>
              <p className="text-2xl font-bold">12,450</p>
              <p className="text-sm text-muted-foreground">Contacts actifs</p>
              <div className="flex gap-1 mt-3">
                {[...Array(10)].map((_, i) => (
                  <div 
                    key={i} 
                    className="flex-1 h-4 rounded"
                    style={{
                      backgroundColor: i < 7 ? "hsl(var(--nature-primary))" : "hsl(var(--muted))"
                    }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Target className="h-8 w-8 text-[hsl(var(--accent))]" />
                <Badge variant="outline">ROI</Badge>
              </div>
              <p className="text-2xl font-bold">3.2x</p>
              <p className="text-sm text-muted-foreground">Retour sur invest.</p>
              <div className="h-8 mt-1">
                <svg className="w-full h-full">
                  <polyline
                    points="0,25 20,20 40,22 60,15 80,10 100,12"
                    fill="none"
                    stroke="hsl(var(--nature-primary))"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="campaigns" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="campaigns">Campagnes</TabsTrigger>
            <TabsTrigger value="composer">Composer</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="space-y-4">
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Megaphone className="h-5 w-5" />
                    Campagnes actives
                  </CardTitle>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Filtrer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes</SelectItem>
                      <SelectItem value="active">Actives</SelectItem>
                      <SelectItem value="scheduled">Programmées</SelectItem>
                      <SelectItem value="completed">Terminées</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaigns.map((campaign) => (
                    <div key={campaign.id} className="p-4 rounded-lg bg-background/50 border">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{campaign.name}</h3>
                            <Badge variant="outline">{campaign.type}</Badge>
                            {campaign.status === "active" && (
                              <Badge className="badge-success">Actif</Badge>
                            )}
                            {campaign.status === "scheduled" && (
                              <Badge variant="outline" className="text-[hsl(var(--accent))]">
                                Programmé
                              </Badge>
                            )}
                            {campaign.status === "completed" && (
                              <Badge variant="secondary">Terminé</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Audience: {campaign.audience} contacts
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {campaign.status !== "scheduled" && (
                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Envoyés</p>
                            <p className="font-semibold flex items-center gap-1">
                              <Send className="h-3 w-3" />
                              {campaign.sent}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Ouverts</p>
                            <p className="font-semibold flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {campaign.opened}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Clics</p>
                            <p className="font-semibold flex items-center gap-1">
                              <MousePointer className="h-3 w-3" />
                              {campaign.clicked}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Conversion</p>
                            <p className="font-semibold text-[hsl(var(--nature-primary))]">
                              {campaign.conversion}%
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="composer" className="space-y-4">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">Créer une campagne</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nom de la campagne</label>
                    <Input placeholder="Ex: Promo de saison" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner le type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="sms">SMS</SelectItem>
                        <SelectItem value="push">Notification Push</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Audience cible</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner l'audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les utilisateurs</SelectItem>
                      <SelectItem value="producers">Producteurs</SelectItem>
                      <SelectItem value="distributors">Distributeurs</SelectItem>
                      <SelectItem value="cooperatives">Coopératives</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Objet</label>
                  <Input placeholder="Objet du message" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea 
                    placeholder="Écrivez votre message ici..." 
                    className="min-h-[150px]"
                  />
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1 bg-[hsl(var(--nature-primary))] hover:bg-[hsl(var(--nature-primary))]/90">
                    <Send className="h-4 w-4 mr-2" />
                    Envoyer maintenant
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    Programmer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications programmées
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notif, index) => (
                    <div key={index} className="p-4 rounded-lg bg-background/50 border">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h4 className="font-semibold">{notif.title}</h4>
                          <p className="text-sm text-muted-foreground">{notif.message}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <Badge variant="outline">
                              <Users className="h-3 w-3 mr-1" />
                              {notif.target}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              <Calendar className="inline h-3 w-3 mr-1" />
                              {notif.scheduled}
                            </span>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}