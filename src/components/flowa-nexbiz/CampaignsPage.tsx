'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Megaphone,
  Plus,
  MessageSquare,
  Mail,
  Newspaper,
  Layers,
  Sparkles,
  Send,
  ArrowRight,
  TrendingUp,
  Users,
  BarChart3,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Clock,
  Zap,
  Target,
  Calendar,
  Edit3,
  Eye,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

const campaignStats = [
  { title: 'Campagnes actives', value: '3', icon: Megaphone, color: NEXBIZ, bgColor: 'bg-sky-500/10', borderColor: 'border-sky-500/20' },
  { title: 'SMS envoyés', value: '1 250', icon: MessageSquare, color: FLOWA, bgColor: 'bg-orange-500/10', borderColor: 'border-orange-500/20' },
  { title: 'Taux réponse', value: '23%', icon: TrendingUp, color: '#16A34A', bgColor: 'bg-green-500/10', borderColor: 'border-green-500/20' },
  { title: 'CA généré', value: '1 800 000 FCFA', icon: BarChart3, color: IA, bgColor: 'bg-purple-500/10', borderColor: 'border-purple-500/20' },
];

type Channel = 'SMS' | 'Post' | 'Email' | 'Multi-canal';

interface Campaign {
  id: string;
  name: string;
  channels: Channel[];
  sent: number;
  responseRate: number;
  status: 'active' | 'completed' | 'scheduled';
  progress: number;
  startDate: string;
  endDate: string;
}

const activeCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Promotion Riz 10%',
    channels: ['SMS'],
    sent: 450,
    responseRate: 23,
    status: 'active',
    progress: 75,
    startDate: '01/03/2025',
    endDate: '15/03/2025',
  },
  {
    id: '2',
    name: 'Nouveaux produits saison',
    channels: ['SMS', 'Post'],
    sent: 320,
    responseRate: 18,
    status: 'active',
    progress: 55,
    startDate: '03/03/2025',
    endDate: '20/03/2025',
  },
  {
    id: '3',
    name: 'Relance clients inactifs',
    channels: ['Email'],
    sent: 480,
    responseRate: 12,
    status: 'active',
    progress: 90,
    startDate: '25/02/2025',
    endDate: '10/03/2025',
  },
];

const channelPerformance = [
  { channel: 'SMS', envoyés: 770, réponses: 155, taux: 20.1, color: FLOWA },
  { channel: 'Post', envoyés: 320, réponses: 45, taux: 14.1, color: NEXBIZ },
  { channel: 'Email', envoyés: 480, réponses: 58, taux: 12.1, color: IA },
];

const channelIcons: Record<Channel, React.ReactNode> = {
  SMS: <MessageSquare className="h-3.5 w-3.5" />,
  Post: <Newspaper className="h-3.5 w-3.5" />,
  Email: <Mail className="h-3.5 w-3.5" />,
  'Multi-canal': <Layers className="h-3.5 w-3.5" />,
};

const channelBadgeStyles: Record<Channel, string> = {
  SMS: 'bg-orange-50 text-orange-600 border-orange-200',
  Post: 'bg-sky-50 text-sky-600 border-sky-200',
  Email: 'bg-purple-50 text-purple-600 border-purple-200',
  'Multi-canal': 'bg-emerald-50 text-emerald-600 border-emerald-200',
};

/* ═══════════════════════ CAMPAIGN CREATION STEPPER ═══════════════════ */

const creationSteps = [
  { number: 1, title: 'Type de campagne', icon: Layers },
  { number: 2, title: 'Audience', icon: Users },
  { number: 3, title: 'Message', icon: Edit3 },
  { number: 4, title: 'Programmation', icon: Calendar },
];

/* ═══════════════════════ BAR CHART TOOLTIP ═══════════════════════════ */

function BarTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-white px-3 py-2 shadow-lg dark:bg-zinc-900">
      <p className="mb-1 text-xs font-semibold text-muted-foreground">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-xs font-medium" style={{ color: p.color }}>
          {p.dataKey === 'envoyés' ? 'Envoyés' : 'Réponses'} : {Number(p.value).toLocaleString('fr-FR')}
        </p>
      ))}
    </div>
  );
}

