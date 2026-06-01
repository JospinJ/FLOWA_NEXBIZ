'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Image as ImageIcon,
  FileText,
  Video,
  Palette,
  Download,
  ExternalLink,
  Wand2,
  Type,
  Layout,
  Megaphone,
  Share2,
  Copy,
  CheckCircle2,
  ArrowRight,
  Bot,
  Layers,
  Eye,
  RefreshCw,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useNavStore } from '@/lib/nav-store';

/* ═══════════════════════ BRAND ═══════════════════════════════════════ */

const NEXBIZ = '#0EA5E9';
const FLOWA = '#FF6600';
const IA = '#8B5CF6';

/* ═══════════════════════ ANIMATIONS ══════════════════════════════════════ */

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const tabContent = {
  initial: { opacity: 0, x: 12 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
  exit: { opacity: 0, x: -12, transition: { duration: 0.2 } },
};

/* ═══════════════════════ MOCK CONTENT DATA ══════════════════════════════ */

const generatedContents = [
  {
    id: 1,
    type: 'Post Social',
    title: 'Promo Riz Basmati — Offre limitée !',
    preview: '🍚 Offre spéciale cette semaine ! Le riz Basmati premium à -10%. Livraison gratuite à Dakar. Commandez maintenant au +221 XX XXX XX XX. #Flowa #PME #Commerce',
    channel: 'WhatsApp + Facebook',
    status: 'Prêt',
    statusColor: '#10B981',
    icon: Megaphone,
  },
  {
    id: 2,
    type: 'Script Vocal',
    title: 'Relance client — Facture en retard',
    preview: 'Bonjour M. Touré, c\'est le rappel amical de votre facture de 280 000 francs, échéance dépassée de 15 jours. Nous vous invitons à régler via Orange Money. Merci pour votre confiance !',
    channel: 'Appel IA (wolof/français)',
    status: 'Généré',
    statusColor: NEXBIZ,
    icon: Video,
  },
  {
    id: 3,
    type: 'Visuel Promo',
    title: 'Bannière Promotion Saison',
    preview: '🎨 Image générée : Bannière 1200x628 avec fond orange, photo produit, texte "Promo Saison — Jusqu\'à -20%", logo PME, CTA "Commander"',
    channel: 'Facebook + Instagram',
    status: 'Prêt',
    statusColor: '#10B981',
    icon: ImageIcon,
  },
  {
    id: 4,
    type: 'Email Commercial',
    title: 'Newsletter mensuelle — Mars 2026',
    preview: 'Cher client, ce mois-ci découvrez nos nouvelles offres... [Généré automatiquement à partir de vos produits les plus vendus et de l\'historique client]',
    channel: 'Email (SendGrid)',
    status: 'Brouillon',
    statusColor: '#F59E0B',
    icon: FileText,
  },
];

const contentTypes = [
  {
    icon: Megaphone,
    title: 'Posts Réseaux Sociaux',
    desc: 'Facebook, Instagram, LinkedIn — texte + hashtags + visuel adapté',
    color: '#3B82F6',
    examples: ['Promo produit', 'Lancement', 'Témoignage client'],
  },
  {
    icon: Video,
    title: 'Scripts Vocaux',
    desc: 'Messages vocaux IA pour relances, rappels, promotions — multilingue',
    color: FLOWA,
    examples: ['Relance paiement', 'Rappel RDV', 'Offre spéciale'],
  },
  {
    icon: ImageIcon,
    title: 'Visuels & Bannières',
    desc: 'Images promotionnelles, stories, bannières — générées par IA',
    color: '#EC4899',
    examples: ['Bannière promo', 'Story Instagram', 'Flyer événement'],
  },
  {
    icon: FileText,
    title: 'Emails & Newsletters',
    desc: 'Campagnes email personnalisées avec templates IA',
    color: '#10B981',
    examples: ['Newsletter mensuelle', 'Relance panier', 'Bienvenue client'],
  },
  {
    icon: Type,
    title: 'SMS Marketing',
    desc: 'Messages SMS courts et percutants — optimisés pour la conversion',
    color: '#8B5CF6',
    examples: ['Flash promo', 'Rappel échéance', 'Confirmation commande'],
  },
  {
    icon: Layout,
    title: 'Scripts Vidéo',
    desc: 'Scripts pour courtes vidéos promotionnelles, reels, TikTok',
    color: '#EF4444',
    examples: ['Reel produit', 'Tuto rapide', 'Témoignage'],
  },
];

const canvaTemplates = [
  { name: 'Promo Produit', format: '1080x1080', category: 'Instagram', color: '#3B82F6' },
  { name: 'Bannière Facebook', format: '1200x628', category: 'Facebook', color: '#1877F2' },
  { name: 'Story Promotion', format: '1080x1920', category: 'Story', color: '#EC4899' },
  { name: 'Flyer Événement', format: 'A5', category: 'Print', color: '#10B981' },
  { name: 'Facture Pro', format: 'A4', category: 'Document', color: '#6B7280' },
  { name: 'Carte de Visite', format: '90x55mm', category: 'Print', color: FLOWA },
];

/* ═══════════════════════ GENERATION STEPS ══════════════════════════════ */

const generationSteps = [
  { step: 1, label: 'Analyse contexte', desc: 'L\'IA analyse vos produits, clients, et historique', icon: Bot, color: IA },
  { step: 2, label: 'Sélection format', desc: 'Choix automatique du meilleur format selon le canal', icon: Layers, color: NEXBIZ },
  { step: 3, label: 'Génération contenu', desc: 'Création du texte, visuel ou script par IA', icon: Wand2, color: '#EC4899' },
  { step: 4, label: 'Validation & Export', desc: 'Aperçu, modification, puis export Canva ou diffusion directe', icon: Download, color: '#10B981' },
];

/* ═══════════════════════ MAIN COMPONENT ══════════════════════════════ */

export default function CreativeEnginePage() {
  const setView = useNavStore((s) => s.setView);
  const [activeTab, setActiveTab] = useState('generator');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationComplete, setGenerationComplete] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setGenerationComplete(false);
    setTimeout(() => {
      setIsGenerating(false);
      setGenerationComplete(true);
    }, 3000);
  };

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
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#EC4899] to-[#8B5CF6] shadow-md">
              <Wand2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight sm:text-xl">
                Creative Engine{' '}
                <span className="font-normal text-muted-foreground">&mdash;</span>{' '}
                <span className="font-normal text-muted-foreground">ACA — Automated Content Automation</span>
              </h1>
              <p className="text-xs text-muted-foreground">Génération automatique de contenu texte + visuel + script</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="border-pink-500/20 bg-pink-500/5 text-pink-600 text-xs font-semibold"
            >
              <Sparkles className="mr-1 h-3 w-3" />
              Creative IA
            </Badge>
          </div>
        </div>
      </motion.header>

      {/* ═══════════ TABS ═══════════ */}
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 flex w-full flex-wrap gap-1 bg-muted/60 p-1.5 sm:w-fit sm:flex-nowrap">
            <TabsTrigger value="generator" className="gap-1.5 text-xs sm:text-sm">
              <Wand2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Générateur IA</span>
              <span className="sm:hidden">Générer</span>
            </TabsTrigger>
            <TabsTrigger value="content-types" className="gap-1.5 text-xs sm:text-sm">
              <Layers className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Types de Contenu</span>
              <span className="sm:hidden">Types</span>
            </TabsTrigger>
            <TabsTrigger value="canva" className="gap-1.5 text-xs sm:text-sm">
              <Palette className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Export Canva</span>
              <span className="sm:hidden">Canva</span>
            </TabsTrigger>
            <TabsTrigger value="library" className="gap-1.5 text-xs sm:text-sm">
              <FileText className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Bibliothèque</span>
              <span className="sm:hidden">Lib.</span>
            </TabsTrigger>
          </TabsList>

          {/* ═══════════ TAB 1: GÉNÉRATEUR IA ═══════════ */}
          <TabsContent value="generator">
            <AnimatePresence mode="wait">
              <motion.div key="generator" variants={tabContent} initial="initial" animate="animate" exit="exit" className="space-y-6">
                {/* Generation process */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
                  {/* Left: Generator form - 3/5 */}
                  <motion.div variants={fadeIn} custom={0} className="lg:col-span-3 space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-pink-500" />
                          Générateur de Contenu IA
                        </CardTitle>
                        <CardDescription>Décrivez ce que vous voulez créer — l&apos;IA s&apos;occupe du reste</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Prompt input */}
                        <div>
                          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                            Décrivez votre contenu
                          </label>
                          <div className="rounded-lg border bg-white p-3 focus-within:ring-2 focus-within:ring-pink-500/20">
                            <p className="text-sm text-foreground">
                              Créez une promotion pour notre stock de riz basmati, -10% cette semaine, ciblage clients Dakar
                            </p>
                          </div>
                        </div>

                        {/* Format selection */}
                        <div>
                          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                            Format de sortie
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {[
                              { id: 'post', label: 'Post Social', icon: Megaphone, color: '#3B82F6' },
                              { id: 'visual', label: 'Visuel', icon: ImageIcon, color: '#EC4899' },
                              { id: 'script', label: 'Script Vocal', icon: Video, color: FLOWA },
                              { id: 'sms', label: 'SMS', icon: Type, color: '#8B5CF6' },
                              { id: 'email', label: 'Email', icon: FileText, color: '#10B981' },
                              { id: 'video', label: 'Script Vidéo', icon: Layout, color: '#EF4444' },
                            ].map((fmt) => (
                              <button
                                key={fmt.id}
                                onClick={() => setSelectedFormat(fmt.id)}
                                className={cn(
                                  'flex items-center gap-2 rounded-lg border p-3 text-sm transition-all hover:shadow-sm',
                                  selectedFormat === fmt.id
                                    ? 'border-pink-500/50 bg-pink-500/5 ring-1 ring-pink-500/20'
                                    : 'border-border/50 bg-white hover:border-pink-500/20'
                                )}
                              >
                                <fmt.icon className="h-4 w-4" style={{ color: fmt.color }} />
                                <span className="font-medium text-xs">{fmt.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* AI context */}
                        <div className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Bot className="h-4 w-4 text-purple-500" />
                            <span className="text-xs font-semibold text-purple-700">Contexte IA automatique</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex items-center gap-1.5">
                              <CheckCircle2 className="h-3 w-3 text-green-500" />
                              <span>Produits les plus vendus</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <CheckCircle2 className="h-3 w-3 text-green-500" />
                              <span>Historique client analysé</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <CheckCircle2 className="h-3 w-3 text-green-500" />
                              <span>Saisonnalité détectée</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <CheckCircle2 className="h-3 w-3 text-green-500" />
                              <span>Canal préféré client</span>
                            </div>
                          </div>
                        </div>

                        {/* Generate button */}
                        <Button
                          className="w-full gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl"
                          onClick={handleGenerate}
                          disabled={isGenerating}
                        >
                          {isGenerating ? (
                            <>
                              <RefreshCw className="h-4 w-4 animate-spin" />
                              Génération en cours...
                            </>
                          ) : (
                            <>
                              <Wand2 className="h-4 w-4" />
                              Générer le contenu
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Generation result */}
                    <AnimatePresence>
                      {generationComplete && (
                        <motion.div
                          initial={{ opacity: 0, y: 20, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.97 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Card className="border-green-500/30 bg-green-500/5">
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-base flex items-center gap-2">
                                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                                  Contenu généré avec succès !
                                </CardTitle>
                                <Badge className="bg-green-500/15 text-green-700 border-green-500/20">
                                  3 variantes
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              {/* Generated post */}
                              <div className="rounded-lg border bg-white p-4 space-y-2">
                                <div className="flex items-center justify-between">
                                  <Badge variant="outline" className="text-xs border-blue-500/20 text-blue-600">
                                    <Megaphone className="mr-1 h-3 w-3" />
                                    Post Social
                                  </Badge>
                                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                                    <Copy className="mr-1 h-3 w-3" />
                                    Copier
                                  </Button>
                                </div>
                                <p className="text-sm leading-relaxed">
                                  🍚 <strong>Offre spéciale cette semaine !</strong> Le riz Basmati premium à <strong>-10%</strong>.
                                  Livraison gratuite à Dakar et environs. 🚚
                                </p>
                                <p className="text-sm leading-relaxed">
                                  Commandez maintenant au <strong>+221 XX XXX XX XX</strong> ou via notre WhatsApp.
                                  Stock limité — ne manquez pas cette opportunité ! 🔥
                                </p>
                                <div className="flex flex-wrap gap-1.5 text-xs text-blue-600">
                                  <span>#PromoDakar</span>
                                  <span>#RizBasmati</span>
                                  <span>#CommerceLocal</span>
                                  <span>#PME</span>
                                </div>
                              </div>

                              {/* Generated visual preview */}
                              <div className="rounded-lg border bg-white p-4 space-y-2">
                                <div className="flex items-center justify-between">
                                  <Badge variant="outline" className="text-xs border-pink-500/20 text-pink-600">
                                    <ImageIcon className="mr-1 h-3 w-3" />
                                    Visuel Promo
                                  </Badge>
                                  <div className="flex items-center gap-1">
                                    <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                                      <ExternalLink className="h-3 w-3" />
                                      Export Canva
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                                      <Download className="h-3 w-3" />
                                      PNG
                                    </Button>
                                  </div>
                                </div>
                                {/* Visual mockup */}
                                <div className="relative h-40 rounded-lg bg-gradient-to-br from-[#FF6600] to-[#FF8533] flex items-center justify-center overflow-hidden">
                                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-50" />
                                  <div className="text-center text-white z-10">
                                    <p className="text-3xl font-black">-10%</p>
                                    <p className="text-sm font-semibold mt-1">RIZ BASMATI PREMIUM</p>
                                    <p className="text-xs opacity-80 mt-1">Livraison gratuite Dakar</p>
                                    <div className="mt-3 rounded-full bg-white text-orange-600 px-4 py-1 text-xs font-bold inline-block">
                                      COMMANDER
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Action bar */}
                              <div className="flex flex-wrap gap-2">
                                <Button
                                  className="gap-2 bg-gradient-to-r from-[#00C4CC] to-[#7B2FF7] text-white font-semibold"
                                  size="sm"
                                >
                                  <Palette className="h-4 w-4" />
                                  Ouvrir dans Canva
                                </Button>
                                <Button
                                  className="gap-2 bg-[#0EA5E9] text-white font-semibold"
                                  size="sm"
                                  onClick={() => setView('campaigns')}
                                >
                                  <Share2 className="h-4 w-4" />
                                  Diffuser directement
                                </Button>
                                <Button variant="outline" size="sm" className="gap-2">
                                  <RefreshCw className="h-4 w-4" />
                                  Régénérer
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Right: Process & tips - 2/5 */}
                  <motion.div variants={fadeIn} custom={1} className="lg:col-span-2 space-y-4">
                    {/* Generation pipeline */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Processus de Génération</CardTitle>
                        <CardDescription>Comment l&apos;ACA crée votre contenu</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {generationSteps.map((step, i) => (
                            <motion.div
                              key={step.step}
                              variants={fadeIn}
                              initial="hidden"
                              animate="visible"
                              custom={i}
                              className="flex items-start gap-3"
                            >
                              <div
                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white text-xs font-bold"
                                style={{ backgroundColor: step.color }}
                              >
                                {step.step}
                              </div>
                              <div>
                                <p className="text-sm font-semibold">{step.label}</p>
                                <p className="text-xs text-muted-foreground">{step.desc}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* IA Context sources */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <Bot className="h-4 w-4 text-purple-500" />
                          Sources IA
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {[
                          { label: 'Données produits (NexBiz)', color: NEXBIZ },
                          { label: 'Historique ventes', color: '#10B981' },
                          { label: 'Préférences clients', color: IA },
                          { label: 'Saisonnalité & tendances', color: '#EC4899' },
                          { label: 'Cashflow disponible (Flowa)', color: FLOWA },
                        ].map((src, i) => (
                          <div key={i} className="flex items-center gap-2 rounded-lg border border-border/50 p-2.5">
                            <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: src.color }} />
                            <span className="text-xs font-medium">{src.label}</span>
                            <CheckCircle2 className="ml-auto h-3.5 w-3.5 text-green-500" />
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Quick stats */}
                    <Card className="border-pink-500/20 bg-gradient-to-br from-pink-500/5 to-purple-500/5">
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <p className="text-2xl font-bold text-pink-600">156</p>
                            <p className="text-xs text-muted-foreground">Contenus générés</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-purple-600">89%</p>
                            <p className="text-xs text-muted-foreground">Taux d&apos;utilisation</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-blue-600">23</p>
                            <p className="text-xs text-muted-foreground">Exports Canva</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-green-600">4.2x</p>
                            <p className="text-xs text-muted-foreground">ROI contenu IA</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </TabsContent>

          {/* ═══════════ TAB 2: TYPES DE CONTENU ═══════════ */}
          <TabsContent value="content-types">
            <AnimatePresence mode="wait">
              <motion.div key="content-types" variants={tabContent} initial="initial" animate="animate" exit="exit" className="space-y-6">
                <motion.div variants={fadeIn} custom={0}>
                  <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold">6 Types de Contenu IA</h2>
                    <p className="text-muted-foreground mt-2">Chaque type est optimisé pour son canal de diffusion et généré à partir du contexte business unique de votre PME</p>
                  </div>
                </motion.div>

                <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {contentTypes.map((ct, i) => (
                    <motion.div key={ct.title} variants={fadeIn} custom={i}>
                      <Card className="h-full border-border/50 transition-all hover:shadow-lg hover:border-pink-500/20">
                        <CardHeader>
                          <div
                            className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl"
                            style={{ backgroundColor: `${ct.color}15` }}
                          >
                            <ct.icon className="h-6 w-6" style={{ color: ct.color }} />
                          </div>
                          <CardTitle className="text-base">{ct.title}</CardTitle>
                          <CardDescription>{ct.desc}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-1.5">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Exemples</p>
                            {ct.examples.map((ex, j) => (
                              <div key={j} className="flex items-center gap-2 rounded-md border border-border/50 bg-muted/30 px-2.5 py-1.5">
                                <ArrowRight className="h-3 w-3" style={{ color: ct.color }} />
                                <span className="text-xs">{ex}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Comparison: Internal vs Canva */}
                <motion.div variants={fadeIn} custom={6}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Génération Interne vs Export Canva</CardTitle>
                      <CardDescription>Deux modes de création pour s&apos;adapter à chaque besoin</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="rounded-xl border-2 border-pink-500/30 bg-pink-500/5 p-5 space-y-3">
                          <div className="flex items-center gap-2">
                            <Wand2 className="h-5 w-5 text-pink-500" />
                            <span className="font-bold text-pink-700">Creative Engine Interne</span>
                          </div>
                          <ul className="space-y-1.5 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /> Génération instantanée</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /> Pas de compte externe requis</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /> Templates adaptés Afrique</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /> Diffusion directe après création</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /> Personnalisation IA automatique</li>
                          </ul>
                          <Badge className="bg-pink-500/15 text-pink-700 border-pink-500/25">
                            Recommandé pour: SMS, scripts vocaux, posts simples
                          </Badge>
                        </div>
                        <div className="rounded-xl border-2 border-[#00C4CC]/30 bg-[#00C4CC]/5 p-5 space-y-3">
                          <div className="flex items-center gap-2">
                            <Palette className="h-5 w-5 text-[#00C4CC]" />
                            <span className="font-bold text-[#00A0A8]">Export Canva</span>
                          </div>
                          <ul className="space-y-1.5 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /> Design professionnel avancé</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /> 1000+ templates Canva</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /> Édition collaborative</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /> Brand kit personnalisé</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /> Export PDF, PNG, vidéo</li>
                          </ul>
                          <Badge className="bg-[#00C4CC]/15 text-[#00A0A8] border-[#00C4CC]/25">
                            Recommandé pour: visuels, flyers, bannières
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </TabsContent>

          {/* ═══════════ TAB 3: EXPORT CANVA ═══════════ */}
          <TabsContent value="canva">
            <AnimatePresence mode="wait">
              <motion.div key="canva" variants={tabContent} initial="initial" animate="animate" exit="exit" className="space-y-6">
                {/* Canva integration header */}
                <motion.div variants={fadeIn} custom={0}>
                  <Card className="border-[#00C4CC]/20 bg-gradient-to-br from-[#00C4CC]/5 via-white to-[#7B2FF7]/5">
                    <CardContent className="flex flex-col sm:flex-row items-center gap-6 p-6">
                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00C4CC] to-[#7B2FF7] shadow-xl">
                        <Palette className="h-10 w-10 text-white" />
                      </div>
                      <div className="text-center sm:text-left flex-1">
                        <h2 className="text-2xl font-bold">Intégration Canva</h2>
                        <p className="text-muted-foreground mt-1">
                          Générez du contenu dans Flowa × NexBiz, puis exportez vers Canva pour un design professionnel avancé.
                          L&apos;IA pré-remplit les templates avec vos données business.
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
                          <Badge variant="outline" className="border-[#00C4CC]/30 text-[#00A0A8]">API Canva Connect</Badge>
                          <Badge variant="outline" className="border-purple-500/30 text-purple-600">Auto-fill IA</Badge>
                          <Badge variant="outline" className="border-[#00C4CC]/30 text-[#00A0A8]">Brand Kit Sync</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Available templates */}
                <motion.div variants={fadeIn} custom={1}>
                  <h3 className="text-lg font-semibold mb-4">Templates Disponibles</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {canvaTemplates.map((tpl, i) => (
                      <motion.div key={tpl.name} variants={fadeIn} initial="hidden" animate="visible" custom={i}>
                        <Card className="group cursor-pointer border-border/50 transition-all hover:shadow-lg hover:border-[#00C4CC]/30">
                          <CardContent className="p-4">
                            {/* Visual preview */}
                            <div
                              className="mb-3 h-32 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                              style={{ background: `linear-gradient(135deg, ${tpl.color}, ${tpl.color}88)` }}
                            >
                              <Eye className="mr-2 h-5 w-5" />
                              {tpl.name}
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold text-sm">{tpl.name}</p>
                                <p className="text-xs text-muted-foreground">{tpl.format} — {tpl.category}</p>
                              </div>
                              <Button size="sm" variant="outline" className="h-7 text-xs gap-1 border-[#00C4CC]/30 text-[#00A0A8] hover:bg-[#00C4CC]/5">
                                <ExternalLink className="h-3 w-3" />
                                Canva
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Flow diagram */}
                <motion.div variants={fadeIn} custom={2}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Flux Création → Canva → Diffusion</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 py-4">
                        {[
                          { label: 'Contexte IA', sub: 'Produits + Clients', color: IA, icon: Bot },
                          { label: 'Creative Engine', sub: 'Génération auto', color: '#EC4899', icon: Wand2 },
                          { label: 'Canva', sub: 'Design pro', color: '#00C4CC', icon: Palette },
                          { label: 'Diffusion', sub: 'Multi-canal', color: NEXBIZ, icon: Share2 },
                        ].map((step, i) => (
                          <div key={step.label} className="flex items-center gap-3">
                            <div className="flex flex-col items-center">
                              <div
                                className="flex h-14 w-14 items-center justify-center rounded-xl shadow-md"
                                style={{ backgroundColor: step.color }}
                              >
                                <step.icon className="h-6 w-6 text-white" />
                              </div>
                              <p className="mt-2 text-sm font-bold">{step.label}</p>
                              <p className="text-xs text-muted-foreground">{step.sub}</p>
                            </div>
                            {i < 3 && (
                              <ArrowRight className="h-5 w-5 text-muted-foreground/40 shrink-0 hidden sm:block" />
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </TabsContent>

          {/* ═══════════ TAB 4: BIBLIOTHÈQUE ═══════════ */}
          <TabsContent value="library">
            <AnimatePresence mode="wait">
              <motion.div key="library" variants={tabContent} initial="initial" animate="animate" exit="exit" className="space-y-6">
                <motion.div variants={fadeIn} custom={0}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-semibold">Contenus Générés</h2>
                      <p className="text-sm text-muted-foreground">{generatedContents.length} contenus récents</p>
                    </div>
                    <Button className="gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold" size="sm">
                      <Wand2 className="h-4 w-4" />
                      Nouveau contenu
                    </Button>
                  </div>
                </motion.div>

                <div className="space-y-3">
                  {generatedContents.map((content, i) => (
                    <motion.div key={content.id} variants={fadeIn} initial="hidden" animate="visible" custom={i}>
                      <Card className="border-border/50 transition-all hover:shadow-md">
                        <CardContent className="flex items-start gap-4 p-5">
                          <div
                            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                            style={{ backgroundColor: `${content.statusColor}15` }}
                          >
                            <content.icon className="h-6 w-6" style={{ color: content.statusColor }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="text-[10px] font-semibold" style={{
                                color: content.statusColor,
                                borderColor: `${content.statusColor}25`,
                                backgroundColor: `${content.statusColor}10`,
                              }}>
                                {content.type}
                              </Badge>
                              <Badge variant="outline" className="text-[10px] border-green-500/20 bg-green-500/5 text-green-600">
                                {content.status}
                              </Badge>
                            </div>
                            <p className="font-semibold text-sm">{content.title}</p>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{content.preview}</p>
                            <div className="flex items-center gap-3 mt-2">
                              <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                <Share2 className="h-3 w-3" />
                                {content.channel}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <Button variant="ghost" size="sm" className="h-8 text-xs gap-1">
                              <Eye className="h-3 w-3" />
                              Voir
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 text-xs gap-1">
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
