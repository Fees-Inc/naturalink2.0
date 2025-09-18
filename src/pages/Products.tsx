import { useState, useEffect } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Calendar, Award, QrCode } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  description?: string;
  origin_location?: string;
  sustainability_info?: string;
  photo_url?: string;
  harvest_date?: string;
  producer_video_url?: string;
  certifications: string[];
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const categories = [
    "Fruits",
    "Légumes", 
    "Céréales",
    "Bio",
    "Commerce Équitable"
  ];

  useEffect(() => {
    // Simulate loading products
    setTimeout(() => {
      setProducts([
        {
          id: "1",
          name: "Bananes Bio Premium",
          description: "Bananes cultivées selon les principes de l'agriculture biologique",
          origin_location: "Abidjan, Côte d'Ivoire",
          sustainability_info: "Culture durable sans pesticides",
          photo_url: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400",
          harvest_date: "2024-01-15",
          certifications: ["Bio", "Commerce Équitable"]
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.certifications.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-secondary/30">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Produits Certifiés (Mode démo)
            </h1>
            <p className="text-xl text-muted-foreground">
              Découvrez l'origine et l'authenticité de nos produits
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground text-center">
                Mode démonstration - Les produits affichés sont des exemples.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}