import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const footerLinks = {
    product: [
      { label: "Fonctionnalités", href: "#" },
      { label: "Tarifs", href: "#pricing" },
      { label: "API", href: "#" },
      { label: "Documentation", href: "#" }
    ],
    company: [
      { label: "À propos", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Carrières", href: "#" },
      { label: "Partenaires", href: "#" }
    ],
    support: [
      { label: "Centre d'aide", href: "#" },
      { label: "Contact", href: "#contact" },
      { label: "Status", href: "#" },
      { label: "Formation", href: "#" }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" }
  ];

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16 grid lg:grid-cols-5 gap-8">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 nature-gradient rounded-xl flex items-center justify-center">
                <Leaf className="w-7 h-7 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold">NaturaLink</span>
            </div>
            
            <p className="text-primary-foreground/80 mb-6 max-w-md">
              La première solution de traçabilité intelligente Made in Côte d'Ivoire 
              pour l'agriculture durable et transparente.
            </p>
            
            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <Mail className="w-4 h-4" />
                <span>contact@naturalink.ci</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <Phone className="w-4 h-4" />
                <span>+225 01 23 45 67 89</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <MapPin className="w-4 h-4" />
                <span>Abidjan, Côte d'Ivoire</span>
              </div>
            </div>
          </div>
          
          {/* Links sections */}
          <div>
            <h3 className="font-semibold mb-4">Produit</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Entreprise</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="py-8 border-t border-primary-foreground/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-primary-foreground/60">
            © 2024 NaturaLink. Tous droits réservés. Made in Côte d'Ivoire 🇨🇮
          </div>
          
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="hover:bg-primary-foreground/10"
                >
                  <a href={social.href} aria-label={social.label}>
                    <IconComponent className="w-4 h-4" />
                  </a>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}