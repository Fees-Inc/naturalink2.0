import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, 
  Link2, 
  Activity,
  Database,
  Zap,
  Clock,
  CheckCircle,
  AlertCircle,
  Cpu,
  Hash
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Blockchain() {
  const transactions = [
    {
      id: "0x1234...5678",
      type: "Certification",
      product: "Tomates Bio - Lot #234",
      timestamp: "2024-01-08 14:30",
      status: "validated",
      gas: "0.002 ETH"
    },
    {
      id: "0x8765...4321",
      type: "Scan",
      product: "Mangues Premium - Lot #156",
      timestamp: "2024-01-08 14:15",
      status: "validated",
      gas: "0.001 ETH"
    },
    {
      id: "0x9999...1111",
      type: "Transfer",
      product: "Riz Local - Lot #789",
      timestamp: "2024-01-08 13:45",
      status: "pending",
      gas: "0.002 ETH"
    }
  ];

  const smartContracts = [
    {
      name: "ProductCertification",
      address: "0xABC...DEF",
      status: "active",
      calls: 1450,
      lastCall: "Il y a 2 min"
    },
    {
      name: "TraceabilityTracker",
      address: "0xGHI...JKL",
      status: "active",
      calls: 2340,
      lastCall: "Il y a 5 min"
    },
    {
      name: "QualityValidator",
      address: "0xMNO...PQR",
      status: "active",
      calls: 890,
      lastCall: "Il y a 15 min"
    }
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Blockchain & Smart Contracts
            </h1>
            <p className="text-muted-foreground mt-1">
              Suivi de la traçabilité et validation des produits
            </p>
          </div>
          <Badge className="px-4 py-2 text-sm" variant="outline">
            <div className="h-2 w-2 rounded-full bg-[hsl(var(--nature-primary))] animate-pulse mr-2" />
            Réseau actif - Polygon
          </Badge>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="glass-card border-[hsl(var(--nature-primary))]/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <ShieldCheck className="h-8 w-8 text-[hsl(var(--nature-primary))]" />
                <Badge className="badge-success">
                  <Activity className="h-3 w-3 mr-1" />
                  Live
                </Badge>
              </div>
              <p className="text-2xl font-bold">1,450</p>
              <p className="text-sm text-muted-foreground">Scans validés aujourd'hui</p>
              <Progress value={72} className="h-1 mt-3" />
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Cpu className="h-8 w-8 text-[hsl(var(--accent))]" />
                <span className="text-xs text-[hsl(var(--nature-primary))]">100%</span>
              </div>
              <p className="text-2xl font-bold">15</p>
              <p className="text-sm text-muted-foreground">Smart contracts actifs</p>
              <div className="flex gap-1 mt-3">
                {[...Array(15)].map((_, i) => (
                  <div key={i} className="h-4 w-1 bg-[hsl(var(--nature-primary))] rounded" />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Database className="h-8 w-8 text-[hsl(var(--nature-secondary))]" />
                <Zap className="h-4 w-4 text-[hsl(var(--accent))]" />
              </div>
              <p className="text-2xl font-bold">99.8%</p>
              <p className="text-sm text-muted-foreground">Taux de validation</p>
              <Progress value={99.8} className="h-1 mt-3" />
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Link2 className="h-8 w-8 text-[hsl(var(--accent))]" />
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold">2.3s</p>
              <p className="text-sm text-muted-foreground">Temps moyen validation</p>
              <div className="h-8 mt-1">
                <svg className="w-full h-full">
                  <polyline
                    points="0,20 20,15 40,18 60,10 80,12 100,8"
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
        <Tabs defaultValue="transactions" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="contracts">Smart Contracts</TabsTrigger>
            <TabsTrigger value="nodes">Nœuds</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="space-y-4">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Dernières transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-4 rounded-lg bg-background/50 border">
                      <div className="flex items-start gap-4">
                        <div className="mt-1">
                          {tx.status === "validated" ? (
                            <CheckCircle className="h-5 w-5 text-[hsl(var(--nature-primary))]" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-[hsl(var(--accent))]" />
                          )}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm">{tx.id}</span>
                            <Badge variant="outline" className="text-xs">
                              {tx.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{tx.product}</p>
                          <p className="text-xs text-muted-foreground">{tx.timestamp}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={tx.status === "validated" ? "badge-success" : ""}>
                          {tx.status === "validated" ? "Validé" : "En cours"}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{tx.gas}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contracts" className="space-y-4">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Cpu className="h-5 w-5" />
                  Smart Contracts déployés
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {smartContracts.map((contract) => (
                    <div key={contract.address} className="p-4 rounded-lg bg-background/50 border">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-semibold">{contract.name}</p>
                          <p className="text-sm font-mono text-muted-foreground">{contract.address}</p>
                        </div>
                        <Badge className="badge-success">
                          <Activity className="h-3 w-3 mr-1" />
                          Actif
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Appels totaux</p>
                          <p className="font-semibold">{contract.calls.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Dernier appel</p>
                          <p className="font-semibold">{contract.lastCall}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-3">
                        <Hash className="h-4 w-4 mr-2" />
                        Voir sur l'explorer
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nodes" className="space-y-4">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">État des nœuds du réseau</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((node) => (
                    <div key={node} className="p-4 rounded-lg bg-background/50 border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">Node #{node}</span>
                        <Badge className="badge-success text-xs">Online</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Latence</span>
                          <span>{Math.floor(Math.random() * 50 + 10)}ms</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Blocks</span>
                          <span>#{Math.floor(Math.random() * 10000 + 50000)}</span>
                        </div>
                        <Progress value={Math.random() * 30 + 70} className="h-1" />
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