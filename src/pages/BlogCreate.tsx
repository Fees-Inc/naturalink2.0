import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/landing/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Upload, X, Save, Eye, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const categories = [
  { value: 'agriculture_durable', label: 'Agriculture Durable' },
  { value: 'consommation', label: 'Consommation' },
  { value: 'anti_gaspillage', label: 'Anti-Gaspillage' },
  { value: 'innovations', label: 'Innovations' },
  { value: 'actualites', label: 'Actualités' }
];

export default function BlogCreate() {
  const navigate = useNavigate();
  // const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    featured_image_url: '',
    tags: [] as string[]
  });
  const [newTag, setNewTag] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .trim();
  };

  const saveDraft = async () => {
    if (!formData.title.trim()) {
      toast({
        title: "Erreur",
        description: "Le titre est requis pour sauvegarder",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const slug = generateSlug(formData.title);
      
      const { error } = await supabase
        .from('articles')
        .insert({
          title: formData.title,
          excerpt: formData.excerpt || null,
          content: formData.content,
          category: formData.category as any,
          featured_image_url: formData.featured_image_url || null,
          tags: formData.tags,
          slug: slug,
          author_id: "123",
          status: 'brouillon'
        });

      if (error) throw error;

      toast({
        title: "Brouillon sauvegardé",
        description: "Votre article a été sauvegardé en brouillon"
      });
      
      navigate('/blog');
    } catch (error) {
      console.error('Error saving draft:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder le brouillon",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const publishArticle = async () => {
    if (!formData.title.trim() || !formData.content.trim() || !formData.category) {
      toast({
        title: "Erreur", 
        description: "Veuillez remplir tous les champs requis",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const slug = generateSlug(formData.title);
      
      const { error } = await supabase
        .from('articles')
        .insert({
          title: formData.title,
          excerpt: formData.excerpt || null,
          content: formData.content,
          category: formData.category as any,
          featured_image_url: formData.featured_image_url || null,
          tags: formData.tags,
          slug: slug,
          author_id: "123",
          status: 'publie',
          published_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Article publié",
        description: "Votre article a été publié avec succès"
      });
      
      navigate('/blog');
    } catch (error) {
      console.error('Error publishing article:', error);
      toast({
        title: "Erreur",
        description: "Impossible de publier l'article",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // if (!user) {
  //   return (
  //     <div className="min-h-screen bg-secondary/30">
  //       <Navbar />
  //       <main className="pt-20 pb-12">
  //         <div className="max-w-4xl mx-auto px-4 text-center">
  //           <h1 className="text-2xl font-bold mb-4">Accès restreint</h1>
  //           <p className="text-muted-foreground mb-6">
  //             Vous devez être connecté pour créer un article.
  //           </p>
  //           <Button onClick={() => navigate('/auth')}>
  //             Se connecter
  //           </Button>
  //         </div>
  //       </main>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-secondary/30">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Créer un article
              </h1>
              <p className="text-muted-foreground mt-2">
                Partagez vos connaissances avec la communauté NaturaLink
              </p>
            </div>
            <Button variant="outline" onClick={() => navigate('/blog')}>
              Annuler
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title */}
              <Card>
                <CardHeader>
                  <CardTitle>Titre de l'article</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="Entrez le titre de votre article..."
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="text-lg"
                  />
                </CardContent>
              </Card>

              {/* Excerpt */}
              <Card>
                <CardHeader>
                  <CardTitle>Résumé</CardTitle>
                  <CardDescription>
                    Un court résumé qui apparaîtra sur la liste des articles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Décrivez brièvement votre article..."
                    value={formData.excerpt}
                    onChange={(e) => handleInputChange('excerpt', e.target.value)}
                    rows={3}
                  />
                </CardContent>
              </Card>

              {/* Content */}
              <Card>
                <CardHeader>
                  <CardTitle>Contenu</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Rédigez le contenu de votre article..."
                    value={formData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    rows={15}
                    className="min-h-[400px]"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={saveDraft}
                    variant="outline"
                    className="w-full"
                    disabled={loading}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Sauvegarder brouillon
                  </Button>
                  <Button
                    onClick={publishArticle}
                    className="w-full"
                    disabled={loading}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Publier l'article
                  </Button>
                </CardContent>
              </Card>

              {/* Category */}
              <Card>
                <CardHeader>
                  <CardTitle>Catégorie</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Featured Image */}
              <Card>
                <CardHeader>
                  <CardTitle>Image de couverture</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="URL de l'image..."
                    value={formData.featured_image_url}
                    onChange={(e) => handleInputChange('featured_image_url', e.target.value)}
                  />
                  {formData.featured_image_url && (
                    <div className="mt-3">
                      <img
                        src={formData.featured_image_url}
                        alt="Aperçu"
                        className="w-full h-32 object-cover rounded"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle>Étiquettes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ajouter une étiquette..."
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    />
                    <Button onClick={addTag} size="sm">
                      Ajouter
                    </Button>
                  </div>
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <X
                            className="w-3 h-3 cursor-pointer"
                            onClick={() => removeTag(tag)}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}