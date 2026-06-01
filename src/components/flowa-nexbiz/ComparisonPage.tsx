'use client';

import { motion } from 'framer-motion';
import {
  Wallet,
  Target,
  Mic,
  MessageSquare,
  BarChart3,
  Sparkles,
  TrendingUp,
  CreditCard,
  Users,
  ArrowRight,
  Zap,
  Brain,
  Eye,
  CheckCircle2,
  Phone,
  Building2,
  DollarSign,
  FileText,
  Megaphone,
  Landmark,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavStore } from '@/lib/nav-store';

/* ───────────────────────── Animation helpers ───────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ───────────────────────── Venn Diagram ────────────────────────── */

function VennDiagram() {
  return (
    <div className="relative mx-auto flex items-center justify-center py-12" style={{ minHeight: 320 }}>
      {/* Flowa circle */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 flex h-64 w-64 items-center justify-center rounded-full border-2 border-[#FF6600]/30 bg-[#FF6600]/10 sm:h-72 sm:w-72"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <Wallet className="h-8 w-8 text-[#FF6600]" />
          <span className="text-lg font-bold text-[#FF6600]">Flowa</span>
          <div className="flex flex-col gap-1 text-[11px] text-[#FF6600]/80">
            <span>Comptabilité</span>
            <span>Relances</span>
            <span>Scoring</span>
          </div>
        </div>
      </motion.div>

      {/* Intersection */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        className="absolute z-20 flex h-32 w-32 flex-col items-center justify-center rounded-full border-2 border-[#8B5CF6]/40 bg-[#8B5CF6]/20 backdrop-blur-sm sm:h-36 sm:w-36"
      >
        <Sparkles className="mb-1 h-6 w-6 text-[#8B5CF6]" />
        <span className="text-sm font-bold text-[#8B5CF6]">IA Centrale</span>
        <span className="mt-0.5 text-[10px] text-[#8B5CF6]/80">Shared AI</span>
      </motion.div>

      {/* NexBiz circle */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 -ml-12 flex h-64 w-64 items-center justify-center rounded-full border-2 border-[#0EA5E9]/30 bg-[#0EA5E9]/10 sm:-ml-16 sm:h-72 sm:w-72"
      >
        <div className="flex flex-col items-center gap-2 text-center pl-6 sm:pl-8">
          <Target className="h-8 w-8 text-[#0EA5E9]" />
          <span className="text-lg font-bold text-[#0EA5E9]">NexBiz</span>
          <div className="flex flex-col gap-1 text-[11px] text-[#0EA5E9]/80">
            <span>Clients</span>
            <span>Campagnes</span>
            <span>Devis</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════ MAIN COMPONENT ═══════════════════════════ */

export default function ComparisonPage() {
  const setView = useNavStore((s) => s.setView);

  const comparisons = [
    {
      criterion: 'Rôle',
      icon: Brain,
      flowa: 'CFO IA (Finance)',
      nexbiz: 'Agent commercial IA (CRM)',
    },
    {
      criterion: 'Mission',
      icon: Target,
      flowa: 'Transformer les ventes en cashflow',
      nexbiz: 'Générer des ventes et clients',
    },
    {
      criterion: 'Fonctions clés',
      icon: Zap,
      flowa: 'Comptabilité vocale, Relances, Prévisions cashflow, Scoring crédit',
      nexbiz: 'Gestion clients, Devis, Campagnes marketing, Prise de RDV',
    },
    {
      criterion: 'Canal principal',
      icon: Phone,
      flowa: 'WhatsApp vocal + SMS',
      nexbiz: 'App web + SMS + Posts',
    },
    {
      criterion: "Type d'IA",
      icon: Sparkles,
      flowa: 'Analyse financière + Prédictive',
      nexbiz: 'Génération contenu + Recommandation',
    },
    {
      criterion: 'Impact PME',
      icon: TrendingUp,
      flowa: 'Cashflow sécurisé, Créances récupérées',
      nexbiz: 'Plus de clients, Plus de ventes',
    },
    {
      criterion: 'Impact Orange',
      icon: Building2,
      flowa: 'Volume Orange Money, Microcrédit',
      nexbiz: 'Volume SMS, Engagement B2B',
    },
    {
      criterion: 'Données',
      icon: BarChart3,
      flowa: 'Transactions, Paiements, Dépenses',
      nexbiz: 'Clients, Prospects, Interactions',
    },
  ];

  const synergies = [
    {
      icon: DollarSign,
      text: "NexBiz crée la vente → Flowa encaisse l'argent",
      color: '#FF6600',
    },
    {
      icon: Eye,
      text: "Flowa détecte un risque → NexBiz ajuste la stratégie",
      color: '#0EA5E9',
    },
    {
      icon: Sparkles,
      text: "L'IA unifie les données → Décisions optimales",
      color: '#8B5CF6',
    },
    {
      icon: BarChart3,
      text: "Dashboard unique → Vision 360° pour la PME et Orange",
      color: '#10B981',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ════════════ HEADER ════════════ */}
      <section className="relative overflow-hidden px-4 py-16 sm:py-20">
        {/* Gradient background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 30% 40%, rgba(255,102,0,0.15) 0%, transparent 60%), radial-gradient(ellipse 80% 60% at 70% 40%, rgba(14,165,233,0.15) 0%, transparent 60%)',
            }}
          />
        </div>

        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="mx-auto max-w-5xl text-center">
          <motion.div variants={fadeUp} custom={0}>
            <Badge className="mb-4 border-[#8B5CF6]/30 bg-[#8B5CF6]/15 px-4 py-1.5 text-sm text-[#8B5CF6]" variant="outline">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Comparaison Stratégique
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl"
          >
            Flowa vs NexBiz —{' '}
            <span className="bg-gradient-to-r from-[#FF6600] via-[#8B5CF6] to-[#0EA5E9] bg-clip-text text-transparent">
              Deux forces, une synergie
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} custom={2} className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Chaque module résout la moitié du problème. Ensemble, ils résolvent tout.
          </motion.p>
        </motion.div>
      </section>

      {/* ════════════ COMPARISON TABLE ════════════ */}
      <section className="px-4 pb-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto max-w-5xl"
        >
          <Card className="overflow-hidden border-border/50">
            {/* Table header */}
            <div className="grid grid-cols-3 border-b bg-muted/30">
              <div className="flex items-center justify-center gap-2 p-4 sm:p-5">
                <Wallet className="h-5 w-5 text-[#FF6600]" />
                <span className="text-lg font-bold text-[#FF6600]">Flowa</span>
              </div>
              <div className="flex items-center justify-center border-x p-4 sm:p-5">
                <span className="text-sm font-semibold text-muted-foreground">Critère</span>
              </div>
              <div className="flex items-center justify-center gap-2 p-4 sm:p-5">
                <Target className="h-5 w-5 text-[#0EA5E9]" />
                <span className="text-lg font-bold text-[#0EA5E9]">NexBiz</span>
              </div>
            </div>

            {/* Table rows */}
            {comparisons.map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className={`grid grid-cols-3 ${
                  i < comparisons.length - 1 ? 'border-b' : ''
                } hover:bg-muted/20 transition-colors`}
              >
                {/* Flowa value */}
                <div className="flex items-start p-4 sm:p-5">
                  <div className="rounded-lg bg-[#FF6600]/5 p-2.5 sm:p-3 text-sm leading-relaxed text-foreground/80 w-full">
                    {row.flowa}
                  </div>
                </div>
                {/* Criterion */}
                <div className="flex flex-col items-center justify-center gap-1.5 border-x p-4 sm:p-5 text-center">
                  <row.icon className="h-4 w-4 text-muted-foreground/60" />
                  <span className="text-sm font-semibold text-foreground">{row.criterion}</span>
                </div>
                {/* NexBiz value */}
                <div className="flex items-start p-4 sm:p-5">
                  <div className="rounded-lg bg-[#0EA5E9]/5 p-2.5 sm:p-3 text-sm leading-relaxed text-foreground/80 w-full">
                    {row.nexbiz}
                  </div>
                </div>
              </motion.div>
            ))}
          </Card>
        </motion.div>
      </section>

      {/* ════════════ VENN DIAGRAM ════════════ */}
      <section className="border-y border-border/50 bg-muted/20 px-4 py-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mb-8 max-w-3xl text-center"
        >
          <h2 className="mb-3 text-3xl font-bold sm:text-4xl">
            Les deux cercles{' '}
            <span className="bg-gradient-to-r from-[#FF6600] via-[#8B5CF6] to-[#0EA5E9] bg-clip-text text-transparent">
              se rejoignent
            </span>
          </h2>
          <p className="text-muted-foreground">
            L&apos;intersection est l&apos;endroit où la magie opère — l&apos;IA Centrale unifie les deux mondes.
          </p>
        </motion.div>

        <VennDiagram />

        {/* Shared capabilities in the intersection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mx-auto mt-4 flex max-w-2xl flex-wrap justify-center gap-2"
        >
          {['Dashboard unifié', 'Orange Money', 'SMS', 'IA prédictive', 'Scoring', 'Analytics'].map((tag, i) => (
            <Badge key={i} variant="outline" className="border-[#8B5CF6]/30 bg-[#8B5CF6]/5 text-[#8B5CF6]">
              <Sparkles className="mr-1 h-3 w-3" />
              {tag}
            </Badge>
          ))}
        </motion.div>
      </section>

      {/* ════════════ SYNERGY SECTION ════════════ */}
      <section className="px-4 py-16 sm:py-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <h2 className="mb-3 text-3xl font-bold sm:text-4xl">
            Synergie :{' '}
            <span className="bg-gradient-to-r from-[#FF6600] via-[#8B5CF6] to-[#0EA5E9] bg-clip-text text-transparent">
              1 + 1 = 3
            </span>
          </h2>
          <p className="text-muted-foreground">
            L&apos;union de Flowa et NexBiz crée plus que la somme de leurs parties.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2"
        >
          {synergies.map((s, i) => (
            <motion.div key={i} variants={fadeUp} custom={i}>
              <Card className="group h-full border-border/50 transition-all hover:shadow-lg">
                <CardContent className="flex items-start gap-4 p-6">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-md transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${s.color}15` }}
                  >
                    <s.icon className="h-6 w-6" style={{ color: s.color }} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold" style={{ color: s.color }}>
                        {i === 0 ? 'Ventes → Cash' : i === 1 ? 'Risque → Action' : i === 2 ? 'Données → Décisions' : 'Vision 360°'}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ════════════ FINAL STATEMENT ════════════ */}
      <section className="border-t border-border/50 bg-muted/20 px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl"
        >
          <Card className="overflow-hidden border-[#8B5CF6]/20 bg-gradient-to-br from-[#FF6600]/5 via-[#8B5CF6]/5 to-[#0EA5E9]/5">
            <CardContent className="flex flex-col items-center gap-6 p-8 sm:p-10">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF6600] via-[#8B5CF6] to-[#0EA5E9] shadow-xl">
                <Zap className="h-8 w-8 text-white" />
              </div>

              <div className="text-center space-y-4">
                <div className="flex flex-col gap-2">
                  <p className="text-base text-muted-foreground">
                    <span className="font-semibold text-[#FF6600]">Flowa sans NexBiz</span> = argent sans clients.
                  </p>
                  <p className="text-base text-muted-foreground">
                    <span className="font-semibold text-[#0EA5E9]">NexBiz sans Flowa</span> = clients sans argent.
                  </p>
                </div>
                <p className="text-2xl font-extrabold sm:text-3xl">
                  Ensemble ={' '}
                  <span className="bg-gradient-to-r from-[#FF6600] via-[#8B5CF6] to-[#0EA5E9] bg-clip-text text-transparent">
                    écosystème complet
                  </span>
                </p>
              </div>

              <div className="flex flex-col items-center gap-3 sm:flex-row">
                <Button
                  onClick={() => setView('orange')}
                  className="cursor-pointer gap-2 bg-[#FF6600] font-semibold text-white shadow-lg shadow-orange-500/25 hover:bg-[#FF7722]"
                >
                  <Building2 className="h-4 w-4" />
                  Intégration Orange
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setView('usecase')}
                  className="cursor-pointer gap-2 border-[#0EA5E9]/30 font-semibold text-[#0EA5E9] hover:bg-[#0EA5E9]/5"
                >
                  <FileText className="h-4 w-4" />
                  Cas d&apos;utilisation
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}
