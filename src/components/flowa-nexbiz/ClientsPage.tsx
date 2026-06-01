'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Plus,
  Filter,
  Phone,
  Mail,
  MapPin,
  MoreHorizontal,
  ChevronRight,
  X,
  TrendingUp,
  FileText,
  Receipt,
  CreditCard,
  MessageSquare,
  Calendar,
  Users,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Building2,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useNavStore } from '@/lib/nav-store';

/* ═══════════════════════ BRAND COLORS ═══════════════════════════════ */

const FLOWA = '#FF6600';
const NEXBIZ = '#0EA5E9';

/* ═══════════════════════ ANIMATION CONFIG ════════════════════════════ */

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, x: 40, transition: { duration: 0.25 } },
};

/* ═══════════════════════ TYPES ══════════════════════════════════════ */

type ClientStatus = 'Actif' | 'Prospect' | 'Inactif';

interface Client {
  id: number;
  nom: string;
  prenom: string;
  entreprise: string;
  secteur: string;
  statut: ClientStatus;
  caTotal: number;
  creances: number;
  canalPrefere: string;
  dernierContact: string;
  telephone: string;
  email: string;
  localisation: string;
  creditScore: number;
  paiementsRecus: number;
  caGenere: number;
  devisEnvoyes: number;
  tauxConversion: number;
  transactions: TransactionItem[];
  interactions: InteractionItem[];
}

interface TransactionItem {
  date: string;
  description: string;
  montant: number;
  type: 'Reçu' | 'Envoyé';
}

interface InteractionItem {
  date: string;
  type: string;
  description: string;
}

/* ═══════════════════════ MOCK DATA ═══════════════════════════════════ */

