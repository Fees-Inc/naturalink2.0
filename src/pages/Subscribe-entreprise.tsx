import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  CreditCard, 
  Download, 
  Settings, 
  CheckCircle,
  Clock,
  Crown,
  Building,
  Mail,
  Phone
} from "lucide-react";

export default function SubscrineEntreprise() {
  return (

    <div className="min-h-screen bg-secondary/30">
        <main className="p-20">
             <div className="space-y-6 ">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Compte & Abonnement</h1>
          <p className="text-muted-foreground mt-1">
            Gestion de votre abonnement et paramètres entreprise
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Paramètres
        </Button>
      </div>

      {/* Current Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-gold" />
              Abonnement Actuel
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-foreground">Plan Professional</h3>
                <p className="text-muted-foreground">Accès complet aux données et analytics</p>
              </div>
              <Badge className="bg-leaf text-leaf-foreground">
                <CheckCircle className="h-3 w-3 mr-1" />
                Actif
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <div className="text-2xl font-bold text-primary">€1,299</div>
                <div className="text-sm text-muted-foreground">/ mois</div>
              </div>
              <div className="text-center p-4 bg-secondary/50 rounded-lg">
                <div className="text-2xl font-bold text-foreground">15,847</div>
                <div className="text-sm text-muted-foreground">Requêtes API</div>
              </div>
              <div className="text-center p-4 bg-accent/10 rounded-lg">
                <div className="text-2xl font-bold text-accent">23 jours</div>
                <div className="text-sm text-muted-foreground">Prochain billing</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Utilisation API ce mois</span>
                <span className="font-medium">15,847 / 50,000</span>
              </div>
              <Progress value={32} className="h-2" />
            </div>

            <div className="flex gap-3">
              <Button variant="default" className="bg-primary hover:bg-primary/90">
                Upgrader le Plan
              </Button>
              <Button variant="outline">
                Changer la Période
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Billing Status */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-accent" />
              Facturation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Statut</span>
              <Badge variant="secondary" className="bg-leaf/20 text-leaf">
                À jour
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Prochaine facture</span>
              <span className="text-sm font-medium">15 Jan 2024</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Mode de paiement</span>
              <span className="text-sm font-medium">•••• 4532</span>
            </div>

            <Button variant="outline" size="sm" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Télécharger Factures
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Company Information */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-primary" />
            Informations Entreprise
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Raison sociale</label>
                <p className="text-foreground font-medium">EcoFresh Distribution SAS</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">SIRET</label>
                <p className="text-foreground">123 456 789 00012</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Secteur d'activité</label>
                <p className="text-foreground">Distribution agroalimentaire</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Contact principal</label>
                <div className="flex items-center gap-2 mt-1">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <p className="text-foreground">marie.dubois@ecofresh.fr</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Téléphone</label>
                <div className="flex items-center gap-2 mt-1">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <p className="text-foreground">+33 1 23 45 67 89</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Adresse</label>
                <p className="text-foreground">123 Avenue de la République<br />75011 Paris, France</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <Button variant="outline">
              Modifier les Informations
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-accent" />
            Historique des Factures
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: "15 Déc 2023", montant: "€1,299.00", statut: "Payée", numero: "INV-2023-12-001" },
              { date: "15 Nov 2023", montant: "€1,299.00", statut: "Payée", numero: "INV-2023-11-001" },
              { date: "15 Oct 2023", montant: "€1,299.00", statut: "Payée", numero: "INV-2023-10-001" },
              { date: "15 Sep 2023", montant: "€1,299.00", statut: "Payée", numero: "INV-2023-09-001" }
            ].map((facture) => (
              <div key={facture.numero} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium text-foreground">{facture.numero}</p>
                    <p className="text-sm text-muted-foreground">{facture.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium text-foreground">{facture.montant}</span>
                  <Badge variant="secondary" className="bg-leaf/20 text-leaf">
                    {facture.statut}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
          </div>
        </main>
         
    </div>
  
  );
}