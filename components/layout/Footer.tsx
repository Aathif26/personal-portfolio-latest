"use client";

import config from "@/content/config.json";
const { navLinks, socialLinks, personalInfo } = config;
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const socialIconMap: Record<string, React.ReactNode> = {
  github: <FaGithub size={16} />,
  linkedin: <FaLinkedinIn size={16} />,
  twitter: <FaXTwitter size={16} />,
};

export default function Footer() {
  const handleClick = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-border">
      <div className="container-narrow px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo + tagline */}
          <div className="text-center md:text-left">
            <span className="font-display text-base font-semibold text-foreground">
              {personalInfo.name}
            </span>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs">
              {personalInfo.title}
            </p>
          </div>

          {/* Nav links */}
          <nav
            className="flex flex-wrap justify-center gap-x-6 gap-y-2"
            aria-label="Footer navigation"
          >
            {navLinks.slice(1).map((link) => (
              <button
                key={link.href}
                onClick={() => handleClick(link.href)}
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg surface-1 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/20 transition-all duration-300"
                aria-label={link.platform}
              >
                {socialIconMap[link.icon]}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {personalInfo.name}. Crafted with
            precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
