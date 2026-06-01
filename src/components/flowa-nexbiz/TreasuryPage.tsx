'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  PiggyBank,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  AlertTriangle,
  Mic,
  MicOff,
  Sparkles,
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  Calendar,
  Lightbulb,
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
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

const cashflowData = (() => {
  const data = [];
  const baseSolde = 1560000;
  let solde = baseSolde;
  for (let d = 1; d <= 30; d++) {
    const encaissement = Math.floor(Math.random() * 120000 + 20000);
    const decaissement = Math.floor(Math.random() * 130000 + 30000);
    solde = solde + encaissement - decaissement;
    // Force a danger zone around day 18
    if (d >= 16 && d <= 20) {
      solde = Math.max(80000, solde - 200000);
    }
    data.push({
      jour: `${d}/06`,
      encaissement,
      decaissement,
      solde: Math.max(solde, 60000),
    });
  }
  return data;
})();

const encaissements = [
  { id: 1, client: 'M. Diallo — Restaurant Le Baobab', montant: 350000, date: '05/06', probabilité: 90, source: 'Flowa' },
  { id: 2, client: 'Mme Koné — Boutique Élégance', montant: 180000, date: '08/06', probabilité: 75, source: 'NexBiz' },
  { id: 3, client: 'Sarl Techno+ — Fournitures', montant: 120000, date: '12/06', probabilité: 60, source: 'Flowa' },
  { id: 4, client: 'Ets Camara — Alimentation', montant: 95000, date: '15/06', probabilité: 85, source: 'NexBiz' },
  { id: 5, client: 'Hôtel Savannah — Équipement', montant: 145000, date: '22/06', probabilité: 50, source: 'Flowa' },
];

const decaissements = [
  { id: 1, description: 'Loyer boutique principale', montant: 200000, date: '05/06', catégorie: 'Loyer', urgence: 'haute' },
  { id: 2, description: 'Fournitures stock semaine', montant: 85000, date: '07/06', catégorie: 'Approvisionnement', urgence: 'moyenne' },
  { id: 3, description: 'Salaires employés (2)', montant: 180000, date: '10/06', catégorie: 'Salaires', urgence: 'haute' },
  { id: 4, description: 'Électricité & eau', montant: 35000, date: '12/06', catégorie: 'Charges', urgence: 'moyenne' },
  { id: 5, description: 'Transport & livraison', montant: 120000, date: '18/06', catégorie: 'Logistique', urgence: 'basse' },
];

const kpiCards = [
  {
    title: 'Solde actuel',
    value: '1 560 000',
    unit: 'FCFA',
    change: '+8.2%',
    changeLabel: 'vs semaine dernière',
    icon: PiggyBank,
    color: FLOWA,
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20',
  },
  {
    title: 'Encaissements prévus',
    value: '890 000',
    unit: 'FCFA',
    change: '+15%',
    changeLabel: 'ce mois',
    icon: TrendingUp,
    color: '#16A34A',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
  },
  {
    title: 'Décaissements prévus',
    value: '620 000',
    unit: 'FCFA',
    change: '-3.5%',
    changeLabel: 'vs prévision',
    icon: TrendingDown,
    color: '#DC2626',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20',
  },
  {
    title: 'Cashflow prévisionnel',
    value: '270 000',
    unit: 'FCFA',
    change: '+12%',
    changeLabel: 'net mensuel',
    icon: ArrowRight,
    color: NEXBIZ,
    bgColor: 'bg-sky-500/10',
    borderColor: 'border-sky-500/20',
  },
];

const aiSuggestions = [
  {
    emoji: '💡',
    title: 'Reporter le paiement fournisseur du 18/06',
    desc: 'Négocier un délai supplémentaire de 5 jours pour éviter le découvert.',
  },
  {
    emoji: '📊',
    title: 'Accélérer l\'encaissement M. Diallo',
    desc: 'Proposer un escompte de 2% pour paiement anticipé avant le 05/06.',
  },
  {
    emoji: '🏦',
    title: 'Microcrédit Orange Money disponible',
    desc: '500 000 FCFA en 24h à taux préférentiel pour couvrir la zone de risque.',
  },
];

/* ═══════════════════════ CHART TOOLTIP ═══════════════════════════════ */

function CashflowTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-white px-3 py-2 shadow-lg dark:bg-zinc-900">
      <p className="mb-1 text-xs font-semibold text-muted-foreground">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-xs font-medium" style={{ color: p.color }}>
          {p.dataKey === 'solde'
            ? 'Solde'
            : p.dataKey === 'encaissement'
            ? 'Encaissements'
            : 'Décaissements'}{' '}
          : {Number(p.value).toLocaleString('fr-FR')} FCFA
        </p>
      ))}
    </div>
  );
}

/* ═══════════════════════ MAIN COMPONENT ══════════════════════════════ */

