'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Target,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

/* ═══════════════════════ BRAND COLORS ═══════════════════════════════ */

const FLOWA = '#FF6600';
const NEXBIZ = '#0EA5E9';
const IA = '#8B5CF6';

/* ═══════════════════════ ANIMATION CONFIG ════════════════════════════ */

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

/* ═══════════════════════ MOCK DATA ═══════════════════════════════════ */

// 12-month CA data with comparison
const caEvolution = [
  { month: 'Mai 25', ca: 1650000, precedent: 1420000 },
  { month: 'Jun 25', ca: 1780000, precedent: 1510000 },
  { month: 'Jul 25', ca: 1920000, precedent: 1580000 },
  { month: 'Aoû 25', ca: 1850000, precedent: 1650000 },
  { month: 'Sep 25', ca: 2050000, precedent: 1720000 },
  { month: 'Oct 25', ca: 2150000, precedent: 1800000 },
  { month: 'Nov 25', ca: 2280000, precedent: 1890000 },
  { month: 'Déc 25', ca: 2100000, precedent: 1780000 },
  { month: 'Jan 26', ca: 2350000, precedent: 1950000 },
  { month: 'Fév 26', ca: 2420000, precedent: 2020000 },
  { month: 'Mar 26', ca: 2480000, precedent: 2080000 },
  { month: 'Avr 26', ca: 2650000, precedent: 2150000 },
];

// Répartition revenus
const revenueBySource = [
  { name: 'Ventes directes', value: 40, color: FLOWA },
  { name: 'Campagnes', value: 25, color: NEXBIZ },
  { name: 'Références', value: 20, color: IA },
  { name: 'Autres', value: 15, color: '#10B981' },
];

// Performance commerciale 6 months
const commercialPerformance = [
  { month: 'Nov', devisEnvoyes: 28, devisAcceptes: 18 },
  { month: 'Déc', devisEnvoyes: 32, devisAcceptes: 22 },
  { month: 'Jan', devisEnvoyes: 35, devisAcceptes: 25 },
  { month: 'Fév', devisEnvoyes: 30, devisAcceptes: 21 },
  { month: 'Mar', devisEnvoyes: 38, devisAcceptes: 28 },
  { month: 'Avr', devisEnvoyes: 42, devisAcceptes: 32 },
];

// Santé financière Radar
const financialHealth = [
  { subject: 'Trésorerie', A: 82 },
  { subject: 'Créances', A: 65 },
  { subject: 'Dettes', A: 70 },
  { subject: 'Marge', A: 75 },
  { subject: 'Croissance', A: 88 },
];

// KPI cards
const kpiCards = [
  {
    title: 'Revenus',
    value: '2,450,000',
    unit: 'FCFA',
    change: '+12.5%',
    positive: true,
    icon: DollarSign,
    color: FLOWA,
    bgColor: 'bg-orange-500/10',
    textColor: 'text-orange-600',
  },
  {
    title: 'Dépenses',
    value: '1,680,000',
    unit: 'FCFA',
    change: '+3.2%',
    positive: false,
    icon: TrendingDown,
    color: '#EF4444',
    bgColor: 'bg-red-500/10',
    textColor: 'text-red-600',
  },
  {
    title: 'Marge',
    value: '31.4',
    unit: '%',
    change: '+2.1%',
    positive: true,
    icon: TrendingUp,
    color: '#16A34A',
    bgColor: 'bg-green-500/10',
    textColor: 'text-green-600',
  },
  {
    title: 'Clients',
    value: '47',
    unit: '',
    change: '+3',
    positive: true,
    icon: Users,
    color: NEXBIZ,
    bgColor: 'bg-sky-500/10',
    textColor: 'text-sky-600',
  },
  {
    title: 'Conversion',
    value: '68',
    unit: '%',
    change: '+5%',
    positive: true,
    icon: Target,
    color: IA,
    bgColor: 'bg-purple-500/10',
    textColor: 'text-purple-600',
  },
  {
    title: 'Score IA',
    value: '85',
    unit: '/100',
    change: '+7',
    positive: true,
    icon: Sparkles,
    color: IA,
    bgColor: 'bg-purple-500/10',
    textColor: 'text-purple-600',
  },
];

