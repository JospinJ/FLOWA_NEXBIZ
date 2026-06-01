'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  Send,
  Sparkles,
  TrendingUp,
  Eye,
  Download,
  Trash2,
  ChevronRight,
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
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

/* ═══════════════════════ STATUS CONFIG ═══════════════════════════════ */

type DocStatus = 'Brouillon' | 'Envoyé' | 'Accepté' | 'Payé' | 'En retard' | 'Refusé';
type DocType = 'Devis' | 'Facture';

interface Document {
  id: string;
  ref: string;
  client: string;
  type: DocType;
  montant: number;
  date: string;
  echeance: string;
  statut: DocStatus;
}

const statusConfig: Record<DocStatus, { bg: string; text: string; border: string; icon: React.ReactNode }> = {
  Brouillon: {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    border: 'border-gray-200',
    icon: <FileText className="h-3 w-3" />,
  },
  Envoyé: {
    bg: 'bg-sky-50',
    text: 'text-sky-700',
    border: 'border-sky-200',
    icon: <Send className="h-3 w-3" />,
  },
  Accepté: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200',
    icon: <CheckCircle2 className="h-3 w-3" />,
  },
  Payé: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    icon: <CheckCircle2 className="h-3 w-3" />,
  },
  'En retard': {
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200',
    icon: <AlertTriangle className="h-3 w-3" />,
  },
  Refusé: {
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    border: 'border-orange-200',
    icon: <XCircle className="h-3 w-3" />,
  },
};

/* ═══════════════════════ MOCK DATA ═══════════════════════════════════ */

const documents: Document[] = [
  { id: '1', ref: 'DEV-2024-042', client: 'M. Diallo — Restaurant Le Baobab', type: 'Devis', montant: 350000, date: '02/03/2025', echeance: '16/03/2025', statut: 'Envoyé' },
  { id: '2', ref: 'FAC-2024-089', client: 'Mme Koné — Boutique Élégance', type: 'Facture', montant: 180000, date: '28/02/2025', echeance: '28/03/2025', statut: 'Payé' },
  { id: '3', ref: 'DEV-2024-041', client: 'Sarl Techno+ — Fournitures IT', type: 'Devis', montant: 520000, date: '25/02/2025', echeance: '11/03/2025', statut: 'Accepté' },
  { id: '4', ref: 'FAC-2024-088', client: 'M. Touré — Construction', type: 'Facture', montant: 95000, date: '20/02/2025', echeance: '20/03/2025', statut: 'En retard' },
  { id: '5', ref: 'DEV-2024-040', client: 'Ets Camara — Alimentation', type: 'Devis', montant: 280000, date: '18/02/2025', echeance: '04/03/2025', statut: 'Brouillon' },
  { id: '6', ref: 'FAC-2024-087', client: 'Mme Diabaté — Salon Coiffure', type: 'Facture', montant: 420000, date: '15/02/2025', echeance: '15/03/2025', statut: 'Payé' },
  { id: '7', ref: 'DEV-2024-039', client: 'Hôtel Savannah — Équipement', type: 'Devis', montant: 680000, date: '10/02/2025', echeance: '24/02/2025', statut: 'Refusé' },
  { id: '8', ref: 'FAC-2024-086', client: 'Pharmacie Centrale — Fournitures', type: 'Facture', montant: 210000, date: '08/02/2025', echeance: '08/03/2025', statut: 'En retard' },
];

const summaryCards = [
  { title: 'Devis en cours', value: 12, color: NEXBIZ, bgColor: 'bg-sky-500/10', borderColor: 'border-sky-500/20', icon: FileText },
  { title: 'Devis acceptés', value: 28, color: '#16A34A', bgColor: 'bg-green-500/10', borderColor: 'border-green-500/20', icon: CheckCircle2 },
  { title: 'Factures émises', value: 35, color: FLOWA, bgColor: 'bg-orange-500/10', borderColor: 'border-orange-500/20', icon: FileText },
  { title: 'Factures en retard', value: 7, color: '#DC2626', bgColor: 'bg-red-500/10', borderColor: 'border-red-500/20', icon: AlertTriangle },
];

