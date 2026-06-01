'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wallet,
  Mic,
  Phone,
  AlertTriangle,
  CreditCard,
  ArrowRight,
  MessageCircle,
  Send,
  CheckCircle2,
  Clock,
  PhoneCall,
  Mail,
  Smartphone,
  Gavel,
  TrendingUp,
  TrendingDown,
  Shield,
  ChevronRight,
  Sparkles,
  Info,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
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
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useNavStore } from '@/lib/nav-store';

/* ═══════════════════════ BRAND ═══════════════════════════════════════ */

const ORANGE = '#FF6600';
const ORANGE_LIGHT = '#FF8533';

/* ═══════════════════════ ANIMATIONS ════════════════════════════════════ */

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
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

const tabContent = {
  initial: { opacity: 0, x: 12 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, x: -12, transition: { duration: 0.2 } },
};

/* ═══════════════════════ MOCK DATA ════════════════════════════════════ */

// Tab 1: Cashflow 30 jours
const cashflow30 = [
  { day: '01/06', cashflow: 1450000 },
  { day: '03/06', cashflow: 1380000 },
  { day: '05/06', cashflow: 1520000 },
  { day: '07/06', cashflow: 1490000 },
  { day: '09/06', cashflow: 1610000 },
  { day: '11/06', cashflow: 1550000 },
  { day: '13/06', cashflow: 1680000 },
  { day: '15/06', cashflow: 1560000 },
  { day: '17/06', cashflow: 1470000 },
  { day: '19/06', cashflow: 1590000 },
  { day: '21/06', cashflow: 1630000 },
  { day: '23/06', cashflow: 1710000 },
  { day: '25/06', cashflow: 1650000 },
  { day: '27/06', cashflow: 1580000 },
  { day: '30/06', cashflow: 1560000 },
];

// Tab 1: Flowa Score radial
const flowaScoreData = [{ name: 'Score', value: 78, fill: ORANGE }];

// Tab 3: Overdue invoices
const overdueInvoices = [
  { id: 'F-001', client: 'M. Diallo', montant: 320000, joursRetard: 22, statut: 'En attente' as const },
  { id: 'F-002', client: 'Mme Koné', montant: 250000, joursRetard: 15, statut: 'Relancé' as const },
  { id: 'F-003', client: 'Restaurant Baobab', montant: 180000, joursRetard: 8, statut: 'En négociation' as const },
  { id: 'F-004', client: 'Sarl Techno+', montant: 95000, joursRetard: 35, statut: 'En attente' as const },
  { id: 'F-005', client: 'M. Touré', montant: 45000, joursRetard: 3, statut: 'Payé' as const },
];

// Tab 3: Relance stages
const relanceStages = [
  { label: 'J+3 Email', progress: 100, icon: Mail, color: 'bg-sky-500' },
  { label: 'J+7 SMS', progress: 75, icon: Smartphone, color: 'bg-amber-500' },
  { label: 'J+15 Appel IA', progress: 40, icon: PhoneCall, color: ORANGE, textColor: 'text-orange-600' },
  { label: 'J+30 Contentieux', progress: 10, icon: Gavel, color: 'bg-red-500' },
];

// Tab 4: Cashflow prediction 14 jours
const cashflowPrediction = [
  { day: '05/06', cashflow: 1560000, threshold: 200000 },
  { day: '06/06', cashflow: 1420000, threshold: 200000 },
  { day: '07/06', cashflow: 1180000, threshold: 200000 },
  { day: '08/06', cashflow: 890000, threshold: 200000 },
  { day: '09/06', cashflow: 650000, threshold: 200000 },
  { day: '10/06', cashflow: 420000, threshold: 200000 },
  { day: '11/06', cashflow: 280000, threshold: 200000 },
  { day: '12/06', cashflow: 120000, threshold: 200000 },
  { day: '13/06', cashflow: 350000, threshold: 200000 },
  { day: '14/06', cashflow: 780000, threshold: 200000 },
  { day: '15/06', cashflow: 1120000, threshold: 200000 },
  { day: '16/06', cashflow: 1350000, threshold: 200000 },
  { day: '17/06', cashflow: 1480000, threshold: 200000 },
  { day: '18/06', cashflow: 1560000, threshold: 200000 },
];

