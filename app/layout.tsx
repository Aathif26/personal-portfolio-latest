import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const clashDisplay = localFont({
  src: [
    { path: "../public/fonts/ClashDisplay-Extralight.otf", weight: "200" },
    { path: "../public/fonts/ClashDisplay-Light.otf", weight: "300" },
    { path: "../public/fonts/ClashDisplay-Regular.otf", weight: "400" },
    { path: "../public/fonts/ClashDisplay-Medium.otf", weight: "500" },
    { path: "../public/fonts/ClashDisplay-Semibold.otf", weight: "600" },
    { path: "../public/fonts/ClashDisplay-Bold.otf", weight: "700" },
  ],
  variable: "--font-clash",
  display: "swap",
});

const montserrat = localFont({
  src: [
    { path: "../public/fonts/Montserrat-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/Montserrat-Italic.ttf", weight: "400", style: "italic" },
    { path: "../public/fonts/Montserrat-Medium.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/Montserrat-MediumItalic.ttf", weight: "500", style: "italic" },
    { path: "../public/fonts/Montserrat-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../public/fonts/Montserrat-SemiBoldItalic.ttf", weight: "600", style: "italic" },
    { path: "../public/fonts/Montserrat-Bold.ttf", weight: "700", style: "normal" },
    { path: "../public/fonts/Montserrat-BoldItalic.ttf", weight: "700", style: "italic" },
  ],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alex Chen — AI Engineer & Full-Stack Architect",
  description:
    "Staff-level AI engineer and full-stack architect specializing in LLM infrastructure, ML pipelines, and high-performance web platforms. Building intelligent systems at the intersection of AI and scalable architecture.",
  keywords: [
    "AI Engineer",
    "Full-Stack Architect",
    "Machine Learning",
    "LLM Infrastructure",
    "Next.js Developer",
    "Staff Engineer",
    "System Design",
    "Python",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Alex Chen" }],
  openGraph: {
    title: "Alex Chen — AI Engineer & Full-Stack Architect",
    description:
      "Building intelligent systems at the intersection of AI and scalable architecture.",
    type: "website",
    locale: "en_US",
    siteName: "Alex Chen Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Chen — AI Engineer & Full-Stack Architect",
    description:
      "Building intelligent systems at the intersection of AI and scalable architecture.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import ThemeToggle from "@/components/ui/ThemeToggle";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { AdminProvider } from "@/components/providers/AdminProvider";
import AdminToolbar from "@/components/admin/AdminToolbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: "Alex Chen",
        jobTitle: "AI Engineer & Full-Stack Architect",
        url: "https://alexchen.dev",
        sameAs: [
          "https://github.com",
          "https://linkedin.com",
          "https://twitter.com",
        ],
        knowsAbout: [
          "Artificial Intelligence",
          "Machine Learning",
          "Full-Stack Development",
          "System Design",
          "LLM Infrastructure",
        ],
      },
      {
        "@type": "WebSite",
        name: "Alex Chen Portfolio",
        url: "https://alexchen.dev",
      },
    ],
  };

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Theme initialization — prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${clashDisplay.variable} ${montserrat.variable} antialiased`}>
        <AdminProvider>
          <SmoothScroll>
            {children}
            <ThemeToggle />
            {/* <AdminToolbar /> */}
          </SmoothScroll>
        </AdminProvider>
      </body>
    </html>
  );
}
