import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import "@/styles/sillage.css";

export const Route = createFileRoute("/sillage")({
  component: SillagePage,
  head: () => ({
    meta: [
      { title: "Sillage — A Watch That Leaves a Trace" },
      {
        name: "description",
        content:
          "Sillage One: a Swiss automatic movement paired with a flush, skin-warmed parfum reservoir set into the caseback. One of 500, ever.",
      },
    ],
  }),
});

type Stage = {
  title: React.ReactNode;
  desc: string;
  stats: [string, string][];
  groups: string[];
  callout: string;
  zoom?: boolean;
};

const STAGES: Stage[] = [
  {
    title: "The face you see.",
    desc: "A COL-1 automatic movement, hand-wound rotor, sapphire crystal front and back. Everything a watch should be, before you know what is underneath.",
    stats: [
      ["150g", "Total weight"],
      ["904L", "Case steel"],
    ],
    groups: ["gDial"],
    callout: "",
  },
  {
    title: (
      <>
        The <em>movement</em>, uncovered.
      </>
    ),
    desc: "Turn the crystal to x-ray and the dial falls away: 128 components, a free-sprung balance, and a rotor that never stops moving while it is on your wrist.",
    stats: [
      ["42h", "Power reserve"],
      ["28,800", "Vibrations / hr"],
    ],
    groups: ["gMovement"],
    callout: "42h reserve · 28,800vph · rotor exposed",
  },
  {
    title: "Flip it over.",
    desc: "Set into the caseback, flush, sealed, and no thicker than two coats of paint, sits a reservoir you would never notice unless someone told you.",
    stats: [
      ["0.6mm", "Reservoir depth"],
      ["Sapphire", "Sealed housing"],
    ],
    groups: ["gCaseback"],
    callout: "Laser-sealed sapphire reservoir",
  },
  {
    title: (
      <>
        A trace of <em>parfum</em>.
      </>
    ),
    desc: "Not a spray bottle. A slow, warmed oil that clings to the case until your skin asks for it, then lets go, one molecule at a time.",
    stats: [
      ["33°C", "Activation temp"],
      ["3", "Accords available"],
    ],
    groups: ["gCaseback"],
    callout: "Skin-warmed, not sprayed",
    zoom: true,
  },
  {
    title: (
      <>
        Worn. <em>Not</em> sprayed.
      </>
    ),
    desc: "By the second hour, the reservoir is doing what perfume counters cannot: releasing quietly, all day, from the one part of you that is always moving.",
    stats: [
      ["6–8h", "Release window"],
      ["500", "Pieces, numbered"],
    ],
    groups: ["gWrist", "gPulse"],
    callout: "Body heat, not atomization",
  },
];

type ScentKey = "amber" | "vetiver" | "iris";

const SCENTS: Record<
  ScentKey,
  { name: string; dot: string; top: string; heart: string; base: string; curve: string }
> = {
  amber: {
    name: "Amber Oud",
    dot: "#c9812f",
    top: "Pink Pepper, Bergamot",
    heart: "Oud, Rose",
    base: "Amber, Vanilla Musk",
    curve: "M0,130 C40,110 70,40 110,32 C160,22 220,55 260,80 C310,108 360,120 400,124",
  },
  vetiver: {
    name: "Vetiver Salt",
    dot: "#7c9484",
    top: "Sea Salt, Grapefruit",
    heart: "Vetiver, Fig Leaf",
    base: "Cedar, Ambergris",
    curve: "M0,130 C30,120 55,60 90,48 C130,34 180,44 230,68 C280,92 340,110 400,118",
  },
  iris: {
    name: "White Iris",
    dot: "#a999c4",
    top: "Iris Leaf, Cardamom",
    heart: "Iris Root, Violet",
    base: "White Musk, Suede",
    curve: "M0,130 C35,118 60,70 100,54 C145,36 200,50 250,74 C300,98 350,114 400,122",
  },
};

