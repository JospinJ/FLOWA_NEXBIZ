'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  AlertTriangle,
  Users,
  Bell,
  FileText,
  Wallet,
  Megaphone,
  Bot,
  Calendar,
  ArrowRight,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
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
  CardAction,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useNavStore } from '@/lib/nav-store';

/* ═══════════════════════ BRAND COLORS ═══════════════════════════════ */

const FLOWA = '#FF6600';
const NEXBIZ = '#0EA5E9';
const IA = '#8B5CF6';

/* ═══════════════════════ ANIMATION CONFIG ════════════════════════════ */

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

/* ═══════════════════════ MOCK DATA ═══════════════════════════════════ */

const revenueMonthly = [
  { month: 'Oct', revenus: 1850000, depenses: 920000 },
  { month: 'Nov', revenus: 2100000, depenses: 1080000 },
  { month: 'Déc', revenus: 1980000, depenses: 990000 },
  { month: 'Jan', revenus: 2250000, depenses: 1150000 },
  { month: 'Fév', revenus: 2180000, depenses: 1020000 },
  { month: 'Mar', revenus: 2450000, depenses: 890000 },
];

const debtByClient = [
  { name: 'M. Diallo', amount: 320000 },
  { name: 'Mme Koné', amount: 250000 },
  { name: 'Restaurant Baobab', amount: 180000 },
  { name: 'Sarl Techno+', amount: 95000 },
  { name: 'Autres', amount: 45000 },
];

const PIE_COLORS = [FLOWA, NEXBIZ, '#F59E0B', '#10B981', '#6B7280'];

const kpiCards = [
  {
    title: 'Revenus mensuels',
    value: '2 450 000',
    unit: 'FCFA',
    change: '+12.5%',
    changeLabel: 'vs mois dernier',
    icon: TrendingUp,
    color: '#16A34A',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
    textColor: 'text-green-600',
    sparkData: [
      { v: 1600 }, { v: 1800 }, { v: 1720 }, { v: 1900 }, { v: 2100 }, { v: 2200 }, { v: 2450 },
    ],
  },
  {
    title: 'Dettes en cours',
    value: '890 000',
    unit: 'FCFA',
    change: '-5.2%',
    changeLabel: 'vs mois dernier',
    icon: AlertTriangle,
    color: '#EA580C',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20',
    textColor: 'text-orange-600',
    sparkData: [
      { v: 1200 }, { v: 1100 }, { v: 1050 }, { v: 980 }, { v: 950 }, { v: 920 }, { v: 890 },
    ],
  },
  {
    title: 'Cashflow net',
    value: '1 560 000',
    unit: 'FCFA',
    change: '+18.3%',
    changeLabel: 'vs mois dernier',
    icon: TrendingUp,
    color: '#16A34A',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
    textColor: 'text-green-600',
    sparkData: [
      { v: 930 }, { v: 1020 }, { v: 990 }, { v: 1100 }, { v: 1230 }, { v: 1350 }, { v: 1560 },
    ],
  },
  {
    title: 'Clients actifs',
    value: '47',
    unit: '',
    change: '+3',
    changeLabel: 'ce mois',
    icon: Users,
    color: '#0EA5E9',
    bgColor: 'bg-sky-500/10',
    borderColor: 'border-sky-500/20',
    textColor: 'text-sky-600',
    sparkData: [
      { v: 32 }, { v: 35 }, { v: 36 }, { v: 39 }, { v: 41 }, { v: 44 }, { v: 47 },
    ],
  },
];

const iaAlerts = [
  {
    emoji: '\u26a0\ufe0f',
    title: 'Risque de d\u00e9couvert dans 5 jours',
    desc: 'Tr\u00e9sorerie pr\u00e9vue : 120 000 FCFA',
    action: 'Voir le plan',
    variant: 'warning' as const,
  },
  {
    emoji: '\ud83d\udca1',
    title: '3 clients en retard de paiement',
    desc: 'Relance automatique recommand\u00e9e',
    action: 'Lancer relances',
    variant: 'info' as const,
  },
  {
    emoji: '\ud83d\udcc8',
    title: 'Opportunit\u00e9 : +15% de ventes',
    desc: 'Campagne SMS cibl\u00e9e recommand\u00e9e',
    action: 'Cr\u00e9er campagne',
    variant: 'success' as const,
  },
  {
    emoji: '\ud83c\udfaf',
    title: 'Score cr\u00e9dit PME : 78/100',
    desc: 'Microcr\u00e9dit de 500 000 FCFA disponible',
    action: 'Voir offre',
    variant: 'purple' as const,
  },
];

const recentActivity = [
  {
    source: 'NexBiz',
    text: 'Nouveau client ajout\u00e9 \u2014 M. Diallo, Restaurant Le Baobab',
    time: 'Il y a 12 min',
    icon: Users,
  },
  {
    source: 'Flowa',
    text: 'Paiement re\u00e7u \u2014 150 000 FCFA via Orange Money',
    time: 'Il y a 34 min',
    icon: Wallet,
  },
  {
    source: 'NexBiz',
    text: 'Devis envoy\u00e9 \u2014 350 000 FCFA \u00e0 Mme Kon\u00e9',
    time: 'Il y a 1h',
    icon: FileText,
  },
  {
    source: 'Flowa',
    text: 'Relance automatique \u2014 M. Tour\u00e9, facture en retard J+15',
    time: 'Il y a 2h',
    icon: Bell,
  },
  {
    source: 'IA',
    text: 'Recommandation \u2014 Augmenter le d\u00e9lai de paiement \u00e0 30j pour fid\u00e9liser',
    time: 'Il y a 3h',
    icon: Sparkles,
  },
];

const quickActions = [
  { label: 'Nouveau devis', icon: FileText, color: NEXBIZ, view: 'invoices' as const },
  { label: 'Enregistrer d\u00e9pense', icon: Wallet, color: FLOWA, view: 'treasury' as const },
  { label: 'Lancer campagne', icon: Megaphone, color: NEXBIZ, view: 'campaigns' as const },
  { label: 'Voir relances', icon: Bell, color: FLOWA, view: 'transactions' as const },
  { label: 'Parler \u00e0 l\u2019IA', icon: Bot, color: IA, view: 'ai-assistant' as const },
];

/* ═══════════════════════ SUB-COMPONENTS ══════════════════════════════ */

/** Mini sparkline using recharts LineChart */
function Sparkline({ data, color }: { data: { v: number }[]; color: string }) {
  return (
    <ResponsiveContainer width="100%" height={48}>
      <LineChart data={data} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
        <Line
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

/** Custom tooltip for the revenue chart */
function RevenueTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-white px-3 py-2 shadow-lg dark:bg-zinc-900">
      <p className="mb-1 text-xs font-semibold text-muted-foreground">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-xs font-medium" style={{ color: p.color }}>
          {p.dataKey === 'revenus' ? 'Revenus' : 'D\u00e9penses'} : {Number(p.value).toLocaleString('fr-FR')} FCFA
        </p>
      ))}
    </div>
  );
}

/** Custom tooltip for debt chart */
function DebtTooltip({ active, payload }: { active?: boolean; payload?: Array<{ value: number; name: string }> }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-white px-3 py-2 shadow-lg dark:bg-zinc-900">
      <p className="text-xs font-medium">{payload[0].name}</p>
      <p className="text-xs font-semibold" style={{ color: FLOWA }}>
        {Number(payload[0].value).toLocaleString('fr-FR')} FCFA
      </p>
    </div>
  );
}

/* ═══════════════════════ ALERT VARIANT MAP ════════════════════════════ */

const alertVariantStyles = {
  warning: {
    border: 'border-orange-500/30',
    bg: 'bg-orange-500/5',
    iconBg: 'bg-orange-500/15',
    badge: 'bg-orange-500/15 text-orange-600',
    btnBg: 'bg-orange-500 hover:bg-orange-600',
  },
  info: {
    border: 'border-sky-500/30',
    bg: 'bg-sky-500/5',
    iconBg: 'bg-sky-500/15',
    badge: 'bg-sky-500/15 text-sky-600',
    btnBg: 'bg-sky-500 hover:bg-sky-600',
  },
  success: {
    border: 'border-green-500/30',
    bg: 'bg-green-500/5',
    iconBg: 'bg-green-500/15',
    badge: 'bg-green-500/15 text-green-600',
    btnBg: 'bg-green-500 hover:bg-green-600',
  },
  purple: {
    border: 'border-purple-500/30',
    bg: 'bg-purple-500/5',
    iconBg: 'bg-purple-500/15',
    badge: 'bg-purple-500/15 text-purple-600',
    btnBg: 'bg-purple-500 hover:bg-purple-600',
  },
};

