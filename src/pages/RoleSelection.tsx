import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Factory, Building } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState<'consumer' | 'producer' | 'distributor' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const roles = [
    {
      id: 'consumer' as const,
      title: 'Consommateur',
      description: 'Scannez et découvrez l\'origine de vos produits',
      icon: Users,
      features: ['Scanner NFC/QR gratuit', 'Vérification blockchain', 'Historique produits'],
      color: 'bg-blue-500'
    },
    {
      id: 'producer' as const,
      title: 'Producteur / Coopérative',
      description: 'Gérez vos produits et leur traçabilité',
      icon: Factory,
      features: ['Étiquettes NFC', 'Dashboard producteur', 'Suivi des lots'],
      color: 'bg-green-500'
    },
    {
      id: 'distributor' as const,
      title: 'Entreprise / Distributeur',
      description: 'Accédez aux données de traçabilité',
      icon: Building,
      features: ['API complète', 'Analytics avancés', 'Monitoring chaîne'],
      color: 'bg-purple-500'
    }
  ];

  const handleRoleSelection = async () => {
    if (!selectedRole) return;
    
    setIsLoading(true);
    
    // Simulate role selection
    setTimeout(() => {
      toast({
        title: "Profil configuré",
        description: `Votre profil ${selectedRole} a été configuré. Mode démo activé.`
      });
      
      // Redirect based on role
      switch (selectedRole) {
        case 'consumer':
          navigate('/consumer');
          break;
        case 'producer':
          navigate('/producer');
          break;
        case 'distributor':
          navigate('/distributor');
          break;
        default:
          navigate('/');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-secondary/30 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Choisissez votre profil
          </h1>
          <p className="text-xl text-muted-foreground">
            Sélectionnez le rôle qui correspond le mieux à votre activité (Mode démo)
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {roles.map((role) => {
            const IconComponent = role.icon;
            const isSelected = selectedRole === role.id;
            
            return (
              <Card 
                key={role.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-medium ${
                  isSelected ? 'ring-2 ring-primary shadow-medium' : ''
                }`}
                onClick={() => setSelectedRole(role.id)}
              >
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 ${role.color} rounded-xl flex items-center justify-center`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{role.title}</CardTitle>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {role.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  {isSelected && (
                    <Badge className="mt-4 w-full justify-center" variant="default">
                      Sélectionné
                    </Badge>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button 
            onClick={handleRoleSelection}
            disabled={!selectedRole || isLoading}
            size="lg"
            className="px-12"
          >
            {isLoading ? 'Configuration...' : 'Continuer (Démo)'}
          </Button>
        </div>
      </div>
    </div>
  );
}