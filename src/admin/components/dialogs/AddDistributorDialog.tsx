import { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";

interface AddDistributorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddDistributor: (distributor: any) => void;
}

export function AddDistributorDialog({ open, onOpenChange, onAddDistributor }: AddDistributorDialogProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    type: "supermarket",
    location: "",
    email: "",
    phone: "",
    contact: "",
    zones: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.location || !formData.email) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    const newDistributor = {
      id: Date.now(),
      name: formData.name,
      type: formData.type === "supermarket" ? "Supermarché" : 
            formData.type === "hypermarket" ? "Hypermarché" :
            formData.type === "local" ? "Marché local" : "E-commerce",
      avatar: "/placeholder.svg",
      location: formData.location,
      volumeMonth: "0 kg",
      revenue: "0 FCFA",
      products: 0,
      performance: 0,
      status: "pending",
      lastOrder: "Pas encore de commande",
      email: formData.email,
      phone: formData.phone,
      contact: formData.contact,
      zones: formData.zones,
      description: formData.description,
    };

    onAddDistributor(newDistributor);
    
    // Reset form
    setFormData({
      name: "",
      type: "supermarket",
      location: "",
      email: "",
      phone: "",
      contact: "",
      zones: "",
      description: "",
    });
    
    onOpenChange(false);
    
    toast({
      title: "Distributeur ajouté",
      description: `${formData.name} a été ajouté avec succès.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Nouveau distributeur</DialogTitle>
            <DialogDescription>
              Ajoutez un nouveau point de distribution ou partenaire commercial
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nom de l'entreprise *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nom du distributeur"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="supermarket">Supermarché</SelectItem>
                    <SelectItem value="hypermarket">Hypermarché</SelectItem>
                    <SelectItem value="local">Marché local</SelectItem>
                    <SelectItem value="online">E-commerce</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location">Localisation principale *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Ex: Dakar, Sénégal"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="zones">Zones de distribution</Label>
              <Input
                id="zones"
                value={formData.zones}
                onChange={(e) => setFormData({ ...formData, zones: e.target.value })}
                placeholder="Ex: Dakar, Thiès, Saint-Louis"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@entreprise.com"
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

            <div className="grid gap-2">
              <Label htmlFor="contact">Personne de contact</Label>
              <Input
                id="contact"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                placeholder="Nom du responsable achats"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Description de l'activité et besoins (optionnel)"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit" className="bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))]/90 text-accent-foreground">
              Enregistrer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}