// Tab 5: Micro-crédit score breakdown
const scoreBreakdown = [
  { label: 'Historique paiement', score: 35, max: 40, color: ORANGE },
  { label: "Chiffre d'affaires", score: 25, max: 30, color: '#16A34A' },
  { label: 'Ancienneté', score: 18, max: 30, color: '#0EA5E9' },
];

// Chat messages for Comptabilité Vocale
const chatMessages = [
  { type: 'user' as const, text: '🎤 J\'ai payé 50 000 francs pour le loyer du magasin', time: '09:42' },
  { type: 'ai' as const, text: '✅ Enregistré ! Catégorie: Loyer. Montant: 50,000 FCFA. Date: aujourd\'hui.', time: '09:42' },
  { type: 'user' as const, text: '🎤 J\'ai vendu 200 kilos de riz à 500 francs', time: '09:45' },
  { type: 'ai' as const, text: '✅ Vente enregistrée ! Client: (à définir). Montant: 100,000 FCFA. Créance créée.', time: '09:45' },
];

// Voice processing flow steps
const voiceFlowSteps = [
  { label: 'Audio', icon: Mic, color: ORANGE },
  { label: 'Whisper', icon: MessageCircle, color: '#8B5CF6' },
  { label: 'Groq LLM', icon: Sparkles, color: '#0EA5E9' },
  { label: 'Catégorisation', icon: Wallet, color: '#16A34A' },
  { label: 'Supabase', icon: Shield, color: '#6366F1' },
];

/* ═══════════════════════ SUB-COMPONENTS ══════════════════════════════ */

