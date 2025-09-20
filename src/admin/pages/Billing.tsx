import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  CreditCard, 
  DollarSign, 
  Receipt, 
  TrendingUp,
  TrendingDown,
  Download,
  Send,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Package,
  FileText,
  Plus
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Billing() {
  const invoices = [
    {
      id: "INV-2024-001",
      client: "Auchan Dakar",
      amount: "450,000 FCFA",
      date: "2024-01-05",
      status: "paid",
      dueDate: "2024-01-15"
    },
    {
      id: "INV-2024-002",
      client: "Casino Saint-Louis",
      amount: "320,000 FCFA",
      date: "2024-01-03",
      status: "pending",
      dueDate: "2024-01-13"
    },
    {
      id: "INV-2024-003",
      client: "Coopérative Bio Sénégal",
      amount: "125,000 FCFA",
      date: "2024-01-01",
      status: "overdue",
      dueDate: "2024-01-08"
    }
  ];

  const subscriptions = [
    {
      name: "Auchan Dakar",
      plan: "Premium",
      price: "150,000 FCFA/mois",
      nextBilling: "15 Jan 2024",
      status: "active"
    },
    {
      name: "Casino Saint-Louis",
      plan: "Standard",
      price: "75,000 FCFA/mois",
      nextBilling: "20 Jan 2024",
      status: "active"
    },
    {
      name: "Marché Bio Thiès",
      plan: "Basique",
      price: "35,000 FCFA/mois",
      nextBilling: "25 Jan 2024",
      status: "trial"
    }
  ];

  const stickersUsage = [
    { month: "Jan", used: 280, revenue: "70,000 FCFA" },
    { month: "Déc", used: 350, revenue: "87,500 FCFA" },
    { month: "Nov", used: 420, revenue: "105,000 FCFA" },
    { month: "Oct", used: 380, revenue: "95,000 FCFA" }
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Billing & Finances
            </h1>
            <p className="text-muted-foreground mt-1">
              Facturation, abonnements et paiements
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
            <Button className="bg-[hsl(var(--nature-primary))] hover:bg-[hsl(var(--nature-primary))]/90">
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle facture
            </Button>
          </div>
        </div>

        {/* Financial Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="h-8 w-8 text-[hsl(var(--nature-primary))]" />
                <Badge className="badge-success">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +24%
                </Badge>
              </div>
              <p className="text-2xl font-bold">320,000</p>
              <p className="text-sm text-muted-foreground">FCFA ce mois</p>
              <Progress value={75} className="h-2 mt-3" />
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <CreditCard className="h-8 w-8 text-[hsl(var(--accent))]" />
                <span className="text-xs font-semibold text-[hsl(var(--nature-primary))]">32</span>
              </div>
              <p className="text-2xl font-bold">32</p>
              <p className="text-sm text-muted-foreground">Abonnements actifs</p>
              <div className="flex gap-1 mt-3">
                {[...Array(8)].map((_, i) => (
                  <div 
                    key={i}
                    className="flex-1 h-4 rounded"
                    style={{
                      backgroundColor: i < 6 ? "hsl(var(--accent))" : "hsl(var(--muted))"
                    }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Package className="h-8 w-8 text-[hsl(var(--nature-secondary))]" />
                <Badge variant="outline">NFC</Badge>
              </div>
              <p className="text-2xl font-bold">1,280</p>
              <p className="text-sm text-muted-foreground">Stickers vendus</p>
              <div className="text-xs text-[hsl(var(--nature-primary))] mt-2">
                250 FCFA/unité
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Receipt className="h-8 w-8 text-destructive" />
                <AlertCircle className="h-4 w-4 text-destructive" />
              </div>
              <p className="text-2xl font-bold">5</p>
              <p className="text-sm text-muted-foreground">Factures en attente</p>
              <p className="text-xs text-destructive mt-2">
                85,000 FCFA à collecter
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="invoices" className="space-y-6">
          <TabsList className="grid w-full max-w-lg grid-cols-4">
            <TabsTrigger value="invoices">Factures</TabsTrigger>
            <TabsTrigger value="subscriptions">Abonnements</TabsTrigger>
            <TabsTrigger value="stickers">Stickers NFC</TabsTrigger>
            <TabsTrigger value="payments">Paiements</TabsTrigger>
          </TabsList>

          <TabsContent value="invoices" className="space-y-4">
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Factures récentes
                  </CardTitle>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes</SelectItem>
                      <SelectItem value="paid">Payées</SelectItem>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="overdue">En retard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {invoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-4 rounded-lg bg-background/50 border">
                      <div className="flex items-start gap-4">
                        <div className="mt-1">
                          {invoice.status === "paid" && (
                            <CheckCircle className="h-5 w-5 text-[hsl(var(--nature-primary))]" />
                          )}
                          {invoice.status === "pending" && (
                            <Clock className="h-5 w-5 text-[hsl(var(--accent))]" />
                          )}
                          {invoice.status === "overdue" && (
                            <AlertCircle className="h-5 w-5 text-destructive" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm">{invoice.id}</span>
                            {invoice.status === "paid" && (
                              <Badge className="badge-success">Payée</Badge>
                            )}
                            {invoice.status === "pending" && (
                              <Badge variant="outline" className="text-[hsl(var(--accent))]">
                                En attente
                              </Badge>
                            )}
                            {invoice.status === "overdue" && (
                              <Badge variant="destructive">En retard</Badge>
                            )}
                          </div>
                          <p className="text-sm font-semibold mt-1">{invoice.client}</p>
                          <p className="text-xs text-muted-foreground">
                            Émise le {invoice.date} • Échéance: {invoice.dueDate}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{invoice.amount}</p>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="ghost">
                            <Download className="h-4 w-4" />
                          </Button>
                          {invoice.status === "pending" && (
                            <Button size="sm" variant="outline">
                              <Send className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscriptions" className="space-y-4">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">Abonnements actifs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subscriptions.map((sub, index) => (
                    <div key={index} className="p-4 rounded-lg bg-background/50 border">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{sub.name}</h4>
                            <Badge variant="outline">{sub.plan}</Badge>
                            {sub.status === "trial" && (
                              <Badge className="text-[hsl(var(--accent))]">Essai</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {sub.price}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            <Calendar className="inline h-3 w-3 mr-1" />
                            Prochain paiement: {sub.nextBilling}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Gérer
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stickers" className="space-y-4">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">Consommation de stickers NFC</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-[hsl(var(--nature-primary))]/10">
                      <p className="text-sm text-muted-foreground">Stock actuel</p>
                      <p className="text-2xl font-bold">2,450</p>
                      <p className="text-xs text-[hsl(var(--nature-primary))]">unités disponibles</p>
                    </div>
                    <div className="p-4 rounded-lg bg-[hsl(var(--accent))]/10">
                      <p className="text-sm text-muted-foreground">Prix unitaire</p>
                      <p className="text-2xl font-bold">250</p>
                      <p className="text-xs text-muted-foreground">FCFA</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold">Historique d'utilisation</h4>
                    {stickersUsage.map((usage) => (
                      <div key={usage.month} className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                        <div>
                          <p className="font-medium">{usage.month}</p>
                          <p className="text-sm text-muted-foreground">{usage.used} stickers</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{usage.revenue}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full bg-[hsl(var(--nature-primary))] hover:bg-[hsl(var(--nature-primary))]/90">
                    Commander des stickers
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-4">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">Historique des paiements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between gap-2">
                  {["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil"].map((month, i) => (
                    <div key={month} className="flex-1 flex flex-col items-center gap-2">
                      <div 
                        className="w-full bg-gradient-to-t from-[hsl(var(--nature-primary))] to-[hsl(var(--accent))] rounded-t"
                        style={{ height: `${Math.random() * 70 + 30}%` }}
                      />
                      <span className="text-xs text-muted-foreground">{month}</span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6 text-center">
                  <div>
                    <p className="text-2xl font-bold">2.1M</p>
                    <p className="text-sm text-muted-foreground">Total YTD</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[hsl(var(--nature-primary))]">+18%</p>
                    <p className="text-sm text-muted-foreground">Croissance</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">98%</p>
                    <p className="text-sm text-muted-foreground">Taux collecte</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}