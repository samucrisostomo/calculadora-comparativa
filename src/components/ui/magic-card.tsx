import React from "react";
import { cn } from "../../lib/utils";

interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "accent";
  glow?: boolean;
}

const MagicCard = React.forwardRef<HTMLDivElement, MagicCardProps>(
  (
    { className, children, variant = "default", glow = false, ...props },
    ref
  ) => {
    const variants = {
      default: "border-gray-600/50 bg-gray-800/80",
      primary: "border-blue-500/30 bg-gray-800/80",
      secondary: "border-green-500/30 bg-gray-800/80",
      accent: "border-purple-500/30 bg-gray-800/80",
    };

    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-xl border backdrop-blur-sm p-6 transition-all duration-200 hover:shadow-2xl hover:scale-[1.01]",
          glow && "animate-p-period-soft",
          variants[variant],
          className
        )}
        ref={ref}
        {...props}
      >
        {/* Efeito de brilho no hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100" />

        {/* Conteúdo */}
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);

MagicCard.displayName = "MagicCard";

export { MagicCard };
