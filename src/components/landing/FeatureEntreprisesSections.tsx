import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PartnersSection from "@/pages/PartnersSection";

export function FeatureEntreprisesSections() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-1">
            <Badge variant="outline" className="mb-4">
                Nos Entreprises Partenaires
            </Badge>

        </div>
        <PartnersSection />
    </div>
    </section>
  );
}

        


