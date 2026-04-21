import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Leaf, Menu, User, LogOut, Settings } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to="/">
              <img src="/Logo-Naturalink.png" alt="Logo" className="w-50 h-16" />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-smooth">
              Accueil
            </Link>
            <Link to="/products" className="text-foreground hover:text-primary transition-smooth">
              Produits
            </Link>
            <Link to="/blog" className="text-foreground hover:text-primary transition-smooth">
              Blog
            </Link>
            <Link
              to={{ pathname: "/", hash: "reconnaissance" }}
              className="text-foreground hover:text-primary transition-smooth"
            >
              Parcours
            </Link>
            <Link
              to={{ pathname: "/", hash: "contact" }}
              className="text-foreground hover:text-primary transition-smooth"
            >
              Contact
            </Link>
          </div>
          
          {/* Auth/Profile Section */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={profile?.avatar_url} />
                    <AvatarFallback>
                      {profile?.first_name?.[0]}{profile?.last_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate(`/${profile?.role}`)}>
                    <User className="mr-2 h-4 w-4" />
                    Mon espace
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Paramètres
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" size="sm" className="border-primary/30" asChild>
                <Link to="/admin/naturalink">Démo dashboard</Link>
              </Button>
            )}
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
              <Link to="/" className="text-foreground hover:text-primary transition-smooth">
                Accueil
              </Link>
              <Link to="/products" className="text-foreground hover:text-primary transition-smooth">
                Produits
              </Link>
              <Link to="/blog" className="text-foreground hover:text-primary transition-smooth">
                Blog
              </Link>
              <Link
                to={{ pathname: "/", hash: "reconnaissance" }}
                className="text-foreground hover:text-primary transition-smooth"
                onClick={() => setIsOpen(false)}
              >
                Parcours
              </Link>
              <Link
                to={{ pathname: "/", hash: "contact" }}
                className="text-foreground hover:text-primary transition-smooth"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              {user ? (
                <>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => navigate(`/${profile?.role}`)}>
                    Mon espace
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full" onClick={signOut}>
                    Déconnexion
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/auth')}>
                    Connexion
                  </Button>
                  <Button variant="hero" size="sm" className="w-full" onClick={() => navigate('/auth')}>
                    S'inscrire
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}