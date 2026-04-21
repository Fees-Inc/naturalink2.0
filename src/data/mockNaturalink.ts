import type { ProductDTO } from '@/services/api.types';
import type { DashboardStatsDTO } from '@/services/api.types';

/** Données de démonstration — Côte d'Ivoire (pas de partenaires commerciaux réels impliqués) */
export type DemoProduct = ProductDTO & {
  category: string;
  lot_number?: string;
  producer_name?: string;
  cooperative_name?: string;
  trust_score?: number;
  blockchain_tx?: string;
};

const iso = (d: string) => new Date(d).toISOString();

export const MOCK_DASHBOARD_STATS: DashboardStatsDTO = {
  total_producers: 48,
  total_products: 126,
  total_distributors: 6,
  total_revenue: 12_450_000,
  active_transactions: 312,
  verified_producers: 32,
  month_over_month_growth: 18,
};

export const MOCK_PRODUCTS: DemoProduct[] = [
  {
    id: 'ci-cacao-soubre-01',
    producer_id: 'prod-coop-sud',
    name: 'Cacao fin — Coopérative de Soubré',
    description:
      'Fèves de cacao Forastero/Trinitario, fermentation 6 jours, séchage solaire. Lot pilote avec passeport numérique VeChain.',
    origin_location: 'Soubré, Nawa, Côte d\'Ivoire',
    status: 'active',
    price: 1850,
    quantity: 2400,
    unit: 'kg',
    harvest_date: '2025-11-02',
    certifications: ['Rainforest Alliance (cible)', 'Naturalink pilote'],
    sustainability_info: 'Agroforesterie, shade-grown, réduction pesticides',
    photo_url:
      'https://images.unsplash.com/photo-1614350296597-20e04c87821d?auto=format&fit=crop&w=900&q=80',
    nfc_tag_id: 'NFC-CI-CAC-2025-SBR-88421',
    created_at: iso('2025-11-10'),
    updated_at: iso('2026-01-05'),
    category: 'Café/Cacao',
    lot_number: 'NL-CI-2025-CAC-0892',
    producer_name: 'Amoin Adélaïde',
    cooperative_name: 'COOP-CAJOU & CACAO du Sud-Bandama',
    trust_score: 94,
    blockchain_tx: '0x9f2a…c4e1 (démo)',
  },
  {
    id: 'ci-cafe-tonkpi-02',
    producer_id: 'prod-montagnes-ouest',
    name: 'Café arabica — Montagnes du Tonkpi',
    description:
      'Café lavé, altitude 950–1200 m. Torréfaction locale partenaire (démo). Notes chocolat et agrumes.',
    origin_location: 'Man, Tonkpi, Côte d\'Ivoire',
    status: 'active',
    price: 3200,
    quantity: 800,
    unit: 'kg',
    harvest_date: '2025-10-18',
    certifications: ['Naturalink pilote'],
    sustainability_info: 'Cueillette sélective, paillage',
    photo_url:
      'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=900&q=80',
    nfc_tag_id: 'NFC-CI-CAF-2025-MAN-10293',
    created_at: iso('2025-10-25'),
    updated_at: iso('2026-01-02'),
    category: 'Café/Cacao',
    lot_number: 'NL-CI-2025-CAF-0310',
    producer_name: 'Yao Konan',
    cooperative_name: 'Union des caféiculteurs du Tonkpi',
    trust_score: 91,
    blockchain_tx: '0x3b71…91af (démo)',
  },
  {
    id: 'ci-cajou-korhogo-03',
    producer_id: 'prod-poro',
    name: 'Noix de cajou brute — Korhogo',
    description:
      'Noix décortiquées, séchage contrôlé 10–12 % humidité. Préparation export (démonstration).',
    origin_location: 'Korhogo, Poro, Côte d\'Ivoire',
    status: 'active',
    price: 980,
    quantity: 5000,
    unit: 'kg',
    harvest_date: '2025-09-05',
    certifications: ['Naturalink pilote'],
    sustainability_info: 'Tri manuel, traçabilité lot par lot',
    nfc_tag_id: 'NFC-CI-CAJ-2025-KOR-55102',
    created_at: iso('2025-09-20'),
    updated_at: iso('2025-12-15'),
    category: 'Épices',
    lot_number: 'NL-CI-2025-CAJ-2201',
    producer_name: 'Ouattara Salifou',
    cooperative_name: 'COOP-CAJOU Poro',
    trust_score: 88,
    blockchain_tx: '0x7de0…22bc (démo)',
  },
  {
    id: 'ci-banane-bonoua-04',
    producer_id: 'prod-sud-comoe',
    name: 'Banane plantain — Bonoua',
    description:
      'Plantain AAA, conditionnement sous filets. Chaîne du champ au conditionneur (données démo).',
    origin_location: 'Bonoua, Sud-Comoé, Côte d\'Ivoire',
    status: 'active',
    price: 350,
    quantity: 12000,
    unit: 'kg',
    harvest_date: '2026-01-08',
    certifications: ['Naturalink pilote'],
    sustainability_info: 'Maturité contrôlée, moins de pertes',
    photo_url:
      'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=900&q=80',
    nfc_tag_id: 'NFC-CI-BAN-2026-BON-7781',
    created_at: iso('2026-01-09'),
    updated_at: iso('2026-01-10'),
    category: 'Fruits',
    lot_number: 'NL-CI-2026-BAN-0044',
    producer_name: 'Aya Traoré',
    cooperative_name: 'GIE Plantain Sud-Comoé',
    trust_score: 90,
    blockchain_tx: '0x1aa4…90de (démo)',
  },
  {
    id: 'ci-attieke-abidjan-05',
    producer_id: 'prod-lagunes',
    name: 'Attiéké frais — Lagunes (Abidjan)',
    description:
      'Manioc fermenté, grain moyen. Lot traçable pour circuit court grande surface (scénario démo).',
    origin_location: 'Anyama, Lagunes, Côte d\'Ivoire',
    status: 'active',
    price: 450,
    quantity: 3000,
    unit: 'kg',
    harvest_date: '2026-01-12',
    certifications: ['Naturalink pilote'],
    sustainability_info: 'Circuit court, hygiène HACCP (cible)',
    photo_url:
      'https://images.unsplash.com/photo-1546549032-9571cd6ef27b?auto=format&fit=crop&w=900&q=80',
    nfc_tag_id: 'NFC-CI-ATT-2026-ABJ-33009',
    created_at: iso('2026-01-13'),
    updated_at: iso('2026-01-14'),
    category: 'Céréales',
    lot_number: 'NL-CI-2026-ATT-1200',
    producer_name: 'Kouadio Jean-Baptiste',
    cooperative_name: 'Unité de transformation Les Lagunes',
    trust_score: 87,
    blockchain_tx: '0x55ff…01aa (démo)',
  },
  {
    id: 'ci-igname-bouake-06',
    producer_id: 'prod-gbek',
    name: 'Igname douce — Gbêkê (Bouaké)',
    description:
      'Igname Dioscorea alata, stockage ventilé. Suivi récolte et expédition vers transformation (démo).',
    origin_location: 'Bouaké, Gbêkê, Côte d\'Ivoire',
    status: 'active',
    price: 280,
    quantity: 8500,
    unit: 'kg',
    harvest_date: '2025-12-01',
    certifications: ['Naturalink pilote'],
    sustainability_info: 'Vivrier local, rotation culturale',
    photo_url:
      'https://images.unsplash.com/photo-1590165482129-1a75a011d43a?auto=format&fit=crop&w=900&q=80',
    nfc_tag_id: 'NFC-CI-IGN-2025-BKE-66120',
    created_at: iso('2025-12-08'),
    updated_at: iso('2026-01-01'),
    category: 'Légumes',
    lot_number: 'NL-CI-2025-IGN-5502',
    producer_name: 'Brou Kouassi',
    cooperative_name: 'Coopérative Vivrière du Gbêkê',
    trust_score: 89,
    blockchain_tx: '0xc812…77fe (démo)',
  },
];

