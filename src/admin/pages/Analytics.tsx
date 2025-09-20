import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  PieChart,
  LineChart,
  Map,
  Download,
  Calendar,
  Users,
  Package,
  ShoppingCart,
  Eye
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Analytics() {
  const topProducts = [
    { name: "Tomates Bio", sales: 450, trend: 12, revenue: "1,350,000 FCFA" },
    { name: "Mangues Premium", sales: 380, trend: 8, revenue: "1,140,000 FCFA" },
    { name: "Riz Local", sales: 320, trend: -5, revenue: "960,000 FCFA" },
    { name: "Oignons Frais", sales: 290, trend: 15, revenue: "580,000 FCFA" },
    { name: "Pommes de Terre", sales: 250, trend: 3, revenue: "500,000 FCFA" }
  ];

  const regions = [
    { name: "Dakar", percentage: 45, color: "hsl(var(--nature-primary))" },
    { name: "Thiès", percentage: 25, color: "hsl(var(--accent))" },
    { name: "Saint-Louis", percentage: 18, color: "hsl(var(--nature-secondary))" },
    { name: "Autres", percentage: 12, color: "hsl(var(--muted-foreground))" }
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Analytics & Data Intelligence
            </h1>
            <p className="text-muted-foreground mt-1">
              Tableaux de bord et insights de l'écosystème NaturaLink
            </p>
          </div>
          <div className="flex gap-3">
            <Select defaultValue="month">
              <SelectTrigger className="w-[180px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Cette semaine</SelectItem>
                <SelectItem value="month">Ce mois</SelectItem>
                <SelectItem value="quarter">Ce trimestre</SelectItem>
                <SelectItem value="year">Cette année</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <BarChart3 className="h-8 w-8 text-[hsl(var(--nature-primary))]" />
                <Badge className="badge-success">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +15%
                </Badge>
              </div>
              <p className="text-2xl font-bold">8.5M FCFA</p>
              <p className="text-sm text-muted-foreground">Revenue total</p>
              <div className="mt-3 h-8">
                <svg className="w-full h-full">
                  <polyline
                    points="0,30 15,25 30,27 45,20 60,22 75,15 90,18 105,10"
                    fill="none"
                    stroke="hsl(var(--nature-primary))"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <ShoppingCart className="h-8 w-8 text-[hsl(var(--accent))]" />
                <Badge className="badge-success">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +22%
                </Badge>
              </div>
              <p className="text-2xl font-bold">3,450</p>
              <p className="text-sm text-muted-foreground">Transactions</p>
              <Progress value={78} className="h-2 mt-3" />
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Users className="h-8 w-8 text-[hsl(var(--nature-secondary))]" />
                <Badge variant="outline" className="text-destructive">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  -3%
                </Badge>
              </div>
              <p className="text-2xl font-bold">12,340</p>
              <p className="text-sm text-muted-foreground">Utilisateurs actifs</p>
              <div className="flex gap-1 mt-3">
                {[65, 80, 45, 90, 70, 85, 60].map((height, i) => (
                  <div 
                    key={i} 
                    className="flex-1 bg-[hsl(var(--nature-secondary))]/20 rounded-t"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Eye className="h-8 w-8 text-[hsl(var(--accent))]" />
                <Badge className="badge-success">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +45%
                </Badge>
              </div>
              <p className="text-2xl font-bold">28,450</p>
              <p className="text-sm text-muted-foreground">Scans produits</p>
              <Progress value={85} className="h-2 mt-3" />
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full max-w-lg grid-cols-4">
            <TabsTrigger value="products">Produits</TabsTrigger>
            <TabsTrigger value="regions">Régions</TabsTrigger>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
            <TabsTrigger value="trends">Tendances</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Top Produits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={product.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold text-muted-foreground">
                            {index + 1}
                          </span>
                          <div>
                            <p className="font-semibold">{product.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {product.sales} ventes • {product.revenue}
                            </p>
                          </div>
                        </div>
                        <Badge 
                          variant={product.trend > 0 ? "default" : "destructive"}
                          className={product.trend > 0 ? "badge-success" : ""}
                        >
                          {product.trend > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                          {Math.abs(product.trend)}%
                        </Badge>
                      </div>
                      <Progress 
                        value={(product.sales / 450) * 100} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Catégories de produits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative h-64 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-3xl font-bold">480</p>
                      <p className="text-sm text-muted-foreground">Produits total</p>
                    </div>
                  </div>
                  <svg className="transform -rotate-90 w-64 h-64">
                    <circle
                      cx="128"
                      cy="128"
                      r="100"
                      fill="none"
                      stroke="hsl(var(--border))"
                      strokeWidth="40"
                    />
                    <circle
                      cx="128"
                      cy="128"
                      r="100"
                      fill="none"
                      stroke="hsl(var(--nature-primary))"
                      strokeWidth="40"
                      strokeDasharray="628"
                      strokeDashoffset="157"
                    />
                  </svg>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[hsl(var(--nature-primary))]" />
                    <span className="text-sm">Fruits (35%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[hsl(var(--accent))]" />
                    <span className="text-sm">Légumes (40%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[hsl(var(--nature-secondary))]" />
                    <span className="text-sm">Céréales (15%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[hsl(var(--muted-foreground))]" />
                    <span className="text-sm">Autres (10%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="regions" className="space-y-4">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Map className="h-5 w-5" />
                  Distribution par région
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {regions.map((region) => (
                    <div key={region.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold">{region.name}</span>
                        <span className="text-muted-foreground">{region.percentage}%</span>
                      </div>
                      <div className="relative h-8 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="absolute inset-y-0 left-0 rounded-full transition-all"
                          style={{ 
                            width: `${region.percentage}%`,
                            backgroundColor: region.color
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">Croissance des utilisateurs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between gap-2">
                  {["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil"].map((month, i) => (
                    <div key={month} className="flex-1 flex flex-col items-center gap-2">
                      <div 
                        className="w-full bg-gradient-to-t from-[hsl(var(--nature-primary))] to-[hsl(var(--nature-secondary))] rounded-t"
                        style={{ height: `${Math.random() * 80 + 20}%` }}
                      />
                      <span className="text-xs text-muted-foreground">{month}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <LineChart className="h-5 w-5" />
                  Tendances mensuelles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 relative">
                  <svg className="w-full h-full">
                    <polyline
                      points="0,200 50,180 100,160 150,140 200,120 250,100 300,90 350,70 400,50 450,40"
                      fill="none"
                      stroke="hsl(var(--nature-primary))"
                      strokeWidth="3"
                    />
                    <polyline
                      points="0,180 50,170 100,150 150,145 200,130 250,120 300,110 350,95 400,85 450,75"
                      fill="none"
                      stroke="hsl(var(--accent))"
                      strokeWidth="3"
                    />
                  </svg>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[hsl(var(--nature-primary))]" />
                    <span className="text-sm">Ventes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[hsl(var(--accent))]" />
                    <span className="text-sm">Revenus</span>
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