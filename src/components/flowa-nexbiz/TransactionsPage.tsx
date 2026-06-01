'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDownLeft,
  ArrowUpRight,
  Clock,
  Plus,
  Calendar,
  Filter,
  Smartphone,
  Banknote,
  Building2,
  CreditCard,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowLeftRight,
  TrendingUp,
  TrendingDown,
  Wallet,
  Search,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from 'recharts';
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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

/* ═══════════════════════ TYPES ══════════════════════════════════════ */

type TxType = 'Reçu' | 'Envoyé' | 'En attente';
type TxMethod = 'Orange Money' | 'Espèces' | 'Virement';
type TxStatus = 'Complété' | 'En cours' | 'Échoué';

interface Transaction {
  id: number;
  date: string;
  ref: string;
  clientFournisseur: string;
  montant: number;
  type: TxType;
  methode: TxMethod;
  statut: TxStatus;
}

/* ═══════════════════════ MOCK DATA ═══════════════════════════════════ */

const transactions: Transaction[] = [
  {
    id: 1,
    date: '03 Mars 2026',
    ref: 'TXN-2026-0301',
    clientFournisseur: 'Restaurant Le Baobab',
    montant: 200000,
    type: 'Reçu',
    methode: 'Orange Money',
    statut: 'Complété',
  },
  {
    id: 2,
    date: '02 Mars 2026',
    ref: 'TXN-2026-0302',
    clientFournisseur: 'Fournisseur Farine CI',
    montant: 175000,
    type: 'Envoyé',
    methode: 'Virement',
    statut: 'Complété',
  },
  {
    id: 3,
    date: '02 Mars 2026',
    ref: 'TXN-2026-0303',
    clientFournisseur: 'Commerce K-Market',
    montant: 280000,
    type: 'Reçu',
    methode: 'Orange Money',
    statut: 'Complété',
  },
  {
    id: 4,
    date: '01 Mars 2026',
    ref: 'TXN-2026-0304',
    clientFournisseur: 'Transport Express IT',
    montant: 95000,
    type: 'Reçu',
    methode: 'Espèces',
    statut: 'Complété',
  },
  {
    id: 5,
    date: '01 Mars 2026',
    ref: 'TXN-2026-0305',
    clientFournisseur: 'Alu & Bois Menuiserie',
    montant: 350000,
    type: 'Envoyé',
    methode: 'Virement',
    statut: 'En cours',
  },
  {
    id: 6,
    date: '28 Fév 2026',
    ref: 'TXN-2026-0228',
    clientFournisseur: 'Salon Beauté Éclat',
    montant: 120000,
    type: 'En attente',
    methode: 'Orange Money',
    statut: 'En cours',
  },
  {
    id: 7,
    date: '27 Fév 2026',
    ref: 'TXN-2026-0227',
    clientFournisseur: 'Cyber & Print Services',
    montant: 85000,
    type: 'Reçu',
    methode: 'Orange Money',
    statut: 'Complété',
  },
  {
    id: 8,
    date: '26 Fév 2026',
    ref: 'TXN-2026-0226',
    clientFournisseur: 'Boulangerie Pain d\'Or',
    montant: 200000,
    type: 'Reçu',
    methode: 'Espèces',
    statut: 'Complété',
  },
  {
    id: 9,
    date: '25 Fév 2026',
    ref: 'TXN-2026-0225',
    clientFournisseur: 'Assurance AXA CI',
    montant: 150000,
    type: 'Envoyé',
    methode: 'Virement',
    statut: 'Complété',
  },
  {
    id: 10,
    date: '24 Fév 2026',
    ref: 'TXN-2026-0224',
    clientFournisseur: 'Mode & Style Boutique',
    montant: 770000,
    type: 'En attente',
    methode: 'Orange Money',
    statut: 'Échoué',
  },
];

const chartData = [
  { month: 'Oct', revenus: 1850000, depenses: 920000 },
  { month: 'Nov', revenus: 2100000, depenses: 1080000 },
  { month: 'Déc', revenus: 1980000, depenses: 990000 },
  { month: 'Jan', revenus: 2250000, depenses: 1150000 },
  { month: 'Fév', revenus: 2180000, depenses: 1020000 },
  { month: 'Mar', revenus: 2450000, depenses: 890000 },
];

/* ═══════════════════════ STATUS STYLES ═══════════════════════════════ */

