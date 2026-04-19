import { useState, type FormEvent } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { productService } from "@/services/productService";
import { CreateProductDTO } from "@/services/api.types";

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddProduct?: (product: any) => void;
  producers?: any[];
}

export function AddProductDialog({ open, onOpenChange, onAddProduct, producers = [] }: AddProductDialogProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: "",
    producer_id: "",
    certification: "Bio EU",
    status: "registered",
    description: "",
    quantity: "",
    price: "",
    nfc_tag_id: "",
  });

  // Mutation for creating product
  const createMutation = useMutation({
    mutationFn: async (data: CreateProductDTO) => {
      return productService.createProduct(data);
    },
    onSuccess: (newProduct) => {
      // Invalidate and refetch products list
      queryClient.invalidateQueries({ queryKey: ['products'] });
      
      toast({
        title: "Succès",
        description: `${newProduct.name} a été ajouté avec succès.`,
      });

      // Reset form and close
      resetForm();
      onOpenChange(false);

      // Call callback if provided
      if (onAddProduct) {
        onAddProduct(newProduct);
      }
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: error?.response?.data?.message || "Une erreur s'est produite lors de l'ajout du produit",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.producer_id) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    const productData: CreateProductDTO = {
      name: formData.name,
      producer_id: formData.producer_id,
      status: formData.status as any,
      description: formData.description,
      nfc_tag_id: formData.nfc_tag_id || undefined,
    };

    await createMutation.mutateAsync(productData);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      producer_id: "",
      certification: "Bio EU",
      status: "registered",
      description: "",
      quantity: "",
      price: "",
      nfc_tag_id: "",
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
                <Label htmlFor="producer_id">Producteur *</Label>
                <Select
                  value={formData.producer_id}
                  onValueChange={(value) => setFormData({ ...formData, producer_id: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un producteur" />
                  </SelectTrigger>
                  <SelectContent>
                    {producers.map((producer) => (
                      <SelectItem key={producer.id} value={producer.id}>
                        {producer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                <Label htmlFor="nfc_tag_id">ID NFC Tag (optionnel)</Label>
                <Input
                  id="nfc_tag_id"
                  value={formData.nfc_tag_id}
                  onChange={(e) => setFormData({ ...formData, nfc_tag_id: e.target.value })}
                  placeholder="Ex: NFC12345678"
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
            <Button type="submit" disabled={createMutation.isPending} className="nature-gradient text-white disabled:opacity-50">
              {createMutation.isPending ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}