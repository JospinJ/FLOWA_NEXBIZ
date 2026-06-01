'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Send,
  Mic,
  MicOff,
  Sparkles,
  CheckCircle2,
  ToggleLeft,
  ToggleRight,
  MessageSquare,
  Phone,
  BarChart3,
  Wallet,
  FileText,
  Smartphone,
  TrendingUp,
  Target,
  Zap,
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
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useNavStore } from '@/lib/nav-store';

/* ═══════════════════════ BRAND COLORS ═══════════════════════════════ */

const FLOWA = '#FF6600';
const NEXBIZ = '#0EA5E9';
const IA = '#8B5CF6';

/* ═══════════════════════ ANIMATION CONFIG ════════════════════════════ */

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const bubbleIn = {
  hidden: { opacity: 0, scale: 0.92, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ═══════════════════════ MOCK DATA ═══════════════════════════════════ */

interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  text: string;
  timestamp: string;
}

const initialMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'user',
    text: 'Quelle est ma situation financière ce mois-ci ?',
    timestamp: '14:32',
  },
  {
    id: '2',
    role: 'ai',
    text: '📊 Résumé financier de mai 2026:\n- Revenus: 2,450,000 FCFA (+12.5%)\n- Dépenses: 1,680,000 FCFA\n- Cashflow net: 770,000 FCFA\n- 3 factures en retard: 450,000 FCFA\n\n⚠️ Recommandation: Lancez les relances automatiques pour les 3 clients en retard.',
    timestamp: '14:32',
  },
  {
    id: '3',
    role: 'user',
    text: 'Envoie un devis à Mme Koné pour 350 000 francs',
    timestamp: '14:35',
  },
  {
    id: '4',
    role: 'ai',
    text: '✅ Devis DEV-004 créé pour Mme Koné — 350,000 FCFA\n📋 Détails: Fournitures bureau, livraison sous 48h\n\nVoulez-vous que je l\'envoie par SMS ?',
    timestamp: '14:35',
  },
  {
    id: '5',
    role: 'user',
    text: 'Oui, envoie-le',
    timestamp: '14:36',
  },
  {
    id: '6',
    role: 'ai',
    text: '📤 Devis envoyé par SMS à Mme Koné (+225 07 XX XX XX)\n🔔 Je suivrai la réponse et vous alerterai.',
    timestamp: '14:36',
  },
];

interface AIContextItem {
  label: string;
  connected: boolean;
  source: 'flowa' | 'nexbiz' | 'both';
}

const aiContextData: AIContextItem[] = [
  { label: 'Données financières (Flowa)', connected: true, source: 'flowa' },
  { label: 'Données commerciales (NexBiz)', connected: true, source: 'nexbiz' },
  { label: 'Historique clients', connected: true, source: 'both' },
  { label: 'Mémoire conversations', connected: true, source: 'both' },
];

interface Capability {
  icon: React.ElementType;
  label: string;
  active: boolean;
}

const initialCapabilities: Capability[] = [
  { icon: BarChart3, label: 'Analyse financière', active: true },
  { icon: Wallet, label: 'Gestion paiements', active: true },
  { icon: FileText, label: 'Création devis/factures', active: true },
  { icon: Smartphone, label: 'Envoi SMS/notifications', active: true },
  { icon: TrendingUp, label: 'Prévisions cashflow', active: false },
  { icon: Target, label: 'Recommandations business', active: true },
];

const quickSuggestions = [
  'Situation du jour',
  'Relancer les retardataires',
  'Prévoir ma trésorerie',
  'Top clients du mois',
];

/* ═══════════════════════ MAIN COMPONENT ══════════════════════════════ */

