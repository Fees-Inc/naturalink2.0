import { useState, useEffect } from "react";
import { MapPin, Star, Award, Leaf } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ProducerCardProps {
  producer: {
    id: string;
    name: string;
    /** Absent ou erreur de chargement = bandeau neutre (pas de photo « générique » trompeuse). */
    image?: string;
    specialties: string[];
    location: string;
    rating: number;
    reviewCount: number;
    certificationLevel: "gold" | "silver" | "bronze";
    organic: boolean;
    description: string;
  };
}

const certLabels: Record<ProducerCardProps["producer"]["certificationLevel"], string> = {
  gold: "Or",
  silver: "Argent",
  bronze: "Bronze",
};

const ProducerCard = ({ producer }: ProducerCardProps) => {
  const navigate = useNavigate();
  const [broken, setBroken] = useState(false);

  useEffect(() => {
    setBroken(false);
  }, [producer.image]);

  const showImage = Boolean(producer.image) && !broken;

  const getCertificationColor = () => {
    switch (producer.certificationLevel) {
      case "gold":
        return "bg-gradient-certified text-white";
      case "silver":
        return "bg-gray-300 text-gray-800";
      case "bronze":
        return "bg-amber-600 text-white";
      default:
        return "bg-muted";
    }
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-medium hover:-translate-y-1 border-border/50 bg-card">
      <div className="relative h-48 overflow-hidden bg-gradient-earth">
        {showImage && producer.image ? (
          <img
            src={producer.image}
            alt={producer.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer-when-downgrade"
            onError={() => setBroken(true)}
          />
        ) : null}
        {producer.organic && (
          <div className="absolute top-3 left-3 bg-quality-green/90 backdrop-blur-sm rounded-full p-2 shadow-glow">
            <Leaf className="w-5 h-5 text-white" />
          </div>
        )}
        <div className={`absolute top-3 right-3 ${getCertificationColor()} rounded-full px-3 py-1 flex items-center gap-1 shadow-certified`}>
          <Award className="w-4 h-4" />
          <span className="text-xs font-semibold">{certLabels[producer.certificationLevel]}</span>
        </div>
      </div>
      
      <CardContent className="p-5">
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-1">
          {producer.name}
        </h3>
        
        <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{producer.location}</span>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center" aria-label={`Note ${producer.rating} sur 5`}>
            {[...Array(5)].map((_, i) => {
              const filled = Math.min(5, Math.round(producer.rating));
              return (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < filled ? "fill-certified-gold text-certified-gold" : "fill-muted text-muted-foreground/40"
                  }`}
                />
              );
            })}
          </div>
          <span className="text-sm text-muted-foreground">
            {producer.rating.toFixed(1)} ({producer.reviewCount} avis)
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {producer.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {producer.specialties.slice(0, 3).map((specialty) => (
            <Badge
              key={specialty}
              variant="secondary"
              className="text-xs bg-secondary/50 text-secondary-foreground border-primary/20"
            >
              {specialty}
            </Badge>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="default"
            className="flex-1 bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:text-primary-foreground"
            onClick={() => navigate("/products")}
          >
            Voir le profil
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-primary/40 text-primary bg-background hover:bg-primary/10 hover:text-primary"
            type="button"
          >
            Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProducerCard