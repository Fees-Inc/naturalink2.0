import { ReactNode } from "react";
import { MapPin, Package, Scan } from "lucide-react";

interface PartnerCircleCardProps {
  image: string;
  company: string;
  category: string;
  productsCount: string;
  scanRate: string;
  location: string;
  delay: string;
}

export const PartnerCircleCard = ({ 
  image, 
  company, 
  category, 
  productsCount, 
  scanRate, 
  location, 
  delay 
}: PartnerCircleCardProps) => {
  return (
    <div 
      className="flex flex-col items-center text-center group transition-smooth hover:scale-105"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Circular Image */}
      <div className="relative mb-6">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-medium group-hover:shadow-glow transition-smooth ring-4 ring-primary/20 group-hover:ring-primary/40">
          <img 
            src={image}
            alt={`Espace ${company}`}
            className="w-full h-full object-cover transition-smooth group-hover:scale-110"
          />
        </div>
        <div className="absolute bottom-2 right-1 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-soft">
          ✓
        </div>
      </div>

      {/* Company Info */}
      <div className="space-y-3 max-w-xs">
        <h3 className="text-xl font-bold text-foreground">
          {company}
        </h3>
        
        <div className="inline-block bg-accent/20 text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
          {category}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <Package className="w-4 h-4 text-primary" />
            <span className="font-medium text-foreground">{productsCount}</span>
            <span>produits certifiés</span>
          </div>
          
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <Scan className="w-4 h-4 text-accent" />
            <span className="font-bold text-accent">{scanRate}</span>
            <span>taux de scan</span>
          </div>
          
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <MapPin className="w-4 h-4 text-nature-secondary" />
            <span className="font-medium text-foreground">{location}</span>
          </div>
        </div>

        {/* Hover Indicator */}
        <div className="w-16 h-1 bg-gradient-primary rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-smooth"></div>
      </div>
    </div>
  );
};