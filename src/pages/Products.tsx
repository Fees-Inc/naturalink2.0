import { useState, useEffect } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Calendar, Award, QrCode } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  description?: string;
  origin_location?: string;
  farming_method?: string;
  photo_url?: string;
  harvest_date?: string;
  certifications: any;
  profiles: {
    first_name?: string;
    last_name?: string;
    company_name?: string;
  };
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
    "Café/Cacao",
    "Épices",
    "Huiles"
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          id,
          name,
          description,
          origin_location,
          farming_method,
          photo_url,
          harvest_date,
          certifications,
          profiles (
            first_name,
            last_name,
            company_name
          )
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data || []);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.origin_location?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Produits Certifiés NFC
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Découvrez tous les produits avec traçabilité complète Made in Côte d'Ivoire
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Rechercher un produit, lieu d'origine..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                Tous
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Chargement des produits...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucun produit trouvé.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card 
                  key={product.id} 
                  className="cursor-pointer hover:shadow-medium transition-smooth"
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  {product.photo_url && (
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img 
                        src={product.photo_url} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="bg-accent text-foreground">
                        <QrCode className="w-3 h-3 mr-1" />
                        NFC Certifié
                      </Badge>
                      {Array.isArray(product.certifications) && product.certifications.length > 0 && (
                        <Badge variant="outline">
                          <Award className="w-3 h-3 mr-1" />
                          Bio
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="line-clamp-2">{product.name}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {product.origin_location}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-foreground">
                          {product.profiles?.company_name || 
                           `${product.profiles?.first_name} ${product.profiles?.last_name}`}
                        </span>
                        {product.harvest_date && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(product.harvest_date)}
                          </div>
                        )}
                      </div>

                      {product.farming_method && (
                        <Badge variant="secondary" className="text-xs">
                          {product.farming_method}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}