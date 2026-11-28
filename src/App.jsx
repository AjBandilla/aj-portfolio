import { useEffect, useState } from "react";
import {
  profile,
  stats,
  about,
  services,
  process,
  projectTypes,
  skills,
  experience,
  projects,
  education,
  whyMe,
} from "./data.js";

// "Stats" is no longer a nav tab: the live counters sit at the right of the header.
const NAV = [
  ["work", "Work"],
  ["services", "Services"],
  ["experience", "Experience"],
  ["stack", "Stack"],
  ["about", "About"],
  ["contact", "Contact"],
];

const SECTION_IDS = ["hero", ...NAV.map(([id]) => id)];

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

function useReveal() {
  useEffect(() => {
    document.documentElement.classList.add("js");
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.1 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// Live Philippine time, shown in the header like a shift clock.
function useManilaTime() {
  const fmt = () =>
    new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Manila",
    }).format(new Date());
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const t = setInterval(() => setTime(fmt()), 15000);
    return () => clearInterval(t);
  }, []);
  return time;
}

// Counts this visit (once per browser session) and loads the live counters.
// If the database isn't connected, `ready` stays false and the counters stay hidden.
function useLiveStats() {
  const [live, setLive] = useState({ ready: false });
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("aj-visit") === "1";
    } catch {
      /* storage blocked: treat as a new visit */
    }
    fetch("/api/stats", { method: seen ? "GET" : "POST" })
      .then((r) => r.json())
      .then((d) => {
        if (!d.ready) return;
        setLive(d);
        try {
          sessionStorage.setItem("aj-visit", "1");
        } catch {
          /* ignore */
        }
      })
      .catch(() => {});
  }, []);
  return live;
}

function Header() {
  const active = useActiveSection(SECTION_IDS);
  const time = useManilaTime();
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="container header-inner">
        <a href="#hero" className="brand">
          <span className="brand-mark">AJ</span>
          <span className="brand-name">Ariel John Bandilla</span>
        </a>
        <button
          className="menu-btn"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
        <nav className={`nav ${open ? "open" : ""}`}>
          {NAV.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="clock mono" title="Local time in the Philippines">
          <span className="led" /> PH {time}
        </div>
      </div>
    </header>
  );
}

function SocialLinks() {
  const links = [
    profile.github && ["GitHub", profile.github],
    profile.linkedin && ["LinkedIn", profile.linkedin],
  ].filter(Boolean);
  if (links.length === 0) return null;
  return (
    <div className="social">
      {links.map(([label, href]) => (
        <a key={label} href={href} target="_blank" rel="noreferrer">
          {label} ↗
        </a>
      ))}
    </div>
  );
}

// Three real data flows from the projects. Dots travel along each link.
const LANES = [
  {
    nodes: [
      ["Scanners", "SecuGen · ZKTeco"],
      ["Attendance", "Real-time"],
      ["Finance", "Payroll reports"],
    ],
  },
  {
    nodes: [
      ["Recruitment", "300+ apps/day"],
      ["HRIS", "Master list"],
      ["Head office", "Auto reports"],
    ],
  },
  {
    nodes: [
      ["Staff", "Supply requests"],
      ["Inventory", "Stock + consigned"],
      ["Clients", "Auto reports"],
    ],
  },
];

const NODE_W = 140;
const NODE_H = 60;
const GAP = 50;
const LANE_STEP = 100;