export default function AIAssistant() {
  const setView = useNavStore((s) => s.setView);
  const [mode, setMode] = useState<'chat' | 'vocal'>('chat');
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [capabilities, setCapabilities] = useState<Capability[]>(initialCapabilities);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue.trim(),
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        text: "🤖 J'ai bien reçu votre demande. Je traite l'information et je reviens vers vous avec une réponse détaillée.",
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, aiMsg]);
    }, 1800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleCapability = (index: number) => {
    setCapabilities((prev) =>
      prev.map((c, i) => (i === index ? { ...c, active: !c.active } : c))
    );
  };

  const handleSuggestion = (text: string) => {
    setInputValue(text);
  };

  const toggleListening = () => {
    setIsListening((prev) => !prev);
  };

  const formatMessageText = (text: string) => {
    return text.split('\n').map((line, i) => (
      <span key={i}>
        {line}
        {i < text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

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
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA] text-sm font-bold text-white shadow-sm">
            <Bot className="h-4 w-4" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight sm:text-xl">
              Assistant IA — Flowa × NexBiz
            </h1>
            <p className="text-xs text-muted-foreground">
              Intelligence combinée pour votre entreprise
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Tabs value={mode} onValueChange={(v) => setMode(v as 'chat' | 'vocal')}>
            <TabsList className="h-9">
              <TabsTrigger value="chat" className="gap-1.5 text-xs px-3">
                <MessageSquare className="h-3.5 w-3.5" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="vocal" className="gap-1.5 text-xs px-3">
                <Phone className="h-3.5 w-3.5" />
                Vocal
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Badge variant="outline" className="gap-1 border-purple-500/30 bg-purple-500/5 text-purple-600 text-xs">
            <Sparkles className="h-3 w-3" />
            IA Active
          </Badge>
        </div>
      </motion.header>

      {/* ═══════════ MAIN CONTENT ═══════════ */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* ─── LEFT PANEL: Chat Interface (60%) ─── */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={1}
            className="flex-1 lg:max-w-[60%]"
          >
            <Card className="flex h-[calc(100vh-140px)] flex-col overflow-hidden">
              {/* Chat Header Bar */}
              <div className="flex items-center justify-between border-b px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA]">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Assistant Flowa × NexBiz</p>
                    <p className="text-[11px] text-green-600">En ligne — prêt à aider</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-orange-500/30 bg-orange-500/5 text-orange-600 text-[10px] px-1.5 py-0">
                    Flowa
                  </Badge>
                  <Badge variant="outline" className="border-sky-500/30 bg-sky-500/5 text-sky-600 text-[10px] px-1.5 py-0">
                    NexBiz
                  </Badge>
                </div>
              </div>

              {/* Messages Area */}
              <ScrollArea className="flex-1 px-4 py-4">
                <div className="space-y-4">
                  <AnimatePresence>
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        variants={bubbleIn}
                        initial="hidden"
                        animate="visible"
                        className={cn(
                          'flex',
                          msg.role === 'user' ? 'justify-end' : 'justify-start'
                        )}
                      >
                        <div
                          className={cn(
                            'max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
                            msg.role === 'user'
                              ? 'rounded-br-md bg-orange-500/10 text-foreground border border-orange-500/20'
                              : 'rounded-bl-md bg-purple-500/5 text-foreground border border-purple-500/15'
                          )}
                        >
                          {msg.role === 'ai' && (
                            <div className="mb-1.5 flex items-center gap-1.5">
                              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA]">
                                <Bot className="h-3 w-3 text-white" />
                              </div>
                              <span className="text-[11px] font-semibold text-purple-600">Assistant IA</span>
                            </div>
                          )}
                          <div className="whitespace-pre-wrap">{formatMessageText(msg.text)}</div>
                          <p
                            className={cn(
                              'mt-1.5 text-[10px]',
                              msg.role === 'user' ? 'text-orange-600/60' : 'text-purple-600/50'
                            )}
                          >
                            {msg.timestamp}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Typing indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="rounded-2xl rounded-bl-md border border-purple-500/15 bg-purple-500/5 px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA]">
                            <Bot className="h-3 w-3 text-white" />
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="h-2 w-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="h-2 w-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="h-2 w-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Vocal Mode Indicator */}
              {mode === 'vocal' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t px-4 py-3"
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="relative">
                      {isListening && (
                        <>
                          <motion.div
                            animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="absolute inset-0 rounded-full bg-purple-500/20"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                            transition={{ duration: 1.2, repeat: Infinity }}
                            className="absolute inset-0 rounded-full bg-purple-500/15"
                          />
                        </>
                      )}
                      <button
                        onClick={toggleListening}
                        className={cn(
                          'relative z-10 flex h-14 w-14 items-center justify-center rounded-full transition-all',
                          isListening
                            ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                            : 'bg-muted text-muted-foreground hover:bg-purple-500/10 hover:text-purple-600'
                        )}
                      >
                        {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {isListening ? 'Écoute en cours... Parlez maintenant' : 'Appuyez pour activer le mode vocal'}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Input Area */}
              <div className="border-t px-4 py-3">
                <div className="flex items-center gap-2">
                  {mode === 'vocal' && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0 h-9 w-9"
                      onClick={toggleListening}
                    >
                      {isListening ? (
                        <MicOff className="h-4 w-4 text-red-500" />
                      ) : (
                        <Mic className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  )}
                  <div className="relative flex-1">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={
                        mode === 'vocal'
                          ? 'Dites quelque chose ou tapez ici...'
                          : 'Tapez votre message...'
                      }
                      className="pr-10 h-10 text-sm rounded-xl border-muted-foreground/20 bg-muted/30 focus-visible:ring-purple-500/30"
                    />
                  </div>
                  <Button
                    onClick={handleSend}
                    disabled={!inputValue.trim()}
                    size="icon"
                    className="shrink-0 h-10 w-10 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA] text-white shadow-md hover:shadow-lg transition-all disabled:opacity-40"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>

                {/* Quick suggestions */}
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {quickSuggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSuggestion(suggestion)}
                      className="rounded-full border border-purple-500/20 bg-purple-500/5 px-3 py-1 text-xs text-purple-700 transition-colors hover:bg-purple-500/10 hover:border-purple-500/30 dark:text-purple-300"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* ─── RIGHT PANEL: AI Context & Capabilities (40%) ─── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-4 lg:max-w-[40%]"
          >
            {/* Contexte IA Card */}
            <motion.div variants={fadeIn} custom={1}>
              <Card className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-purple-500/15">
                      <Sparkles className="h-4 w-4 text-purple-500" />
                    </div>
                    <CardTitle className="text-sm font-semibold">Contexte IA</CardTitle>
                  </div>
                  <CardDescription className="text-xs">
                    Sources de données connectées à l'assistant
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2.5">
                    {aiContextData.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between rounded-lg border border-border/50 bg-white px-3 py-2.5 shadow-sm"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="inline-block h-2 w-2 rounded-full"
                            style={{
                              backgroundColor:
                                item.source === 'flowa'
                                  ? FLOWA
                                  : item.source === 'nexbiz'
                                  ? NEXBIZ
                                  : IA,
                            }}
                          />
                          <span className="text-xs font-medium text-foreground/90">
                            {item.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {item.connected ? (
                            <>
                              <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                              <span className="text-[11px] font-medium text-green-600">Connecté</span>
                            </>
                          ) : (
                            <span className="text-[11px] font-medium text-red-500">Déconnecté</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Connection Status */}
                  <div className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-green-500/5 border border-green-500/20 px-3 py-2">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-medium text-green-700">Toutes les sources sont connectées</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Capacités Card */}
            <motion.div variants={fadeIn} custom={2}>
              <Card className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-purple-500/15">
                      <Zap className="h-4 w-4 text-purple-500" />
                    </div>
                    <CardTitle className="text-sm font-semibold">Capacités</CardTitle>
                  </div>
                  <CardDescription className="text-xs">
                    Activez ou désactivez les fonctionnalités IA
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-1.5">
                    {capabilities.map((cap, index) => {
                      const CapIcon = cap.icon;
                      return (
                        <button
                          key={cap.label}
                          onClick={() => toggleCapability(index)}
                          className={cn(
                            'flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-left transition-all',
                            cap.active
                              ? 'border-purple-500/20 bg-purple-500/5 shadow-sm'
                              : 'border-border/40 bg-white opacity-60'
                          )}
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              className={cn(
                                'flex h-7 w-7 items-center justify-center rounded-md',
                                cap.active ? 'bg-purple-500/15' : 'bg-muted'
                              )}
                            >
                              <CapIcon
                                className="h-3.5 w-3.5"
                                style={{ color: cap.active ? IA : '#9CA3AF' }}
                              />
                            </div>
                            <span
                              className={cn(
                                'text-xs font-medium',
                                cap.active ? 'text-foreground' : 'text-muted-foreground'
                              )}
                            >
                              {cap.label}
                            </span>
                          </div>
                          {cap.active ? (
                            <ToggleRight className="h-5 w-5 text-purple-500" />
                          ) : (
                            <ToggleLeft className="h-5 w-5 text-muted-foreground/50" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Actions rapides Card */}
            <motion.div variants={fadeIn} custom={3}>
              <Card className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-[#FF6600]/15 to-[#0EA5E9]/15">
                      <Zap className="h-4 w-4" style={{ color: IA }} />
                    </div>
                    <CardTitle className="text-sm font-semibold">Actions rapides</CardTitle>
                  </div>
                  <CardDescription className="text-xs">
                    Commandes fréquentes en un clic
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-2 gap-2">
                    {quickSuggestions.map((suggestion) => (
                      <motion.button
                        key={suggestion}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSuggestion(suggestion)}
                        className="flex items-center justify-center gap-1.5 rounded-xl border border-purple-500/15 bg-gradient-to-br from-purple-500/5 to-purple-500/0 px-3 py-2.5 text-xs font-medium text-purple-700 transition-all hover:border-purple-500/30 hover:shadow-sm dark:text-purple-300"
                      >
                        <Sparkles className="h-3 w-3" />
                        {suggestion}
                      </motion.button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* AI Memory Indicator */}
            <motion.div variants={fadeIn} custom={4}>
              <Card className="overflow-hidden border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-transparent">
                <CardContent className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA] shadow-md">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-foreground">Mémoire IA active</p>
                      <p className="text-[11px] text-muted-foreground">
                        6 conversations en contexte • Dernière mise à jour il y a 2 min
                      </p>
                    </div>
                    <Badge variant="outline" className="shrink-0 border-purple-500/30 bg-purple-500/10 text-purple-600 text-[10px]">
                      100%
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
