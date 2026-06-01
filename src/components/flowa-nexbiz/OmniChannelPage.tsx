'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  Send,
  Phone,
  Mail,
  Globe,
  Bot,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Radio,
  Zap,
  Users,
  BarChart3,
  Hash,
  MessageSquare,
  Webhook,
  Layers,
  Activity,
  ChevronRight,
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
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useNavStore } from '@/lib/nav-store';

/* ═══════════════════════ BRAND ═══════════════════════════════════════ */

const NEXBIZ = '#0EA5E9';
const FLOWA = '#FF6600';
const IA = '#8B5CF6';
const WHATSAPP = '#25D366';
const TELEGRAM = '#0088CC';
const SMS_ORANGE = '#FF6600';
const EMAIL = '#10B981';
const WEBCHAT = '#6366F1';

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

/* ═══════════════════════ CHANNEL DATA ════════════════════════════════════ */

const channels = [
  {
    id: 'whatsapp',
    name: 'WhatsApp Business API',
    icon: MessageCircle,
    color: WHATSAPP,
    desc: 'Canal principal pour les PME africaines. Messages automatiques, catalogues produits, paiements intégrés.',
    features: ['Messages template IA', 'Catalogue produits', 'Boutons de paiement', 'Statut de livraison', 'WhatsApp Pay (à venir)'],
    stats: { messages: 1250, responseRate: 89, avgTime: '2.5 min' },
    status: 'Connecté',
    api: 'Meta Business API',
    useCase: 'Relances, confirmations, support client, prises de commande',
  },
  {
    id: 'telegram',
    name: 'Telegram Bot',
    icon: Send,
    color: TELEGRAM,
    desc: 'Bot intelligent pour notifications, commandes rapides et interactions automatisées.',
    features: ['Bot IA conversationnel', 'Inline keyboards', 'Commandes rapides', 'Notifications push', 'Groupes PME'],
    stats: { messages: 420, responseRate: 76, avgTime: '1.8 min' },
    status: 'Connecté',
    api: 'Telegram Bot API',
    useCase: 'Notifications, commandes, communauté PME',
  },
  {
    id: 'sms',
    name: 'SMS (Orange & opérateurs)',
    icon: Phone,
    color: SMS_ORANGE,
    desc: 'Le canal le plus universel en Afrique. Via Africa\'s Talking + Orange SMS API. Taux d\'ouverture 98%.',
    features: ['SMS IA personnalisés', 'SMS bulk campagnes', 'USSD interactif', 'Short codes', 'Orange SMS Pro'],
    stats: { messages: 2800, responseRate: 45, avgTime: '15 min' },
    status: 'Connecté',
    api: "Africa's Talking + Orange",
    useCase: 'Campagnes marketing, relances, alertes, confirmations',
  },
  {
    id: 'email',
    name: 'Email (SendGrid / Resend)',
    icon: Mail,
    color: EMAIL,
    desc: 'Emails professionnels avec templates IA. Newsletters, factures, relances formelles.',
    features: ['Templates IA dynamiques', 'Newsletters auto', 'Factures PDF joints', 'Tracking ouverture', 'Anti-spam optimisé'],
    stats: { messages: 680, responseRate: 32, avgTime: '4.2h' },
    status: 'Connecté',
    api: 'SendGrid / Resend',
    useCase: 'Devis, factures, newsletters, communication formelle',
  },
  {
    id: 'webchat',
    name: 'Web Chat (Site PME)',
    icon: Globe,
    color: WEBCHAT,
    desc: 'Widget de chat IA intégré au site web de la PME. Support 24/7 automatique.',
    features: ['Chatbot IA multilingue', 'Prise de commande', 'FAQ dynamique', 'Transfert humain', 'Analytics conversation'],
    stats: { messages: 340, responseRate: 92, avgTime: '45 sec' },
    status: 'En configuration',
    api: 'WebSocket + IA',
    useCase: 'Support client, prises de commande site web, FAQ',
  },
];

/* ═══════════════════════ CONVERSATION MOCKUPS ══════════════════════════════ */

