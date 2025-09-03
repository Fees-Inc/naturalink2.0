import { Badge } from "@/components/ui/badge";

export function TrustSection() {
  const partners = [
    "MINADER",
    "FIRCA", 
    "ANADER",
    "Conseil du Café-Cacao",
    "PETROCI",
    "SODECI"
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-foreground mb-8">
            Approuvé par plus de 20,000 partenaires
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center justify-center opacity-60">
            {partners.map((partner, index) => (
              <div key={index} className="text-center">
                <div className="h-12 flex items-center justify-center">
                  <span className="text-lg font-semibold text-muted-foreground">
                    {partner}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}