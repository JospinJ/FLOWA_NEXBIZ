'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GitBranch,
  ShoppingCart,
  Bell,
  Wallet,
  Megaphone,
  Award,
  ArrowDown,
  ArrowRight,
  RotateCcw,
  ChevronRight,
  Zap,
  CheckCircle2,
  Circle,
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
const CLIENT = '#6B7280';
const ORANGE_MONEY = '#FF6600';

/* ═══════════════════════ TYPES ═══════════════════════════════════════ */

type ModuleOwner = 'Flowa' | 'NexBiz' | 'IA' | 'Client' | 'Dashboard' | 'Orange Money' | 'Utilisateur';

interface WorkflowStep {
  id: number;
  module: ModuleOwner;
  title: string;
  description: string;
  dataFlow?: string;
}

interface Workflow {
  id: string;
  label: string;
  shortLabel: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  steps: WorkflowStep[];
}

/* ═══════════════════════ MODULE STYLE MAP ════════════════════════════ */

const moduleStyles: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  'Flowa': { bg: 'bg-orange-500/10', text: 'text-orange-600', border: 'border-orange-500/25', dot: FLOWA },
  'NexBiz': { bg: 'bg-sky-500/10', text: 'text-sky-600', border: 'border-sky-500/25', dot: NEXBIZ },
  'IA': { bg: 'bg-purple-500/10', text: 'text-purple-600', border: 'border-purple-500/25', dot: IA },
  'Client': { bg: 'bg-gray-500/10', text: 'text-gray-600', border: 'border-gray-500/25', dot: CLIENT },
  'Dashboard': { bg: 'bg-emerald-500/10', text: 'text-emerald-600', border: 'border-emerald-500/25', dot: '#10B981' },
  'Orange Money': { bg: 'bg-orange-500/10', text: 'text-orange-600', border: 'border-orange-500/25', dot: ORANGE_MONEY },
  'Utilisateur': { bg: 'bg-gray-500/10', text: 'text-gray-600', border: 'border-gray-500/25', dot: CLIENT },
};

/* ═══════════════════════ WORKFLOWS DATA ══════════════════════════════ */

