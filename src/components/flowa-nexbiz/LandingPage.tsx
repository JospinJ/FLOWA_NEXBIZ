'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Mic,
  Bell,
  Users,
  FileText,
  Megaphone,
  Shield,
  TrendingUp,
  LayoutDashboard,
  ArrowRight,
  Sparkles,
  DollarSign,
  BarChart3,
  Zap,
  Target,
  Wallet,
  HandCoins,
  MessageSquare,
  Building2,
  CheckCircle2,
  ChevronRight,
  Globe,
  Phone,
  CreditCard,
  Gift,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavStore } from '@/lib/nav-store';

/* ───────────────────────── animation helpers ───────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ───────────────────────── animated counter ────────────────────────── */

function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * target);
      setCount(start);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ───────────────────────── Synergy diagram ─────────────────────────── */

function SynergyDiagram() {
  return (
    <div className="relative flex flex-col items-center gap-4 py-8 md:flex-row md:justify-center md:gap-0">
      {/* NexBiz box */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center gap-2 rounded-2xl border-2 border-teal-400/40 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 px-6 py-5 shadow-lg backdrop-blur-sm md:px-8"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/20">
          <Target className="h-6 w-6 text-teal-400" />
        </div>
        <span className="text-lg font-bold text-teal-300">NexBiz</span>
        <span className="text-xs text-muted-foreground">Agent commercial IA</span>
        <div className="mt-2 flex flex-col gap-1 text-[11px] text-teal-200/80">
          <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Génère des ventes</span>
          <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Acquiert des clients</span>
        </div>
      </motion.div>

      {/* Arrow 1 */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-col items-center gap-1 md:mx-3"
      >
        <span className="whitespace-nowrap rounded-full bg-teal-500/20 px-2 py-0.5 text-[10px] font-medium text-teal-300">
          Ventes & Clients
        </span>
        <div className="flex h-6 w-24 items-center justify-center md:h-auto md:w-20">
          <svg viewBox="0 0 80 24" className="h-6 w-24 md:h-5 md:w-20" fill="none">
            <path d="M0 12 H68 L62 6 M68 12 L62 18" stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </motion.div>

      {/* Flowa box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="relative z-10 flex flex-col items-center gap-2 rounded-2xl border-2 border-orange-400/40 bg-gradient-to-br from-orange-500/10 to-amber-500/10 px-6 py-5 shadow-lg backdrop-blur-sm md:px-8"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/20">
          <Wallet className="h-6 w-6 text-orange-400" />
        </div>
        <span className="text-lg font-bold text-orange-300">Flowa</span>
        <span className="text-xs text-muted-foreground">CFO IA</span>
        <div className="mt-2 flex flex-col gap-1 text-[11px] text-orange-200/80">
          <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Traite l&apos;argent</span>
          <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Gère le cashflow</span>
        </div>
      </motion.div>

      {/* Arrow 2 */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="flex flex-col items-center gap-1 md:mx-3"
      >
        <span className="whitespace-nowrap rounded-full bg-orange-500/20 px-2 py-0.5 text-[10px] font-medium text-orange-300">
          Données financières
        </span>
        <div className="flex h-6 w-24 items-center justify-center md:h-auto md:w-20">
          <svg viewBox="0 0 80 24" className="h-6 w-24 md:h-5 md:w-20" fill="none">
            <path d="M0 12 H68 L62 6 M68 12 L62 18" stroke="#fb923c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </motion.div>

      {/* AI box */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="relative z-10 flex flex-col items-center gap-2 rounded-2xl border-2 border-purple-400/40 bg-gradient-to-br from-purple-500/10 to-pink-500/10 px-6 py-5 shadow-lg backdrop-blur-sm md:px-8"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20">
          <Sparkles className="h-6 w-6 text-purple-400" />
        </div>
        <span className="text-lg font-bold text-purple-300">IA Centrale</span>
        <span className="text-xs text-muted-foreground">Optimisation globale</span>
        <div className="mt-2 flex flex-col gap-1 text-[11px] text-purple-200/80">
          <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Prédit & recommande</span>
          <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Automatise tout</span>
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════ MAIN LANDING PAGE ═══════════════════════════ */

export default function LandingPage() {
  const setView = useNavStore((s) => s.setView);

  /* ── feature data ── */
  const features = [
    { icon: Mic, title: 'Comptabilité vocale', desc: 'Enregistrez vos transactions à la voix, en wolof ou français.' },
    { icon: Bell, title: 'Relances automatiques', desc: 'L\'IA relance vos clients avant les retards de paiement.' },
    { icon: Users, title: 'CRM intelligent', desc: 'Gérez vos contacts et pipelines commerciaux sans effort.' },
    { icon: FileText, title: 'Devis & factures IA', desc: 'Générez devis et factures personnalisés en un clic.' },
    { icon: Megaphone, title: 'Campagnes marketing', desc: 'Créez et lancez des campagnes SMS & WhatsApp ciblées.' },
    { icon: Shield, title: 'Scoring crédit PME', desc: 'Évaluez la solvabilité de vos clients en temps réel.' },
    { icon: TrendingUp, title: 'Prévisions trésorerie', desc: 'Anticipez vos besoins de cash à 30, 60, 90 jours.' },
    { icon: LayoutDashboard, title: 'Dashboard unifié', desc: 'Vue 360° sur ventes, encaissements et rentabilité.' },
  ];

  const orangeBenefits = [
    { icon: CreditCard, title: 'Orange Money', desc: 'Encaissement & décaissement instantané via Orange Money.' },
    { icon: MessageSquare, title: 'SMS Engagement', desc: 'Campagnes SMS & USSD pour toucher chaque client.' },
    { icon: Building2, title: 'B2B PME', desc: 'Réseau de distribution Orange dédié aux PME.' },
    { icon: HandCoins, title: 'Microcrédit', desc: 'Accès au crédit via le scoring IA & Orange Bank.' },
    { icon: Gift, title: 'Fidélisation', desc: 'Programme de points & récompenses Orange.' },
    { icon: Globe, title: 'Connectivité', desc: 'Data & voix adaptés aux besoins business.' },
  ];

  /* ── stats ── */
  const stats = [
    { value: 400, suffix: 'M', label: 'PME en Afrique' },
    { value: 80, suffix: '%', label: 'échouent par manque de cash' },
    { value: 2, suffix: '', label: 'apps = 1 écosystème' },
    { value: 1, suffix: '', label: 'IA qui pense business + finance', prefix: '' },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* ════════════ HERO ════════════ */}
      <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-4 py-20 text-center">
        {/* Animated gradient background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,102,0,0.25) 0%, rgba(255,102,0,0.05) 50%, transparent 80%), radial-gradient(ellipse 60% 50% at 80% 20%, rgba(20,184,166,0.15) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 20% 80%, rgba(168,85,247,0.12) 0%, transparent 60%)',
            }}
          />
          {/* Floating orbs */}
          <motion.div
            animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-[15%] top-[20%] h-72 w-72 rounded-full bg-orange-500/10 blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute right-[10%] top-[30%] h-96 w-96 rounded-full bg-teal-500/8 blur-3xl"
          />
          <motion.div
            animate={{ y: [0, -25, 0], x: [0, 10, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-[15%] left-[40%] h-80 w-80 rounded-full bg-purple-500/8 blur-3xl"
          />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 mx-auto max-w-4xl"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} custom={0} className="mb-6 flex justify-center">
            <Badge
              className="border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-sm text-orange-400 hover:bg-orange-500/20"
              variant="outline"
            >
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Orange Social Camp 2026 — Prototype
            </Badge>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="mb-4 text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          >
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 bg-clip-text text-transparent">
              Flowa
            </span>
            <span className="mx-3 text-muted-foreground/40">×</span>
            <span className="bg-gradient-to-r from-teal-400 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
              NexBiz
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mx-auto mb-3 max-w-2xl text-xl font-semibold text-foreground/90 sm:text-2xl md:text-3xl"
          >
            La Super-App IA qui transforme les PME africaines
          </motion.p>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            custom={3}
            className="mx-auto mb-10 max-w-xl text-base text-muted-foreground sm:text-lg"
          >
            <span className="font-medium text-teal-400">NexBiz</span> génère les ventes.{' '}
            <span className="font-medium text-orange-400">Flowa</span> transforme les ventes en cashflow.{' '}
            <span className="font-medium text-purple-400">L&apos;IA</span> optimise tout.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} custom={4} className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              onClick={() => setView('dashboard')}
              className="h-12 cursor-pointer gap-2 bg-gradient-to-r from-orange-500 to-amber-500 px-8 text-base font-semibold text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:brightness-110"
            >
              <LayoutDashboard className="h-5 w-5" />
              Explorer le Dashboard
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setView('workflows')}
              className="h-12 cursor-pointer gap-2 border-teal-500/40 bg-teal-500/5 px-8 text-base font-semibold text-teal-400 hover:bg-teal-500/10 hover:text-teal-300"
            >
              <Zap className="h-5 w-5" />
              Voir les Workflows
            </Button>
          </motion.div>
        </motion.div>

        {/* Bottom gradient fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ════════════ STATS BANNER ════════════ */}
      <section className="border-y border-border/50 bg-muted/30 px-4 py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              custom={i}
              className="flex flex-col items-center text-center"
            >
              <span className="text-3xl font-extrabold text-orange-500 sm:text-4xl md:text-5xl">
                <AnimatedCounter target={s.value} suffix={s.suffix} prefix={s.prefix} />
              </span>
              <span className="mt-1 text-sm text-muted-foreground sm:text-base">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════ TWO-MODULE SHOWCASE ════════════ */}
      <section className="px-4 py-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <h2 className="mb-3 text-3xl font-bold sm:text-4xl">
            Deux modules,{' '}
            <span className="bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent">
              un écosystème
            </span>
          </h2>
          <p className="text-muted-foreground">
            Chaque module résout la moitié du problème. Ensemble, ils résolvent tout.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {/* Flowa Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <Card className="group relative h-full overflow-hidden border-orange-500/20 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5 transition-shadow hover:shadow-xl hover:shadow-orange-500/10">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-orange-500/10 blur-2xl" />
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-500/20">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-orange-400">Flowa</CardTitle>
                    <CardDescription className="text-orange-300/70">CFO IA — Votre directeur financier intelligent</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { icon: Wallet, text: 'Suivi trésorerie en temps réel' },
                  { icon: BarChart3, text: 'Comptabilité automatique & vocal' },
                  { icon: Bell, text: 'Relances de paiement intelligentes' },
                  { icon: TrendingUp, text: 'Prévisions cashflow IA' },
                  { icon: Shield, text: 'Scoring crédit & microcrédit' },
                  { icon: CreditCard, text: 'Orange Money intégré' },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-orange-500/5">
                    <f.icon className="h-4 w-4 shrink-0 text-orange-400/70" />
                    <span className="text-sm text-foreground/80">{f.text}</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => setView('flowa')}
                  className="w-full cursor-pointer bg-gradient-to-r from-orange-500 to-amber-500 font-semibold text-white shadow-md shadow-orange-500/20 hover:shadow-orange-500/40 hover:brightness-110"
                >
                  Découvrir Flowa
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* NexBiz Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <Card className="group relative h-full overflow-hidden border-teal-500/20 bg-gradient-to-br from-teal-500/5 via-transparent to-cyan-500/5 transition-shadow hover:shadow-xl hover:shadow-teal-500/10">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-teal-500/10 blur-2xl" />
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 shadow-lg shadow-teal-500/20">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-teal-400">NexBiz</CardTitle>
                    <CardDescription className="text-teal-300/70">Agent commercial IA — Votre force de vente augmentée</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { icon: Users, text: 'CRM & gestion clients intelligente' },
                  { icon: FileText, text: 'Devis & factures générés par IA' },
                  { icon: Megaphone, text: 'Campagnes SMS & WhatsApp' },
                  { icon: Phone, text: 'Prospection automatisée' },
                  { icon: BarChart3, text: 'Pipeline commercial visuel' },
                  { icon: Globe, text: 'Marchés B2B Orange' },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-teal-500/5">
                    <f.icon className="h-4 w-4 shrink-0 text-teal-400/70" />
                    <span className="text-sm text-foreground/80">{f.text}</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => setView('nexbiz')}
                  className="w-full cursor-pointer bg-gradient-to-r from-teal-500 to-cyan-500 font-semibold text-white shadow-md shadow-teal-500/20 hover:shadow-teal-500/40 hover:brightness-110"
                >
                  Découvrir NexBiz
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ════════════ SYNERGY DIAGRAM ════════════ */}
      <section className="border-y border-border/50 bg-muted/20 px-4 py-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mb-10 max-w-3xl text-center"
        >
          <h2 className="mb-3 text-3xl font-bold sm:text-4xl">
            La synergie{' '}
            <span className="bg-gradient-to-r from-orange-500 via-purple-500 to-teal-500 bg-clip-text text-transparent">
              qui change tout
            </span>
          </h2>
          <p className="text-muted-foreground">
            Un cycle vertueux où chaque module alimente l&apos;autre, optimisé par l&apos;IA.
          </p>
        </motion.div>

        <SynergyDiagram />

        {/* Feedback loop indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mx-auto mt-6 flex max-w-2xl items-center justify-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/5 px-4 py-2"
        >
          <Sparkles className="h-4 w-4 text-purple-400" />
          <span className="text-sm text-purple-300">
            L&apos;IA analyse les données des deux modules et optimise le cycle en continu
          </span>
        </motion.div>
      </section>

      {/* ════════════ KEY FEATURES GRID ════════════ */}
      <section className="px-4 py-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <h2 className="mb-3 text-3xl font-bold sm:text-4xl">
            Fonctionnalités{' '}
            <span className="bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent">
              clés
            </span>
          </h2>
          <p className="text-muted-foreground">
            8 modules conçus pour les réalités des PME africaines.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((f, i) => (
            <motion.div key={i} variants={fadeUp} custom={i}>
              <Card className="group h-full cursor-default border-border/50 bg-card/50 transition-all hover:border-orange-500/20 hover:shadow-lg hover:shadow-orange-500/5">
                <CardHeader className="pb-2">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500/10 to-teal-500/10 transition-colors group-hover:from-orange-500/20 group-hover:to-teal-500/20">
                    <f.icon className="h-5 w-5 text-orange-500 transition-colors group-hover:text-orange-400" />
                  </div>
                  <CardTitle className="text-base">{f.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ════════════ ORANGE PARTNERSHIP ════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1a0e00] via-[#1a0e00] to-background px-4 py-20">
        {/* Decorative elements */}
        <div className="pointer-events-none absolute inset-0 -z-0">
          <div className="absolute left-[5%] top-[10%] h-64 w-64 rounded-full bg-orange-600/8 blur-3xl" />
          <div className="absolute right-[10%] bottom-[20%] h-80 w-80 rounded-full bg-orange-500/5 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <Badge className="mb-4 border-orange-500/30 bg-orange-500/15 px-4 py-1.5 text-sm text-orange-400" variant="outline">
              <Phone className="mr-1.5 h-3.5 w-3.5" />
              Partenaire stratégique
            </Badge>
            <h2 className="mb-3 text-3xl font-bold text-white sm:text-4xl">
              Propulsé par{' '}
              <span className="text-orange-500">Orange</span>
            </h2>
            <p className="mx-auto max-w-2xl text-orange-200/60">
              L&apos;écosystème Orange amplifie chaque fonctionnalité — paiements, communication, crédit, fidélisation.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {orangeBenefits.map((b, i) => (
              <motion.div key={i} variants={fadeUp} custom={i}>
                <Card className="h-full border-orange-500/10 bg-white/[0.03] backdrop-blur-sm transition-all hover:border-orange-500/20 hover:bg-white/[0.06]">
                  <CardHeader className="pb-2">
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/15">
                      <b.icon className="h-5 w-5 text-orange-400" />
                    </div>
                    <CardTitle className="text-base text-orange-100">{b.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-orange-200/50">{b.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════ FOOTER ════════════ */}
      <footer className="border-t border-border/50 bg-muted/30 px-4 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-teal-500">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold">
              <span className="text-orange-500">Flowa</span>
              <span className="mx-1 text-muted-foreground/40">×</span>
              <span className="text-teal-500">NexBiz</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Flowa × NexBiz — OSC 2026 | Prototype Maquette
          </p>
          <div className="flex gap-3">
            <Badge variant="outline" className="border-orange-500/20 text-orange-400/70">
              Orange Social Camp
            </Badge>
            <Badge variant="outline" className="border-teal-500/20 text-teal-400/70">
              2026
            </Badge>
          </div>
        </div>
      </footer>
    </div>
  );
}
