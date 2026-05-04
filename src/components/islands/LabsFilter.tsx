import { useState } from 'react';

interface LabItem {
  tag: string;
  number: string;
  year: string;
  title: string;
  description: string;
  image: string;
  category: 'workflow' | 'gate' | 'audit' | 'database';
}

interface Props {
  labs: LabItem[];
}

type FilterKey = 'all' | 'workflow' | 'gate' | 'audit' | 'database';

const filters: { key: FilterKey; label: string; count: number }[] = [
  { key: 'all', label: 'All', count: 5 },
  { key: 'workflow', label: 'Workflow', count: 1 },
  { key: 'gate', label: 'Gate', count: 2 },
  { key: 'audit', label: 'Audit', count: 1 },
  { key: 'database', label: 'Database', count: 1 },
];

export default function LabsFilter({ labs }: Props) {
  const [active, setActive] = useState<FilterKey>('all');

  const visibleLabs = active === 'all' ? labs : labs.filter((l) => l.category === active);
  const showEmpty = active !== 'all' && visibleLabs.length === 0;

  return (
    <div>
      {/* Filter tabs */}
      <div className="labs-tabs" role="tablist" aria-label="Lab categories">
        {filters.map((f) => (
          <button
            key={f.key}
            role="tab"
            aria-selected={active === f.key}
            className={`labs-tab ${active === f.key ? 'labs-tab-active' : ''}`}
            onClick={() => setActive(f.key)}
          >
            {f.label} <span className="labs-tab-count">{f.count}</span>
          </button>
        ))}
      </div>

      {/* Cards grid */}
      {showEmpty ? (
        <div className="labs-empty">
          <p>More workflows and gates documented on GitHub</p>
          <a
            href="https://github.com/sadewadee/dev-squad-plugin"
            target="_blank"
            rel="noopener noreferrer"
            className="pill-btn pill-outlined"
          >
            View full library →
          </a>
        </div>
      ) : (
        <div className="labs-grid" role="tabpanel">
          {visibleLabs.map((lab) => (
            <a
              key={lab.number}
              href="https://github.com/sadewadee/dev-squad-plugin"
              target="_blank"
              rel="noopener noreferrer"
              className="lab-card card"
            >
              <div className="lab-card-image-wrap">
                <img
                  src={lab.image}
                  alt={lab.title}
                  className="lab-card-img"
                  loading="lazy"
                  width="400"
                  height="260"
                />
              </div>
              <div className="lab-card-body">
                <div className="lab-card-meta">
                  <span className="tag-badge">{lab.tag}</span>
                  <span className="lab-card-number">{lab.number}</span>
                  <span className="lab-card-year">{lab.year}</span>
                </div>
                <h4 className="lab-card-title">{lab.title}</h4>
                <p className="lab-card-desc">{lab.description}</p>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Footer link */}
      <div className="labs-footer">
        <a
          href="https://github.com/sadewadee/dev-squad-plugin"
          target="_blank"
          rel="noopener noreferrer"
          className="labs-footer-link"
        >
          <span>05 / 11 AGENTS · 9 PHASES</span>
          <span className="labs-footer-arrow">READ THE FULL PROTOCOL →</span>
        </a>
      </div>

      <style>{`
        .labs-tabs {
          display: flex;
          gap: 0.375rem;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--line-soft);
        }
        .labs-tab {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          padding: 6px 14px;
          border-radius: 999px;
          font-family: var(--font-sans);
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--ink-mute);
          background: transparent;
          border: 1.5px solid var(--line);
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .labs-tab:hover { color: var(--ink); border-color: var(--ink-mute); }
        .labs-tab-active {
          background-color: var(--ink);
          color: var(--paper);
          border-color: var(--ink);
        }
        .labs-tab-count {
          font-size: 0.625rem;
          opacity: 0.6;
        }
        .labs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        @media (max-width: 1100px) { .labs-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .labs-grid { grid-template-columns: 1fr; } }
        .lab-card {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          background-color: var(--paper);
          border: 1px solid var(--line);
          border-radius: 8px;
          overflow: hidden;
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }
        .lab-card:hover {
          box-shadow: var(--shadow);
          transform: translateY(-2px);
        }
        .lab-card-image-wrap {
          overflow: hidden;
          aspect-ratio: 16 / 10;
          background-color: var(--paper-warm);
        }
        .lab-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.3s ease;
        }
        .lab-card:hover .lab-card-img { transform: scale(1.03); }
        .lab-card-body {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex: 1;
        }
        .lab-card-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .lab-card-number {
          font-size: 0.625rem;
          font-family: var(--font-mono);
          color: var(--ink-faint);
        }
        .lab-card-year {
          font-size: 0.625rem;
          color: var(--ink-faint);
          margin-left: auto;
        }
        .lab-card-title {
          font-family: var(--font-sans);
          font-size: 1rem;
          font-weight: 700;
          color: var(--ink);
          margin: 0;
          line-height: 1.3;
        }
        .lab-card-desc {
          font-size: 0.875rem;
          color: var(--ink-mute);
          line-height: 1.6;
          margin: 0;
        }
        .labs-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
          padding: 4rem 2rem;
          text-align: center;
          color: var(--ink-mute);
          font-size: 0.9375rem;
          border: 1px dashed var(--line);
          border-radius: 8px;
          margin-bottom: 2rem;
        }
        .labs-footer {
          padding-top: 1.5rem;
          border-top: 1px solid var(--line-soft);
        }
        .labs-footer-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--ink-mute);
          transition: color 0.15s ease;
          text-decoration: none;
        }
        .labs-footer-link:hover { color: var(--ink); }
        .labs-footer-arrow { color: var(--coral); }
      `}</style>
    </div>
  );
}
