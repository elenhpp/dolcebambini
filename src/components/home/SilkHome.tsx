import { useEffect, useRef, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Instagram, Facebook, Download } from "lucide-react";
import { useLang } from "@/lib/lang";
import { T, CONTACT } from "@/lib/site-content";
import { HOME } from "@/lib/home-content";
import { createSilk, KEYFRAMES as K, type Silk, type SilkState } from "./silk";

import openingImg from "@/assets/images/7020-8b.webp";
import girlsImg from "@/assets/images/C11-4.webp";
import boysImg from "@/assets/images/7101.webp";
import winterImg from "@/assets/images/6057-1(5).webp";
// Silk and Communion currently share this photo
import c24Img from "@/assets/images/C24 (1).webp";
import accessoriesImg from "@/assets/images/A24-1(8762).webp";

const sizeChartPdfUrl = "/size-chart.pdf";

const CATEGORIES = [
  { key: "girls", to: "/girls", img: girlsImg },
  { key: "boys", to: "/boys", img: boysImg },
  { key: "winter", to: "/winter", img: winterImg },
  { key: "silk", to: "/silk", img: c24Img },
  { key: "accessories", to: "/accessories", img: accessoriesImg },
  { key: "communion", to: "/communion", img: c24Img },
] as const;

/** Remount the whole scene when the language changes so every animation re-binds to the new text.
    Animations only start once the saved language is known, so the opening never plays in the wrong language. */
export function SilkHome() {
  const { lang, ready } = useLang();
  return <SilkHomeScene key={lang} active={ready} />;
}

function Emph({ v }: { v: { pre: string; em: string; post: string } }) {
  return (
    <>
      {v.pre}
      <em className="rose">{v.em}</em>
      {v.post}
    </>
  );
}