const statsData = [
  { label: 'Montant total devis', value: '4 200 000 FCFA', color: NEXBIZ },
  { label: 'Montant total factures', value: '6 800 000 FCFA', color: FLOWA },
  { label: "Taux d'acceptation", value: '73%', color: '#16A34A' },
];

/* ═══════════════════════ STATUS FLOW VISUAL ══════════════════════════ */

function StatusFlow() {
  const greenSteps = ['Brouillon', 'Envoyé', 'Accepté', 'Facture', 'Payé'];
  const redBranch = 'Refusé';

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Cycle de vie document</CardTitle>
        <CardDescription>Parcours type d&apos;un devis vers le paiement</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* Green path */}
          <div className="flex items-center gap-1 overflow-x-auto pb-2">
            {greenSteps.map((step, i) => (
              <div key={step} className="flex items-center shrink-0">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className="flex h-9 items-center justify-center rounded-lg border px-3 text-xs font-semibold"
                    style={{
                      borderColor: '#16A34A40',
                      backgroundColor: '#16A34A10',
                      color: '#16A34A',
                    }}
                  >
                    {step}
                  </div>
                  <div className="h-1 w-9 rounded-full" style={{ backgroundColor: '#16A34A' }} />
                </div>
                {i < greenSteps.length - 1 && (
                  <ArrowRight className="h-4 w-4 shrink-0 mx-0.5" style={{ color: '#16A34A' }} />
                )}
              </div>
            ))}
          </div>

          {/* Red branch */}
          <div className="flex items-center gap-2 pl-8">
            <span className="text-xs text-muted-foreground">ou</span>
            <ArrowRight className="h-4 w-4" style={{ color: '#DC2626' }} />
            <div
              className="flex h-9 items-center justify-center rounded-lg border px-3 text-xs font-semibold"
              style={{
                borderColor: '#DC262640',
                backgroundColor: '#DC262610',
                color: '#DC2626',
              }}
            >
              {redBranch}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ═══════════════════════ MAIN COMPONENT ══════════════════════════════ */

