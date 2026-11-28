// ---------------------------------------------------------------
// EDIT THESE BEFORE DEPLOYING
// - EMPLOYER: real company name is shown ONLY in the Experience section.
//   To keep it generic, change it to "Manufacturing Company (name available on request)".
// - github / linkedin / resume: leave as "" to hide the button, or fill in.
//   For the resume, put resume.pdf inside the /public folder and use "/resume.pdf".
// ---------------------------------------------------------------
const EMPLOYER = "Telford Svc. Phils. Inc.";

export const profile = {
  name: "Ariel John Bandilla",
  title: "Full Stack Developer",
  tagline:
    "Laravel and React systems for business operations: inventory, attendance, recruitment, and HR, used by 1,000+ people daily.",
  location: "General Mariano Alvarez, Cavite, PH",
  email: "bandillaaj9@gmail.com",
  phone: "+63 956 364 9802",
  phoneHref: "+639563649802",
  github: "", // e.g. "https://github.com/your-username"
  linkedin: "", // e.g. "https://www.linkedin.com/in/your-username"
  resume: "", // e.g. "/resume.pdf"
};

export const stats = [
  { value: "1,000+", label: "People using my systems daily" },
  { value: "300+", label: "Job applications processed daily" },
  { value: "40%", label: "Faster API response time" },
  { value: "85%", label: "Test coverage, up from 40%" },
];

export const about = [
  "Most software gets demoed once. Mine gets used every day by 1,000+ people: clocking in, requesting supplies, getting hired, getting paid. I build the systems behind those everyday moments in Laravel and React, all the way down to the fingerprint scanner on the machine.",
  "I like work where software replaces something people do by hand again and again: a paper sign-in, a stock count, a report put together piece by piece. I finished my BS in Information Technology at Eastern Samar State University in 2024, and now I'm looking for a team to grow with, or a project I can own from first call to launch.",
];

// What a client or employer gets. Edit freely.
export const services = [
  {
    code: "S1",
    title: "Websites",
    text: "A fast, clean, mobile-friendly site for your business, brand, or portfolio, live on your own domain.",
    examples: [
      "Business and landing pages",
      "Portfolios and personal sites",
      "Hosting and deployment",
    ],
  },
  {
    code: "S2",
    title: "Custom web apps",
    text: "Dashboards, portals, and tools built around how you actually work, instead of forcing your process into someone else's software.",
    examples: [
      "Admin dashboards",
      "Staff and customer portals",
      "Tracking and management tools",
    ],
  },
  {
    code: "S3",
    title: "Automation and integrations",
    text: "Stop doing the same task by hand. Automatic reports, data syncing, and connections between your tools and devices.",
    examples: [
      "Automated reports",
      "Data import and export",
      "API and device integrations",
    ],
  },
];

export const process = [
  ["Brief", "You tell me the problem and who uses it."],
  ["Scope", "I confirm what gets built and what it costs."],
  ["Build", "Delivered in stages so you can react early."],
  ["Handover", "Deployed, tested, and explained."],
];

export const projectTypes = [
  "Business system",
  "Website",
  "Web app",
  "Job offers",
];

export const skills = [
  {
    group: "Languages",
    items: ["JavaScript", "TypeScript", "PHP", "HTML/CSS"],
  },
  {
    group: "Frameworks & Libraries",
    items: ["Laravel", "React", "Node.js", "Tailwind CSS"],
  },
  {
    group: "Data & APIs",
    items: ["MySQL", "RESTful APIs"],
  },
  {
    group: "Tooling & Deployment",
    items: ["Git", "Docker", "cPanel", "GoDaddy Hosting"],
  },
];

export const experience = [
  {
    role: "Full Stack Developer (Laravel with React)",
    company: EMPLOYER,
    place: "Cavite, PH",
    period: "March 2025 – Present",
    points: [
      "Built four connected internal systems (inventory, attendance, recruitment, HRIS) in Laravel and React, used by 1,000+ people daily.",
      "Shipped REST APIs in Laravel and Node.js, cutting average response time by 40%.",
      "Integrated ZKTeco biometric devices and SecuGen scanners so production-line operators record attendance at their own machines, with reports flowing to Finance for payroll.",
      "Wrote unit and integration tests, raising code coverage from 40% to 85% and reducing production bugs.",
    ],
  },
];

// Project names are generic on purpose. No company links, names, or screenshots.
export const projects = [
  {
    id: "WO-01",
    name: "Attendance Monitoring System",
    year: "2025",
    hook: "Operators clock in at the machine they run.",
    stack: ["Laravel", "React", "ZKTeco", "SecuGen"],
    desc: "Real-time attendance monitoring integrated with ZKTeco biometric fingerprint devices.",
    points: [
      "SecuGen fingerprint scanners on production-line machines let operators record attendance right from their workstations.",
      "Automated HR attendance reports delivered to Finance for payroll processing.",
    ],
  },
  {
    id: "WO-02",
    name: "Inventory Portal",
    year: "2025",
    hook: "Every item accounted for, including the client's.",
    stack: ["Laravel", "React"],
    desc: "Inventory management portal for company stock, stored items, and client-consigned materials.",
    points: [
      "Employee request system for work-related supplies and materials, with tracking of client-consigned items.",
      "Automated reports generated and sent to clients from the store department.",
    ],
  },
  {
    id: "WO-03",
    name: "Recruitment Platform",
    year: "2026",
    link: "https://recruitment.telfordph.com",
    hook: "300+ applications a day, straight into the employee list.",
    stack: ["Laravel", "React"],
    desc: "Career and job-posting platform processing 300+ applications daily.",
    points: [
      "Hired applicants sync automatically into the employee master list on a local server.",
    ],
  },
  {
    id: "WO-04",
    name: "Human Resource Information System",
    year: "2026",
    hook: "One master list, with insurance and reports built in.",
    stack: ["Laravel", "React"],
    desc: "HRIS for employee master list management with integrated Health Insurance and Life Insurance modules.",
    points: [
      "Automated HR reports generated and sent to the company's head office.",
    ],
  },
  {
    id: "WO-05",
    name: "Performance Appraisal System",
    year: "", // add the year you delivered it, e.g. "2026"
    hook: "Appraisal results flow straight into payroll changes.",
    stack: ["Laravel", "React"], // check this matches what you used
    desc: "Performance appraisal system with an integrated payroll change notice.",
    points: [
      "Appraisal outcomes feed the payroll change notice, so pay updates follow the evaluation.",
      // Add 1-2 real details here: who uses it, how many employees, what it replaced.
    ],
  },
];

export const education = {
  school: "Eastern Samar State University",
  place: "Borongan City",
  degree: "BS Information Technology",
  year: "2024",
  gwa: "1.77",
  gwaNote: "(1.00 is the highest grade)",
  courses: [
    "Data Structures & Algorithms",
    "Software Engineering",
    "Operating Systems",
    "Database Systems",
    "Web Development",
  ],
};

export const whyMe = [
  "My systems are in daily use by 1,000+ people, not left as demos.",
  "I connect software to real devices like fingerprint scanners, not just screens.",
  "I test what I ship: coverage raised from 40% to 85%.",
  "Reports go out automatically, so nobody rebuilds them by hand.",
];
