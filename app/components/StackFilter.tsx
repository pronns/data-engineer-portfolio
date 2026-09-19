"use client";

import { useState, type ReactNode } from "react";

type Group = { id: string; label: string; count: number };

/**
 * Filter tabs for the stack grid. The grid itself is server-rendered and
 * passed in as children; filtering just toggles a data attribute that CSS
 * uses to dim non-matching tiles.
 */
export default function StackFilter({ groups, total, children }: { groups: Group[]; total: number; children: ReactNode }) {
  const [active, setActive] = useState("all");
  const tabs = [{ id: "all", label: "All", count: total }, ...groups];

  return (
    <div className="stack" data-filter={active}>
      <div className="stack-tabs" role="toolbar" aria-label="Filter stack by area">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            className="stack-tab"
            aria-pressed={active === t.id}
            onClick={() => setActive(t.id)}
          >
            {t.label}
            <span className="stack-tab-count">{t.count}</span>
          </button>
        ))}
      </div>
      {children}
    </div>
  );
}
