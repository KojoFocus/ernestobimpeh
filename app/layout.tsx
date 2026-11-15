import type { Metadata } from "next";
import "@fontsource-variable/schibsted-grotesk";
import "./globals.css";

const title = "Ernest Obimpeh | Research portfolio";
const description =
  "Ernest Obimpeh: laboratory scientist and developer in Accra, Ghana, working on interactive systems for learning and scientific reasoning.";

export const metadata: Metadata = {
  title,
  description,
  // The preview image comes from app/opengraph-image.tsx.
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* Browser extensions can inject body attributes before React hydrates. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
