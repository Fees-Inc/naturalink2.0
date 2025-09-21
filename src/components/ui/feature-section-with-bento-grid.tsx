import { User, Leaf, Package, Shield, Map, BarChart3, Truck, QrCode, Star, Bell, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Types pour la structure des données
interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBgColor: string;
  iconColor: string;
  gradientFrom: string;
  gradientTo: string;
  borderColor: string;
  size: 'small' | 'large';
  specialAnimation?: string;
}

// Configuration des textes et données
const SECTION_CONFIG = {
  badge: "Plateforme NaturaLink",
  title: "Fonctionnalités Complètes",
  description: "Une solution intégrée pour tous les acteurs de la chaîne agroalimentaire, de la production à la consommation."
};

const FEATURE_CARDS: FeatureCard[] = [
  {
    id: "producer-profile",
    title: "Profil Producteur",
    description: "Gestion complète du profil avec informations, logo, historique, localisation et certifications.",
    icon: User,
    iconBgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    gradientFrom: "from-primary/10",
    gradientTo: "to-primary/5",
    borderColor: "border-primary/20",
    size: "large"
  },
  {
    id: "product-management",
    title: "Gestion Produits",
    description: "Ajout facile avec nom, variété, origine, méthode de culture et médias.",
    icon: Package,
    iconBgColor: "bg-green-100",
    iconColor: "text-green-600",
    gradientFrom: "from-secondary/10",
    gradientTo: "to-secondary/5",
    borderColor: "border-secondary/20",
    size: "small"
  },
  {
    id: "nfc-stickers",
    title: "Stickers NFC",
    description: "Génération automatique de stickers NFC liés à chaque produit.",
    icon: QrCode,
    iconBgColor: "bg-purple-100",
    iconColor: "text-purple-600",
    gradientFrom: "from-accent/10",
    gradientTo: "to-accent/5",
    borderColor: "border-accent/20",
    size: "small"
  },
  {
    id: "traceability",
    title: "Traçabilité Complète",
    description: "Suivi des lots, carte interactive du parcours produit et fiches interactives avec vidéos d'origine.",
    icon: Map,
    iconBgColor: "bg-orange-100",
    iconColor: "text-orange-600",
    gradientFrom: "from-primary/10",
    gradientTo: "to-primary/5",
    borderColor: "border-primary/20",
    size: "large"
  },
  {
    id: "certifications",
    title: "Certifications",
    description: "Validation et affichage des labels et certifications biologiques.",
    icon: Shield,
    iconBgColor: "bg-emerald-100",
    iconColor: "text-emerald-600",
    gradientFrom: "from-secondary/10",
    gradientTo: "to-secondary/5",
    borderColor: "border-secondary/20",
    size: "small"
  },
  {
    id: "expiration-alerts",
    title: "Alertes Expiration",
    description: "Notifications automatiques pour produits proches de l'expiration.",
    icon: Bell,
    iconBgColor: "bg-red-100",
    iconColor: "text-red-600",
    gradientFrom: "from-accent/10",
    gradientTo: "to-accent/5",
    borderColor: "border-accent/20",
    size: "small",
    specialAnimation: "group-hover:animate-pulse"
  },
  {
    id: "consumer-reviews",
    title: "Avis Consommateurs",
    description: "Système de notation et avis pour créer une communauté de confiance.",
    icon: Star,
    iconBgColor: "bg-yellow-100",
    iconColor: "text-yellow-600",
    gradientFrom: "from-primary/10",
    gradientTo: "to-primary/5",
    borderColor: "border-primary/20",
    size: "small",
    specialAnimation: "group-hover:fill-yellow-600"
  },
  {
    id: "distributor-dashboard",
    title: "Dashboard Distributeur",
    description: "Suivi approvisionnement, données de consommation et gestion des partenaires avec analytics avancés.",
    icon: BarChart3,
    iconBgColor: "bg-indigo-100",
    iconColor: "text-indigo-600",
    gradientFrom: "from-secondary/10",
    gradientTo: "to-secondary/5",
    borderColor: "border-secondary/20",
    size: "large"
  },
  {
    id: "logistics-tools",
    title: "Outils Logistiques",
    description: "Gestion des invendus avec recommandations durables.",
    icon: Truck,
    iconBgColor: "bg-cyan-100",
    iconColor: "text-cyan-600",
    gradientFrom: "from-accent/10",
    gradientTo: "to-accent/5",
    borderColor: "border-accent/20",
    size: "small"
  },
  {
    id: "community",
    title: "Communauté",
    description: "Forum et messagerie avec support NaturaLink intégré.",
    icon: Users,
    iconBgColor: "bg-pink-100",
    iconColor: "text-pink-600",
    gradientFrom: "from-primary/10",
    gradientTo: "to-primary/5",
    borderColor: "border-primary/20",
    size: "small"
  },
  {
    id: "eco-responsibility",
    title: "Éco-responsabilité",
    description: "Tableau de transparence avec labels nutrition et impact environnemental.",
    icon: Leaf,
    iconBgColor: "bg-lime-100",
    iconColor: "text-lime-600",
    gradientFrom: "from-secondary/10",
    gradientTo: "to-secondary/5",
    borderColor: "border-secondary/20",
    size: "small"
  }
];

// Composant pour une carte de fonctionnalité
const FeatureCard = ({ card }: { card: FeatureCard }) => {
  const IconComponent = card.icon;
  const sizeClasses = card.size === 'large' 
    ? "h-full lg:col-span-2 aspect-square lg:aspect-auto" 
    : "aspect-square";
  
  return (
    <div className={`
      bg-gradient-to-br ${card.gradientFrom} ${card.gradientTo} 
      border ${card.borderColor} rounded-xl ${sizeClasses} 
      p-6 flex justify-between flex-col 
      hover:shadow-xl hover:-translate-y-2 transition-all duration-500 
      animate-fade-in group
    `}>
      <div className={`p-2 rounded-lg ${card.iconBgColor} w-fit`}>
        <IconComponent 
          className={`w-8 h-8 stroke-2 ${card.iconColor} group-hover:scale-110 transition-transform duration-300 ${card.specialAnimation || ''}`} 
        />
      </div>
      <div className="flex flex-col">
        <h3 className="text-xl tracking-tight font-semibold">{card.title}</h3>
        <p className="text-muted-foreground max-w-xs text-base">
          {card.description}
        </p>
      </div>
    </div>
  );
};

function FeatureSectionWithBentoGrid() {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10">
          <div className="flex gap-4 flex-col items-start">
            <div>
              <Badge variant="secondary">{SECTION_CONFIG.badge}</Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left">
                {SECTION_CONFIG.title}
              </h2>
              <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
                {SECTION_CONFIG.description}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURE_CARDS.map((card) => (
              <FeatureCard key={card.id} card={card} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureSectionWithBentoGrid;