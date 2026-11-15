// Edit your details here. Links left empty are hidden on the page.
export const site = {
  name: "Ernest Obimpeh",
  role: "Laboratory scientist and developer",
  location: "Accra, Ghana",
  email: "ernestobimpeh9@gmail.com",
  links: {
    elementa: "https://elementalabsafrica.com",
    pinn: "https://pinnghana.com",
    github: "https://github.com/KojoFocus",
    // To update the CV, replace public/ernest-obimpeh-cv.pdf (same name) and redeploy.
    cv: "/ernest-obimpeh-cv.pdf",
  },
  supervisor: "Samira Aggor-Woananu",
  // Shown at the bottom of the page. Change it whenever you update the site.
  updated: "November 2026",
};

// The line of milestones under your name on the home page. When something new happens,
// add a stop before `now`. `href` (optional) jumps to the part of the page that tells that
// story; stops without one are plain text. Keep it to about nine stops so the labels fit.
export const path: { year: string; label: string; href?: string }[] = [
  { year: "2012", label: "Taught maths and science" },
  { year: "2014", label: "Studied lab technology", href: "#ucc" },
  { year: "2016", label: "Got into computing", href: "#ucc" },
  { year: "2018", label: "Worked in a hospital lab", href: "#labs" },
  { year: "2021", label: "Started keeping bees", href: "#labs" },
  { year: "2025", label: "Founded Elementa", href: "#elementa" },
  { year: "2026", label: "Built PINN Ghana", href: "#pinn" },
];
export const now = {
  label: "Exploring what students' mistakes can tell us",
  href: "#research",
};

// Elementa usage snapshot. The live numbers keep moving, so treat this as a dated snapshot:
// refresh it from the Elementa dashboard when you update your CV, and change `asOf` with it.
export const elementa = {
  asOf: "November 2026",
  students: 81,
  teachers: 15,
  // Sessions in the five most-used practicals.
  sessions: [
    { practical: "Acid-base titration", count: 346 },
    { practical: "Microscope familiarization", count: 326 },
    { practical: "Onion cell microscopy", count: 228 },
    { practical: "Simple pendulum", count: 104 },
    { practical: "Stomata", count: 72 },
  ],
};

// Screenshots. Files live in public/; width and height are the image's pixel size.
export type Shot = { src: string; width: number; height: number; caption: string; alt: string };

export const shots: Record<"elementa" | "pinn", Shot[]> = {
  elementa: [
    {
      src: "/elementa/titration.png",
      width: 1198,
      height: 637,
      caption: "Titration bench",
      alt: "Elementa's titration bench: a burette clamped to a retort stand above a waste beaker, beside a bottle of hydrochloric acid of unknown concentration.",
    },
    {
      src: "/elementa/pendulum.png",
      width: 1186,
      height: 649,
      caption: "Simple pendulum",
      alt: "Simple pendulum set-up: a bob hanging from a split cork, with a metre rule beside it, level with the cork at zero and with the bob's centre near 90.",
    },
    {
      src: "/elementa/microscope.png",
      width: 1191,
      height: 625,
      caption: "Microscope, and the view through it at ×400",
      alt: "A light microscope beside the view through the eyepiece at ×400, showing a cell, with a prompt asking the student to draw it.",
    },
  ],
  pinn: [
    {
      src: "/pinn/map.png",
      width: 418,
      height: 742,
      caption: "Hazards near you",
      alt: "PINN's map of central Accra with the user's position, and a list of nearby hazards below it, each marked by severity, type and distance.",
    },
    {
      src: "/pinn/report.png",
      width: 417,
      height: 742,
      caption: "Reporting a hazard",
      alt: "The report screen asks 'What did you see?' with options: pothole, flood, accident, debris, broken light, road block and other.",
    },
    {
      src: "/pinn/dashboard.png",
      width: 416,
      height: 736,
      caption: "Dashboard",
      alt: "PINN's dashboard: 79 active hazards, 5 critical, 0 fixed recently, 9 confirmed, with breakdowns by type (mostly potholes) and by severity.",
    },
  ],
};
