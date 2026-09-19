"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

const RUN_LOG = [
  { t: "06:00:04", stage: "ingest", msg: "10+ sources landed · ~200M rows" },
  { t: "06:38:51", stage: "bronze→silver", msg: "DQ gates passed · nulls · RI · counts" },
  { t: "07:21:16", stage: "silver", msg: "SCD2 merge committed" },
  { t: "08:02:37", stage: "gold", msg: "Star schema refreshed · 8+ data products" },
  { t: "08:05:10", stage: "serve", msg: "Published to Redshift · SLA met" },
];

const SOURCES = [
  { y: 67, name: "rx_claims", fmt: "parquet" },
  { y: 175, name: "crm_events", fmt: "json" },
  { y: 283, name: "sales_ops", fmt: "csv · orc" },
];

const SERVE = [
  { y: 67, name: "Redshift", sub: "warehouse" },
  { y: 175, name: "Dashboards", sub: "BI · 30+" },
  { y: 283, name: "Products", sub: "10+ users" },
];

const LAYERS = [
  { x: 312, name: "Bronze", sub: "raw", cls: "bronze" },
  { x: 400, name: "Silver", sub: "cleaned", cls: "silver" },
  { x: 488, name: "Gold", sub: "modeled", cls: "gold" },
];

function Packets({ href, count, dur, cls, delay = 0 }: { href: string; count: number; dur: number; cls: string; delay?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <circle key={i} r="3.2" className={`pl-packet ${cls}`}>
          <animateMotion dur={`${dur}s`} begin={`-${delay + (i * dur) / count}s`} repeatCount="indefinite" rotate="auto">
            <mpath href={href} />
          </animateMotion>
        </circle>
      ))}
    </>
  );
}

