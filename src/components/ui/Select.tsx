import { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  options: SelectOption[];
  placeholder?: string;
  error?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Select({
  options,
  placeholder,
  error = false,
  size = "md",
  className,
  ...props
}: SelectProps) {
  const baseClasses =
    "w-full rounded-lg border text-gray-900 transition-colors focus:outline-none focus:ring-2";

  const variants = {
    default: "border-gray-300 focus:border-amber-500 focus:ring-amber-500/20",
    error: "border-red-500 focus:border-red-500 focus:ring-red-500/20",
  };

  const sizes = {
    sm: "text-sm px-3 py-2",
    md: "text-base px-4 py-3",
    lg: "text-lg px-5 py-4",
  };

  return (
    <select
      className={cn(
        baseClasses,
        error ? variants.error : variants.default,
        sizes[size],
        className,
      )}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