/** Stat card with icon and value */
function StatCard({
  title,
  value,
  unit,
  icon: Icon,
  color,
  delay,
}: {
  title: string;
  value: string;
  unit: string;
  icon: React.ElementType;
  color: string;
  delay: number;
}) {
  return (
    <motion.div variants={fadeIn} custom={delay}>
      <Card className="relative overflow-hidden border border-border/50">
        <div
          className="pointer-events-none absolute -right-4 -top-4 h-20 w-20 rounded-full opacity-15 blur-xl"
          style={{ backgroundColor: color }}
        />
        <CardContent className="flex items-start gap-4 p-5">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${color}15` }}
          >
            <Icon className="h-5 w-5" style={{ color }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</p>
            <p className="mt-1 text-2xl font-bold tracking-tight">
              {value}
              <span className="ml-1 text-sm font-normal text-muted-foreground">{unit}</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/** Custom tooltip for cashflow charts */
function CashflowTooltip({
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
          {p.dataKey === 'cashflow' ? 'Cashflow' : 'Seuil'} : {Number(p.value).toLocaleString('fr-FR')} FCFA
        </p>
      ))}
    </div>
  );
}

/** Status badge for invoice table */
function StatusBadge({ statut }: { statut: string }) {
  const map: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; className: string }> = {
    'En attente': {
      variant: 'secondary',
      className: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
    },
    'Relancé': {
      variant: 'secondary',
      className: 'bg-orange-500/10 text-orange-700 border-orange-500/20',
    },
    'En négociation': {
      variant: 'secondary',
      className: 'bg-sky-500/10 text-sky-700 border-sky-500/20',
    },
    'Payé': {
      variant: 'secondary',
      className: 'bg-green-500/10 text-green-700 border-green-500/20',
    },
  };
  const s = map[statut] ?? { variant: 'outline' as const, className: '' };
  return (
    <Badge variant={s.variant} className={cn('text-[11px] font-semibold', s.className)}>
      {statut}
    </Badge>
  );
}

/** Chat bubble */
function ChatBubble({
  message,
  time,
  type,
}: {
  message: string;
  time: string;
  type: 'user' | 'ai';
}) {
  const isUser = type === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn('flex', isUser ? 'justify-end' : 'justify-start')}
    >
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm',
          isUser
            ? 'rounded-br-md bg-gradient-to-br from-[#FF6600] to-[#FF8533] text-white'
            : 'rounded-bl-md border border-border/50 bg-white text-foreground',
        )}
      >
        <p>{message}</p>
        <p
          className={cn(
            'mt-1 text-[10px]',
            isUser ? 'text-white/60' : 'text-muted-foreground',
          )}
        >
          {time}
        </p>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════ MAIN COMPONENT ══════════════════════════════ */

export default function FlowaModule() {
  const setView = useNavStore((s) => s.setView);
  const [activeTab, setActiveTab] = useState('overview');

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
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF6600] to-[#FF8533] shadow-md">
              <Wallet className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight sm:text-xl">
                Flowa{' '}
                <span className="text-muted-foreground font-normal">—</span>{' '}
                <span className="font-normal text-muted-foreground">Votre CFO Intelligent</span>
              </h1>
              <p className="text-xs text-muted-foreground">Module Finance IA pour PME africaines</p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="border-orange-500/20 bg-orange-500/5 text-orange-600 text-xs font-semibold"
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
              <TrendingUp className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Vue d&apos;ensemble</span>
              <span className="sm:hidden">Vue</span>
            </TabsTrigger>
            <TabsTrigger value="vocal" className="gap-1.5 text-xs sm:text-sm">
              <Mic className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Comptabilité Vocale</span>
              <span className="sm:hidden">Vocale</span>
            </TabsTrigger>
            <TabsTrigger value="relances" className="gap-1.5 text-xs sm:text-sm">
              <Phone className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Relances &amp; Recouvrement</span>
              <span className="sm:hidden">Relances</span>
            </TabsTrigger>
            <TabsTrigger value="overdraft" className="gap-1.5 text-xs sm:text-sm">
              <AlertTriangle className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Overdraft Radar</span>
              <span className="sm:hidden">Radar</span>
            </TabsTrigger>
            <TabsTrigger value="credit" className="gap-1.5 text-xs sm:text-sm">
              <CreditCard className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Micro-Crédit</span>
              <span className="sm:hidden">Crédit</span>
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
                  <StatCard
                    title="Total créances"
                    value="1 240 000"
                    unit="FCFA"
                    icon={TrendingUp}
                    color="#16A34A"
                    delay={0}
                  />
                  <StatCard
                    title="Total dettes"
                    value="890 000"
                    unit="FCFA"
                    icon={TrendingDown}
                    color="#EA580C"
                    delay={1}
                  />
                  <StatCard
                    title="Trésorerie disponible"
                    value="1 560 000"
                    unit="FCFA"
                    icon={Wallet}
                    color={ORANGE}
                    delay={2}
                  />
                  {/* Flowa Score Card with Radial Progress */}
                  <motion.div variants={fadeIn} custom={3}>
                    <Card className="relative overflow-hidden border border-border/50">
                      <div
                        className="pointer-events-none absolute -right-4 -top-4 h-20 w-20 rounded-full opacity-15 blur-xl"
                        style={{ backgroundColor: ORANGE }}
                      />
                      <CardContent className="flex items-center gap-4 p-5">
                        <div className="h-20 w-20 shrink-0">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadialBarChart
                              innerRadius="70%"
                              outerRadius="100%"
                              data={flowaScoreData}
                              startAngle={90}
                              endAngle={-270}
                            >
                              <RadialBar
                                dataKey="value"
                                cornerRadius={10}
                                background={{ fill: '#f3f4f6' }}
                              />
                            </RadialBarChart>
                          </ResponsiveContainer>
                          {/* Score text overlay */}
                          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <span className="text-lg font-bold" style={{ color: ORANGE }}>78</span>
                              <span className="text-[10px] text-muted-foreground">/100</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            Score Flowa
                          </p>
                          <p className="mt-1 text-2xl font-bold tracking-tight" style={{ color: ORANGE }}>
                            78<span className="ml-0.5 text-sm font-normal text-muted-foreground">/100</span>
                          </p>
                          <p className="mt-0.5 text-[11px] text-muted-foreground">Bon — Éligible microcrédit</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>

                {/* Cashflow 30 jours Chart */}
                <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={4}>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-base">Cashflow 30 jours</CardTitle>
                          <CardDescription>Évolution de la trésorerie sur le mois en cours</CardDescription>
                        </div>
                        <Badge variant="outline" className="border-green-500/20 bg-green-500/5 text-green-600 text-xs">
                          <TrendingUp className="mr-1 h-3 w-3" />
                          +7.6%
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={cashflow30} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
                            <defs>
                              <linearGradient id="gradCashflow" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={ORANGE} stopOpacity={0.3} />
                                <stop offset="100%" stopColor={ORANGE} stopOpacity={0.02} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                            <XAxis
                              dataKey="day"
                              axisLine={false}
                              tickLine={false}
                              tick={{ fontSize: 11, fill: '#6B7280' }}
                            />
                            <YAxis
                              axisLine={false}
                              tickLine={false}
                              tick={{ fontSize: 11, fill: '#6B7280' }}
                              tickFormatter={(v: number) => `${(v / 1000000).toFixed(1)}M`}
                            />
                            <Tooltip content={<CashflowTooltip />} />
                            <Area
                              type="monotone"
                              dataKey="cashflow"
                              stroke={ORANGE}
                              strokeWidth={2.5}
                              fill="url(#gradCashflow)"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Quick insights row */}
                <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={5}>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <Card className="border-amber-500/20 bg-amber-500/5">
                      <CardContent className="flex items-center gap-3 p-4">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/15">
                          <AlertTriangle className="h-4 w-4 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">3 factures en retard</p>
                          <p className="text-xs text-muted-foreground">Total: 550,000 FCFA</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-green-500/20 bg-green-500/5">
                      <CardContent className="flex items-center gap-3 p-4">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-500/15">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">12 paiements reçus</p>
                          <p className="text-xs text-muted-foreground">Ce mois: 890,000 FCFA</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-sky-500/20 bg-sky-500/5">
                      <CardContent className="flex items-center gap-3 p-4">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-500/15">
                          <CreditCard className="h-4 w-4 text-sky-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">Microcrédit disponible</p>
                          <p className="text-xs text-muted-foreground">Jusqu&apos;à 500,000 FCFA</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </TabsContent>

          {/* ═══════════ TAB 2: COMPTABILITÉ VOCALE ═══════════ */}
          <TabsContent value="vocal">
            <AnimatePresence mode="wait">
              <motion.div
                key="vocal"
                variants={tabContent}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
                  {/* Chat Interface - 3/5 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="lg:col-span-3"
                  >
                    <Card className="flex h-[520px] flex-col overflow-hidden">
                      {/* Chat header */}
                      <div className="flex items-center gap-3 border-b px-5 py-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6600] to-[#FF8533]">
                          <Mic className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold">Flowa — Comptabilité Vocale</p>
                          <p className="text-[11px] text-green-600">● En ligne — Parlez en français ou wolof</p>
                        </div>
                        <Badge variant="outline" className="border-orange-500/20 bg-orange-500/5 text-orange-600 text-[10px]">
                          WhatsApp
                        </Badge>
                      </div>

                      {/* Chat messages */}
                      <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
                        {/* System message */}
                        <div className="flex justify-center">
                          <span className="rounded-full bg-muted px-3 py-1 text-[10px] text-muted-foreground">
                            Comptabilité vocale activée — Aujourd&apos;hui
                          </span>
                        </div>
                        {chatMessages.map((msg, i) => (
                          <ChatBubble
                            key={i}
                            type={msg.type}
                            message={msg.text}
                            time={msg.time}
                          />
                        ))}
                      </div>

                      {/* Chat input */}
                      <div className="border-t px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 rounded-xl border border-border/60 bg-muted/40 px-4 py-2.5 text-sm text-muted-foreground">
                            Tapez un message ou appuyez sur le micro...
                          </div>
                          <Button
                            size="icon"
                            className="h-11 w-11 shrink-0 rounded-full bg-gradient-to-br from-[#FF6600] to-[#FF8533] shadow-md transition-transform hover:scale-105"
                          >
                            <Mic className="h-5 w-5 text-white" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>

                  {/* Voice Processing Flow - 2/5 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="lg:col-span-2"
                  >
                    <Card className="h-[520px]">
                      <CardHeader>
                        <CardTitle className="text-base">Pipeline de traitement</CardTitle>
                        <CardDescription>De la voix à l&apos;enregistrement comptable</CardDescription>
                      </CardHeader>
                      <CardContent className="flex flex-1 flex-col justify-center gap-0">
                        {voiceFlowSteps.map((step, i) => {
                          const StepIcon = step.icon;
                          return (
                            <div key={step.label}>
                              <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + i * 0.12, duration: 0.35 }}
                                className="flex items-center gap-4"
                              >
                                <div
                                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-sm"
                                  style={{ backgroundColor: `${step.color}15` }}
                                >
                                  <StepIcon className="h-5 w-5" style={{ color: step.color }} />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-semibold">{step.label}</p>
                                  <p className="text-[11px] text-muted-foreground">
                                    {i === 0 && 'Capture audio via WhatsApp'}
                                    {i === 1 && 'Transcription multilingue'}
                                    {i === 2 && 'Analyse & extraction intent'}
                                    {i === 3 && 'Classification comptable IA'}
                                    {i === 4 && 'Stockage & audit trail'}
                                  </p>
                                </div>
                                <Badge
                                  variant="outline"
                                  className="text-[10px] font-semibold"
                                  style={{
                                    borderColor: `${step.color}30`,
                                    backgroundColor: `${step.color}08`,
                                    color: step.color,
                                  }}
                                >
                                  Étape {i + 1}
                                </Badge>
                              </motion.div>
                              {i < voiceFlowSteps.length - 1 && (
                                <div className="flex items-center py-1.5 pl-6">
                                  <div className="h-6 w-px border-l-2 border-dashed border-border/60" />
                                  <ChevronRight className="h-3 w-3 text-muted-foreground/40 -ml-0.5" />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                {/* Feature highlights */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <Card className="border-orange-500/20">
                      <CardContent className="flex items-start gap-3 p-5">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-500/10">
                          <Mic className="h-4 w-4" style={{ color: ORANGE }} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">Multilingue</p>
                          <p className="text-xs text-muted-foreground">Français, Wolof, Bambara, Dioula</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-purple-500/20">
                      <CardContent className="flex items-start gap-3 p-5">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-500/10">
                          <Sparkles className="h-4 w-4 text-purple-500" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">Catégorisation IA</p>
                          <p className="text-xs text-muted-foreground">Auto-classification en temps réel</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-green-500/20">
                      <CardContent className="flex items-start gap-3 p-5">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-500/10">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">Confirmation instantanée</p>
                          <p className="text-xs text-muted-foreground">Validation par SMS ou WhatsApp</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </TabsContent>

          {/* ═══════════ TAB 3: RELANCES & RECOUVREMENT ═══════════ */}
          <TabsContent value="relances">
            <AnimatePresence mode="wait">
              <motion.div
                key="relances"
                variants={tabContent}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                {/* Overdue invoices table */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-base">Factures en retard</CardTitle>
                          <CardDescription>5 factures nécessitent une action — Total: 890,000 FCFA</CardDescription>
                        </div>
                        <Button
                          className="bg-gradient-to-r from-[#FF6600] to-[#FF8533] text-white shadow-sm hover:shadow-md transition-shadow"
                          size="sm"
                        >
                          <Phone className="mr-1.5 h-3.5 w-3.5" />
                          Lancer relance automatique
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Client</TableHead>
                            <TableHead>Montant</TableHead>
                            <TableHead>Jours retard</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {overdueInvoices.map((inv) => (
                            <TableRow key={inv.id}>
                              <TableCell className="font-medium">{inv.client}</TableCell>
                              <TableCell>{inv.montant.toLocaleString('fr-FR')} FCFA</TableCell>
                              <TableCell>
                                <span
                                  className={cn(
                                    'font-semibold',
                                    inv.joursRetard >= 20
                                      ? 'text-red-600'
                                      : inv.joursRetard >= 10
                                        ? 'text-orange-600'
                                        : 'text-amber-600',
                                  )}
                                >
                                  J+{inv.joursRetard}
                                </span>
                              </TableCell>
                              <TableCell>
                                <StatusBadge statut={inv.statut} />
                              </TableCell>
                              <TableCell className="text-right">
                                {inv.statut === 'Payé' ? (
                                  <span className="text-xs text-green-600 font-medium flex items-center justify-end gap-1">
                                    <CheckCircle2 className="h-3.5 w-3.5" />
                                    Réglé
                                  </span>
                                ) : (
                                  <Button variant="ghost" size="sm" className="h-8 text-xs text-orange-600 hover:text-orange-700 hover:bg-orange-500/5">
                                    Relancer
                                    <ArrowRight className="ml-1 h-3 w-3" />
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Relance stages progress */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Étapes de relance automatique</CardTitle>
                      <CardDescription>Progression du processus de recouvrement IA</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {relanceStages.map((stage, i) => {
                          const StageIcon = stage.icon;
                          return (
                            <motion.div
                              key={stage.label}
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 + i * 0.1 }}
                              className="space-y-3"
                            >
                              <div className="flex items-center gap-2.5">
                                <div
                                  className={cn(
                                    'flex h-8 w-8 items-center justify-center rounded-lg text-white',
                                    stage.color,
                                  )}
                                >
                                  <StageIcon className="h-4 w-4" />
                                </div>
                                <span className="text-sm font-semibold">{stage.label}</span>
                              </div>
                              <Progress
                                value={stage.progress}
                                className="h-2"
                              />
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">
                                  {stage.progress}% complété
                                </span>
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    'text-[10px]',
                                    stage.progress === 100
                                      ? 'border-green-500/20 bg-green-500/5 text-green-600'
                                      : stage.progress >= 50
                                        ? 'border-amber-500/20 bg-amber-500/5 text-amber-600'
                                        : 'border-muted bg-muted/30 text-muted-foreground',
                                  )}
                                >
                                  {stage.progress === 100
                                    ? 'Terminé'
                                    : stage.progress >= 50
                                      ? 'En cours'
                                      : 'Planifié'}
                                </Badge>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Info className="h-3.5 w-3.5" />
                          <span>La relance IA s&apos;adapte au profil de chaque client</span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs border-orange-500/20 text-orange-600 hover:bg-orange-500/5"
                        >
                          Configurer les étapes
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </TabsContent>

          {/* ═══════════ TAB 4: OVERDRAFT RADAR ═══════════ */}
          <TabsContent value="overdraft">
            <AnimatePresence mode="wait">
              <motion.div
                key="overdraft"
                variants={tabContent}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                {/* Cashflow prediction chart */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-base">Prédiction Cashflow — 14 jours</CardTitle>
                          <CardDescription>Projection IA avec seuil de sécurité à 200,000 FCFA</CardDescription>
                        </div>
                        <Badge variant="destructive" className="text-[11px] font-semibold">
                          <AlertTriangle className="mr-1 h-3 w-3" />
                          Risque détecté
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={cashflowPrediction} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
                            <defs>
                              <linearGradient id="gradPrediction" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={ORANGE} stopOpacity={0.25} />
                                <stop offset="100%" stopColor={ORANGE} stopOpacity={0.02} />
                              </linearGradient>
                              <linearGradient id="gradRisk" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#EF4444" stopOpacity={0.2} />
                                <stop offset="100%" stopColor="#EF4444" stopOpacity={0.02} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                            <XAxis
                              dataKey="day"
                              axisLine={false}
                              tickLine={false}
                              tick={{ fontSize: 11, fill: '#6B7280' }}
                            />
                            <YAxis
                              axisLine={false}
                              tickLine={false}
                              tick={{ fontSize: 11, fill: '#6B7280' }}
                              tickFormatter={(v: number) => `${(v / 1000000).toFixed(1)}M`}
                            />
                            <Tooltip content={<CashflowTooltip />} />
                            {/* Threshold line */}
                            <Area
                              type="monotone"
                              dataKey="threshold"
                              stroke="#EF4444"
                              strokeWidth={1.5}
                              strokeDasharray="6 3"
                              fill="none"
                              name="Seuil"
                            />
                            {/* Cashflow area — colored with risk sections via reference */}
                            <Area
                              type="monotone"
                              dataKey="cashflow"
                              stroke={ORANGE}
                              strokeWidth={2.5}
                              fill="url(#gradPrediction)"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                      {/* Risk zone indicators */}
                      <div className="mt-3 flex items-center gap-4 text-xs">
                        <span className="flex items-center gap-1.5">
                          <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: ORANGE }} />
                          Cashflow prévu
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-500" />
                          Zone de risque ( &lt; 200K FCFA)
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="inline-block h-3 w-3 border-t-2 border-dashed border-red-500" />
                          Seuil de sécurité
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Alert and Recommendations */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {/* Alert card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                  >
                    <Card className="border-red-500/30 bg-red-500/5">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/15">
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-bold text-red-700">
                              ⚠️ Risque de découvert détecté le 18/06
                            </p>
                            <p className="mt-1 text-sm text-red-600/80">
                              Solde prévu: <span className="font-semibold">120,000 FCFA</span> — en dessous du seuil de sécurité de 200,000 FCFA
                            </p>
                            <div className="mt-3 flex items-center gap-2">
                              <Badge variant="destructive" className="text-[10px]">Critique</Badge>
                              <Badge variant="outline" className="border-red-500/20 bg-red-500/5 text-red-600 text-[10px]">
                                J-5 jours
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Recommendations */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.25 }}
                  >
                    <Card className="h-full">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Sparkles className="h-4 w-4" style={{ color: ORANGE }} />
                          Recommandations IA
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-start gap-3 rounded-xl border border-green-500/20 bg-green-500/5 p-4">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-500/15">
                            <Clock className="h-4 w-4 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold">Reporter paiement fournisseur de 3 jours</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Économie de trésorerie: ~350,000 FCFA
                            </p>
                          </div>
                          <Button variant="ghost" size="sm" className="shrink-0 text-xs text-green-600 hover:bg-green-500/5">
                            Appliquer
                          </Button>
                        </div>
                        <div className="flex items-start gap-3 rounded-xl border border-orange-500/20 bg-orange-500/5 p-4">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-500/15">
                            <Phone className="h-4 w-4" style={{ color: ORANGE }} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold">Activer relance client Touré</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Facture de 45,000 FCFA — J+3 de retard
                            </p>
                          </div>
                          <Button variant="ghost" size="sm" className="shrink-0 text-xs text-orange-600 hover:bg-orange-500/5">
                            Relancer
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </TabsContent>

          {/* ═══════════ TAB 5: MICRO-CRÉDIT ═══════════ */}
          <TabsContent value="credit">
            <AnimatePresence mode="wait">
              <motion.div
                key="credit"
                variants={tabContent}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
                  {/* Flowa Score Breakdown - 3/5 */}
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
                            <CardTitle className="text-base">Score Flowa — Éligibilité Microcrédit</CardTitle>
                            <CardDescription>Analyse de votre profil financier par IA</CardDescription>
                          </div>
                          <div className="text-right">
                            <p className="text-3xl font-bold" style={{ color: ORANGE }}>78</p>
                            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">sur 100</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-5">
                        {/* Score radial */}
                        <div className="flex justify-center">
                          <div className="relative h-44 w-44">
                            <ResponsiveContainer width="100%" height="100%">
                              <RadialBarChart
                                innerRadius="65%"
                                outerRadius="100%"
                                data={flowaScoreData}
                                startAngle={90}
                                endAngle={-270}
                              >
                                <RadialBar
                                  dataKey="value"
                                  cornerRadius={10}
                                  background={{ fill: '#f3f4f6' }}
                                />
                              </RadialBarChart>
                            </ResponsiveContainer>
                            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                              <span className="text-3xl font-bold" style={{ color: ORANGE }}>78</span>
                              <span className="text-xs text-muted-foreground">/100</span>
                              <Badge
                                variant="outline"
                                className="mt-1 border-green-500/20 bg-green-500/5 text-green-600 text-[9px]"
                              >
                                Éligible
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        {/* Score breakdown */}
                        <div className="space-y-4">
                          {scoreBreakdown.map((item, i) => (
                            <motion.div
                              key={item.label}
                              initial={{ opacity: 0, x: -15 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + i * 0.1 }}
                              className="space-y-2"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">{item.label}</span>
                                <span className="text-sm font-bold" style={{ color: item.color }}>
                                  {item.score}/{item.max}
                                </span>
                              </div>
                              <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-muted">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${(item.score / item.max) * 100}%` }}
                                  transition={{ delay: 0.4 + i * 0.12, duration: 0.6, ease: 'easeOut' }}
                                  className="absolute inset-y-0 left-0 rounded-full"
                                  style={{ backgroundColor: item.color }}
                                />
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        <Separator />

                        {/* Total */}
                        <div className="flex items-center justify-between rounded-xl border border-orange-500/20 bg-orange-500/5 p-4">
                          <span className="text-sm font-semibold">Score total</span>
                          <span className="text-lg font-bold" style={{ color: ORANGE }}>
                            78<span className="text-sm font-normal text-muted-foreground">/100</span>
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Available Offer - 2/5 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="lg:col-span-2"
                  >
                    <div className="flex h-full flex-col gap-6">
                      {/* Credit offer card */}
                      <Card className="relative overflow-hidden border-orange-500/20">
                        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#FF6600] opacity-10 blur-2xl" />
                        <CardHeader>
                          <CardTitle className="text-base flex items-center gap-2">
                            <CreditCard className="h-4 w-4" style={{ color: ORANGE }} />
                            Offre disponible
                          </CardTitle>
                          <CardDescription>Basée sur votre score Flowa</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="rounded-xl bg-gradient-to-br from-[#FF6600] to-[#FF8533] p-5 text-white">
                            <p className="text-xs font-medium uppercase tracking-wider opacity-80">
                              Microcrédit PME
                            </p>
                            <p className="mt-2 text-3xl font-bold">500,000 <span className="text-lg font-normal opacity-80">FCFA</span></p>
                            <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                              <div className="rounded-lg bg-white/15 px-3 py-2">
                                <p className="opacity-70">Taux</p>
                                <p className="font-semibold">3.5%/mois</p>
                              </div>
                              <div className="rounded-lg bg-white/15 px-3 py-2">
                                <p className="opacity-70">Durée</p>
                                <p className="font-semibold">6 mois</p>
                              </div>
                            </div>
                          </div>

                          {/* Monthly payment estimate */}
                          <div className="rounded-xl border border-border/50 bg-muted/30 p-4">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Mensualité estimée</span>
                              <span className="text-sm font-bold">~92,500 FCFA</span>
                            </div>
                            <div className="mt-2 flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Coût total du crédit</span>
                              <span className="text-sm font-semibold text-orange-600">105,000 FCFA</span>
                            </div>
                          </div>

                          <Button
                            className="w-full bg-gradient-to-r from-[#FF6600] to-[#FF8533] text-white shadow-md hover:shadow-lg transition-shadow"
                            size="lg"
                          >
                            Demander le crédit
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </CardContent>
                      </Card>

                      {/* Orange Money integration */}
                      <Card className="border-amber-500/20">
                        <CardContent className="p-5">
                          <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10">
                              <Smartphone className="h-5 w-5 text-amber-600" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold">Intégration Orange Money</p>
                              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                                Remboursement automatique via Orange Money. Prélèvement mensuel configuré
                                sur votre portefeuille mobile. Pas de déplacement en agence.
                              </p>
                              <Badge
                                variant="outline"
                                className="mt-2 border-amber-500/20 bg-amber-500/5 text-amber-600 text-[10px]"
                              >
                                <Smartphone className="mr-1 h-3 w-3" />
                                Mobile Money
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
