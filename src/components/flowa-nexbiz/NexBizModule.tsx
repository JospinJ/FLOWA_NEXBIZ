'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  UserPlus,
  FileText,
  TrendingUp,
  Calendar,
  Search,
  Eye,
  Send,
  Plus,
  Sparkles,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  X,
  Bot,
  BarChart3,
  Target,
  ArrowRight,
  ClipboardList,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useNavStore } from '@/lib/nav-store';

/* ═══════════════════════ BRAND COLORS ═══════════════════════════════ */

const NEXBIZ = '#0EA5E9';
const NEXBIZ_LIGHT = '#38BDF8';
const NEXBIZ_DARK = '#0284C7';

/* ═══════════════════════ ANIMATIONS ════════════════════════════════════ */

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const tabContent = {
  initial: { opacity: 0, x: 12 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
  exit: { opacity: 0, x: -12, transition: { duration: 0.2 } },
};

/* ═══════════════════════ MOCK DATA ════════════════════════════════════ */

// Tab 1: Summary cards
const summaryCards = [
  {
    title: 'Clients actifs',
    value: '47',
    unit: '',
    change: '+5 ce mois',
    icon: Users,
    color: NEXBIZ,
    bgColor: 'bg-sky-500/10',
    borderColor: 'border-sky-500/20',
    textColor: 'text-sky-600',
  },
  {
    title: 'Prospects',
    value: '23',
    unit: '',
    change: '+8 cette semaine',
    icon: UserPlus,
    color: '#8B5CF6',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
    textColor: 'text-purple-600',
  },
  {
    title: 'Devis en cours',
    value: '12',
    unit: '',
    change: '3 en attente',
    icon: FileText,
    color: '#F59E0B',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
    textColor: 'text-amber-600',
  },
  {
    title: 'Taux conversion',
    value: '68',
    unit: '%',
    change: '+4% vs mois dernier',
    icon: TrendingUp,
    color: '#10B981',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
    textColor: 'text-green-600',
  },
];

// Tab 1: Pipeline stages
const pipelineStages = [
  { label: 'Prospects', count: 23, color: '#8B5CF6', percentage: 100 },
  { label: 'Qualifiés', count: 18, color: NEXBIZ, percentage: 78 },
  { label: 'Devis envoyés', count: 12, color: '#F59E0B', percentage: 52 },
  { label: 'Signés', count: 8, color: '#10B981', percentage: 35 },
];

// Tab 1: Monthly sales chart
const monthlySales = [
  { month: 'Oct', ventes: 1850000 },
  { month: 'Nov', ventes: 2100000 },
  { month: 'Déc', ventes: 1780000 },
  { month: 'Jan', ventes: 2350000 },
  { month: 'Fév', ventes: 2200000 },
  { month: 'Mar', ventes: 2580000 },
];

// Tab 2: Client data
const clientsData = [
  {
    id: 1,
    nom: 'Amadou Diallo',
    entreprise: 'Restaurant Le Baobab',
    statut: 'Actif' as const,
    caTotal: 2400000,
    derniereActivite: 'Aujourd\'hui',
    initials: 'AD',
    phone: '+221 77 123 45 67',
    email: 'amadou.diallo@baobab.sn',
    adresse: 'Dakar, Médina',
  },
  {
    id: 2,
    nom: 'Aminata Koné',
    entreprise: 'Koné & Fils Commerce',
    statut: 'Actif' as const,
    caTotal: 1850000,
    derniereActivite: 'Hier',
    initials: 'AK',
    phone: '+221 76 234 56 78',
    email: 'aminata.kone@gmail.com',
    adresse: 'Dakar, Plateau',
  },
  {
    id: 3,
    nom: 'Moussa Touré',
    entreprise: 'Touré Distribution',
    statut: 'Prospect' as const,
    caTotal: 950000,
    derniereActivite: 'Il y a 3 jours',
    initials: 'MT',
    phone: '+221 78 345 67 89',
    email: 'moussa.toure@distribution.com',
    adresse: 'Thiès',
  },
  {
    id: 4,
    nom: 'Fatou Diop',
    entreprise: 'Diop Services',
    statut: 'Actif' as const,
    caTotal: 3100000,
    derniereActivite: 'Aujourd\'hui',
    initials: 'FD',
    phone: '+221 77 456 78 90',
    email: 'fatou.diop@services.sn',
    adresse: 'Dakar, Almadies',
  },
  {
    id: 5,
    nom: 'Ibrahima N\'Diaye',
    entreprise: 'N\'Diaye Technologies',
    statut: 'Inactif' as const,
    caTotal: 420000,
    derniereActivite: 'Il y a 15 jours',
    initials: 'IN',
    phone: '+221 76 567 89 01',
    email: 'ibrahima.ndiaye@tech.sn',
    adresse: 'Saint-Louis',
  },
  {
    id: 6,
    nom: 'Awa Ouattara',
    entreprise: 'Ouattara Import-Export',
    statut: 'Prospect' as const,
    caTotal: 0,
    derniereActivite: 'Il y a 1 jour',
    initials: 'AO',
    phone: '+225 07 89 01 23',
    email: 'awa.ouattara@import.com',
    adresse: 'Abidjan, Cocody',
  },
];

// Tab 3: Devis & Factures
const devisFactures = [
  { id: 'DEV-001', client: 'Mme Koné', montant: 350000, statut: 'En attente' as const, type: 'devis' as const, date: '28 Fév 2026' },
  { id: 'DEV-002', client: 'M. Touré', montant: 180000, statut: 'Accepté' as const, type: 'devis' as const, date: '25 Fév 2026' },
  { id: 'DEV-003', client: 'Mme Diop', montant: 520000, statut: 'En attente' as const, type: 'devis' as const, date: '01 Mar 2026' },
  { id: 'FAC-001', client: 'M. Diallo', montant: 150000, statut: 'Payée' as const, type: 'facture' as const, date: '20 Fév 2026' },
  { id: 'FAC-002', client: 'M. N\'Diaye', montant: 280000, statut: 'En retard' as const, type: 'facture' as const, date: '10 Fév 2026' },
];

// Tab 3: Status flow
const statusFlow = [
  { label: 'Brouillon', icon: FileText, color: '#6B7280' },
  { label: 'Envoyé', icon: Send, color: NEXBIZ },
  { label: 'Accepté / Refusé', icon: CheckCircle2, color: '#10B981' },
  { label: 'Facture', icon: FileText, color: '#F59E0B' },
  { label: 'Payée / En retard', icon: AlertCircle, color: '#EF4444' },
];

// Tab 4: Calendar days
const weekDays = [
  { label: 'Lun', date: '3', events: 2 },
  { label: 'Mar', date: '4', events: 1 },
  { label: 'Mer', date: '5', events: 0 },
  { label: 'Jeu', date: '6', events: 1 },
  { label: 'Ven', date: '7', events: 3 },
  { label: 'Sam', date: '8', events: 0 },
  { label: 'Dim', date: '9', events: 0 },
];

// Tab 4: Appointments
const appointments = [
  { day: 'Lun', time: '09h', client: 'Mme Koné', desc: 'Relance devis 350K', color: '#F59E0B' },
  { day: 'Mar', time: '14h', client: 'M. Touré', desc: 'Présentation catalogue', color: NEXBIZ },
  { day: 'Jeu', time: '11h', client: 'Mme Diop', desc: 'Négociation contrat', color: '#8B5CF6' },
  { day: 'Ven', time: '10h', client: 'M. Diallo', desc: 'Suivi livraison', color: '#10B981' },
];

// Tab 4: Task checklist
const initialTasks = [
  { id: '1', label: 'Envoyer devis à Mme Diop', done: true },
  { id: '2', label: 'Relancer M. N\'Diaye pour facture en retard', done: false },
  { id: '3', label: 'Préparer catalogue Touré Distribution', done: false },
  { id: '4', label: 'Mettre à jour fiche client Ouattara', done: false },
  { id: '5', label: 'Planifier visite Restaurant Le Baobab', done: true },
];

// Tab 5: Performance - monthly sales
const performanceMonthly = [
  { month: 'Oct', ventes: 1850000 },
  { month: 'Nov', ventes: 2100000 },
  { month: 'Déc', ventes: 1780000 },
  { month: 'Jan', ventes: 2350000 },
  { month: 'Fév', ventes: 2200000 },
  { month: 'Mar', ventes: 2580000 },
];

// Tab 5: Conversion by source
const conversionBySource = [
  { name: 'Bouche-à-oreille', value: 35, color: NEXBIZ },
  { name: 'Campagne SMS', value: 25, color: '#8B5CF6' },
  { name: 'Référence', value: 20, color: '#10B981' },
  { name: 'Direct', value: 20, color: '#F59E0B' },
];

// Tab 5: Top clients by revenue
const topClientsByRevenue = [
  { name: 'Fatou Diop', revenue: 3100000 },
  { name: 'Amadou Diallo', revenue: 2400000 },
  { name: 'Aminata Koné', revenue: 1850000 },
  { name: 'Moussa Touré', revenue: 950000 },
  { name: 'Ibrahima N\'Diaye', revenue: 420000 },
];

/* ═══════════════════════ SUB-COMPONENTS ══════════════════════════════ */

/** Stat card with icon and value */
function StatCard({
  title,
  value,
  unit,
  change,
  icon: Icon,
  color,
  bgColor,
  borderColor,
  delay,
}: {
  title: string;
  value: string;
  unit: string;
  change: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
  delay: number;
}) {
  return (
    <motion.div variants={fadeIn} custom={delay}>
      <Card className={cn('relative overflow-hidden border', borderColor)}>
        <div
          className="pointer-events-none absolute -right-4 -top-4 h-20 w-20 rounded-full opacity-15 blur-xl"
          style={{ backgroundColor: color }}
        />
        <CardContent className="flex items-start gap-4 p-5">
          <div className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl', bgColor)}>
            <Icon className="h-5 w-5" style={{ color }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</p>
            <p className="mt-1 text-2xl font-bold tracking-tight">
              {value}
              {unit && <span className="ml-1 text-sm font-normal text-muted-foreground">{unit}</span>}
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">{change}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/** Status badge for client table */
function ClientStatusBadge({ statut }: { statut: string }) {
  const map: Record<string, { className: string }> = {
    'Actif': { className: 'bg-green-500/10 text-green-700 border-green-500/20' },
    'Prospect': { className: 'bg-sky-500/10 text-sky-700 border-sky-500/20' },
    'Inactif': { className: 'bg-gray-500/10 text-gray-600 border-gray-500/20' },
  };
  const s = map[statut] ?? { className: '' };
  return (
    <Badge variant="secondary" className={cn('text-[11px] font-semibold', s.className)}>
      {statut}
    </Badge>
  );
}

/** Status badge for devis/factures */
function DevisStatusBadge({ statut }: { statut: string }) {
  const map: Record<string, { className: string }> = {
    'En attente': { className: 'bg-amber-500/10 text-amber-700 border-amber-500/20' },
    'Accepté': { className: 'bg-green-500/10 text-green-700 border-green-500/20' },
    'Refusé': { className: 'bg-red-500/10 text-red-700 border-red-500/20' },
    'Payée': { className: 'bg-green-500/10 text-green-700 border-green-500/20' },
    'En retard': { className: 'bg-red-500/10 text-red-700 border-red-500/20' },
  };
  const s = map[statut] ?? { className: '' };
  return (
    <Badge variant="secondary" className={cn('text-[11px] font-semibold', s.className)}>
      {statut}
    </Badge>
  );
}

/** Custom tooltip for bar charts */
function SalesTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-white px-3 py-2 shadow-lg dark:bg-zinc-900">
      <p className="mb-1 text-xs font-semibold text-muted-foreground">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-xs font-medium" style={{ color: p.color }}>
          Ventes : {Number(p.value).toLocaleString('fr-FR')} FCFA
        </p>
      ))}
    </div>
  );
}

