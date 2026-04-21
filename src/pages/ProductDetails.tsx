import { useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/landing/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  MapPin,
  Calendar,
  Award,
  Share2,
  Star,
  Phone,
  Mail,
  Truck,
  Leaf,
  Factory,
  ShieldCheck,
  ChevronLeft,
  Link2,
} from "lucide-react";
import { productService } from "@/services/productService";
import { getMockProductById } from "@/data/mockNaturalink";

interface Timeline {
  id: string;
  title: string;
  description?: string;
  event_type: string;
  event_date: string;
  location?: string;
}

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [userRating, setUserRating] = useState(0);
  const [reviews] = useState([
    {
      id: 1,
      user: "Adjoua K.",
      rating: 5,
      comment: "J’ai scanné au rayon : origine claire, j’adore la transparence sur le lot.",
      date: "2026-01-10",
    },
    {
      id: 2,
      user: "Kouadio M.",
      rating: 5,
      comment: "Parfait pour présenter le projet à ma coopérative — interface très lisible.",
      date: "2026-01-08",
    },
  ]);

  const { data: product, isLoading: isProductLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => productService.getProductById(id ?? ""),
    enabled: !!id,
  });

  const { data: traceability, isLoading: isTraceabilityLoading } = useQuery({
    queryKey: ["productTraceability", id],
    queryFn: () => productService.getProductTraceability(id ?? ""),
    enabled: !!id,
  });

  const demo = useMemo(() => (id ? getMockProductById(id) : undefined), [id]);

  const loading = isProductLoading || isTraceabilityLoading;
  const timeline = (traceability?.activity_logs ?? []) as Timeline[];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getTimelineIcon = (eventType: string) => {
    switch (eventType) {
      case "harvest":
        return <Leaf className="w-5 h-5" />;
      case "transport":
        return <Truck className="w-5 h-5" />;
      case "processing":
        return <Factory className="w-5 h-5" />;
      default:
        return <MapPin className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Navbar />
        <main className="pt-24 pb-16 px-4">
          <div className="max-w-3xl mx-auto text-center text-muted-foreground">Chargement du passeport produit…</div>
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Navbar />
        <main className="pt-24 pb-16 px-4 text-center">
          <h1 className="text-2xl font-semibold mb-4">Produit introuvable</h1>
          <Button onClick={() => navigate("/products")}>Retour au catalogue démo</Button>
        </main>
      </div>
    );
  }

  const trust = demo?.trust_score ?? 88;
  const lot = demo?.lot_number ?? product.nfc_tag_id ?? "—";

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/40 to-background">
      <Navbar />

      <main className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <Button variant="ghost" size="sm" className="gap-1 -ml-2" asChild>
              <Link to="/products">
                <ChevronLeft className="h-4 w-4" />
                Catalogue
              </Link>
            </Button>
            <Badge variant="outline" className="border-orange-400/60 text-orange-800 bg-orange-50">
              Démo Naturalink
            </Badge>
            <Badge className="bg-primary/90">Passeport numérique</Badge>
          </div>

          <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
            <div className="lg:col-span-2 space-y-6">
              <div className="aspect-[4/5] overflow-hidden rounded-3xl border border-border shadow-lg bg-card">
                {product.photo_url ? (
                  <img
                    src={product.photo_url}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div
                    className="h-full min-h-[12rem] w-full bg-muted"
                    aria-label={`Pas d’image pour ${product.name}`}
                  />
                )}
              </div>

              <Card className="rounded-3xl border-orange-200/60 bg-orange-50/40">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    Score de transparence (démo)
                  </CardTitle>
                  <CardDescription>Indicateur visuel pour pitch — non certifié par un tiers.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-end justify-between gap-4">
                    <span className="text-4xl font-bold text-primary">{trust}</span>
                    <span className="text-sm text-muted-foreground mb-1">/ 100</span>
                  </div>
                  <Progress value={trust} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Basé sur la complétude des étapes, la présence de certifications déclarées et l&apos;ancrage
                    blockchain simulé.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3 space-y-8">
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                    NFC / QR
                  </Badge>
                  {product.certifications?.length ? (
                    <Badge variant="outline" className="gap-1">
                      <Award className="w-3 h-3" />
                      Certifications déclarées
                    </Badge>
                  ) : null}
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-foreground leading-tight">
                  {product.name}
                </h1>
                <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{product.description}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border bg-card p-4 flex gap-3">
                  <MapPin className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-medium uppercase text-muted-foreground">Origine</p>
                    <p className="font-medium">{product.origin_location}</p>
                  </div>
                </div>
                {product.harvest_date ? (
                  <div className="rounded-2xl border bg-card p-4 flex gap-3">
                    <Calendar className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium uppercase text-muted-foreground">Récolte / référence</p>
                      <p className="font-medium">{formatDate(product.harvest_date)}</p>
                    </div>
                  </div>
                ) : null}
                <div className="rounded-2xl border bg-card p-4 flex gap-3 sm:col-span-2">
                  <Link2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase text-muted-foreground">Lot & ancrage (démo)</p>
                    <p className="font-mono text-sm break-all">{lot}</p>
                    {demo?.blockchain_tx ? (
                      <p className="text-xs text-muted-foreground mt-1">Tx VeChain (fictif) : {demo.blockchain_tx}</p>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="rounded-full flex-1" variant="secondary">
                  <Share2 className="w-4 h-4" />
                  Partager la fiche
                </Button>
                <Button size="lg" variant="outline" className="rounded-full flex-1 border-primary/30">
                  Signaler une anomalie (démo)
                </Button>
              </div>

              {timeline.length > 0 ? (
                <Card className="rounded-3xl">
                  <CardHeader>
                    <CardTitle>Parcours de la filière</CardTitle>
                    <CardDescription>Du champ au conditionnement — données de démonstration.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {timeline.map((event, index) => (
                        <div key={event.id} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                              {getTimelineIcon(event.event_type)}
                            </div>
                            {index < timeline.length - 1 ? <div className="w-px flex-1 min-h-[2.5rem] bg-border mt-2" /> : null}
                          </div>
                          <div className="flex-1 pb-2">
                            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                              <h3 className="font-semibold">{event.title}</h3>
                              <span className="text-sm text-muted-foreground">{formatDate(event.event_date)}</span>
                            </div>
                            {event.description ? <p className="text-sm text-muted-foreground mb-2">{event.description}</p> : null}
                            {event.location ? (
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <MapPin className="w-3 h-3" />
                                {event.location}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : null}

              <Card className="rounded-3xl">
                <CardHeader>
                  <CardTitle>Producteur & structure</CardTitle>
                  <CardDescription>Profil illustratif pour la présentation.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="bg-primary/15 text-primary text-lg">
                        {(demo?.producer_name ?? "P")[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <h3 className="text-lg font-semibold">{demo?.producer_name ?? "Producteur (démo)"}</h3>
                      <p className="text-muted-foreground text-sm">{demo?.cooperative_name ?? product.origin_location}</p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        <Button variant="outline" size="sm" type="button" disabled>
                          <Phone className="w-3 h-3" />
                          Contacter
                        </Button>
                        <Button variant="outline" size="sm" type="button" disabled>
                          <Mail className="w-3 h-3" />
                          Email
                        </Button>
                      </div>
                    </div>
                  </div>
                  {product.sustainability_info ? (
                    <Badge variant="secondary" className="mt-4">
                      {product.sustainability_info}
                    </Badge>
                  ) : null}
                </CardContent>
              </Card>

              <Card className="rounded-3xl">
                <CardHeader>
                  <CardTitle>Avis (démo)</CardTitle>
                  <CardDescription>Exemples de retours consommateurs.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-2xl p-4 mb-6 bg-muted/20">
                    <h4 className="font-medium mb-3">Votre note</h4>
                    <div className="flex gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-6 h-6 cursor-pointer ${
                            star <= userRating ? "fill-amber-400 text-amber-500" : "text-muted-foreground/40"
                          }`}
                          onClick={() => setUserRating(star)}
                        />
                      ))}
                    </div>
                    <Button size="sm" variant="secondary" type="button">
                      Enregistrer (démo)
                    </Button>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="space-y-2">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-9 h-9">
                            <AvatarFallback>{review.user[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{review.user}</p>
                            <div className="flex flex-wrap items-center gap-2">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`w-3 h-3 ${
                                      star <= review.rating ? "fill-amber-400 text-amber-500" : "text-muted-foreground/30"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-muted-foreground">{formatDate(review.date)}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground pl-12">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
