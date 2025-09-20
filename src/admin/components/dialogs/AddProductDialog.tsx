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

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddProduct: (product: any) => void;
  producers?: any[];
}

export function AddProductDialog({ open, onOpenChange, onAddProduct, producers = [] }: AddProductDialogProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    producer: "",
    certification: "Bio EU",
    status: "registered",
    description: "",
    quantity: "",
    price: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.producer) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    const newProduct = {
      id: Date.now().toString(),
      name: formData.name,
      producer: formData.producer,
      certification: formData.certification,
      status: formData.status,
      date: new Date().toISOString().split('T')[0],
      batch: `LOT-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      description: formData.description,
      quantity: formData.quantity,
      price: formData.price,
    };

    onAddProduct(newProduct);
    
    // Reset form
    setFormData({
      name: "",
      producer: "",
      certification: "Bio EU",
      status: "registered",
      description: "",
      quantity: "",
      price: "",
    });
    
    onOpenChange(false);
    
    toast({
      title: "Produit ajouté",
      description: `${formData.name} a été ajouté avec succès.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Nouveau produit</DialogTitle>
            <DialogDescription>
              Enregistrez un nouveau produit dans le système de traçabilité
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nom du produit *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Tomates Bio"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="producer">Producteur *</Label>
                <Input
                  id="producer"
                  value={formData.producer}
                  onChange={(e) => setFormData({ ...formData, producer: e.target.value })}
                  placeholder="Nom du producteur ou coopérative"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="certification">Certification</Label>
                <Select
                  value={formData.certification}
                  onValueChange={(value) => setFormData({ ...formData, certification: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bio EU">Bio EU</SelectItem>
                    <SelectItem value="Bio Local">Bio Local</SelectItem>
                    <SelectItem value="AOC">AOC</SelectItem>
                    <SelectItem value="AOP">AOP</SelectItem>
                    <SelectItem value="Label Rouge">Label Rouge</SelectItem>
                    <SelectItem value="Commerce Équitable">Commerce Équitable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Statut initial</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="registered">Enregistré</SelectItem>
                    <SelectItem value="verification">En vérification</SelectItem>
                    <SelectItem value="validation">En validation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="quantity">Quantité</Label>
                <Input
                  id="quantity"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  placeholder="Ex: 100 kg"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Prix unitaire</Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="Ex: 1500 FCFA/kg"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Description du produit (optionnel)"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit" className="nature-gradient text-white">
              Enregistrer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}