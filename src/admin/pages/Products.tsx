import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Package, 
  Plus, 
  ArrowRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Nfc,
  BarChart3
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { productService } from "@/services/productService";

const workflowSteps = [
  { 
    id: "active", 
    label: "Actif", 
    icon: CheckCircle,
    color: "text-[hsl(var(--nature-primary))]"
  },
  { 
    id: "inactive", 
    label: "Inactif", 
    icon: Clock,
    color: "text-[hsl(var(--accent))]"
  },
  { 
    id: "archived", 
    label: "Archivé", 
    icon: AlertCircle,
    color: "text-muted-foreground"
  },
];

export default function Products() {
  const [selectedStep, setSelectedStep] = useState<string>("active");

  const { data: productsData } = useQuery({
    queryKey: ["admin-products"],
    queryFn: () => productService.getProducts({ page: 1, limit: 100 }),
  });

  const allProducts = productsData?.data ?? [];

  const getProductsByStatus = (status: string) => {
    return allProducts.filter(p => p.status === status);
  };

  const getStepProgress = (status: string) => {
    const stepIndex = workflowSteps.findIndex(s => s.id === status);
    return ((stepIndex + 1) / workflowSteps.length) * 100;
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Gestion des Produits
            </h1>
            <p className="text-muted-foreground mt-1">
              {productsData?.total || "0"} produits • {getProductsByStatus("active").length} actifs
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Statistiques
            </Button>
            <Button className="nature-gradient text-white">
              <Plus className="h-4 w-4 mr-2" />
              Nouveau produit
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{getProductsByStatus("active").length}</p>
                <p className="text-sm text-muted-foreground">Actifs</p>
              </div>
              <CheckCircle className="h-8 w-8 text-[hsl(var(--nature-primary))]" />
            </div>
          </Card>
          <Card className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{getProductsByStatus("inactive").length}</p>
                <p className="text-sm text-muted-foreground">Inactifs</p>
              </div>
              <Clock className="h-8 w-8 text-[hsl(var(--accent))]" />
            </div>
          </Card>
          <Card className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{getProductsByStatus("archived").length}</p>
                <p className="text-sm text-muted-foreground">Archivés</p>
              </div>
              <AlertCircle className="h-8 w-8 text-muted-foreground" />
            </div>
          </Card>
          <Card className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{allProducts.length}</p>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
              <Package className="h-8 w-8 text-[hsl(var(--sky-blue))]" />
            </div>
          </Card>
        </div>

        {/* Workflow Visualization */}
        <Card>
          <CardHeader>
            <CardTitle>Workflow de Certification</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-8 left-0 right-0 h-1 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full nature-gradient transition-all duration-500"
                  style={{ width: `${selectedStep ? getStepProgress(selectedStep) : 0}%` }}
                />
              </div>

              {/* Workflow Steps */}
              <div className="relative grid grid-cols-5 gap-4">
                {workflowSteps.map((step, index) => {
                  const Icon = step.icon;
                  const count = getProductsByStatus(step.id).length;
                  const isActive = selectedStep === step.id;
                  
                  return (
                    <div
                      key={step.id}
                      className="flex flex-col items-center cursor-pointer group"
                      onClick={() => setSelectedStep(step.id)}
                    >
                      <div 
                        className={cn(
                          "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 relative z-10",
                          isActive 
                            ? "bg-gradient-to-br from-[hsl(var(--nature-primary))] to-[hsl(var(--nature-secondary))] shadow-lg scale-110" 
                            : "bg-background border-2 border-border group-hover:border-[hsl(var(--nature-primary))] group-hover:scale-105"
                        )}
                      >
                        <Icon className={cn(
                          "h-6 w-6 transition-colors",
                          isActive ? "text-white" : step.color
                        )} />
                      </div>
                      <p className={cn(
                        "text-sm font-medium mt-2 transition-colors",
                        isActive ? "text-foreground" : "text-muted-foreground"
                      )}>
                        {step.label}
                      </p>
                      {count > 0 && (
                        <Badge 
                          variant={isActive ? "default" : "outline"} 
                          className="mt-1"
                        >
                          {count}
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Arrow Indicators */}
              <div className="absolute top-8 left-0 right-0 flex justify-between px-20 pointer-events-none">
                {[...Array(4)].map((_, i) => (
                  <ArrowRight 
                    key={i} 
                    className="h-4 w-4 text-muted-foreground animate-pulse"
                    style={{ animationDelay: `${i * 200}ms` }}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products List by Status */}
        {selectedStep && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-lg">
                Produits - {workflowSteps.find(s => s.id === selectedStep)?.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <div className="space-y-3">
                  {getProductsByStatus(selectedStep).map((product) => (
                    <div
                      key={product.id}
                      className="p-4 rounded-lg border border-border hover:shadow-md transition-all duration-200 group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <h4 className="font-semibold">{product.name}</h4>
                            <Badge variant="outline" className="text-xs">
                              {product.batch}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Par {product.producer} • {product.certification}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(product.date).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {selectedStep === "nfc" && (
                            <Button size="sm" variant="outline">
                              <Nfc className="h-3 w-3 mr-1" />
                              Générer NFC
                            </Button>
                          )}
                          <Button size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            Détails
                            <ArrowRight className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                      </div>
                      <Progress 
                        value={getStepProgress(product.status)} 
                        className="h-1 mt-3"
                      />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}