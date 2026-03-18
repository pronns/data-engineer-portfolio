# Pronnoy Dutta — Portfolio Website

A **"Data Engineer OS"** themed interactive portfolio for a Lead Data Engineer with 5.5+ years of experience. Built with Next.js 14 (App Router) and deployed on Vercel.

**Live site:** [pronns.vercel.app](https://pronns.vercel.app) &nbsp;|&nbsp; **GitHub:** [github.com/pronns](https://github.com/pronns)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | **Next.js 14** (App Router, TypeScript) |
| Styling | **CSS3** (custom properties, grid, flexbox) |
| 3D Engine | **Three.js** — data pipeline network background |
| Animations | **GSAP + ScrollTrigger** — scroll reveals, 3D tilt, XP bars |
| Smooth Scroll | **Lenis** |
| Audio | **Web Audio API** — hover/click/boot sound effects |
| Icons | **Font Awesome 6.5** (CDN) |
| Fonts | **Google Fonts** — JetBrains Mono, Space Grotesk, Inter |
| Deployment | **Vercel** |

---

## Theme — "Data Engineer OS"

Every UI element is reimagined through a data engineering / terminal lens:

| UI Element | Theme Metaphor |
|---|---|
| Navigation | VS Code-style editor tabs (about.py, git_log.sh, skills.yml…) |
| Hero | Terminal window with typed CLI commands |
| Experience | Git commit log with branch labels & commit dots |
| Skills | XP progress bars with level badges (Expert / Advanced / Intermediate) |
| Certifications | Achievement badges ("Achievement Unlocked") |
| Section headers | File path style (`src/about.py`, `logs/git_log.sh`) |
| Preloader | Terminal boot sequence (`system_boot.sh`) |

---

## Color Palette

```css
--bg:      #0a0e17   /* Deep dark background */
--green:   #00ff88   /* Matrix green — primary accent */
--blue:    #00aaff   /* Electric blue — secondary */
--amber:   #ffaa00   /* Amber — warnings / highlights */
--red:     #ff3355   /* Red — status indicators */
--purple:  #aa55ff   /* Purple — misc accents */
```

---

## Features

### Visual
- **Three.js WebGL background** — 60 animated nodes with connections, 80 flowing data packets, 30 amber accent particles, mouse parallax
- **Grid overlay** — subtle green grid across the entire background
- **Custom cursor** — dot + ring, switches to amber square on hover (desktop only)
- **3D card tilt** — perspective tilt on panels, skill cards, achievement badges
- **Vignette** — radial edge darkening overlay

### Animation
- **Terminal boot preloader** — typed system boot lines, enter button reveals on completion
- **Typed CLI text** — cycling terminal commands in hero (spark-submit, SQL, aws cli, airflow, kubectl)
- **GSAP scroll reveals** — all sections fade + slide in on scroll
- **XP bar fill** — skill progress bars animate when scrolled into view
- **Counter animation** — hero stat numbers count up on load
- **Section line expand** — decorative lines animate from left on scroll

### UX
- **Web Audio API sounds** — subtle synth sounds on hover and click
- **Lenis smooth scrolling** — buttery smooth page scroll
- **Mobile responsive** — hamburger menu, single-column layout on small screens
- **`prefers-reduced-motion`** support — all animations disabled for accessibility

---

## Sections

| Section | Description |
|---|---|
| **Hero** | Terminal window, name, typed commands, 4 stat widgets, CTA buttons |
| **About** | Bio panel + 4 highlight cards (Pipeline Architect, Perf Engineer, Cloud Native, Team Lead) |
| **Experience** | Git log timeline — Axtria (Project Lead) + Infosys (Systems Engineer) |
| **Skills** | 4 XP panels — Languages, Big Data, Cloud (AWS), Architecture & DevOps |
| **Projects** | 4 dashboard cards with status badges and impact metrics |
| **Education** | Degree + school + AWS Community Builder membership |
| **Achievements** | AWS Security Specialty, AWS Solutions Architect Associate, CCNA |
| **Contact** | Email, location, social links + contact form |

---

## Getting Started

```bash
git clone https://github.com/pronns/<repo-name>.git
cd <repo-name>
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deployment (Vercel)

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → Import the repo
3. Framework preset: **Next.js** (auto-detected)
4. Click **Deploy** — done

Every `git push` triggers an automatic redeploy.

---

## Browser Support

| Browser | Support |
|---|---|
| Chrome 90+ | Full |
| Firefox 88+ | Full |
| Safari 14+ | Full |
| Edge 90+ | Full |
| Mobile (iOS/Android) | Responsive (custom cursor hidden) |

> Three.js requires WebGL — supported by all modern browsers.

---

## Performance Notes

- Three.js connections rebuilt every 60 frames, not every frame
- `Math.min(devicePixelRatio, 2)` caps renderer pixel ratio
- Dynamic `import()` for Three.js, GSAP, and Lenis — avoids SSR issues
- All fonts loaded via Google Fonts with `preconnect` hints

---

*Built with a lot of data pipelines and too much caffeine.*
