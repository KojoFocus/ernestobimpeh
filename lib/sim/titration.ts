/**
 * SIX MADE-UP STUDENTS AT ELEMENTA'S TITRATION BENCH.
 *
 * Nothing here comes from a real student. Each record was written by hand to
 * show the idea behind the research question, in the shape Elementa's own
 * bench log takes (elementa: lib/practicalActions compactLog, and the
 * "actions" download in lib/research/dictionary):
 *
 *   [seconds, stage, action, material, right, code, putRight, helpOpen]
 *
 * The stages, actions and mistake codes are the bench's own words. One
 * liberty: where Elementa notes the set-up faults found when a run begins in a
 * separate field, the sketch puts them in `code`, space separated.
 */

export type Row = [
  seconds: number,
  stage: string,
  action: string,
  material: string,
  right: 0 | 1,
  code: string,
  putRight: 0 | 1,
  helpOpen: 0 | 1,
];

export type Concept = [boolean, boolean, boolean, boolean];

export interface SimStudent {
  id: string;
  /** Mean of the accurate titres the student wrote down, cm³. */
  titre: number;
  log: Row[];
  /** Right or wrong on each of the four concept questions. */
  concept: Concept;
  /** What the steps show, in plain words. */
  steps: string;
  /** What the concept check shows. */
  ideas: string;
  /** What the two together might suggest. Always a possibility, never a diagnosis. */
  suggests: string;
}

/** The examiner's titre for this pair of solutions, cm³ (Elementa's default bench). */
export const EXAMINER_TITRE = 22.4;
/** Full accuracy marks within this distance of the examiner's titre, cm³. */
export const ACCURACY_BAND = 0.2;

export const QUESTIONS = [
  "The colour in the flask changes and stays. What has happened in the flask?",
  "Why rinse the burette with the acid after washing it with water?",
  "Why use methyl orange, not phenolphthalein, for hydrochloric acid against sodium carbonate?",
  "Where should your eye be when you read the burette?",
] as const;

export const CODE_WORDS: Record<string, string> = {
  ENDPOINT_OVERSHOT: "ran past the end point",
  ENDPOINT_SHORT: "stopped before the colour stayed",
  BURETTE_NOT_CONDITIONED: "burette not rinsed with the acid",
  AIR_BUBBLE_LEFT: "air left in the burette jet",
  PIPETTE_NOT_CONDITIONED: "pipette not rinsed with the solution",
  WRONG_INDICATOR: "an indicator that changes at the wrong point",
  READING_OFF: "titre written down differs from the burette",
};

const r = (
  seconds: number,
  stage: string,
  action: string,
  material = "",
  right: 0 | 1 = 1,
  code = "",
  putRight: 0 | 1 = 0,
  helpOpen: 0 | 1 = 0,
): Row => [seconds, stage, action, material, right, code, putRight, helpOpen];

/** A sound preparation of the burette and pipette, starting at `t` seconds. */
function soundSetup(t: number, pace = 1): Row[] {
  const s = (n: number) => Math.round(t + n * pace);
  return [
    r(s(0), "burette", "chose from the shelf", "A"),
    r(s(5), "burette", "poured into the burette", "A"),
    r(s(13), "burette", "poured into the burette", "A"),
    r(s(21), "pipette", "chose from the shelf", "B"),
    r(s(27), "pipette", "rinsed the pipette", "B"),
    r(s(35), "pipette", "drew up to the mark", "B"),
    r(s(42), "indicator", "chose from the shelf", "methyl orange"),
    r(s(46), "indicator", "added indicator", "methyl orange"),
  ];
}

/** One more run: a fresh aliquot, indicator, the titration, and where it was stopped. */
function run(
  t: number,
  length: number,
  stop: { right: 0 | 1; code?: string },
  opts: { indicator?: string; begin?: { right: 0 | 1; code: string }; help?: 0 | 1; pipette?: boolean } = {},
): Row[] {
  const ind = opts.indicator ?? "methyl orange";
  const help = opts.help ?? 0;
  const rows: Row[] = [];
  if (opts.pipette !== false) rows.push(r(t, "pipette", "drew up to the mark", "B", 1, "", 0, help));
  const indOk: 0 | 1 = ind === "methyl orange" ? 1 : 0;
  rows.push(r(t + 6, "indicator", "added indicator", ind, indOk, indOk ? "" : "WRONG_INDICATOR", 0, help));
  rows.push(r(t + 11, "titrate", "began the titration", "", opts.begin?.right ?? 1, opts.begin?.code ?? "", 0, help));
  rows.push(r(t + 11 + length, "titrate", "stopped and read the burette", "", stop.right, stop.code ?? "", 0, help));
  return rows;
}