// AI Insights
const aiInsights = [
  {
    emoji: '📈',
    type: 'trend' as const,
    title: 'Tendance',
    text: 'Vos revenus augmentent de 12.5% ce trimestre',
    color: 'text-green-600',
    bg: 'bg-green-500/5',
    border: 'border-green-500/20',
  },
  {
    emoji: '⚠️',
    type: 'alert' as const,
    title: 'Alerte',
    text: 'Le délai de paiement moyen passe de 15j à 22j',
    color: 'text-orange-600',
    bg: 'bg-orange-500/5',
    border: 'border-orange-500/20',
  },
  {
    emoji: '💡',
    type: 'opportunity' as const,
    title: 'Opportunité',
    text: '3 clients potentiels identifiés par l\'IA',
    color: 'text-purple-600',
    bg: 'bg-purple-500/5',
    border: 'border-purple-500/20',
  },
];

// Comparison data
const comparisonData = [
  {
    metric: 'Paiements collectés',
    flowa: 85,
    nexbiz: 0,
    flowaLabel: '2,180,000 FCFA',
  },
  {
    metric: 'Relances réussies',
    flowa: 72,
    nexbiz: 0,
    flowaLabel: '18 sur 25',
  },
  {
    metric: 'Cashflow amélioré',
    flowa: 68,
    nexbiz: 0,
    flowaLabel: '+18.3%',
  },
  {
    metric: 'Clients acquis',
    flowa: 0,
    nexbiz: 78,
    nexbizLabel: '12 nouveaux',
  },
  {
    metric: 'Devis convertis',
    flowa: 0,
    nexbiz: 65,
    nexbizLabel: '68% taux',
  },
  {
    metric: 'CA généré',
    flowa: 0,
    nexbiz: 82,
    nexbizLabel: '2,450,000 FCFA',
  },
];

/* ═══════════════════════ CUSTOM TOOLTIPS ══════════════════════════════ */

function CATooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-white px-3 py-2 shadow-lg dark:bg-zinc-900">
      <p className="mb-1 text-xs font-semibold text-muted-foreground">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-xs font-medium" style={{ color: p.color }}>
          {p.dataKey === 'ca' ? 'CA actuel' : 'Période préc.'} : {Number(p.value).toLocaleString('fr-FR')} FCFA
        </p>
      ))}
    </div>
  );
}

function CommercialTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-white px-3 py-2 shadow-lg dark:bg-zinc-900">
      <p className="mb-1 text-xs font-semibold text-muted-foreground">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-xs font-medium" style={{ color: p.color }}>
          {p.dataKey === 'devisEnvoyes' ? 'Envoyés' : 'Acceptés'} : {p.value}
        </p>
      ))}
    </div>
  );
}