const whatsappConversation = [
  { from: 'bot', text: 'Bonjour Mme Koné ! 🌟 Votre commande de 50 repas/semaine est confirmée. Livraison demain 8h.', time: '09:01' },
  { from: 'client', text: 'Merci ! Est-ce que je peux ajouter 10 repas supplémentaires ?', time: '09:03' },
  { from: 'bot', text: 'Bien sûr ! ✅ 60 repas/semaine mis à jour. Nouveau montant : 420,000 FCFA/mois. Confirmer ?', time: '09:03' },
  { from: 'client', text: 'Oui je confirme', time: '09:04' },
  { from: 'bot', text: '✅ Confirmé ! Devis DEV-005 mis à jour. Paiement via Orange Money disponible. Bonne journée ! 😊', time: '09:04' },
];

const smsConversation = [
  { from: 'bot', text: 'Flowa: Rappel - Facture 280,000 FCFA échéance J+15. Payez via Orange Money: *144#', time: '08:00' },
  { from: 'client', text: 'Je paie demain', time: '10:30' },
  { from: 'bot', text: 'Flowa: Noté! rappel demain 8h. Paiement anticipé = score crédit amélioré 📈', time: '10:31' },
];

/* ═══════════════════════ MAIN COMPONENT ══════════════════════════════ */

