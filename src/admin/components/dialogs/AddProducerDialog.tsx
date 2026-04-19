import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight, User, MapPin, FileText } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { producerService } from "@/services/producerService";
import { CreateProducerDTO } from "@/services/api.types";

interface AddProducerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddProducer?: (producer: any) => void;
}

export function AddProducerDialog({ open, onOpenChange, onAddProducer }: AddProducerDialogProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    type: "individual",
    location: "",
    email: "",
    phone: "",
    certified: false,
    members: "",
    description: "",
    region: "",
    city: "",
    address: "",
    crops: "",
    farmSize: "",
    experience: "",
  });

  const steps = [
    {
      id: 1,
      title: "Informations personnelles",
      icon: User,
      description: "Nom, type et coordonnées"
    },
    {
      id: 2,
      title: "Localisation",
      icon: MapPin,
      description: "Adresse et zone géographique"
    },
    {
      id: 3,
      title: "Activité agricole",
      icon: FileText,
      description: "Culture et certification"
    }
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Mutation for creating producer
  const createMutation = useMutation({
    mutationFn: async (data: CreateProducerDTO) => {
      return producerService.createProducer(data);
    },
    onSuccess: (newProducer) => {
      // Invalidate and refetch producers list
      queryClient.invalidateQueries({ queryKey: ['producers'] });
      
      toast({
        title: "Succès",
        description: `${newProducer.name} a été ajouté avec succès.`,
      });

      // Reset form and close
      resetForm();
      onOpenChange(false);

      // Call callback if provided
      if (onAddProducer) {
        onAddProducer(newProducer);
      }
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: error?.response?.data?.message || "Une erreur s'est produite lors de l'ajout du producteur",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.city) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    const producerData: CreateProducerDTO = {
      name: formData.name,
      location: `${formData.city}, ${formData.region}`,
      certification_status: formData.certified ? 'certified' : 'pending',
      description: formData.description,
    };

    await createMutation.mutateAsync(producerData);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      type: "individual",
      location: "",
      email: "",
      phone: "",
      certified: false,
      members: "",
      description: "",
      region: "",
      city: "",
      address: "",
      crops: "",
      farmSize: "",
      experience: "",
    });
    setCurrentStep(1);
  };

  const handleClose = () => {
    setCurrentStep(1);
    onOpenChange(false);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nom complet *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nom du producteur ou de la coopérative"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Type de producteur</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Producteur individuel</SelectItem>
                    <SelectItem value="cooperative">Coopérative</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {formData.type === "cooperative" && (
              <div className="grid gap-2">
                <Label htmlFor="members">Nombre de membres</Label>
                <Input
                  id="members"
                  type="number"
                  value={formData.members}
                  onChange={(e) => setFormData({ ...formData, members: e.target.value })}
                  placeholder="Nombre de membres dans la coopérative"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@exemple.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+221 XX XXX XX XX"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="region">Région *</Label>
                <Select
                  value={formData.region}
                  onValueChange={(value) => setFormData({ ...formData, region: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une région" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dakar">Dakar</SelectItem>
                    <SelectItem value="Saint-Louis">Saint-Louis</SelectItem>
                    <SelectItem value="Thiès">Thiès</SelectItem>
                    <SelectItem value="Kaolack">Kaolack</SelectItem>
                    <SelectItem value="Tambacounda">Tambacounda</SelectItem>
                    <SelectItem value="Fatick">Fatick</SelectItem>
                    <SelectItem value="Kolda">Kolda</SelectItem>
                    <SelectItem value="Ziguinchor">Ziguinchor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="city">Ville/Commune *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Ex: Rufisque, Louga..."
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="address">Adresse complète</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Quartier, rue, numéro..."
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="farmSize">Superficie exploitée (hectares)</Label>
              <Input
                id="farmSize"
                type="number"
                value={formData.farmSize}
                onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })}
                placeholder="Ex: 2.5"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="crops">Cultures principales</Label>
              <Textarea
                id="crops"
                value={formData.crops}
                onChange={(e) => setFormData({ ...formData, crops: e.target.value })}
                placeholder="Ex: Mil, sorgho, arachide, légumes..."
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="experience">Années d'expérience</Label>
              <Select
                value={formData.experience}
                onValueChange={(value) => setFormData({ ...formData, experience: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner l'expérience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-2">Moins de 2 ans</SelectItem>
                  <SelectItem value="2-5">2 à 5 ans</SelectItem>
                  <SelectItem value="5-10">5 à 10 ans</SelectItem>
                  <SelectItem value="10+">Plus de 10 ans</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <Label>Certification biologique</Label>
                <p className="text-sm text-muted-foreground">
                  Le producteur possède-t-il une certification bio ?
                </p>
              </div>
              <Switch
                checked={formData.certified}
                onCheckedChange={(checked) => setFormData({ ...formData, certified: checked })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description de l'activité</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Décrivez l'activité agricole, les méthodes utilisées..."
                rows={3}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const currentStepData = steps.find(step => step.id === currentStep);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {currentStepData?.icon && <currentStepData.icon className="h-5 w-5" />}
            {currentStepData?.title}
          </DialogTitle>
          <DialogDescription>
            {currentStepData?.description}
          </DialogDescription>
        </DialogHeader>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Étape {currentStep} sur 3</span>
            <span>{Math.round((currentStep / 3) * 100)}%</span>
          </div>
          <Progress value={(currentStep / 3) * 100} className="h-2" />
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`
                flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors
                ${currentStep >= step.id 
                  ? 'bg-[hsl(var(--nature-primary))] border-[hsl(var(--nature-primary))] text-white' 
                  : 'border-muted bg-background text-muted-foreground'
                }
              `}>
                <step.icon className="h-4 w-4" />
              </div>
              {index < steps.length - 1 && (
                <div className={`
                  w-12 h-0.5 mx-2 transition-colors
                  ${currentStep > step.id ? 'bg-[hsl(var(--nature-primary))]' : 'bg-muted'}
                `} />
              )}
            </div>
          ))}
        </div>

        {/* Form content */}
        <div className="py-4">
          {renderStepContent()}
        </div>

        <DialogFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
            >
              Annuler
            </Button>
            {currentStep > 1 && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={handlePrevious}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Précédent
              </Button>
            )}
          </div>
          
          <div>
            {currentStep < 3 ? (
              <Button 
                type="button" 
                onClick={handleNext}
                className="bg-[hsl(var(--nature-primary))] hover:bg-[hsl(var(--nature-primary))]/90 text-white"
              >
                Suivant
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button 
                type="button" 
                onClick={handleSubmit}
                disabled={createMutation.isPending}
                className="bg-[hsl(var(--nature-primary))] hover:bg-[hsl(var(--nature-primary))]/90 text-white disabled:opacity-50"
              >
                {createMutation.isPending ? "Enregistrement..." : "Enregistrer le producteur"}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}