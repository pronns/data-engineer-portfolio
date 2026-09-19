"use client";

import { useEffect } from "react";

/**
 * Page-wide progressive enhancements. Content is fully visible without JS;
 * this only adds motion when the visitor hasn't asked to reduce it.
 *  - [data-reveal]  fades/slides in when scrolled into view
 *  - [data-count]   counts up to its value when visible
 *  - .card          pointer-following spotlight (sets --mx / --my)
 */
export default function Effects() {
  useEffect(() => {
    // The boot script in layout.tsx adds .motion unless reduced motion is requested
    if (!document.documentElement.classList.contains("motion")) return;

    // Reveal on scroll
    const revealer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            revealer.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => revealer.observe(el));

    // Count-up numbers
    const format = (el: HTMLElement, v: number) => {
      const d = Number(el.dataset.decimals || 0);
      el.textContent = `${el.dataset.prefix || ""}${v.toFixed(d)}${el.dataset.suffix || ""}`;
    };
    const counter = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          counter.unobserve(el);
          const to = Number(el.dataset.count);
          const start = performance.now();
          const dur = 1400;
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / dur);
            format(el, to * (1 - Math.pow(1 - p, 4)));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.6 }
    );
    document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
      format(el, 0);
      counter.observe(el);
    });

    // Card spotlight
    const onMove = (e: PointerEvent) => {
      const card = (e.target as HTMLElement).closest?.(".card") as HTMLElement | null;
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (fine) document.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      revealer.disconnect();
      counter.disconnect();
      document.removeEventListener("pointermove", onMove);
    };
  }, []);

  return null;
}
