'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Wallet,
  MessageSquare,
  Building2,
  Landmark,
  Heart,
  ArrowRight,
  Sparkles,
  Smartphone,
  Cloud,
  BarChart3,
  TrendingUp,
  Zap,
  Globe,
  ChevronDown,
  Radio,
  DollarSign,
  Users,
  CreditCard,
  Target,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useNavStore } from '@/lib/nav-store';

/* ───────────────────────── Animation helpers ───────────────────────── */

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
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ───────────────────────── Animated counter ────────────────────────── */

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

/* ───────────────────────── Funnel Step ────────────────────────── */

function FunnelStep({
  label,
  value,
  color,
  width,
  delay,
}: {
  label: string;
  value: string;
  color: string;
  width: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className="flex flex-col items-center"
    >
      <div
        className={`rounded-xl py-3 px-6 text-center text-white font-bold shadow-lg ${width}`}
        style={{ backgroundColor: color }}
      >
        {value}
      </div>
      <span className="mt-2 text-sm font-medium text-muted-foreground">{label}</span>
    </motion.div>
  );
}

/* ═══════════════════════ MAIN COMPONENT ═══════════════════════════ */

export default function OrangeIntegrationPage() {
  const setView = useNavStore((s) => s.setView);

  const valuePillars = [
    {
      icon: Wallet,
      title: 'Orange Money',
      color: '#FF6600',
      desc: "Chaque transaction Flowa passe par Orange Money. 400M PME × paiements quotidiens = volume massif de transactions.",
    },
    {
      icon: MessageSquare,
      title: 'SMS & Engagement',
      color: '#FF8533',
      desc: "Relances, notifications, campagnes — tout via SMS Orange. Engagement client PME x10.",
    },
    {
      icon: Building2,
      title: 'B2B Orange',
      color: '#0EA5E9',
      desc: "Flowa × NexBiz comme porte d'entrée B2B. Orange devient le partenaire numérique #1 des PME.",
    },
    {
      icon: Landmark,
      title: 'Microcrédit',
      color: '#8B5CF6',
      desc: "Scoring IA → microcrédit instantané → décaissement Orange Money. Orange comme banque PME.",
    },
    {
      icon: Heart,
      title: 'Fidélisation',
      color: '#EC4899',
      desc: "Écosystème complet = rétention élevée. PME qui utilise Flowa+NexBiz ne quitte plus Orange.",
    },
  ];

  const integrations = [
    { icon: Radio, label: "Africa's Talking", arrow: '→', target: 'SMS', color: '#0EA5E9' },
    { icon: CreditCard, label: 'Orange Money API', arrow: '→', target: 'Paiements', color: '#FF6600' },
    { icon: Cloud, label: 'Orange Cloud', arrow: '→', target: 'Hébergement', color: '#8B5CF6' },
    { icon: BarChart3, label: 'Orange Data', arrow: '→', target: 'Analytics', color: '#10B981' },
  ];

  const kpis = [
    { icon: TrendingUp, label: 'Volume de transactions', value: 400, suffix: 'M FCFA/mois', color: '#FF6600' },
    { icon: MessageSquare, label: 'SMS envoyés', value: 15, suffix: 'M/mois', color: '#0EA5E9' },
    { icon: Landmark, label: 'Crédits octroyés', value: 50, suffix: 'K/mois', color: '#8B5CF6' },
    { icon: Users, label: 'PME fidélisées', value: 2, suffix: 'M', color: '#10B981' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ════════════ HEADER ════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1a0e00] via-[#2a1500] to-background px-4 py-16 sm:py-20">
        {/* Decorative orbs */}
        <div className="pointer-events-none absolute inset-0 -z-0">
          <motion.div
            animate={{ y: [0, -25, 0], x: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-[10%] top-[15%] h-72 w-72 rounded-full bg-orange-600/15 blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute right-[15%] bottom-[20%] h-64 w-64 rounded-full bg-orange-500/10 blur-3xl"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            {/* Orange Logo placeholder */}
            <motion.div variants={fadeUp} custom={0} className="mb-6 flex justify-center">
              <a href="https://www.orange.cm" target="_blank" rel="noopener noreferrer" aria-label="Orange Cameroun">
                <img src="/logo-orange.svg" alt="Orange Cameroun" className="h-16 w-16 rounded-2xl shadow-xl" />
              </a>
            </motion.div>

            <motion.div variants={fadeUp} custom={1}>
              <Badge className="mb-4 border-orange-500/30 bg-orange-500/15 px-4 py-1.5 text-sm text-orange-400" variant="outline">
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                Partenariat Stratégique
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={2}
              className="mb-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl"
            >
              Intégration Orange —{' '}
              <span className="text-[#FF6600]">Partenariat Stratégique</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={3}
              className="mx-auto mb-8 max-w-3xl text-lg text-orange-100/70 sm:text-xl"
            >
              <span className="font-semibold text-[#FF6600]">Flowa</span>
              <span className="mx-1 text-orange-300/40">×</span>
              <span className="font-semibold text-[#0EA5E9]">NexBiz</span>
              {' = '}
              L&apos;écosystème PME d&apos;Orange en Afrique
            </motion.p>

            <motion.div variants={fadeUp} custom={4} className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                onClick={() => setView('comparison')}
                className="cursor-pointer gap-2 bg-[#FF6600] px-6 font-semibold text-white shadow-lg shadow-orange-500/25 hover:bg-[#FF7722] hover:shadow-orange-500/40"
              >
                <Zap className="h-5 w-5" />
                Voir la comparaison
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setView('usecase')}
                className="cursor-pointer gap-2 border-orange-500/30 bg-orange-500/5 font-semibold text-orange-300 hover:bg-orange-500/10"
              >
                <Globe className="h-5 w-5" />
                Cas d&apos;utilisation
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════ VALUE PILLARS ════════════ */}
      <section className="px-4 py-16 sm:py-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <h2 className="mb-3 text-3xl font-bold sm:text-4xl">
            5 Piliers de{' '}
            <span className="bg-gradient-to-r from-[#FF6600] to-amber-500 bg-clip-text text-transparent">
              Valeur
            </span>
          </h2>
          <p className="text-muted-foreground">
            Chaque pilier crée un avantage compétitif unique pour Orange et les PME africaines.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {valuePillars.map((pillar, i) => (
            <motion.div key={i} variants={fadeUp} custom={i}>
              <Card className="group h-full border-border/50 bg-card/50 transition-all hover:shadow-xl hover:border-orange-500/20 hover:shadow-orange-500/5">
                <CardHeader className="pb-3">
                  <div
                    className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl shadow-md transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${pillar.color}20` }}
                  >
                    <pillar.icon className="h-6 w-6" style={{ color: pillar.color }} />
                  </div>
                  <CardTitle className="text-lg" style={{ color: pillar.color }}>
                    {pillar.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">{pillar.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ════════════ REVENUE FUNNEL ════════════ */}
      <section className="border-y border-border/50 bg-muted/30 px-4 py-16 sm:py-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <h2 className="mb-3 text-3xl font-bold sm:text-4xl">
            Modèle de{' '}
            <span className="bg-gradient-to-r from-[#FF6600] via-[#8B5CF6] to-[#0EA5E9] bg-clip-text text-transparent">
              Revenus
            </span>
          </h2>
          <p className="text-muted-foreground">
            De l&apos;adresse à la monétisation — une trajectoire claire vers la rentabilité.
          </p>
        </motion.div>

        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4">
          <FunnelStep label="PME addressables en Afrique" value="400M PME" color="#FF6600" width="w-full" delay={0} />
          <ArrowRight className="h-5 w-5 rotate-90 text-muted-foreground/40" />
          <FunnelStep label="Utilisateurs actifs" value="10M utilisateurs" color="#FF8533" width="w-4/5" delay={0.15} />
          <ArrowRight className="h-5 w-5 rotate-90 text-muted-foreground/40" />
          <FunnelStep label="Abonnés premium" value="2M abonnés" color="#0EA5E9" width="w-3/5" delay={0.3} />
          <ArrowRight className="h-5 w-5 rotate-90 text-muted-foreground/40" />
          <FunnelStep label="Revenus annuels" value="500M€" color="#8B5CF6" width="w-2/5" delay={0.45} />

          {/* Metric cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-8 grid w-full max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {[
              { label: 'ARPU', value: '250€/an', color: '#FF6600' },
              { label: 'Take rate', value: '2.5%', color: '#0EA5E9' },
              { label: 'Churn', value: '<5%', color: '#10B981' },
              { label: 'CAC', value: '15€', color: '#8B5CF6' },
            ].map((m, i) => (
              <Card key={i} className="border-border/50 text-center">
                <CardContent className="p-4">
                  <p className="text-2xl font-bold" style={{ color: m.color }}>{m.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{m.label}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════ TECHNICAL INTEGRATION DIAGRAM ════════════ */}
      <section className="px-4 py-16 sm:py-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <h2 className="mb-3 text-3xl font-bold sm:text-4xl">
            Intégration{' '}
            <span className="bg-gradient-to-r from-[#FF6600] to-[#0EA5E9] bg-clip-text text-transparent">
              Technique
            </span>
          </h2>
          <p className="text-muted-foreground">
            Les APIs Orange au cœur de chaque transaction et interaction.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2">
          {integrations.map((int, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: 'easeOut' }}
            >
              <Card className="group h-full border-border/50 transition-all hover:shadow-lg">
                <CardContent className="flex items-center gap-4 p-6">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl shadow-md transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${int.color}15` }}
                  >
                    <int.icon className="h-7 w-7" style={{ color: int.color }} />
                  </div>
                  <div className="flex flex-1 items-center gap-3">
                    <div>
                      <p className="font-semibold">{int.label}</p>
                      <p className="text-sm text-muted-foreground">API Orange</p>
                    </div>
                    <ChevronDown className="h-5 w-5 rotate-[-90deg] text-muted-foreground/50" />
                    <div
                      className="rounded-lg px-3 py-1.5 text-sm font-bold text-white"
                      style={{ backgroundColor: int.color }}
                    >
                      {int.target}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Central architecture visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mx-auto mt-10 max-w-3xl"
        >
          <Card className="border-[#FF6600]/20 bg-gradient-to-br from-[#FF6600]/5 via-transparent to-[#0EA5E9]/5">
            <CardContent className="flex flex-col items-center gap-4 p-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF6600] to-[#0EA5E9] shadow-xl">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold">Flowa × NexBiz — Couche Orange</h3>
              <p className="text-center text-sm text-muted-foreground">
                Chaque interaction passe par l&apos;infrastructure Orange : paiements, communication, stockage, analytics.
                Orange est le backbone de l&apos;écosystème PME.
              </p>
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                {['Paiements', 'SMS', 'Cloud', 'Data', 'Crédit', 'USSD'].map((tag, i) => (
                  <Badge key={i} variant="outline" className="border-[#FF6600]/30 text-[#FF6600]">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* ════════════ STRATEGIC KPIs ════════════ */}
      <section className="border-y border-border/50 bg-muted/20 px-4 py-16 sm:py-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <h2 className="mb-3 text-3xl font-bold sm:text-4xl">
            KPIs{' '}
            <span className="bg-gradient-to-r from-[#FF6600] to-[#0EA5E9] bg-clip-text text-transparent">
              Stratégiques
            </span>
          </h2>
          <p className="text-muted-foreground">
            Les indicateurs qui démontrent la valeur du partenariat Orange × Flowa × NexBiz.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {kpis.map((kpi, i) => (
            <motion.div key={i} variants={fadeUp} custom={i}>
              <Card className="h-full border-border/50 text-center transition-all hover:shadow-lg">
                <CardContent className="flex flex-col items-center p-6">
                  <div
                    className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl shadow-md"
                    style={{ backgroundColor: `${kpi.color}15` }}
                  >
                    <kpi.icon className="h-7 w-7" style={{ color: kpi.color }} />
                  </div>
                  <p className="text-3xl font-extrabold" style={{ color: kpi.color }}>
                    <AnimatedCounter target={kpi.value} suffix={kpi.suffix} />
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{kpi.label}</p>
                  <Progress value={75 + i * 5} className="mt-3 h-1.5" style={{ accentColor: kpi.color } as React.CSSProperties} />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ════════════ OSC 2026 CONTEXT ════════════ */}
      <section className="px-4 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl"
        >
          <Card className="overflow-hidden border-[#8B5CF6]/20 bg-gradient-to-br from-[#8B5CF6]/5 via-transparent to-[#FF6600]/5">
            <div className="flex flex-col items-center gap-6 p-8 sm:p-10">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#FF6600] shadow-xl">
                <Target className="h-8 w-8 text-white" />
              </div>
              <div className="text-center">
                <Badge className="mb-4 border-[#8B5CF6]/30 bg-[#8B5CF6]/15 px-4 py-1.5 text-sm text-[#8B5CF6]" variant="outline">
                  <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                  Orange Social Camp 2026
                </Badge>
                <h3 className="mb-4 text-2xl font-bold sm:text-3xl">
                  IA comme accélérateur de{' '}
                  <span className="bg-gradient-to-r from-[#8B5CF6] to-[#FF6600] bg-clip-text text-transparent">
                    business
                  </span>
                </h3>
                <p className="mx-auto max-w-2xl text-muted-foreground leading-relaxed">
                  Thème : <strong className="text-foreground">IA comme accélérateur de business</strong>. 
                  Flowa × NexBiz illustre parfaitement cette vision. L&apos;IA n&apos;est pas un gadget — 
                  elle est le moteur qui transforme les données en décisions, les décisions en actions, 
                  et les actions en revenus. Pour Orange, c&apos;est la preuve que l&apos;IA peut créer 
                  un écosystème complet et rentable autour de la PME africaine.
                </p>
              </div>

              {/* OSC Pillars */}
              <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  { icon: DollarSign, label: 'Business', desc: 'Nouveau revenu récurrent', color: '#FF6600' },
                  { icon: Users, label: 'Impact', desc: '400M PME transformées', color: '#0EA5E9' },
                  { icon: Sparkles, label: 'Innovation', desc: 'IA comme différenciateur', color: '#8B5CF6' },
                ].map((p, i) => (
                  <div key={i} className="flex flex-col items-center rounded-xl border border-border/50 p-4 text-center">
                    <div
                      className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${p.color}15` }}
                    >
                      <p.icon className="h-5 w-5" style={{ color: p.color }} />
                    </div>
                    <p className="font-semibold" style={{ color: p.color }}>{p.label}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}
