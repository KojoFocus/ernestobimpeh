import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// The preview card shown when the site link is shared (email, LinkedIn, WhatsApp, X).
export const alt = `${site.name}: Same mistake. Same problem?`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const paper = "#f3f6f6";
const ink = "#1c2a33";
const muted = "#5a6b73";
const burette = "#2f5d7c";
const endpoint = "#c93a72";

// Static TTF of the site font. If the download fails, the image falls back to the default font.
async function loadFont(weight: number): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@${weight}`)
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    return await (await fetch(url)).arrayBuffer();
  } catch {
    return null;
  }
}

// A small version of the hero figure: two sequences that end in the same error.
const lanes: ("ok" | "retry" | "error")[][] = [
  ["ok", "ok", "ok", "ok", "ok", "error"],
  ["ok", "ok", "ok", "ok", "retry", "retry", "error"],
];

export default async function Image() {
  const [regular, semibold] = await Promise.all([loadFont(400), loadFont(600)]);
  const fonts = [
    ...(regular ? [{ name: "Schibsted Grotesk", data: regular, weight: 400 as const }] : []),
    ...(semibold ? [{ name: "Schibsted Grotesk", data: semibold, weight: 600 as const }] : []),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: paper,
          color: ink,
          fontFamily: fonts.length ? "Schibsted Grotesk" : undefined,
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: muted }}>
          <span style={{ color: ink, fontWeight: 600 }}>{site.name}</span>
          <span>, {site.location}</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 116,
            fontWeight: 600,
            lineHeight: 1.02,
            letterSpacing: -4,
          }}
        >
          <span>Same mistake.</span>
          <span>Same problem?</span>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 30, width: 560 }}>
            {lanes.map((steps, li) => (
              <div
                key={li}
                style={{
                  display: "flex",
                  position: "relative",
                  alignItems: "center",
                  justifyContent: "space-between",
                  height: 28,
                }}
              >
                <div
                  style={{ position: "absolute", left: 4, right: 4, top: 12, height: 4, background: burette }}
                />
                {steps.map((kind, i) => (
                  <div
                    key={i}
                    style={{
                      width: kind === "error" ? 28 : 20,
                      height: kind === "error" ? 28 : 20,
                      borderRadius: 999,
                      background: kind === "error" ? endpoint : kind === "retry" ? paper : burette,
                      border: kind === "retry" ? `4px solid ${burette}` : "none",
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
          <span style={{ fontSize: 28, color: muted }}>{site.role}</span>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}
