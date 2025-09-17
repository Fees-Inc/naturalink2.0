import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Shield, Leaf } from "lucide-react";
import { RoleSelectionDialog } from "@/components/RoleSelectionDialog";
import { useState } from "react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-agriculture.jpg";

export function HeroSection() {
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 hero-gradient opacity-95"></div>
      
      {/* Hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge variant="secondary" className="mb-6 inline-flex items-center gap-2 text-sm px-4 py-2">
                <Star className="w-4 h-4 text-accent" fill="currentColor" />
                1er Label Intelligent Made in Côte d'Ivoire
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Nous Sommes
              <motion.span 
                className="block accent-gradient bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                NaturaLink
              </motion.span>
              Agriculture
            </motion.h1>
            
            <motion.p 
              className="text-xl text-primary-foreground/90 mb-8 max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              La traçabilité complète de vos produits agri-alimentaires grâce aux puces NFC et la blockchain VeChain.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <Button 
                variant="accent" 
                size="lg" 
                className="text-lg"
                onClick={() => setShowRoleDialog(true)}
              >
                Commencer
              </Button>
              <Button variant="outline" size="lg" className="text-lg border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Voir la démonstration
              </Button>
            </motion.div>
            
            {/* Trust indicators */}
            <motion.div 
              className="flex items-center gap-4 justify-center lg:justify-start text-primary-foreground/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <motion.div 
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.4 }}
              >
                <Shield className="w-5 h-5" />
                <span className="text-sm">Blockchain sécurisée</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.6 }}
              >
                <MapPin className="w-5 h-5" />
                <span className="text-sm">Made in CI</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.8 }}
              >
                <Leaf className="w-5 h-5" />
                <span className="text-sm">100% traçable</span>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Right content - Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-large">
              <img 
                src={heroImage} 
                alt="Agriculture durable et traçabilité"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute top-6 right-6">
                <Badge variant="default" className="bg-accent text-foreground font-bold text-lg px-4 py-2">
                  #1
                  <span className="block text-xs font-normal">Traçabilité CI</span>
                </Badge>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -bottom-4 -left-4 bg-primary-foreground rounded-2xl p-4 shadow-medium">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-primary rounded-full border-2 border-primary-foreground"></div>
                  <div className="w-8 h-8 bg-accent rounded-full border-2 border-primary-foreground"></div>
                  <div className="w-8 h-8 bg-secondary rounded-full border-2 border-primary-foreground"></div>
                </div>
                <div className="text-sm">
                  <span className="text-primary font-semibold">Notre communauté</span>
                  <p className="text-muted-foreground">vous attend</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RoleSelectionDialog 
        open={showRoleDialog} 
        onOpenChange={setShowRoleDialog} 
      />
    </section>
  );
}