import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Award, Leaf, Eye } from "lucide-react";

interface ProducerCardProps {
  name: string;
  location: string;
  certifications: string[];
  productsCount: number;
  avatar?: string;
  status: "verified" | "pending" | "new";
}

export function ProducerCard({ 
  name, 
  location, 
  certifications, 
  productsCount, 
  avatar, 
  status 
}: ProducerCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified": return "bg-nature-secondary text-white";
      case "pending": return "bg-accent text-accent-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "verified": return "Vérifié";
      case "pending": return "En attente";
      default: return "Nouveau";
    }
  };

  return (
    <Card className="transition-smooth hover:shadow-medium cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={avatar} />
              <AvatarFallback className="hero-gradient text-primary-foreground font-semibold">
                {name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-foreground">{name}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="w-3 h-3" />
                {location}
              </div>
            </div>
          </div>
          <Badge className={getStatusColor(status)}>
            {getStatusText(status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Certifications */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-nature-tertiary" />
            <span className="text-sm font-medium">Certifications</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {certifications.map((cert, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {cert}
              </Badge>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-nature-primary" />
            <span className="text-sm text-muted-foreground">
              {productsCount} produits certifiés
            </span>
          </div>
          <Button size="sm" variant="outline" className="gap-2">
            <Eye className="w-4 h-4" />
            Voir profil
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}