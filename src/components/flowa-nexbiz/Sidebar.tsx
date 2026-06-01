'use client';

import { useNavStore, ViewId } from '@/lib/nav-store';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Wallet,
  Users,
  ArrowLeftRight,
  FileText,
  PiggyBank,
  Megaphone,
  Bot,
  BarChart3,
  GitBranch,
  Brain,
  Smartphone,
  GitCompare,
  BookOpen,
  Home,
  ChevronLeft,
  ChevronRight,
  Wand2,
  Radio,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface NavItem {
  id: ViewId;
  label: string;
  icon: React.ReactNode;
  group?: string;
}

const navItems: NavItem[] = [
  { id: 'landing', label: 'Accueil', icon: <Home className="h-4 w-4" /> },
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" />, group: 'Principal' },
  { id: 'flowa', label: 'Flowa (CFO IA)', icon: <Wallet className="h-4 w-4" />, group: 'Modules' },
  { id: 'nexbiz', label: 'NexBiz (CRM IA)', icon: <Users className="h-4 w-4" />, group: 'Modules' },
  { id: 'clients', label: 'Clients', icon: <Users className="h-4 w-4" />, group: 'Gestion' },
  { id: 'transactions', label: 'Transactions', icon: <ArrowLeftRight className="h-4 w-4" />, group: 'Gestion' },
  { id: 'invoices', label: 'Devis / Factures', icon: <FileText className="h-4 w-4" />, group: 'Gestion' },
  { id: 'treasury', label: 'Trésorerie', icon: <PiggyBank className="h-4 w-4" />, group: 'Gestion' },
  { id: 'campaigns', label: 'Campagnes', icon: <Megaphone className="h-4 w-4" />, group: 'Gestion' },
  { id: 'ai-assistant', label: 'Assistant IA', icon: <Bot className="h-4 w-4" />, group: 'Intelligence' },
  { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="h-4 w-4" />, group: 'Intelligence' },
  { id: 'creative-engine', label: 'Creative Engine (ACA)', icon: <Wand2 className="h-4 w-4" />, group: 'Intelligence' },
  { id: 'omnichannel', label: 'Canaux Omni-Channel', icon: <Radio className="h-4 w-4" />, group: 'Intelligence' },
  { id: 'workflows', label: 'Workflows', icon: <GitBranch className="h-4 w-4" />, group: 'Spécification' },
  { id: 'ai-central', label: 'IA Centralisée', icon: <Brain className="h-4 w-4" />, group: 'Spécification' },
  { id: 'orange', label: 'Intégration Orange', icon: <Smartphone className="h-4 w-4" />, group: 'Stratégie' },
  { id: 'comparison', label: 'Flowa vs NexBiz', icon: <GitCompare className="h-4 w-4" />, group: 'Stratégie' },
  { id: 'usecase', label: 'Cas d\'utilisation', icon: <BookOpen className="h-4 w-4" />, group: 'Stratégie' },
];

export default function Sidebar() {
  const { currentView, setView } = useNavStore();
  const [collapsed, setCollapsed] = useState(false);

  const grouped = navItems.reduce<Record<string, NavItem[]>>((acc, item) => {
    const group = item.group || 'Navigation';
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {});

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          'flex flex-col border-r bg-white transition-all duration-300 h-screen sticky top-0',
          collapsed ? 'w-16' : 'w-64'
        )}
      >
        {/* Header */}
        <div className={cn('flex items-center h-16 px-4 border-b', collapsed ? 'justify-center' : 'justify-between')}>
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#FF6600] to-[#FF8533] flex items-center justify-center text-white font-bold text-xs">
                F×N
              </div>
              <div>
                <p className="font-bold text-sm leading-tight">Flowa × NexBiz</p>
                <p className="text-[10px] text-muted-foreground">Super App PME IA</p>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#FF6600] to-[#FF8533] flex items-center justify-center text-white font-bold text-xs">
              F×N
            </div>
          )}
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 py-2">
          {Object.entries(grouped).map(([group, items], gi) => (
            <div key={group} className={cn(gi > 0 && 'mt-2')}>
              {!collapsed && (
                <p className="px-4 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {group}
                </p>
              )}
              {gi > 0 && <Separator className="mx-3 my-1" />}
              {items.map((item) => {
                const isActive = currentView === item.id;
                const btn = (
                  <button
                    key={item.id}
                    onClick={() => setView(item.id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md mx-1 transition-colors',
                      collapsed ? 'justify-center px-0 mx-0' : '',
                      isActive
                        ? 'bg-[#FF6600]/10 text-[#FF6600] font-semibold'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    <span className={cn('shrink-0', isActive ? 'text-[#FF6600]' : '')}>{item.icon}</span>
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </button>
                );
                if (collapsed) {
                  return (
                    <Tooltip key={item.id}>
                      <TooltipTrigger asChild>{btn}</TooltipTrigger>
                      <TooltipContent side="right">{item.label}</TooltipContent>
                    </Tooltip>
                  );
                }
                return btn;
              })}
            </div>
          ))}
        </ScrollArea>

        {/* Collapse toggle */}
        <div className="border-t p-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            {!collapsed && <span className="ml-2 text-xs">Réduire</span>}
          </Button>
        </div>
      </aside>
    </TooltipProvider>
  );
}