export default function TreasuryPage() {
  const setView = useNavStore((s) => s.setView);
  const [period, setPeriod] = useState('30j');
  const [isListening, setIsListening] = useState(false);
  const [voiceText, setVoiceText] = useState('');

  const periods = ['7j', '30j', '90j', 'Annuel'];

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
            <PiggyBank className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight sm:text-xl">Trésorerie</h1>
            <p className="text-xs text-muted-foreground">Flowa — Cashflow & prévisions</p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-muted p-1">
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                'rounded-md px-3 py-1.5 text-xs font-semibold transition-colors',
                period === p
                  ? 'bg-white text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {p}
            </button>
          ))}
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
                  <div
                    className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-20 blur-2xl"
                    style={{ backgroundColor: kpi.color }}
                  />
                  <CardContent className="flex items-center gap-4 p-5">
                    <div className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl', kpi.bgColor)}>
                      <Icon className="h-5 w-5" style={{ color: kpi.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{kpi.title}</p>
                      <p className="text-xl font-bold tracking-tight">
                        {kpi.value}{' '}
                        <span className="text-xs font-normal text-muted-foreground">{kpi.unit}</span>
                      </p>
                      <span
                        className={cn(
                          'inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold',
                          isPositive ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600',
                        )}
                      >
                        {isPositive ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
                        {kpi.change}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ═══════════ MAIN CHART ═══════════ */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={1}>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Cashflow prévisionnel</CardTitle>
                  <CardDescription>Prévisions sur 30 jours — {period}</CardDescription>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#16A34A' }} />
                    Encaissements
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-500" />
                    Décaissements
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: FLOWA }} />
                    Solde net
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={cashflowData} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gradEncaissement" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#16A34A" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#16A34A" stopOpacity={0.02} />
                      </linearGradient>
                      <linearGradient id="gradDecaissement" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#DC2626" stopOpacity={0.25} />
                        <stop offset="100%" stopColor="#DC2626" stopOpacity={0.02} />
                      </linearGradient>
                      <linearGradient id="gradSolde" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={FLOWA} stopOpacity={0.2} />
                        <stop offset="100%" stopColor={FLOWA} stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis
                      dataKey="jour"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: '#6B7280' }}
                      interval={4}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: '#6B7280' }}
                      tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}K`}
                    />
                    <Tooltip content={<CashflowTooltip />} />
                    {/* Danger zone line at ~200K FCFA */}
                    <ReferenceLine
                      y={200000}
                      stroke="#DC2626"
                      strokeDasharray="6 4"
                      strokeWidth={1.5}
                      label={{
                        value: 'Zone de risque',
                        position: 'right',
                        fill: '#DC2626',
                        fontSize: 10,
                        fontWeight: 600,
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="encaissement"
                      stroke="#16A34A"
                      strokeWidth={2}
                      fill="url(#gradEncaissement)"
                    />
                    <Area
                      type="monotone"
                      dataKey="decaissement"
                      stroke="#DC2626"
                      strokeWidth={2}
                      fill="url(#gradDecaissement)"
                    />
                    <Area
                      type="monotone"
                      dataKey="solde"
                      stroke={FLOWA}
                      strokeWidth={2.5}
                      fill="url(#gradSolde)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ═══════════ ENCAISSEMENTS & DECAISSEMENTS LISTS ═══════════ */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Encaissements */}
          <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={2}>
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-green-500/15">
                      <ArrowDownLeft className="h-4 w-4 text-green-600" />
                    </div>
                    <CardTitle className="text-base">Encaissements prévus</CardTitle>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-[10px]">
                    890 000 FCFA
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                  {encaissements.map((item) => (
                    <div
                      key={item.id}
                      className="group flex items-center gap-3 rounded-xl border border-border/50 bg-white p-3 shadow-sm transition-all hover:shadow-md"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-500/10">
                        <ArrowDownLeft className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.client}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-muted-foreground">{item.date}</span>
                          <Badge
                            variant="outline"
                            className={cn(
                              'text-[9px] px-1 py-0',
                              item.source === 'Flowa'
                                ? 'bg-orange-50 text-orange-600 border-orange-200'
                                : 'bg-sky-50 text-sky-600 border-sky-200',
                            )}
                          >
                            {item.source}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-semibold text-green-600">
                          +{item.montant.toLocaleString('fr-FR')}
                        </p>
                        <div className="flex items-center justify-end gap-1 mt-0.5">
                          <Progress value={item.probabilité} className="h-1 w-12" />
                          <span className="text-[10px] text-muted-foreground">{item.probabilité}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Décaissements */}
          <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={3}>
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-red-500/15">
                      <ArrowUpRight className="h-4 w-4 text-red-600" />
                    </div>
                    <CardTitle className="text-base">Décaissements prévus</CardTitle>
                  </div>
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-[10px]">
                    620 000 FCFA
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                  {decaissements.map((item) => (
                    <div
                      key={item.id}
                      className="group flex items-center gap-3 rounded-xl border border-border/50 bg-white p-3 shadow-sm transition-all hover:shadow-md"
                    >
                      <div
                        className={cn(
                          'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
                          item.urgence === 'haute'
                            ? 'bg-red-500/10'
                            : item.urgence === 'moyenne'
                            ? 'bg-amber-500/10'
                            : 'bg-gray-100',
                        )}
                      >
                        <ArrowUpRight
                          className={cn(
                            'h-4 w-4',
                            item.urgence === 'haute'
                              ? 'text-red-600'
                              : item.urgence === 'moyenne'
                              ? 'text-amber-600'
                              : 'text-gray-500',
                          )}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.description}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-muted-foreground">{item.date}</span>
                          <Badge variant="outline" className="text-[9px] px-1 py-0 bg-gray-50 text-gray-600 border-gray-200">
                            {item.catégorie}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-semibold text-red-600">
                          -{item.montant.toLocaleString('fr-FR')}
                        </p>
                        <Badge
                          variant="outline"
                          className={cn(
                            'text-[9px] px-1 py-0',
                            item.urgence === 'haute'
                              ? 'bg-red-50 text-red-600 border-red-200'
                              : item.urgence === 'moyenne'
                              ? 'bg-amber-50 text-amber-600 border-amber-200'
                              : 'bg-gray-50 text-gray-500 border-gray-200',
                          )}
                        >
                          {item.urgence === 'haute' ? 'Urgent' : item.urgence === 'moyenne' ? 'Moyen' : 'Faible'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* ═══════════ ALERT PANEL ═══════════ */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={4}>
          <Card className="border-red-500/30 bg-red-500/5">
            <CardContent className="flex items-start gap-4 py-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/15">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-red-700">Zone de risque détectée</h3>
                <p className="mt-1 text-sm text-red-600/80 leading-relaxed">
                  ⚠️ Le <strong>18/06</strong>, le solde pourrait descendre à{' '}
                  <strong>120 000 FCFA</strong>. Le loyer (200 000 FCFA) et les salaires (180 000 FCFA)
                  sont prévus la même semaine. Envisagez de reporter un paiement ou d&apos;activer le microcrédit.
                </p>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <Button size="sm" className="bg-red-500 text-xs font-semibold text-white shadow-sm hover:bg-red-600">
                  <ShieldCheck className="mr-1 h-3.5 w-3.5" />
                  Voir le plan
                </Button>
                <Button variant="outline" size="sm" className="text-xs border-red-200 text-red-600 hover:bg-red-50">
                  Microcrédit
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ═══════════ VOICE INPUT MOCKUP ═══════════ */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={5}>
          <Card className="border-orange-500/20 bg-gradient-to-r from-orange-500/5 to-orange-500/10">
            <CardContent className="py-5">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    setIsListening(!isListening);
                    if (!isListening) {
                      setTimeout(() => {
                        setVoiceText("J'ai un loyer de 200 000 à payer demain");
                        setIsListening(false);
                      }, 2000);
                    } else {
                      setVoiceText('');
                    }
                  }}
                  className={cn(
                    'flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-all shadow-lg',
                    isListening
                      ? 'bg-red-500 text-white animate-pulse scale-110'
                      : 'bg-[#FF6600] text-white hover:bg-[#e55c00]',
                  )}
                >
                  {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className="bg-[#FF6600] text-white text-[10px]">Flowa Voice</Badge>
                    <span className="text-xs text-muted-foreground">
                      {isListening ? '🎤 Écoute en cours...' : '🎤 Dites une dépense ou un encaissement'}
                    </span>
                  </div>
                  {voiceText ? (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-lg border border-orange-200 bg-white p-3"
                    >
                      <p className="text-sm font-medium">&ldquo;{voiceText}&rdquo;</p>
                      <div className="mt-2 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span className="text-xs text-green-600 font-semibold">Enregistré automatiquement</span>
                        <Badge variant="outline" className="text-[9px] ml-auto bg-red-50 text-red-600 border-red-200">
                          Décaissement
                        </Badge>
                        <Badge variant="outline" className="text-[9px] bg-amber-50 text-amber-600 border-amber-200">
                          Loyer
                        </Badge>
                      </div>
                    </motion.div>
                  ) : (
                    <p className="text-xs text-muted-foreground italic">
                      Ex: &ldquo;J&apos;ai un loyer de 200 000 à payer demain&rdquo; → Enregistré automatiquement
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ═══════════ AI OPTIMIZATION SUGGESTIONS ═══════════ */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={6}>
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-purple-500/15">
              <Sparkles className="h-4 w-4 text-purple-500" />
            </div>
            <h2 className="text-base font-semibold">Optimisation Cashflow IA</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {aiSuggestions.map((suggestion, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                custom={i}
              >
                <Card className="h-full border-purple-500/15 bg-purple-500/5 hover:shadow-md transition-shadow">
                  <CardContent className="flex flex-col gap-3 p-5">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{suggestion.emoji}</span>
                      <span className="text-sm font-semibold text-purple-700">{suggestion.title}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{suggestion.desc}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-auto gap-1.5 text-xs border-purple-200 text-purple-600 hover:bg-purple-50"
                    >
                      Appliquer
                      <ChevronRight className="h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
