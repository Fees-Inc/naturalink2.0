import { User, Leaf, Package, Shield, Map, MessageCircle, BarChart3, Truck, QrCode, Star, Bell, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function FeatureSectionWithBentoGrid() {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10">
          <div className="flex gap-4 flex-col items-start">
            <div>
              <Badge variant="secondary">Plateforme NaturaLink</Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left">
                Fonctionnalités Complètes
              </h2>
              <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
                Une solution intégrée pour tous les acteurs de la chaîne agroalimentaire, de la production à la consommation.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Large card - Profil Producteur */}
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex justify-between flex-col hover:shadow-lg transition-all duration-300">
              <User className="w-8 h-8 stroke-1 text-primary" />
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight font-semibold">Profil Producteur</h3>
                <p className="text-muted-foreground max-w-xs text-base">
                  Gestion complète du profil avec informations, logo, historique, localisation et certifications.
                </p>
              </div>
            </div>

            {/* Small card - Gestion Produits */}
            <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 rounded-xl aspect-square p-6 flex justify-between flex-col hover:shadow-lg transition-all duration-300">
              <Package className="w-8 h-8 stroke-1 text-secondary-foreground" />
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight font-semibold">Gestion Produits</h3>
                <p className="text-muted-foreground max-w-xs text-base">
                  Ajout facile avec nom, variété, origine, méthode de culture et médias.
                </p>
              </div>
            </div>

            {/* Small card - Stickers NFC */}
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-xl aspect-square p-6 flex justify-between flex-col hover:shadow-lg transition-all duration-300">
              <QrCode className="w-8 h-8 stroke-1 text-accent-foreground" />
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight font-semibold">Stickers NFC</h3>
                <p className="text-muted-foreground max-w-xs text-base">
                  Génération automatique de stickers NFC liés à chaque produit.
                </p>
              </div>
            </div>

            {/* Large card - Traçabilité */}
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex justify-between flex-col hover:shadow-lg transition-all duration-300">
              <Map className="w-8 h-8 stroke-1 text-primary" />
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight font-semibold">Traçabilité Complète</h3>
                <p className="text-muted-foreground max-w-xs text-base">
                  Suivi des lots, carte interactive du parcours produit et fiches interactives avec vidéos d'origine.
                </p>
              </div>
            </div>

            {/* Small card - Certifications */}
            <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 rounded-xl aspect-square p-6 flex justify-between flex-col hover:shadow-lg transition-all duration-300">
              <Shield className="w-8 h-8 stroke-1 text-secondary-foreground" />
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight font-semibold">Certifications</h3>
                <p className="text-muted-foreground max-w-xs text-base">
                  Validation et affichage des labels et certifications biologiques.
                </p>
              </div>
            </div>

            {/* Small card - Alertes */}
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-xl aspect-square p-6 flex justify-between flex-col hover:shadow-lg transition-all duration-300">
              <Bell className="w-8 h-8 stroke-1 text-accent-foreground" />
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight font-semibold">Alertes Expiration</h3>
                <p className="text-muted-foreground max-w-xs text-base">
                  Notifications automatiques pour produits proches de l'expiration.
                </p>
              </div>
            </div>

            {/* Small card - Avis Consommateurs */}
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl aspect-square p-6 flex justify-between flex-col hover:shadow-lg transition-all duration-300">
              <Star className="w-8 h-8 stroke-1 text-primary" />
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight font-semibold">Avis Consommateurs</h3>
                <p className="text-muted-foreground max-w-xs text-base">
                  Système de notation et avis pour créer une communauté de confiance.
                </p>
              </div>
            </div>

            {/* Large card - Dashboard Distributeur */}
            <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 rounded-xl h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex justify-between flex-col hover:shadow-lg transition-all duration-300">
              <BarChart3 className="w-8 h-8 stroke-1 text-secondary-foreground" />
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight font-semibold">Dashboard Distributeur</h3>
                <p className="text-muted-foreground max-w-xs text-base">
                  Suivi approvisionnement, données de consommation et gestion des partenaires avec analytics avancés.
                </p>
              </div>
            </div>

            {/* Small card - Logistique */}
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-xl aspect-square p-6 flex justify-between flex-col hover:shadow-lg transition-all duration-300">
              <Truck className="w-8 h-8 stroke-1 text-accent-foreground" />
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight font-semibold">Outils Logistiques</h3>
                <p className="text-muted-foreground max-w-xs text-base">
                  Gestion des invendus avec recommandations durables.
                </p>
              </div>
            </div>

            {/* Small card - Communauté */}
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl aspect-square p-6 flex justify-between flex-col hover:shadow-lg transition-all duration-300">
              <Users className="w-8 h-8 stroke-1 text-primary" />
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight font-semibold">Communauté</h3>
                <p className="text-muted-foreground max-w-xs text-base">
                  Forum et messagerie avec support NaturaLink intégré.
                </p>
              </div>
            </div>

            {/* Small card - Éco-responsabilité */}
            <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 rounded-xl aspect-square p-6 flex justify-between flex-col hover:shadow-lg transition-all duration-300">
              <Leaf className="w-8 h-8 stroke-1 text-secondary-foreground" />
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight font-semibold">Éco-responsabilité</h3>
                <p className="text-muted-foreground max-w-xs text-base">
                  Tableau de transparence avec labels nutrition et impact environnemental.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export { FeatureSectionWithBentoGrid };