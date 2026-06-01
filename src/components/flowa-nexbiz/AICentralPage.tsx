'use client';

import { motion } from 'framer-motion';
import {
  Brain,
  Cpu,
  Database,
  Sparkles,
  ArrowRight,
  ArrowLeftRight,
  Zap,
  MessageSquare,
  Mic,
  Target,
  Shield,
  TrendingUp,
  Layers,
  BookOpen,
  Lightbulb,
  CheckCircle2,
  ChevronRight,
  GitBranch,
  Bell,
  Award,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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

const pulseGlow = {
  animate: {
    boxShadow: [
      '0 0 0 0 rgba(139, 92, 246, 0.3)',
      '0 0 20px 8px rgba(139, 92, 246, 0.15)',
      '0 0 0 0 rgba(139, 92, 246, 0.3)',
    ],
  },
  transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
};

/* ═══════════════════════ ARCHITECTURE DIAGRAM ═══════════════════════ */

function ArchitectureDiagram() {
  return (
    <div className="relative mx-auto w-full max-w-2xl py-8">
      <svg
        viewBox="0 0 600 280"
        fill="none"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Connection lines - Flowa to Central */}
        <motion.path
          d="M 120 140 Q 200 100 280 140"
          stroke={FLOWA}
          strokeWidth="2.5"
          strokeDasharray="8 4"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
        />
        {/* Connection lines - NexBiz to Central */}
        <motion.path
          d="M 480 140 Q 400 100 320 140"
          stroke={NEXBIZ}
          strokeWidth="2.5"
          strokeDasharray="8 4"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', delay: 0.5 }}
        />
        {/* Reverse flow - Central to Flowa */}
        <motion.path
          d="M 280 155 Q 200 195 120 155"
          stroke={FLOWA}
          strokeWidth="2"
          strokeDasharray="6 3"
          fill="none"
          opacity={0.5}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', delay: 0.3 }}
        />
        {/* Reverse flow - Central to NexBiz */}
        <motion.path
          d="M 320 155 Q 400 195 480 155"
          stroke={NEXBIZ}
          strokeWidth="2"
          strokeDasharray="6 3"
          fill="none"
          opacity={0.5}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', delay: 0.8 }}
        />

        {/* Data flow labels - left */}
        <text x="175" y="95" fontSize="10" fill={FLOWA} fontWeight="600" textAnchor="middle">
          Transactions
        </text>
        <text x="175" y="108" fontSize="9" fill="#9CA3AF" textAnchor="middle">
          Paiements · Créances
        </text>
        <text x="175" y="205" fontSize="10" fill={FLOWA} fontWeight="600" textAnchor="middle">
          Alertes · Prédic.
        </text>
        <text x="175" y="218" fontSize="9" fill="#9CA3AF" textAnchor="middle">
          Cashflow · Scoring
        </text>

        {/* Data flow labels - right */}
        <text x="425" y="95" fontSize="10" fill={NEXBIZ} fontWeight="600" textAnchor="middle">
          Clients · Ventes
        </text>
        <text x="425" y="108" fontSize="9" fill="#9CA3AF" textAnchor="middle">
          Devis · Campagnes
        </text>
        <text x="425" y="205" fontSize="10" fill={NEXBIZ} fontWeight="600" textAnchor="middle">
          Recommandations
        </text>
        <text x="425" y="218" fontSize="9" fill="#9CA3AF" textAnchor="middle">
          Relances · Ciblage
        </text>

        {/* Flowa node */}
        <rect x="30" y="105" width="140" height="70" rx="16" fill={`${FLOWA}15`} stroke={FLOWA} strokeWidth="2" />
        <text x="100" y="136" fontSize="14" fontWeight="700" fill={FLOWA} textAnchor="middle">Flowa</text>
        <text x="100" y="155" fontSize="10" fill="#6B7280" textAnchor="middle">CFO IA</text>
        <circle cx="55" cy="125" r="8" fill={`${FLOWA}20`}>
          <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* NexBiz node */}
        <rect x="430" y="105" width="140" height="70" rx="16" fill={`${NEXBIZ}15`} stroke={NEXBIZ} strokeWidth="2" />
        <text x="500" y="136" fontSize="14" fontWeight="700" fill={NEXBIZ} textAnchor="middle">NexBiz</text>
        <text x="500" y="155" fontSize="10" fill="#6B7280" textAnchor="middle">CRM IA</text>
        <circle cx="545" cy="125" r="8" fill={`${NEXBIZ}20`}>
          <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* Central AI Brain node */}
        <motion.g>
          <circle cx="300" cy="140" r="52" fill={`${IA}12`} stroke={IA} strokeWidth="2.5" />
          <circle cx="300" cy="140" r="38" fill={`${IA}20`}>
            <animate attributeName="r" values="38;42;38" dur="3s" repeatCount="indefinite" />
          </circle>
          <text x="300" y="132" fontSize="11" fontWeight="700" fill={IA} textAnchor="middle">IA</text>
          <text x="300" y="148" fontSize="11" fontWeight="700" fill={IA} textAnchor="middle">Centrale</text>
          <text x="300" y="163" fontSize="8" fill="#9CA3AF" textAnchor="middle">Orchestrateur</text>
          {/* Brain icon representation */}
          <circle cx="300" cy="112" r="5" fill={IA} opacity="0.6">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
          </circle>
        </motion.g>

        {/* Arrows */}
        <motion.polygon
          points="270,135 260,130 260,140"
          fill={FLOWA}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.polygon
          points="330,135 340,130 340,140"
          fill={NEXBIZ}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />

        {/* Bottom label */}
        <text x="300" y="265" fontSize="11" fill="#6B7280" textAnchor="middle" fontWeight="500">
          Mémoire unifiée Business + Finance
        </text>
      </svg>
    </div>
  );
}

