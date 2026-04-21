import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto auto-rows-fr",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  children,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "row-span-1 rounded-3xl group/bento transition duration-500 p-8 dark:bg-[#0A0A0A] dark:border-white/5 bg-white border border-neutral-200/50 justify-between flex flex-col space-y-6 relative overflow-hidden h-full",
        "hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/20",
        className
      )}
    >
      {/* Background Gradient Decoration */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center items-start gap-4 md:gap-5">
            {icon && (
              <div className="shrink-0 p-3 rounded-2xl bg-primary/10 text-primary group-hover/bento:scale-110 transition-transform duration-500">
                {icon}
              </div>
            )}
            <div>
              <div className="font-mono font-bold text-neutral-800 dark:text-neutral-100 text-xl leading-tight">
                {title}
              </div>
              {description && (
                <div className="font-sans font-medium text-muted-foreground text-sm mt-0.5">
                  {description}
                </div>
              )}
            </div>
          </div>
          {header}
        </div>
        <div className="relative z-10 grow mt-4">{children}</div>
      </div>
    </motion.div>
  );
};
