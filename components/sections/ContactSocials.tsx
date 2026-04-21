"use client";

import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import config from "@/content/config.json";
const { socialLinks } = config;

const socialIconMap: Record<string, React.ReactNode> = {
  github: <FaGithub size={18} />,
  linkedin: <FaLinkedinIn size={18} />,
  twitter: <FaXTwitter size={18} />,
};

export function ContactSocials() {
  return (
    <div className="flex gap-3 mt-auto">
      {socialLinks.map((link) => (
        <a
          key={link.platform}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-lg surface-1 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/20 transition-all duration-300"
          aria-label={link.platform}
        >
          {socialIconMap[link.icon]}
        </a>
      ))}
    </div>
  );
}