const clients: Client[] = [
  {
    id: 1,
    nom: 'Diallo',
    prenom: 'Amadou',
    entreprise: 'Restaurant Le Baobab',
    secteur: 'Restauration',
    statut: 'Actif',
    caTotal: 2400000,
    creances: 150000,
    canalPrefere: 'WhatsApp',
    dernierContact: '02 Mars 2026',
    telephone: '+225 07 12 34 56',
    email: 'a.diallo@baobab.ci',
    localisation: 'Cocody, Abidjan',
    creditScore: 72,
    paiementsRecus: 450000,
    caGenere: 2400000,
    devisEnvoyes: 3,
    tauxConversion: 67,
    transactions: [
      { date: '01/03/2026', description: 'Paiement fournisseur', montant: 85000, type: 'Envoyé' },
      { date: '25/02/2026', description: 'Vente repas entreprise', montant: 120000, type: 'Reçu' },
      { date: '18/02/2026', description: 'Achat ingrédients', montant: 65000, type: 'Envoyé' },
      { date: '10/02/2026', description: 'Paiement traiteur événement', montant: 200000, type: 'Reçu' },
      { date: '01/02/2026', description: 'Loyer commercial', montant: 150000, type: 'Envoyé' },
    ],
    interactions: [
      { date: '02/03/2026', type: 'Appel', description: 'Demande devis événement 50 pers.' },
      { date: '28/02/2026', type: 'Email', description: 'Envoi catalogue menus spéciaux' },
      { date: '20/02/2026', type: 'SMS', description: 'Confirmation réservation salon privé' },
      { date: '14/02/2026', type: 'Visite', description: 'Présentation offre fidélité' },
      { date: '05/02/2026', type: 'WhatsApp', description: 'Relance facture J+10' },
    ],
  },
  {
    id: 2,
    nom: 'Koné',
    prenom: 'Mariam',
    entreprise: 'Commerce K-Market',
    secteur: 'Commerce',
    statut: 'Actif',
    caTotal: 3800000,
    creances: 280000,
    canalPrefere: 'Orange Money',
    dernierContact: '28 Fév 2026',
    telephone: '+225 05 98 76 54',
    email: 'mkone@kmarket.ci',
    localisation: 'Plateau, Abidjan',
    creditScore: 85,
    paiementsRecus: 720000,
    caGenere: 3800000,
    devisEnvoyes: 5,
    tauxConversion: 80,
    transactions: [
      { date: '28/02/2026', description: 'Paiement stock merchandise', montant: 350000, type: 'Envoyé' },
      { date: '22/02/2026', description: 'Vente gros lot entreprise', montant: 280000, type: 'Reçu' },
      { date: '15/02/2026', description: 'Transfert Orange Money', montant: 150000, type: 'Reçu' },
      { date: '08/02/2026', description: 'Réapprovisionnement', montant: 200000, type: 'Envoyé' },
      { date: '01/02/2026', description: 'Paiement client corporate', montant: 420000, type: 'Reçu' },
    ],
    interactions: [
      { date: '28/02/2026', type: 'Orange Money', description: 'Paiement automatique reçu' },
      { date: '25/02/2026', type: 'Appel', description: 'Négociation tarif gros volume' },
      { date: '18/02/2026', type: 'Email', description: 'Proposition partenariat distribution' },
      { date: '10/02/2026', type: 'Visite', description: 'Audit besoins saisonnier' },
      { date: '02/02/2026', type: 'WhatsApp', description: 'Envoi promo flash fin de stock' },
    ],
  },
  {
    id: 3,
    nom: 'Touré',
    prenom: 'Ibrahim',
    entreprise: 'Transport Express IT',
    secteur: 'Transport',
    statut: 'Actif',
    caTotal: 1900000,
    creances: 320000,
    canalPrefere: 'Appel',
    dernierContact: '01 Mars 2026',
    telephone: '+225 01 23 45 67',
    email: 'i.toure@expressit.ci',
    localisation: 'Marcory, Abidjan',
    creditScore: 58,
    paiementsRecus: 310000,
    caGenere: 1900000,
    devisEnvoyes: 2,
    tauxConversion: 50,
    transactions: [
      { date: '01/03/2026', description: 'Paiement carburant', montant: 120000, type: 'Envoyé' },
      { date: '24/02/2026', description: 'Facture livraison client', montant: 95000, type: 'Reçu' },
      { date: '17/02/2026', description: 'Réparation véhicule', montant: 80000, type: 'Envoyé' },
      { date: '10/02/2026', description: 'Contrat logistique mensuel', montant: 250000, type: 'Reçu' },
      { date: '02/02/2026', description: 'Assurance flotte', montant: 60000, type: 'Envoyé' },
    ],
    interactions: [
      { date: '01/03/2026', type: 'Appel', description: 'Relance facture impayée J+30' },
      { date: '22/02/2026', type: 'SMS', description: 'Rappel échéance paiement' },
      { date: '15/02/2026', type: 'Appel', description: 'Négociation contrat annuel' },
      { date: '08/02/2026', type: 'Email', description: 'Envoi contrat renouvellement' },
      { date: '01/02/2026', type: 'Visite', description: 'Inspection flotte véhicules' },
    ],
  },
  {
    id: 4,
    nom: 'Bamba',
    prenom: 'Awa',
    entreprise: 'Salon Beauté Éclat',
    secteur: 'Beauté',
    statut: 'Prospect',
    caTotal: 850000,
    creances: 0,
    canalPrefere: 'WhatsApp',
    dernierContact: '25 Fév 2026',
    telephone: '+225 07 55 44 33',
    email: 'awa.bamba@eclat.ci',
    localisation: 'Yopougon, Abidjan',
    creditScore: 45,
    paiementsRecus: 0,
    caGenere: 850000,
    devisEnvoyes: 1,
    tauxConversion: 0,
    transactions: [
      { date: '25/02/2026', description: 'Devis initial produits', montant: 120000, type: 'Envoyé' },
    ],
    interactions: [
      { date: '25/02/2026', type: 'WhatsApp', description: 'Premier contact, présentation offre' },
      { date: '20/02/2026', type: 'Appel', description: 'Prise de contact via recommandation' },
    ],
  },
  {
    id: 5,
    nom: 'Ouattara',
    prenom: 'Moussa',
    entreprise: 'Boulangerie Pain d\'Or',
    secteur: 'Boulangerie',
    statut: 'Actif',
    caTotal: 1600000,
    creances: 95000,
    canalPrefere: 'Orange Money',
    dernierContact: '03 Mars 2026',
    telephone: '+225 05 11 22 33',
    email: 'm.ouattara@paindor.ci',
    localisation: 'Adjamé, Abidjan',
    creditScore: 78,
    paiementsRecus: 380000,
    caGenere: 1600000,
    devisEnvoyes: 4,
    tauxConversion: 75,
    transactions: [
      { date: '03/03/2026', description: 'Paiement farine fournisseur', montant: 175000, type: 'Envoyé' },
      { date: '27/02/2026', description: 'Vente gros commandes hôtels', montant: 200000, type: 'Reçu' },
      { date: '20/02/2026', description: 'Achat équipements pâtisserie', montant: 95000, type: 'Envoyé' },
      { date: '12/02/2026', description: 'Paiement client hôtel', montant: 180000, type: 'Reçu' },
      { date: '05/02/2026', description: 'Loyer + charges', montant: 110000, type: 'Envoyé' },
    ],
    interactions: [
      { date: '03/03/2026', type: 'Orange Money', description: 'Paiement automatique fournisseur' },
      { date: '26/02/2026', type: 'Visite', description: 'Dégustation nouveaux produits' },
      { date: '19/02/2026', type: 'Email', description: 'Proposition offre festive Ramadan' },
      { date: '12/02/2026', type: 'Appel', description: 'Suivi commande spéciale' },
      { date: '04/02/2026', type: 'WhatsApp', description: 'Confirmation commande weekend' },
    ],
  },
  {
    id: 6,
    nom: 'Diabaté',
    prenom: 'Fatou',
    entreprise: 'Mode & Style Boutique',
    secteur: 'Mode',
    statut: 'Inactif',
    caTotal: 520000,
    creances: 45000,
    canalPrefere: 'SMS',
    dernierContact: '15 Jan 2026',
    telephone: '+225 01 77 88 99',
    email: 'f.diabate@mode.ci',
    localisation: 'Treichville, Abidjan',
    creditScore: 35,
    paiementsRecus: 95000,
    caGenere: 520000,
    devisEnvoyes: 1,
    tauxConversion: 20,
    transactions: [
      { date: '15/01/2026', description: 'Dernière vente enregistrée', montant: 45000, type: 'Reçu' },
      { date: '02/01/2026', description: 'Paiement stock fin d\'année', montant: 80000, type: 'Envoyé' },
    ],
    interactions: [
      { date: '15/01/2026', type: 'SMS', description: 'Relance sans réponse' },
      { date: '02/01/2026', type: 'Appel', description: 'Vœux nouvelle année' },
    ],
  },
  {
    id: 7,
    nom: 'Coulibaly',
    prenom: 'Seydou',
    entreprise: 'Cyber & Print Services',
    secteur: 'Services',
    statut: 'Actif',
    caTotal: 1100000,
    creances: 120000,
    canalPrefere: 'Email',
    dernierContact: '02 Mars 2026',
    telephone: '+225 07 66 55 44',
    email: 's.coulibaly@cyberprint.ci',
    localisation: 'Cocody, Abidjan',
    creditScore: 68,
    paiementsRecus: 260000,
    caGenere: 1100000,
    devisEnvoyes: 3,
    tauxConversion: 60,
    transactions: [
      { date: '02/03/2026', description: 'Contrat impression mensuel', montant: 85000, type: 'Reçu' },
      { date: '25/02/2026', description: 'Achat cartouches & papier', montant: 45000, type: 'Envoyé' },
      { date: '18/02/2026', description: 'Facture design logo client', montant: 60000, type: 'Reçu' },
      { date: '10/02/2026', description: 'Maintenance imprimantes', montant: 30000, type: 'Envoyé' },
      { date: '02/02/2026', description: 'Projet impression plaquettes', montant: 120000, type: 'Reçu' },
    ],
    interactions: [
      { date: '02/03/2026', type: 'Email', description: 'Envoi facture mensuelle' },
      { date: '24/02/2026', type: 'Appel', description: 'Demande devis flyers campagne' },
      { date: '16/02/2026', type: 'Email', description: 'Confirmation commande en cours' },
      { date: '08/02/2026', type: 'Visite', description: 'Livraison documents imprimés' },
      { date: '01/02/2026', type: 'WhatsApp', description: 'Maquette à valider' },
    ],
  },
  {
    id: 8,
    nom: 'Sangaré',
    prenom: 'Alassane',
    entreprise: 'Alu & Bois Menuiserie',
    secteur: 'Artisanat',
    statut: 'Prospect',
    caTotal: 750000,
    creances: 0,
    canalPrefere: 'Appel',
    dernierContact: '27 Fév 2026',
    telephone: '+225 05 33 22 11',
    email: 'a.sangare@alubois.ci',
    localisation: 'Abobo, Abidjan',
    creditScore: 52,
    paiementsRecus: 0,
    caGenere: 750000,
    devisEnvoyes: 2,
    tauxConversion: 0,
    transactions: [
      { date: '27/02/2026', description: 'Devis menuiserie aluminium', montant: 350000, type: 'Envoyé' },
    ],
    interactions: [
      { date: '27/02/2026', type: 'Appel', description: 'Demande devis verrière boutique' },
      { date: '20/02/2026', type: 'WhatsApp', description: 'Envoi photos réalisations' },
      { date: '12/02/2026', type: 'Visite', description: 'Prise de mesures sur site' },
    ],
  },
];