const typeStyles: Record<TxType, { bg: string; text: string; icon: React.ReactNode }> = {
  'Reçu': {
    bg: 'bg-green-500/10',
    text: 'text-green-700',
    icon: <ArrowDownLeft className="h-3.5 w-3.5" />,
  },
  'Envoyé': {
    bg: 'bg-red-500/10',
    text: 'text-red-700',
    icon: <ArrowUpRight className="h-3.5 w-3.5" />,
  },
  'En attente': {
    bg: 'bg-amber-500/10',
    text: 'text-amber-700',
    icon: <Clock className="h-3.5 w-3.5" />,
  },
};

const methodIcons: Record<TxMethod, { icon: React.ReactNode; color: string }> = {
  'Orange Money': {
    icon: <Smartphone className="h-3.5 w-3.5" />,
    color: FLOWA,
  },
  'Espèces': {
    icon: <Banknote className="h-3.5 w-3.5" />,
    color: '#16A34A',
  },
  'Virement': {
    icon: <Building2 className="h-3.5 w-3.5" />,
    color: NEXBIZ,
  },
};

const statusStyles: Record<TxStatus, { bg: string; text: string; icon: React.ReactNode }> = {
  'Complété': {
    bg: 'bg-green-500/10',
    text: 'text-green-700',
    icon: <CheckCircle2 className="h-3 w-3" />,
  },
  'En cours': {
    bg: 'bg-amber-500/10',
    text: 'text-amber-700',
    icon: <AlertCircle className="h-3 w-3" />,
  },
  'Échoué': {
    bg: 'bg-red-500/10',
    text: 'text-red-700',
    icon: <XCircle className="h-3 w-3" />,
  },
};

/* ═══════════════════════ HELPERS ═════════════════════════════════════ */

function formatFCFA(amount: number): string {
  return amount.toLocaleString('fr-FR') + ' FCFA';
}

/* ═══════════════════════ CHART TOOLTIP ══════════════════════════════ */

function ChartTooltip({
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
          {p.dataKey === 'revenus' ? 'Revenus' : 'Dépenses'} : {Number(p.value).toLocaleString('fr-FR')} FCFA
        </p>
      ))}
    </div>
  );
}

/* ═══════════════════════ MAIN COMPONENT ══════════════════════════════ */

