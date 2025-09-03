import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/landing/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Share2, MessageCircle, Calendar, User, ThumbsUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface Article {
  id: string;
  title: string;
  content?: string;
  excerpt?: string;
  category: string;
  featured_image_url?: string;
  published_at: string;
  views_count: number;
  likes_count: number;
  profiles: {
    first_name?: string;
    last_name?: string;
  };
}

interface Comment {
  id: string;
  content: string;
  created_at: string;
  profiles: {
    first_name?: string;
    last_name?: string;
  };
}

export default function BlogDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  useEffect(() => {
    if (id) {
      fetchArticle();
      fetchComments();
      fetchRelatedArticles();
      incrementViews();
    }
  }, [id]);

  const fetchArticle = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          profiles (
            first_name,
            last_name
          )
        `)
        .eq('id', id)
        .eq('status', 'publie')
        .single();

      if (error) throw error;
      setArticle(data);
    } catch (error) {
      console.error('Error fetching article:', error);
      navigate('/blog');
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await supabase
        .from('comments')
        .select(`
          *,
          profiles (
            first_name,
            last_name
          )
        `)
        .eq('article_id', id)
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (data) setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const fetchRelatedArticles = async () => {
    try {
      const { data } = await supabase
        .from('articles')
        .select(`
          id,
          title,
          excerpt,
          category,
          featured_image_url,
          published_at,
          views_count,
          likes_count,
          profiles (
            first_name,
            last_name
          )
        `)
        .eq('status', 'publie')
        .neq('id', id)
        .limit(3)
        .order('published_at', { ascending: false });

      if (data) setRelatedArticles(data);
    } catch (error) {
      console.error('Error fetching related articles:', error);
    }
  };

  const incrementViews = async () => {
    try {
      await supabase.rpc('increment_article_views', { article_id: id });
    } catch (error) {
      console.error('Error incrementing views:', error);
    }
  };

  const handleLike = async () => {
    if (!user || !id) return;
    
    try {
      const { data: liked } = await supabase.rpc('toggle_article_like', {
        article_id: id,
        user_id: user.id
      });
      
      setIsLiked(liked);
      if (article) {
        setArticle({
          ...article,
          likes_count: liked ? article.likes_count + 1 : article.likes_count - 1
        });
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleAddComment = async () => {
    if (!user || !newComment.trim()) return;

    try {
      const { error } = await supabase
        .from('comments')
        .insert({
          article_id: id,
          author_id: user.id,
          content: newComment.trim()
        });

      if (error) throw error;
      
      setNewComment("");
      fetchComments(); // Refresh comments
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'agriculture_durable': 'bg-green-100 text-green-800',
      'consommation': 'bg-blue-100 text-blue-800',
      'anti_gaspillage': 'bg-orange-100 text-orange-800',
      'innovations': 'bg-purple-100 text-purple-800',
      'actualites': 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary/30">
        <Navbar />
        <main className="pt-20 pb-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-muted-foreground">Chargement de l'article...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-secondary/30">
        <Navbar />
        <main className="pt-20 pb-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Article non trouvé</h1>
            <Button onClick={() => navigate('/blog')}>
              Retour au blog
            </Button>
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
          {/* Article Header */}
          <div className="mb-8">
            <Badge className={`mb-4 ${getCategoryColor(article.category)}`}>
              {article.category.replace('_', ' ').toUpperCase()}
            </Badge>
            <h1 className="text-4xl font-bold text-foreground mb-6">
              {article.title}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="w-10 h-10">
                <AvatarImage src="" />
                <AvatarFallback>
                  {article.profiles?.first_name?.[0] || 'A'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium">
                  {article.profiles?.first_name} {article.profiles?.last_name}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(article.published_at)}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {article.views_count} vues
                  </div>
                </div>
              </div>
            </div>

            {article.featured_image_url && (
              <div className="aspect-video overflow-hidden rounded-lg mb-8">
                <img
                  src={article.featured_image_url}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Article Content */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content || '' }}
              />
            </CardContent>
          </Card>

          {/* Article Actions */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant={isLiked ? "default" : "outline"}
              onClick={handleLike}
              disabled={!user}
            >
              <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
              {article.likes_count} J'aime
            </Button>
            <Button variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Partager
            </Button>
          </div>

          {/* Comments Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Commentaires ({comments.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add Comment */}
              {user ? (
                <div className="space-y-4">
                  <Textarea
                    placeholder="Partagez votre avis sur cet article..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                  />
                  <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                    Publier le commentaire
                  </Button>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  <Button variant="link" onClick={() => navigate('/auth')} className="p-0">
                    Connectez-vous
                  </Button> pour laisser un commentaire.
                </p>
              )}

              <Separator />

              {/* Comments List */}
              {comments.length > 0 ? (
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>
                          {comment.profiles?.first_name?.[0] || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">
                            {comment.profiles?.first_name} {comment.profiles?.last_name}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {formatDate(comment.created_at)}
                          </span>
                        </div>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Aucun commentaire pour le moment. Soyez le premier à commenter !
                </p>
              )}
            </CardContent>
          </Card>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Articles similaires</CardTitle>
                <CardDescription>
                  Découvrez d'autres articles qui pourraient vous intéresser
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedArticles.map((related) => (
                    <Card 
                      key={related.id}
                      className="cursor-pointer hover:shadow-medium transition-smooth"
                      onClick={() => navigate(`/blog/${related.id}`)}
                    >
                      {related.featured_image_url && (
                        <div className="aspect-video overflow-hidden rounded-t-lg">
                          <img
                            src={related.featured_image_url}
                            alt={related.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardHeader className="p-4">
                        <Badge className={`mb-2 w-fit ${getCategoryColor(related.category)}`}>
                          {related.category.replace('_', ' ')}
                        </Badge>
                        <CardTitle className="text-base line-clamp-2">
                          {related.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {related.excerpt}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}