function SystemMap() {
  return (
    <div className="map-card" aria-label="Diagram of how my systems connect">
      <div className="map-bar mono">
        <span>
          <span className="led" /> system-map
        </span>
        <span>3 flows · live</span>
      </div>
      <svg viewBox="0 0 520 280" role="img" aria-hidden="true">
        {LANES.map((lane, li) => {
          const y = 8 + li * LANE_STEP;
          return (
            <g key={li}>
              {lane.nodes.map(([title, sub], ni) => {
                const x = ni * (NODE_W + GAP);
                return (
                  <g key={title}>
                    <rect
                      className="node"
                      x={x}
                      y={y}
                      width={NODE_W}
                      height={NODE_H}
                      rx="4"
                    />
                    <text className="node-t" x={x + 12} y={y + 26}>
                      {title}
                    </text>
                    <text className="node-s" x={x + 12} y={y + 45}>
                      {sub}
                    </text>
                    {ni < lane.nodes.length - 1 && (
                      <g>
                        <line
                          className="link"
                          x1={x + NODE_W}
                          y1={y + NODE_H / 2}
                          x2={x + NODE_W + GAP}
                          y2={y + NODE_H / 2}
                        />
                        <circle
                          className="dot-move"
                          cx={x + NODE_W}
                          cy={y + NODE_H / 2}
                          r="4"
                          style={{ animationDelay: `${(li + ni) * 0.45}s` }}
                        />
                      </g>
                    )}
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="container hero-grid">
        <div>
          <p className="status mono">
            <span className="led" /> Available · full-time roles and commissions
          </p>
          <h1>
            I build the software that keeps a{" "}
            <span className="mark">business</span> running.
          </h1>
          <p className="lead">{profile.tagline}</p>
          <div className="cta">
            <a className="btn primary" href="#work">
              See the systems
            </a>
            <a className="btn ghost" href="#contact">
              Open a work order
            </a>
            {profile.resume && (
              <a
                className="btn ghost"
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
              >
                Resume
              </a>
            )}
          </div>
          <SocialLinks />
        </div>
        <SystemMap />
      </div>
      <div className="container stats">
        {stats.map((s) => (
          <div className="stat" key={s.label}>
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Section({ id, label, title, hidden, children }) {
  return (
    <section id={id} className="section" hidden={hidden}>
      <div className="container reveal">
        <p className="kicker mono">{label}</p>
        <h2 className="section-title">{title}</h2>
        {children}
      </div>
    </section>
  );
}

function Work() {
  return (
    <Section id="work" label="01 / work orders" title="Systems I've shipped">
      <div className="projects-grid">
        {projects.map((p, i) => (
          <article
            className={`card project ${i === 0 ? "feature" : ""}`}
            key={p.id}
          >
            <div className="wo-head mono">
              <span>{p.id}</span>
              <span className="pill">
                <span className="led" /> In production
                {p.year ? ` · ${p.year}` : ""}
              </span>
            </div>
            <h3>{p.name}</h3>
            <p className="hook">{p.hook}</p>
            <p className="muted">{p.desc}</p>
            <ul className="bullets">
              {p.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
            <div className="chips">
              {p.stack.map((s) => (
                <span className="chip" key={s}>
                  {s}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Services() {
  return (
    <Section
      id="services"
      label="02 / for clients"
      title="What I can build for your business"
    >
      <div className="services-grid">
        {services.map((s) => (
          <div className="card service" key={s.code}>
            <span className="code mono">{s.code}</span>
            <h3>{s.title}</h3>
            <p className="muted">{s.text}</p>
            <ul className="bullets">
              {s.examples.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <ol className="process">
        {process.map(([step, text], i) => (
          <li key={step}>
            <span className="mono">0{i + 1}</span>
            <strong>{step}</strong>
            <p>{text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" label="03 / log" title="Where I've worked">
      <div className="timeline">
        {experience.map((job) => (
          <article className="job card" key={job.company}>
            <div className="job-head">
              <div>
                <h3>{job.role}</h3>
                <p className="muted">
                  {job.company} · {job.place}
                </p>
              </div>
              <span className="period mono">{job.period}</span>
            </div>
            <ul className="bullets">
              {job.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Stack() {
  return (
    <Section id="stack" label="04 / toolbox" title="Tools I work with">
      <div className="skills-grid">
        {skills.map((g) => (
          <div className="card" key={g.group}>
            <h3>{g.group}</h3>
            <div className="chips">
              {g.items.map((i) => (
                <span className="chip" key={i}>
                  {i}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function About() {
  return (
    <Section id="about" label="05 / about" title="Who's behind the systems">
      <div className="about-grid">
        <div className="prose">
          {about.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p className="muted small mono">Based in {profile.location}</p>
        </div>
        <div className="stack-col">
          <div className="card">
            <div className="job-head">
              <div>
                <h3>{education.degree}</h3>
                <p className="muted">
                  {education.school} · {education.place}
                </p>
              </div>
              <span className="period mono">{education.year}</span>
            </div>
            <p className="gwa">
              GWA <strong>{education.gwa}</strong>{" "}
              <span className="muted small">{education.gwaNote}</span>
            </p>
          </div>
          <div className="card">
            <h3>Why work with me</h3>
            <ul className="bullets">
              {whyMe.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}

// Full counters section. The header pill links here (#stats).
function LiveStats({ live }) {
  const items = [
    ["Visits", live.visits, "People who opened this site"],
    ["Project requests", live.projects, "Websites, web apps, business systems"],
    ["Job offers", live.jobs, "Messages about full-time roles"],
  ];
  return (
    <Section
      id="stats"
      label="06 / live"
      title="Live counters"
      hidden={!live.ready}
    >
      <div className="counters">
        {items.map(([label, value, note]) => (
          <div className="card counter" key={label}>
            <p className="mono label">
              <span className="led" /> {label}
            </p>
            <strong>{(value ?? 0).toLocaleString()}</strong>
            <span className="muted small">{note}</span>
          </div>
        ))}
      </div>
      <p className="muted small mono counters-note">
        Updates automatically. Counted since this site went live.
      </p>
    </Section>
  );
}

// Floating side panel on the right edge. Open on wide screens, a slim tab
// on narrower ones so it never covers the content. Click to expand/collapse.
function FloatingStats({ live }) {
  const [open, setOpen] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= 1500,
  );
  if (!live.ready) return null;

  const rows = [
    ["Visits", live.visits],
    ["Projects", live.projects],
    ["Job offers", live.jobs],
  ];

  if (!open) {
    return (
      <button
        type="button"
        className="float-tab mono"
        onClick={() => setOpen(true)}
        aria-label="Show live counters"
      >
        <span className="led" />
        <strong>{(live.visits ?? 0).toLocaleString()}</strong>
        <span className="float-tab-label">visits</span>
      </button>
    );
  }

  return (
    <aside className="float-stats" aria-label="Live site counters">
      <div className="float-head mono">
        <span>
          <span className="led" /> live
        </span>
        <button
          type="button"
          className="float-close"
          onClick={() => setOpen(false)}
          aria-label="Hide live counters"
        >
          ×
        </button>
      </div>
      <ul className="float-rows">
        {rows.map(([label, value]) => (
          <li key={label}>
            <strong>{(value ?? 0).toLocaleString()}</strong>
            <span className="mono">{label}</span>
          </li>
        ))}
      </ul>
      <p className="float-note mono">Updates automatically</p>
    </aside>
  );
}

const EMPTY_FORM = { name: "", email: "", message: "", company: "" };

// Sends the message to /api/contact (a Vercel serverless function).
// "company" is a hidden honeypot field: real people never fill it in.
function Contact() {
  const [type, setType] = useState(projectTypes[0]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  async function onSubmit(e) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      setForm(EMPTY_FORM);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section contact">
      <div className="container reveal">
        <p className="kicker mono">07 / contact</p>
        <h2 className="section-title">Open a work order</h2>
        <p className="lead">
          Hiring, or have something that needs building? Tell me what it is and
          I'll reply with questions or a quote.
        </p>
        <form className="order card" onSubmit={onSubmit}>
          <p className="mono label">1 · What is it?</p>
          <div className="types" role="radiogroup" aria-label="Project type">
            {projectTypes.map((t) => (
              <button
                key={t}
                type="button"
                role="radio"
                aria-checked={type === t}
                className={`type ${type === t ? "on" : ""}`}
                onClick={() => setType(t)}
              >
                {t}
              </button>
            ))}
          </div>

          <p className="mono label">2 · Who are you?</p>
          <div className="fields">
            <input
              type="text"
              name="name"
              placeholder="Your name"
              autoComplete="name"
              required
              maxLength={100}
              value={form.name}
              onChange={set("name")}
              aria-label="Your name"
            />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              autoComplete="email"
              required
              maxLength={200}
              value={form.email}
              onChange={set("email")}
              aria-label="Your email"
            />
          </div>

          <p className="mono label">3 · What should it do?</p>
          <textarea
            name="message"
            rows={5}
            required
            minLength={10}
            maxLength={3000}
            value={form.message}
            onChange={set("message")}
            aria-label="Your message"
            placeholder="e.g. We track attendance on paper and want fingerprint scanners connected to payroll."
          />

          <input
            className="hp"
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={form.company}
            onChange={set("company")}
          />

          <button
            className="btn primary"
            type="submit"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending…" : "Send work order →"}
          </button>

          <div aria-live="polite">
            {status === "sent" && (
              <p className="notice ok" role="status">
                Work order sent. I'll reply to your email soon.
              </p>
            )}
            {status === "error" && (
              <p className="notice err" role="alert">
                Something went wrong sending that. Please email{" "}
                <a className="ul" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>{" "}
                instead.
              </p>
            )}
          </div>

          <p className="muted small">
            Prefer email or a call?{" "}
            <a className="ul" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>{" "}
            ·{" "}
            <a className="ul" href={`tel:${profile.phoneHref}`}>
              {profile.phone}
            </a>
          </p>
        </form>
        <SocialLinks />
      </div>
    </section>
  );
}

export default function App() {
  useReveal();
  const live = useLiveStats();
  return (
    <>
      <Header />
      <FloatingStats live={live} />
      <main>
        <Hero />
        <div className="hazard" aria-hidden="true" />
        <Work />
        <Services />
        <Experience />
        <Stack />
        <About />
        <LiveStats live={live} />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container">
          © {new Date().getFullYear()} {profile.name} · Built with React
        </div>
      </footer>
    </>
  );
}
