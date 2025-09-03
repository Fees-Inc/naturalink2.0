import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter signup logic here
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient"></div>
      
      {/* Overlay pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-primary-foreground mb-4">
          Restez informé de nos dernières actualités
        </h2>
        
        <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
          Soyez les premiers à connaître les nouveautés de NaturaLink et les 
          dernières innovations de la traçabilité agricole.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <Input
            type="email"
            placeholder="Votre adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 bg-primary-foreground border-primary-foreground/20 text-foreground placeholder:text-muted-foreground"
          />
          <Button type="submit" variant="accent" size="lg" className="sm:w-auto">
            S'abonner
          </Button>
        </form>
        
        <p className="text-sm text-primary-foreground/70 mt-4">
          Nous respectons votre vie privée. Désabonnement possible à tout moment.
        </p>
        
        {/* Social proof */}
        <div className="flex justify-center items-center gap-6 mt-8 text-primary-foreground/60">
          <div className="w-4 h-4 rounded-full bg-accent opacity-80"></div>
          <div className="w-4 h-4 rounded-full bg-primary-foreground opacity-60"></div>
          <div className="w-4 h-4 rounded-full bg-accent opacity-80"></div>
        </div>
      </div>
    </section>
  );
}