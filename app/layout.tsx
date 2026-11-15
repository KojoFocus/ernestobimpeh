import type { Metadata } from "next";
import "@fontsource-variable/schibsted-grotesk";
import "./globals.css";

const title = "Ernest Obimpeh";
const description =
  "Ernest Obimpeh is a laboratory scientist and software developer in Accra, Ghana. He builds Elementa, a virtual science lab for secondary school students, and PINN Ghana, a way to report road hazards.";

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