/* ═══════════════════════ MAIN COMPONENT ══════════════════════════════ */

export default function CampaignsPage() {
  const setView = useNavStore((s) => s.setView);
  const [creationStep, setCreationStep] = useState(0);
  const [showCreation, setShowCreation] = useState(false);

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
            <Megaphone className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight sm:text-xl">Campagnes Marketing</h1>
            <p className="text-xs text-muted-foreground">NexBiz — CRM & campagnes IA</p>
          </div>
        </div>

        <Button
          className="gap-1.5 text-xs font-semibold text-white shadow-sm"
          style={{ backgroundColor: NEXBIZ }}
          size="sm"
          onClick={() => setShowCreation(!showCreation)}
        >
          <Plus className="h-3.5 w-3.5" />
          Nouvelle campagne
        </Button>
      </motion.header>

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6">
        {/* ═══════════ CAMPAIGN STATS ═══════════ */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {campaignStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div key={stat.title} variants={fadeIn} custom={i}>
                <Card className={cn('relative overflow-hidden border', stat.borderColor)}>
                  <div
                    className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-20 blur-2xl"
                    style={{ backgroundColor: stat.color }}
                  />
                  <CardContent className="flex items-center gap-4 p-5">
                    <div className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl', stat.bgColor)}>
                      <Icon className="h-5 w-5" style={{ color: stat.color }} />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{stat.title}</p>
                      <p className="text-xl font-bold tracking-tight" style={{ color: stat.color }}>
                        {stat.value}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ═══════════ ACTIVE CAMPAIGNS ═══════════ */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={1}>
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-sky-500/15">
              <Megaphone className="h-4 w-4 text-sky-600" />
            </div>
            <h2 className="text-base font-semibold">Campagnes actives</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {activeCampaigns.map((campaign, i) => (
              <motion.div
                key={campaign.id}
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                custom={i}
              >
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardContent className="flex flex-col gap-4 p-5">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold truncate">{campaign.name}</h3>
                        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                          {campaign.channels.map((ch) => (
                            <Badge
                              key={ch}
                              variant="outline"
                              className={cn('gap-1 text-[10px] font-semibold', channelBadgeStyles[ch])}
                            >
                              {channelIcons[ch]}
                              {ch}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(
                          'text-[10px] font-semibold shrink-0',
                          campaign.status === 'active'
                            ? 'bg-green-50 text-green-600 border-green-200'
                            : campaign.status === 'completed'
                            ? 'bg-gray-50 text-gray-600 border-gray-200'
                            : 'bg-amber-50 text-amber-600 border-amber-200',
                        )}
                      >
                        {campaign.status === 'active' ? (
                          <><Zap className="mr-0.5 h-2.5 w-2.5" /> Active</>
                        ) : campaign.status === 'completed' ? (
                          <><CheckCircle2 className="mr-0.5 h-2.5 w-2.5" /> Terminée</>
                        ) : (
                          <><Clock className="mr-0.5 h-2.5 w-2.5" /> Planifiée</>
                        )}
                      </Badge>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg bg-muted/50 p-2.5 text-center">
                        <p className="text-lg font-bold" style={{ color: NEXBIZ }}>{campaign.sent}</p>
                        <p className="text-[10px] text-muted-foreground">Envoyés</p>
                      </div>
                      <div className="rounded-lg bg-muted/50 p-2.5 text-center">
                        <p className="text-lg font-bold" style={{ color: '#16A34A' }}>{campaign.responseRate}%</p>
                        <p className="text-[10px] text-muted-foreground">Réponse</p>
                      </div>
                    </div>

                    {/* Progress */}
                    <div>
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Progression</span>
                        <span className="font-semibold">{campaign.progress}%</span>
                      </div>
                      <Progress value={campaign.progress} className="h-2" />
                    </div>

                    {/* Dates */}
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>Du {campaign.startDate}</span>
                      <span>Au {campaign.endDate}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-1">
                      <Button variant="outline" size="sm" className="flex-1 text-xs gap-1">
                        <Eye className="h-3 w-3" /> Détails
                      </Button>
                      <Button size="sm" className="flex-1 text-xs gap-1 text-white" style={{ backgroundColor: NEXBIZ }}>
                        <Send className="h-3 w-3" /> Relancer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ═══════════ CAMPAIGN CREATION FORM ═══════════ */}
        <AnimatePresence>
          {showCreation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card className="border-sky-500/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">Créer une campagne</CardTitle>
                      <CardDescription>Suivez les étapes pour lancer votre campagne</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-muted-foreground"
                      onClick={() => setShowCreation(false)}
                    >
                      Fermer
                    </Button>
                  </div>

                  {/* Stepper */}
                  <div className="mt-4 flex items-center gap-2">
                    {creationSteps.map((step, i) => {
                      const StepIcon = step.icon;
                      const isActive = creationStep === i;
                      const isCompleted = creationStep > i;
                      return (
                        <div key={step.number} className="flex items-center">
                          <button
                            onClick={() => setCreationStep(i)}
                            className={cn(
                              'flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition-all',
                              isActive
                                ? 'bg-sky-500/10 text-sky-600 border border-sky-200'
                                : isCompleted
                                ? 'bg-green-500/10 text-green-600 border border-green-200'
                                : 'bg-muted text-muted-foreground border border-transparent',
                            )}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="h-4 w-4" />
                            ) : (
                              <StepIcon className="h-4 w-4" />
                            )}
                            <span className="hidden sm:inline">{step.title}</span>
                            <span className="sm:hidden">{step.number}</span>
                          </button>
                          {i < creationSteps.length - 1 && (
                            <ChevronRight className="mx-1 h-4 w-4 text-muted-foreground/50" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardHeader>

                <CardContent>
                  <AnimatePresence mode="wait">
                    {/* Step 1: Type */}
                    {creationStep === 0 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <p className="text-sm font-medium">Choisissez le type de campagne</p>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                          {([
                            { channel: 'SMS' as Channel, icon: MessageSquare, desc: 'Message court et direct', color: FLOWA },
                            { channel: 'Post' as Channel, icon: Newspaper, desc: 'Courrier physique', color: NEXBIZ },
                            { channel: 'Email' as Channel, icon: Mail, desc: 'E-mail personnalisé', color: IA },
                            { channel: 'Multi-canal' as Channel, icon: Layers, desc: 'SMS + Post + Email', color: '#16A34A' },
                          ]).map((type) => {
                            const TypeIcon = type.icon;
                            return (
                              <button
                                key={type.channel}
                                className="group flex flex-col items-center gap-2 rounded-xl border border-border/50 bg-white p-4 text-center shadow-sm transition-all hover:shadow-md hover:border-transparent"
                                style={{ ['--hover-color' as string]: type.color }}
                              >
                                <div
                                  className="flex h-12 w-12 items-center justify-center rounded-xl transition-colors"
                                  style={{ backgroundColor: `${type.color}15` }}
                                >
                                  <TypeIcon className="h-6 w-6" style={{ color: type.color }} />
                                </div>
                                <span className="text-sm font-semibold">{type.channel}</span>
                                <span className="text-[10px] text-muted-foreground">{type.desc}</span>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Audience */}
                    {creationStep === 1 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <p className="text-sm font-medium">Sélectionnez votre audience</p>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                          {([
                            { label: 'Tous les clients', count: 47, desc: 'Envoi à toute la base', icon: Users, color: NEXBIZ },
                            { label: 'Segment IA', count: 23, desc: 'Ciblage intelligent par IA', icon: Sparkles, color: IA },
                            { label: 'Import CSV', count: 0, desc: 'Importer vos contacts', icon: Layers, color: FLOWA },
                          ]).map((audience) => {
                            const AudIcon = audience.icon;
                            return (
                              <button
                                key={audience.label}
                                className="group flex flex-col items-center gap-2 rounded-xl border border-border/50 bg-white p-4 text-center shadow-sm transition-all hover:shadow-md"
                              >
                                <div
                                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                                  style={{ backgroundColor: `${audience.color}15` }}
                                >
                                  <AudIcon className="h-6 w-6" style={{ color: audience.color }} />
                                </div>
                                <span className="text-sm font-semibold">{audience.label}</span>
                                <span className="text-[10px] text-muted-foreground">{audience.desc}</span>
                                {audience.count > 0 && (
                                  <Badge variant="outline" className="text-[10px]">
                                    {audience.count} contacts
                                  </Badge>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Message */}
                    {creationStep === 2 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <p className="text-sm font-medium">Rédigez votre message</p>
                        <div className="space-y-3">
                          <div className="rounded-xl border border-border/50 bg-white p-4">
                            <Input
                              placeholder="Objet du message..."
                              className="mb-3 text-sm font-medium"
                            />
                            <textarea
                              className="w-full resize-none rounded-lg border bg-muted/30 p-3 text-sm outline-none focus:ring-2 focus:ring-sky-200"
                              rows={4}
                              placeholder="Rédigez votre message ici..."
                            />
                          </div>

                          {/* AI Templates */}
                          <div>
                            <div className="mb-2 flex items-center gap-2">
                              <Sparkles className="h-4 w-4 text-purple-500" />
                              <span className="text-xs font-semibold text-purple-600">Suggestions IA</span>
                            </div>
                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                              {[
                                { title: 'Promotion flash', preview: '🔥 Offre spéciale ! -10% sur tout le stock...' },
                                { title: 'Nouveau produit', preview: '✨ Découvrez nos nouveaux arrivages...' },
                                { title: 'Relance client', preview: '👋 Vous nous manquez ! Revenez profiter de...' },
                                { title: 'Rappel paiement', preview: '⏰ Rappel : votre facture du ... est...' },
                              ].map((template) => (
                                <button
                                  key={template.title}
                                  className="rounded-lg border border-purple-200 bg-purple-50/50 p-3 text-left transition-all hover:bg-purple-50 hover:shadow-sm"
                                >
                                  <p className="text-xs font-semibold text-purple-700">{template.title}</p>
                                  <p className="mt-0.5 text-[11px] text-muted-foreground line-clamp-1">{template.preview}</p>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 4: Programmation */}
                    {creationStep === 3 && (
                      <motion.div
                        key="step4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <p className="text-sm font-medium">Programmez l&apos;envoi</p>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="rounded-xl border border-border/50 bg-white p-4 space-y-3">
                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date d&apos;envoi</label>
                            <Input type="date" className="text-sm" />
                          </div>
                          <div className="rounded-xl border border-border/50 bg-white p-4 space-y-3">
                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Heure d&apos;envoi</label>
                            <Input type="time" className="text-sm" defaultValue="09:00" />
                          </div>
                        </div>

                        <div className="rounded-xl border border-sky-200 bg-sky-50/50 p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Target className="h-4 w-4 text-sky-600" />
                            <span className="text-xs font-semibold text-sky-700">Résumé de la campagne</span>
                          </div>
                          <div className="space-y-1.5 text-xs text-muted-foreground">
                            <p>Type: <strong className="text-foreground">SMS</strong></p>
                            <p>Audience: <strong className="text-foreground">Segment IA — 23 contacts</strong></p>
                            <p>Coût estimé: <strong className="text-foreground">4 600 FCFA</strong></p>
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-3">
                          <Button
                            className="gap-1.5 text-xs font-semibold text-white shadow-sm"
                            style={{ backgroundColor: NEXBIZ }}
                          >
                            <Send className="h-3.5 w-3.5" />
                            Lancer la campagne
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation buttons */}
                  <div className="mt-6 flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 text-xs"
                      disabled={creationStep === 0}
                      onClick={() => setCreationStep(Math.max(0, creationStep - 1))}
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                      Précédent
                    </Button>
                    <div className="flex items-center gap-1.5">
                      {creationSteps.map((_, i) => (
                        <div
                          key={i}
                          className={cn(
                            'h-1.5 rounded-full transition-all',
                            i === creationStep ? 'w-6 bg-sky-500' : i < creationStep ? 'w-4 bg-green-500' : 'w-4 bg-muted',
                          )}
                        />
                      ))}
                    </div>
                    <Button
                      size="sm"
                      className="gap-1 text-xs"
                      disabled={creationStep === creationSteps.length - 1}
                      onClick={() => setCreationStep(Math.min(creationSteps.length - 1, creationStep + 1))}
                    >
                      Suivant
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══════════ RESULTS CHART + AI RECOMMENDATIONS ═══════════ */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Performance Chart */}
          <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={2} className="lg:col-span-3">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Performance par canal</CardTitle>
                    <CardDescription>Envoyés vs Réponses par canal</CardDescription>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1.5">
                      <span className="inline-block h-2.5 w-2.5 rounded-full bg-gray-400" />
                      Envoyés
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: FLOWA }} />
                      Réponses
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={channelPerformance} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                      <XAxis
                        dataKey="channel"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 13, fill: '#6B7280', fontWeight: 600 }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 11, fill: '#6B7280' }}
                      />
                      <Tooltip content={<BarTooltip />} />
                      <Bar dataKey="envoyés" fill="#9CA3AF" radius={[4, 4, 0, 0]} barSize={36}>
                        {channelPerformance.map((entry, index) => (
                          <Cell key={`env-${index}`} fill="#9CA3AF" />
                        ))}
                      </Bar>
                      <Bar dataKey="réponses" radius={[4, 4, 0, 0]} barSize={36}>
                        {channelPerformance.map((entry, index) => (
                          <Cell key={`rep-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Response rate summary */}
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {channelPerformance.map((ch) => (
                    <div key={ch.channel} className="rounded-lg bg-muted/50 p-3 text-center">
                      <p className="text-lg font-bold" style={{ color: ch.color }}>{ch.taux}%</p>
                      <p className="text-[10px] text-muted-foreground">Taux réponse {ch.channel}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Recommendations */}
          <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={3} className="lg:col-span-2">
            <Card className="h-full border-purple-500/15 bg-gradient-to-br from-purple-500/5 to-purple-500/10">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-purple-500/15">
                    <Sparkles className="h-4 w-4 text-purple-500" />
                  </div>
                  <CardTitle className="text-base">Recommandations IA</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Main recommendation */}
                  <div className="rounded-xl border border-purple-200 bg-white p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-xl">💡</span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-purple-700">Campagne SMS recommandée</p>
                        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                          15 clients ont consulté vos produits cette semaine. Une campagne SMS ciblée
                          pourrait générer un taux de réponse de 25%+.
                        </p>
                        <Button
                          size="sm"
                          className="mt-3 gap-1.5 bg-purple-500 text-xs font-semibold text-white shadow-sm hover:bg-purple-600"
                        >
                          <Send className="h-3.5 w-3.5" />
                          Créer la campagne
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Secondary recommendations */}
                  <div className="space-y-3">
                    <div className="rounded-lg border border-border/50 bg-white/80 p-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">📊</span>
                        <div className="flex-1">
                          <p className="text-xs font-semibold">Segment haute valeur</p>
                          <p className="text-[10px] text-muted-foreground">8 clients ont un CA &gt; 200K FCFA — cible prioritaire</p>
                        </div>
                        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                    </div>

                    <div className="rounded-lg border border-border/50 bg-white/80 p-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">🕐</span>
                        <div className="flex-1">
                          <p className="text-xs font-semibold">Meilleur créneau: Mardi 9h</p>
                          <p className="text-[10px] text-muted-foreground">Taux d&apos;ouverture 35% plus élevé le mardi matin</p>
                        </div>
                        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                    </div>

                    <div className="rounded-lg border border-border/50 bg-white/80 p-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">🔄</span>
                        <div className="flex-1">
                          <p className="text-xs font-semibold">Relance automatique</p>
                          <p className="text-[10px] text-muted-foreground">12 clients n&apos;ont pas ouvert — relance J+3 recommandée</p>
                        </div>
                        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                    </div>

                    <div className="rounded-lg border border-border/50 bg-white/80 p-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">💰</span>
                        <div className="flex-1">
                          <p className="text-xs font-semibold">ROI estimé: 3.2x</p>
                          <p className="text-[10px] text-muted-foreground">Pour 4 600 FCFA investis, CA prévu: 14 720 FCFA</p>
                        </div>
                        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