const ok = { right: 1 as const };
const over = { right: 0 as const, code: "ENDPOINT_OVERSHOT" };
const short = { right: 0 as const, code: "ENDPOINT_SHORT" };

export const STUDENTS: SimStudent[] = [
  {
    id: "A",
    titre: 23.83,
    log: [
      ...soundSetup(6),
      r(58, "titrate", "began the titration"),
      r(97, "titrate", "stopped and read the burette"),
      ...run(118, 39, over),
      ...run(189, 38, over),
    ],
    concept: [false, false, false, true],
    steps:
      "Every step of the set-up right the first time, at a steady pace. Both accurate runs went past the end point, by about the same amount.",
    ideas: "Missed what the lasting colour means, why the burette is rinsed with the acid, and why methyl orange is used.",
    suggests:
      "A routine followed well without the reasons behind it. Help might start with what the colour change in the flask means.",
  },
  {
    id: "B",
    titre: 23.8,
    log: [
      ...soundSetup(9, 1.6),
      r(88, "titrate", "began the titration"),
      r(141, "titrate", "stopped and read the burette"),
      ...run(170, 52, short),
      ...run(262, 55, over, { help: 1 }),
      r(350, "burette", "poured into the burette", "A"),
      ...run(360, 55, over),
      ...run(455, 53, over),
    ],
    concept: [true, true, true, true],
    steps:
      "Set-up right, but five runs: stopped short once, then went well past the end point three times. Opened help during one run. The slowest of the six.",
    ideas: "All four questions right.",
    suggests:
      "The chemistry is understood. The difficulty may be controlling the tap close to the end point. Help might be practice going drop by drop.",
  },
  {
    id: "C",
    titre: 22.63,
    log: [
      r(7, "burette", "chose from the shelf", "water"),
      r(12, "burette", "poured into the burette", "water", 0, "BURETTE_NOT_CONDITIONED"),
      r(20, "burette", "chose from the shelf", "A"),
      r(25, "burette", "poured into the burette", "A"),
      r(34, "pipette", "chose from the shelf", "B"),
      r(40, "pipette", "rinsed the pipette", "B"),
      r(47, "pipette", "drew up to the mark", "B"),
      r(54, "indicator", "chose from the shelf", "methyl orange"),
      r(58, "indicator", "added indicator", "methyl orange"),
      r(63, "titrate", "began the titration", "", 0, "BURETTE_NOT_CONDITIONED AIR_BUBBLE_LEFT"),
      r(104, "titrate", "stopped and read the burette"),
      ...run(125, 40, ok, { begin: { right: 0, code: "BURETTE_NOT_CONDITIONED" } }),
      ...run(196, 39, ok, { begin: { right: 0, code: "BURETTE_NOT_CONDITIONED" } }),
    ],
    concept: [true, false, true, true],
    steps:
      "Filled the burette with acid after washing it with water, but never rinsed it with the acid first, and left air in the jet. End points judged well. The titres agree with each other but sit a little high.",
    ideas: "Missed only why the burette is rinsed with the acid.",
    suggests:
      "One step whose reason is missing. Help might be the reason for rinsing, more than more practice at the bench.",
  },
  {
    id: "D",
    titre: 11.25,
    log: [
      r(8, "burette", "chose from the shelf", "A"),
      r(13, "burette", "poured into the burette", "A"),
      r(21, "burette", "poured into the burette", "A"),
      r(29, "pipette", "chose from the shelf", "B"),
      r(35, "pipette", "rinsed the pipette", "B"),
      r(43, "pipette", "drew up to the mark", "B"),
      r(50, "indicator", "chose from the shelf", "phenolphthalein", 0),
      r(54, "indicator", "added indicator", "phenolphthalein", 0, "WRONG_INDICATOR"),
      r(60, "titrate", "began the titration", "", 0, "WRONG_INDICATOR"),
      r(84, "titrate", "stopped and read the burette"),
      ...run(104, 24, ok, { indicator: "phenolphthalein", begin: { right: 0, code: "WRONG_INDICATOR" } }),
      ...run(160, 23, ok, { indicator: "phenolphthalein", begin: { right: 0, code: "WRONG_INDICATOR" } }),
    ],
    concept: [true, true, false, true],
    steps:
      "Sound handling and end points judged well, but phenolphthalein was chosen. With sodium carbonate it changes when the carbonate is only half used up, so the titre came out at about half.",
    ideas: "Missed only the question on choosing the indicator.",
    suggests: "A gap in choosing an indicator for this pair of solutions, not in handling the apparatus.",
  },
  {
    id: "E",
    titre: 23.6,
    log: [
      ...soundSetup(7),
      r(59, "titrate", "began the titration"),
      r(98, "titrate", "stopped and read the burette"),
      ...run(119, 40, ok),
      r(178, "record", "wrote the titre", "", 0, "READING_OFF"),
      ...run(192, 39, ok),
      r(250, "record", "wrote the titre", "", 0, "READING_OFF"),
    ],
    concept: [true, true, true, true],
    steps:
      "Every step sound and both end points judged well, but twice the titre written down was not what the burette showed.",
    ideas: "All four questions right.",
    suggests: "A slip in reading or subtracting, not a gap in understanding. Help might be a habit of checking each reading.",
  },
  {
    id: "F",
    titre: 23.03,
    log: [
      r(10, "burette", "chose from the shelf", "water", 1, "", 0, 1),
      r(18, "burette", "poured into the burette", "water", 0, "BURETTE_NOT_CONDITIONED", 1, 1),
      r(31, "burette", "chose from the shelf", "A", 1, "", 0, 1),
      r(38, "burette", "poured into the burette", "A", 1, "", 0, 1),
      r(49, "burette", "poured into the burette", "A", 1, "", 0, 1),
      r(63, "pipette", "chose from the shelf", "water", 0, "", 0, 1),
      r(70, "pipette", "rinsed the pipette", "water", 0, "PIPETTE_NOT_CONDITIONED", 1, 1),
      r(82, "pipette", "chose from the shelf", "B", 1, "", 0, 1),
      r(90, "pipette", "rinsed the pipette", "B", 1, "", 0, 1),
      r(101, "pipette", "drew up to the mark", "B", 1, "", 0, 1),
      r(112, "indicator", "chose from the shelf", "methyl orange", 1, "", 0, 1),
      r(118, "indicator", "added indicator", "methyl orange", 1, "", 0, 1),
      r(125, "titrate", "began the titration", "", 1, "", 0, 1),
      r(170, "titrate", "stopped and read the burette", "", 1, "", 0, 1),
      ...run(196, 47, over),
      ...run(281, 47, over, { help: 1 }),
    ],
    concept: [true, false, false, true],
    steps:
      "Help open for most of the try. Two set-up mistakes were put right before they mattered, and both accurate runs went past the end point.",
    ideas: "Missed why the burette is rinsed with the acid, and why methyl orange is used.",
    suggests:
      "Progress with support that is not yet independent. Help might be a try with help only on request, then a look at the reasons for the set-up.",
  },
];

/** Share of recorded steps that were right the first time. */
export function rightFirstShare(s: SimStudent): number {
  return s.log.filter((row) => row[4] === 1).length / s.log.length;
}

export const conceptScore = (s: SimStudent) => s.concept.filter(Boolean).length;

/** Seconds as m:ss. */
export function clock(seconds: number): string {
  const m = Math.floor(seconds / 60);
  return `${m}:${String(seconds % 60).padStart(2, "0")}`;
}

/** Every student's record as one CSV, in the actions download's column order. */
export function toCSV(students: SimStudent[] = STUDENTS): string {
  const head = ["student", "order", "seconds", "stage", "action", "material", "right", "code", "putRight", "helpOpen"];
  const esc = (v: string | number) => (/[",\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : String(v));
  const lines = students.flatMap((s) =>
    s.log.map((row, i) => [s.id, i + 1, ...row].map(esc).join(",")),
  );
  return [head.join(","), ...lines].join("\n");
}