/** Custom tooltip for horizontal bar chart */
function RevenueTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ value: number; name: string }>;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-white px-3 py-2 shadow-lg dark:bg-zinc-900">
      <p className="text-xs font-medium">{payload[0].name}</p>
      <p className="text-xs font-semibold" style={{ color: NEXBIZ }}>
        {Number(payload[0].value).toLocaleString('fr-FR')} FCFA
      </p>
    </div>
  );
}

/* ═══════════════════════ MAIN COMPONENT ══════════════════════════════ */

export default function NexBizModule() {
  const setView = useNavStore((s) => s.setView);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState<number | null>(null);
  const [showNewDevis, setShowNewDevis] = useState(false);
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const filteredClients = clientsData.filter(
    (c) =>
      c.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.entreprise.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedClientData = clientsData.find((c) => c.id === selectedClient);

  return (
    <div className="min-h-screen bg-muted/30">
      {/* ═══════════ HEADER ═══════════ */}
      <motion.header
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        custom={0}
        className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0EA5E9] to-[#38BDF8] shadow-md">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight sm:text-xl">
                NexBiz{' '}
                <span className="font-normal text-muted-foreground">&mdash;</span>{' '}
                <span className="font-normal text-muted-foreground">Votre Agent Commercial IA</span>
              </h1>
              <p className="text-xs text-muted-foreground">CRM intelligent pour PME africaines</p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="border-sky-500/20 bg-sky-500/5 text-sky-600 text-xs font-semibold"
          >
            <Sparkles className="mr-1 h-3 w-3" />
            IA Active
          </Badge>
        </div>
      </motion.header>

      {/* ═══════════ TABS ═══════════ */}
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 flex w-full flex-wrap gap-1 bg-muted/60 p-1.5 sm:w-fit sm:flex-nowrap">
            <TabsTrigger value="overview" className="gap-1.5 text-xs sm:text-sm">
              <BarChart3 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Vue d&apos;ensemble</span>
              <span className="sm:hidden">Vue</span>
            </TabsTrigger>
            <TabsTrigger value="clients" className="gap-1.5 text-xs sm:text-sm">
              <Users className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Gestion Clients</span>
              <span className="sm:hidden">Clients</span>
            </TabsTrigger>
            <TabsTrigger value="devis" className="gap-1.5 text-xs sm:text-sm">
              <FileText className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Devis &amp; Factures</span>
              <span className="sm:hidden">Devis</span>
            </TabsTrigger>
            <TabsTrigger value="rdv" className="gap-1.5 text-xs sm:text-sm">
              <Calendar className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Rendez-vous &amp; Suivi</span>
              <span className="sm:hidden">RDV</span>
            </TabsTrigger>
            <TabsTrigger value="performance" className="gap-1.5 text-xs sm:text-sm">
              <TrendingUp className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Performance</span>
              <span className="sm:hidden">Perf</span>
            </TabsTrigger>
          </TabsList>

          {/* ═══════════ TAB 1: VUE D'ENSEMBLE ═══════════ */}
          <TabsContent value="overview">
            <AnimatePresence mode="wait">
              <motion.div
                key="overview"
                variants={tabContent}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                {/* Summary Cards */}
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
                >
                  {summaryCards.map((card, i) => (
                    <StatCard
                      key={card.title}
                      title={card.title}
                      value={card.value}
                      unit={card.unit}
                      change={card.change}
                      icon={card.icon}
                      color={card.color}
                      bgColor={card.bgColor}
                      borderColor={card.borderColor}
                      delay={i}
                    />
                  ))}
                </motion.div>

                {/* Pipeline visuel */}
                <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={4}>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-base">Pipeline commercial</CardTitle>
                          <CardDescription>De prospect à client signé</CardDescription>
                        </div>
                        <Badge variant="outline" className="border-sky-500/20 bg-sky-500/5 text-sky-600 text-xs">
                          <Target className="mr-1 h-3 w-3" />
                          68% conversion
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                        {pipelineStages.map((stage, i) => (
                          <motion.div
                            key={stage.label}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + i * 0.1, duration: 0.35 }}
                            className="relative"
                          >
                            <div className="rounded-xl border border-border/50 bg-white p-4 shadow-sm">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                  {stage.label}
                                </span>
                                <span
                                  className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white"
                                  style={{ backgroundColor: stage.color }}
                                >
                                  {stage.count}
                                </span>
                              </div>
                              {/* Progress bar */}
                              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${stage.percentage}%` }}
                                  transition={{ delay: 0.5 + i * 0.12, duration: 0.6, ease: 'easeOut' }}
                                  className="h-full rounded-full"
                                  style={{ backgroundColor: stage.color }}
                                />
                              </div>
                            </div>
                            {/* Arrow between stages (hidden on mobile) */}
                            {i < pipelineStages.length - 1 && (
                              <div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 sm:block">
                                <ChevronRight className="h-4 w-4 text-muted-foreground/40" />
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Monthly sales chart */}
                <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={5}>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-base">Ventes mensuelles</CardTitle>
                          <CardDescription>Chiffre d&apos;affaires sur 6 mois</CardDescription>
                        </div>
                        <Badge variant="outline" className="border-green-500/20 bg-green-500/5 text-green-600 text-xs">
                          <TrendingUp className="mr-1 h-3 w-3" />
                          +12.5%
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={monthlySales} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
                            <defs>
                              <linearGradient id="gradNexbizBar" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={NEXBIZ} stopOpacity={0.9} />
                                <stop offset="100%" stopColor={NEXBIZ_LIGHT} stopOpacity={0.6} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                            <XAxis
                              dataKey="month"
                              axisLine={false}
                              tickLine={false}
                              tick={{ fontSize: 12, fill: '#6B7280' }}
                            />
                            <YAxis
                              axisLine={false}
                              tickLine={false}
                              tick={{ fontSize: 11, fill: '#6B7280' }}
                              tickFormatter={(v: number) => `${(v / 1000000).toFixed(1)}M`}
                            />
                            <Tooltip content={<SalesTooltip />} />
                            <Bar
                              dataKey="ventes"
                              fill="url(#gradNexbizBar)"
                              radius={[6, 6, 0, 0]}
                              maxBarSize={48}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Quick insight row */}
                <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={6}>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <Card className="border-sky-500/20 bg-sky-500/5">
                      <CardContent className="flex items-center gap-3 p-4">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-500/15">
                          <Bot className="h-4 w-4 text-sky-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">3 relances IA programmées</p>
                          <p className="text-xs text-muted-foreground">Aujourd&apos;hui — automatisation active</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-green-500/20 bg-green-500/5">
                      <CardContent className="flex items-center gap-3 p-4">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-500/15">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">2 devis acceptés</p>
                          <p className="text-xs text-muted-foreground">700,000 FCFA ce mois</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-amber-500/20 bg-amber-500/5">
                      <CardContent className="flex items-center gap-3 p-4">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/15">
                          <AlertCircle className="h-4 w-4 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">1 facture en retard</p>
                          <p className="text-xs text-muted-foreground">280,000 FCFA — J+19</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </TabsContent>

          {/* ═══════════ TAB 2: GESTION CLIENTS ═══════════ */}
          <TabsContent value="clients">
            <AnimatePresence mode="wait">
              <motion.div
                key="clients"
                variants={tabContent}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  {/* Client list - 2/3 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="lg:col-span-2"
                  >
                    <Card>
                      <CardHeader>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <CardTitle className="text-base">Liste des clients</CardTitle>
                            <CardDescription>{clientsData.length} contacts — {clientsData.filter(c => c.statut === 'Actif').length} actifs</CardDescription>
                          </div>
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              placeholder="Rechercher un client..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="h-9 w-full pl-9 sm:w-64"
                            />
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Client</TableHead>
                              <TableHead>Entreprise</TableHead>
                              <TableHead>Statut</TableHead>
                              <TableHead>CA Total</TableHead>
                              <TableHead>Dernière activité</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredClients.map((client) => (
                              <TableRow
                                key={client.id}
                                className={cn(
                                  'cursor-pointer transition-colors',
                                  selectedClient === client.id && 'bg-sky-500/5'
                                )}
                                onClick={() => setSelectedClient(selectedClient === client.id ? null : client.id)}
                              >
                                <TableCell>
                                  <div className="flex items-center gap-2.5">
                                    <Avatar className="h-8 w-8">
                                      <AvatarFallback
                                        className="text-xs font-semibold"
                                        style={{
                                          backgroundColor: `${NEXBIZ}15`,
                                          color: NEXBIZ,
                                        }}
                                      >
                                        {client.initials}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium">{client.nom}</span>
                                  </div>
                                </TableCell>
                                <TableCell className="text-muted-foreground">{client.entreprise}</TableCell>
                                <TableCell>
                                  <ClientStatusBadge statut={client.statut} />
                                </TableCell>
                                <TableCell className="font-medium">
                                  {client.caTotal > 0
                                    ? `${(client.caTotal / 1000).toFixed(0)}K FCFA`
                                    : '—'}
                                </TableCell>
                                <TableCell className="text-muted-foreground text-xs">{client.derniereActivite}</TableCell>
                                <TableCell className="text-right">
                                  <div className="flex items-center justify-end gap-1">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 text-xs text-sky-600 hover:text-sky-700 hover:bg-sky-500/5"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedClient(selectedClient === client.id ? null : client.id);
                                      }}
                                    >
                                      <Eye className="mr-1 h-3 w-3" />
                                      Voir fiche
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 text-xs text-sky-600 hover:text-sky-700 hover:bg-sky-500/5"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <Send className="mr-1 h-3 w-3" />
                                      Devis
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Client detail panel - 1/3 */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                  >
                    <AnimatePresence mode="wait">
                      {selectedClientData ? (
                        <motion.div
                          key={selectedClientData.id}
                          initial={{ opacity: 0, scale: 0.97 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.97 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Card className="sticky top-20">
                            <CardHeader className="pb-3">
                              <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-12 w-12">
                                    <AvatarFallback
                                      className="text-sm font-bold"
                                      style={{
                                        backgroundColor: `${NEXBIZ}15`,
                                        color: NEXBIZ,
                                      }}
                                    >
                                      {selectedClientData.initials}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <CardTitle className="text-base">{selectedClientData.nom}</CardTitle>
                                    <CardDescription>{selectedClientData.entreprise}</CardDescription>
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => setSelectedClient(null)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <ClientStatusBadge statut={selectedClientData.statut} />

                              <Separator />

                              {/* Contact info */}
                              <div className="space-y-2.5">
                                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                  Contact
                                </p>
                                <div className="flex items-center gap-2 text-sm">
                                  <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                                  <span>{selectedClientData.phone}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                                  <span className="text-sky-600">{selectedClientData.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                                  <span>{selectedClientData.adresse}</span>
                                </div>
                              </div>

                              <Separator />

                              {/* CA Total */}
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                  CA Total
                                </p>
                                <p className="mt-1 text-xl font-bold" style={{ color: NEXBIZ }}>
                                  {selectedClientData.caTotal.toLocaleString('fr-FR')} FCFA
                                </p>
                              </div>

                              <Separator />

                              {/* Historique */}
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                  Historique récent
                                </p>
                                <div className="mt-2 space-y-2">
                                  <div className="flex items-start gap-2">
                                    <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                                    <div>
                                      <p className="text-xs font-medium">Paiement reçu — 150,000 FCFA</p>
                                      <p className="text-[10px] text-muted-foreground">Il y a 2 jours</p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
                                    <div>
                                      <p className="text-xs font-medium">Devis envoyé — 350,000 FCFA</p>
                                      <p className="text-[10px] text-muted-foreground">Il y a 5 jours</p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                                    <div>
                                      <p className="text-xs font-medium">Premier contact</p>
                                      <p className="text-[10px] text-muted-foreground">Il y a 3 semaines</p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <Separator />

                              {/* Notes IA */}
                              <div className="rounded-lg border border-sky-500/20 bg-sky-500/5 p-3">
                                <div className="flex items-center gap-1.5 mb-2">
                                  <Sparkles className="h-3.5 w-3.5 text-sky-600" />
                                  <p className="text-xs font-semibold text-sky-700">Notes IA</p>
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                  Client fidèle avec un potentiel de croissance de +30%. Recommandation : proposer une offre packagée restauration + livraison pour augmenter le panier moyen.
                                </p>
                              </div>

                              {/* Action buttons */}
                              <div className="flex gap-2">
                                <Button
                                  className="flex-1 bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] text-white shadow-sm hover:shadow-md"
                                  size="sm"
                                >
                                  <Send className="mr-1.5 h-3.5 w-3.5" />
                                  Envoyer devis
                                </Button>
                                <Button variant="outline" size="sm" className="flex-1">
                                  <Phone className="mr-1.5 h-3.5 w-3.5" />
                                  Appeler
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="empty"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Card className="sticky top-20 flex h-80 items-center justify-center">
                            <CardContent className="text-center">
                              <Users className="mx-auto h-10 w-10 text-muted-foreground/30" />
                              <p className="mt-3 text-sm font-medium text-muted-foreground">
                                Sélectionnez un client
                              </p>
                              <p className="mt-1 text-xs text-muted-foreground/70">
                                Cliquez sur une ligne pour voir la fiche détaillée
                              </p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </TabsContent>

          {/* ═══════════ TAB 3: DEVIS & FACTURES ═══════════ */}
          <TabsContent value="devis">
            <AnimatePresence mode="wait">
              <motion.div
                key="devis"
                variants={tabContent}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                {/* Devis & Factures list */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <CardTitle className="text-base">Devis &amp; Factures</CardTitle>
                          <CardDescription>Derniers documents commerciaux</CardDescription>
                        </div>
                        <Button
                          className="bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] text-white shadow-sm hover:shadow-md transition-shadow"
                          size="sm"
                          onClick={() => setShowNewDevis(!showNewDevis)}
                        >
                          <Plus className="mr-1.5 h-3.5 w-3.5" />
                          Nouveau devis IA
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Réf</TableHead>
                            <TableHead>Client</TableHead>
                            <TableHead>Montant</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {devisFactures.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <span
                                    className={cn(
                                      'inline-flex h-6 items-center rounded px-1.5 text-[10px] font-bold',
                                      item.type === 'devis'
                                        ? 'bg-sky-500/10 text-sky-700'
                                        : 'bg-amber-500/10 text-amber-700'
                                    )}
                                  >
                                    {item.type === 'devis' ? 'DEV' : 'FAC'}
                                  </span>
                                  <span className="font-mono text-xs">{item.id}</span>
                                </div>
                              </TableCell>
                              <TableCell className="font-medium">{item.client}</TableCell>
                              <TableCell className="font-medium">
                                {item.montant.toLocaleString('fr-FR')} FCFA
                              </TableCell>
                              <TableCell className="text-xs text-muted-foreground">{item.date}</TableCell>
                              <TableCell>
                                <DevisStatusBadge statut={item.statut} />
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm" className="h-7 text-xs text-sky-600 hover:text-sky-700 hover:bg-sky-500/5">
                                  Voir
                                  <ArrowRight className="ml-1 h-3 w-3" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* AI-generated quote form mockup */}
                <AnimatePresence>
                  {showNewDevis && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                    >
                      <Card className="border-sky-500/30 bg-gradient-to-br from-sky-500/5 to-transparent">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/15">
                                <Sparkles className="h-4 w-4 text-sky-600" />
                              </div>
                              <div>
                                <CardTitle className="text-base">Nouveau devis IA</CardTitle>
                                <CardDescription>L&apos;IA génère automatiquement votre devis</CardDescription>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => setShowNewDevis(false)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Client</label>
                              <Input placeholder="Sélectionner un client..." className="h-9" />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Montant estimé</label>
                              <Input placeholder="0 FCFA" className="h-9" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Description</label>
                            <Input placeholder="Description du devis..." className="h-9" />
                          </div>
                          <div className="rounded-lg border border-sky-500/20 bg-sky-500/5 p-3">
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <Bot className="h-3.5 w-3.5 text-sky-600" />
                              <p className="text-xs font-semibold text-sky-700">Suggestion IA</p>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              Basé sur l&apos;historique client et les tendances du marché, l&apos;IA recommande un devis de 350,000 FCFA avec des conditions de paiement à 30 jours. Probabilité d&apos;acceptation : 78%.
                            </p>
                          </div>
                          <div className="flex gap-3">
                            <Button
                              className="bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] text-white shadow-sm hover:shadow-md"
                              size="sm"
                            >
                              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                              Générer avec l&apos;IA
                            </Button>
                            <Button variant="outline" size="sm">
                              Brouillon
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Status flow */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Cycle de vie d&apos;un document</CardTitle>
                      <CardDescription>De la création au paiement</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-0 sm:justify-between">
                        {statusFlow.map((step, i) => {
                          const StepIcon = step.icon;
                          return (
                            <div key={step.label} className="flex items-center gap-2">
                              <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + i * 0.1, duration: 0.3 }}
                                className="flex items-center gap-2 rounded-lg border border-border/50 bg-white px-3 py-2 shadow-sm"
                              >
                                <div
                                  className="flex h-7 w-7 items-center justify-center rounded-md"
                                  style={{ backgroundColor: `${step.color}15` }}
                                >
                                  <StepIcon className="h-3.5 w-3.5" style={{ color: step.color }} />
                                </div>
                                <span className="text-xs font-medium whitespace-nowrap">{step.label}</span>
                              </motion.div>
                              {i < statusFlow.length - 1 && (
                                <ArrowRight className="h-4 w-4 text-muted-foreground/30 hidden sm:block" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </TabsContent>

          {/* ═══════════ TAB 4: RENDEZ-VOUS & SUIVI ═══════════ */}
          <TabsContent value="rdv">
            <AnimatePresence mode="wait">
              <motion.div
                key="rdv"
                variants={tabContent}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
                  {/* Calendar + Appointments - 3/5 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6 lg:col-span-3"
                  >
                    {/* Calendar mockup */}
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-base">Semaine du 3 Mars 2026</CardTitle>
                            <CardDescription>Vue calendrier hebdomadaire</CardDescription>
                          </div>
                          <Button variant="outline" size="sm" className="text-xs">
                            <Plus className="mr-1 h-3 w-3" />
                            Nouveau RDV
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-7 gap-1.5">
                          {weekDays.map((day) => (
                            <motion.div
                              key={day.label}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className={cn(
                                'flex flex-col items-center rounded-xl border py-3 transition-colors',
                                day.events > 0
                                  ? 'border-sky-500/20 bg-sky-500/5 cursor-pointer hover:bg-sky-500/10'
                                  : 'border-border/30 bg-muted/20'
                              )}
                            >
                              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                                {day.label}
                              </span>
                              <span
                                className={cn(
                                  'mt-1 text-lg font-bold',
                                  day.events > 0 ? 'text-sky-600' : 'text-muted-foreground/50'
                                )}
                              >
                                {day.date}
                              </span>
                              {day.events > 0 && (
                                <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-sky-500 text-[10px] font-bold text-white">
                                  {day.events}
                                </span>
                              )}
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Upcoming appointments */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Prochains rendez-vous</CardTitle>
                        <CardDescription>4 rendez-vous cette semaine</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {appointments.map((appt, i) => (
                            <motion.div
                              key={`${appt.day}-${appt.time}`}
                              initial={{ opacity: 0, x: -15 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + i * 0.1, duration: 0.35 }}
                              className="flex items-center gap-4 rounded-xl border border-border/50 bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
                            >
                              <div
                                className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg"
                                style={{ backgroundColor: `${appt.color}10` }}
                              >
                                <span className="text-[10px] font-bold uppercase" style={{ color: appt.color }}>
                                  {appt.day}
                                </span>
                                <span className="text-sm font-bold" style={{ color: appt.color }}>
                                  {appt.time}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold">{appt.client}</p>
                                <p className="text-xs text-muted-foreground">{appt.desc}</p>
                              </div>
                              <Button variant="ghost" size="sm" className="h-7 text-xs text-sky-600 hover:text-sky-700 hover:bg-sky-500/5 shrink-0">
                                Détails
                              </Button>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Right side: Auto-scheduling + Tasks - 2/5 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="space-y-6 lg:col-span-2"
                  >
                    {/* Auto-scheduling feature */}
                    <Card className="border-sky-500/20 bg-gradient-to-br from-sky-500/5 to-transparent">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/15">
                            <Sparkles className="h-4 w-4 text-sky-600" />
                          </div>
                          <div>
                            <CardTitle className="text-sm">Planification IA</CardTitle>
                            <CardDescription className="text-[11px]">Auto-scheduling intelligent</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          L&apos;IA propose automatiquement les meilleurs créneaux pour vos rendez-vous en analysant vos disponibilités, les préférences clients et les probabilités de conversion.
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 rounded-lg border border-green-500/20 bg-green-500/5 p-2.5">
                            <CheckCircle2 className="h-3.5 w-3.5 text-green-600 shrink-0" />
                            <p className="text-xs text-green-700">Créneau optimal détecté : Ven 10h</p>
                          </div>
                          <div className="flex items-center gap-2 rounded-lg border border-sky-500/20 bg-sky-500/5 p-2.5">
                            <Clock className="h-3.5 w-3.5 text-sky-600 shrink-0" />
                            <p className="text-xs text-sky-700">Taux d&apos;acceptation : 85% à ce créneau</p>
                          </div>
                          <div className="flex items-center gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 p-2.5">
                            <AlertCircle className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                            <p className="text-xs text-amber-700">Conflit détecté : Mar 14h — redéplacer</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Task checklist */}
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <ClipboardList className="h-4 w-4 text-muted-foreground" />
                            <CardTitle className="text-sm">Tâches à suivre</CardTitle>
                          </div>
                          <Badge variant="outline" className="text-[10px]">
                            {tasks.filter(t => t.done).length}/{tasks.length}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {tasks.map((task) => (
                            <div
                              key={task.id}
                              className="flex items-center gap-3 rounded-lg border border-border/30 bg-white p-2.5 transition-colors hover:bg-muted/30"
                            >
                              <Checkbox
                                checked={task.done}
                                onCheckedChange={() => toggleTask(task.id)}
                                className="data-[state=checked]:bg-sky-500 data-[state=checked]:border-sky-500"
                              />
                              <span
                                className={cn(
                                  'text-xs leading-relaxed flex-1',
                                  task.done
                                    ? 'text-muted-foreground line-through'
                                    : 'text-foreground'
                                )}
                              >
                                {task.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </TabsContent>

          {/* ═══════════ TAB 5: PERFORMANCE COMMERCIALE ═══════════ */}
          <TabsContent value="performance">
            <AnimatePresence mode="wait">
              <motion.div
                key="performance"
                variants={tabContent}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                {/* KPI cards row */}
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 gap-4 sm:grid-cols-3"
                >
                  <motion.div variants={fadeIn} custom={0}>
                    <Card className="border-sky-500/20">
                      <CardContent className="flex items-start gap-4 p-5">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-500/10">
                          <Target className="h-5 w-5 text-sky-600" />
                        </div>
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Panier moyen</p>
                          <p className="mt-1 text-2xl font-bold tracking-tight">
                            285,000<span className="ml-1 text-sm font-normal text-muted-foreground">FCFA</span>
                          </p>
                          <p className="mt-0.5 text-[11px] text-green-600">+8% vs mois dernier</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                  <motion.div variants={fadeIn} custom={1}>
                    <Card className="border-green-500/20">
                      <CardContent className="flex items-start gap-4 p-5">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-500/10">
                          <Clock className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Délai moyen signature</p>
                          <p className="mt-1 text-2xl font-bold tracking-tight">
                            5.2<span className="ml-1 text-sm font-normal text-muted-foreground">jours</span>
                          </p>
                          <p className="mt-0.5 text-[11px] text-green-600">-1.3 jours vs mois dernier</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                  <motion.div variants={fadeIn} custom={2}>
                    <Card className="border-purple-500/20">
                      <CardContent className="flex items-start gap-4 p-5">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/10">
                          <Users className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Taux de rétention</p>
                          <p className="mt-1 text-2xl font-bold tracking-tight">
                            82<span className="ml-1 text-sm font-normal text-muted-foreground">%</span>
                          </p>
                          <p className="mt-0.5 text-[11px] text-green-600">+3% vs mois dernier</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>

                {/* Charts row */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
                  {/* Monthly sales bar chart - 3/5 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="lg:col-span-3"
                  >
                    <Card className="h-full">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-base">Ventes par mois</CardTitle>
                            <CardDescription>Performance commerciale sur 6 mois</CardDescription>
                          </div>
                          <Badge variant="outline" className="border-green-500/20 bg-green-500/5 text-green-600 text-xs">
                            <TrendingUp className="mr-1 h-3 w-3" />
                            +18.3%
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="h-72 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={performanceMonthly} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
                              <defs>
                                <linearGradient id="gradPerfBar" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor={NEXBIZ} stopOpacity={0.9} />
                                  <stop offset="100%" stopColor={NEXBIZ_LIGHT} stopOpacity={0.5} />
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                              <XAxis
                                dataKey="month"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: '#6B7280' }}
                              />
                              <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 11, fill: '#6B7280' }}
                                tickFormatter={(v: number) => `${(v / 1000000).toFixed(1)}M`}
                              />
                              <Tooltip content={<SalesTooltip />} />
                              <Bar
                                dataKey="ventes"
                                fill="url(#gradPerfBar)"
                                radius={[6, 6, 0, 0]}
                                maxBarSize={48}
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Conversion by source pie chart - 2/5 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="lg:col-span-2"
                  >
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle className="text-base">Conversion par source</CardTitle>
                        <CardDescription>Répartition des leads convertis</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col items-center gap-4 lg:flex-row">
                          <div className="h-52 w-52 shrink-0">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={conversionBySource}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={48}
                                  outerRadius={80}
                                  paddingAngle={3}
                                  dataKey="value"
                                  nameKey="name"
                                  stroke="none"
                                >
                                  {conversionBySource.map((entry, idx) => (
                                    <Cell key={idx} fill={entry.color} />
                                  ))}
                                </Pie>
                                <Tooltip
                                  formatter={(value: number) => `${value}%`}
                                  contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
                                />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                          <div className="flex flex-col gap-2.5 text-sm">
                            {conversionBySource.map((source) => (
                              <div key={source.name} className="flex items-center gap-2">
                                <span
                                  className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                                  style={{ backgroundColor: source.color }}
                                />
                                <span className="text-muted-foreground text-xs">{source.name}</span>
                                <span className="ml-auto text-xs font-semibold">{source.value}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                {/* Top clients by revenue - horizontal bar chart */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-base">Top clients par chiffre d&apos;affaires</CardTitle>
                          <CardDescription>Les 5 meilleurs clients en valeur</CardDescription>
                        </div>
                        <Badge variant="outline" className="border-sky-500/20 bg-sky-500/5 text-sky-600 text-xs">
                          <Users className="mr-1 h-3 w-3" />
                          Top 5
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={topClientsByRevenue}
                            layout="vertical"
                            margin={{ top: 4, right: 20, left: 10, bottom: 0 }}
                          >
                            <defs>
                              <linearGradient id="gradHorizBar" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor={NEXBIZ} stopOpacity={0.7} />
                                <stop offset="100%" stopColor={NEXBIZ_LIGHT} stopOpacity={1} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                            <XAxis
                              type="number"
                              axisLine={false}
                              tickLine={false}
                              tick={{ fontSize: 11, fill: '#6B7280' }}
                              tickFormatter={(v: number) => `${(v / 1000000).toFixed(1)}M`}
                            />
                            <YAxis
                              type="category"
                              dataKey="name"
                              axisLine={false}
                              tickLine={false}
                              tick={{ fontSize: 12, fill: '#374151' }}
                              width={120}
                            />
                            <Tooltip content={<RevenueTooltip />} />
                            <Bar
                              dataKey="revenue"
                              fill="url(#gradHorizBar)"
                              radius={[0, 6, 6, 0]}
                              maxBarSize={28}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
