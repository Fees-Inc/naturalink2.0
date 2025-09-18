import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/landing/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary/30">
        <Navbar />
        <main className="pt-20 pb-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-muted-foreground">Chargement du produit...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/products')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux produits
          </Button>

          <Card>
            <CardHeader>
              <CardTitle>Détails du produit (Mode démo)</CardTitle>
              <CardDescription>
                ID du produit: {id}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Dans la version complète, vous verriez ici tous les détails de traçabilité 
                du produit, incluant son origine, ses certifications, et son parcours.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}