function Words({ text }: { text: string }) {
  const parts = text.split(/\s+/).filter(Boolean);
  return (
    <>
      {parts.map((w, i) => (
        <span key={i}>
          <span className="w">{w}</span>
          {i < parts.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

function SilkHomeScene({ active }: { active: boolean }) {
  const { t } = useLang();
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => (active ? startSilkHomeAnimations(root.current!, canvas.current!) : undefined), [active]);

  const hero = t(HOME.heroLines);
  const statement = t(HOME.statement);
  const values = t(T.values);
  const brand = "Dolce Bambini";
  const tel = `tel:${CONTACT.phone.replace(/\s/g, "")}`;

  return (
    <div className="silk-home" ref={root}>
      <canvas className="silk-canvas" ref={canvas} aria-hidden="true" />
      <div className="cursor" aria-hidden="true" />
      <div className="cursor-ring" aria-hidden="true">
        <span>{t(HOME.view)}</span>
      </div>

      <div className="sh-content">
        {/* 1. Opening: the photo opens up between "Dolce" and "Bambini" */}
        <section className="craft" id="craft">
          <div className="craft-media">
            <img src={openingImg} alt="" />
            <div className="craft-shade" />
          </div>
          <h1 className="craft-title" aria-label={brand}>
            <span className="line ct-l">
              <span className="rose">DOLCE</span>
            </span>
            <span className="line ct-r">
              <span>
                <em className="rose">bambini</em>
              </span>
            </span>
          </h1>
          <p className="craft-lead">
            <Emph v={t(HOME.craftLead)} />
          </p>
          <div className="craft-values">
            {values.map((v, i) => (
              <div key={v.t}>
                <h3>{v.t}</h3>
                <p>{v.d}</p>
              </div>
            ))}
          </div>
          <div className="craft-cue scroll-cue">
            <span>{t(HOME.scroll)}</span>
            <i />
          </div>
        </section>

        {/* 2. Categories (horizontal) */}
        <section className="collections" id="collections">
          <div className="track">
            <div className="h-intro">
              <div className="eyebrow">Collection 2026</div>
              <h2>
                <Emph v={t(HOME.collectionsTitle)} />
              </h2>
              <p>{t(HOME.collectionsBody)}</p>
            </div>
            {CATEGORIES.map((c, i) => {
              const copy = HOME.categories[c.key];
              return (
                <Link key={c.key} to={c.to} className="card" data-cursor="view">
                  <div className="media">
                    <img src={c.img} alt={t(copy.title)} loading="lazy" />
                  </div>
                  <div className="meta">
                    <div>
                      <span className="num">{String(i + 1).padStart(2, "0")}</span>
                      <h3>{t(copy.title)}</h3>
                    </div>
                    <small>{t(copy.sub)}</small>
                  </div>
                </Link>
              );
            })}
            <div className="h-end">
              <div className="eyebrow" style={{ marginBottom: 10 }}>
                {t(HOME.visitUs)}
              </div>
              <Link to="/sales-points">
                {t(T.pages.sales.title)} <span>→</span>
              </Link>
              <Link to="/contact">
                {t(T.pages.contact.title)} <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 3. Hero */}
        <section className="hero" id="hero">
          <h2 className="hero-title" aria-label={hero.join(" ")}>
            <span className="line l1">
              <span>{hero[0]}</span>
            </span>
            <span className="line l2">
              <span>
                <em className="rose">{hero[1]}</em>
              </span>
            </span>
            <span className="line l3">
              <span>{hero[2]}</span>
            </span>
          </h2>
          <div className="hero-meta">
            <p className="fade-in">{t(HOME.heroMeta)}</p>
            <p className="fade-in mid-meta">{t(T.copy.since1978)}</p>
            <p className="fade-in">Collection 2026</p>
          </div>
        </section>

        {/* 4. Statement */}
        <section className="statement" id="statement">
          <div>
            <div className="eyebrow">{t(HOME.philosophy)}</div>
            <p className="big">
              <Words text={statement.pre} />{" "}
              <em className="rose">
                <Words text={statement.em} />
              </em>
            </p>
          </div>
        </section>

        {/* 5. Years */}
        <section className="years" id="years">
          <div className="year">1978</div>
          <div className="cap">
            <h2>
              <Emph v={t(HOME.yearsTitle)} />
            </h2>
            <p>{t(T.storyBody)}</p>
          </div>
        </section>

        {/* 6. Marquee */}
        <section className="marquee" aria-hidden="true">
          <div className="mq-row" data-dir="-1">
            <span>{t(HOME.marquee1)}</span>
            <span>{t(HOME.marquee1)}</span>
          </div>
          <div className="mq-row outline" data-dir="1">
            <span>{t(HOME.marquee2)}</span>
            <span>{t(HOME.marquee2)}</span>
          </div>
        </section>

        {/* 7. Finale + footer */}
        <section className="finale" id="finale">
          <div className="finale-top">
            <div className="eyebrow reveal">Collection 2026</div>
            <h2 className="reveal">
              <Emph v={t(HOME.finaleTitle)} />
            </h2>
            <div className="actions reveal">
              <Magnetic>
                <Link className="btn btn-primary" to="/girls">
                  {t(T.heroCtaGirls)}
                </Link>
              </Magnetic>
              <Magnetic>
                <Link className="btn btn-ghost" to="/boys">
                  {t(T.heroCtaBoys)}
                </Link>
              </Magnetic>
              <Magnetic>
                <Link className="btn btn-ghost" to="/sales-points">
                  {t(HOME.findStore)}
                </Link>
              </Magnetic>
            </div>
          </div>

          {/* Size chart */}
          <div className="mx-auto mt-24 w-full max-w-7xl">
            <div className="relative rounded-3xl bg-gradient-to-br from-blush/60 via-card to-sky/40 border border-border/60 p-6 lg:p-8 float-shadow overflow-hidden">
              <div className="grid gap-8 lg:grid-cols-[1.1fr_1.4fr] lg:items-center">
                <div>
                  <div className="text-[11px] tracking-[0.35em] uppercase text-primary mb-3">{t(T.sizeChart)}</div>
                  <h2 className="font-display text-4xl md:text-5xl tracking-tight">{t(T.copy.perfectSize)}</h2>
                  <p className="mt-4 text-foreground/70 max-w-xl leading-relaxed">{t(T.sizeChartBody)}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={sizeChartPdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium tracking-wide soft-shadow hover:scale-[1.02] transition-transform"
                    >
                      <Download size={16} /> {t(T.sizeChartCta)}
                    </a>
                    <a
                      href={sizeChartPdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-full border border-border bg-card px-6 py-3 text-sm font-medium tracking-wide soft-shadow hover:bg-muted transition-colors"
                    >
                      Open full PDF
                    </a>
                  </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-border/70 bg-white/70 shadow-sm">
                  <iframe
                    src={sizeChartPdfUrl}
                    title={t(T.sizeChart)}
                    className="h-[420px] w-full bg-white"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          <footer>
            <div className="foot">
              <div>
                <h4>{t(T.copy.flagshipStore)}</h4>
                <p>{t(CONTACT.address)}</p>
              </div>
              <div>
                <h4>{t(T.footer.contact)}</h4>
                <p>
                  <a href={tel}>{CONTACT.phone}</a>
                  <br />
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                </p>
                <div className="socials">
                  <a
                    href="https://www.instagram.com/dolce.bambini.official/"
                    aria-label="Instagram"
                  >
                    <Instagram size={16} />
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=100063765693096"
                    aria-label="Facebook"
                  >
                    <Facebook size={16} />
                  </a>
                </div>
              </div>
              <div>
                <h4>{t(HOME.collections)}</h4>
                <p>
                  {CATEGORIES.map((c, i) => (
                    <span key={c.key}>
                      {i > 0 && " · "}
                      <Link to={c.to}>{t(HOME.categories[c.key].title)}</Link>
                    </span>
                  ))}
                </p>
              </div>
              <div>
                <h4>{t(T.copy.since1978)}</h4>
                <p>{t(T.footer.tagline)}</p>
              </div>
            </div>
            <div className="wordmark" aria-label={brand}>
              {[...brand].map((ch, i) => (
                <span key={i} aria-hidden="true">
                  {ch === " " ? " " : ch}
                </span>
              ))}
            </div>
            <div className="legal">
              <span>
                © {new Date().getFullYear()} Dolce Bambini. {t(T.footer.rights)}
              </span>
              <nav>
                <Link to="/gdpr">{t(HOME.privacy)}</Link>
                <Link to="/terms">{t(HOME.terms)}</Link>
                <span>{t(T.footer.designed)}</span>
              </nav>
            </div>
          </footer>
        </section>
      </div>
    </div>
  );
}

function Magnetic({ children }: { children: ReactNode }) {
  return (
    <span className="magnetic" style={{ display: "inline-block" }}>
      {children}
    </span>
  );
}

/* ================================================================
   Animations. Everything created here is torn down in the returned
   cleanup, so navigating away leaves no scroll hijacking behind.
   ================================================================ */
function startSilkHomeAnimations(root: HTMLElement, canvas: HTMLCanvasElement) {
  gsap.registerPlugin(ScrollTrigger);
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const $ = <E extends Element = HTMLElement>(s: string) => root.querySelector<E>(s)!;
  const $$ = <E extends Element = HTMLElement>(s: string) => [...root.querySelectorAll<E>(s)];

  let disposed = false;
  let silk: Silk | null = null;
  const tickers: gsap.TickerCallback[] = [];
  const addTicker = (fn: gsap.TickerCallback) => {
    tickers.push(fn);
    gsap.ticker.add(fn);
  };
  const listeners: Array<() => void> = [];
  const listen = <K extends keyof WindowEventMap>(
    target: Window | Document | HTMLElement,
    type: K,
    fn: (e: WindowEventMap[K]) => void,
  ) => {
    target.addEventListener(type, fn as EventListener, { passive: true });
    listeners.push(() => target.removeEventListener(type, fn as EventListener));
  };

  window.scrollTo(0, 0);

  /* ---------- Smooth scroll ---------- */
  let lenis: Lenis | null = null;
  if (!reduce) {
    lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
    lenis.on("scroll", ScrollTrigger.update);
    addTicker((time) => lenis!.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  let lastY = scrollY,
    velocity = 0;
  const scrollVelocity = () => {
    if (lenis) return lenis.velocity || 0;
    const v = scrollY - lastY;
    lastY = scrollY;
    return v;
  };

  /* ---------- Silk loop ---------- */
  const S: SilkState = { ...K.open, y: -0.95, alpha: 0 };
  const pointer = {
    x: innerWidth / 2,
    y: innerHeight / 2,
    px: innerWidth / 2,
    py: innerHeight / 2,
    active: false,
    strength: 0,
  };
  listen(window, "pointermove", (e) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.active = true;
  });
  listen(document.documentElement, "pointerleave", () => (pointer.active = false));

  let time = 0,
    flow = 1;
  addTicker((_t, dt) => {
    velocity += (scrollVelocity() - velocity) * 0.08;
    if (!silk) return;
    // scroll speed quickens the drift, then it settles back to calm
    flow += (1 + Math.min(Math.abs(velocity) * 0.035, 2.2) - flow) * 0.05;
    time += (dt / 1000) * (reduce ? 0.25 : flow);
    const speed = Math.hypot(pointer.x - pointer.px, pointer.y - pointer.py);
    pointer.px = pointer.x;
    pointer.py = pointer.y;
    const target = reduce || !pointer.active ? 0 : Math.min(0.35 + speed * 0.02, 1);
    pointer.strength += (target - pointer.strength) * 0.04;
    silk.render({ state: S, time, velocity, pointer });
  });

  const ctx = gsap.context(() => {
    const openLines = $$(".craft-title .line > span");
    const heroLines = $$(".hero .line > span");
    gsap.set([...openLines, ...heroLines], { yPercent: 115 });
    gsap.set(".fade-in", { opacity: 0, y: 12 });
    gsap.set([".craft-media", ".craft-cue"], { opacity: 0 });
    root.classList.add("is-ready");

    /* 1. Opening */
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#craft",
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
      .fromTo(
        ".craft-cue",
        { opacity: 1 },
        { opacity: 0, duration: 0.1, immediateRender: false },
        0,
      )
      .fromTo(
        ".craft-media",
        {
          clipPath: () =>
            innerWidth < 800
              ? "inset(31% 20% 29% 20% round 22px)"
              : "inset(24% 36% 24% 36% round 28px)",
        },
        { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1, ease: "power2.inOut" },
        0,
      )
      .fromTo(
        ".craft-media img",
        { scale: 1.35 },
        { scale: 1, duration: 1, ease: "power2.inOut" },
        0,
      )
      .to(".ct-l", { xPercent: -70, opacity: 0, duration: 0.7, ease: "power1.in" }, 0.05)
      .to(".ct-r", { xPercent: 70, opacity: 0, duration: 0.7, ease: "power1.in" }, 0.05)
      .to(".craft-shade", { opacity: 1, duration: 0.4 }, 0.85)
      .fromTo(".craft-lead", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.4 }, 1)
      .fromTo(
        ".craft-values > div",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.12 },
        1.1,
      )
      .to({}, { duration: 0.3 });

    /* 2. Categories: horizontal travel with parallax inside each photo */
    const track = $(".track");
    const dist = () => Math.max(0, track.scrollWidth - innerWidth);
    const hTween = gsap.to(track, {
      x: () => -dist(),
      ease: "none",
      scrollTrigger: {
        trigger: "#collections",
        start: "top top",
        end: () => "+=" + dist(),
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
    $$(".card").forEach((card) => {
      gsap.fromTo(
        card.querySelector("img"),
        { xPercent: -6 },
        {
          xPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            containerAnimation: hTween,
            start: "left right",
            end: "right left",
            scrub: true,
          },
        },
      );
      if (card.offsetLeft < innerWidth * 0.9) return; // already on screen when the section pins
      gsap.from(card, {
        yPercent: 12,
        rotate: 2,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          containerAnimation: hTween,
          start: "left 95%",
          end: "left 55%",
          scrub: true,
        },
      });
    });

    /* 3. Hero: lines rise in on arrival, then drift apart as you leave */
    gsap
      .timeline({
        scrollTrigger: { trigger: "#hero", start: "top 70%", toggleActions: "play none none none" },
      })
      .to(heroLines, { yPercent: 0, duration: 1.4, stagger: 0.1, ease: "expo.out" })
      .to(".fade-in", { opacity: 1, y: 0, duration: 1, stagger: 0.08, ease: "power3.out" }, "-=1");
    gsap
      .timeline({
        scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true },
      })
      .to(".hero .l1", { xPercent: -14, opacity: 0.2, ease: "none" }, 0)
      .to(".hero .l2", { yPercent: -40, opacity: 0.2, ease: "none" }, 0)
      .to(".hero .l3", { xPercent: 14, opacity: 0.2, ease: "none" }, 0)
      .to(".hero-meta", { opacity: 0, ease: "none" }, 0);

    /* 4. Statement: words light up one by one */
    gsap.to(".statement .w", {
      opacity: 1,
      ease: "none",
      stagger: 0.1,
      scrollTrigger: {
        trigger: "#statement",
        start: "top top",
        end: "+=170%",
        pin: true,
        scrub: true,
      },
    });

    /* 5. Years: count 1978 → 2026 */
    const yearEl = $(".year");
    const yr = { v: 1978 };
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#years",
          start: "top top",
          end: "+=140%",
          pin: true,
          scrub: true,
        },
      })
      .fromTo(
        yearEl,
        { scale: 0.86, opacity: 0.4 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" },
        0,
      )
      .to(
        yr,
        {
          v: 2026,
          duration: 1,
          ease: "power1.inOut",
          onUpdate: () => {
            yearEl.textContent = String(Math.round(yr.v));
          },
        },
        0,
      )
      .fromTo("#years .cap", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3 }, 0.55);

    /* 6. Marquee: drifts on its own, speeds up with the scroll */
    $$(".mq-row").forEach((row) => {
      const dir = Number(row.dataset.dir);
      let x = dir > 0 ? -row.scrollWidth / 2 : 0;
      addTicker(() => {
        const half = row.scrollWidth / 2;
        x += dir * (reduce ? 0.15 : 0.6 + Math.min(Math.abs(velocity) * 0.25, 14));
        if (x <= -half) x += half;
        if (x > 0) x -= half;
        row.style.transform = `translate3d(${x}px,0,0)`;
      });
    });

    /* 7. Finale reveals */
    $$(".finale .reveal").forEach((el, i) =>
      gsap.from(el, {
        y: 50,
        opacity: 0,
        duration: 1.3,
        ease: "expo.out",
        delay: i * 0.08,
        scrollTrigger: { trigger: el, start: "top 88%" },
      }),
    );
    gsap.from(".wordmark span", {
      yPercent: 110,
      duration: 1.4,
      ease: "expo.out",
      stagger: 0.035,
      scrollTrigger: { trigger: ".wordmark", start: "top 95%" },
    });

    /* Silk choreography between chapters */
    const steps: Array<[keyof typeof K, keyof typeof K, ScrollTrigger.Vars]> = [
      ["open", "coll", { trigger: "#collections", start: "top bottom", end: "top top" }],
      ["coll", "hero", { trigger: "#hero", start: "top bottom", end: "top top" }],
      ["hero", "state", { trigger: "#statement", start: "top bottom", end: "top top" }],
      ["state", "years", { trigger: "#years", start: "top bottom", end: "top top" }],
      [
        "years",
        "finale",
        { trigger: ".marquee", start: "top bottom", endTrigger: "#finale", end: "top 20%" },
      ],
    ];
    steps.forEach(([a, b, st]) =>
      gsap.fromTo(
        S,
        { ...K[a] },
        {
          ...K[b],
          ease: "power1.inOut",
          immediateRender: false,
          scrollTrigger: { ...st, scrub: 1.4 },
        },
      ),
    );

    /* Cursor + magnetic buttons */
    if (finePointer) {
      const dot = $(".cursor"),
        ring = $(".cursor-ring");
      const dx = gsap.quickTo(dot, "x", { duration: 0.12 }),
        dy = gsap.quickTo(dot, "y", { duration: 0.12 });
      const rx = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3" }),
        ry = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3" });
      listen(window, "pointermove", (e) => {
        root.classList.add("has-pointer");
        dx(e.clientX);
        dy(e.clientY);
        rx(e.clientX);
        ry(e.clientY);
      });
      listen(document, "pointerover", (e) => {
        const el = (e.target as Element).closest<HTMLElement>("[data-cursor], a, button");
        ring.classList.toggle("view", !!el && el.dataset.cursor === "view");
        ring.classList.toggle("link", !!el && el.dataset.cursor !== "view");
      });
      $$(".magnetic").forEach((el) => {
        const mx = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" }),
          my = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
        listen(el, "pointermove", (e) => {
          const r = el.getBoundingClientRect();
          mx((e.clientX - r.left - r.width / 2) * 0.3);
          my((e.clientY - r.top - r.height / 2) * 0.3);
        });
        listen(el, "pointerleave", () => {
          mx(0);
          my(0);
        });
      });
    }
  }, root);

  /* ---------- Boot: wait briefly for fonts + WebGL, then play the opening ---------- */
  const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
  const silkReady = createSilk(canvas).then((s) => {
    if (disposed) {
      s?.dispose();
      return;
    }
    silk = s;
    if (!s) root.classList.add("no-webgl");
  });
  Promise.race([
    Promise.all([fontsReady, silkReady]),
    new Promise((r) => setTimeout(r, 1200)),
  ]).then(() => {
    if (disposed) return;
    ScrollTrigger.refresh();
    ctx.add(() => {
      gsap
        .timeline()
        .to(S, { y: K.open.y, alpha: 1, duration: 2.4, ease: "expo.out" })
        .to(
          ".craft-title .line > span",
          { yPercent: 0, duration: 1.4, stagger: 0.12, ease: "expo.out" },
          0.1,
        )
        .to(".craft-media", { opacity: 1, duration: 1.4, ease: "expo.out" }, 0.2)
        .fromTo(
          ".craft-cue",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          0.6,
        );
    });
  });
  const onLoad = () => ScrollTrigger.refresh();
  window.addEventListener("load", onLoad);

  return () => {
    disposed = true;
    window.removeEventListener("load", onLoad);
    listeners.forEach((off) => off());
    tickers.forEach((fn) => gsap.ticker.remove(fn));
    ctx.revert();
    lenis?.destroy();
    gsap.ticker.lagSmoothing(500, 33);
    silk?.dispose();
    root.classList.remove("is-ready", "no-webgl", "has-pointer");
  };
}
