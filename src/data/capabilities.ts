export interface Capability {
  number: string;
  title: string;
  subtitle: string;
  description: string;
}

export const capabilities: Capability[] = [
  {
    number: '01',
    title: 'Agents',
    subtitle: 'Eleven specialist roles',
    description: 'Coordinator (opus) leads architect, designer, backend, frontend, reviewer, qa-engineer, auditor, devops, git-ops, and writer through hierarchical orchestration with direct P0/P1 messaging.',
  },
  {
    number: '02',
    title: 'Phases',
    subtitle: 'Nine PDCA phases',
    description: 'Ultraplan → Discover → Design → Scaffold → Design Gate → Implement → Review → Ship → Retrospective. Each gated, each verifiable, each producing an artifact.',
  },
  {
    number: '03',
    title: 'Gates',
    subtitle: 'Hard quality gates',
    description: 'Phase 3.5 anti-AI-slop design gate. Phase 5.5 runtime functional verification. Phase 5.6 stability and 5.7 code quality. Reviewer + QA + auditor hold veto power on P0-P1.',
  },
  {
    number: '04',
    title: 'BYO model',
    subtitle: 'Bring your own model',
    description: 'Runs on Opus 4.7, Sonnet 4.6, Haiku 4.5 — or whatever Claude Code routes to. Model choice per agent, sized to task complexity, not one-size-fits-all.',
  },
];