const workflows: Workflow[] = [
  {
    id: 'vente-complete',
    label: 'Vente Complète',
    shortLabel: 'Vente',
    icon: <ShoppingCart className="h-4 w-4" />,
    color: FLOWA,
    description: 'Parcours de vente intégral, du premier contact client au paiement et mise à jour du dashboard.',
    steps: [
      {
        id: 1,
        module: 'NexBiz',
        title: 'Création client',
        description: 'Mme Koné ajoutée au CRM, segment: Restaurant',
        dataFlow: 'Client data',
      },
      {
        id: 2,
        module: 'NexBiz',
        title: 'Génération devis',
        description: 'Devis DEV-004 créé: 350,000 FCFA, validité 30j',
        dataFlow: 'Montant',
      },
      {
        id: 3,
        module: 'Client',
        title: 'Validation',
        description: "Mme Koné accepte le devis via SMS",
        dataFlow: 'Statut validation',
      },
      {
        id: 4,
        module: 'Flowa',
        title: 'Création créance',
        description: 'Créance de 350,000 FCFA enregistrée, échéance J+30',
        dataFlow: 'Montant + Échéance',
      },
      {
        id: 5,
        module: 'Flowa',
        title: 'Paiement Orange Money',
        description: 'Paiement reçu: 350,000 FCFA via Orange Money',
        dataFlow: 'Statut paiement',
      },
      {
        id: 6,
        module: 'Dashboard',
        title: 'Mise à jour',
        description: 'Dashboard mis à jour: +350K revenus, créance soldée',
        dataFlow: 'KPI + Revenus',
      },
    ],
  },
  {
    id: 'relance-automatique',
    label: 'Relance Automatique',
    shortLabel: 'Relance',
    icon: <Bell className="h-4 w-4" />,
    color: IA,
    description: "Détection automatique des retards de paiement et relance intelligente via SMS et appel IA vocal.",
    steps: [
      {
        id: 1,
        module: 'Flowa',
        title: 'Détection retard',
        description: 'Facture FAC-002 en retard de 5 jours, M. Touré',
        dataFlow: 'Facture data',
      },
      {
        id: 2,
        module: 'IA',
        title: 'Analyse profil',
        description: 'Profil Touré: habituellement paye sous 10j, risque faible',
        dataFlow: 'Profil client',
      },
      {
        id: 3,
        module: 'Flowa',
        title: 'Message J+5',
        description: "SMS automatique: 'Rappel: facture de 280,000 FCFA en attente'",
        dataFlow: 'Canal SMS',
      },
      {
        id: 4,
        module: 'Flowa',
        title: 'Relance J+10',
        description: 'Appel IA vocal: message personnalisé en wolof',
        dataFlow: 'Canal vocal',
      },
      {
        id: 5,
        module: 'Client',
        title: 'Paiement',
        description: 'M. Touré paie 280,000 FCFA via Orange Money',
        dataFlow: 'Confirmation paiement',
      },
      {
        id: 6,
        module: 'Dashboard',
        title: 'Confirmation',
        description: 'Créance soldée, score client mis à jour',
        dataFlow: 'Statut + Score',
      },
    ],
  },
  {
    id: 'gestion-tresorerie',
    label: 'Gestion Trésorerie',
    shortLabel: 'Trésorerie',
    icon: <Wallet className="h-4 w-4" />,
    color: '#10B981',
    description: "Saisie vocale de dépenses, transcription IA, catégorisation automatique et suivi du cashflow en temps réel.",
    steps: [
      {
        id: 1,
        module: 'Utilisateur',
        title: 'Saisie vocale',
        description: "🎤 'J'ai payé 200 000 pour le stock de riz'",
        dataFlow: 'Audio',
      },
      {
        id: 2,
        module: 'IA',
        title: 'Transcription Whisper',
        description: "Texte: 'J'ai payé 200 000 pour le stock de riz'",
        dataFlow: 'Texte brut',
      },
      {
        id: 3,
        module: 'IA',
        title: 'Catégorisation',
        description: 'Catégorie: Achats stock, Montant: 200,000 FCFA',
        dataFlow: 'Catégorie + Montant',
      },
      {
        id: 4,
        module: 'Flowa',
        title: 'Calcul cashflow',
        description: 'Cashflow mis à jour: -200,000 FCFA, solde: 1,360,000 FCFA',
        dataFlow: 'Solde mis à jour',
      },
      {
        id: 5,
        module: 'IA',
        title: 'Alerte risque',
        description: '⚠️ Attention: 2 grosses dépenses cette semaine, risque de tension',
        dataFlow: 'Alerte',
      },
    ],
  },
  {
    id: 'campagne-marketing',
    label: 'Campagne Marketing',
    shortLabel: 'Marketing',
    icon: <Megaphone className="h-4 w-4" />,
    color: NEXBIZ,
    description: "Création de campagnes SMS ciblées par l'IA, diffusion et suivi du ROI en temps réel.",
    steps: [
      {
        id: 1,
        module: 'NexBiz',
        title: 'Création campagne',
        description: "Campagne 'Promo Riz', type: SMS, budget: 25,000 FCFA",
        dataFlow: 'Params campagne',
      },
      {
        id: 2,
        module: 'IA',
        title: 'Ciblage clients',
        description: '15 clients identifiés: acheteurs réguliers de riz, inactifs depuis 30j+',
        dataFlow: 'Liste ciblée',
      },
      {
        id: 3,
        module: 'NexBiz',
        title: 'Diffusion',
        description: "15 SMS envoyés via Africa's Talking",
        dataFlow: 'Statut envoi',
      },
      {
        id: 4,
        module: 'Client',
        title: 'Réponses',
        description: '3 réponses positives reçues (20% taux de réponse)',
        dataFlow: 'Réponses clients',
      },
      {
        id: 5,
        module: 'NexBiz',
        title: 'Suivi',
        description: '3 nouvelles commandes générées, CA: 450,000 FCFA',
        dataFlow: 'CA généré',
      },
      {
        id: 6,
        module: 'Flowa',
        title: 'Impact',
        description: 'ROI campagne: 18x, 450K revenus pour 25K investis',
        dataFlow: 'ROI + Revenus',
      },
    ],
  },
  {
    id: 'scoring-credit',
    label: 'Scoring Crédit',
    shortLabel: 'Crédit',
    icon: <Award className="h-4 w-4" />,
    color: IA,
    description: "Analyse multi-critères de l'historique client, scoring IA et proposition de microcrédit automatisée.",
    steps: [
      {
        id: 1,
        module: 'Flowa',
        title: 'Analyse historique',
        description: '24 mois d\'historique analysés, 47 transactions',
        dataFlow: 'Historique paiements',
      },
      {
        id: 2,
        module: 'IA',
        title: 'Scoring multi-critères',
        description: 'Paiements: 35/40, CA: 25/30, Ancienneté: 18/30',
        dataFlow: 'Scores partiels',
      },
      {
        id: 3,
        module: 'IA',
        title: 'Score final',
        description: 'Flowa Score: 78/100 — Profil: Fiable',
        dataFlow: 'Score global',
      },
      {
        id: 4,
        module: 'Flowa',
        title: 'Proposition microcrédit',
        description: 'Offre: 500,000 FCFA, 3.5%/mois, 6 mois',
        dataFlow: 'Offre crédit',
      },
      {
        id: 5,
        module: 'Client',
        title: 'Acceptation',
        description: 'Demande acceptée via WhatsApp',
        dataFlow: 'Acceptation client',
      },
      {
        id: 6,
        module: 'Orange Money',
        title: 'Décaissement',
        description: '500,000 FCFA crédités sur compte Orange Money',
        dataFlow: 'Transaction OM',
      },
    ],
  },
];