const POINTS = [
  {
    num: "01",
    title: "One object, two disciplines",
    body: "Swiss horology and French perfumery engineered as a single mechanism, not two products bolted together for a headline.",
  },
  {
    num: "02",
    title: "No spray. No ritual.",
    body: "Body heat alone drives diffusion. 33°C against the caseback is all the reservoir needs to release.",
  },
  {
    num: "03",
    title: "0.6mm, and you'd never know",
    body: "The flattest fragrance reservoir ever set into a caseback, flush, laser-sealed, invisible against the wrist.",
  },
  {
    num: "04",
    title: "Three accords, seconds to swap",
    body: "Amber Oud, Vetiver Salt, White Iris, twist-lock cartridges, no tools, no watchmaker required.",
  },
  {
    num: "05",
    title: "COL-1 automatic, visible",
    body: "42-hour reserve, 28,800vph, rotor exposed through the sapphire, because the movement earned the view.",
  },
  {
    num: "06",
    title: "One of 500, not one of thousands",
    body: "Individually numbered and hand-finished, 72 hours of case work before a single one leaves the atelier.",
  },
];

const FAQS = [
  {
    q: "Is it water resistant?",
    a: "50m / 5ATM. The reservoir is laser-sealed sapphire-over-steel — showering, rain, and handwashing are fine. We wouldn't recommend a swim; save that for a watch that doesn't smell like anything.",
  },
  {
    q: "How long does one cartridge last?",
    a: "Roughly six weeks of daily wear. Replacement cartridges ship quarterly, or on demand from your account.",
  },
  {
    q: "Can I mix scents?",
    a: "Each case holds one cartridge at a time, but swapping takes under a minute and needs no tools.",
  },
  {
    q: "Is the movement serviceable?",
    a: "Yes. Every Sillage ships with a 5-year mechanical warranty and is fully serviceable at our atelier.",
  },
  {
    q: "I don't usually wear fragrance. Is this for me?",
    a: "Especially. The dose is calibrated to be felt by people near you, not by you — no fatigue, no overspray, nothing to remember.",
  },
];

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function SillagePage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const prev = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "smooth";
    const onScroll = () => setNavScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.documentElement.style.scrollBehavior = prev;
    };
  }, []);

  // cursor glow
  const glowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    let gx = window.innerWidth / 2;
    let gy = window.innerHeight / 2;
    let tx = gx;
    let ty = gy;
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    window.addEventListener("mousemove", onMove);
    const loop = () => {
      gx += (tx - gx) * 0.12;
      gy += (ty - gy) * 0.12;
      if (glowRef.current)
        glowRef.current.style.transform = `translate(${gx}px,${gy}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // hero tilt
  const heroStageRef = useRef<HTMLDivElement>(null);
  const heroTiltRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const stage = heroStageRef.current;
    const tilt = heroTiltRef.current;
    if (!stage || !tilt) return;
    const onMove = (e: MouseEvent) => {
      const r = stage.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      tilt.style.transform = `rotateY(${px * 18}deg) rotateX(${-py * 18}deg)`;
    };
    const onLeave = () => {
      tilt.style.transform = "rotateY(0deg) rotateX(0deg)";
    };
    stage.addEventListener("mousemove", onMove);
    stage.addEventListener("mouseleave", onLeave);
    return () => {
      stage.removeEventListener("mousemove", onMove);
      stage.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // seconds hand
  const secHandRef = useRef<SVGLineElement>(null);
  useEffect(() => {
    let sec = 0;
    const id = setInterval(() => {
      sec = (sec + 6) % 360;
      secHandRef.current?.setAttribute("transform", `rotate(${sec} 150 150)`);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // reveal-on-scroll
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) en.target.classList.add("in");
        });
      },
      { threshold: 0.2 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // count-up stats
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const targets = root.querySelectorAll<HTMLElement>(".craft-stat b");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const el = en.target as HTMLElement;
          const target = parseFloat(el.dataset.target ?? "0");
          const decimals = parseInt(el.dataset.decimal ?? "0", 10);
          const start = performance.now();
          const dur = 1400;
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = (target * eased).toFixed(decimals);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.unobserve(el);
        });
      },
      { threshold: 0.5 },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // scarcity bar
  const scarcityFillRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const bar = rootRef.current?.querySelector(".scarcity-bar");
    if (!bar) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting && scarcityFillRef.current) {
            scarcityFillRef.current.style.width = "63.6%";
            io.disconnect();
          }
        });
      },
      { threshold: 0.5 },
    );
    io.observe(bar);
    return () => io.disconnect();
  }, []);

  // mechanism scroll-scrub
  const mechOuterRef = useRef<HTMLDivElement>(null);
  const mechZoomRef = useRef<HTMLDivElement>(null);
  const progFillRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);
  const stageRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const el = mechOuterRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const progressed = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? progressed / total : 0;
      if (progFillRef.current) progFillRef.current.style.height = `${p * 100}%`;
      const idx = Math.min(STAGES.length - 1, Math.floor(p * STAGES.length));
      if (idx !== stageRef.current) {
        stageRef.current = idx;
        setStage(idx);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mechZoomRef.current) return;
    const s = STAGES[stage];
    mechZoomRef.current.style.transform = s.zoom
      ? "scale(1.55) rotateY(6deg)"
      : stage === 1
        ? "rotateY(-14deg)"
        : stage >= 4
          ? "rotateY(10deg)"
          : "rotateY(0deg)";
  }, [stage]);

  const fadeClass = (id: string) => `g-fade${STAGES[stage].groups.includes(id) ? " show" : ""}`;

  // scent selector
  const [activeScent, setActiveScent] = useState<ScentKey>("amber");
  const [curveDrawn, setCurveDrawn] = useState(false);
  const scent = SCENTS[activeScent];
  useEffect(() => {
    setCurveDrawn(false);
    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(() => setCurveDrawn(true));
    });
    return () => cancelAnimationFrame(raf1);
  }, [activeScent]);
  const curveAreaD = useMemo(() => `${scent.curve} L400,130 L0,130 Z`, [scent.curve]);

  // reserve form
  const [email, setEmail] = useState("");
  const [reserveMsg, setReserveMsg] = useState("");
  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    setReserveMsg(`You're on the list, ${email}. Check your inbox to confirm the deposit.`);
    toast.success("You're on the list", { description: `Check ${email} to confirm your deposit.` });
    setEmail("");
  };

  // faq
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="sillage-page" ref={rootRef}>
      <div id="sillage-glow" ref={glowRef} />

      <nav className={navScrolled ? "scrolled" : ""}>
        <div className="logo">
          SILL<em>AGE</em>
        </div>
        <ul className="navlinks">
          <li>
            <a href="#mechanism">Mechanism</a>
          </li>
          <li>
            <a href="#trail">The Trail</a>
          </li>
          <li>
            <a href="#craft">Craft</a>
          </li>
          <li>
            <a href="#faq">FAQ</a>
          </li>
        </ul>
        <a href="#reserve" className="btn">
          Reserve
        </a>
      </nav>

      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <div className="eyebrow">Sillage One — Reference SG-01</div>
            <h1 className="serif">
              A watch that leaves
              <br />
              the room <em>after</em>
              <br />
              you do.
            </h1>
            <p className="hero-sub">
              Flush against the caseback, sealed under 0.6mm of sapphire, a hairline reservoir of
              parfum warms with your pulse and drifts into the air for hours. A Swiss automatic
              movement on top. A French perfumer's atelier underneath. One object.
            </p>
            <div className="hero-cta">
              <a href="#mechanism" className="btn solid">
                See what's inside ↓
              </a>
              <a href="#reserve" className="btn">
                Reserve — $18,500
              </a>
            </div>
            <div className="define">
              <b>Sillage</b> <span style={{ opacity: 0.6 }}>/see-yazh/</span> — French, n. The trace
              a scent leaves in the air after someone has already left the room.
            </div>
          </div>
          <div className="watch-stage" ref={heroStageRef}>
            <div className="watch-tilt" ref={heroTiltRef}>
              <svg viewBox="0 0 300 300">
                <ellipse cx="150" cy="280" rx="70" ry="10" fill="black" opacity="0.35" />
                <path
                  d="M120 40 L100 15 L200 15 L180 40"
                  fill="#2a1c14"
                  stroke="#513622"
                  strokeWidth="1"
                />
                <path
                  d="M120 260 L100 285 L200 285 L180 260"
                  fill="#2a1c14"
                  stroke="#513622"
                  strokeWidth="1"
                />
                <rect x="94" y="60" width="18" height="180" rx="6" fill="#3a2618" />
                <rect x="188" y="60" width="18" height="180" rx="6" fill="#3a2618" />
                <circle cx="150" cy="150" r="98" fill="#151008" stroke="#c9a24b" strokeWidth="2" />
                <circle
                  cx="150"
                  cy="150"
                  r="98"
                  fill="none"
                  stroke="#e8cf8a"
                  strokeWidth="0.5"
                  opacity="0.4"
                />
                <rect x="244" y="138" width="14" height="24" rx="3" fill="#c9a24b" />
                <circle cx="150" cy="150" r="82" fill="#0f0b06" />
                <g stroke="#e8cf8a" strokeWidth="1.4" opacity="0.85">
                  <line x1="150" y1="76" x2="150" y2="90" />
                  <line x1="150" y1="210" x2="150" y2="224" />
                  <line x1="76" y1="150" x2="90" y2="150" />
                  <line x1="210" y1="150" x2="224" y2="150" />
                  <line x1="99" y1="99" x2="109" y2="109" />
                  <line x1="201" y1="99" x2="191" y2="109" />
                  <line x1="99" y1="201" x2="109" y2="191" />
                  <line x1="201" y1="201" x2="191" y2="191" />
                </g>
                <text
                  x="150"
                  y="132"
                  textAnchor="middle"
                  fill="#c9a24b"
                  fontFamily="Fraunces, serif"
                  fontStyle="italic"
                  fontSize="13"
                >
                  Sillage
                </text>
                <text
                  x="150"
                  y="182"
                  textAnchor="middle"
                  fill="#7c6a4d"
                  fontFamily="Manrope, sans-serif"
                  fontSize="7"
                  letterSpacing="2"
                >
                  AUTOMATIC
                </text>
                <line
                  x1="150"
                  y1="150"
                  x2="150"
                  y2="105"
                  stroke="#f3ead9"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <line
                  x1="150"
                  y1="150"
                  x2="182"
                  y2="150"
                  stroke="#f3ead9"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
                <line
                  ref={secHandRef}
                  x1="150"
                  y1="150"
                  x2="150"
                  y2="112"
                  stroke="#c9a24b"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
                <circle cx="150" cy="150" r="4" fill="#c9a24b" />
              </svg>
            </div>
          </div>
        </div>
        <div className="scrollcue">
          <span>Scroll</span>
          <div className="line" />
        </div>
      </section>

      <section className="story section-pad">
        <div className="wrap">
          <div className="eyebrow reveal">Two Craftsmen, One Case</div>
          <div className="story-grid">
            <div className="story-col reveal">
              <p>
                We asked a watchmaker in Le Locle to build a movement{" "}
                <em>thin enough to disappear.</em>
              </p>
            </div>
            <div className="story-col reveal">
              <p>
                We asked a perfumer in Grasse to build a scent <em>patient enough to last</em> until
                dinner.
              </p>
            </div>
          </div>
          <p className="story-note reveal">
            Neither had done this before. Neither particularly wanted to. It took four years, eleven
            prototypes, and one stubborn idea: that the most intimate object you own shouldn't only
            tell the time, it should leave a trace of you in every room you walk out of.
          </p>
        </div>
      </section>

      <section className="mech-outer" id="mechanism" ref={mechOuterRef}>
        <div className="mech-sticky">
          <div className="progress-rail">
            <div className="progress-fill" ref={progFillRef} />
          </div>
          <div className="wrap mech-grid">
            <div className="mech-copy">
              <div className="eyebrow">The Mechanism</div>
              <h3 className="mech-stage-title serif">{STAGES[stage].title}</h3>
              <p className="mech-stage-desc">{STAGES[stage].desc}</p>
              <div className="mech-stats">
                {STAGES[stage].stats.map(([v, l]) => (
                  <div className="mech-stat" key={l}>
                    <b>{v}</b>
                    <span>{l}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mech-visual">
              <div className="mech-zoom" ref={mechZoomRef}>
                <svg viewBox="0 0 300 300" overflow="visible">
                  <g className={fadeClass("gWrist")}>
                    <path
                      d="M-40 178 C 40 150, 260 150, 340 178 C 340 240, 300 300, 150 300 C 0 300, -40 240, -40 178 Z"
                      fill="#241a12"
                      stroke="#4a331f"
                      strokeWidth="1"
                    />
                    <path
                      d="M-40 178 C 40 150, 260 150, 340 178"
                      fill="none"
                      stroke="#5c4128"
                      strokeWidth="1"
                      opacity="0.6"
                    />
                  </g>

                  <g>
                    <path
                      d="M122 44 L108 20 L192 20 L178 44"
                      fill="#241a12"
                      stroke="#4a331f"
                      strokeWidth="1"
                    />
                    <path
                      d="M122 256 L108 280 L192 280 L178 256"
                      fill="#241a12"
                      stroke="#4a331f"
                      strokeWidth="1"
                    />
                    <circle
                      cx="150"
                      cy="150"
                      r="108"
                      fill="#151008"
                      stroke="#c9a24b"
                      strokeWidth="2"
                    />
                    <rect x="252" y="138" width="13" height="24" rx="3" fill="#c9a24b" />
                  </g>

                  <g className={fadeClass("gDial")}>
                    <circle cx="150" cy="150" r="92" fill="#0f0b06" />
                    <g stroke="#e8cf8a" strokeWidth="1.2" opacity="0.6">
                      <line x1="150" y1="66" x2="150" y2="80" />
                      <line x1="150" y1="220" x2="150" y2="234" />
                      <line x1="66" y1="150" x2="80" y2="150" />
                      <line x1="220" y1="150" x2="234" y2="150" />
                    </g>
                    <line
                      x1="150"
                      y1="150"
                      x2="150"
                      y2="100"
                      stroke="#f3ead9"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <line
                      x1="150"
                      y1="150"
                      x2="188"
                      y2="150"
                      stroke="#f3ead9"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                  </g>

                  <g className={fadeClass("gMovement")}>
                    <circle cx="150" cy="150" r="92" fill="#0d0904" />
                    <circle cx="150" cy="150" r="60" fill="none" stroke="#8a6a2f" strokeWidth="1" />
                    <circle cx="118" cy="130" r="16" fill="none" stroke="#c9a24b" strokeWidth="2" />
                    <circle cx="176" cy="122" r="10" fill="none" stroke="#c9a24b" strokeWidth="2" />
                    <circle cx="176" cy="178" r="13" fill="none" stroke="#c9a24b" strokeWidth="2" />
                    <circle cx="122" cy="180" r="9" fill="none" stroke="#c9a24b" strokeWidth="2" />
                    <g className="rotor">
                      <path
                        d="M150 150 L150 90 A60 60 0 0 1 202 180 Z"
                        fill="#c9a24b"
                        opacity="0.5"
                      />
                      <circle cx="150" cy="150" r="4" fill="#e8cf8a" />
                    </g>
                  </g>

                  <g className={fadeClass("gCaseback")}>
                    <circle cx="150" cy="150" r="92" fill="#0d0904" />
                    <circle
                      cx="150"
                      cy="150"
                      r="70"
                      fill="url(#sillageLiquidGrad)"
                      stroke="#8a6a2f"
                      strokeWidth="1"
                    />
                    <ellipse
                      className="liquid-shine"
                      cx="150"
                      cy="130"
                      rx="46"
                      ry="14"
                      fill="#e8cf8a"
                      opacity="0.18"
                    />
                    <circle
                      cx="150"
                      cy="150"
                      r="70"
                      fill="none"
                      stroke="#c9a24b"
                      strokeWidth="1.4"
                    />
                    <g opacity="0.9">
                      <circle
                        className="mote"
                        cx="120"
                        cy="110"
                        r="2.4"
                        fill="#e8cf8a"
                        style={{ animationDelay: "0s" }}
                      />
                      <circle
                        className="mote"
                        cx="150"
                        cy="100"
                        r="2"
                        fill="#e8cf8a"
                        style={{ animationDelay: ".8s" }}
                      />
                      <circle
                        className="mote"
                        cx="178"
                        cy="112"
                        r="2.6"
                        fill="#e8cf8a"
                        style={{ animationDelay: "1.6s" }}
                      />
                    </g>
                  </g>

                  <g className={fadeClass("gPulse")}>
                    <circle
                      className="pulse-ring"
                      cx="150"
                      cy="150"
                      r="30"
                      fill="none"
                      stroke="#c9a24b"
                      strokeWidth="1.5"
                    />
                    <g>
                      <circle
                        className="mote"
                        cx="128"
                        cy="46"
                        r="2.2"
                        fill="#e8cf8a"
                        style={{ animationDelay: "0s" }}
                      />
                      <circle
                        className="mote"
                        cx="150"
                        cy="30"
                        r="2.6"
                        fill="#e8cf8a"
                        style={{ animationDelay: ".7s" }}
                      />
                      <circle
                        className="mote"
                        cx="172"
                        cy="44"
                        r="2"
                        fill="#e8cf8a"
                        style={{ animationDelay: "1.4s" }}
                      />
                      <circle
                        className="mote"
                        cx="150"
                        cy="20"
                        r="1.8"
                        fill="#e8cf8a"
                        style={{ animationDelay: "2.1s" }}
                      />
                    </g>
                  </g>

                  <defs>
                    <radialGradient id="sillageLiquidGrad" cx="40%" cy="35%" r="70%">
                      <stop offset="0%" stopColor="#e0a94f" />
                      <stop offset="100%" stopColor="#96601f" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
              <div
                className={`callout${STAGES[stage].callout ? " show" : ""}`}
                style={{
                  position: "absolute",
                  fontSize: ".72rem",
                  color: "#e8cf8a",
                  letterSpacing: ".05em",
                  top: "6%",
                  right: "2%",
                  textAlign: "right",
                  maxWidth: 170,
                }}
              >
                {STAGES[stage].callout}
              </div>
            </div>
          </div>
          <div className="mech-index">{pad2(stage + 1)} / 05</div>
        </div>
      </section>

      <section className="points section-pad" id="points">
        <div className="wrap">
          <div className="eyebrow reveal">Why It's Different</div>
          <h2
            className="serif reveal"
            style={{
              fontSize: "clamp(1.8rem,3vw,2.6rem)",
              fontWeight: 400,
              maxWidth: "20ch",
              marginTop: "1rem",
            }}
          >
            Six reasons this isn't a gimmick.
          </h2>
          <div className="points-grid">
            {POINTS.map((pt) => (
              <div className="point reveal" key={pt.num}>
                <span className="num">{pt.num}</span>
                <h3 className="serif">{pt.title}</h3>
                <p>{pt.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="trail section-pad" id="trail">
        <div className="wrap">
          <div className="eyebrow reveal">The Trail</div>
          <h2
            className="serif reveal"
            style={{
              fontSize: "clamp(1.8rem,3vw,2.6rem)",
              fontWeight: 400,
              maxWidth: "22ch",
              marginTop: "1rem",
            }}
          >
            Three accords. Pick the one that arrives before you do.
          </h2>
          <div className="scent-tabs reveal">
            {(Object.keys(SCENTS) as ScentKey[]).map((key) => (
              <button
                key={key}
                className={`scent-tab${activeScent === key ? " active" : ""}`}
                style={{ "--dot": SCENTS[key].dot } as React.CSSProperties}
                onClick={() => setActiveScent(key)}
              >
                <span className="scent-dot" />
                {SCENTS[key].name}
              </button>
            ))}
          </div>
          <div className="scent-panel reveal">
            <div>
              <div className="scent-name serif" style={{ color: scent.dot }}>
                {scent.name}
              </div>
              <div className="notes-pyramid">
                <div>
                  <span>Top</span>
                  <span>{scent.top}</span>
                </div>
                <div>
                  <span>Heart</span>
                  <span>{scent.heart}</span>
                </div>
                <div>
                  <span>Base</span>
                  <span>{scent.base}</span>
                </div>
              </div>
            </div>
            <div>
              <div className="curve-title">Skin-warmed release — 8 hour curve</div>
              <div className="curve-wrap">
                <svg viewBox="0 0 400 160" className="curve-axis">
                  <line x1="0" y1="130" x2="400" y2="130" stroke="#3a2f22" />
                  <path className="curve-area" d={curveAreaD} style={{ fill: scent.dot }} />
                  <path
                    className={`curve-path${curveDrawn ? " drawn" : ""}`}
                    d={scent.curve}
                    style={{ stroke: scent.dot }}
                  />
                  <text x="0" y="150">
                    0h
                  </text>
                  <text x="185" y="150">
                    4h
                  </text>
                  <text x="385" y="150">
                    8h
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="craft section-pad" id="craft">
        <div className="wrap">
          <div className="eyebrow reveal" style={{ justifyContent: "center" }}>
            Craft &amp; Materials
          </div>
          <h2
            className="serif reveal"
            style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 400, marginTop: "1rem" }}
          >
            Slow, on purpose.
          </h2>
          <div className="craft-grid">
            <div className="craft-stat reveal">
              <b data-target="72">0</b>
              <span>Hours hand-finishing</span>
            </div>
            <div className="craft-stat reveal">
              <b data-target="0.6" data-decimal="1">
                0
              </b>
              <span>mm reservoir depth</span>
            </div>
            <div className="craft-stat reveal">
              <b data-target="42">0</b>
              <span>Hour power reserve</span>
            </div>
            <div className="craft-stat reveal">
              <b data-target="500">0</b>
              <span>Pieces, ever</span>
            </div>
          </div>
        </div>
      </section>

      <section className="reserve section-pad" id="reserve">
        <div className="wrap">
          <div className="eyebrow reveal" style={{ justifyContent: "center" }}>
            Reserve
          </div>
          <h2 className="serif reveal">
            Before the trail <em>runs out.</em>
          </h2>
          <div className="price-row reveal">
            <span className="price serif">$18,500</span>
            <span className="price-note">USD, incl. one cartridge</span>
          </div>
          <p className="scarcity reveal">
            318 of 500 remain — deposit refundable in full until your case is cast.
          </p>
          <div className="scarcity-bar reveal">
            <div className="scarcity-fill" ref={scarcityFillRef} />
          </div>
          <form className="reserve-form reveal" onSubmit={handleReserve}>
            <input
              type="email"
              placeholder="you@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="btn solid">
              Reserve — $500 deposit
            </button>
          </form>
          <div className="reserve-msg">{reserveMsg}</div>
        </div>
      </section>

      <section className="faq section-pad" id="faq">
        <div className="wrap">
          <div className="eyebrow reveal">Questions</div>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <div className={`faq-item${openFaq === i ? " open" : ""}`} key={f.q}>
                <button
                  className="faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  {f.q}
                  <span className="plus">+</span>
                </button>
                <div className="faq-a" style={{ maxHeight: openFaq === i ? "16rem" : 0 }}>
                  <p>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="footer-grid">
            <div className="logo">
              SILL<em>AGE</em>
            </div>
            <ul className="footer-links">
              <li>
                <a href="#mechanism">Mechanism</a>
              </li>
              <li>
                <a href="#trail">The Trail</a>
              </li>
              <li>
                <a href="#craft">Craft</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
            </ul>
          </div>
          <div className="footer-bottom">
            <span>
              Movement assembled in Le Locle, Switzerland. Accords composed in Grasse, France.
            </span>
            <span>© 2026 Sillage. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
