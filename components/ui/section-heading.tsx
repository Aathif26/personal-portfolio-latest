import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

interface SectionHeadingProps {
  label: string;
  title: string;
  accentWord?: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  label,
  title,
  accentWord,
  description,
  className,
  align = "center",
}: SectionHeadingProps) {
  const renderTitle = () => {
    if (!accentWord) {
      return <span>{title}</span>;
    }
    const parts = title.split(accentWord);
    return (
      <>
        {parts[0]}
        <span className="accent-highlight">{accentWord}</span>
        {parts[1] ?? ""}
      </>
    );
  };

  return (
    <Reveal
      className={cn(
        "mb-3 sm:mb-6",
        align === "center" && "text-center",
        className
      )}
    >
      <span className="inline-block mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
        {label}
      </span>
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground">
        {renderTitle()}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-muted-foreground text-base sm:text-lg leading-relaxed mx-auto">
          {description}
        </p>
      )}
    </Reveal>
  );
}