export default function OmniChannelPage() {
  const setView = useNavStore((s) => s.setView);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);

  const selectedChannelData = channels.find(c => c.id === selectedChannel);

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
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0EA5E9] to-[#8B5CF6] shadow-md">
              <Radio className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight sm:text-xl">
                Canaux Omni-Channel{' '}
                <span className="font-normal text-muted-foreground">&mdash;</span>{' '}
                <span className="font-normal text-muted-foreground">NexBiz comme Cerveau</span>
              </h1>
              <p className="text-xs text-muted-foreground">Un seul cerveau IA derrière tous vos canaux de communication</p>
            </div>
          </div>
          <Badge variant="outline" className="border-sky-500/20 bg-sky-500/5 text-sky-600 text-xs font-semibold">
            <Activity className="mr-1 h-3 w-3" />
            5 canaux actifs
          </Badge>
        </div>
      </motion.header>

      {/* ═══════════ TABS ═══════════ */}
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 flex w-full flex-wrap gap-1 bg-muted/60 p-1.5 sm:w-fit sm:flex-nowrap">
            <TabsTrigger value="overview" className="gap-1.5 text-xs sm:text-sm">
              <Radio className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Vue d&apos;ensemble</span>
              <span className="sm:hidden">Vue</span>
            </TabsTrigger>
            <TabsTrigger value="channels" className="gap-1.5 text-xs sm:text-sm">
              <Layers className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Canaux détaillés</span>
              <span className="sm:hidden">Canaux</span>
            </TabsTrigger>
            <TabsTrigger value="demo" className="gap-1.5 text-xs sm:text-sm">
              <MessageCircle className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Démo Live</span>
              <span className="sm:hidden">Démo</span>
            </TabsTrigger>
            <TabsTrigger value="architecture" className="gap-1.5 text-xs sm:text-sm">
              <Zap className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Architecture</span>
              <span className="sm:hidden">Arch.</span>
            </TabsTrigger>
          </TabsList>

          {/* ═══════════ TAB 1: VUE D'ENSEMBLE ═══════════ */}
          <TabsContent value="overview">
            <AnimatePresence mode="wait">
              <motion.div key="overview" variants={tabContent} initial="initial" animate="animate" exit="exit" className="space-y-6">
                {/* The brain concept */}
                <motion.div variants={fadeIn} custom={0}>
                  <Card className="border-sky-500/20 bg-gradient-to-br from-sky-500/5 via-white to-purple-500/5 overflow-hidden">
                    <CardContent className="p-6 sm:p-8">
                      <div className="flex flex-col lg:flex-row items-center gap-8">
                        {/* Left: Brain visual */}
                        <div className="flex-1 text-center lg:text-left">
                          <Badge className="mb-3 border-sky-500/30 bg-sky-500/10 text-sky-600 text-xs">
                            <Bot className="mr-1 h-3 w-3" />
                            Concept Central
                          </Badge>
                          <h2 className="text-2xl font-bold mb-3">
                            NexBiz = Le{' '}
                            <span className="bg-gradient-to-r from-sky-500 to-purple-600 bg-clip-text text-transparent">
                              Cerveau
                            </span>{' '}
                            derrière tous les canaux
                          </h2>
                          <p className="text-muted-foreground leading-relaxed">
                            Un client écrit sur WhatsApp, un autre envoie un SMS, un troisième visite le site web —
                            <strong className="text-foreground"> NexBiz répond de manière cohérente sur tous les canaux</strong>,
                            avec la même mémoire, le même contexte, et la même intelligence.
                          </p>
                        </div>

                        {/* Right: Visual diagram */}
                        <div className="flex-shrink-0">
                          <div className="relative">
                            {/* Central brain */}
                            <motion.div
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                              className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-purple-600 shadow-2xl shadow-sky-500/30 mx-auto"
                            >
                              <Bot className="h-10 w-10 text-white" />
                            </motion.div>
                            <p className="text-center text-xs font-bold mt-2 text-purple-600">NexBiz IA</p>

                            {/* Channel nodes around */}
                            {[
                              { icon: MessageCircle, color: WHATSAPP, label: 'WhatsApp', angle: 0 },
                              { icon: Send, color: TELEGRAM, label: 'Telegram', angle: 72 },
                              { icon: Phone, color: SMS_ORANGE, label: 'SMS', angle: 144 },
                              { icon: Mail, color: EMAIL, label: 'Email', angle: 216 },
                              { icon: Globe, color: WEBCHAT, label: 'Web', angle: 288 },
                            ].map((ch, i) => {
                              const rad = (ch.angle * Math.PI) / 180;
                              const x = Math.cos(rad) * 90;
                              const y = Math.sin(rad) * 90;
                              return (
                                <motion.div
                                  key={ch.label}
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                                  className="absolute flex flex-col items-center"
                                  style={{
                                    left: `calc(50% + ${x}px - 18px)`,
                                    top: `calc(50% + ${y}px - 18px)`,
                                  }}
                                >
                                  <div
                                    className="flex h-9 w-9 items-center justify-center rounded-full shadow-md"
                                    style={{ backgroundColor: ch.color }}
                                  >
                                    <ch.icon className="h-4 w-4 text-white" />
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Channel stats overview */}
                <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                  {channels.map((ch, i) => (
                    <motion.div key={ch.id} variants={fadeIn} custom={i}>
                      <Card className="h-full border-border/50 transition-all hover:shadow-md cursor-pointer" onClick={() => { setSelectedChannel(ch.id); setActiveTab('channels'); }}>
                        <CardContent className="p-4 text-center">
                          <div
                            className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl"
                            style={{ backgroundColor: `${ch.color}15` }}
                          >
                            <ch.icon className="h-6 w-6" style={{ color: ch.color }} />
                          </div>
                          <p className="text-sm font-bold">{ch.name.split('(')[0].trim()}</p>
                          <p className="text-xs text-muted-foreground mt-1">{ch.stats.messages} msg/mois</p>
                          <div className="mt-2">
                            <Badge variant="outline" className={cn(
                              'text-[10px]',
                              ch.status === 'Connecté'
                                ? 'border-green-500/20 bg-green-500/5 text-green-600'
                                : 'border-amber-500/20 bg-amber-500/5 text-amber-600'
                            )}>
                              {ch.status}
                            </Badge>
                          </div>
                          <Progress value={ch.stats.responseRate} className="mt-2 h-1.5" />
                          <p className="text-[10px] text-muted-foreground mt-1">{ch.stats.responseRate}% réponse</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Unified inbox concept */}
                <motion.div variants={fadeIn} custom={5}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Layers className="h-4 w-4 text-sky-500" />
                        Boîte de Réception Unifiée
                      </CardTitle>
                      <CardDescription>Tous les canaux dans une seule interface — NexBiz trie, priorise et répond</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { channel: 'WhatsApp', client: 'Mme Koné', msg: 'Je voudrais ajouter 10 repas à ma commande', priority: 'Haute', color: WHATSAPP, icon: MessageCircle },
                          { channel: 'SMS', client: 'M. Touré', msg: 'Je paie la facture demain matin', priority: 'Moyenne', color: SMS_ORANGE, icon: Phone },
                          { channel: 'Email', client: 'Mme Diop', msg: 'Demande de devis pour 520K FCFA', priority: 'Haute', color: EMAIL, icon: Mail },
                          { channel: 'Web Chat', client: 'Visiteur', msg: 'Quels sont vos prix pour le riz ?', priority: 'Basse', color: WEBCHAT, icon: Globe },
                          { channel: 'Telegram', client: 'M. Diallo', msg: 'Confirmation livraison demain 8h', priority: 'Moyenne', color: TELEGRAM, icon: Send },
                        ].map((item, i) => (
                          <motion.div
                            key={i}
                            variants={fadeIn}
                            initial="hidden"
                            animate="visible"
                            custom={i}
                            className="flex items-center gap-3 rounded-lg border border-border/50 bg-white p-3 hover:shadow-sm transition-shadow"
                          >
                            <div
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                              style={{ backgroundColor: `${item.color}15` }}
                            >
                              <item.icon className="h-4 w-4" style={{ color: item.color }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-[9px] font-semibold" style={{ color: item.color, borderColor: `${item.color}25` }}>
                                  {item.channel}
                                </Badge>
                                <span className="text-xs font-medium">{item.client}</span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-0.5 truncate">{item.msg}</p>
                            </div>
                            <Badge variant="outline" className={cn(
                              'text-[9px] shrink-0',
                              item.priority === 'Haute' ? 'border-red-500/20 text-red-600' :
                              item.priority === 'Moyenne' ? 'border-amber-500/20 text-amber-600' :
                              'border-gray-500/20 text-gray-500'
                            )}>
                              {item.priority}
                            </Badge>
                            <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 shrink-0">
                              <ChevronRight className="h-3 w-3" />
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Cross-channel stats */}
                <motion.div variants={fadeIn} custom={6}>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                    {[
                      { label: 'Messages / mois', value: '5,490', icon: MessageSquare, color: NEXBIZ },
                      { label: 'Taux réponse moyen', value: '67%', icon: CheckCircle2, color: '#10B981' },
                      { label: 'Temps réponse IA', value: '< 3 sec', icon: Zap, color: IA },
                      { label: 'Canaux actifs', value: '5/5', icon: Radio, color: FLOWA },
                    ].map((stat, i) => (
                      <Card key={i} className="border-border/50">
                        <CardContent className="flex items-center gap-3 p-4">
                          <div
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                            style={{ backgroundColor: `${stat.color}15` }}
                          >
                            <stat.icon className="h-5 w-5" style={{ color: stat.color }} />
                          </div>
                          <div>
                            <p className="text-xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
                            <p className="text-xs text-muted-foreground">{stat.label}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </TabsContent>

          {/* ═══════════ TAB 2: CANAUX DÉTAILLÉS ═══════════ */}
          <TabsContent value="channels">
            <AnimatePresence mode="wait">
              <motion.div key="channels" variants={tabContent} initial="initial" animate="animate" exit="exit" className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  {channels.map((ch, i) => (
                    <motion.div key={ch.id} variants={fadeIn} initial="hidden" animate="visible" custom={i}>
                      <Card className="border-border/50 hover:shadow-md transition-all">
                        <CardContent className="p-5">
                          <div className="flex flex-col lg:flex-row gap-5">
                            {/* Left: Channel info */}
                            <div className="lg:w-1/3 space-y-3">
                              <div className="flex items-center gap-3">
                                <div
                                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-md"
                                  style={{ backgroundColor: ch.color }}
                                >
                                  <ch.icon className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                  <h3 className="font-bold text-sm">{ch.name}</h3>
                                  <Badge variant="outline" className={cn(
                                    'text-[10px] mt-0.5',
                                    ch.status === 'Connecté'
                                      ? 'border-green-500/20 bg-green-500/5 text-green-600'
                                      : 'border-amber-500/20 bg-amber-500/5 text-amber-600'
                                  )}>
                                    {ch.status}
                                  </Badge>
                                </div>
                              </div>
                              <p className="text-xs text-muted-foreground leading-relaxed">{ch.desc}</p>
                              <div className="text-xs text-muted-foreground">
                                <span className="font-semibold">API:</span> {ch.api}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                <span className="font-semibold">Usage:</span> {ch.useCase}
                              </div>
                            </div>

                            {/* Center: Features */}
                            <div className="lg:w-1/3 space-y-2">
                              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Fonctionnalités</p>
                              {ch.features.map((feat, j) => (
                                <div key={j} className="flex items-center gap-2 text-sm">
                                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-green-500" />
                                  <span className="text-xs">{feat}</span>
                                </div>
                              ))}
                            </div>

                            {/* Right: Stats */}
                            <div className="lg:w-1/3">
                              <div className="rounded-xl border border-border/50 bg-muted/30 p-4 space-y-3">
                                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Performance</p>
                                <div className="grid grid-cols-3 gap-3 text-center">
                                  <div>
                                    <p className="text-lg font-bold" style={{ color: ch.color }}>{ch.stats.messages.toLocaleString()}</p>
                                    <p className="text-[10px] text-muted-foreground">Msg/mois</p>
                                  </div>
                                  <div>
                                    <p className="text-lg font-bold text-green-600">{ch.stats.responseRate}%</p>
                                    <p className="text-[10px] text-muted-foreground">Réponse</p>
                                  </div>
                                  <div>
                                    <p className="text-lg font-bold text-purple-600">{ch.stats.avgTime}</p>
                                    <p className="text-[10px] text-muted-foreground">Temps moy.</p>
                                  </div>
                                </div>
                                <Progress value={ch.stats.responseRate} className="h-2" />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </TabsContent>

          {/* ═══════════ TAB 3: DÉMO LIVE ═══════════ */}
          <TabsContent value="demo">
            <AnimatePresence mode="wait">
              <motion.div key="demo" variants={tabContent} initial="initial" animate="animate" exit="exit" className="space-y-6">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {/* WhatsApp demo */}
                  <motion.div variants={fadeIn} custom={0}>
                    <Card className="h-full">
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: `${WHATSAPP}15` }}>
                            <MessageCircle className="h-4 w-4" style={{ color: WHATSAPP }} />
                          </div>
                          <div>
                            <CardTitle className="text-sm">WhatsApp Business</CardTitle>
                            <CardDescription className="text-xs">Conversation avec Mme Koné</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2.5 rounded-lg bg-[#ECE5DD] p-3">
                          {whatsappConversation.map((msg, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.3, duration: 0.4 }}
                              className={cn(
                                'max-w-[85%] rounded-lg p-2.5 text-xs',
                                msg.from === 'bot'
                                  ? 'bg-white rounded-tl-none mr-auto'
                                  : 'bg-[#DCF8C6] rounded-tr-none ml-auto'
                              )}
                            >
                              <p className="leading-relaxed">{msg.text}</p>
                              <p className="text-[9px] text-right mt-1 opacity-60">{msg.time}</p>
                            </motion.div>
                          ))}
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <div className="flex-1 rounded-lg border bg-white px-3 py-2 text-xs text-muted-foreground">
                            Écrire un message...
                          </div>
                          <Button size="sm" className="h-8 gap-1" style={{ backgroundColor: WHATSAPP }}>
                            <Send className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* SMS demo */}
                  <motion.div variants={fadeIn} custom={1}>
                    <Card className="h-full">
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: `${SMS_ORANGE}15` }}>
                            <Phone className="h-4 w-4" style={{ color: SMS_ORANGE }} />
                          </div>
                          <div>
                            <CardTitle className="text-sm">SMS Orange</CardTitle>
                            <CardDescription className="text-xs">Relance M. Touré — Facture en retard</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2.5 rounded-lg bg-gray-100 p-3">
                          {smsConversation.map((msg, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.5, duration: 0.4 }}
                              className={cn(
                                'max-w-[85%] rounded-lg p-2.5 text-xs',
                                msg.from === 'bot'
                                  ? 'bg-white rounded-tl-none mr-auto border'
                                  : 'bg-[#FF6600] text-white rounded-tr-none ml-auto'
                              )}
                            >
                              <p className="leading-relaxed">{msg.text}</p>
                            </motion.div>
                          ))}
                        </div>
                        <div className="mt-3 rounded-lg border border-orange-500/20 bg-orange-500/5 p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="h-4 w-4 text-orange-500" />
                            <span className="text-xs font-semibold text-orange-700">IA NexBiz analyse</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            M. Touré répond généralement dans les 24h après un 2e rappel.
                            Relance auto programmée pour demain 8h. Score crédit: 65/100.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                {/* Cross-channel memory */}
                <motion.div variants={fadeIn} custom={2}>
                  <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-sky-500/5">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-sky-500">
                          <Bot className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold">Mémoire Cross-Canal</h3>
                          <p className="text-xs text-muted-foreground">Ce que l&apos;IA sait — quel que soit le canal</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {[
                          { label: 'Historique complet', desc: 'Toutes conversations, tous canaux', icon: MessageSquare, color: NEXBIZ },
                          { label: 'Préférences client', desc: 'Canal préféré, horaires, langue', icon: Users, color: IA },
                          { label: 'Contexte business', desc: 'Dettes, devis, paiements en cours', icon: BarChart3, color: FLOWA },
                          { label: 'Personnalité IA', desc: 'Ton, style, niveau de formalité', icon: Sparkles, color: '#EC4899' },
                        ].map((item, i) => (
                          <div key={i} className="rounded-lg border border-border/50 bg-white p-3">
                            <div className="flex items-center gap-2 mb-2">
                              <item.icon className="h-4 w-4" style={{ color: item.color }} />
                              <span className="text-xs font-bold">{item.label}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </TabsContent>

          {/* ═══════════ TAB 4: ARCHITECTURE ═══════════ */}
          <TabsContent value="architecture">
            <AnimatePresence mode="wait">
              <motion.div key="architecture" variants={tabContent} initial="initial" animate="animate" exit="exit" className="space-y-6">
                {/* Architecture diagram */}
                <motion.div variants={fadeIn} custom={0}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Architecture Omni-Channel NexBiz</CardTitle>
                      <CardDescription>Comment l&apos;IA centrale orchestre tous les canaux de communication</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="relative py-8">
                        {/* Visual architecture */}
                        <div className="flex flex-col items-center gap-6">
                          {/* Top: Client channels */}
                          <div className="flex flex-wrap justify-center gap-4">
                            {channels.map((ch, i) => (
                              <motion.div
                                key={ch.id}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.4 }}
                                className="flex flex-col items-center gap-1"
                              >
                                <div
                                  className="flex h-12 w-12 items-center justify-center rounded-xl shadow-md"
                                  style={{ backgroundColor: ch.color }}
                                >
                                  <ch.icon className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-[10px] font-medium">{ch.name.split('(')[0].trim()}</span>
                              </motion.div>
                            ))}
                          </div>

                          {/* Arrow down */}
                          <div className="flex flex-col items-center gap-1">
                            <ArrowRight className="h-5 w-5 rotate-90 text-muted-foreground/40" />
                            <span className="text-[10px] font-semibold text-muted-foreground">APIs & Webhooks</span>
                            <ArrowRight className="h-5 w-5 rotate-90 text-muted-foreground/40" />
                          </div>

                          {/* Middle: NexBiz Brain */}
                          <motion.div
                            animate={{ scale: [1, 1.03, 1] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            className="rounded-2xl border-2 border-sky-500/30 bg-gradient-to-br from-sky-500/10 via-purple-500/5 to-sky-500/10 px-8 py-5 text-center shadow-lg"
                          >
                            <div className="flex items-center justify-center gap-2 mb-2">
                              <Bot className="h-6 w-6 text-sky-500" />
                              <span className="text-lg font-bold bg-gradient-to-r from-sky-500 to-purple-600 bg-clip-text text-transparent">
                                NexBiz IA Centrale
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground max-w-md">
                              Route les messages • Maintient le contexte • Personnalise les réponses • Apprend les préférences
                            </p>
                            <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                              <Badge variant="outline" className="text-[9px] border-purple-500/30 text-purple-600">Mémoire</Badge>
                              <Badge variant="outline" className="text-[9px] border-sky-500/30 text-sky-600">NLP</Badge>
                              <Badge variant="outline" className="text-[9px] border-orange-500/30 text-orange-600">Contexte</Badge>
                              <Badge variant="outline" className="text-[9px] border-green-500/30 text-green-600">Routing</Badge>
                            </div>
                          </motion.div>

                          {/* Arrow down */}
                          <div className="flex flex-col items-center gap-1">
                            <ArrowRight className="h-5 w-5 rotate-90 text-muted-foreground/40" />
                            <span className="text-[10px] font-semibold text-muted-foreground">Données & Actions</span>
                            <ArrowRight className="h-5 w-5 rotate-90 text-muted-foreground/40" />
                          </div>

                          {/* Bottom: Data sources */}
                          <div className="flex flex-wrap justify-center gap-4">
                            {[
                              { icon: BarChart3, label: 'CRM NexBiz', color: NEXBIZ },
                              { icon: Hash, label: 'Flowa Finance', color: FLOWA },
                              { icon: Sparkles, label: 'Creative Engine', color: '#EC4899' },
                              { icon: Users, label: 'Supabase DB', color: '#10B981' },
                            ].map((src, i) => (
                              <motion.div
                                key={src.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                                className="flex flex-col items-center gap-1"
                              >
                                <div
                                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                                  style={{ backgroundColor: `${src.color}15` }}
                                >
                                  <src.icon className="h-5 w-5" style={{ color: src.color }} />
                                </div>
                                <span className="text-[10px] font-medium">{src.label}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* API integration details */}
                <motion.div variants={fadeIn} custom={1}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Intégrations API par Canal</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { channel: 'WhatsApp', api: 'Meta Business API', auth: 'OAuth 2.0 + Webhook', rate: '80 msg/min', color: WHATSAPP },
                          { channel: 'Telegram', api: 'Telegram Bot API', auth: 'Bot Token + Webhook', rate: '30 msg/sec', color: TELEGRAM },
                          { channel: 'SMS Orange', api: "Africa's Talking + Orange SMS Pro", auth: 'API Key', rate: '100 SMS/sec', color: SMS_ORANGE },
                          { channel: 'Email', api: 'SendGrid / Resend', auth: 'API Key + SMTP', rate: '100 emails/min', color: EMAIL },
                          { channel: 'Web Chat', api: 'WebSocket + REST', auth: 'JWT Token', rate: 'Temps réel', color: WEBCHAT },
                        ].map((int, i) => (
                          <div key={i} className="flex items-center gap-4 rounded-lg border border-border/50 bg-white p-3">
                            <div
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                              style={{ backgroundColor: `${int.color}15` }}
                            >
                              <Webhook className="h-4 w-4" style={{ color: int.color }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold">{int.channel}</p>
                              <p className="text-xs text-muted-foreground">{int.api}</p>
                            </div>
                            <div className="hidden sm:block text-xs text-muted-foreground">{int.auth}</div>
                            <Badge variant="outline" className="text-[9px] shrink-0" style={{ color: int.color, borderColor: `${int.color}25` }}>
                              {int.rate}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Smart routing */}
                <motion.div variants={fadeIn} custom={2}>
                  <Card className="border-sky-500/20 bg-gradient-to-br from-sky-500/5 to-purple-500/5">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-base mb-3 flex items-center gap-2">
                        <Zap className="h-4 w-4 text-sky-500" />
                        Smart Routing — L&apos;IA choisit le meilleur canal
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                          { rule: 'Relance paiement', channel: 'SMS + Appel IA', reason: 'Canal le plus direct, taux ouverture 98%', color: FLOWA },
                          { rule: 'Confirmation commande', channel: 'WhatsApp', reason: 'Rich media, boutons interactifs', color: WHATSAPP },
                          { rule: 'Devis détaillé', channel: 'Email', reason: 'Format long, PDF joint, traçabilité', color: EMAIL },
                        ].map((r, i) => (
                          <div key={i} className="rounded-lg border border-border/50 bg-white p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <ArrowRight className="h-3 w-3" style={{ color: r.color }} />
                              <span className="text-xs font-bold">{r.rule}</span>
                            </div>
                            <p className="text-sm font-semibold" style={{ color: r.color }}>{r.channel}</p>
                            <p className="text-xs text-muted-foreground mt-1">{r.reason}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
