import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, MapPin, Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-agriculture.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 hero-gradient opacity-[0.97]" />
      <div
        className="pointer-events-none absolute -bottom-32 left-1/2 h-64 w-[120%] -translate-x-1/2 rounded-[100%] bg-orange-500/25 blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-left">
            <Badge
              variant="outline"
              className="mb-6 inline-flex items-center gap-3 rounded-2xl border-primary-foreground/40 bg-white/5 py-2 pl-3 pr-4 text-sm font-medium text-primary-foreground shadow-none backdrop-blur transition-colors hover:bg-white/15 hover:text-primary-foreground"
            >
              <span className="hidden sm:inline text-left leading-snug border-l border-primary-foreground/25 pl-3">
                Le label intelligent — Made in Côte d&apos;Ivoire
              </span>
            </Badge>

            <p className="font-serif text-lg sm:text-xl text-primary-foreground/90 mb-3 max-w-xl mx-auto lg:mx-0 italic">
              Du champ à votre panier, chaque produit a une histoire.
            </p>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-primary-foreground leading-[1.1]">
              Traçabilité
              <span className="block text-orange-200">agroalimentaire</span>
              <span className="block text-3xl sm:text-4xl md:text-5xl mt-2 font-normal text-primary-foreground/95">
                NFC + blockchain VeChain
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-primary-foreground/85 mx-auto lg:mx-0">
              Passeport numérique infalsifiable pour les filières ivoiriennes : cacao, café, cajou, vivrier…
              Une interface simple pour producteurs, transformateurs, distributeurs et consommateurs.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-orange-500 text-white hover:bg-orange-600 shadow-lg border-0"
              >
                <Link to="/products">Découvrir les produits démo</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-primary-foreground/40 text-primary-foreground bg-white/5 hover:bg-white/15 backdrop-blur"
              >
                <Link to="/admin/naturalink">Tableau de bord (démo)</Link>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 justify-center lg:justify-start text-sm text-primary-foreground/85">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 shrink-0 text-orange-200" />
                <span>Données ancrées (démo)</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="h-5 w-5 shrink-0 text-orange-200" />
                <span>VeChain</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 shrink-0 text-orange-200" />
                <span>Abidjan, Yamoussoukro, Korhogo…</span>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="relative overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-black/10">
              <img
                src={heroImage}
                alt="Agriculture en Côte d'Ivoire"
                className="h-[min(520px,70vh)] w-full object-cover sm:h-[500px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/90 p-4 text-left shadow-lg backdrop-blur dark:bg-zinc-900/90">
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src="/Logo-Naturalink.png"
                    alt=""
                    className="h-9 w-auto object-contain"
                    width={120}
                    height={36}
                  />
                  <p className="text-xs font-semibold uppercase tracking-wide text-orange-700 dark:text-orange-300">
                    Scénario consommateur
                  </p>
                </div>
                <p className="mt-1 text-sm text-foreground">
                  Scannez l&apos;étiquette NFC au supermarché : origine, lot, étapes — immédiatement sur votre téléphone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
