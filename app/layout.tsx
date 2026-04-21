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
  metadataBase: new URL("https://aathifb.dev"),
  title: {
    default: "Aathif B — Full-Stack & AI Developer | React, Next.js, TypeScript, FastAPI",
    template: "%s | Aathif B — Full-Stack & AI Developer",
  },
  description:
    "Full-Stack & AI Developer with 2+ years building scalable apps using React.js, Next.js, TypeScript, and FastAPI. Expert in LLM integration, AWS, and CI/CD.",
  keywords: [
    "Aathif B",
    "Full-Stack Developer",
    "AI Developer",
    "React.js Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Python FastAPI",
    "LLM Integration",
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Web Application Developer",
    "AI Engineer",
    "Machine Learning",
    "OpenAI API",
    "Docker",
    "AWS Developer",
    "CI/CD",
    "Portfolio",
    "India Developer",
  ],
  authors: [{ name: "Aathif B", url: "https://aathifb.dev" }],
  creator: "Aathif B",
  applicationName: "Aathif B Portfolio",
  category: "technology",
  openGraph: {
    title: "Aathif B — Full-Stack & AI Developer | React, Next.js, TypeScript, FastAPI",
    description:
      "Aathif B — Full-Stack & AI Developer. Building scalable web apps and LLM-powered products with React.js, Next.js, FastAPI, Docker, and AWS.",
    type: "website",
    locale: "en_US",
    siteName: "Aathif B — Developer Portfolio",
    url: "https://aathifb.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aathif B — Full-Stack & AI Developer",
    description:
      "Building scalable web apps and AI-powered features using React.js, Next.js, TypeScript, FastAPI, and LLM APIs.",
    creator: "@aathifb",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://aathifb.dev",
  },
};

import ThemeToggle from "@/components/ui/ThemeToggle";
import SmoothScroll from "@/components/providers/SmoothScroll";

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
        name: "Aathif B",
        url: "https://aathifb.dev",
        jobTitle: "Full-Stack & AI Developer",
        description:
          "Full-Stack & AI Developer with 2+ years building production apps using React.js, Next.js, TypeScript, and FastAPI. Skilled in LLM integration, Docker, AWS, and CI/CD.",
        email: "aathif0710@gmail.com",
        sameAs: [
          "https://github.com/aathif26",
          "https://www.linkedin.com/in/aathifb",
        ],
        knowsAbout: [
          "Full-Stack Web Development",
          "React.js",
          "Next.js",
          "TypeScript",
          "Python",
          "FastAPI",
          "Artificial Intelligence",
          "LLM Integration",
          "Machine Learning",
          "Docker",
          "AWS",
          "CI/CD Pipelines",
          "REST API Development",
          "Frontend Development",
          "Performance Optimization",
        ],
        hasOccupation: {
          "@type": "Occupation",
          name: "Software Developer",
          occupationLocation: {
            "@type": "Country",
            name: "India",
          },
          skills:
            "React.js, Next.js, TypeScript, Python, FastAPI, LLM Integration, Docker, AWS",
        },
      },
      {
        "@type": "WebSite",
        name: "Aathif B — Developer Portfolio",
        url: "https://aathifb.dev",
        description:
          "Portfolio of Aathif B — Full-Stack & AI Developer specializing in React.js, Next.js, TypeScript, FastAPI, and LLM-powered applications.",
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
        <SmoothScroll>
          {children}
          <ThemeToggle />
        </SmoothScroll>
      </body>
    </html>
  );
}
