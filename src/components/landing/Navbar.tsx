import { Button } from "@/components/ui/button";
import { Leaf, Menu } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 nature-gradient rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">NaturaLink</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-foreground hover:text-primary transition-smooth">
              Accueil
            </a>
            <a href="#produit" className="text-foreground hover:text-primary transition-smooth">
              Produit
            </a>
            <a href="#blog" className="text-foreground hover:text-primary transition-smooth">
              Blog
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-smooth">
              Contact
            </a>
          </div>
          
          {/* CTA Button */}
          <div className="hidden md:block">
            <Button variant="hero" size="sm">
              Commencer
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-foreground hover:text-primary transition-smooth">
                Accueil
              </a>
              <a href="#produit" className="text-foreground hover:text-primary transition-smooth">
                Produit
              </a>
              <a href="#blog" className="text-foreground hover:text-primary transition-smooth">
                Blog
              </a>
              <a href="#contact" className="text-foreground hover:text-primary transition-smooth">
                Contact
              </a>
              <Button variant="hero" size="sm" className="w-full">
                Commencer
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}