import React from "react";
import { cn } from "../../lib/utils";

const ShimmerButton = React.forwardRef(
  (
    { className, children, variant = "default", size = "default", ...props },
    ref
  ) => {
    const variants = {
      default: "bg-gradient-to-r from-blue-600 to-green-600 text-white",
      primary: "bg-gradient-to-r from-blue-600 to-blue-700 text-white",
      secondary: "bg-gradient-to-r from-green-600 to-green-700 text-white",
      accent: "bg-gradient-to-r from-purple-600 to-purple-700 text-white",
    };

    const sizes = {
      default: "px-6 py-3",
      sm: "px-4 py-2 text-sm",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <button
        className={cn(
          "relative overflow-hidden rounded-lg font-semibold transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {/* Shimmer effect */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></span>
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);

ShimmerButton.displayName = "ShimmerButton";

export { ShimmerButton };
