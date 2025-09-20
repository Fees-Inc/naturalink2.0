import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  HelpCircle, 
  Book, 
  MessageCircle, 
  Phone, 
  Mail,
  FileText,
  Video,
  Search,
  ExternalLink
} from "lucide-react";

export default function HelpPage() {
  const faqs = [
    {
      question: "Comment ajouter un nouveau producteur ?",
      answer: "Pour ajouter un nouveau producteur, allez dans la section 'Producteurs' et cliquez sur le bouton 'Nouveau producteur'. Remplissez le formulaire avec les informations requises et validez."
    },
    {
      question: "Comment générer un sticker NFC ?",
      answer: "Les stickers NFC sont générés automatiquement lors de la validation d'un produit. Vous pouvez aussi les générer manuellement depuis la page 'Produits' en sélectionnant un produit et cliquant sur 'Générer NFC'."
    },
    {
      question: "Comment suivre les transactions blockchain ?",
      answer: "Accédez à la page 'Blockchain' pour voir toutes les transactions en temps réel. Vous pouvez filtrer par date, producteur ou type de transaction."
    },
    {
      question: "Comment exporter les données ?",
      answer: "Dans les paramètres, onglet 'Données', cliquez sur 'Exporter les données'. Vous pouvez choisir le format (CSV, JSON) et la période."
    },
    {
      question: "Comment gérer les permissions utilisateurs ?",
      answer: "Dans la section 'Utilisateurs', sélectionnez un utilisateur et cliquez sur 'Gérer les permissions' pour définir ses accès."
    }
  ];

  const resources = [
    {
      title: "Guide de démarrage",
      description: "Apprenez les bases de NaturaLink",
      icon: Book,
      link: "#"
    },
    {
      title: "Documentation API",
      description: "Intégrez NaturaLink à vos systèmes",
      icon: FileText,
      link: "#"
    },
    {
      title: "Tutoriels vidéo",
      description: "Formations visuelles étape par étape",
      icon: Video,
      link: "#"
    }
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-8 space-y-6 max-w-6xl mx-auto">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Centre d'aide</h1>
          <p className="text-muted-foreground mt-1">
            Trouvez des réponses et obtenez de l'assistance
          </p>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Rechercher dans l'aide..." 
                className="pl-10 h-12"
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[hsl(var(--nature-primary))]/10">
                      <Icon className="h-5 w-5 text-[hsl(var(--nature-primary))]" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{resource.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {resource.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="w-full justify-between" asChild>
                    <a href={resource.link}>
                      Consulter
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle>Questions fréquentes</CardTitle>
            <CardDescription>
              Trouvez rapidement des réponses aux questions courantes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card>
          <CardHeader>
            <CardTitle>Besoin d'aide supplémentaire ?</CardTitle>
            <CardDescription>
              Notre équipe de support est là pour vous aider
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="justify-start">
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat en direct
              </Button>
              <Button variant="outline" className="justify-start">
                <Mail className="h-4 w-4 mr-2" />
                support@naturalink.com
              </Button>
              <Button variant="outline" className="justify-start">
                <Phone className="h-4 w-4 mr-2" />
                +221 33 123 45 67
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}