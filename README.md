# Pronnoy Dutta — Portfolio Website

A professional, interactive portfolio website for a **Senior Data Engineer** with 5.5+ years of experience.

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Structure | **HTML5** | Semantic, no framework overhead |
| Styling | **CSS3** (custom properties, grid, flexbox) | Full control, no dependency |
| 3D Engine | **Three.js r128** (CDN) | Particle network background |
| Animations | **Vanilla JS** | Typed effect, counters, scroll reveal, 3D tilt |
| Icons | **Font Awesome 6** (CDN) | Comprehensive icon set |
| Fonts | **Google Fonts** — Inter + Fira Code | Professional + code aesthetic |

> **Zero build step.** Open `index.html` in any browser — it just works.

---

## Features & Effects

### Visual Effects
- **Three.js 3D Particle Network** — animated data-graph in the hero background with mouse parallax
- **3D Card Tilt** — perspective tilt on project & skill cards following mouse position
- **Cursor Glow** — large radial gradient follows the cursor across the page
- **Rotating Avatar Rings** — three concentric animated rings around the initials avatar
- **Floating Badges** — animated floating info badges beside the avatar

### Animation
- **Typed.js Effect** — hand-coded cycling text: "Senior Data Engineer → Pipeline Architect → ..."
- **Scroll Reveal** — elements fade+slide in from bottom/left/right as they enter the viewport
- **Timeline Reveal** — experience items slide in from left on scroll
- **Counter Animation** — hero stats (5.5+, 50+, 30+) count up on load
- **Gradient Top Bar** — skill cards reveal a gradient accent bar on hover

### UX
- **Sticky Glassmorphism Nav** — blurred, border-bottom nav with active scroll state
- **Active Link Underline** — animated underline on nav hover
- **Custom Scrollbar** — thin cyan scrollbar matching the theme
- **Smooth Scroll** — CSS smooth scrolling between sections
- **Contact Form** — client-side with animated success state
- **Fully Responsive** — mobile-first grid collapses gracefully

---

## Color Theme

```css
--bg:      #0a0a1a   /* Deep navy background */
--primary: #00d4ff   /* Cyan — primary accent */
--accent:  #7b2fff   /* Purple — secondary accent */
--text:    #e2e8f0   /* Soft white text */
--muted:   #64748b   /* Muted grey for secondary text */
```

---

## Sections

| Section | Description |
|---|---|
| **Hero** | Full-screen with Three.js background, name, typing subtitle, CTA buttons, animated stats |
| **About** | Bio, specialisations, floating avatar with badges |
| **Skills** | 6 tech-stack cards (Languages, Big Data, Cloud, Databases, Orchestration, DevOps) |
| **Experience** | Animated vertical timeline — 3 roles across 5.5 years |
| **Projects** | 4 featured project cards with 3D tilt, impact metrics, and tech stacks |
| **Contact** | Split layout — contact links + message form |

---

## Getting Started

```bash
# Clone or download this repo
git clone https://github.com/pronnoydutta/portfolio.git
cd portfolio

# Open directly in browser (no server needed)
open index.html           # macOS
start index.html          # Windows
xdg-open index.html       # Linux

# Or serve with any static server
npx serve .
python -m http.server 8000
```

---

## Customising

All content is in a single `index.html` file. Find and replace:

### Personal Info
| Placeholder | Replace With |
|---|---|
| `Pronnoy Dutta` | Your full name |
| `pronnoy.dutta@example.com` | Your email |
| `linkedin.com/in/pronnoy-dutta` | Your LinkedIn URL |
| `github.com/pronnoydutta` | Your GitHub URL |

### Stats (Hero)
Find `data-target` attributes in the `.hero-stats` section:
```html
<span class="h-stat-num" data-target="5.5" data-decimal="true">0</span>
```

### Experience
Update the `.tl-item` blocks in the `#experience` section with your actual companies, roles, dates, and descriptions.

### Projects
Update the `.proj-card` blocks in the `#projects` section with your real projects and impact metrics.

### Theme Colors
Edit the `:root` CSS variables at the top of the `<style>` block:
```css
:root {
  --primary: #00d4ff;  /* Change to any color */
  --accent:  #7b2fff;
}
```

---

## Browser Support

| Browser | Support |
|---|---|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 90+ | ✅ Full |
| Mobile (iOS/Android) | ✅ Responsive |

> Three.js requires WebGL. All modern browsers support it.

---

## Performance Notes

- Three.js lines are rebuilt every 3rd frame (not every frame) to keep CPU usage low
- `Math.min(devicePixelRatio, 2)` caps the renderer pixel ratio
- Scroll observer uses `IntersectionObserver` — no scroll event listeners
- All CDN resources are loaded from fast global CDNs (Cloudflare, Google)

---

## Deployment

Deploy as a static site to any of these — **free tier available**:

| Platform | Command / Steps |
|---|---|
| **GitHub Pages** | Push to `gh-pages` branch or enable in repo Settings |
| **Netlify** | Drag & drop the `portfolio/` folder to netlify.com |
| **Vercel** | `npx vercel` in the folder |
| **Cloudflare Pages** | Connect GitHub repo |

---

## License

MIT — feel free to use, modify, and share.

---

*Built with ❤️ and a lot of data pipelines.*
