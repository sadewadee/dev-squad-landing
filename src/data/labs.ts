export interface LabItem {
  tag: string;
  number: string;
  year: string;
  title: string;
  description: string;
  image: string;
  category: 'workflow' | 'gate' | 'audit' | 'database';
}

export const labs: LabItem[] = [
  {
    tag: 'Workflow',
    number: 'Nº 01',
    year: '2026',
    title: 'Zero-to-Ship Build',
    description: '/dev-squad build · nine PDCA phases from idea to deploy. Architect → Designer → Frontend + Backend → Reviewer → QA → Auditor → DevOps → Git-Ops. One human checkpoint, then autonomy.',
    image: '/assets/lab-1.jpeg',
    category: 'workflow',
  },
  {
    tag: 'Gate',
    number: 'Nº 02',
    year: '2026',
    title: 'Anti-AI-Slop Design Gate',
    description: 'Phase 3.5 produces four blocking artifacts before frontend codes a line of UI: tokens, visual spec, component inventory, responsive spec. Designer veto on emoji-as-icon and default shadcn slate.',
    image: '/assets/lab-2.jpeg',
    category: 'gate',
  },
  {
    tag: 'Gate',
    number: 'Nº 03',
    year: '2026',
    title: 'Runtime Visual Gate',
    description: 'qa-engineer drives the golden path via playwright, audits every interactive element, smokes every endpoint, captures console plus network. Detects what static review and unit tests miss.',
    image: '/assets/lab-3.jpeg',
    category: 'gate',
  },
  {
    tag: 'Audit',
    number: 'Nº 04',
    year: '2026',
    title: 'Stability Hammer',
    description: 'auditor scans config drift, hammers endpoints for 500 leaks, detects connection leaks, validates migration safety. Multi-language code quality via eslint, gocyclo, ruff, jscpd, ts-prune.',
    image: '/assets/lab-4.jpeg',
    category: 'audit',
  },
  {
    tag: 'Database',
    number: 'Nº 05',
    year: '2026',
    title: 'Safe Migrations',
    description: '/dev-squad migrate · auditor flags NOT NULL on large tables, missing CONCURRENTLY on indexes, ACCESS EXCLUSIVE locks, and lock-duration estimates. Pre-flight every schema change.',
    image: '/assets/lab-5.jpeg',
    category: 'database',
  },
];
