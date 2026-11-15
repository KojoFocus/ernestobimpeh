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
};

// The line of milestones under your name on the home page. When something new happens,
// add a stop at the end; `now` always comes last.
export const path = [
  { year: "2012", label: "Taught maths and science" },
  { year: "2014", label: "Studied lab technology" },
  { year: "2016", label: "Started writing code" },
  { year: "2018", label: "Worked in testing labs" },
  { year: "2021", label: "Started keeping bees" },
  { year: "2025", label: "Founded Elementa" },
  { year: "2026", label: "Built PINN Ghana" },
];
export const now = {
  lines: ["Exploring what students'", "mistakes can tell us"],
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
