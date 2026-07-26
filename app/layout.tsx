import type { Metadata } from "next";
import { Geist, Space_Grotesk } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const siteUrl = "https://raja-adnan-ahmed.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Raja Adnan Ahmed — Automation & AI Agent Builder",
  description:
    "Raja Adnan Ahmed builds AI agents, automation pipelines, and agentic products on top of solid React/Next.js frontend craft — from research dashboards to n8n workflow automation.",
  openGraph: {
    title: "Raja Adnan Ahmed — Automation & AI Agent Builder",
    description:
      "AI agents, automation pipelines, and agentic products, shipped with React/Next.js frontend craft.",
    url: siteUrl,
    siteName: "Raja Adnan Ahmed",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raja Adnan Ahmed — Automation & AI Agent Builder",
    description:
      "AI agents, automation pipelines, and agentic products, shipped with React/Next.js frontend craft.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${spaceGrotesk.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
