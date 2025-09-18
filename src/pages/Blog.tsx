import { useState, useEffect } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, PenTool, Calendar, User, Eye, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  featured_image_url?: string;
  views_count: number;
  likes_count: number;
  published_at: string;
  author_name: string;
}

export default function Blog() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const categories = [
    "Agriculture Durable",
    "Blockchain", 
    "Traçabilité",
    "Innovation",
    "Coopératives",
    "Environnement"
  ];

  useEffect(() => {
    // Simulate loading demo articles
    setTimeout(() => {
      setArticles([
        {
          id: "1",
          title: "L'avenir de la traçabilité agricole en Côte d'Ivoire",
          excerpt: "Découvrez comment la blockchain révolutionne la traçabilité des produits agricoles ivoiriens.",
          category: "Blockchain",
          featured_image_url: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=400",
          views_count: 1250,
          likes_count: 89,
          published_at: "2024-01-15",
          author_name: "Marie Kouassi"
        },
        {
          id: "2", 
          title: "Les coopératives agricoles : un modèle d'avenir",
          excerpt: "Comment les coopératives transforment l'agriculture ivoirienne vers plus de durabilité.",
          category: "Coopératives",
          featured_image_url: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400",
          views_count: 890,
          likes_count: 67,
          published_at: "2024-01-12",
          author_name: "Kouamé Yao"
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
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
              Blog NaturaLink (Mode démo)
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Découvrez les dernières innovations en traçabilité agricole
            </p>
            
            <Button onClick={() => navigate('/blog/create')}>
              <PenTool className="w-4 h-4 mr-2" />
              Écrire un article
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Rechercher un article..."
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

          {/* Articles Grid */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Chargement des articles...</p>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucun article trouvé.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Card 
                  key={article.id} 
                  className="cursor-pointer hover:shadow-medium transition-smooth"
                  onClick={() => navigate(`/blog/${article.id}`)}
                >
                  {article.featured_image_url && (
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img 
                        src={article.featured_image_url} 
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{article.category}</Badge>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {article.views_count}
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {article.likes_count}
                        </div>
                      </div>
                    </div>
                    <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {article.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {article.author_name}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {formatDate(article.published_at)}
                      </div>
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