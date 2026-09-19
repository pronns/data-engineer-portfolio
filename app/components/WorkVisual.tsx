import type { CaseStudy } from "../data";

/* Small, data-shaped illustrations for each case study. */

function Runtime() {
  return (
    <div className="viz-runtime" role="img" aria-label="Daily runtime fell from 9 hours on Hive/SQL to 6 hours on PySpark">
      <div className="viz-bar-row">
        <span className="viz-bar-label">Hive / SQL</span>
        <span className="viz-bar viz-bar--before" style={{ "--w": "100%" } as React.CSSProperties}>
          <span>9h</span>
        </span>
      </div>
      <div className="viz-bar-row">
        <span className="viz-bar-label">PySpark · EMR</span>
        <span className="viz-bar viz-bar--after" style={{ "--w": "66.6%" } as React.CSSProperties}>
          <span>6h</span>
        </span>
      </div>
      <div className="viz-axis" aria-hidden="true">
        {["0h", "3h", "6h", "9h"].map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function Framework() {
  const ys = [22, 52, 82, 112, 142];
  return (
    <svg className="viz-framework" viewBox="0 0 320 164" role="img" aria-label="Many sources flow through one shared ingestion framework to many consumers">
      {ys.map((y) => (
        <g key={`l${y}`}>
          <path d={`M34 ${y} C90 ${y} 100 82 128 82`} className="vf-wire" />
          <path d={`M192 82 C220 82 230 ${y} 286 ${y}`} className="vf-wire vf-wire--out" />
          <circle cx="26" cy={y} r="7" className="vf-src" />
          <rect x="286" y={y - 7} width="14" height="14" rx="4" className="vf-dst" />
        </g>
      ))}
      <rect x="128" y="56" width="64" height="52" rx="12" className="vf-hub" />
      <text x="160" y="80" textAnchor="middle" className="vf-hub-text">one</text>
      <text x="160" y="94" textAnchor="middle" className="vf-hub-text">framework</text>
      <text x="26" y="162" textAnchor="middle" className="vf-caption">sources</text>
      <text x="293" y="162" textAnchor="middle" className="vf-caption">consumers</text>
    </svg>
  );
}

function Scd2() {
  const rows = [
    ["10482", "NORTH-01", "2022-01-01", "2023-06-30", "false"],
    ["10482", "NORTH-04", "2023-07-01", "2024-12-31", "false"],
    ["10482", "CENTRAL-02", "2025-01-01", "9999-12-31", "true"],
  ];
  return (
    <div className="viz-scd2">
      <table>
        <caption className="sr-only">Illustrative SCD Type-2 dimension: each territory change adds a new versioned row</caption>
        <thead>
          <tr>
            <th scope="col">hcp_id</th>
            <th scope="col">territory</th>
            <th scope="col">valid_from</th>
            <th scope="col">valid_to</th>
            <th scope="col">current</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[1]} className={r[4] === "true" ? "is-current" : undefined}>
              {r.map((c, i) => (
                <td key={i}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Uptime() {
  // Status-page strip: noisy before RCA-driven alerting, quiet after.
  const bad = new Set([2, 6, 9, 13, 17]);
  const warn = new Set([4, 11, 15, 21]);
  return (
    <div className="viz-uptime" role="img" aria-label="Illustrative daily run history: repeat failures early on, then consistently healthy runs after monitoring was added">
      <div className="viz-uptime-bars">
        {Array.from({ length: 40 }).map((_, i) => (
          <span key={i} className={bad.has(i) ? "is-bad" : warn.has(i) ? "is-warn" : undefined} style={{ "--i": i } as React.CSSProperties} />
        ))}
      </div>
      <div className="viz-uptime-legend" aria-hidden="true">
        <span>before RCA</span>
        <span className="viz-uptime-marker">monitoring shipped</span>
        <span>today</span>
      </div>
    </div>
  );
}

export default function WorkVisual({ kind }: { kind: CaseStudy["visual"] }) {
  return (
    <div className="work-visual">
      {kind === "runtime" && <Runtime />}
      {kind === "framework" && <Framework />}
      {kind === "scd2" && <Scd2 />}
      {kind === "uptime" && <Uptime />}
      <span className="work-visual-note">{kind === "runtime" ? "measured" : "illustrative"}</span>
    </div>
  );
}