export default function PipelineCard() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [line, setLine] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      svgRef.current?.pauseAnimations();
      return;
    }
    const id = window.setInterval(() => setLine((l) => (l + 1) % RUN_LOG.length), 2600);
    return () => window.clearInterval(id);
  }, []);

  const log = RUN_LOG[line];

  return (
    <figure className="pipeline card" aria-label="Diagram of a medallion lakehouse pipeline: source systems are ingested into Bronze, cleaned into Silver, modeled into Gold and served to Redshift, BI dashboards and data products.">
      <div className="pipeline-head">
        <span className="pipeline-title">
          <span className="live-dot" aria-hidden="true" />
          pharma_commercial_daily
        </span>
        <span className="pipeline-badges">
          <span className="pill pill--ok">Healthy</span>
          <span className="pill">SLA 99.9%</span>
        </span>
      </div>

      <svg ref={svgRef} className="pipeline-svg" viewBox="0 0 720 400" role="presentation">
        <defs>
          <path id="pl-s0" d="M140 92 C158 92 158 200 176 200" />
          <path id="pl-s1" d="M140 200 L176 200" />
          <path id="pl-s2" d="M140 308 C158 308 158 200 176 200" />
          <path id="pl-spine" d="M280 200 L604 200" />
          <path id="pl-o0" d="M568 200 C586 200 586 92 604 92" />
          <path id="pl-o1" d="M568 200 L604 200" />
          <path id="pl-o2" d="M568 200 C586 200 586 308 604 308" />
          <linearGradient id="pl-spine-grad" x1="0" x2="1">
            <stop offset="0" stopColor="var(--bronze)" />
            <stop offset="0.5" stopColor="var(--silver)" />
            <stop offset="1" stopColor="var(--gold)" />
          </linearGradient>
        </defs>

        {/* Lakehouse boundary */}
        <rect x="298" y="52" width="284" height="296" rx="16" className="pl-lake" />
        <text x="440" y="84" textAnchor="middle" className="pl-caption">delta lake · medallion</text>

        {/* Wires */}
        {["#pl-s0", "#pl-s1", "#pl-s2", "#pl-o0", "#pl-o1", "#pl-o2"].map((h) => (
          <use key={h} href={h} className="pl-wire" />
        ))}
        <use href="#pl-spine" className="pl-wire pl-wire--spine" stroke="url(#pl-spine-grad)" />

        {/* Packets — drawn before nodes so they pass "through" the layers */}
        <Packets href="#pl-s0" count={2} dur={2.2} cls="p-src" />
        <Packets href="#pl-s1" count={2} dur={1.6} cls="p-src" delay={0.4} />
        <Packets href="#pl-s2" count={2} dur={2.2} cls="p-src" delay={0.9} />
        <Packets href="#pl-spine" count={4} dur={4.8} cls="p-spine" />
        <Packets href="#pl-o0" count={1} dur={1.8} cls="p-out" />
        <Packets href="#pl-o1" count={1} dur={1.4} cls="p-out" delay={0.5} />
        <Packets href="#pl-o2" count={1} dur={1.8} cls="p-out" delay={1} />

        {/* Sources */}
        <text x="16" y="52" className="pl-caption">sources</text>
        {SOURCES.map((s) => (
          <g key={s.name}>
            <rect x="16" y={s.y} width="124" height="50" rx="10" className="pl-node" />
            <text x="30" y={s.y + 22} className="pl-name">{s.name}</text>
            <text x="30" y={s.y + 39} className="pl-sub">{s.fmt}</text>
          </g>
        ))}

        {/* Ingestion */}
        <rect x="176" y="154" width="104" height="92" rx="12" className="pl-node pl-node--accent" />
        <text x="228" y="189" textAnchor="middle" className="pl-name">Ingestion</text>
        <text x="228" y="207" textAnchor="middle" className="pl-sub">framework</text>
        <text x="228" y="229" textAnchor="middle" className="pl-sub pl-sub--accent">Glue · Spark</text>

        {/* Medallion layers */}
        {LAYERS.map((l) => (
          <g key={l.name}>
            <rect x={l.x} y="146" width="80" height="108" rx="12" className={`pl-layer pl-layer--${l.cls}`} />
            <circle cx={l.x + 16} cy="166" r="4" className={`pl-layer-dot pl-layer-dot--${l.cls}`} />
            <text x={l.x + 40} y="202" textAnchor="middle" className="pl-name">{l.name}</text>
            <text x={l.x + 40} y="222" textAnchor="middle" className="pl-sub">{l.sub}</text>
          </g>
        ))}

        {/* Quality gates */}
        <g className="pl-gates">
          {["schema", "nulls", "RI", "counts"].map((g, i) => (
            <g key={g} transform={`translate(${312 + i * 66} 282)`}>
              <rect width="60" height="26" rx="13" className="pl-gate" />
              <text x="30" y="17" textAnchor="middle" className="pl-gate-text">✓ {g}</text>
            </g>
          ))}
        </g>
        <text x="440" y="330" textAnchor="middle" className="pl-caption">data quality gates</text>

        {/* Serving */}
        <text x="604" y="52" className="pl-caption">serve</text>
        {SERVE.map((s) => (
          <g key={s.name}>
            <rect x="604" y={s.y} width="108" height="50" rx="10" className="pl-node" />
            <text x="616" y={s.y + 22} className="pl-name">{s.name}</text>
            <text x="616" y={s.y + 39} className="pl-sub">{s.sub}</text>
          </g>
        ))}
      </svg>

      {/* Compact vertical flow for small screens */}
      <ol className="pipeline-mobile" aria-hidden="true">
        {[
          ["Sources", "10+ systems", "src"],
          ["Ingest", "Glue · Spark", "accent"],
          ["Bronze", "as landed", "bronze"],
          ["Silver", "clean · SCD2", "silver"],
          ["Gold", "star schema", "gold"],
          ["Serve", "Redshift · BI", "src"],
        ].map(([name, sub, tone]) => (
          <li key={name} className={`pm-step pm-step--${tone}`}>
            <span className="pm-dot" />
            <span className="pm-name">{name}</span>
            <span className="pm-sub">{sub}</span>
          </li>
        ))}
      </ol>

      <figcaption className="pipeline-log" aria-live="off">
        <span className="log-time">{log.t}</span>
        <span className="log-stage">{log.stage}</span>
        <span className="log-msg" key={line}>
          <Check size={14} strokeWidth={2.5} aria-hidden="true" /> {log.msg}
        </span>
      </figcaption>
    </figure>
  );
}
