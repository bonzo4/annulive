import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  error?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "ghost";
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { error = false, size = "md", variant = "default", className, ...props },
    ref,
  ) => {
    const baseClasses =
      "w-full rounded-lg border text-gray-900 transition-colors focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      default:
        "border-gray-300 focus:border-amber-500 focus:ring-amber-500/20 bg-white",
      ghost:
        "border-transparent bg-gray-50 focus:border-amber-500 focus:ring-amber-500/20 focus:bg-white",
    };

    const errorStyles =
      "border-red-500 focus:border-red-500 focus:ring-red-500/20";

    const sizes = {
      sm: "text-sm px-3 py-2",
      md: "text-base px-4 py-3",
      lg: "text-lg px-5 py-4",
    };

    return (
      <input
        ref={ref}
        className={cn(
          baseClasses,
          error ? errorStyles : variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
