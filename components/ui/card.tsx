import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "featured" | "interactive" | "compact";
}

export function Card({ children, className, variant = "default" }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl transition-all duration-500",
        variant === "default" && [
          "surface-1 p-6",
          "hover:border-primary/20",
        ],
        variant === "featured" && [
          "surface-2 p-6 gradient-border",
          "hover:accent-glow hover:-translate-y-1",
        ],
        variant === "interactive" && [
          "surface-1 p-5 cursor-pointer",
          "hover:surface-2 hover:border-primary/20 hover:-translate-y-0.5",
        ],
        variant === "compact" && [
          "surface-1 p-4",
          "hover:border-primary/15",
        ],
        className
      )}
    >
      {children}
    </div>
  );
}
