'use client';

import { useNavStore, ViewId } from '@/lib/nav-store';
import Sidebar from '@/components/flowa-nexbiz/Sidebar';
import LandingPage from '@/components/flowa-nexbiz/LandingPage';
import Dashboard from '@/components/flowa-nexbiz/Dashboard';
import FlowaModule from '@/components/flowa-nexbiz/FlowaModule';
import NexBizModule from '@/components/flowa-nexbiz/NexBizModule';
import ClientsPage from '@/components/flowa-nexbiz/ClientsPage';
import TransactionsPage from '@/components/flowa-nexbiz/TransactionsPage';
import InvoicesPage from '@/components/flowa-nexbiz/InvoicesPage';
import TreasuryPage from '@/components/flowa-nexbiz/TreasuryPage';
import CampaignsPage from '@/components/flowa-nexbiz/CampaignsPage';
import AIAssistant from '@/components/flowa-nexbiz/AIAssistant';
import AnalyticsPage from '@/components/flowa-nexbiz/AnalyticsPage';
import WorkflowsPage from '@/components/flowa-nexbiz/WorkflowsPage';
import AICentralPage from '@/components/flowa-nexbiz/AICentralPage';
import OrangeIntegrationPage from '@/components/flowa-nexbiz/OrangeIntegrationPage';
import ComparisonPage from '@/components/flowa-nexbiz/ComparisonPage';
import UseCasePage from '@/components/flowa-nexbiz/UseCasePage';
import CreativeEnginePage from '@/components/flowa-nexbiz/CreativeEnginePage';
import OmniChannelPage from '@/components/flowa-nexbiz/OmniChannelPage';

const viewMap: Record<ViewId, React.ReactNode> = {
  landing: <LandingPage />,
  dashboard: <Dashboard />,
  flowa: <FlowaModule />,
  nexbiz: <NexBizModule />,
  clients: <ClientsPage />,
  transactions: <TransactionsPage />,
  invoices: <InvoicesPage />,
  treasury: <TreasuryPage />,
  campaigns: <CampaignsPage />,
  'ai-assistant': <AIAssistant />,
  analytics: <AnalyticsPage />,
  workflows: <WorkflowsPage />,
  'ai-central': <AICentralPage />,
  orange: <OrangeIntegrationPage />,
  comparison: <ComparisonPage />,
  usecase: <UseCasePage />,
  'creative-engine': <CreativeEnginePage />,
  omnichannel: <OmniChannelPage />,
};

export default function Home() {
  const { currentView } = useNavStore();

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {viewMap[currentView]}
      </main>
    </div>
  );
}
