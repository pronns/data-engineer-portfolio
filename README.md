# Pronnoy Dutta — Portfolio

Personal site for a Lead Data Engineer (AWS · Databricks · Spark). Built with Next.js 14 (App Router) and deployed on Vercel.

**Live:** [pronns.vercel.app](https://pronns.vercel.app)

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14, TypeScript, React Server Components |
| Styling | Plain CSS with design tokens, dark and light themes |
| Icons | [Simple Icons](https://simpleicons.org) (brands) + [Lucide](https://lucide.dev) (UI), tree-shaken |
| Fonts | Inter, Inter Tight, JetBrains Mono via `next/font` (self-hosted, no layout shift) |
| Motion | CSS + IntersectionObserver + SVG SMIL; no animation libraries |

## Structure

```
app/
  data.ts              ← all content (roles, metrics, case studies, stack, certs)
  page.tsx             ← page sections, server-rendered
  layout.tsx           ← metadata, JSON-LD, theme boot script
  globals.css          ← design tokens + all styles
  opengraph-image.tsx  ← generated social share card
  components/
    PipelineCard.tsx   ← animated medallion-architecture hero diagram
    TechIcon.tsx       ← tech registry: brand icons, AWS-style service tiles, concept glyphs
    WorkVisual.tsx     ← case-study mini visuals (runtime bars, SCD2 table, uptime strip)
    Nav.tsx            ← sticky header, scroll-spy, mobile menu, theme toggle
    StackFilter.tsx    ← filter tabs for the stack section
    Effects.tsx        ← reveal-on-scroll, count-up numbers, card spotlight
public/
  Pronnoy_Dutta_Resume.pdf
```

**To update content, edit `app/data.ts` only.** To add a technology, register it in `TechIcon.tsx` and reference its id.

## Quality notes

- Content is fully visible without JavaScript; motion is opt-in and disabled under `prefers-reduced-motion`.
- Skip link, visible focus rings, semantic landmarks, labelled icon buttons, `aria-pressed` filters.
- ~94 KB first-load JS. Everything except the nav, filters and effects is server-rendered.
- SEO: canonical URL, Open Graph/Twitter cards, `Person` JSON-LD, `robots.txt`, `sitemap.xml`.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```