/* ═══════════════════════ MEMORY BRAIN DIAGRAM ════════════════════════ */

function MemoryBrainDiagram() {
  const leftItems = [
    { label: 'Données clients', detail: 'CRM, segments, contacts' },
    { label: 'Historique paiements', detail: 'Échéances, retards, montants' },
    { label: 'Préférences comms', detail: 'SMS, WhatsApp, appels' },
    { label: 'Patterns de vente', detail: 'Saisonnalité, fréquence' },
  ];

  const rightItems = [
    { label: 'Risques financiers', detail: 'Scores, alertes, seuils' },
    { label: 'Opportunités commerciales', detail: 'Cross-sell, upsell' },
    { label: 'Cashflow prédictif', detail: 'Projections, tendances' },
    { label: 'Comportement client', detail: 'Habitudes, fidélité' },
  ];

  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-0">
        {/* Left brain — NexBiz data */}
        <div className="flex-1 space-y-2.5">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: NEXBIZ }} />
            <span className="text-sm font-bold" style={{ color: NEXBIZ }}>Cerveau Business</span>
          </div>
          {leftItems.map((item, i) => (
            <motion.div
              key={item.label}
              variants={fadeIn}
              custom={i}
              className="flex items-center gap-2 rounded-lg border border-sky-500/20 bg-sky-500/5 px-3 py-2"
            >
              <Database className="h-3.5 w-3.5 shrink-0 text-sky-500" />
              <div>
                <p className="text-xs font-semibold text-foreground">{item.label}</p>
                <p className="text-[10px] text-muted-foreground">{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Central fusion */}
        <div className="flex flex-col items-center gap-2 md:mx-6 shrink-0">
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-purple-500/30 bg-purple-500/10"
          >
            <Brain className="h-7 w-7 text-purple-500" />
          </motion.div>
          <div className="flex items-center gap-1">
            <ArrowRight className="h-4 w-4 text-purple-400" />
            <span className="text-xs font-bold text-purple-600">FUSION</span>
            <ArrowRight className="h-4 w-4 text-purple-400" />
          </div>
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/20"
          >
            <Sparkles className="h-5 w-5 text-white" />
          </motion.div>
        </div>

        {/* Right brain — Flowa data */}
        <div className="flex-1 space-y-2.5">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: FLOWA }} />
            <span className="text-sm font-bold" style={{ color: FLOWA }}>Cerveau Finance</span>
          </div>
          {rightItems.map((item, i) => (
            <motion.div
              key={item.label}
              variants={fadeIn}
              custom={i + 4}
              className="flex items-center gap-2 rounded-lg border border-orange-500/20 bg-orange-500/5 px-3 py-2"
            >
              <Target className="h-3.5 w-3.5 shrink-0 text-orange-500" />
              <div>
                <p className="text-xs font-semibold text-foreground">{item.label}</p>
                <p className="text-[10px] text-muted-foreground">{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Unified memory output */}
      <motion.div
        variants={fadeIn}
        custom={8}
        className="mt-6 rounded-xl border-2 border-dashed border-purple-500/30 bg-purple-500/5 p-4 text-center"
      >
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="h-4 w-4 text-purple-500" />
          <span className="text-sm font-bold text-purple-700">Mémoire Unifiée Business + Finance</span>
          <Sparkles className="h-4 w-4 text-purple-500" />
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Contexte enrichi pour chaque décision — données client × historique financier × patterns comportementaux
        </p>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════ RECOMMENDATION CARDS DATA ═══════════════════ */

const recommendations = [
  {
    trigger: 'Vente détectée',
    triggerIcon: TrendingUp,
    triggerColor: NEXBIZ,
    action: 'Proposer création de créance',
    actionModule: 'Flowa',
    actionColor: FLOWA,
    description: 'Quand une vente est enregistrée dans NexBiz, l\'IA suggère automatiquement de créer la créance correspondante dans Flowa avec les bonnes échéances.',
    type: 'Flowa action from NexBiz event',
  },
  {
    trigger: 'Client en retard',
    triggerIcon: Shield,
    triggerColor: FLOWA,
    action: 'Suggérer campagne de relance ciblée',
    actionModule: 'NexBiz',
    actionColor: NEXBIZ,
    description: 'Quand un retard de paiement est détecté dans Flowa, l\'IA recommande une campagne de relance personnalisée via NexBiz.',
    type: 'NexBiz action from Flowa event',
  },
  {
    trigger: 'Cashflow tendu',
    triggerIcon: Target,
    triggerColor: FLOWA,
    action: 'Reporter dépenses non urgentes',
    actionModule: 'Flowa',
    actionColor: FLOWA,
    description: 'L\'IA analyse le cashflow prédictif et recommande de reporter les dépenses non urgentes quand le seuil de sécurité est approché.',
    type: 'Finance optimization',
  },
  {
    trigger: 'Pic de demande',
    triggerIcon: TrendingUp,
    triggerColor: NEXBIZ,
    action: 'Augmenter stock et lancer promo',
    actionModule: 'Flowa + NexBiz',
    actionColor: IA,
    description: 'L\'IA détecte un pic de demande sur un produit et recommande simultanément d\'augmenter le stock (Flowa) et de lancer une promo ciblée (NexBiz).',
    type: 'Business + Finance combo',
  },
];

/* ═══════════════════════ DECISIONS DATA ══════════════════════════════ */

const decisions = [
  {
    rule: 'Auto-relance quand retard > 5 jours',
    icon: Bell,
    module: 'Flowa → IA',
    color: FLOWA,
    detail: 'Détection automatique des retards et envoie de relances SMS/voix sans intervention humaine.',
  },
  {
    rule: 'Alerte découvert quand cashflow < seuil',
    icon: Shield,
    module: 'Flowa',
    color: FLOWA,
    detail: 'Surveillance en temps réel du cashflow et alerte proactive avant le passage en découvert.',
  },
  {
    rule: 'Proposition microcrédit quand score > 70',
    icon: Award,
    module: 'IA → Flowa',
    color: IA,
    detail: 'Scoring automatique des clients et proposition de microcrédit pour les profils fiables.',
  },
  {
    rule: 'Campagne SMS quand segment identifié',
    icon: MessageSquare,
    module: 'IA → NexBiz',
    color: NEXBIZ,
    detail: 'Identification automatique de segments clients et création de campagnes ciblées.',
  },
  {
    rule: 'Devis auto quand client récurrent',
    icon: Layers,
    module: 'NexBiz',
    color: NEXBIZ,
    detail: 'Génération automatique de devis pré-remplis pour les clients avec un historique d\'achats régulier.',
  },
];

/* ═══════════════════════ TECH STACK DATA ═════════════════════════════ */

const techStack = [
  {
    name: 'Groq (Llama 3.3 70B)',
    role: 'Inférence rapide',
    description: 'Génération de texte, analyse et recommandations en temps réel avec une latence < 200ms.',
    icon: Cpu,
    color: IA,
  },
  {
    name: 'Whisper',
    role: 'Transcription vocale multilingue',
    description: 'Reconnaissance vocale en wolof, français, anglais et autres langues africaines.',
    icon: Mic,
    color: FLOWA,
  },
  {
    name: 'Embeddings',
    role: 'Mémoire contextuelle',
    description: 'Représentation vectorielle des données business et financières pour une recherche sémantique instantanée.',
    icon: Database,
    color: NEXBIZ,
  },
  {
    name: 'RAG',
    role: 'Base de connaissances PME africaines',
    description: 'Génération augmentée par la recherche — contexte spécifique aux PME d\'Afrique de l\'Ouest.',
    icon: BookOpen,
    color: '#10B981',
  },
];

/* ═══════════════════════ MAIN COMPONENT ══════════════════════════════ */

export default function AICentralPage() {
  const setView = useNavStore((s) => s.setView);

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
          <motion.div
            {...pulseGlow}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-sm font-bold text-white shadow-sm"
          >
            <Brain className="h-4 w-4" />
          </motion.div>
          <div>
            <h1 className="text-lg font-bold tracking-tight sm:text-xl">
              IA Centralisée — Le Cerveau de la Super-App
            </h1>
            <p className="text-xs text-muted-foreground">
              Orchestrateur intelligent entre Flowa et NexBiz
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-purple-500/25 bg-purple-500/10 text-purple-600 text-xs font-semibold px-3">
            <Sparkles className="h-3 w-3 mr-1" />
            IA Centrale
          </Badge>
        </div>
      </motion.header>

      <div className="mx-auto max-w-7xl space-y-8 px-4 py-6 sm:px-6">
        {/* ═══════════ ARCHITECTURE DIAGRAM ═══════════ */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={1}>
          <Card className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-purple-500/15">
                  <Layers className="h-4 w-4 text-purple-500" />
                </div>
                <CardTitle className="text-base">Architecture IA Centralisée</CardTitle>
              </div>
              <CardDescription>
                Le cerveau central connecte et orchestre les modules Flowa et NexBiz en temps réel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ArchitectureDiagram />
            </CardContent>
          </Card>
        </motion.div>

        {/* ═══════════ SECTION 1: RÔLE DE L'IA CENTRALE ═══════════ */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={2}>
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-purple-500/15">
              <Brain className="h-4 w-4 text-purple-500" />
            </div>
            <h2 className="text-base font-semibold">Rôle de l&apos;IA Centrale</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: ArrowLeftRight,
                title: 'Orchestrateur',
                desc: 'Coordonne les actions entre Flowa et NexBiz — un événement dans un module déclenche des actions dans l\'autre.',
                color: IA,
              },
              {
                icon: Database,
                title: 'Mémoire unifiée',
                desc: 'Centralise les données business (NexBiz) et financières (Flowa) dans un contexte unique et cohérent.',
                color: NEXBIZ,
              },
              {
                icon: Lightbulb,
                title: 'Décision cross-domaine',
                desc: 'Prend des décisions qui transcendent les silos — combine insights business et financiers.',
                color: FLOWA,
              },
              {
                icon: Zap,
                title: 'Automatisation',
                desc: 'Exécute automatiquement des actions complexes sans intervention humaine — relances, alertes, propositions.',
                color: '#10B981',
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} variants={fadeIn} custom={i}>
                  <Card className="h-full border-border/50 transition-shadow hover:shadow-md">
                    <CardContent className="pt-6 flex flex-col items-center text-center gap-3">
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                        className="flex h-12 w-12 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${item.color}15` }}
                      >
                        <Icon className="h-5 w-5" style={{ color: item.color }} />
                      </motion.div>
                      <h3 className="text-sm font-bold">{item.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ═══════════ SECTION 2: MÉMOIRE BUSINESS + FINANCE ═══════════ */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={3}>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-sky-500/15 to-orange-500/15">
                  <Database className="h-4 w-4 text-purple-500" />
                </div>
                <div>
                  <CardTitle className="text-base">Mémoire Business + Finance</CardTitle>
                  <CardDescription>
                    Données clients (NexBiz) + historique paiements (Flowa) fusionnées en une mémoire contextuelle unique
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <motion.div variants={stagger} initial="hidden" animate="visible">
                <MemoryBrainDiagram />
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ═══════════ SECTION 3: RECOMMANDATIONS AUTOMATIQUES ═══════════ */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={4}>
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-purple-500/15">
              <Sparkles className="h-4 w-4 text-purple-500" />
            </div>
            <h2 className="text-base font-semibold">Recommandations Automatiques</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {recommendations.map((rec, i) => {
              const TriggerIcon = rec.triggerIcon;
              return (
                <motion.div key={i} variants={fadeIn} custom={i}>
                  <Card className="h-full border-border/50 transition-shadow hover:shadow-md">
                    <CardContent className="pt-6">
                      {/* Trigger → Action header */}
                      <div className="flex items-center gap-2 mb-3">
                        <div
                          className="flex h-8 w-8 items-center justify-center rounded-lg"
                          style={{ backgroundColor: `${rec.triggerColor}15` }}
                        >
                          <TriggerIcon className="h-4 w-4" style={{ color: rec.triggerColor }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold truncate" style={{ color: rec.triggerColor }}>
                            {rec.trigger}
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <Badge
                          variant="outline"
                          className="shrink-0 text-[10px] font-semibold"
                          style={{
                            backgroundColor: `${rec.actionColor}15`,
                            color: rec.actionColor,
                            borderColor: `${rec.actionColor}25`,
                          }}
                        >
                          {rec.actionModule}
                        </Badge>
                      </div>

                      {/* Action text */}
                      <p className="text-sm font-bold text-foreground mb-2">
                        → {rec.action}
                      </p>

                      {/* Description */}
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {rec.description}
                      </p>

                      {/* Type badge */}
                      <div className="mt-3">
                        <Badge variant="outline" className="text-[10px] border-border/50 bg-muted/50 text-muted-foreground">
                          {rec.type}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ═══════════ SECTION 4: DÉCISIONS INTELLIGENTES ═══════════ */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={5}>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-purple-500/15">
                  <Zap className="h-4 w-4 text-purple-500" />
                </div>
                <div>
                  <CardTitle className="text-base">Décisions Intelligentes</CardTitle>
                  <CardDescription>
                    Règles automatiques activées par l&apos;IA en fonction des données cross-modules
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {decisions.map((decision, i) => {
                  const Icon = decision.icon;
                  return (
                    <motion.div
                      key={i}
                      variants={fadeIn}
                      initial="hidden"
                      animate="visible"
                      custom={i}
                    >
                      <div
                        className="flex items-start gap-3 rounded-xl border border-border/50 bg-white p-4 transition-shadow hover:shadow-sm"
                      >
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                          style={{ backgroundColor: `${decision.color}15` }}
                        >
                          <Icon className="h-5 w-5" style={{ color: decision.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-bold text-foreground">{decision.rule}</p>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {decision.detail}
                          </p>
                          <Badge
                            variant="outline"
                            className="mt-2 text-[10px] font-semibold"
                            style={{
                              backgroundColor: `${decision.color}10`,
                              color: decision.color,
                              borderColor: `${decision.color}25`,
                            }}
                          >
                            {decision.module}
                          </Badge>
                        </div>
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ═══════════ SECTION 5: MODÈLE IA TECHNIQUE ═══════════ */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={6}>
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-purple-500/15">
              <Cpu className="h-4 w-4 text-purple-500" />
            </div>
            <h2 className="text-base font-semibold">Modèle IA Technique</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {techStack.map((tech, i) => {
              const Icon = tech.icon;
              return (
                <motion.div key={tech.name} variants={fadeIn} custom={i}>
                  <Card className="h-full border-border/50 transition-shadow hover:shadow-md">
                    <CardContent className="pt-6 flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <motion.div
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }}
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                          style={{ backgroundColor: `${tech.color}15` }}
                        >
                          <Icon className="h-5 w-5" style={{ color: tech.color }} />
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold truncate">{tech.name}</p>
                          <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: tech.color }}>
                            {tech.role}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {tech.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ═══════════ CTA ═══════════ */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={7}>
          <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/5 via-background to-sky-500/5">
            <CardContent className="flex flex-col items-center gap-4 py-8 text-center sm:flex-row sm:text-left sm:justify-between">
              <div>
                <h3 className="text-lg font-bold">Découvrir les workflows en action</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Visualisez comment l&apos;IA centrale orchestre les parcours utilisateurs de bout en bout.
                </p>
              </div>
              <Button
                onClick={() => setView('workflows')}
                className="gap-2 shrink-0 bg-purple-600 hover:bg-purple-700 text-white"
              >
                <GitBranch className="h-4 w-4" />
                Voir les Workflows
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
