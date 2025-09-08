import { useState } from "react";
import { Search, Filter, MapPin, Award, Leaf, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import ProducerCard from "@/components/ProducerCard";
import producer1Img from "@/assets/producer-1.jpg";
import producer2Img from "@/assets/producer-2.jpg";
import producer3Img from "@/assets/producer-3.jpg";
import producer4Img from "@/assets/producer-4.jpg";
import producer5Img from "@/assets/producer-5.jpg";

const ProducersList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedCertification, setSelectedCertification] = useState("all");
  const [onlyOrganic, setOnlyOrganic] = useState(false);
  const [sortBy, setSortBy] = useState("rating");

  // Mock data - en production, cela viendrait d'une API
  const allProducers = [
    {
      id: "1",
      name: "Ferme des Champs Dorés",
      image: producer1Img,
      specialties: ["Légumes Bio", "Fruits de Saison", "Œufs Fermiers"],
      location: "Saint-Émilion, Gironde",
      region: "Nouvelle-Aquitaine",
      rating: 4.8,
      reviewCount: 243,
      certificationLevel: "gold" as const,
      organic: true,
      description: "Producteur familial depuis 3 générations, spécialisé dans les produits biologiques de haute qualité."
    },
    {
      id: "2",
      name: "Les Vergers de Provence",
      image: producer2Img,
      specialties: ["Fruits", "Huile d'Olive", "Miel"],
      location: "Aix-en-Provence",
      region: "Provence-Alpes-Côte d'Azur",
      rating: 4.6,
      reviewCount: 189,
      certificationLevel: "silver" as const,
      organic: true,
      description: "Vergers traditionnels cultivés en agriculture raisonnée, produisant des fruits d'exception."
    },
    {
      id: "3",
      name: "Domaine du Petit Bois",
      image: producer3Img,
      specialties: ["Fromages", "Produits Laitiers", "Viande"],
      location: "Normandie",
      region: "Normandie",
      rating: 4.9,
      reviewCount: 412,
      certificationLevel: "gold" as const,
      organic: false,
      description: "Élevage responsable et production artisanale de produits laitiers d'excellence."
    },
    {
      id: "4",
      name: "Maraîchers du Soleil",
      image: producer4Img,
      specialties: ["Tomates Anciennes", "Légumes du Sud", "Aromates"],
      location: "Nice, Alpes-Maritimes",
      region: "Provence-Alpes-Côte d'Azur",
      rating: 4.7,
      reviewCount: 156,
      certificationLevel: "bronze" as const,
      organic: true,
      description: "Cultivation traditionnelle de variétés anciennes et rares de légumes méditerranéens."
    },
    {
      id: "5",
      name: "La Bergerie des Monts",
      image: producer5Img,
      specialties: ["Agneau", "Laine", "Charcuterie"],
      location: "Lozère",
      region: "Occitanie",
      rating: 4.5,
      reviewCount: 98,
      certificationLevel: "silver" as const,
      organic: false,
      description: "Élevage extensif en montagne, respectueux du bien-être animal et de l'environnement."
    },
    {
      id: "6",
      name: "Jardins de la Loire",
      image: producer1Img,
      specialties: ["Légumes Primeurs", "Asperges", "Fraises"],
      location: "Tours, Indre-et-Loire",
      region: "Centre-Val de Loire",
      rating: 4.4,
      reviewCount: 67,
      certificationLevel: "bronze" as const,
      organic: true,
      description: "Maraîchage traditionnel en bord de Loire, spécialisé dans les primeurs."
    },
    {
      id: "7",
      name: "Ferme du Bonheur",
      image: producer2Img,
      specialties: ["Volailles", "Œufs", "Légumes"],
      location: "Bretagne",
      region: "Bretagne",
      rating: 4.9,
      reviewCount: 320,
      certificationLevel: "gold" as const,
      organic: true,
      description: "Agriculture biologique et élevage en plein air dans le respect de la nature."
    },
    {
      id: "8",
      name: "Vignoble des Côteaux",
      image: producer3Img,
      specialties: ["Vin", "Raisin de Table", "Jus de Fruits"],
      location: "Bordeaux",
      region: "Nouvelle-Aquitaine",
      rating: 4.7,
      reviewCount: 178,
      certificationLevel: "silver" as const,
      organic: false,
      description: "Domaine viticole familial produisant des vins d'excellence."
    }
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

  const regions = ["all", "Nouvelle-Aquitaine", "Provence-Alpes-Côte d'Azur", "Normandie", "Occitanie", "Centre-Val de Loire", "Bretagne"];

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
           Derrière chaque produit, il y a un producteur engagé. Ensemble, nous avons déjà partagé la richesse agricole de notre terre avec des milliers de partenaires à travers le monde.
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