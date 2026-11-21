export const profile = {
  name: "Ariel John Bandilla",
  title: "Full Stack Developer",
  tagline:
    "I work with Laravel and React. At Telford Svc. Phils. Inc., I develop the company's inventory, attendance, recruitment, and HR systems.",
  location: "General Mariano Alvarez, Cavite, PH",
  email: "bandillaaj9@gmail.com",
  phone: "+63 956 364 9802",
  phoneHref: "+639563649802",
};

export const stats = [
  { value: "1,000+", label: "Daily active users served" },
  { value: "40%", label: "Faster API response time" },
  { value: "85%", label: "Test coverage (up from 40%)" },
  { value: "300+", label: "Applications processed daily" },
];

export const about = [
  "I'm a Full Stack Developer at Telford Svc. Phils. Inc., where I've worked since March 2025. My work is mostly company systems: inventory, biometric attendance, recruitment, and HR. I use Laravel for the back end and React for the front end.",
  "I finished my BS in Information Technology at Eastern Samar State University in 2024. I'm open to commission-based projects, and to companies that are hiring for more opportunities in web development.",
];

export const openTo = [
  {
    title: "Commission-based projects",
    text: "Websites, web apps, and company systems built to your requirements, on a per-project basis.",
  },
  {
    title: "Companies that are hiring",
    text: "Open to companies hiring for more opportunities in web development, where I can take on bigger projects and responsibilities.",
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
    company: "Telford Svc. Phils. Inc.",
    place: "Gen. Trias, Cavite",
    period: "March 2025 – Present",
    points: [
      "Built and shipped REST APIs in Laravel and Node.js serving 1,000+ daily active users, cutting average response time by 40%.",
      "Developed responsive front-end features in React and Tailwind CSS, increasing sign-up conversion by 25%.",
      "Wrote unit and integration tests, raising code coverage from 40% to 85% and reducing production bugs.",
    ],
  },
];

export const projects = [
  {
    name: "Store Portal",
    tag: "Inventory · 2025",
    stack: ["Laravel", "React"],
    desc: "Inventory management portal for company stock, stored items, and client-consigned materials.",
    points: [
      "Employee request system for work-related supplies and materials, with tracking of client-consigned items.",
      "Automated reports generated and sent to the company's clients from the Store Department.",
    ],
  },
  {
    name: "Daily Time Record",
    tag: "Attendance · 2025",
    stack: ["Laravel", "React", "ZKTeco", "SecuGen"],
    desc: "Real-time attendance monitoring integrated with ZKTeco biometric fingerprint devices.",
    points: [
      "SecuGen fingerprint scanners on production-line machines let operators record attendance right from their workstations.",
      "Automated HR attendance reports delivered to Finance for payroll processing.",
    ],
  },
  {
    name: "Telford Recruitment",
    tag: "Recruitment · 2026",
    stack: ["Laravel", "React"],
    desc: "Career and job-posting platform processing 300+ applications daily.",
    points: [
      "Deployed applicants sync automatically into the company's employee master list on a local server.",
    ],
    link: {
      label: "recruitment.telfordph.com",
      href: "https://recruitment.telfordph.com",
    },
  },
  {
    name: "Human Resource Information System",
    tag: "HR · 2026",
    stack: ["Laravel", "React"],
    desc: "HRIS for employee master list management with integrated Health Insurance and Life Insurance modules.",
    points: [
      "Automated HR reports generated and transmitted to the company's main site in Singapore.",
    ],
  },
];

export const education = {
  school: "Eastern Samar State University",
  place: "Borongan City",
  degree: "BS Information Technology",
  year: "2024",
  gwa: "1.77",
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
