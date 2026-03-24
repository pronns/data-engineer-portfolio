"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Dynamically import Three.js, GSAP, and Lenis to avoid SSR issues
    Promise.all([
      import("three"),
      import("gsap"),
      import("gsap/ScrollTrigger"),
      import("lenis"),
    ]).then(([THREE, { gsap }, { ScrollTrigger }, { default: Lenis }]) => {
      gsap.registerPlugin(ScrollTrigger);

      /* ================================================================
         AUDIO ENGINE
         ================================================================ */
      class AudioEngine {
        ctx: AudioContext;
        master: GainNode;
        constructor() {
          this.ctx = new (window.AudioContext ||
            (window as any).webkitAudioContext)();
          this.master = this.ctx.createGain();
          this.master.gain.value = 0.1;
          this.master.connect(this.ctx.destination);
        }
        _synth(type: OscillatorType, f1: number, f2: number, dur: number) {
          if (this.ctx.state === "suspended") return;
          const o = this.ctx.createOscillator(),
            g = this.ctx.createGain();
          o.connect(g);
          g.connect(this.master);
          o.type = type;
          o.frequency.setValueAtTime(f1, this.ctx.currentTime);
          o.frequency.exponentialRampToValueAtTime(
            f2,
            this.ctx.currentTime + dur * 0.5
          );
          g.gain.setValueAtTime(0, this.ctx.currentTime);
          g.gain.linearRampToValueAtTime(0.4, this.ctx.currentTime + 0.01);
          g.gain.exponentialRampToValueAtTime(
            0.01,
            this.ctx.currentTime + dur
          );
          o.start();
          o.stop(this.ctx.currentTime + dur);
        }
        hover() {
          this._synth("sine", 600, 900, 0.06);
        }
        click() {
          this._synth("square", 120, 50, 0.12);
        }
        boot() {
          if (this.ctx.state === "suspended") this.ctx.resume();
          this._synth("sawtooth", 80, 500, 1);
        }
      }
      let audio: AudioEngine | null = null;

      /* ================================================================
         THREE.JS — Data Pipeline Network
         ================================================================ */
      const cvs = document.getElementById(
        "pipeline-canvas"
      ) as HTMLCanvasElement;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        500
      );
      camera.position.z = 50;
      const renderer = new THREE.WebGLRenderer({
        canvas: cvs,
        alpha: true,
        antialias: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Generate nodes
      const nodeCount = 60;
      const nodes: { x: number; y: number; z: number; vx: number; vy: number }[] = [];
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: (Math.random() - 0.5) * 120,
          y: (Math.random() - 0.5) * 80,
          z: (Math.random() - 0.5) * 40 - 10,
          vx: (Math.random() - 0.5) * 0.02,
          vy: (Math.random() - 0.5) * 0.02,
        });
      }

      // Node points
      const nodeGeo = new THREE.BufferGeometry();
      const nodePos = new Float32Array(nodeCount * 3);
      for (let i = 0; i < nodeCount; i++) {
        nodePos[i * 3] = nodes[i].x;
        nodePos[i * 3 + 1] = nodes[i].y;
        nodePos[i * 3 + 2] = nodes[i].z;
      }
      nodeGeo.setAttribute(
        "position",
        new THREE.BufferAttribute(nodePos, 3)
      );
      const nodeMat = new THREE.PointsMaterial({
        size: 2.5,
        color: 0x00ff88,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
      });
      scene.add(new THREE.Points(nodeGeo, nodeMat));

      // Connection lines
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x00ff88,
        transparent: true,
        opacity: 0.08,
        blending: THREE.AdditiveBlending,
      });
      const connections: any[] = [];
      const connectionDist = 25;

      function buildConnections() {
        connections.forEach((c) => scene.remove(c));
        connections.length = 0;
        for (let i = 0; i < nodeCount; i++) {
          for (let j = i + 1; j < nodeCount; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const dz = nodes[i].z - nodes[j].z;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (dist < connectionDist) {
              const geo = new THREE.BufferGeometry();
              const positions = new Float32Array(6);
              positions[0] = nodes[i].x;
              positions[1] = nodes[i].y;
              positions[2] = nodes[i].z;
              positions[3] = nodes[j].x;
              positions[4] = nodes[j].y;
              positions[5] = nodes[j].z;
              geo.setAttribute(
                "position",
                new THREE.BufferAttribute(positions, 3)
              );
              const line = new THREE.Line(geo, lineMat);
              scene.add(line);
              connections.push(line);
            }
          }
        }
      }
      buildConnections();

      // Data packets
      const packetCount = 80;
      const packetGeo = new THREE.BufferGeometry();
      const packetPos = new Float32Array(packetCount * 3);
      for (let i = 0; i < packetCount * 3; i++)
        packetPos[i] = (Math.random() - 0.5) * 100;
      packetGeo.setAttribute(
        "position",
        new THREE.BufferAttribute(packetPos, 3)
      );
      const packetMat = new THREE.PointsMaterial({
        size: 1.5,
        color: 0x00aaff,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
      });
      const packets = new THREE.Points(packetGeo, packetMat);
      scene.add(packets);

      // Amber accent particles
      const amberCount = 30;
      const amberGeo = new THREE.BufferGeometry();
      const amberPos = new Float32Array(amberCount * 3);
      for (let i = 0; i < amberCount * 3; i++)
        amberPos[i] = (Math.random() - 0.5) * 90;
      amberGeo.setAttribute(
        "position",
        new THREE.BufferAttribute(amberPos, 3)
      );
      const amberMat = new THREE.PointsMaterial({
        size: 1,
        color: 0xffaa00,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
      });
      scene.add(new THREE.Points(amberGeo, amberMat));

      let mx = 0,
        my = 0;
      document.addEventListener("mousemove", (e) => {
        mx = (e.clientX / window.innerWidth - 0.5) * 0.3;
        my = (e.clientY / window.innerHeight - 0.5) * 0.3;
      });

      let frame = 0;
      let animId: number;
      function renderGL() {
        frame++;
        for (let i = 0; i < nodeCount; i++) {
          nodes[i].x += nodes[i].vx;
          nodes[i].y += nodes[i].vy;
          if (Math.abs(nodes[i].x) > 60) nodes[i].vx *= -1;
          if (Math.abs(nodes[i].y) > 40) nodes[i].vy *= -1;
          nodePos[i * 3] = nodes[i].x;
          nodePos[i * 3 + 1] = nodes[i].y;
        }
        nodeGeo.attributes.position.needsUpdate = true;

        if (frame % 60 === 0) buildConnections();

        const pp = packetGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < packetCount; i++) {
          pp[i * 3] += Math.sin(frame * 0.01 + i) * 0.05;
          pp[i * 3 + 1] += Math.cos(frame * 0.008 + i * 0.5) * 0.03;
          if (pp[i * 3] > 60) pp[i * 3] = -60;
          if (pp[i * 3] < -60) pp[i * 3] = 60;
        }
        packetGeo.attributes.position.needsUpdate = true;

        camera.position.x += (mx * 5 - camera.position.x) * 0.02;
        camera.position.y += (-my * 5 - camera.position.y) * 0.02;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
        animId = requestAnimationFrame(renderGL);
      }
      renderGL();

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", handleResize);

      /* ================================================================
         CUSTOM CURSOR
         ================================================================ */
      const dot = document.getElementById("cursor-dot") as HTMLElement;
      const ring = document.getElementById("cursor-ring") as HTMLElement;
      let cx = 0,
        cy = 0,
        rx = 0,
        ry = 0;

      if (matchMedia("(pointer: fine)").matches) {
        document.addEventListener("mousemove", (e) => {
          cx = e.clientX;
          cy = e.clientY;
          dot.style.left = cx + "px";
          dot.style.top = cy + "px";
        });
        gsap.ticker.add(() => {
          rx += (cx - rx) * 0.15;
          ry += (cy - ry) * 0.15;
          ring.style.left = rx + "px";
          ring.style.top = ry + "px";
        });
        document
          .querySelectorAll(".interactive, a, button, input, textarea")
          .forEach((el) => {
            el.addEventListener("mouseenter", () => {
              document.body.classList.add("hover-state");
              if (audio) audio.hover();
            });
            el.addEventListener("mouseleave", () =>
              document.body.classList.remove("hover-state")
            );
            el.addEventListener("click", () => {
              if (audio) audio.click();
            });
          });
      }

      /* ================================================================
         TERMINAL BOOT SEQUENCE
         ================================================================ */
      const bootLines = document.querySelectorAll("#boot-body .line");
      const enterBtn = document.getElementById("enter-btn") as HTMLElement;

      function runBootSequence() {
        bootLines.forEach((line, i) => {
          gsap.to(line, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            delay: i * 0.35,
            ease: "power2.out",
          });
        });
        setTimeout(
          () => enterBtn.classList.add("show"),
          bootLines.length * 350 + 300
        );
      }
      setTimeout(runBootSequence, 400);

      /* ================================================================
         TYPED TEXT
         ================================================================ */
      const phrases = [
        "spark-submit --deploy-mode cluster pipeline.py",
        "SELECT * FROM data_engineering WHERE passion = true",
        "aws s3 sync s3://data-lake ./warehouse",
        "airflow dags trigger etl_master_dag",
        "kubectl apply -f spark-cluster.yaml",
      ];
      const typedEl = document.getElementById("typed-text") as HTMLElement;
      let pIdx = 0,
        cIdx = 0,
        deleting = false;
      let typeTimer: ReturnType<typeof setTimeout>;

      function typeLoop() {
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
          typedEl.textContent = phrases[pIdx];
          return;
        }
        const current = phrases[pIdx];
        if (deleting) {
          typedEl.textContent = current.substring(0, cIdx--);
        } else {
          typedEl.textContent = current.substring(0, cIdx++);
        }
        let delay = deleting ? 20 : 45;
        if (!deleting && cIdx > current.length) {
          delay = 2200;
          deleting = true;
        } else if (deleting && cIdx < 0) {
          deleting = false;
          pIdx = (pIdx + 1) % phrases.length;
          delay = 300;
        }
        typeTimer = setTimeout(typeLoop, delay);
      }

      /* ================================================================
         COUNTER ANIMATION
         ================================================================ */
      function animateCounters() {
        document.querySelectorAll(".stat-val").forEach((el) => {
          const htmlEl = el as HTMLElement;
          const target = parseFloat(htmlEl.dataset.target || "0");
          const isDecimal = htmlEl.dataset.decimal === "true";
          const suffix = isDecimal
            ? "+"
            : target >= 100
            ? "M+"
            : "+";
          gsap.to(
            { v: 0 },
            {
              v: target,
              duration: 2,
              ease: "power2.out",
              onUpdate: function () {
                const v = (this as any).targets()[0].v;
                htmlEl.textContent =
                  (isDecimal ? v.toFixed(1) : Math.round(v)) + suffix;
              },
            }
          );
        });
      }

      /* ================================================================
         XP BAR ANIMATION
         ================================================================ */
      function animateXPBars() {
        document.querySelectorAll(".xp-fill").forEach((bar) => {
          const htmlBar = bar as HTMLElement;
          const w = htmlBar.dataset.width;
          gsap.to(htmlBar, {
            width: w + "%",
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: { trigger: htmlBar, start: "top 90%" },
          });
        });
      }

      /* ================================================================
         MOBILE MENU
         ================================================================ */
      const menuToggle = document.getElementById(
        "menu-toggle"
      ) as HTMLElement;
      const navTabs = document.getElementById("nav-tabs") as HTMLElement;
      menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("active");
        navTabs.classList.toggle("open");
      });
      navTabs.querySelectorAll("a").forEach((a) => {
        a.addEventListener("click", () => {
          menuToggle.classList.remove("active");
          navTabs.classList.remove("open");
        });
      });

      /* ================================================================
         LENIS SMOOTH SCROLL
         ================================================================ */
      const lenis = new Lenis({
        duration: 1.3,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.8,
      } as any);
      lenis.stop();

      function raf(t: number) {
        lenis.raf(t);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((t: number) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);

      /* ================================================================
         ENTER SYSTEM
         ================================================================ */
      let dismissed = false;
      function dismissPreloader() {
        if (dismissed) return;
        dismissed = true;
        gsap.to("#preloader", {
          duration: 0.6,
          opacity: 0,
          ease: "power2.in",
          onComplete: () => {
            const preloader = document.getElementById(
              "preloader"
            ) as HTMLElement;
            preloader.style.display = "none";
            document.body.style.overflowY = "auto";
            lenis.start();
            initAnimations();
            typeLoop();
            animateCounters();
          },
        });
      }

      enterBtn.addEventListener("click", () => {
        audio = new AudioEngine();
        audio.boot();
        dismissPreloader();
      });

      // Auto-dismiss 1.5s after boot sequence finishes
      const bootDuration = bootLines.length * 350 + 300;
      setTimeout(dismissPreloader, bootDuration + 1500);

      /* ================================================================
         SCROLL ANIMATIONS
         ================================================================ */
      function initAnimations() {
        gsap.utils.toArray(".gs-reveal").forEach((el: any) => {
          gsap.to(el, {
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
          });
        });

        gsap.utils.toArray(".section-line").forEach((line: any) => {
          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scrollTrigger: { trigger: line, start: "top 92%" },
              scaleX: 1,
              transformOrigin: "left",
              duration: 1,
              ease: "power3.inOut",
            }
          );
        });

        document
          .querySelectorAll(".panel, .about-card, .stat-widget, .achievement")
          .forEach((card) => {
            card.addEventListener("mousemove", (e: Event) => {
              const mouseE = e as MouseEvent;
              const r = (card as HTMLElement).getBoundingClientRect();
              const x =
                ((mouseE.clientX - r.left) / r.width - 0.5) * 8;
              const y =
                ((mouseE.clientY - r.top) / r.height - 0.5) * -8;
              gsap.to(card, {
                duration: 0.3,
                rotateX: y,
                rotateY: x,
                ease: "power2.out",
                transformPerspective: 800,
              });
            });
            card.addEventListener("mouseleave", () => {
              gsap.to(card, {
                duration: 0.4,
                rotateX: 0,
                rotateY: 0,
                ease: "power2.out",
              });
            });
          });

        animateXPBars();

        gsap.utils.toArray(".commit-dot").forEach((dot: any) => {
          gsap.fromTo(
            dot,
            { scale: 0 },
            {
              scrollTrigger: { trigger: dot, start: "top 85%" },
              scale: 1,
              duration: 0.5,
              ease: "back.out(2)",
            }
          );
        });
      }

      // Cleanup on unmount
      return () => {
        cancelAnimationFrame(animId);
        clearTimeout(typeTimer);
        window.removeEventListener("resize", handleResize);
        renderer.dispose();
        lenis.destroy();
        ScrollTrigger.getAll().forEach((t: any) => t.kill());
      };
    });
  }, []);

  return (
    <>
      {/* Cursor */}
      <div id="cursor-dot"></div>
      <div id="cursor-ring"></div>

      {/* Background */}
      <canvas id="pipeline-canvas"></canvas>
      <div className="grid-overlay"></div>
      <div className="vignette"></div>

      {/* ============ PRELOADER — Terminal Boot ============ */}
      <div id="preloader">
        <div className="boot-terminal">
          <div className="boot-titlebar">
            <div className="boot-dot r"></div>
            <div className="boot-dot y"></div>
            <div className="boot-dot g"></div>
            <span>system_boot.sh</span>
          </div>
          <div className="boot-body" id="boot-body">
            <div className="line dim">
              $ initializing data_engineer_os v2.6...
            </div>
            <div className="line">
              [<span className="ok">OK</span>] Loading core modules
            </div>
            <div className="line">
              [<span className="ok">OK</span>] Spark runtime connected
            </div>
            <div className="line">
              [<span className="ok">OK</span>] AWS services authenticated
            </div>
            <div className="line">
              [<span className="info">INFO</span>] Pipeline orchestrator ready
            </div>
            <div className="line">
              [<span className="ok">OK</span>] Data models validated
            </div>
            <div className="line">
              [<span className="warn">WARN</span>] Visitor detected &mdash;
              requesting access
            </div>
            <div className="line dim">$ system ready. awaiting input_</div>
          </div>
          <button className="enter-btn interactive" id="enter-btn">
            $ ./enter_system.sh
          </button>
        </div>
      </div>

      {/* ============ NAVIGATION — Editor Tabs ============ */}
      <nav>
        <div className="nav-inner">
          <a
            className="nav-logo interactive"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <i className="fas fa-terminal"></i> pronnoy_dutta
          </a>
          <div className="nav-tabs" id="nav-tabs">
            <a href="#about" className="interactive">
              <span className="tab-icon py">
                <i className="fab fa-python"></i>
              </span>{" "}
              about.py
            </a>
            <a href="#experience" className="interactive">
              <span className="tab-icon sh">
                <i className="fas fa-code-branch"></i>
              </span>{" "}
              git_log.sh
            </a>
            <a href="#skills" className="interactive">
              <span className="tab-icon yml">
                <i className="fas fa-cogs"></i>
              </span>{" "}
              skills.yml
            </a>
            <a href="#projects" className="interactive">
              <span className="tab-icon sql">
                <i className="fas fa-database"></i>
              </span>{" "}
              projects.sql
            </a>
            <a href="#education" className="interactive">
              <span className="tab-icon json">
                <i className="fas fa-trophy"></i>
              </span>{" "}
              certs.json
            </a>
            <a href="#contact" className="interactive">
              <span className="tab-icon md">
                <i className="fas fa-paper-plane"></i>
              </span>{" "}
              contact.md
            </a>
          </div>
          <button
            className="menu-toggle interactive"
            id="menu-toggle"
            aria-label="Toggle menu"
          >
            <span className="bar"></span>
          </button>
        </div>
      </nav>

      {/* ============ MAIN ============ */}
      <main>
        {/* ====== HERO ====== */}
        <section id="hero">
          <div className="container">
            <div className="hero-terminal gs-reveal">
              <div className="hero-bar">
                <div className="dots">
                  <div className="dot r"></div>
                  <div className="dot y"></div>
                  <div className="dot g"></div>
                </div>
                <span className="hb-title">pronnoy@data-eng:~</span>
                <span className="hb-right">zsh &bull; main</span>
              </div>
              <div className="hero-content">
                <div className="hero-comment">
                  {`// Lead Data Engineer | System Architect | Cloud Platform Builder`}
                </div>
                <h1 className="hero-name">
                  Pronnoy <span className="accent">Dutta</span>
                </h1>

                <div className="hero-typed">
                  <span className="prompt">&#10095;</span>
                  <span className="path">~/pipeline</span>
                  <span id="typed-text"></span>
                  <span className="typed-cursor"></span>
                </div>

                <p className="hero-desc">
                  <strong>5.5+ years</strong> designing, building, and
                  operating large-scale distributed data pipelines and
                  cloud-native platforms. Specialized in{" "}
                  <strong>Spark optimization</strong>, data modeling, and
                  end-to-end platform ownership on <strong>AWS</strong>.
                </p>

                <div className="hero-actions">
                  <a href="#experience" className="btn-green interactive">
                    <i className="fas fa-terminal"></i> View Experience
                  </a>
                  <a
                    href="/Pronnoy_Dutta_Resume.pdf"
                    target="_blank"
                    className="btn-outline interactive"
                  >
                    <i className="fas fa-download"></i> Resume.pdf
                  </a>
                </div>

                <div className="hero-stats">
                  <div className="stat-widget interactive">
                    <div
                      className="stat-val"
                      data-target="5.5"
                      data-decimal="true"
                    >
                      0
                    </div>
                    <div className="stat-label">Yrs Experience</div>
                  </div>
                  <div className="stat-widget interactive">
                    <div className="stat-val" data-target="200">
                      0
                    </div>
                    <div className="stat-label">M Records/Day</div>
                  </div>
                  <div className="stat-widget interactive">
                    <div className="stat-val" data-target="30">
                      0
                    </div>
                    <div className="stat-label">% Perf Gain</div>
                  </div>
                  <div className="stat-widget interactive">
                    <div className="stat-val" data-target="4">
                      0
                    </div>
                    <div className="stat-label">Certifications</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== ABOUT ====== */}
        <section id="about">
          <div className="container">
            <div className="section-header gs-reveal">
              <span className="section-path">
                <span className="folder">src/</span>
                <span className="file">about.py</span>
              </span>
              <div className="section-line"></div>
            </div>

            <div className="about-grid">
              <div className="panel gs-reveal">
                <div className="panel-bar">
                  <div className="dots">
                    <div className="dot r"></div>
                    <div className="dot y"></div>
                    <div className="dot g"></div>
                  </div>
                  <span className="filename">about.py</span>
                  <span className="filepath">src/core/</span>
                </div>
                <div className="panel-body about-text">
                  <p>
                    {`I'm a `}
                    <strong>Lead Data Engineer</strong> at{" "}
                    <span className="keyword">Axtria</span>, leading a team
                    that owns the full lifecycle of batch data pipelines
                    powering business-critical analytics. My work involves
                    architecting cloud-native data platforms on{" "}
                    <strong>AWS</strong>, diagnosing{" "}
                    <strong>Spark</strong> performance bottlenecks, and
                    translating business requirements into scalable solutions.
                  </p>
                  <p>
                    Previously at{" "}
                    <span className="keyword">Infosys</span>, I built
                    cloud-based analytics pipelines and star-schema data
                    warehouses for enterprise clients.
                  </p>
                  <p>
                    {`I'm an `}
                    <strong>AWS Community Builder</strong> (Security team),
                    hold multiple AWS certifications, and am passionate about
                    distributed systems, data modeling, and building pipelines
                    that{" "}
                    {`don't page you at 3 AM.`}
                  </p>
                </div>
              </div>

              <div className="about-cards gs-reveal">
                <div className="about-card interactive">
                  <div className="ac-icon">
                    <i className="fas fa-project-diagram"></i>
                  </div>
                  <h4>Pipeline Architect</h4>
                  <p>End-to-end design &amp; delivery at enterprise scale</p>
                </div>
                <div className="about-card interactive">
                  <div className="ac-icon">
                    <i className="fas fa-tachometer-alt"></i>
                  </div>
                  <h4>Perf Engineer</h4>
                  <p>Spark tuning, query optimization, resource mgmt</p>
                </div>
                <div className="about-card interactive">
                  <div className="ac-icon">
                    <i className="fas fa-cloud"></i>
                  </div>
                  <h4>Cloud Native</h4>
                  <p>AWS certified architect, production platforms</p>
                </div>
                <div className="about-card interactive">
                  <div className="ac-icon">
                    <i className="fas fa-users-cog"></i>
                  </div>
                  <h4>Team Lead</h4>
                  <p>Engineering leadership, delivery &amp; stability</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== EXPERIENCE — Git Log ====== */}
        <section id="experience">
          <div className="container">
            <div className="section-header gs-reveal">
              <span className="section-path">
                <span className="folder">logs/</span>
                <span className="file">git_log.sh</span>
              </span>
              <div className="section-line"></div>
            </div>

            <div className="git-log">
              {/* Axtria — Project Lead */}
              <div className="commit gs-reveal">
                <div className="commit-dot"></div>
                <div className="commit-hash">
                  <span className="branch">main</span>
                  <span className="date">
                    Apr 2025 &mdash; Present &bull; Axtria, Gurugram
                  </span>
                </div>
                <div className="panel">
                  <div className="panel-bar">
                    <div className="dots">
                      <div className="dot r"></div>
                      <div className="dot y"></div>
                      <div className="dot g"></div>
                    </div>
                    <span className="filename">axtria_lead.py</span>
                  </div>
                  <div className="panel-body">
                    <h3>Project Lead — Data Engineering</h3>
                    <div className="role-progression">
                      Associate <span className="arrow">→</span> Sr. Associate{" "}
                      <span className="arrow">→</span>{" "}
                      <span className="current">Project Lead</span>
                    </div>
                    <ul className="commit-bullets">
                      <li>
                        Own end-to-end architecture and delivery of{" "}
                        <strong>batch data pipelines on AWS</strong> (S3,
                        Glue, EMR, Redshift) supporting analytics for a
                        50M-patient commercial pharma platform, maintaining{" "}
                        <strong>99.9% SLA compliance</strong> across all
                        production runs.
                      </li>
                      <li>
                        Lead a team of <strong>4 data engineers</strong> —
                        managing sprint planning, technical design reviews,
                        code quality standards, and career development for
                        junior members.
                      </li>
                      <li>
                        Serve as primary escalation owner for production data
                        incidents; resolved <strong>20+ P1/P2 events</strong>{" "}
                        and implemented proactive monitoring guardrails that
                        cut repeat incidents by <strong>60%</strong>.
                      </li>
                      <li>
                        Translated evolving business requirements from pharma
                        analytics stakeholders into scalable data solutions,
                        consistently delivering within committed timelines.
                      </li>
                      <li>
                        Drove adoption of <strong>CI/CD practices</strong>{" "}
                        and Git-based branching strategy across the team,
                        reducing deployment errors and improving release
                        confidence.
                      </li>
                    </ul>
                    <div className="commit-metrics">
                      <div className="cm-item">
                        <span className="cm-val">99.9%</span>
                        <span className="cm-label">SLA Compliance</span>
                      </div>
                      <div className="cm-item">
                        <span className="cm-val">4</span>
                        <span className="cm-label">Engineers Led</span>
                      </div>
                      <div className="cm-item">
                        <span className="cm-val">20+</span>
                        <span className="cm-label">P1/P2 Resolved</span>
                      </div>
                      <div className="cm-item">
                        <span className="cm-val">60%</span>
                        <span className="cm-label">Fewer Incidents</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Axtria — Senior Data Engineer */}
              <div className="commit gs-reveal">
                <div className="commit-dot"></div>
                <div className="commit-hash">
                  <span className="branch">main</span>
                  <span className="date">
                    May 2024 &mdash; Apr 2025 &bull; Axtria, Gurugram
                  </span>
                </div>
                <div className="panel">
                  <div className="panel-bar">
                    <div className="dots">
                      <div className="dot r"></div>
                      <div className="dot y"></div>
                      <div className="dot g"></div>
                    </div>
                    <span className="filename">axtria_senior.py</span>
                  </div>
                  <div className="panel-body">
                    <h3>Senior Data Engineer</h3>
                    <ul className="commit-bullets">
                      <li>
                        Migrated 15+ legacy Hive and SQL pipelines to{" "}
                        <strong>PySpark-based distributed processing</strong>{" "}
                        on AWS EMR, achieving a{" "}
                        <strong>30% reduction</strong> in end-to-end pipeline
                        runtime — cutting daily processing wall-time from ~9
                        hrs to ~6 hrs.
                      </li>
                      <li>
                        Diagnosed and resolved Spark performance bottlenecks
                        (data skew, suboptimal partitioning, oversized
                        shuffles) on pipelines ingesting{" "}
                        <strong>200M records/day</strong>, reducing estimated
                        compute costs by ~₹33L/yr in EMR cluster spend.
                      </li>
                      <li>
                        Designed <strong>SCD Type-2 dimensional data models</strong>{" "}
                        supporting 3+ years of full historical auditability
                        for patient-level pharma data, enabling downstream
                        teams to retire ad-hoc reconciliation scripts entirely.
                      </li>
                      <li>
                        Managed ingestion of JSON, CSV, Parquet, and ORC
                        formats across multiple upstream source systems,
                        implementing schema-on-read patterns with{" "}
                        <strong>AWS Glue Data Catalog</strong>.
                      </li>
                      <li>
                        Mentored 2 junior engineers on PySpark optimization
                        patterns and AWS data services — both promoted within
                        the project cycle.
                      </li>
                    </ul>
                    <div className="commit-metrics">
                      <div className="cm-item">
                        <span className="cm-val">30%</span>
                        <span className="cm-label">Perf Gain</span>
                      </div>
                      <div className="cm-item">
                        <span className="cm-val">200M</span>
                        <span className="cm-label">Records/Day</span>
                      </div>
                      <div className="cm-item">
                        <span className="cm-val">9→6hr</span>
                        <span className="cm-label">Runtime Cut</span>
                      </div>
                      <div className="cm-item">
                        <span className="cm-val">15+</span>
                        <span className="cm-label">Pipelines Migrated</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Axtria — Associate Data Engineer */}
              <div className="commit gs-reveal">
                <div className="commit-dot"></div>
                <div className="commit-hash">
                  <span className="branch">main</span>
                  <span className="date">
                    Mar 2022 &mdash; Apr 2024 &bull; Axtria, Gurugram
                  </span>
                </div>
                <div className="panel">
                  <div className="panel-bar">
                    <div className="dots">
                      <div className="dot r"></div>
                      <div className="dot y"></div>
                      <div className="dot g"></div>
                    </div>
                    <span className="filename">axtria_associate.py</span>
                  </div>
                  <div className="panel-body">
                    <h3>Associate Data Engineer</h3>
                    <ul className="commit-bullets">
                      <li>
                        Built Python-based Tableau refresh orchestration
                        framework automating end-of-cycle dashboard updates
                        across <strong>30+ dashboards</strong>, eliminating
                        7 hours of manual effort per cycle (~
                        <strong>350 hrs/yr saved</strong>).
                      </li>
                      <li>
                        Developed and maintained production ETL pipelines
                        using <strong>PySpark, AWS Glue, and Control-M</strong>{" "}
                        with zero-defect delivery across 12 consecutive
                        releases.
                      </li>
                      <li>
                        Implemented data quality validation checks (null
                        checks, referential integrity, row count
                        reconciliation) at each pipeline stage, reducing data
                        defects reaching downstream consumers by{" "}
                        <strong>80%</strong>.
                      </li>
                      <li>
                        Built star-schema fact and dimension tables in{" "}
                        <strong>Amazon Redshift</strong> supporting 5
                        analytics use cases including territory performance,
                        brand uptake, and rep activity tracking.
                      </li>
                      <li>
                        Collaborated with business analysts and data scientists
                        to define data contracts, schema agreements, and SLA
                        expectations for <strong>8+ data products</strong>.
                      </li>
                    </ul>
                    <div className="commit-metrics">
                      <div className="cm-item">
                        <span className="cm-val">350hr</span>
                        <span className="cm-label">Saved/Year</span>
                      </div>
                      <div className="cm-item">
                        <span className="cm-val">30+</span>
                        <span className="cm-label">Dashboards</span>
                      </div>
                      <div className="cm-item">
                        <span className="cm-val">80%</span>
                        <span className="cm-label">Fewer Defects</span>
                      </div>
                      <div className="cm-item">
                        <span className="cm-val">8+</span>
                        <span className="cm-label">Data Products</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Infosys */}
              <div className="commit gs-reveal">
                <div className="commit-dot"></div>
                <div className="commit-hash">
                  <span className="branch">feature/infosys</span>
                  <span className="date">
                    Nov 2020 &mdash; Mar 2022 &bull; Infosys, Remote
                  </span>
                </div>
                <div className="panel blue">
                  <div className="panel-bar">
                    <div className="dots">
                      <div className="dot r"></div>
                      <div className="dot y"></div>
                      <div className="dot g"></div>
                    </div>
                    <span className="filename">sales_pipeline.py</span>
                  </div>
                  <div className="panel-body">
                    <h3>Systems Engineer</h3>
                    <ul className="commit-bullets">
                      <li>
                        Designed and implemented cloud-based monthly sales
                        analytics pipelines using{" "}
                        <strong>AWS S3, Python, and PySpark</strong> for a
                        retail client operating 500+ stores across 3 regions
                        — automating report generation that previously
                        required 3 days of manual effort per cycle.
                      </li>
                      <li>
                        Architected a{" "}
                        <strong>star-schema data warehouse</strong> with 8
                        fact and dimension tables tracking revenue, billing
                        frequency, basket size, and customer engagement KPIs
                        — became the single source of truth for executive
                        dashboards.
                      </li>
                      <li>
                        Developed <strong>KPI computation logic</strong> for
                        12+ business metrics (revenue growth, churn rate,
                        store-level performance), reducing analyst ad-hoc
                        query turnaround from days to under 2 hours.
                      </li>
                      <li>
                        Optimised complex SQL queries on{" "}
                        <strong>100M+ row transaction tables</strong>,
                        reducing report generation time by{" "}
                        <strong>40%</strong> through indexing and query
                        restructuring.
                      </li>
                    </ul>
                    <div className="commit-metrics">
                      <div className="cm-item">
                        <span className="cm-val">40%</span>
                        <span className="cm-label">Faster Reports</span>
                      </div>
                      <div className="cm-item">
                        <span className="cm-val">100M+</span>
                        <span className="cm-label">Rows Optimised</span>
                      </div>
                      <div className="cm-item">
                        <span className="cm-val">12+</span>
                        <span className="cm-label">KPIs Built</span>
                      </div>
                      <div className="cm-item">
                        <span className="cm-val">3 days</span>
                        <span className="cm-label">Manual Work Cut</span>
                      </div>
                    </div>
                    <div className="tags" style={{ marginTop: "1.2rem" }}>
                      <span className="tag blue">AWS S3</span>
                      <span className="tag blue">PySpark</span>
                      <span className="tag blue">Python</span>
                      <span className="tag blue">Star Schema</span>
                      <span className="tag blue">Data Warehousing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== SKILLS — XP System ====== */}
        <section id="skills">
          <div className="container">
            <div className="section-header gs-reveal">
              <span className="section-path">
                <span className="folder">config/</span>
                <span className="file">skills.yml</span>
              </span>
              <div className="section-line"></div>
            </div>

            <div className="skills-layout gs-reveal">
              {/* Languages */}
              <div className="panel skill-panel interactive">
                <div className="panel-bar">
                  <div className="dots">
                    <div className="dot r"></div>
                    <div className="dot y"></div>
                    <div className="dot g"></div>
                  </div>
                  <span className="filename">languages.yml</span>
                </div>
                <div className="panel-body">
                  <div className="skill-category">
                    <i
                      className="fas fa-code"
                      style={{ color: "var(--green)" }}
                    ></i>{" "}
                    Languages
                  </div>
                  <div className="xp-item">
                    <div className="xp-header">
                      <span className="xp-name">Python</span>
                      <span className="xp-level expert">EXPERT</span>
                    </div>
                    <div className="xp-bar">
                      <div
                        className="xp-fill green"
                        data-width="95"
                      ></div>
                    </div>
                  </div>
                  <div className="xp-item">
                    <div className="xp-header">
                      <span className="xp-name">SQL</span>
                      <span className="xp-level expert">EXPERT</span>
                    </div>
                    <div className="xp-bar">
                      <div
                        className="xp-fill green"
                        data-width="92"
                      ></div>
                    </div>
                  </div>
                  <div className="xp-item">
                    <div className="xp-header">
                      <span className="xp-name">Java</span>
                      <span className="xp-level intermediate">
                        INTERMEDIATE
                      </span>
                    </div>
                    <div className="xp-bar">
                      <div
                        className="xp-fill amber"
                        data-width="55"
                      ></div>
                    </div>
                  </div>
                  <div className="xp-item">
                    <div className="xp-header">
                      <span className="xp-name">C#</span>
                      <span className="xp-level intermediate">
                        INTERMEDIATE
                      </span>
                    </div>
                    <div className="xp-bar">
                      <div
                        className="xp-fill amber"
                        data-width="45"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Big Data */}
              <div className="panel blue skill-panel interactive">
                <div className="panel-bar">
                  <div className="dots">
                    <div className="dot r"></div>
                    <div className="dot y"></div>
                    <div className="dot g"></div>
                  </div>
                  <span className="filename">big_data.yml</span>
                </div>
                <div className="panel-body">
                  <div className="skill-category">
                    <i
                      className="fas fa-network-wired"
                      style={{ color: "var(--blue)" }}
                    ></i>{" "}
                    Distributed &amp; Big Data
                  </div>
                  <div className="xp-item">
                    <div className="xp-header">
                      <span className="xp-name">Spark / PySpark</span>
                      <span className="xp-level expert">EXPERT</span>
                    </div>
                    <div className="xp-bar">
                      <div
                        className="xp-fill blue"
                        data-width="95"
                      ></div>
                    </div>
                  </div>
                  <div className="xp-item">
                    <div className="xp-header">
                      <span className="xp-name">Hadoop / YARN</span>
                      <span className="xp-level advanced">ADVANCED</span>
                    </div>
                    <div className="xp-bar">
                      <div
                        className="xp-fill blue"
                        data-width="80"
                      ></div>
                    </div>
                  </div>
                  <div className="xp-item">
                    <div className="xp-header">
                      <span className="xp-name">Hive</span>
                      <span className="xp-level advanced">ADVANCED</span>
                    </div>
                    <div className="xp-bar">
                      <div
                        className="xp-fill blue"
                        data-width="78"
                      ></div>
                    </div>
                  </div>
                  <div className="xp-item">
                    <div className="xp-header">
                      <span className="xp-name">Kubernetes</span>
                      <span className="xp-level intermediate">
                        INTERMEDIATE
                      </span>
                    </div>
                    <div className="xp-bar">
                      <div
                        className="xp-fill amber"
                        data-width="55"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cloud */}
              <div className="panel blue skill-panel interactive">
                <div className="panel-bar">
                  <div className="dots">
                    <div className="dot r"></div>
                    <div className="dot y"></div>
                    <div className="dot g"></div>
                  </div>
                  <span className="filename">cloud_aws.yml</span>
                </div>
                <div className="panel-body">
                  <div className="skill-category">
                    <i
                      className="fab fa-aws"
                      style={{ color: "var(--amber)" }}
                    ></i>{" "}
                    Cloud Platforms (AWS)
                  </div>
                  <div className="xp-item">
                    <div className="xp-header">
                      <span className="xp-name">S3 / Data Lakes</span>
                      <span className="xp-level expert">EXPERT</span>
                    </div>
                    <div className="xp-bar">
                      <div
                        className="xp-fill green"
                        data-width="93"
                      ></div>
                    </div>
                  </div>
                  <div className="xp-item">
                    <div className="xp-header">
                      <span className="xp-name">Glue / EMR</span>
                      <span className="xp-level advanced">ADVANCED</span>
                    </div>
                    <div className="xp-bar">
                      <div
                        className="xp-fill blue"
                        data-width="82"
                      ></div>
                    </div>
                  </div>
                  <div className="xp-item">
                    <div className="xp-header">
                      <span className="xp-name">Redshift</span>
                      <span className="xp-level advanced">ADVANCED</span>
                    </div>
                    <div className="xp-bar">
                      <div
                        className="xp-fill blue"
                        data-width="78"
                      ></div>
                    </div>
                  </div>
                  <div className="xp-item">
                    <div className="xp-header">
                      <span className="xp-name">RDS</span>
                      <span className="xp-level advanced">ADVANCED</span>
                    </div>
                    <div className="xp-bar">
                      <div
                        className="xp-fill blue"
                        data-width="75"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Architecture & DevOps */}
              <div className="panel skill-panel interactive">
                <div className="panel-bar">
                  <div className="dots">
                    <div className="dot r"></div>
                    <div className="dot y"></div>
                    <div className="dot g"></div>
                  </div>
                  <span className="filename">devops.yml</span>
                </div>
                <div className="panel-body">
                  <div className="skill-category">
                    <i
                      className="fas fa-cogs"
                      style={{ color: "var(--green)" }}
                    ></i>{" "}
                    Architecture &amp; DevOps
                  </div>
                  <div className="xp-item">
                    <div className="xp-header">
                      <span className="xp-name">
                        Data Modeling / Star Schema
                      </span>
                      <span className="xp-level expert">EXPERT</span>
                    </div>
                    <div className="xp-bar">
                      <div
                        className="xp-fill green"
                        data-width="90"
                      ></div>
                    </div>
                  </div>
                  <div className="xp-item">
                    <div className="xp-header">
                      <span className="xp-name">Airflow</span>
                      <span className="xp-level advanced">ADVANCED</span>
                    </div>
                    <div className="xp-bar">
                      <div
                        className="xp-fill blue"
                        data-width="82"
                      ></div>
                    </div>
                  </div>
                  <div className="xp-item">
                    <div className="xp-header">
                      <span className="xp-name">Docker / CI/CD</span>
                      <span className="xp-level advanced">ADVANCED</span>
                    </div>
                    <div className="xp-bar">
                      <div
                        className="xp-fill blue"
                        data-width="72"
                      ></div>
                    </div>
                  </div>
                  <div className="xp-item">
                    <div className="xp-header">
                      <span className="xp-name">Git / Linux</span>
                      <span className="xp-level expert">EXPERT</span>
                    </div>
                    <div className="xp-bar">
                      <div
                        className="xp-fill green"
                        data-width="88"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== PROJECTS ====== */}
        <section id="projects">
          <div className="container">
            <div className="section-header gs-reveal">
              <span className="section-path">
                <span className="folder">projects/</span>
                <span className="file">SELECT * FROM builds</span>
              </span>
              <div className="section-line"></div>
            </div>

            <div className="projects-grid gs-reveal">
              <div className="panel proj-panel interactive">
                <div className="panel-bar">
                  <div className="dots">
                    <div className="dot r"></div>
                    <div className="dot y"></div>
                    <div className="dot g"></div>
                  </div>
                  <span className="filename">pharma_platform.py</span>
                </div>
                <div className="panel-body">
                  <div className="proj-status live">Production</div>
                  <h3>Pharma Commercial Data Platform</h3>
                  <p className="proj-desc">
                    Cloud-native batch data platform on AWS processing 200M
                    records/day of pharma commercial data — prescriptions,
                    sales force activity, and HCP engagement. Migrated 15+
                    legacy Hive pipelines to PySpark, achieving 30%
                    performance improvement and reducing daily processing
                    window from 9 hrs to 6 hrs.
                  </p>
                  <div className="proj-metrics">
                    <div className="proj-metric">
                      <span>200M+</span>
                      <span>Records/Day</span>
                    </div>
                    <div className="proj-metric">
                      <span>30%</span>
                      <span>Faster</span>
                    </div>
                    <div className="proj-metric">
                      <span>99.9%</span>
                      <span>SLA</span>
                    </div>
                    <div className="proj-metric">
                      <span>350hr</span>
                      <span>Saved/Yr</span>
                    </div>
                  </div>
                  <div className="tags">
                    <span className="tag">Python</span>
                    <span className="tag">PySpark</span>
                    <span className="tag">AWS EMR</span>
                    <span className="tag">AWS Glue</span>
                    <span className="tag">Redshift</span>
                    <span className="tag">Airflow</span>
                    <span className="tag">Control-M</span>
                  </div>
                </div>
              </div>

              <div className="panel blue proj-panel interactive">
                <div className="panel-bar">
                  <div className="dots">
                    <div className="dot r"></div>
                    <div className="dot y"></div>
                    <div className="dot g"></div>
                  </div>
                  <span className="filename">retail_warehouse.sql</span>
                </div>
                <div className="panel-body">
                  <div className="proj-status shipped">Shipped</div>
                  <h3>Retail Sales Analytics Data Warehouse</h3>
                  <p className="proj-desc">
                    End-to-end sales analytics pipeline and data warehouse for
                    a retail client with 500+ stores across 3 regions.
                    Automated monthly reporting that previously took 3 days of
                    manual effort. Built an 8-table star-schema warehouse
                    powering executive-level revenue and engagement dashboards,
                    with KPI logic covering 12+ business metrics.
                  </p>
                  <div className="proj-metrics">
                    <div className="proj-metric">
                      <span>40%</span>
                      <span>Faster Reports</span>
                    </div>
                    <div className="proj-metric">
                      <span>12+</span>
                      <span>KPIs</span>
                    </div>
                    <div className="proj-metric">
                      <span>100M+</span>
                      <span>Rows</span>
                    </div>
                  </div>
                  <div className="tags">
                    <span className="tag blue">Python</span>
                    <span className="tag blue">PySpark</span>
                    <span className="tag blue">AWS S3</span>
                    <span className="tag blue">SQL</span>
                    <span className="tag blue">Star Schema</span>
                    <span className="tag blue">Amazon Redshift</span>
                  </div>
                </div>
              </div>

              <div className="panel blue proj-panel interactive">
                <div className="panel-bar">
                  <div className="dots">
                    <div className="dot r"></div>
                    <div className="dot y"></div>
                    <div className="dot g"></div>
                  </div>
                  <span className="filename">tableau_orchestrator.py</span>
                </div>
                <div className="panel-body">
                  <div className="proj-status shipped">Shipped</div>
                  <h3>Tableau Refresh Automation</h3>
                  <p className="proj-desc">
                    Python-based orchestration framework automating
                    end-of-cycle Tableau dashboard updates via Airflow across
                    30+ dashboards — eliminated 7 hours of manual effort per
                    cycle (~350 hrs/yr saved).
                  </p>
                  <div className="proj-metrics">
                    <div className="proj-metric">
                      <span>350hr</span>
                      <span>Saved/Yr</span>
                    </div>
                    <div className="proj-metric">
                      <span>30+</span>
                      <span>Dashboards</span>
                    </div>
                  </div>
                  <div className="tags">
                    <span className="tag blue">Python</span>
                    <span className="tag blue">Airflow</span>
                    <span className="tag blue">Tableau</span>
                    <span className="tag blue">AWS</span>
                  </div>
                </div>
              </div>

              <div className="panel proj-panel interactive">
                <div className="panel-bar">
                  <div className="dots">
                    <div className="dot r"></div>
                    <div className="dot y"></div>
                    <div className="dot g"></div>
                  </div>
                  <span className="filename">scd2_model.sql</span>
                </div>
                <div className="panel-body">
                  <div className="proj-status live">Production</div>
                  <h3>SCD Type-2 Dimensional Data Model</h3>
                  <p className="proj-desc">
                    Dimensional data model with SCD Type-2 change tracking
                    supporting 3+ years of full historical auditability for
                    patient-level pharma data. Enabled downstream teams to
                    retire ad-hoc reconciliation scripts entirely.
                  </p>
                  <div className="proj-metrics">
                    <div className="proj-metric">
                      <span>3+ yr</span>
                      <span>History</span>
                    </div>
                    <div className="proj-metric">
                      <span>SCD-2</span>
                      <span>Audit Trail</span>
                    </div>
                  </div>
                  <div className="tags">
                    <span className="tag">Data Modeling</span>
                    <span className="tag">SQL</span>
                    <span className="tag">Redshift</span>
                    <span className="tag">Star Schema</span>
                    <span className="tag">PySpark</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== EDUCATION & ACHIEVEMENTS ====== */}
        <section id="education">
          <div className="container">
            <div className="section-header gs-reveal">
              <span className="section-path">
                <span className="folder">data/</span>
                <span className="file">achievements.json</span>
              </span>
              <div className="section-line"></div>
            </div>

            <div className="edu-layout gs-reveal">
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    color: "var(--text-dim)",
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    marginBottom: "1rem",
                  }}
                >
                  <i
                    className="fas fa-graduation-cap"
                    style={{ color: "var(--green)", marginRight: "8px" }}
                  ></i>
                  Education
                </h3>
                <div className="edu-item interactive">
                  <h4>B.Tech, Computer Science</h4>
                  <div className="edu-sub">
                    Bharati Vidyapeeth College of Engineering, Pune
                  </div>
                  <div className="edu-date">July 2016 &mdash; June 2020</div>
                </div>
                <div className="edu-item interactive">
                  <h4>Senior Secondary School</h4>
                  <div className="edu-sub">
                    Delhi Public School, Gurgaon
                  </div>
                  <div className="edu-date">2016</div>
                </div>
                <div
                  className="edu-item interactive"
                  style={{ borderLeft: "3px solid var(--green)" }}
                >
                  <h4>AWS Community Builders</h4>
                  <div className="edu-sub">
                    Official Member &mdash; Security Team
                  </div>
                </div>
              </div>

              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    color: "var(--text-dim)",
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    marginBottom: "1rem",
                  }}
                >
                  <i
                    className="fas fa-trophy"
                    style={{ color: "var(--amber)", marginRight: "8px" }}
                  ></i>
                  Achievements Unlocked
                </h3>
                <div className="achievements">
                  <div className="achievement interactive">
                    <div className="badge">
                      <i className="fas fa-shield-alt"></i>
                    </div>
                    <div className="ach-info">
                      <h4>AWS Security Specialty</h4>
                      <p>Amazon Web Services</p>
                    </div>
                    <span className="ach-unlocked">Unlocked</span>
                  </div>
                  <div className="achievement interactive">
                    <div className="badge">
                      <i className="fas fa-drafting-compass"></i>
                    </div>
                    <div className="ach-info">
                      <h4>AWS Solutions Architect Associate</h4>
                      <p>Amazon Web Services</p>
                    </div>
                    <span className="ach-unlocked">Unlocked</span>
                  </div>
                  <div className="achievement interactive">
                    <div className="badge">
                      <i className="fas fa-network-wired"></i>
                    </div>
                    <div className="ach-info">
                      <h4>CCNA</h4>
                      <p>Cisco Certified Network Associate</p>
                    </div>
                    <span className="ach-unlocked">Unlocked</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== CONTACT ====== */}
        <section id="contact">
          <div className="container">
            <div className="section-header gs-reveal">
              <span className="section-path">
                <span className="folder">docs/</span>
                <span className="file">contact.md</span>
              </span>
              <div className="section-line"></div>
            </div>

            <div className="contact-layout">
              <div className="gs-reveal">
                <div className="panel">
                  <div className="panel-bar">
                    <div className="dots">
                      <div className="dot r"></div>
                      <div className="dot y"></div>
                      <div className="dot g"></div>
                    </div>
                    <span className="filename">README.md</span>
                  </div>
                  <div className="panel-body">
                    <div className="contact-info">
                      <h3>Let&apos;s build something together.</h3>
                      <p>
                        Open for data engineering roles, architecture
                        consulting, or challenging data problems at scale.
                      </p>

                      <div className="contact-row">
                        <i className="fas fa-envelope"></i>{" "}
                        <a
                          href="mailto:pronnoy1998@gmail.com"
                          className="interactive"
                        >
                          pronnoy1998@gmail.com
                        </a>
                      </div>
                      <div className="contact-row">
                        <i className="fas fa-map-marker-alt"></i> Gurugram,
                        Haryana, India
                      </div>

                      <div className="social-row">
                        <a
                          href="https://www.linkedin.com/in/pronnoy-dutta/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="interactive"
                          aria-label="LinkedIn"
                        >
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                        <a
                          href="https://github.com/pronns"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="interactive"
                          aria-label="GitHub"
                        >
                          <i className="fab fa-github"></i>
                        </a>
                        <a
                          href="https://medium.com/@pronnoy1998"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="interactive"
                          aria-label="Medium"
                        >
                          <i className="fab fa-medium-m"></i>
                        </a>
                        <a
                          href="mailto:pronnoy1998@gmail.com"
                          className="interactive"
                          aria-label="Email"
                        >
                          <i className="fas fa-envelope"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="gs-reveal">
                <div className="panel">
                  <div className="panel-bar">
                    <div className="dots">
                      <div className="dot r"></div>
                      <div className="dot y"></div>
                      <div className="dot g"></div>
                    </div>
                    <span className="filename">send_message.sh</span>
                  </div>
                  <div className="panel-body">
                    <form
                      className="contact-form"
                      onSubmit={(e) => {
                        e.preventDefault();
                        window.location.href =
                          "mailto:pronnoy1998@gmail.com";
                      }}
                    >
                      <div className="input-wrap">
                        <input
                          type="text"
                          placeholder="$ echo $YOUR_NAME"
                          required
                          className="interactive"
                        />
                      </div>
                      <div className="input-wrap">
                        <input
                          type="email"
                          placeholder="$ echo $YOUR_EMAIL"
                          required
                          className="interactive"
                        />
                      </div>
                      <div className="input-wrap">
                        <textarea
                          placeholder="$ cat message.txt"
                          rows={4}
                          required
                          className="interactive"
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="btn-green interactive"
                      >
                        <i className="fas fa-paper-plane"></i>{" "}
                        ./send_message.sh
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== FOOTER ====== */}
        <footer>
          <div className="container">
            <div className="footer-status">All Systems Operational</div>
            <p className="footer-copy">
              pronnoy_dutta // lead_data_engineer // 2026
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