const sourceBadgeMap: Record<string, { bg: string; text: string; border: string }> = {
  Flowa: { bg: 'bg-orange-500/10', text: 'text-orange-600', border: 'border-orange-500/20' },
  NexBiz: { bg: 'bg-sky-500/10', text: 'text-sky-600', border: 'border-sky-500/20' },
  IA: { bg: 'bg-purple-500/10', text: 'text-purple-600', border: 'border-purple-500/20' },
};

/* ═══════════════════════ MAIN DASHBOARD ══════════════════════════════ */

export default function Dashboard() {
  const setView = useNavStore((s) => s.setView);

  const today = useMemo(() => {
    const d = new Date();
    return d.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, []);

  /* ─── Pie chart data with formatted labels ─── */
  const pieData = useMemo(
    () =>
      debtByClient.map((d) => ({
        ...d,
        label: `${d.name}: ${(d.amount / 1000).toFixed(0)}K`,
      })),
    [],
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
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#FF6600] to-[#FF8533] text-sm font-bold text-white shadow-sm">
            F&times;N
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight sm:text-xl">Dashboard Unifi&eacute;</h1>
            <p className="text-xs capitalize text-muted-foreground">{today}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <button className="relative rounded-full p-2 transition-colors hover:bg-muted">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              3
            </span>
          </button>
          {/* Avatar */}
          <Avatar className="h-9 w-9 cursor-pointer transition-shadow hover:shadow-md">
            <AvatarFallback className="bg-gradient-to-br from-[#FF6600] to-amber-400 text-xs font-bold text-white">
              AD
            </AvatarFallback>
          </Avatar>
        </div>
      </motion.header>

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6">
        {/* ═══════════ KPI CARDS ═══════════ */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {kpiCards.map((kpi, i) => {
            const Icon = kpi.icon;
            const isPositive = kpi.change.startsWith('+');
            return (
              <motion.div key={kpi.title} variants={fadeIn} custom={i}>
                <Card className={cn('relative overflow-hidden border', kpi.borderColor)}>
                  {/* Glow effect */}
                  <div
                    className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-20 blur-2xl"
                    style={{ backgroundColor: kpi.color }}
                  />
                  <CardHeader className="pb-0">
                    <CardDescription className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {kpi.title}
                    </CardDescription>
                    <CardAction>
                      <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg', kpi.bgColor)}>
                        <Icon className="h-4 w-4" style={{ color: kpi.color }} />
                      </div>
                    </CardAction>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-end justify-between gap-2">
                      <div>
                        <p className="text-2xl font-bold tracking-tight">
                          {kpi.value}
                          {kpi.unit && (
                            <span className="ml-1 text-sm font-normal text-muted-foreground">{kpi.unit}</span>
                          )}
                        </p>
                        <div className="mt-1 flex items-center gap-1.5">
                          <span
                            className={cn(
                              'inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-semibold',
                              isPositive ? 'bg-green-500/10 text-green-600' : 'bg-orange-500/10 text-orange-600',
                            )}
                          >
                            {isPositive ? (
                              <TrendingUp className="h-3 w-3" />
                            ) : (
                              <AlertTriangle className="h-3 w-3" />
                            )}
                            {kpi.change}
                          </span>
                          <span className="text-[11px] text-muted-foreground">{kpi.changeLabel}</span>
                        </div>
                      </div>
                      <div className="h-12 w-20 shrink-0">
                        <Sparkline data={kpi.sparkData} color={kpi.color} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ═══════════ MAIN CHARTS ═══════════ */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6 lg:grid-cols-5"
        >
          {/* Revenue & Cashflow Area Chart — left 3/5 */}
          <motion.div variants={fadeIn} custom={0} className="lg:col-span-3">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Revenus & D&eacute;penses</CardTitle>
                    <CardDescription>&Eacute;volution sur 6 mois</CardDescription>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1.5">
                      <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: FLOWA }} />
                      Revenus
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="inline-block h-2.5 w-2.5 rounded-full bg-gray-400" />
                      D&eacute;penses
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueMonthly} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="gradRevenus" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={FLOWA} stopOpacity={0.3} />
                          <stop offset="100%" stopColor={FLOWA} stopOpacity={0.02} />
                        </linearGradient>
                        <linearGradient id="gradDepenses" x1="0" y1="0" x2="0" y2="1">
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
                      <Tooltip content={<RevenueTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="revenus"
                        stroke={FLOWA}
                        strokeWidth={2.5}
                        fill="url(#gradRevenus)"
                      />
                      <Area
                        type="monotone"
                        dataKey="depenses"
                        stroke="#9CA3AF"
                        strokeWidth={2}
                        fill="url(#gradDepenses)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Debt Distribution — right 2/5 */}
          <motion.div variants={fadeIn} custom={1} className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-base">R&eacute;partition des dettes</CardTitle>
                <CardDescription>Par client &mdash; 890 000 FCFA total</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center gap-4 lg:flex-row">
                  {/* Pie Chart */}
                  <div className="h-52 w-52 shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={48}
                          outerRadius={80}
                          paddingAngle={3}
                          dataKey="amount"
                          nameKey="name"
                          stroke="none"
                        >
                          {pieData.map((_, idx) => (
                            <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value: number) => `${value.toLocaleString('fr-FR')} FCFA`}
                          contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  {/* Legend */}
                  <div className="flex flex-col gap-2 text-sm">
                    {debtByClient.map((d, idx) => (
                      <div key={d.name} className="flex items-center gap-2">
                        <span
                          className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                          style={{ backgroundColor: PIE_COLORS[idx] }}
                        />
                        <span className="text-muted-foreground">{d.name}</span>
                        <span className="ml-auto font-semibold">
                          {(d.amount / 1000).toFixed(0)}K
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* ═══════════ IA ALERTS ═══════════ */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={2}>
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-purple-500/15">
              <Sparkles className="h-4 w-4 text-purple-500" />
            </div>
            <h2 className="text-base font-semibold">Alertes IA</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {iaAlerts.map((alert, i) => {
              const s = alertVariantStyles[alert.variant];
              return (
                <motion.div
                  key={i}
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                >
                  <Card className={cn('border', s.border, s.bg)}>
                    <CardContent className="flex items-start gap-3 py-4">
                      <span className="mt-0.5 text-xl leading-none">{alert.emoji}</span>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-semibold leading-snug">{alert.title}</p>
                        <p className="text-xs text-muted-foreground">{alert.desc}</p>
                      </div>
                      <Button
                        size="sm"
                        className={cn(
                          'shrink-0 text-xs font-semibold text-white shadow-sm',
                          s.btnBg,
                        )}
                      >
                        {alert.action}
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ═══════════ RECENT ACTIVITY + QUICK ACTIONS ═══════════ */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Activity Feed — 2/3 */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={3}
            className="lg:col-span-2"
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Activit&eacute; r&eacute;cente</CardTitle>
                  <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                    Tout voir <ChevronRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative space-y-0">
                  {/* Timeline line */}
                  <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border" />

                  {recentActivity.map((item, i) => {
                    const SourceIcon = item.icon;
                    const badgeStyle = sourceBadgeMap[item.source];
                    return (
                      <div
                        key={i}
                        className="group relative flex items-start gap-3 py-3 transition-colors hover:bg-muted/40 rounded-md px-1"
                      >
                        {/* Timeline dot */}
                        <div className="relative z-10 mt-1 flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border-2 border-background bg-white shadow-sm">
                          <SourceIcon
                            className="h-3.5 w-3.5"
                            style={{
                              color:
                                item.source === 'Flowa'
                                  ? FLOWA
                                  : item.source === 'NexBiz'
                                  ? NEXBIZ
                                  : IA,
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <Badge
                              variant="outline"
                              className={cn(
                                'px-1.5 py-0 text-[10px] font-semibold',
                                badgeStyle.bg,
                                badgeStyle.text,
                                badgeStyle.border,
                              )}
                            >
                              {item.source}
                            </Badge>
                            <span className="text-[11px] text-muted-foreground">{item.time}</span>
                          </div>
                          <p className="text-sm leading-snug text-foreground/90">{item.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions — 1/3 */}
          <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={4}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-base">Actions rapides</CardTitle>
                <CardDescription>Acc&egrave;s direct aux fonctions cl&eacute;s</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  {quickActions.map((action) => {
                    const ActionIcon = action.icon;
                    return (
                      <button
                        key={action.label}
                        onClick={() => setView(action.view)}
                        className="group flex items-center gap-3 rounded-xl border border-border/50 bg-white px-4 py-3 text-left shadow-sm transition-all hover:border-transparent hover:shadow-md"
                        style={{
                          ['--hover-shadow' as string]: action.color,
                        }}
                      >
                        <div
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors"
                          style={{ backgroundColor: `${action.color}15` }}
                        >
                          <ActionIcon className="h-4 w-4" style={{ color: action.color }} />
                        </div>
                        <span className="flex-1 text-sm font-medium">{action.label}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5 group-hover:text-muted-foreground" />
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