/* ═══════════════════════ ANIMATION CONFIG ════════════════════════════ */

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stepVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
};

/* ═══════════════════════ STEP NODE COMPONENT ═════════════════════════ */

function StepNode({
  step,
  index,
  isActive,
  isCompleted,
  totalSteps,
}: {
  step: WorkflowStep;
  index: number;
  isActive: boolean;
  isCompleted: boolean;
  totalSteps: number;
}) {
  const style = moduleStyles[step.module] || moduleStyles['Client'];

  return (
    <motion.div
      variants={stepVariants}
      custom={index}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="relative"
    >
      <div className="flex items-start gap-4">
        {/* Step number circle + connecting line */}
        <div className="flex flex-col items-center">
          <motion.div
            animate={{
              scale: isActive ? 1.15 : 1,
              boxShadow: isActive ? `0 0 0 4px ${style.dot}25` : '0 0 0 0px transparent',
            }}
            transition={{ duration: 0.3 }}
            className={cn(
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-all',
              isCompleted
                ? 'border-green-500 bg-green-500 text-white'
                : isActive
                ? 'border-transparent text-white'
                : 'border-border bg-background text-muted-foreground'
            )}
            style={
              isActive && !isCompleted
                ? { backgroundColor: style.dot }
                : undefined
            }
          >
            {isCompleted ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              step.id
            )}
          </motion.div>
          {/* Connecting line */}
          {index < totalSteps - 1 && (
            <div
              className={cn(
                'w-0.5 min-h-[48px] transition-colors duration-300',
                isCompleted ? 'bg-green-400' : isActive ? 'bg-border' : 'bg-border/50'
              )}
            />
          )}
        </div>

        {/* Step content card */}
        <Card
          className={cn(
            'flex-1 transition-all duration-300',
            isActive
              ? 'border shadow-md'
              : isCompleted
              ? 'border-green-500/20 bg-green-500/5'
              : 'border-border/50 bg-muted/30 opacity-60'
          )}
          style={
            isActive
              ? { borderColor: `${style.dot}40` }
              : undefined
          }
        >
          <CardContent className="flex items-start gap-3 py-3 px-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <Badge
                  variant="outline"
                  className={cn(
                    'px-2 py-0 text-[10px] font-semibold',
                    style.bg,
                    style.text,
                    style.border
                  )}
                >
                  {step.module}
                </Badge>
                <span className="text-sm font-semibold text-foreground">
                  {step.title}
                </span>
              </div>
              <p
                className={cn(
                  'text-sm leading-snug',
                  isActive ? 'text-foreground/90' : 'text-muted-foreground'
                )}
              >
                {step.description}
              </p>
            </div>
            {isActive && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/15"
              >
                <Zap className="h-4 w-4 text-purple-500" />
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Data flow indicator between steps */}
      {step.dataFlow && index < totalSteps - 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isCompleted || isActive ? 1 : 0.4 }}
          className="ml-[18px] flex items-center gap-2 py-1 pl-[42px]"
        >
          <div className="h-px flex-1 bg-border" />
          <div
            className={cn(
              'flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-medium',
              isCompleted
                ? 'bg-green-500/10 text-green-600'
                : 'bg-muted text-muted-foreground'
            )}
          >
            <ArrowDown className="h-3 w-3" />
            {step.dataFlow}
          </div>
          <div className="h-px flex-1 bg-border" />
        </motion.div>
      )}
    </motion.div>
  );
}

