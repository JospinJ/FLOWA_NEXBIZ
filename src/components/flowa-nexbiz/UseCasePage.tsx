'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Store,
  Users,
  MessageSquare,
  FileText,
  CheckCircle2,
  Bell,
  AlertTriangle,
  Megaphone,
  CreditCard,
  TrendingUp,
  Heart,
  Wallet,
  Target,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Clock,
  DollarSign,
  Phone,
  Landmark,
  Star,
  BarChart3,
  UserCheck,
  CircleDollarSign,
  BookOpen,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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

function AnimatedCounter({ target, suffix = '', prefix = '', decimals = 0 }: { target: number; suffix?: string; prefix?: string; decimals?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      if (decimals > 0) {
        setCount(parseFloat(current.toFixed(decimals)));
      } else {
        setCount(Math.round(current));
      }
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, target, decimals]);

  return (
    <span ref={ref}>
      {prefix}
      {decimals > 0 ? count.toFixed(decimals) : count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ───────────────────────── Timeline connector ────────────────────────── */

function TimelineConnector({ color = '#8B5CF6' }: { color?: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="h-8 w-0.5" style={{ backgroundColor: `${color}30` }} />
    </div>
  );
}

/* ───────────────────────── Timeline Dot ────────────────────────── */

function TimelineDot({ color, icon: Icon }: { color: string; icon: React.ElementType }) {
  return (
    <div
      className="z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 shadow-lg"
      style={{ borderColor: color, backgroundColor: `${color}20` }}
    >
      <Icon className="h-5 w-5" style={{ color }} />
    </div>
  );
}

/* ═══════════════════════ MAIN COMPONENT ═══════════════════════════ */

export default function UseCasePage() {
  const setView = useNavStore((s) => s.setView);

  const bilanMetrics = [
    { label: 'Revenus', value: 800000, suffix: ' FCFA', prefix: '+', color: '#10B981', icon: TrendingUp },
    { label: 'Créances récupérées', value: 100, suffix: '%', color: '#0EA5E9', icon: CheckCircle2 },
    { label: 'Cashflow', value: 1, suffix: '', prefix: '', displayText: 'Positif & prévisible', color: '#FF6600', icon: Wallet },
    { label: 'Nouveaux clients', value: 3, suffix: '', prefix: '+', color: '#8B5CF6', icon: Users },
    { label: 'Score crédit', value: 82, suffix: '/100', color: '#EC4899', icon: Star },
  ];

  const orangeMetrics = [
    { label: 'Transactions Orange Money', value: 4, icon: CreditCard, color: '#FF6600' },
    { label: 'SMS envoyés', value: 15, icon: MessageSquare, color: '#0EA5E9' },
    { label: 'Microcrédits', value: 1, icon: Landmark, color: '#8B5CF6' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ════════════ HEADER ════════════ */}
      <section className="relative overflow-hidden px-4 py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute inset-0 opacity-25"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 30% 40%, rgba(14,165,233,0.2) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 70% 60%, rgba(255,102,0,0.2) 0%, transparent 60%)',
            }}
          />
        </div>

        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="mx-auto max-w-5xl text-center">
          <motion.div variants={fadeUp} custom={0}>
            <Badge className="mb-4 border-[#0EA5E9]/30 bg-[#0EA5E9]/15 px-4 py-1.5 text-sm text-[#0EA5E9]" variant="outline">
              <BookOpen className="mr-1.5 h-3.5 w-3.5" />
              Cas d&apos;Utilisation
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl"
          >
            L&apos;Histoire de{' '}
            <span className="bg-gradient-to-r from-[#0EA5E9] to-[#8B5CF6] bg-clip-text text-transparent">
              Mme Koné
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} custom={2} className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Comment Flowa × NexBiz transforment une PME en 30 jours
          </motion.p>
        </motion.div>
      </section>

      {/* ════════════ TIMELINE ════════════ */}
      <section className="px-4 pb-16">
        <div className="mx-auto max-w-3xl">

          {/* ──── PROLOGUE ──── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Card className="border-[#8B5CF6]/20 bg-gradient-to-br from-[#8B5CF6]/5 to-transparent overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <TimelineDot color="#8B5CF6" icon={Store} />
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge className="bg-[#8B5CF6]/15 text-[#8B5CF6] border-[#8B5CF6]/30" variant="outline">
                        Prologue
                      </Badge>
                    </div>
                    <h3 className="text-lg font-bold mb-2">Mme Koné, restauratrice à Abidjan</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      3 employés, CA: 2,400,000 FCFA/mois. Problème: <strong className="text-red-400">40% de ses clients payent en retard</strong>.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs border-red-500/30 text-red-400">
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        40% retards
                      </Badge>
                      <Badge variant="outline" className="text-xs border-[#FF6600]/30 text-[#FF6600]">
                        <Wallet className="mr-1 h-3 w-3" />
                        Cashflow tendu
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <TimelineConnector color="#8B5CF6" />

          {/* ──── MONDAY 9H — NEXBIZ ──── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Card className="border-[#0EA5E9]/20 bg-gradient-to-br from-[#0EA5E9]/5 to-transparent overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <TimelineDot color="#0EA5E9" icon={Target} />
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge className="bg-[#0EA5E9]/15 text-[#0EA5E9] border-[#0EA5E9]/30" variant="outline">
                        <Clock className="mr-1 h-3 w-3" />
                        Lundi 9h
                      </Badge>
                      <Badge className="bg-[#0EA5E9]/15 text-[#0EA5E9] border-[#0EA5E9]/30" variant="outline">
                        NexBiz
                      </Badge>
                    </div>
                    <h3 className="text-lg font-bold mb-2">NexBiz entre en scène</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      Mme Koné ouvre l&apos;app. <strong className="text-[#0EA5E9]">NexBiz lui montre 3 nouveaux prospects</strong> détectés par l&apos;IA dans son quartier.
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Elle clique <em>&quot;Contacter&quot;</em> — un <strong className="text-[#0EA5E9]">SMS personnalisé est envoyé automatiquement</strong>.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs border-[#0EA5E9]/30 text-[#0EA5E9]">
                        <UserCheck className="mr-1 h-3 w-3" />
                        3 prospects IA
                      </Badge>
                      <Badge variant="outline" className="text-xs border-[#0EA5E9]/30 text-[#0EA5E9]">
                        <MessageSquare className="mr-1 h-3 w-3" />
                        SMS auto
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <TimelineConnector color="#0EA5E9" />

          {/* ──── MONDAY 14H — CLIENT RÉPOND ──── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Card className="border-[#0EA5E9]/20 bg-gradient-to-br from-[#0EA5E9]/5 to-transparent overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <TimelineDot color="#0EA5E9" icon={Phone} />
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge className="bg-[#0EA5E9]/15 text-[#0EA5E9] border-[#0EA5E9]/30" variant="outline">
                        <Clock className="mr-1 h-3 w-3" />
                        Lundi 14h
                      </Badge>
                    </div>
                    <h3 className="text-lg font-bold mb-2">Un client répond !</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                      <strong>M. Diallo</strong>, boutique voisine, veut commander 50 repas/semaine.
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      NexBiz crée automatiquement un devis: <strong className="text-[#0EA5E9]">350,000 FCFA/mois</strong>.
                    </p>

                    {/* Client card + Devis mockup */}
                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="rounded-lg border border-[#0EA5E9]/15 bg-[#0EA5E9]/5 p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-[#0EA5E9]/20 text-[#0EA5E9] text-xs font-bold">MD</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-semibold">M. Diallo</p>
                            <p className="text-[10px] text-muted-foreground">Boutique voisine</p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Badge variant="outline" className="text-[10px] border-green-500/30 text-green-400">
                            <CheckCircle2 className="mr-0.5 h-2.5 w-2.5" />
                            Prospect qualifié
                          </Badge>
                        </div>
                      </div>
                      <div className="rounded-lg border border-[#FF6600]/15 bg-[#FF6600]/5 p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="h-5 w-5 text-[#FF6600]" />
                          <span className="text-sm font-semibold text-[#FF6600]">Devis #001</span>
                        </div>
                        <p className="text-lg font-bold">350,000 <span className="text-sm font-normal text-muted-foreground">FCFA/mois</span></p>
                        <p className="text-[10px] text-muted-foreground">50 repas × semaine</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <TimelineConnector color="#0EA5E9" />

          {/* ──── TUESDAY 10H — DEVIS ACCEPTÉ ──── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Card className="border-[#FF6600]/20 bg-gradient-to-br from-[#FF6600]/5 to-transparent overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <TimelineDot color="#FF6600" icon={FileText} />
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge className="bg-[#FF6600]/15 text-[#FF6600] border-[#FF6600]/30" variant="outline">
                        <Clock className="mr-1 h-3 w-3" />
                        Mardi 10h
                      </Badge>
                      <Badge className="bg-[#FF6600]/15 text-[#FF6600] border-[#FF6600]/30" variant="outline">
                        Flowa
                      </Badge>
                    </div>
                    <h3 className="text-lg font-bold mb-2">Devis accepté ✓</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                      M. Diallo accepte le devis par SMS.
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <strong className="text-[#FF6600]">Flowa crée automatiquement une créance</strong> de 350,000 FCFA, échéance J+30.
                    </p>
                    <div className="mt-3 rounded-lg border border-[#FF6600]/15 bg-[#FF6600]/5 p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Créance créée</span>
                        <span className="text-lg font-bold text-[#FF6600]">350,000 FCFA</span>
                      </div>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Échéance</span>
                        <span className="text-xs font-medium">J+30</span>
                      </div>
                      <Progress value={0} className="mt-2 h-2" style={{ accentColor: '#FF6600' } as React.CSSProperties} />
                      <p className="mt-1 text-[10px] text-right text-muted-foreground">0% payé</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <TimelineConnector color="#FF6600" />

          {/* ──── JOUR 15 — PREMIER PAIEMENT ──── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Card className="border-[#FF6600]/20 bg-gradient-to-br from-[#FF6600]/5 to-transparent overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <TimelineDot color="#FF6600" icon={Bell} />
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge className="bg-[#FF6600]/15 text-[#FF6600] border-[#FF6600]/30" variant="outline">
                        <Clock className="mr-1 h-3 w-3" />
                        Jour 15
                      </Badge>
                      <Badge className="bg-[#FF6600]/15 text-[#FF6600] border-[#FF6600]/30" variant="outline">
                        Flowa
                      </Badge>
                    </div>
                    <h3 className="text-lg font-bold mb-2">Premier paiement</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                      Flowa envoie un rappel automatique: <em>&quot;Votre facture de 350,000 FCFA arrive à échéance dans 15 jours.&quot;</em>
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      M. Diallo paie via <strong className="text-[#FF6600]">Orange Money: 350,000 FCFA</strong>.
                    </p>
                    <div className="mt-3 rounded-lg border border-green-500/15 bg-green-500/5 p-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span className="text-sm font-semibold text-green-600">Paiement reçu — Orange Money</span>
                      </div>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Montant</span>
                        <span className="text-sm font-bold text-green-600">350,000 FCFA</span>
                      </div>
                      <Progress value={100} className="mt-2 h-2" style={{ accentColor: '#10B981' } as React.CSSProperties} />
                      <p className="mt-1 text-[10px] text-right text-green-500">100% payé ✓</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <TimelineConnector color="#FF6600" />

          {/* ──── JOUR 20 — ALERTE IA ──── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Card className="border-[#8B5CF6]/20 bg-gradient-to-br from-[#8B5CF6]/5 to-transparent overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <TimelineDot color="#8B5CF6" icon={AlertTriangle} />
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge className="bg-[#8B5CF6]/15 text-[#8B5CF6] border-[#8B5CF6]/30" variant="outline">
                        <Clock className="mr-1 h-3 w-3" />
                        Jour 20
                      </Badge>
                      <Badge className="bg-[#8B5CF6]/15 text-[#8B5CF6] border-[#8B5CF6]/30" variant="outline">
                        <Sparkles className="mr-1 h-3 w-3" />
                        IA Flowa
                      </Badge>
                    </div>
                    <h3 className="text-lg font-bold mb-2">Alerte IA — Overdraft Radar</h3>
                    <div className="rounded-lg border border-amber-500/15 bg-amber-500/5 p-3 mb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                        <span className="text-sm font-semibold text-amber-600">Overdraft Radar</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        ⚠️ Stock de riz bas, dépense prévue: <strong>200,000 FCFA</strong>.
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <strong className="text-[#8B5CF6]">IA: &quot;Commandez maintenant, votre cashflow le permet.&quot;</strong>
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs border-[#8B5CF6]/30 text-[#8B5CF6]">
                        <Sparkles className="mr-1 h-3 w-3" />
                        Prédiction IA
                      </Badge>
                      <Badge variant="outline" className="text-xs border-[#FF6600]/30 text-[#FF6600]">
                        <Wallet className="mr-1 h-3 w-3" />
                        Cashflow OK
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <TimelineConnector color="#8B5CF6" />

          {/* ──── JOUR 25 — CAMPAGNE NEXBIZ ──── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Card className="border-[#0EA5E9]/20 bg-gradient-to-br from-[#0EA5E9]/5 to-transparent overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <TimelineDot color="#0EA5E9" icon={Megaphone} />
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge className="bg-[#0EA5E9]/15 text-[#0EA5E9] border-[#0EA5E9]/30" variant="outline">
                        <Clock className="mr-1 h-3 w-3" />
                        Jour 25
                      </Badge>
                      <Badge className="bg-[#0EA5E9]/15 text-[#0EA5E9] border-[#0EA5E9]/30" variant="outline">
                        NexBiz
                      </Badge>
                    </div>
                    <h3 className="text-lg font-bold mb-2">Campagne NexBiz</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                      <strong className="text-[#0EA5E9]">NexBiz IA: &quot;3 clients inactifs depuis 30j. Campagne SMS recommandée.&quot;</strong>
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                      Mme Koné lance la campagne — <strong>25,000 FCFA investis</strong>.
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Résultat: <strong className="text-green-500">2 commandes, 450,000 FCFA de CA</strong>.
                    </p>

                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <div className="rounded-lg border border-[#0EA5E9]/15 bg-[#0EA5E9]/5 p-2.5 text-center">
                        <p className="text-xs text-muted-foreground">Investissement</p>
                        <p className="text-lg font-bold text-[#0EA5E9]">25,000</p>
                        <p className="text-[10px] text-muted-foreground">FCFA</p>
                      </div>
                      <div className="rounded-lg border border-green-500/15 bg-green-500/5 p-2.5 text-center">
                        <p className="text-xs text-muted-foreground">Retour</p>
                        <p className="text-lg font-bold text-green-500">450,000</p>
                        <p className="text-[10px] text-muted-foreground">FCFA (ROI ×18)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <TimelineConnector color="#0EA5E9" />

          {/* ──── JOUR 30 — SCORING CRÉDIT ──── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Card className="border-[#8B5CF6]/20 bg-gradient-to-br from-[#8B5CF6]/5 to-transparent overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <TimelineDot color="#8B5CF6" icon={Landmark} />
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge className="bg-[#8B5CF6]/15 text-[#8B5CF6] border-[#8B5CF6]/30" variant="outline">
                        <Clock className="mr-1 h-3 w-3" />
                        Jour 30
                      </Badge>
                      <Badge className="bg-[#8B5CF6]/15 text-[#8B5CF6] border-[#8B5CF6]/30" variant="outline">
                        Flowa
                      </Badge>
                    </div>
                    <h3 className="text-lg font-bold mb-2">Scoring crédit → Microcrédit</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      <strong className="text-[#8B5CF6]">Flowa Score: 82/100</strong>. Microcrédit disponible: <strong className="text-green-500">500,000 FCFA</strong>.
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Mme Koné accepte — <strong className="text-[#FF6600]">500,000 FCFA sur son Orange Money en instantané</strong>.
                    </p>

                    {/* Score visual */}
                    <div className="mt-4 rounded-lg border border-[#8B5CF6]/15 bg-[#8B5CF6]/5 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium">Score de crédit</span>
                        <span className="text-2xl font-extrabold text-[#8B5CF6]">82/100</span>
                      </div>
                      <Progress value={82} className="h-3" style={{ accentColor: '#8B5CF6' } as React.CSSProperties} />
                      <div className="mt-3 flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-[#FF6600]" />
                        <span className="text-sm font-semibold text-[#FF6600]">500,000 FCFA décaissés via Orange Money ✓</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <TimelineConnector color="#10B981" />

          {/* ──── BILAN ──── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7 }}
          >
            <Card className="overflow-hidden border-green-500/20 bg-gradient-to-br from-green-500/5 via-[#8B5CF6]/5 to-[#FF6600]/5">
              <CardContent className="p-6 sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF6600] via-[#8B5CF6] to-[#0EA5E9] shadow-xl">
                    <BarChart3 className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Bilan — 30 jours</h3>
                    <p className="text-sm text-muted-foreground">Résultats concrets pour Mme Koné</p>
                  </div>
                </div>

                {/* Metric cards */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 mb-6">
                  {bilanMetrics.map((m, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    >
                      <Card className="border-border/50 text-center h-full">
                        <CardContent className="flex flex-col items-center p-4">
                          <div
                            className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg"
                            style={{ backgroundColor: `${m.color}15` }}
                          >
                            <m.icon className="h-4 w-4" style={{ color: m.color }} />
                          </div>
                          {m.displayText ? (
                            <p className="text-sm font-bold" style={{ color: m.color }}>{m.displayText}</p>
                          ) : (
                            <p className="text-xl font-extrabold" style={{ color: m.color }}>
                              <AnimatedCounter target={m.value} suffix={m.suffix} prefix={m.prefix} />
                            </p>
                          )}
                          <p className="mt-1 text-[10px] text-muted-foreground">{m.label}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Orange impact */}
                <div className="rounded-xl border border-[#FF6600]/15 bg-[#FF6600]/5 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#FF6600]" />
                    <span className="text-sm font-bold text-[#FF6600]">Impact Orange</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {orangeMetrics.map((m, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                        className="text-center"
                      >
                        <div className="flex items-center justify-center gap-1">
                          <m.icon className="h-4 w-4" style={{ color: m.color }} />
                          <span className="text-xl font-extrabold" style={{ color: m.color }}>
                            <AnimatedCounter target={m.value} />
                          </span>
                        </div>
                        <p className="mt-1 text-[10px] text-muted-foreground">{m.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                  <Button
                    onClick={() => setView('orange')}
                    className="cursor-pointer gap-2 bg-[#FF6600] font-semibold text-white shadow-lg shadow-orange-500/25 hover:bg-[#FF7722]"
                  >
                    <Phone className="h-4 w-4" />
                    Voir l&apos;intégration Orange
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setView('comparison')}
                    className="cursor-pointer gap-2 border-[#0EA5E9]/30 font-semibold text-[#0EA5E9] hover:bg-[#0EA5E9]/5"
                  >
                    <Sparkles className="h-4 w-4" />
                    Comparaison Flowa × NexBiz
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
