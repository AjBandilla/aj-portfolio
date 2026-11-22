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
    "I build Laravel and React web systems for business operations: inventory, attendance, recruitment, and HR, used by 1,000+ people daily.",
  location: "General Mariano Alvarez, Cavite, PH",
  email: "bandillaaj9@gmail.com",
  phone: "+63 956 364 9802",
  phoneHref: "+639563649802",
  github: "", // e.g. "https://github.com/your-username"
  linkedin: "", // e.g. "https://www.linkedin.com/in/your-username"
  resume: "", // e.g. "/resume.pdf"
};

export const stats = [
  { value: "1,000+", label: "Daily active users served" },
  { value: "40%", label: "Faster API response time" },
  { value: "85%", label: "Test coverage (up from 40%)" },
  { value: "300+", label: "Applications processed daily" },
];

export const about = [
  "I'm a Full Stack Developer working on internal business systems for a manufacturing company in Cavite: inventory, biometric attendance, recruitment, and HR. I use Laravel for the back end and React for the front end.",
  "I finished my BS in Information Technology at Eastern Samar State University in 2024. I'm open to full-time roles and commission-based projects in web development.",
];

export const openTo = [
  {
    title: "Full-time roles",
    text: "Looking for a team where I can take on bigger projects and more responsibility in web development.",
  },
  {
    title: "Commission-based projects",
    text: "Websites, web apps, and business systems built to your requirements, on a per-project basis.",
  },
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
      "Built and shipped REST APIs in Laravel and Node.js serving 1,000+ daily active users, cutting average response time by 40%.",
      "Developed responsive front-end features in React and Tailwind CSS, increasing sign-up conversion by 25%.",
      "Wrote unit and integration tests, raising code coverage from 40% to 85% and reducing production bugs.",
    ],
  },
];

// Project names are generic on purpose. No company links, names, or screenshots.
export const projects = [
  {
    name: "Inventory Portal",
    tag: "Inventory · 2025",
    stack: ["Laravel", "React"],
    desc: "Inventory management portal for company stock, stored items, and client-consigned materials.",
    points: [
      "Employee request system for work-related supplies and materials, with tracking of client-consigned items.",
      "Automated reports generated and sent to clients from the store department.",
    ],
  },
  {
    name: "Attendance Monitoring System",
    tag: "Attendance · 2025",
    stack: ["Laravel", "React", "ZKTeco", "SecuGen"],
    desc: "Real-time attendance monitoring integrated with ZKTeco biometric fingerprint devices.",
    points: [
      "SecuGen fingerprint scanners on production-line machines let operators record attendance right from their workstations.",
      "Automated HR attendance reports delivered to Finance for payroll processing.",
    ],
  },
  {
    name: "Recruitment Platform",
    tag: "Recruitment · 2026",
    stack: ["Laravel", "React"],
    desc: "Career and job-posting platform processing 300+ applications daily.",
    points: [
      "Hired applicants sync automatically into the employee master list on a local server.",
    ],
  },
  {
    name: "Human Resource Information System",
    tag: "HR · 2026",
    stack: ["Laravel", "React"],
    desc: "HRIS for employee master list management with integrated Health Insurance and Life Insurance modules.",
    points: [
      "Automated HR reports generated and sent to the company's head office.",
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

export const languages = [
  { name: "Waray-Waray", level: "Native" },
  { name: "Filipino (Tagalog)", level: "Fluent" },
  { name: "English", level: "Professional working proficiency" },
];
