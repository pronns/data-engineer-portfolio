import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Blocks,
  BadgeCheck,
  Download,
  Gauge,
  GraduationCap,
  History,
  Mail,
  MapPin,
  Users,
} from "lucide-react";
import {
  certifications,
  community,
  education,
  experience,
  impact,
  ladder,
  principles,
  site,
  stack,
  work,
} from "./data";
import { StackRow, TechIcon, techLabel } from "./components/TechIcon";
import CopyEmail from "./components/CopyEmail";
import Effects from "./components/Effects";
import Nav from "./components/Nav";
import PipelineCard from "./components/PipelineCard";
import Social from "./components/Social";
import StackFilter from "./components/StackFilter";
import WorkVisual from "./components/WorkVisual";

const principleIcons = { blocks: Blocks, activity: Activity, history: History, gauge: Gauge, users: Users };

function SectionHead({ index, eyebrow, title, lead }: { index: string; eyebrow: string; title: string; lead?: string }) {
  return (
    <header className="section-head" data-reveal>
      <p className="eyebrow">
        <span className="eyebrow-index">{index}</span>
        {eyebrow}
      </p>
      <h2>{title}</h2>
      {lead && <p className="section-lead">{lead}</p>}
    </header>
  );
}

export default function Home() {
  const stackTotal = stack.reduce((n, g) => n + g.items.length, 0);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <Effects />

      <main id="main">
        {/* ============ HERO ============ */}
        <section id="top" className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="status-pill" data-reveal>
                <span className="live-dot" aria-hidden="true" />
                {site.availability}
              </p>
              <h1 data-reveal>
                Data platforms that hold up at <span className="hl">200M records a day.</span>
              </h1>
              <p className="hero-lead" data-reveal>
                I&apos;m <strong>Pronnoy Dutta</strong>, a Lead Data Engineer with 6+ years building cloud-native
                lakehouse platforms on <strong>AWS</strong> and <strong>Databricks</strong>. I own the architecture,
                lead the team, and ship pipelines that finish on time, cost less, and don&apos;t page anyone at 3 AM.
              </p>
              <div className="hero-actions" data-reveal>
                <a href="#contact" className="btn btn--primary">
                  Get in touch <ArrowRight size={16} aria-hidden="true" />
                </a>
                <a href={site.resume} target="_blank" rel="noopener" className="btn btn--ghost">
                  <Download size={16} aria-hidden="true" /> Resume
                </a>
                <Social className="hero-social" />
              </div>
              <ul className="hero-creds" data-reveal aria-label="Certifications">
                {certifications.slice(0, 3).map((c) => (
                  <li key={c.name}>
                    <TechIcon id={c.icon} size={22} />
                    <span>
                      {c.issuer === "Amazon Web Services" ? "AWS" : c.issuer} {c.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hero-visual" data-reveal>
              <PipelineCard />
            </div>
          </div>
        </section>

        {/* ============ IMPACT ============ */}
        <section className="impact" aria-label="Impact in numbers">
          <div className="container">
            <ul className="impact-grid">
              {impact.map((m, i) => (
                <li key={m.label} className="impact-item" data-reveal style={{ "--d": i } as React.CSSProperties}>
                  <span
                    className="impact-value"
                    data-count={m.value}
                    data-decimals={m.decimals ?? 0}
                    data-prefix={m.prefix ?? ""}
                    data-suffix={m.suffix ?? ""}
                  >
                    {m.prefix}
                    {m.value.toFixed(m.decimals ?? 0)}
                    {m.suffix}
                  </span>
                  <span className="impact-label">{m.label}</span>
                  <span className="impact-detail">{m.detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============ ABOUT ============ */}
        <section id="about" className="section">
          <div className="container">
            <SectionHead index="01" eyebrow="About" title="Architecture, delivery, and the team behind both." />
            <div className="about-grid">
              <div className="about-copy" data-reveal>
                <p>
                  I lead data engineering for a pharma commercial analytics platform at <strong>Axtria</strong> that
                  serves 50M patients. I own the whole system: the architecture on AWS, a team of four engineers, the
                  roadmap for 8+ data products, and the client conversation when something matters.
                </p>
                <p>
                  Before that I moved legacy Hive workloads onto Spark and designed the SCD Type-2 models that keep 3+
                  years of history auditable. At <strong>Infosys</strong> I built a retail warehouse that became the
                  executive team&apos;s single source of truth.
                </p>
                <dl className="now card">
                  <div>
                    <dt>Role</dt>
                    <dd>Project Lead, Axtria</dd>
                  </div>
                  <div>
                    <dt>Team</dt>
                    <dd>4 data engineers</dd>
                  </div>
                  <div>
                    <dt>Platform</dt>
                    <dd>50M patients · 99.9% SLA</dd>
                  </div>
                  <div>
                    <dt>Based in</dt>
                    <dd>{site.location} · open to remote</dd>
                  </div>
                </dl>
              </div>

              <div className="principles" data-reveal>
                <h3 className="subhead">How I work</h3>
                <ol>
                  {principles.map((p) => {
                    const Icon = principleIcons[p.icon];
                    return (
                      <li key={p.title} className="principle">
                        <span className="principle-icon" aria-hidden="true">
                          <Icon size={18} />
                        </span>
                        <div>
                          <h4>{p.title}</h4>
                          <p>{p.body}</p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* ============ EXPERIENCE ============ */}
        <section id="experience" className="section section--alt">
          <div className="container">
            <SectionHead
              index="02"
              eyebrow="Experience"
              title="Three promotions in three years."
              lead="Analyst to Project Lead at Axtria, after starting out in retail analytics at Infosys."
            />

            <ol className="ladder" data-reveal aria-label="Career progression at Axtria">
              {ladder.map((step, i) => (
                <li key={step.title} className={`ladder-step ${i === ladder.length - 1 ? "is-current" : ""}`} style={{ "--i": i } as React.CSSProperties}>
                  <span className="ladder-bar" aria-hidden="true" />
                  <span className="ladder-year">{step.year}</span>
                  <span className="ladder-title">{step.title}</span>
                </li>
              ))}
            </ol>

            <div className="timeline">
              {experience.map((co) => (
                <article key={co.name} className="company">
                  <header className="company-head" data-reveal>
                    <span className="company-mark" aria-hidden="true">
                      {co.monogram}
                    </span>
                    <div>
                      <h3>{co.name}</h3>
                      <p className="company-meta">
                        {co.domain} · {co.location}
                      </p>
                    </div>
                    <span className="company-period">{co.period}</span>
                  </header>

                  <ol className="roles">
                    {co.roles.map((r) => (
                      <li key={r.title} className={`role card ${r.current ? "is-current" : ""}`} data-reveal>
                        <span className="role-node" aria-hidden="true" />
                        <div className="role-head">
                          <h4>
                            {r.title}
                            {r.current && <span className="pill pill--ok">Current</span>}
                          </h4>
                          <span className="role-period">{r.period}</span>
                        </div>
                        {r.summary && <p className="role-summary">{r.summary}</p>}
                        <ul className="role-metrics">
                          {r.metrics.map((m) => (
                            <li key={m.label}>
                              <span className="rm-value">{m.value}</span>
                              <span className="rm-label">{m.label}</span>
                            </li>
                          ))}
                        </ul>
                        <ul className="role-bullets">
                          {r.bullets.map((b) => (
                            <li key={b}>{b}</li>
                          ))}
                        </ul>
                        <StackRow ids={r.stack} />
                      </li>
                    ))}
                  </ol>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ WORK ============ */}
        <section id="work" className="section">
          <div className="container">
            <SectionHead
              index="03"
              eyebrow="Selected work"
              title="Problems worth solving."
              lead="Four engagements: what was broken, what I changed, and what it was worth."
            />
            <div className="work-grid">
              {work.map((w) => (
                <article key={w.id} className="work card" data-reveal>
                  <WorkVisual kind={w.visual} />
                  <div className="work-body">
                    <p className="work-kicker">{w.kicker}</p>
                    <h3>{w.title}</h3>
                    <dl className="work-story">
                      <div>
                        <dt>Problem</dt>
                        <dd>{w.problem}</dd>
                      </div>
                      <div>
                        <dt>Approach</dt>
                        <dd>{w.approach}</dd>
                      </div>
                    </dl>
                    <div className="work-foot">
                      <ul className="work-outcome" aria-label="Outcome">
                        {w.outcome.map((o) => (
                          <li key={o.label}>
                            <span className="wo-value">{o.value}</span>
                            <span className="wo-label">{o.label}</span>
                          </li>
                        ))}
                      </ul>
                      <StackRow ids={w.stack} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ STACK ============ */}
        <section id="stack" className="section section--alt">
          <div className="container">
            <SectionHead
              index="04"
              eyebrow="Stack"
              title="The tools I build with."
              lead="Highlighted tiles are the ones I use every day."
            />
            <div data-reveal>
              <StackFilter groups={stack.map((g) => ({ id: g.id, label: g.label, count: g.items.length }))} total={stackTotal}>
                <div className="stack-groups">
                  {stack.map((g) => (
                    <section key={g.id} className="stack-group" data-group={g.id} aria-labelledby={`sg-${g.id}`}>
                      <h3 id={`sg-${g.id}`} className="stack-group-label">
                        {g.label}
                      </h3>
                      <ul className="stack-grid">
                        {g.items.map((t) => (
                          <li key={t.id} className={`stack-tile ${t.core ? "is-core" : ""}`}>
                            <TechIcon id={t.id} size={44} />
                            <span className="stack-name">{techLabel(t.id)}</span>
                            {t.core && <span className="sr-only">(daily driver)</span>}
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              </StackFilter>
            </div>
          </div>
        </section>

        {/* ============ CREDENTIALS ============ */}
        <section id="credentials" className="section">
          <div className="container">
            <SectionHead index="05" eyebrow="Credentials" title="Certified where it counts." />
            <div className="cred-grid">
              {certifications.map((c) => (
                <article key={c.name} className={`cert card ${c.featured ? "cert--featured" : ""}`} data-reveal>
                  <TechIcon id={c.icon} size={c.featured ? 56 : 44} />
                  <div>
                    <p className="cert-issuer">{c.issuer}</p>
                    <h3>{c.featured ? `Certified ${c.name}` : c.name}</h3>
                  </div>
                  <BadgeCheck className="cert-check" size={20} aria-label="Verified certification" />
                </article>
              ))}
              <article className="cert cert--wide card" data-reveal>
                <span className="tile tile--glyph" style={{ "--tile": "#38BDF8", width: 44, height: 44 } as React.CSSProperties} aria-hidden="true">
                  <GraduationCap size={24} />
                </span>
                <div>
                  <p className="cert-issuer">
                    {education.school} · {education.period}
                  </p>
                  <h3>{education.degree}</h3>
                </div>
              </article>
              <article className="cert card" data-reveal>
                <TechIcon id="aws" size={44} />
                <div>
                  <p className="cert-issuer">{community.detail}</p>
                  <h3>{community.name}</h3>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ============ CONTACT ============ */}
        <section id="contact" className="section">
          <div className="container">
            <div className="contact card" data-reveal>
              <p className="eyebrow">
                <span className="eyebrow-index">06</span>
                Contact
              </p>
              <h2>Building a data platform, or fixing one?</h2>
              <p className="section-lead">
                I&apos;m open to Lead and Senior Data Engineering roles, remote or in Gurugram, Bangalore, Hyderabad or
                Pune. Email is the fastest way to reach me.
              </p>
              <div className="contact-actions">
                <a href={`mailto:${site.email}`} className="btn btn--primary btn--lg">
                  <Mail size={18} aria-hidden="true" /> {site.email}
                </a>
                <CopyEmail email={site.email} />
                <a href={site.resume} target="_blank" rel="noopener" className="btn btn--ghost">
                  Resume <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
              <div className="contact-meta">
                <span>
                  <MapPin size={16} aria-hidden="true" /> {site.location}
                </span>
                <Social />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <p>
            © {new Date().getFullYear()} {site.name}. Designed and built by me.
          </p>
          <p className="footer-status">
            <span className="live-dot" aria-hidden="true" /> All pipelines green
          </p>
        </div>
      </footer>
    </>
  );
}
