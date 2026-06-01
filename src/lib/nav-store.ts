import { create } from 'zustand';

export type ViewId =
  | 'landing'
  | 'dashboard'
  | 'flowa'
  | 'nexbiz'
  | 'clients'
  | 'transactions'
  | 'invoices'
  | 'treasury'
  | 'campaigns'
  | 'ai-assistant'
  | 'analytics'
  | 'workflows'
  | 'ai-central'
  | 'orange'
  | 'comparison'
  | 'usecase'
  | 'creative-engine'
  | 'omnichannel';

interface NavState {
  currentView: ViewId;
  workflowStep: number;
  setView: (view: ViewId) => void;
  setWorkflowStep: (step: number) => void;
}

export const useNavStore = create<NavState>((set) => ({
  currentView: 'landing',
  workflowStep: 0,
  setView: (view) => set({ currentView: view, workflowStep: 0 }),
  setWorkflowStep: (step) => set({ workflowStep: step }),
}));
