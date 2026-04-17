"use client";

import config from "@/content/config.json";
const { personalInfo } = config;
import { ContactSocials } from "./ContactSocials";

export function ContactInfo() {
  return (
    <div className="lg:col-span-2 flex flex-col gap-6">
      {/* Availability status */}
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="text-sm text-muted-foreground">Open for opportunities</span>
      </div>

      <div>
        <h3 className="font-display text-lg font-semibold text-foreground mb-1">Let&apos;s build together</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          I&apos;m always interested in hearing about new projects, especially those involving AI systems and scalable architecture.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <a
          href={`mailto:${personalInfo.email}`}
          className="text-sm text-foreground hover:text-primary transition-colors"
        >
          {personalInfo.email}
        </a>
      </div>

      <ContactSocials />
    </div>
  );
}
