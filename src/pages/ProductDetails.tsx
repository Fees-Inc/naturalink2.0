import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/landing/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { MapPin, Calendar, Award, Share2, ShoppingCart, Star, Phone, Mail, ExternalLink, Truck, Leaf, Factory } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  description?: string;
  origin_location?: string;
  sustainability_info?: string;
  photo_url?: string;
  harvest_date?: string;
  producer_video_url?: string;
  certifications: any;
  lot_number?: string;
  user_id?: string;
}

interface Timeline {
  id: string;
  title: string;
  description?: string;
  event_type: string;
  event_date: string;
  location?: string;
  latitude?: number;
  longitude?: number;
}

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [timeline, setTimeline] = useState<Timeline[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState(0);
  const [reviews] = useState([
    {
      id: 1,
      user: "Marie Kouassi",
      rating: 5,
      comment: "Produit excellent, très frais et traçabilité parfaite !",
      date: "2024-01-15"
    },
    {
      id: 2,
      user: "Jean Assi",
      rating: 4,
      comment: "Bonne qualité, livraison rapide.",
      date: "2024-01-12"
    }
  ]);

  useEffect(() => {
    if (id) {
      fetchProductDetails();
      fetchTimeline();
    }
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .eq('status', 'active')
        .single();

      if (error) throw error;
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const fetchTimeline = async () => {
    try {
      const { data } = await supabase
        .from('product_timeline')
        .select('*')
        .eq('product_id', id)
        .order('event_date', { ascending: true });

      if (data) setTimeline(data);
    } catch (error) {
      console.error('Error fetching timeline:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTimelineIcon = (eventType: string) => {
    switch (eventType) {
      case 'harvest': return <Leaf className="w-5 h-5" />;
      case 'transport': return <Truck className="w-5 h-5" />;
      case 'processing': return <Factory className="w-5 h-5" />;
      default: return <MapPin className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary/30">
        <Navbar />
        <main className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-muted-foreground">Chargement du produit...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-secondary/30">
        <Navbar />
        <main className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Produit non trouvé</h1>
            <Button onClick={() => navigate('/products')}>
              Retour aux produits
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src={product.photo_url || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="bg-accent text-foreground">
                    NFC Certifié
                  </Badge>
                  {Array.isArray(product.certifications) && product.certifications.length > 0 && (
                    <Badge variant="outline">
                      <Award className="w-3 h-3 mr-1" />
                      Bio
                    </Badge>
                  )}
                </div>
                <h1 className="text-4xl font-bold text-foreground mb-4">
                  {product.name}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {product.description}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <span>{product.origin_location}</span>
                </div>
                {product.harvest_date && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <span>Récolté le {formatDate(product.harvest_date)}</span>
                  </div>
                )}
                {product.lot_number && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Lot:</span>
                    <span className="text-sm font-mono">{product.lot_number}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <Button size="lg" className="flex-1">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Acheter
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="w-4 h-4 mr-2" />
                  Partager
                </Button>
              </div>
            </div>
          </div>

          {/* Journey Timeline */}
          {timeline.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Parcours du produit</CardTitle>
                <CardDescription>
                  Suivez le chemin de ce produit depuis sa production
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {timeline.map((event, index) => (
                    <div key={event.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white">
                          {getTimelineIcon(event.event_type)}
                        </div>
                        {index < timeline.length - 1 && (
                          <div className="w-px h-12 bg-border mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{event.title}</h3>
                          <span className="text-sm text-muted-foreground">
                            {formatDate(event.event_date)}
                          </span>
                        </div>
                        {event.description && (
                          <p className="text-muted-foreground mb-2">{event.description}</p>
                        )}
                        {event.location && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            {event.location}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Producer Info */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Producteur</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src="" />
                  <AvatarFallback>PC</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">Producteur Certifié</h3>
                  <p className="text-muted-foreground">{product.origin_location}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <Button variant="outline" size="sm">
                      <Phone className="w-3 h-3 mr-1" />
                      Contacter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="w-3 h-3 mr-1" />
                      Email
                    </Button>
                  </div>
                </div>
              </div>
              {product.sustainability_info && (
                <Badge variant="secondary" className="text-xs">
                  {product.sustainability_info}
                </Badge>
              )}
            </CardContent>
          </Card>

          {/* Reviews Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Avis consommateurs</CardTitle>
              <CardDescription>
                Ce que pensent nos clients de ce produit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Add Review */}
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-3">Donnez votre avis</h4>
                  <div className="flex items-center gap-2 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 cursor-pointer ${
                          star <= userRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                        }`}
                        onClick={() => setUserRating(star)}
                      />
                    ))}
                  </div>
                  <Button size="sm">Ajouter un avis</Button>
                </div>

                <Separator />

                {/* Reviews List */}
                {reviews.map((review) => (
                  <div key={review.id} className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>{review.user[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{review.user}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-3 h-3 ${
                                  star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {formatDate(review.date)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground pl-11">{review.comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}