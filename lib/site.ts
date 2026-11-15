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
