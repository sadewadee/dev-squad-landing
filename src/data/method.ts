export interface MethodStep {
  number: string;
  title: string;
  description: string;
  image: string;
}

export const methodSteps: MethodStep[] = [
  {
    number: '01',
    title: 'Plan',
    description: 'Coordinator runs ULTRAPLAN — deep thinking on scope, entities, tech stack, risks. Architect produces a PRD with C4 diagrams and ADRs. One human checkpoint, then autonomy.',
    image: '/assets/method-1.png',
  },
  {
    number: '02',
    title: 'Do',
    description: 'Architect locks contracts. Designer extracts real tokens from reference sites. Frontend and backend ship in parallel via worktrees with TDD. Shared types live in packages/shared-types.',
    image: '/assets/method-2.png',
  },
  {
    number: '03',
    title: 'Check',
    description: 'Reviewer (static + security), qa-engineer (runtime + Visual Gate), and auditor (stability + code quality) run in parallel. Reviewer synthesizes a single Metrics Report. P0-P1 must clear.',
    image: '/assets/method-3.png',
  },
  {
    number: '04',
    title: 'Act',
    description: 'DevOps deploys to staging with health checks, monitoring, and rollback. Git-Ops opens a PR with full summary. Reviewer signs off. Retrospective writes wins to the playbook and lessons to memory.',
    image: '/assets/method-4.png',
  },
];