export default function TransactionsPage() {
  const { setView } = useNavStore();
  const [filter, setFilter] = useState<'Tous' | TxType>('Tous');
  const [search, setSearch] = useState('');

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchSearch =
        tx.clientFournisseur.toLowerCase().includes(search.toLowerCase()) ||
        tx.ref.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === 'Tous' || tx.type === filter;
      return matchSearch && matchFilter;
    });
  }, [search, filter]);

  const totalRecu = useMemo(
    () => transactions.filter((t) => t.type === 'Reçu').reduce((s, t) => s + t.montant, 0),
    []
  );
  const totalEnvoye = useMemo(
    () => transactions.filter((t) => t.type === 'Envoyé').reduce((s, t) => s + t.montant, 0),
    []
  );
  const totalEnAttente = useMemo(
    () => transactions.filter((t) => t.type === 'En attente').reduce((s, t) => s + t.montant, 0),
    []
  );
  const totalOrangeMoney = useMemo(
    () => transactions.filter((t) => t.methode === 'Orange Money').reduce((s, t) => s + t.montant, 0),
    []
  );
  const orangeMoneyPercent = useMemo(
    () =>
      Math.round(
        (totalOrangeMoney / (totalRecu + totalEnvoye)) * 100
      ),
    [totalOrangeMoney, totalRecu, totalEnvoye]
  );

  const summaryCards = [
    {
      label: 'Total reçu',
      value: formatFCFA(totalRecu),
      icon: ArrowDownLeft,
      color: '#16A34A',
      bgColor: 'bg-green-500/10',
      change: '+12%',
      changeLabel: 'ce mois',
    },
    {
      label: 'Total envoyé',
      value: formatFCFA(totalEnvoye),
      icon: ArrowUpRight,
      color: '#DC2626',
      bgColor: 'bg-red-500/10',
      change: '-3%',
      changeLabel: 'ce mois',
    },
    {
      label: 'En attente',
      value: formatFCFA(totalEnAttente),
      icon: Clock,
      color: '#D97706',
      bgColor: 'bg-amber-500/10',
      change: '2',
      changeLabel: 'transactions',
    },
    {
      label: 'Via Orange Money',
      value: formatFCFA(totalOrangeMoney),
      icon: Smartphone,
      color: FLOWA,
      bgColor: 'bg-orange-500/10',
      change: `${orangeMoneyPercent}%`,
      changeLabel: 'des paiements',
    },
  ];

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
            <ArrowLeftRight className="h-4 w-4" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight sm:text-xl">Transactions & Paiements</h1>
            <p className="text-xs text-muted-foreground">Flowa × NexBiz — Suivi financier</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Date range picker mockup */}
          <div className="hidden sm:flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>01 Fév — 03 Mar 2026</span>
          </div>
          <div className="relative">
            <Filter className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'Tous' | TxType)}
              className="h-9 rounded-md border border-input bg-background pl-8 pr-8 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="Tous">Tous</option>
              <option value="Reçu">Reçu</option>
              <option value="Envoyé">Envoyé</option>
              <option value="En attente">En attente</option>
            </select>
          </div>
          <Button className="gap-1.5 text-xs font-semibold" style={{ backgroundColor: FLOWA }}>
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Nouveau paiement</span>
          </Button>
        </div>
      </motion.header>

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6">
        {/* ═══════════ SUMMARY CARDS ═══════════ */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {summaryCards.map((card, i) => {
            const CardIcon = card.icon;
            const isPositive = card.change.startsWith('+') || card.label === 'Via Orange Money';
            return (
              <motion.div key={card.label} variants={fadeIn} custom={i}>
                <Card className="relative overflow-hidden border">
                  <div
                    className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-20 blur-2xl"
                    style={{ backgroundColor: card.color }}
                  />
                  <CardHeader className="pb-0">
                    <CardDescription className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {card.label}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between gap-2">
                      <div>
                        <p className="text-2xl font-bold tracking-tight">{card.value}</p>
                        <div className="mt-1 flex items-center gap-1.5">
                          <span
                            className={cn(
                              'inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-semibold',
                              isPositive ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'
                            )}
                          >
                            {isPositive ? (
                              <TrendingUp className="h-3 w-3" />
                            ) : (
                              <TrendingDown className="h-3 w-3" />
                            )}
                            {card.change}
                          </span>
                          <span className="text-[11px] text-muted-foreground">{card.changeLabel}</span>
                        </div>
                      </div>
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${card.color}15` }}
                      >
                        <CardIcon className="h-5 w-5" style={{ color: card.color }} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ═══════════ TRANSACTION TABLE ═══════════ */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={1}>
          <Card className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Historique des transactions</CardTitle>
                  <CardDescription>{filteredTransactions.length} transaction(s)</CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-8 w-48 pl-8 text-xs"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="pl-4">Date</TableHead>
                    <TableHead>Réf</TableHead>
                    <TableHead>Client / Fournisseur</TableHead>
                    <TableHead className="text-right">Montant</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Méthode</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right pr-4">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((tx, i) => {
                    const typeStyle = typeStyles[tx.type];
                    const methodStyle = methodIcons[tx.methode];
                    const statusStyle = statusStyles[tx.statut];
                    return (
                      <motion.tr
                        key={tx.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.03 }}
                        className="hover:bg-muted/50 transition-colors cursor-pointer group"
                      >
                        <TableCell className="pl-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-sm">{tx.date}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">{tx.ref}</code>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm font-medium">{tx.clientFournisseur}</span>
                        </TableCell>
                        <TableCell className="text-right">
                          <span
                            className={cn(
                              'text-sm font-bold',
                              tx.type === 'Reçu'
                                ? 'text-green-600'
                                : tx.type === 'Envoyé'
                                ? 'text-red-600'
                                : 'text-amber-600'
                            )}
                          >
                            {tx.type === 'Reçu' ? '+' : tx.type === 'Envoyé' ? '-' : ''}{formatFCFA(tx.montant)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={cn('gap-1 text-xs font-medium', typeStyle.bg, typeStyle.text)}
                          >
                            {typeStyle.icon}
                            {tx.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            <span style={{ color: methodStyle.color }}>{methodStyle.icon}</span>
                            <span className="text-xs">{tx.methode}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={cn('gap-1 text-xs font-medium', statusStyle.bg, statusStyle.text)}
                          >
                            {statusStyle.icon}
                            {tx.statut}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right pr-4">
                          <Button variant="ghost" size="sm" className="h-7 text-xs">
                            Détails
                          </Button>
                        </TableCell>
                      </motion.tr>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        {/* ═══════════ CHART + ORANGE MONEY PANEL ═══════════ */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Revenue vs Expenses Area Chart */}
          <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={2} className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Revenus vs Dépenses</CardTitle>
                    <CardDescription>Évolution sur 6 mois</CardDescription>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1.5">
                      <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: FLOWA }} />
                      Revenus
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="inline-block h-2.5 w-2.5 rounded-full bg-gray-400" />
                      Dépenses
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="txnGradRevenus" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={FLOWA} stopOpacity={0.3} />
                          <stop offset="100%" stopColor={FLOWA} stopOpacity={0.02} />
                        </linearGradient>
                        <linearGradient id="txnGradDepenses" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#9CA3AF" stopOpacity={0.25} />
                          <stop offset="100%" stopColor="#9CA3AF" stopOpacity={0.02} />
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
                      <RechartsTooltip content={<ChartTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="revenus"
                        stroke={FLOWA}
                        strokeWidth={2.5}
                        fill="url(#txnGradRevenus)"
                      />
                      <Area
                        type="monotone"
                        dataKey="depenses"
                        stroke="#9CA3AF"
                        strokeWidth={2}
                        fill="url(#txnGradDepenses)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Orange Money Integration Panel */}
          <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={3}>
            <Card className="h-full border-2" style={{ borderColor: `${FLOWA}30` }}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${FLOWA}15` }}
                  >
                    <Smartphone className="h-5 w-5" style={{ color: FLOWA }} />
                  </div>
                  <div>
                    <CardTitle className="text-base">Orange Money</CardTitle>
                    <CardDescription>Intégration paiement mobile</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Connection Status */}
                <div className="flex items-center gap-2 rounded-lg bg-green-500/10 px-4 py-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-semibold text-green-700">Connecté</p>
                    <p className="text-xs text-green-600/80">API Orange Money active</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Paiements ce mois</span>
                    <span className="text-sm font-bold">{formatFCFA(totalOrangeMoney)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">% des transactions</span>
                    <span className="text-sm font-bold" style={{ color: FLOWA }}>
                      {orangeMoneyPercent}%
                    </span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Transactions Orange Money</span>
                    <span className="text-sm font-bold">
                      {transactions.filter((t) => t.methode === 'Orange Money').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Taux de succès</span>
                    <span className="text-sm font-bold text-green-600">
                      {Math.round(
                        (transactions.filter(
                          (t) => t.methode === 'Orange Money' && t.statut === 'Complété'
                        ).length /
                          Math.max(
                            transactions.filter((t) => t.methode === 'Orange Money').length,
                            1
                          )) *
                          100
                      )}
                      %
                    </span>
                  </div>
                </div>

                <Separator />

                {/* Percentage bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Part des paiements via Orange Money</span>
                    <span className="font-semibold" style={{ color: FLOWA }}>
                      {orangeMoneyPercent}%
                    </span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: FLOWA }}
                      initial={{ width: 0 }}
                      animate={{ width: `${orangeMoneyPercent}%` }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
                    />
                  </div>
                </div>

                <Separator />

                {/* Recent OM transactions */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Derniers paiements OM
                  </p>
                  {transactions
                    .filter((t) => t.methode === 'Orange Money')
                    .slice(0, 3)
                    .map((tx, idx) => (
                      <motion.div
                        key={tx.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + idx * 0.08 }}
                        className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2"
                      >
                        <div className="flex items-center gap-2">
                          {tx.type === 'Reçu' ? (
                            <ArrowDownLeft className="h-3.5 w-3.5 text-green-600" />
                          ) : (
                            <ArrowUpRight className="h-3.5 w-3.5 text-red-500" />
                          )}
                          <div>
                            <p className="text-xs font-medium">{tx.clientFournisseur}</p>
                            <p className="text-[10px] text-muted-foreground">{tx.date}</p>
                          </div>
                        </div>
                        <span
                          className={cn(
                            'text-xs font-bold',
                            tx.type === 'Reçu' ? 'text-green-600' : 'text-red-500'
                          )}
                        >
                          {tx.type === 'Reçu' ? '+' : '-'}{formatFCFA(tx.montant)}
                        </span>
                      </motion.div>
                    ))}
                </div>

                <Button
                  className="w-full gap-2 text-xs font-semibold"
                  style={{ backgroundColor: FLOWA }}
                >
                  <Wallet className="h-4 w-4" />
                  Voir tous les paiements Orange Money
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