/* ═══════════════════════ MAIN COMPONENT ══════════════════════════════ */

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('12m');

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
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#0EA5E9] to-[#38BDF8] text-sm font-bold text-white shadow-sm">
            <BarChart3 className="h-4 w-4" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight sm:text-xl">Analytics &amp; Insights</h1>
            <p className="text-xs text-muted-foreground">Vue intelligente unifiée</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Tabs value={period} onValueChange={setPeriod}>
            <TabsList className="h-8">
              <TabsTrigger value="3m" className="text-xs px-2.5">3M</TabsTrigger>
              <TabsTrigger value="6m" className="text-xs px-2.5">6M</TabsTrigger>
              <TabsTrigger value="12m" className="text-xs px-2.5">12M</TabsTrigger>
            </TabsList>
          </Tabs>
          <Badge variant="outline" className="gap-1 border-purple-500/30 bg-purple-500/5 text-purple-600 text-xs">
            <Sparkles className="h-3 w-3" />
            IA Enhanced
          </Badge>
        </div>
      </motion.header>

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6">
        {/* ═══════════ KPI CARDS ═══════════ */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
        >
          {kpiCards.map((kpi, i) => {
            const Icon = kpi.icon;
            return (
              <motion.div key={kpi.title} variants={fadeIn} custom={i}>
                <Card className="relative overflow-hidden border">
                  <div
                    className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full opacity-15 blur-xl"
                    style={{ backgroundColor: kpi.color }}
                  />
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className={cn('flex h-7 w-7 items-center justify-center rounded-md', kpi.bgColor)}>
                        <Icon className="h-3.5 w-3.5" style={{ color: kpi.color }} />
                      </div>
                      <span
                        className={cn(
                          'inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold',
                          kpi.positive ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'
                        )}
                      >
                        {kpi.positive ? (
                          <ArrowUpRight className="h-3 w-3" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3" />
                        )}
                        {kpi.change}
                      </span>
                    </div>
                    <p className="text-lg font-bold tracking-tight sm:text-xl">
                      {kpi.value}
                      {kpi.unit && (
                        <span className="ml-0.5 text-[10px] font-normal text-muted-foreground">{kpi.unit}</span>
                      )}
                    </p>
                    <p className="text-[11px] text-muted-foreground">{kpi.title}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ═══════════ CHARTS GRID 2x2 ═══════════ */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6 lg:grid-cols-2"
        >
          {/* ─── Top-Left: Évolution CA (AreaChart) ─── */}
          <motion.div variants={fadeIn} custom={0}>
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Évolution CA</CardTitle>
                    <CardDescription>12 mois avec comparaison période précédente</CardDescription>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1.5">
                      <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: FLOWA }} />
                      CA actuel
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="inline-block h-2.5 w-2.5 rounded-full bg-gray-300" />
                      Période préc.
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={caEvolution} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="gradCA" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={FLOWA} stopOpacity={0.3} />
                          <stop offset="100%" stopColor={FLOWA} stopOpacity={0.02} />
                        </linearGradient>
                        <linearGradient id="gradPrecedent" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#9CA3AF" stopOpacity={0.15} />
                          <stop offset="100%" stopColor="#9CA3AF" stopOpacity={0.02} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fill: '#6B7280' }}
                        interval={1}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fill: '#6B7280' }}
                        tickFormatter={(v: number) => `${(v / 1000000).toFixed(1)}M`}
                      />
                      <Tooltip content={<CATooltip />} />
                      <Area
                        type="monotone"
                        dataKey="precedent"
                        stroke="#9CA3AF"
                        strokeWidth={1.5}
                        strokeDasharray="4 4"
                        fill="url(#gradPrecedent)"
                      />
                      <Area
                        type="monotone"
                        dataKey="ca"
                        stroke={FLOWA}
                        strokeWidth={2.5}
                        fill="url(#gradCA)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* ─── Top-Right: Répartition revenus (PieChart) ─── */}
          <motion.div variants={fadeIn} custom={1}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-base">Répartition revenus par source</CardTitle>
                <CardDescription>Ventes directes, campagnes, références, autres</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center gap-4 sm:flex-row">
                  <div className="h-56 w-56 shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={revenueBySource}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={85}
                          paddingAngle={3}
                          dataKey="value"
                          nameKey="name"
                          stroke="none"
                          label={({ name, value }: { name: string; value: number }) => `${value}%`}
                        >
                          {revenueBySource.map((entry, idx) => (
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
                  <div className="flex flex-col gap-3 text-sm">
                    {revenueBySource.map((entry) => (
                      <div key={entry.name} className="flex items-center gap-2.5">
                        <span
                          className="inline-block h-3 w-3 shrink-0 rounded-sm"
                          style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-xs text-muted-foreground">{entry.name}</span>
                        <span className="ml-auto text-xs font-bold">{entry.value}%</span>
                      </div>
                    ))}
                    <Separator className="my-1" />
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Total</span>
                      <span className="font-bold">2,450,000 FCFA</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* ─── Bottom-Left: Performance commerciale (BarChart) ─── */}
          <motion.div variants={fadeIn} custom={2}>
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Performance commerciale</CardTitle>
                    <CardDescription>Devis envoyés vs acceptés par mois</CardDescription>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1.5">
                      <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: NEXBIZ }} />
                      Envoyés
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#16A34A' }} />
                      Acceptés
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={commercialPerformance} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
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
                        tick={{ fontSize: 10, fill: '#6B7280' }}
                      />
                      <Tooltip content={<CommercialTooltip />} />
                      <Bar dataKey="devisEnvoyes" fill={NEXBIZ} radius={[4, 4, 0, 0]} barSize={28} />
                      <Bar dataKey="devisAcceptes" fill="#16A34A" radius={[4, 4, 0, 0]} barSize={28} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* ─── Bottom-Right: Santé financière (RadarChart) ─── */}
          <motion.div variants={fadeIn} custom={3}>
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Santé financière</CardTitle>
                    <CardDescription>Score sur 100 par indicateur clé</CardDescription>
                  </div>
                  <Badge variant="outline" className="border-purple-500/30 bg-purple-500/5 text-purple-600 text-[10px]">
                    Score global: 76/100
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={financialHealth}>
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fontSize: 11, fill: '#6B7280' }}
                      />
                      <PolarRadiusAxis
                        angle={90}
                        domain={[0, 100]}
                        tick={{ fontSize: 9, fill: '#9CA3AF' }}
                        tickCount={5}
                      />
                      <Radar
                        name="Score"
                        dataKey="A"
                        stroke={IA}
                        fill={IA}
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                      <Tooltip
                        formatter={(value: number) => `${value}/100`}
                        contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* ═══════════ AI INSIGHTS ═══════════ */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={5}
        >
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-purple-500/15">
              <Sparkles className="h-4 w-4 text-purple-500" />
            </div>
            <h2 className="text-base font-semibold">Insights IA</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {aiInsights.map((insight, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                custom={i}
              >
                <Card className={cn('border', insight.border, insight.bg)}>
                  <CardContent className="flex items-start gap-3 py-4">
                    <span className="mt-0.5 text-xl leading-none">{insight.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className={cn('text-xs font-bold uppercase tracking-wider mb-1', insight.color)}>
                        {insight.title}
                      </p>
                      <p className="text-sm leading-snug">{insight.text}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ═══════════ COMPARISON: Flowa vs NexBiz ═══════════ */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={6}
        >
          <Card className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-[#FF6600]/15 to-[#0EA5E9]/15">
                    <BarChart3 className="h-4 w-4" style={{ color: IA }} />
                  </div>
                  <div>
                    <CardTitle className="text-base">Flowa vs NexBiz Performance</CardTitle>
                    <CardDescription>Comparaison des métriques clés par module</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: FLOWA }} />
                    Flowa
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: NEXBIZ }} />
                    NexBiz
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {comparisonData.map((item) => {
                  const isFlowa = item.flowa > 0;
                  const barValue = isFlowa ? item.flowa : item.nexbiz;
                  const barColor = isFlowa ? FLOWA : NEXBIZ;
                  const label = isFlowa ? item.flowaLabel : item.nexbizLabel;

                  return (
                    <div key={item.metric} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-foreground/80">{item.metric}</span>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={cn(
                              'text-[10px] px-1.5 py-0',
                              isFlowa
                                ? 'border-orange-500/30 bg-orange-500/5 text-orange-600'
                                : 'border-sky-500/30 bg-sky-500/5 text-sky-600'
                            )}
                          >
                            {isFlowa ? 'Flowa' : 'NexBiz'}
                          </Badge>
                          <span className="text-xs font-semibold" style={{ color: barColor }}>
                            {label}
                          </span>
                        </div>
                      </div>
                      <div className="relative h-3 w-full rounded-full bg-muted">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${barValue}%` }}
                          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute inset-y-0 left-0 rounded-full"
                          style={{
                            backgroundColor: barColor,
                            opacity: 0.85,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
