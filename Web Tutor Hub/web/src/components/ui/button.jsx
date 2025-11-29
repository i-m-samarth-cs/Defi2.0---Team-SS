import React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = {
  variant: {
    default:
      "bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 text-white shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 font-medium",
    destructive:
      "bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 font-medium",
    outline:
      "border-2 border-purple-500 bg-transparent text-purple-600 dark:text-purple-400 shadow-sm hover:bg-purple-50 dark:hover:bg-purple-950/30 hover:scale-[1.02] transition-all duration-300 font-medium",
    secondary:
      "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 font-medium",
    ghost:
      "hover:bg-gradient-to-r hover:from-purple-100 hover:to-violet-100 dark:hover:from-purple-900/30 dark:hover:to-violet-900/30 text-purple-600 dark:text-purple-400 transition-all duration-300 font-medium",
    link: "text-purple-600 dark:text-purple-400 underline-offset-4 hover:underline hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300 font-medium",
    gradient:
      "bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 font-medium",
    web3: "bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 text-white shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 font-medium",
  },
  size: {
    default: "h-10 px-5 py-2.5 rounded-xl",
    sm: "h-9 rounded-lg px-4 text-sm",
    lg: "h-12 rounded-xl px-8 text-base",
    icon: "h-10 w-10 rounded-xl",
  },
};

function getVariantClass(variant = "default") {
  return buttonVariants.variant[variant] || buttonVariants.variant.default;
}

function getSizeClass(size = "default") {
  return buttonVariants.size[size] || buttonVariants.size.default;
}

const Button = React.forwardRef(
  (
    { className, variant = "default", size = "default", children, ...props },
    ref,
  ) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-purple-400",
          getVariantClass(variant),
          getSizeClass(size),
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
