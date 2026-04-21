import { useState } from "react";
import { Search, Filter, MapPin, Award, Leaf, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import ProducerCard from "@/components/ProducerCard";

/** Unsplash — sujets alignés avec les fiches (même base que la section « produits phares »). */
const PHOTO_CACAO =
  "https://images.unsplash.com/photo-1614350296597-20e04c87821d?auto=format&fit=crop&w=1200&q=85";
const PHOTO_CAFE =
  "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=85";
const PHOTO_LEGUMES =
"https://images.unsplash.com/photo-1614350296597-20e04c87821d?auto=format&fit=crop&w=1200&q=85";

const ProducersList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedCertification, setSelectedCertification] = useState("all");
  const [onlyOrganic, setOnlyOrganic] = useState(false);
  const [sortBy, setSortBy] = useState("rating");

  // 5 producteurs démo — Côte d'Ivoire (visuels cohérents, pas de vignoble)
  const allProducers = [
    {
      id: "1",
      name: "COOP-CAJOU du Poro",
      specialties: ["Noix de cajou", "Karité", "Export"],
      location: "Korhogo, Savanes",
      region: "Savanes",
      rating: 4.9,
      reviewCount: 186,
      certificationLevel: "gold" as const,
      organic: false,
      description:
        "Coopérative du nord : tri, séchage et traçabilité des noix de cajou vers les unités de transformation.",
    },
    {
      id: "2",
      name: "Union cacao Nawa",
      image: PHOTO_CACAO,
      specialties: ["Cacao", "Fermentation", "Qualité export"],
      location: "Soubré, Bas-Sassandra",
      region: "Bas-Sassandra",
      rating: 4.8,
      reviewCount: 241,
      certificationLevel: "gold" as const,
      organic: true,
      description:
        "Fèves de cacao du champ au séchage ; lots pilotes avec étiquettes NFC pour la filière locale.",
    },
    {
      id: "3",
      name: "Coopérative café du Tonkpi",
      image: PHOTO_CAFE,
      specialties: ["Café arabica", "Lavé", "Montagne"],
      location: "Man, Montagnes",
      region: "Montagnes",
      rating: 4.7,
      reviewCount: 132,
      certificationLevel: "silver" as const,
      organic: true,
      description:
        "Petits producteurs de l'Ouest : récolte sélective et traçabilité des lots pour le torréfacteur.",
    },
    {
      id: "4",
      name: "GIE maraîchers de Bingerville",
      image: PHOTO_LEGUMES,
      specialties: ["Légumes frais", "Circuit court", "Abidjan"],
      location: "Bingerville, Lagunes",
      region: "Lagunes",
      rating: 4.6,
      reviewCount: 94,
      certificationLevel: "silver" as const,
      organic: true,
      description:
        "Maraîchage périurbain pour les marchés d'Abidjan : tomates, aubergines, salades, dates de récolte suivies.",
    },
    {
      id: "5",
      name: "Coopérative vivrière du Gbêkê",
      specialties: ["Igname", "Manioc", "Plantain"],
      location: "Bouaké, Gbêkê",
      region: "Gbêkê",
      rating: 4.8,
      reviewCount: 203,
      certificationLevel: "gold" as const,
      organic: false,
      description:
        "Vivrier régional : tubercules et plantain, stockage ventilé et lots tracés vers les grossistes.",
    },
  ];

  // Filtrage et tri
  const filteredProducers = allProducers
    .filter(producer => {
      const matchesSearch = producer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           producer.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesRegion = selectedRegion === "all" || producer.region === selectedRegion;
      const matchesCertification = selectedCertification === "all" || producer.certificationLevel === selectedCertification;
      const matchesOrganic = !onlyOrganic || producer.organic;
      
      return matchesSearch && matchesRegion && matchesCertification && matchesOrganic;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "reviews":
          return b.reviewCount - a.reviewCount;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const regions = ["all", "Lagunes", "Bas-Sassandra", "Savanes", "Montagnes", "Gbêkê"];

  return (
    <div className="min-h-screen bg-background">
      
      {/* <header className="bg-gradient-organic border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Producteurs Certifiés
          </h1>
          <p className="text-muted-foreground text-lg">
            Découvrez tous nos producteurs agro-alimentaires certifiés par notre label intelligent
          </p>
          
        
          <div className="flex gap-6 mt-6">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-certified-gold" />
              <span className="text-sm text-muted-foreground">
                <strong className="text-foreground">{allProducers.length}</strong> producteurs certifiés
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-quality-green" />
              <span className="text-sm text-muted-foreground">
                <strong className="text-foreground">{allProducers.filter(p => p.organic).length}</strong> bio
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                <strong className="text-foreground">7</strong> régions
              </span>
            </div>
          </div>
        </div>
      </header>  */}

      
      {/*
      <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Search 
            <div className="relative flex-1 min-w-[250px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un producteur ou un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>

            {/* Region Filter *
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-[180px] bg-background">
                <SelectValue placeholder="Région" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region === "all" ? "Toutes les régions" : region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Certification Filter *
            <Select value={selectedCertification} onValueChange={setSelectedCertification}>
              <SelectTrigger className="w-[150px] bg-background">
                <SelectValue placeholder="Certification" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                <SelectItem value="gold">Gold</SelectItem>
                <SelectItem value="silver">Silver</SelectItem>
                <SelectItem value="bronze">Bronze</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort 
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px] bg-background">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Note</SelectItem>
                <SelectItem value="reviews">Avis</SelectItem>
                <SelectItem value="name">Nom</SelectItem>
              </SelectContent>
            </Select>

            {/* Organic Filter 
            <div className="flex items-center gap-2">
              <Checkbox 
                id="organic"
                checked={onlyOrganic}
                onCheckedChange={(checked) => setOnlyOrganic(checked as boolean)}
              />
              <label htmlFor="organic" className="text-sm font-medium cursor-pointer">
                Bio uniquement
              </label>
            </div>

            {/* Mobile Filter Button 
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                  <Filter className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filtres</SheetTitle>
                  <SheetDescription>
                    Affinez votre recherche de producteurs
                  </SheetDescription>
                </SheetHeader>
                {/* Mobile filters content 
              </SheetContent>
            </Sheet>
          </div>

          {/* Active filters 
          <div className="flex gap-2 mt-3">
            {selectedRegion !== "all" && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedRegion("all")}>
                {selectedRegion} ✕
              </Badge>
            )}
            {selectedCertification !== "all" && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedCertification("all")}>
                {selectedCertification} ✕
              </Badge>
            )}
            {onlyOrganic && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setOnlyOrganic(false)}>
                Bio uniquement ✕
              </Badge>
            )}
          </div>
        </div>
      </div>
       */}

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">
            {filteredProducers.length} producteur{filteredProducers.length > 1 ? 's' : ''} trouvé{filteredProducers.length > 1 ? 's' : ''}
          </p>
        </div> */}
               <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Nos Producteurs Phares
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Nos Producteurs Certifiés
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Derrière chaque produit, il y a un producteur engagé. Ces fiches illustrent le type d&apos;informations
            visibles dans le passeport numérique Naturalink (données de démonstration).
          </p>
        </div>


        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducers.map((producer) => (
            <ProducerCard key={producer.id} producer={producer} />
          ))}
        </div>

        {filteredProducers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Aucun producteur ne correspond à vos critères
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchQuery("");
                setSelectedRegion("all");
                setSelectedCertification("all");
                setOnlyOrganic(false);
              }}
            >
              Réinitialiser les filtres
            </Button>
            
          </div>
        )}
      </div>
    </div>
  );
};
export default ProducersList;