/* ═══════════════════════ STATUS STYLES ═══════════════════════════════ */

const statusStyles: Record<ClientStatus, { bg: string; text: string; dot: string }> = {
  Actif: { bg: 'bg-green-500/10', text: 'text-green-700', dot: 'bg-green-500' },
  Prospect: { bg: 'bg-amber-500/10', text: 'text-amber-700', dot: 'bg-amber-500' },
  Inactif: { bg: 'bg-gray-500/10', text: 'text-gray-600', dot: 'bg-gray-400' },
};

const canalIcons: Record<string, React.ReactNode> = {
  WhatsApp: <MessageSquare className="h-3.5 w-3.5 text-green-600" />,
  'Orange Money': <Phone className="h-3.5 w-3.5" style={{ color: FLOWA }} />,
  Appel: <Phone className="h-3.5 w-3.5 text-blue-600" />,
  SMS: <MessageSquare className="h-3.5 w-3.5 text-sky-600" />,
  Email: <Mail className="h-3.5 w-3.5 text-violet-600" />,
};

/* ═══════════════════════ HELPERS ═════════════════════════════════════ */

function formatFCFA(amount: number): string {
  return amount.toLocaleString('fr-FR') + ' FCFA';
}

function getInitials(prenom: string, nom: string): string {
  return (prenom[0] + nom[0]).toUpperCase();
}

