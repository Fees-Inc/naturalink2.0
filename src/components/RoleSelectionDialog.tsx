import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Factory, Building, PenTool, Scan } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface RoleSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RoleSelectionDialog({ open, onOpenChange }: RoleSelectionDialogProps) {
  const navigate = useNavigate();

  const options = [
    {
      id: 'consumer',
      title: 'Consommateur',
      description: 'Scannez et découvrez l\'origine de vos produits',
      icon: Scan,
      path: '/consumer'
    },
    {
      id: 'producer',
      title: 'Producteur / Coopérative',
      description: 'Gérez vos produits et leur traçabilité',
      icon: Factory,
      path: '/producer'
    },
    {
      id: 'distributor',
      title: 'Distributeur / Entreprise',
      description: 'Accédez aux données de traçabilité',
      icon: Building,
      path: '/distributor'
    },
    {
      id: 'blog',
      title: 'Écrire un article',
      description: 'Partagez vos connaissances avec la communauté',
      icon: PenTool,
      path: '/blog/create'
    }
  ];

  const handleSelection = (path: string) => {
    onOpenChange(false);
    navigate(path);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Que souhaitez-vous faire ?</DialogTitle>
          <DialogDescription>
            Choisissez l'espace qui correspond à vos besoins
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          {options.map((option) => {
            const IconComponent = option.icon;
            
            return (
              <Card 
                key={option.id}
                className="cursor-pointer hover:shadow-medium transition-smooth"
                onClick={() => handleSelection(option.path)}
              >
                <CardHeader className="text-center pb-2">
                  <div className="w-12 h-12 mx-auto mb-2 nature-gradient rounded-lg flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">{option.title}</CardTitle>
                  <CardDescription className="text-sm">{option.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}