export default function InvoicesPage() {
  const setView = useNavStore((s) => s.setView);
  const [activeTab, setActiveTab] = useState('tous');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.ref.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.client.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === 'tous') return matchesSearch;
    if (activeTab === 'devis') return matchesSearch && doc.type === 'Devis';
    if (activeTab === 'factures') return matchesSearch && doc.type === 'Facture';
    if (activeTab === 'retard') return matchesSearch && doc.statut === 'En retard';
    return matchesSearch;
  });

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
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight sm:text-xl">Devis & Factures</h1>
            <p className="text-xs text-muted-foreground">NexBiz + Flowa — Création et suivi</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            className="gap-1.5 text-xs font-semibold text-white shadow-sm"
            style={{ backgroundColor: NEXBIZ }}
            size="sm"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Nouveau devis IA
          </Button>
          <Button
            className="gap-1.5 text-xs font-semibold text-white shadow-sm"
            style={{ backgroundColor: FLOWA }}
            size="sm"
          >
            <Plus className="h-3.5 w-3.5" />
            Nouvelle facture
          </Button>
        </div>
      </motion.header>

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6">
        {/* ═══════════ SUMMARY CARDS ═══════════ */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {summaryCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div key={card.title} variants={fadeIn} custom={i}>
                <Card className={cn('relative overflow-hidden border', card.borderColor)}>
                  <div
                    className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-20 blur-2xl"
                    style={{ backgroundColor: card.color }}
                  />
                  <CardContent className="flex items-center gap-4 p-5">
                    <div className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl', card.bgColor)}>
                      <Icon className="h-5 w-5" style={{ color: card.color }} />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{card.title}</p>
                      <p className="text-2xl font-bold tracking-tight" style={{ color: card.color }}>
                        {card.value}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ═══════════ TABS & TABLE ═══════════ */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={1}>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="tous">Tous</TabsTrigger>
                    <TabsTrigger value="devis">Devis</TabsTrigger>
                    <TabsTrigger value="factures">Factures</TabsTrigger>
                    <TabsTrigger value="retard" className="text-red-600">
                      En retard
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher..."
                      className="pl-8 h-9 w-[200px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select>
                    <SelectTrigger size="sm" className="w-[130px]">
                      <Filter className="h-3.5 w-3.5 mr-1" />
                      <SelectValue placeholder="Filtrer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="brouillon">Brouillon</SelectItem>
                      <SelectItem value="envoye">Envoyé</SelectItem>
                      <SelectItem value="accepte">Accepté</SelectItem>
                      <SelectItem value="paye">Payé</SelectItem>
                      <SelectItem value="retard">En retard</SelectItem>
                      <SelectItem value="refuse">Refusé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="pl-4">Réf</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Montant</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Échéance</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right pr-4">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {filteredDocs.map((doc, i) => {
                      const sc = statusConfig[doc.statut];
                      return (
                        <motion.tr
                          key={doc.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          transition={{ duration: 0.25, delay: i * 0.04 }}
                          className="group border-b transition-colors hover:bg-muted/40"
                        >
                          <TableCell className="pl-4 font-mono text-xs font-semibold">
                            {doc.ref}
                          </TableCell>
                          <TableCell className="max-w-[200px] truncate text-sm">
                            {doc.client}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={cn(
                                'text-[10px] font-semibold',
                                doc.type === 'Devis'
                                  ? 'border-sky-200 bg-sky-50 text-sky-700'
                                  : 'border-orange-200 bg-orange-50 text-orange-700',
                              )}
                            >
                              {doc.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right text-sm font-semibold">
                            {doc.montant.toLocaleString('fr-FR')}{' '}
                            <span className="text-xs font-normal text-muted-foreground">FCFA</span>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">{doc.date}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{doc.echeance}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={cn(
                                'gap-1 text-[10px] font-semibold',
                                sc.bg,
                                sc.text,
                                sc.border,
                              )}
                            >
                              {sc.icon}
                              {doc.statut}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right pr-4">
                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                <Eye className="h-3.5 w-3.5" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                <Download className="h-3.5 w-3.5" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-500">
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </TableCell>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                </TableBody>
              </Table>

              {filteredDocs.length === 0 && (
                <div className="py-12 text-center text-sm text-muted-foreground">
                  Aucun document trouvé
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* ═══════════ STATUS FLOW + AI SUGGESTION ═══════════ */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={2} className="lg:col-span-2">
            <StatusFlow />
          </motion.div>

          {/* AI Suggestion */}
          <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={3}>
            <Card className="h-full border-purple-500/20 bg-purple-500/5">
              <CardContent className="flex flex-col gap-4 p-5">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/15">
                    <Sparkles className="h-4 w-4 text-purple-500" />
                  </div>
                  <span className="text-sm font-semibold text-purple-700">Recommandation IA</span>
                </div>
                <p className="text-sm leading-relaxed">
                  💡 L&apos;IA recommande de <strong>relancer 3 devis en attente</strong> depuis +7 jours.
                  Les clients M. Diallo, Ets Camara et Hôtel Savannah n&apos;ont pas encore répondu.
                </p>
                <Button
                  size="sm"
                  className="gap-1.5 bg-purple-500 text-xs font-semibold text-white shadow-sm hover:bg-purple-600"
                >
                  <Send className="h-3.5 w-3.5" />
                  Lancer les relances
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* ═══════════ STATS SUMMARY ═══════════ */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {statsData.map((stat, i) => (
            <motion.div key={stat.label} variants={fadeIn} custom={i}>
              <Card className="relative overflow-hidden border">
                <div
                  className="pointer-events-none absolute -right-4 -top-4 h-20 w-20 rounded-full opacity-15 blur-xl"
                  style={{ backgroundColor: stat.color }}
                />
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="flex-1">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-xl font-bold tracking-tight" style={{ color: stat.color }}>
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${stat.color}15` }}
                  >
                    <TrendingUp className="h-5 w-5" style={{ color: stat.color }} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* ═══════════ ACCEPTANCE RATE PROGRESS ═══════════ */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={4}>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Taux d&apos;acceptation des devis</CardTitle>
                  <CardDescription>28 acceptés sur 40 devis envoyés</CardDescription>
                </div>
                <span className="text-2xl font-bold" style={{ color: '#16A34A' }}>73%</span>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={73} className="h-3" />
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>Objectif: 80%</span>
                <span>100%</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