/* ═══════════════════════ WORKFLOW DETAIL VIEW ════════════════════════ */

function WorkflowDetail({ workflow }: { workflow: Workflow }) {
  const [activeStep, setActiveStep] = useState(0);
  const totalSteps = workflow.steps.length;

  const handleNext = () => {
    if (activeStep < totalSteps - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className="space-y-6">
      {/* Workflow header */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={0}>
        <div className="flex items-center gap-3 mb-2">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl text-white"
            style={{ backgroundColor: workflow.color }}
          >
            {workflow.icon}
          </div>
          <div>
            <h2 className="text-xl font-bold">{workflow.label}</h2>
            <p className="text-sm text-muted-foreground">{workflow.description}</p>
          </div>
        </div>
      </motion.div>

      {/* Step progress tracker */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={1}>
        <Card className="border-border/50">
          <CardContent className="py-4 px-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Progression
              </span>
              <span className="text-sm font-bold" style={{ color: workflow.color }}>
                Étape {activeStep + 1} / {totalSteps}
              </span>
            </div>
            {/* Progress bar */}
            <div className="h-2 w-full rounded-full bg-muted">
              <motion.div
                className="h-2 rounded-full"
                style={{ backgroundColor: workflow.color }}
                animate={{ width: `${((activeStep + 1) / totalSteps) * 100}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
            {/* Step dots */}
            <div className="mt-3 flex items-center justify-between">
              {workflow.steps.map((step, i) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(i)}
                  className="group flex flex-col items-center gap-1"
                >
                  <div
                    className={cn(
                      'h-3 w-3 rounded-full transition-all border-2',
                      i < activeStep
                        ? 'bg-green-500 border-green-500'
                        : i === activeStep
                        ? 'border-transparent scale-125'
                        : 'bg-muted border-border'
                    )}
                    style={
                      i === activeStep
                        ? { backgroundColor: workflow.color }
                        : undefined
                    }
                  />
                  <span
                    className={cn(
                      'text-[9px] transition-colors hidden sm:block',
                      i === activeStep ? 'font-bold text-foreground' : 'text-muted-foreground'
                    )}
                  >
                    {step.title.length > 12 ? step.title.substring(0, 12) + '…' : step.title}
                  </span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Steps timeline */}
      <div className="space-y-1">
        <AnimatePresence mode="wait">
          {workflow.steps.map((step, index) => (
            <StepNode
              key={`${workflow.id}-${step.id}`}
              step={step}
              index={index}
              isActive={index === activeStep}
              isCompleted={index < activeStep}
              totalSteps={totalSteps}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Navigation controls */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={3}>
        <Card className="border-border/50">
          <CardContent className="flex items-center justify-between py-3 px-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrev}
              disabled={activeStep === 0}
              className="gap-1.5"
            >
              Précédent
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="gap-1.5 text-muted-foreground"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Recommencer
            </Button>

            <Button
              size="sm"
              onClick={handleNext}
              disabled={activeStep === totalSteps - 1}
              className="gap-1.5 text-white"
              style={{ backgroundColor: workflow.color }}
            >
              Suivant
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Summary card when all steps completed */}
      <AnimatePresence>
        {activeStep === totalSteps - 1 && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="border-green-500/30 bg-green-500/5">
              <CardContent className="flex items-center gap-4 py-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-500/15">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-base font-bold text-green-700">Workflow terminé !</p>
                  <p className="text-sm text-green-600/80">
                    Le parcours « {workflow.label} » s'est exécuté avec succès de bout en bout.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════ MAIN COMPONENT ══════════════════════════════ */

export default function WorkflowsPage() {
  const [selectedWorkflow, setSelectedWorkflow] = useState(0);
  const workflow = workflows[selectedWorkflow];

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
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-sm font-bold text-white shadow-sm">
            <GitBranch className="h-4 w-4" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight sm:text-xl">
              Workflows — Parcours Utilisateurs
            </h1>
            <p className="text-xs text-muted-foreground">
              5 parcours end-to-end illustrant l'intégration Flowa × NexBiz
            </p>
          </div>
        </div>
        <Badge variant="outline" className="border-purple-500/25 bg-purple-500/10 text-purple-600 text-xs font-semibold px-3">
          5 Workflows
        </Badge>
      </motion.header>

      {/* ═══════════ MAIN LAYOUT ═══════════ */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left sidebar — workflow tabs */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={1}
            className="lg:w-72 shrink-0"
          >
            <Card className="lg:sticky lg:top-20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Sélectionner un workflow
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1.5 p-3 pt-0">
                {workflows.map((wf, i) => {
                  const isActive = selectedWorkflow === i;
                  return (
                    <button
                      key={wf.id}
                      onClick={() => setSelectedWorkflow(i)}
                      className={cn(
                        'w-full flex items-center gap-3 rounded-xl px-3 py-3 text-left transition-all',
                        isActive
                          ? 'bg-white shadow-md border'
                          : 'hover:bg-muted/60 border border-transparent'
                      )}
                      style={
                        isActive
                          ? { borderColor: `${wf.color}30` }
                          : undefined
                      }
                    >
                      <div
                        className={cn(
                          'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white transition-all',
                          isActive ? 'shadow-sm' : 'opacity-60'
                        )}
                        style={{ backgroundColor: wf.color }}
                      >
                        {wf.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={cn(
                            'text-sm font-semibold truncate',
                            isActive ? 'text-foreground' : 'text-muted-foreground'
                          )}
                        >
                          {wf.label}
                        </p>
                        <p className="text-[11px] text-muted-foreground truncate">
                          {wf.steps.length} étapes
                        </p>
                      </div>
                      {isActive && (
                        <motion.div
                          layoutId="workflow-indicator"
                          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                          style={{ backgroundColor: wf.color }}
                        >
                          <ArrowRight className="h-3 w-3 text-white" />
                        </motion.div>
                      )}
                    </button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Legend */}
            <Card className="mt-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Légende
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 p-4 pt-0">
                {Object.entries(moduleStyles).map(([name, style]) => (
                  <div key={name} className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full shrink-0"
                      style={{ backgroundColor: style.dot }}
                    />
                    <span className="text-xs text-muted-foreground">{name}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Main content area */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={workflow.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <WorkflowDetail workflow={workflow} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