/* ═══════════════════════ MAIN COMPONENT ══════════════════════════════ */

export default function ClientsPage() {
  const { setView } = useNavStore();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'Tous' | ClientStatus>('Tous');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedClient = useMemo(
    () => clients.find((c) => c.id === selectedId) ?? null,
    [selectedId]
  );

  const filteredClients = useMemo(() => {
    return clients.filter((c) => {
      const matchSearch =
        c.nom.toLowerCase().includes(search.toLowerCase()) ||
        c.prenom.toLowerCase().includes(search.toLowerCase()) ||
        c.entreprise.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === 'Tous' || c.statut === filter;
      return matchSearch && matchFilter;
    });
  }, [search, filter]);

  const totalCA = useMemo(() => clients.reduce((s, c) => s + c.caTotal, 0), []);
  const avgCA = Math.round(totalCA / clients.length);
  const tauxCreance = Math.round(
    (clients.reduce((s, c) => s + c.creances, 0) / totalCA) * 100
  );

  return (
    <div className="min-h-screen bg-muted/30">
      {/* ═══════════ HEADER ═══════════ */}
      <motion.header
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        custom={0}
        className="sticky top-0 z-30 flex items-center justify-between border-b bg-white/80 px-4 py-3 backdrop-blur-md sm:px-6"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#FF6600] to-[#0EA5E9] text-sm font-bold text-white shadow-sm">
            <Users className="h-4 w-4" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight sm:text-xl">Gestion Clients</h1>
            <p className="text-xs text-muted-foreground">Flowa × NexBiz — Vue unifiée</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rechercher un client..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 w-48 pl-8 text-sm sm:w-64"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'Tous' | ClientStatus)}
              className="h-9 rounded-md border border-input bg-background pl-8 pr-8 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="Tous">Tous</option>
              <option value="Actif">Actif</option>
              <option value="Prospect">Prospect</option>
              <option value="Inactif">Inactif</option>
            </select>
          </div>
          <Button className="gap-1.5 text-xs font-semibold" style={{ backgroundColor: FLOWA }}>
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Ajouter client</span>
          </Button>
        </div>
      </motion.header>

      {/* ═══════════ MAIN CONTENT ═══════════ */}
      <div className="flex">
        {/* Left: Client List */}
        <div className={cn('flex-1 transition-all duration-300', selectedClient ? 'lg:mr-[420px]' : '')}>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
            <motion.div variants={stagger} initial="hidden" animate="visible">
              <Card className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">Liste des clients</CardTitle>
                      <CardDescription>{filteredClients.length} client(s) trouvé(s)</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="gap-1 text-xs">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        {clients.filter((c) => c.statut === 'Actif').length} Actifs
                      </Badge>
                      <Badge variant="outline" className="gap-1 text-xs">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                        {clients.filter((c) => c.statut === 'Prospect').length} Prospects
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="pl-4">Nom</TableHead>
                        <TableHead>Entreprise</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead className="text-right">CA Total</TableHead>
                        <TableHead className="text-right">Créances</TableHead>
                        <TableHead>Canal préféré</TableHead>
                        <TableHead>Dernier contact</TableHead>
                        <TableHead className="text-right pr-4">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredClients.map((client, i) => {
                        const statusStyle = statusStyles[client.statut];
                        const isSelected = selectedId === client.id;
                        return (
                          <motion.tr
                            key={client.id}
                            variants={fadeIn}
                            custom={i}
                            onClick={() => setSelectedId(isSelected ? null : client.id)}
                            className={cn(
                              'cursor-pointer transition-colors group',
                              isSelected ? 'bg-[#FF6600]/5' : 'hover:bg-muted/50'
                            )}
                          >
                            <TableCell className="pl-4">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback
                                    className="text-xs font-bold text-white"
                                    style={{
                                      background: `linear-gradient(135deg, ${FLOWA}, ${NEXBIZ})`,
                                    }}
                                  >
                                    {getInitials(client.prenom, client.nom)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-sm font-semibold leading-tight">
                                    {client.prenom} {client.nom}
                                  </p>
                                  <p className="text-[11px] text-muted-foreground">{client.secteur}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1.5">
                                <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                                <span className="text-sm">{client.entreprise}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="secondary"
                                className={cn('gap-1 text-xs font-medium', statusStyle.bg, statusStyle.text)}
                              >
                                <span className={cn('h-1.5 w-1.5 rounded-full', statusStyle.dot)} />
                                {client.statut}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <span className="text-sm font-semibold">{formatFCFA(client.caTotal)}</span>
                            </TableCell>
                            <TableCell className="text-right">
                              <span
                                className={cn(
                                  'text-sm font-medium',
                                  client.creances > 0 ? 'text-orange-600' : 'text-muted-foreground'
                                )}
                              >
                                {client.creances > 0 ? formatFCFA(client.creances) : '—'}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1.5">
                                {canalIcons[client.canalPrefere]}
                                <span className="text-xs text-muted-foreground">{client.canalPrefere}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="text-xs text-muted-foreground">{client.dernierContact}</span>
                            </TableCell>
                            <TableCell className="text-right pr-4">
                              <div className="flex items-center justify-end gap-1">
                                <Button variant="ghost" size="icon" className="h-7 w-7">
                                  <Phone className="h-3.5 w-3.5" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-7 w-7">
                                  <MoreHorizontal className="h-3.5 w-3.5" />
                                </Button>
                                <ChevronRight
                                  className={cn(
                                    'h-4 w-4 text-muted-foreground transition-transform',
                                    isSelected ? 'rotate-90' : 'group-hover:translate-x-0.5'
                                  )}
                                />
                              </div>
                            </TableCell>
                          </motion.tr>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>

            {/* ═══════════ QUICK STATS ═══════════ */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3"
            >
              {[
                {
                  label: 'Total clients',
                  value: clients.length.toString(),
                  sub: `+3 ce mois`,
                  icon: Users,
                  color: NEXBIZ,
                },
                {
                  label: 'CA moyen par client',
                  value: formatFCFA(avgCA),
                  sub: '+8% vs trimestre préc.',
                  icon: DollarSign,
                  color: FLOWA,
                },
                {
                  label: 'Taux de créance',
                  value: `${tauxCreance}%`,
                  sub: 'Objectif < 25%',
                  icon: CreditCard,
                  color: '#EA580C',
                },
              ].map((stat, i) => {
                const StatIcon = stat.icon;
                return (
                  <motion.div key={stat.label} variants={fadeIn} custom={i}>
                    <Card className="relative overflow-hidden border">
                      <div
                        className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full opacity-15 blur-xl"
                        style={{ backgroundColor: stat.color }}
                      />
                      <CardContent className="flex items-center gap-4 py-4">
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                          style={{ backgroundColor: `${stat.color}15` }}
                        >
                          <StatIcon className="h-5 w-5" style={{ color: stat.color }} />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
                          <p className="text-xl font-bold tracking-tight">{stat.value}</p>
                          <p className="text-[11px] text-muted-foreground">{stat.sub}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Right: Detail Panel */}
        <AnimatePresence>
          {selectedClient && (
            <motion.div
              variants={slideInRight}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed right-0 top-0 z-40 h-full w-[420px] overflow-y-auto border-l bg-white shadow-2xl"
            >
              <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md">
                {/* Close button */}
                <div className="flex items-center justify-between border-b px-6 py-4">
                  <h2 className="text-base font-bold">Fiche client</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setSelectedId(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Client Info Card */}
                <div className="border-b px-6 py-5">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-14 w-14">
                      <AvatarFallback
                        className="text-lg font-bold text-white"
                        style={{
                          background: `linear-gradient(135deg, ${FLOWA}, ${NEXBIZ})`,
                        }}
                      >
                        {getInitials(selectedClient.prenom, selectedClient.nom)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold leading-tight">
                        {selectedClient.prenom} {selectedClient.nom}
                      </h3>
                      <p className="text-sm text-muted-foreground">{selectedClient.entreprise}</p>
                      <Badge
                        variant="secondary"
                        className={cn(
                          'mt-2 gap-1 text-xs font-medium',
                          statusStyles[selectedClient.statut].bg,
                          statusStyles[selectedClient.statut].text
                        )}
                      >
                        <span className={cn('h-1.5 w-1.5 rounded-full', statusStyles[selectedClient.statut].dot)} />
                        {selectedClient.statut}
                      </Badge>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedClient.telephone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate text-xs">{selectedClient.email}</span>
                    </div>
                    <div className="col-span-2 flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span>{selectedClient.localisation}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="px-6 py-4">
                <Tabs defaultValue="infos" className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="infos" className="flex-1 text-xs">Infos</TabsTrigger>
                    <TabsTrigger value="finances" className="flex-1 text-xs gap-1">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: FLOWA }} />
                      Finances
                    </TabsTrigger>
                    <TabsTrigger value="commercial" className="flex-1 text-xs gap-1">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: NEXBIZ }} />
                      Commercial
                    </TabsTrigger>
                  </TabsList>

                  {/* ─── Infos Tab ─── */}
                  <TabsContent value="infos" className="mt-4 space-y-4">
                    <Card className="border">
                      <CardContent className="py-4 space-y-3">
                        {[
                          { label: 'Secteur', value: selectedClient.secteur },
                          { label: 'Canal préféré', value: selectedClient.canalPrefere },
                          { label: 'Dernier contact', value: selectedClient.dernierContact },
                          { label: 'Client depuis', value: 'Sept 2024' },
                          { label: 'Source', value: 'Recommandation' },
                        ].map((row) => (
                          <div key={row.label} className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">{row.label}</span>
                            <span className="text-sm font-medium">{row.value}</span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                    <Card className="border">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Score crédit</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold">{selectedClient.creditScore}</span>
                          <span className="text-sm text-muted-foreground">/100</span>
                        </div>
                        <Progress value={selectedClient.creditScore} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          {selectedClient.creditScore >= 70
                            ? 'Bon profil — éligible microcrédit'
                            : selectedClient.creditScore >= 50
                            ? 'Profil moyen — surveillance recommandée'
                            : 'Profil risqué — relance prioritaire'}
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* ─── Finances Tab (Flowa) ─── */}
                  <TabsContent value="finances" className="mt-4 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <Card className="border-l-4" style={{ borderLeftColor: FLOWA }}>
                        <CardContent className="py-3">
                          <p className="text-[11px] font-medium text-muted-foreground">Créances</p>
                          <p className="text-lg font-bold" style={{ color: '#EA580C' }}>
                            {formatFCFA(selectedClient.creances)}
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="border-l-4" style={{ borderLeftColor: '#16A34A' }}>
                        <CardContent className="py-3">
                          <p className="text-[11px] font-medium text-muted-foreground">Paiements reçus</p>
                          <p className="text-lg font-bold text-green-600">
                            {formatFCFA(selectedClient.paiementsRecus)}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                    <Card className="border">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Score crédit Flowa</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold" style={{ color: FLOWA }}>
                            {selectedClient.creditScore}
                          </span>
                          <span className="text-sm text-muted-foreground">/100</span>
                        </div>
                        <Progress value={selectedClient.creditScore} className="h-2" />
                      </CardContent>
                    </Card>
                    <Card className="border">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Receipt className="h-4 w-4" style={{ color: FLOWA }} />
                          Dernières transactions
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {selectedClient.transactions.slice(0, 5).map((tx, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2"
                            >
                              <div className="flex items-center gap-2">
                                {tx.type === 'Reçu' ? (
                                  <ArrowDownRight className="h-4 w-4 text-green-600" />
                                ) : (
                                  <ArrowUpRight className="h-4 w-4 text-red-500" />
                                )}
                                <div>
                                  <p className="text-xs font-medium">{tx.description}</p>
                                  <p className="text-[10px] text-muted-foreground">{tx.date}</p>
                                </div>
                              </div>
                              <span
                                className={cn(
                                  'text-sm font-semibold',
                                  tx.type === 'Reçu' ? 'text-green-600' : 'text-red-500'
                                )}
                              >
                                {tx.type === 'Reçu' ? '+' : '-'}{formatFCFA(tx.montant)}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* ─── Commercial Tab (NexBiz) ─── */}
                  <TabsContent value="commercial" className="mt-4 space-y-4">
                    <div className="grid grid-cols-3 gap-3">
                      <Card className="border-l-4" style={{ borderLeftColor: NEXBIZ }}>
                        <CardContent className="py-3">
                          <p className="text-[11px] font-medium text-muted-foreground">CA généré</p>
                          <p className="text-base font-bold" style={{ color: NEXBIZ }}>
                            {(selectedClient.caGenere / 1000000).toFixed(1)}M
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="border-l-4" style={{ borderLeftColor: NEXBIZ }}>
                        <CardContent className="py-3">
                          <p className="text-[11px] font-medium text-muted-foreground">Devis envoyés</p>
                          <p className="text-base font-bold" style={{ color: NEXBIZ }}>
                            {selectedClient.devisEnvoyes}
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="border-l-4" style={{ borderLeftColor: NEXBIZ }}>
                        <CardContent className="py-3">
                          <p className="text-[11px] font-medium text-muted-foreground">Taux conv.</p>
                          <p className="text-base font-bold" style={{ color: NEXBIZ }}>
                            {selectedClient.tauxConversion}%
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                    <Card className="border">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <FileText className="h-4 w-4" style={{ color: NEXBIZ }} />
                          Dernières interactions
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {selectedClient.interactions.slice(0, 5).map((inter, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="flex items-start gap-3 rounded-lg bg-muted/40 px-3 py-2"
                            >
                              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-500/10 mt-0.5">
                                {inter.type === 'Appel' || inter.type === 'Orange Money' ? (
                                  <Phone className="h-3.5 w-3.5" style={{ color: NEXBIZ }} />
                                ) : inter.type === 'Email' ? (
                                  <Mail className="h-3.5 w-3.5" style={{ color: NEXBIZ }} />
                                ) : inter.type === 'Visite' ? (
                                  <MapPin className="h-3.5 w-3.5" style={{ color: NEXBIZ }} />
                                ) : (
                                  <MessageSquare className="h-3.5 w-3.5" style={{ color: NEXBIZ }} />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-semibold">{inter.type}</span>
                                  <span className="text-[10px] text-muted-foreground">{inter.date}</span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5">{inter.description}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    <div className="flex gap-2">
                      <Button
                        className="flex-1 gap-1.5 text-xs font-semibold"
                        style={{ backgroundColor: NEXBIZ }}
                      >
                        <FileText className="h-3.5 w-3.5" />
                        Nouveau devis
                      </Button>
                      <Button
                        className="flex-1 gap-1.5 text-xs font-semibold"
                        style={{ backgroundColor: FLOWA }}
                      >
                        <Receipt className="h-3.5 w-3.5" />
                        Relancer paiement
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
