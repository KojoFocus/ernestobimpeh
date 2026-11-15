import { ImageResponse } from "next/og";
import { path, site } from "@/lib/site";

// The preview card shown when the site link is shared (email, LinkedIn, WhatsApp, X).
export const alt = `${site.name}, ${site.role.toLowerCase()} in ${site.location}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const paper = "#f3f6f6";
const ink = "#1c2a33";
const muted = "#5a6b73";
const burette = "#2f5d7c";
const rule = "#c3cfd3";

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
        <div style={{ display: "flex", flexDirection: "column", marginTop: 40 }}>
          <span style={{ fontSize: 120, fontWeight: 600, lineHeight: 1, letterSpacing: -5 }}>
            {site.name}
          </span>
          <span style={{ marginTop: 28, fontSize: 36, lineHeight: 1.3, color: muted }}>
            Laboratory scientist and software developer, {site.location}
          </span>
        </div>

        {/* The milestone line from the home page: solid dots, an open ring for now, then dashes. */}
        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <div style={{ display: "flex", position: "relative", alignItems: "center", height: 28 }}>
            <div style={{ position: "absolute", left: 10, right: 150, top: 12, height: 4, background: burette }} />
            <div
              style={{
                position: "absolute",
                right: 0,
                width: 140,
                top: 12,
                height: 4,
                backgroundImage: `linear-gradient(90deg, ${rule} 50%, transparent 50%)`,
                backgroundSize: "16px 4px",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", width: 916 }}>
              {[...path, null].map((p, i) => (
                <div
                  key={i}
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 999,
                    background: p ? burette : paper,
                    border: p ? "none" : `4px solid ${burette}`,
                  }}
                />
              ))}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", width: 938, marginTop: 14, marginLeft: -8 }}>
            {[...path.map((p) => p.year), "Now"].map((year, i) => (
              <span key={i} style={{ width: 44, textAlign: "center", fontSize: 22, color: year === "Now" ? burette : muted }}>
                {year}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}
