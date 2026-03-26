import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "accent" | "outline" | "ghost";
}

export function Badge({
  children,
  className,
  variant = "default",
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium transition-all duration-300",
        variant === "default" &&
          "bg-secondary text-secondary-foreground border border-border",
        variant === "accent" &&
          "bg-primary/10 text-primary border border-primary/20",
        variant === "outline" &&
          "bg-transparent text-muted-foreground border border-border hover:text-foreground hover:border-primary/20",
        variant === "ghost" &&
          "bg-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/50",
        className
      )}
    >
      {children}
    </span>
  );
}
