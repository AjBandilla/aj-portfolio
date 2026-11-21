import { useEffect, useState } from "react";
import {
  profile,
  stats,
  about,
  skills,
  experience,
  projects,
  education,
  languages,
  openTo,
} from "./data.js";

const NAV = [
  ["about", "About"],
  ["skills", "Skills"],
  ["experience", "Experience"],
  ["projects", "Projects"],
  ["education", "Education"],
  ["contact", "Contact"],
];

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
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function Header() {
  const active = useActiveSection(["hero", ...NAV.map(([id]) => id)]);
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="container header-inner">
        <a href="#hero" className="brand">
          <span className="brand-mark">AJ</span>
          <span className="brand-name">Ariel John B.</span>
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
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="container hero-grid">
        <div>
          <p className="eyebrow mono">
            <span className="dot" /> Open for commissions and hiring
          </p>
          <h1>
            Hi, I'm <span className="grad">{profile.name}</span>.
          </h1>
          <h2 className="hero-role">{profile.title}</h2>
          <p className="lead">{profile.tagline}</p>
          <div className="cta">
            <a className="btn primary" href="#projects">
              View my work
            </a>
            <a className="btn ghost" href="#contact">
              Get in touch
            </a>
          </div>
        </div>
        <div className="code-card mono" aria-hidden="true">
          <div className="code-bar">
            <i /> <i /> <i />
            <span>developer.js</span>
          </div>
          <pre>
            <span className="c-k">const</span>{" "}
            <span className="c-v">ariel</span> = {"{"}
            {"\n  "}role: <span className="c-s">"Full Stack Developer"</span>,
            {"\n  "}stack: [<span className="c-s">"Laravel"</span>,{" "}
            <span className="c-s">"React"</span>,{"\n          "}
            <span className="c-s">"Node.js"</span>,{" "}
            <span className="c-s">"MySQL"</span>],
            {"\n  "}based: <span className="c-s">"Cavite, PH"</span>,{"\n  "}
            open: <span className="c-s">"commissions, hiring"</span>,{"\n"}
            {"}"};
          </pre>
        </div>
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

function Section({ id, label, title, children }) {
  return (
    <section id={id} className="section">
      <div className="container reveal">
        <p className="kicker mono">{label}</p>
        <h2 className="section-title">{title}</h2>
        {children}
      </div>
    </section>
  );
}

function About() {
  return (
    <Section id="about" label="01 / about" title="About me">
      <div className="about-grid">
        <div className="prose">
          {about.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="card info">
          <h3>Quick facts</h3>
          <ul className="facts">
            <li>
              <span>Location</span>
              {profile.location}
            </li>
            <li>
              <span>Currently</span>Full Stack Developer @ Telford Svc. Phils.
              Inc.
            </li>
            <li>
              <span>Languages</span>
              {languages.map((l) => l.name).join(", ")}
            </li>
            <li>
              <span>Open to</span>Commission work and full-time opportunities
            </li>
          </ul>
        </div>
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" label="02 / skills" title="Tools I work with">
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

function Experience() {
  return (
    <Section id="experience" label="03 / experience" title="Where I've worked">
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

function Projects() {
  return (
    <Section id="projects" label="04 / projects" title="Selected projects">
      <div className="projects-grid">
        {projects.map((p) => (
          <article className="card project" key={p.name}>
            <p className="tag mono">{p.tag}</p>
            <h3>{p.name}</h3>
            <p className="muted">{p.desc}</p>
            <ul className="bullets">
              {p.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
            <div className="chips small">
              {p.stack.map((s) => (
                <span className="chip" key={s}>
                  {s}
                </span>
              ))}
            </div>
            {p.link && (
              <a
                className="ext"
                href={p.link.href}
                target="_blank"
                rel="noreferrer"
              >
                {p.link.label} ↗
              </a>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}

function Education() {
  return (
    <Section id="education" label="05 / education" title="Education">
      <div className="edu-grid">
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
            GWA <strong>{education.gwa}</strong>
          </p>
          <div className="chips small">
            {education.courses.map((c) => (
              <span className="chip" key={c}>
                {c}
              </span>
            ))}
          </div>
        </div>
        <div className="card">
          <h3>Languages</h3>
          <ul className="lang">
            {languages.map((l) => (
              <li key={l.name}>
                <strong>{l.name}</strong>
                <span className="muted">{l.level}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="container reveal">
        <p className="kicker mono">06 / contact</p>
        <h2 className="section-title">Open for commissions and hiring</h2>
        <p className="lead narrow">
          If you have a project you need built, or your company is looking for a
          web developer, send me a message. Email or phone is the quickest way
          to reach me.
        </p>
        <div className="open-grid">
          {openTo.map((o) => (
            <div className="card" key={o.title}>
              <h3>{o.title}</h3>
              <p className="muted">{o.text}</p>
            </div>
          ))}
        </div>
        <div className="cta">
          <a className="btn primary" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <a className="btn ghost" href={`tel:${profile.phoneHref}`}>
            {profile.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  useReveal();
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container">
          © {new Date().getFullYear()} {profile.name}. Built with React.
        </div>
      </footer>
    </>
  );
}
