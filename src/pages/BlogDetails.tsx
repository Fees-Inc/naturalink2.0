import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/landing/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Share2, MessageCircle, Calendar, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { mockArticles, mockComments } from "@/mock/articles";

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
    if (!id) return;

    const found = mockArticles.find((a) => a.id === id);
    setArticle(found || null);
    setComments(mockComments);
    setRelatedArticles(mockArticles.filter((a) => a.id !== id).slice(0, 3));
    setLoading(false);
  }, [id]);

  const handleLike = () => {
    if (!article) return;

    setIsLiked(!isLiked);
    setArticle({
      ...article,
      likes_count: isLiked ? article.likes_count - 1 : article.likes_count + 1,
    });
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const newMock = {
      id: Date.now().toString(),
      content: newComment,
      created_at: new Date().toISOString(),
      profiles: {
        first_name: user?.email || "Mock",
        last_name: user?.email || "User",
      },
    };
    setComments([newMock, ...comments]);
    setNewComment("");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      agriculture_durable: 'bg-green-100 text-green-800',
      consommation: 'bg-blue-100 text-blue-800',
      anti_gaspillage: 'bg-orange-100 text-orange-800',
      innovations: 'bg-purple-100 text-purple-800',
      actualites: 'bg-gray-100 text-gray-800',
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
            <Button onClick={() => navigate('/blog')}>Retour au blog</Button>
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
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge className={getCategoryColor(article.category)}>
                {article.category.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
            <div className="flex items-center gap-6 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{article.profiles.first_name} {article.profiles.last_name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(article.published_at)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span>{article.likes_count} likes</span>
              </div>
            </div>
            {article.featured_image_url && (
              <img
                src={article.featured_image_url}
                alt={article.title}
                className="w-full h-96 object-cover rounded-lg mb-6"
              />
            )}
          </div>
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-lg leading-relaxed">{article.content || article.excerpt}</p>
          </div>
          <div className="flex items-center gap-4 mb-12">
            <Button
              variant={isLiked ? 'default' : 'outline'}
              onClick={handleLike}
              className="flex items-center gap-2"
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              {isLiked ? 'Aimé' : 'Aimer'} ({article.likes_count})
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Partager
            </Button>
          </div>
          <Separator className="mb-12" />
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <MessageCircle className="h-6 w-6" />
              Commentaires ({comments.length})
            </h2>
            {user && (
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <Textarea
                    placeholder="Écrivez votre commentaire..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="mb-4"
                  />
                  <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                    Publier le commentaire
                  </Button>
                </CardContent>
              </Card>
            )}
            <div className="space-y-4">
              {comments.map((comment) => (
                <Card key={comment.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarFallback>
                          {comment.profiles.first_name?.[0]}{comment.profiles.last_name?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">
                            {comment.profiles.first_name} {comment.profiles.last_name}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {formatDate(comment.created_at)}
                          </span>
                        </div>
                        <p className="text-muted-foreground">{comment.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <Separator className="mb-12" />
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