export type TraceEvent = {
  id: string;
  title: string;
  description?: string;
  event_type: string;
  event_date: string;
  location?: string;
};

const trace = (events: TraceEvent[]) => ({ activity_logs: events });

export const MOCK_TRACEABILITY: Record<string, { activity_logs: TraceEvent[] }> = {
  'ci-cacao-soubre-01': trace([
    {
      id: '1',
      title: 'Récolte & fermentation',
      description: 'Récolte manuelle, fermentation en caisses bois 6 jours, retournements quotidiens.',
      event_type: 'harvest',
      event_date: '2025-11-02',
      location: 'Soubré, zone Nawa',
    },
    {
      id: '2',
      title: 'Séchage solaire',
      description: 'Séchage sur aires claires, humidité cible 7 %.',
      event_type: 'processing',
      event_date: '2025-11-08',
      location: 'Soubré',
    },
    {
      id: '3',
      title: 'Contrôle qualité & ensachage',
      description: 'Tri granulométrique, détection défauts, ensachage 65 kg.',
      event_type: 'processing',
      event_date: '2025-11-14',
      location: 'Soubré — site coopératif',
    },
    {
      id: '4',
      title: 'Ancrage blockchain (VeChain)',
      description: 'Empreinte du lot enregistrée sur la chaîne (identifiant démo).',
      event_type: 'other',
      event_date: '2025-11-15',
      location: 'Abidjan — nœud démo',
    },
  ]),
  'ci-cafe-tonkpi-02': trace([
    {
      id: '1',
      title: 'Récolte cherries',
      event_type: 'harvest',
      event_date: '2025-10-18',
      location: 'Man, villages Tonkpi',
    },
    {
      id: '2',
      title: 'Lavage & séchage',
      description: 'Canaux de lavage, séchage sur tables ventilées.',
      event_type: 'processing',
      event_date: '2025-10-22',
      location: 'Station de Man',
    },
    {
      id: '3',
      title: 'Export vers torréfacteur (démo)',
      event_type: 'transport',
      event_date: '2025-11-01',
      location: 'Abidjan — entrepôt',
    },
  ]),
  'ci-cajou-korhogo-03': trace([
    {
      id: '1',
      title: 'Récolte & séchage noix',
      event_type: 'harvest',
      event_date: '2025-09-05',
      location: 'Korhogo',
    },
    {
      id: '2',
      title: 'Décorticage & calibrage',
      event_type: 'processing',
      event_date: '2025-09-18',
      location: 'Unité Korhogo',
    },
  ]),
  'ci-banane-bonoua-04': trace([
    {
      id: '1',
      title: 'Récolte à maturité verte',
      event_type: 'harvest',
      event_date: '2026-01-08',
      location: 'Bonoua',
    },
    {
      id: '2',
      title: 'Conditionnement NFC',
      description: 'Pose étiquette inviolable sur colis (démo).',
      event_type: 'processing',
      event_date: '2026-01-09',
      location: 'Bonoua — packhouse',
    },
  ]),
  'ci-attieke-abidjan-05': trace([
    {
      id: '1',
      title: 'Récolte manioc',
      event_type: 'harvest',
      event_date: '2026-01-10',
      location: 'Anyama',
    },
    {
      id: '2',
      title: 'Fermentation & granulation',
      event_type: 'processing',
      event_date: '2026-01-11',
      location: 'Anyama — atelier',
    },
    {
      id: '3',
      title: 'Livraison circuit court',
      event_type: 'transport',
      event_date: '2026-01-12',
      location: 'Abidjan — Plateau (démo)',
    },
  ]),
  'ci-igname-bouake-06': trace([
    {
      id: '1',
      title: 'Récolte igname',
      event_type: 'harvest',
      event_date: '2025-12-01',
      location: 'Bouaké, villages périphériques',
    },
    {
      id: '2',
      title: 'Tri & stockage',
      event_type: 'processing',
      event_date: '2025-12-04',
      location: 'Bouaké',
    },
  ]),
};

export function getMockProductById(id: string): DemoProduct | undefined {
  return MOCK_PRODUCTS.find((p) => p.id === id);
}

export function getMockTraceability(id: string) {
  return MOCK_TRACEABILITY[id] ?? trace([
    {
      id: '1',
      title: 'Données de traçabilité (démo)',
      description: 'Parcours exemple — connectez le backend pour les données réelles.',
      event_type: 'other',
      event_date: new Date().toISOString().slice(0, 10),
      location: 'Côte d\'Ivoire',
    },
  ]);
}
