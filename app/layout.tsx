import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { certifications, site } from "./data";
import "./globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Inter_Tight({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-display", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

const description =
  "Lead Data Engineer with 6+ years building cloud-native lakehouse platforms on AWS and Databricks — 200M+ records/day, 99.9% SLA, Spark optimization, dimensional modeling and team leadership.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} — ${site.role}`,
  description,
  keywords: [
    "Lead Data Engineer",
    "Senior Data Engineer",
    "Databricks",
    "Apache Spark",
    "PySpark",
    "AWS",
    "Delta Lake",
    "Data Platform",
    "Pronnoy Dutta",
  ],
  authors: [{ name: site.name, url: site.url }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: site.url,
    title: `${site.name} — ${site.role}`,
    description,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0d12" },
    { media: "(prefers-color-scheme: light)", color: "#f6f7f9" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Gurugram", addressCountry: "IN" },
  worksFor: { "@type": "Organization", name: "Axtria" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Bharati Vidyapeeth College of Engineering, Pune" },
  hasCredential: certifications.map((c) => ({
    "@type": "EducationalOccupationalCredential",
    name: `${c.issuer} ${c.name}`,
  })),
  knowsAbout: ["Databricks", "Apache Spark", "PySpark", "AWS", "Delta Lake", "Data Modeling", "Data Warehousing"],
  sameAs: Object.values(site.socials),
};

// Runs before paint: applies the saved theme and opts into motion, so there's no flash.
const bootScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')d.dataset.theme=t;}catch(e){}if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('motion');})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${sans.variable} ${display.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
