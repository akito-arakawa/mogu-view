import { type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "./Spinner";

type ButtonVariant = "primary" | "dark" | "muted";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  isActive?: boolean;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white shadow-md hover:bg-primary-hover hover:shadow-lg",
  dark: "bg-slate-900 text-white shadow-md hover:bg-slate-800",
  muted: "bg-gray-100 text-gray-600 hover:bg-gray-200",
};

const activeStyles: Partial<Record<ButtonVariant, string>> = {
  muted: "bg-primary text-white shadow-md hover:bg-primary-hover hover:shadow-lg",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3.5 py-1.5 text-xs rounded-full",
  md: "px-6 py-3 text-sm rounded-2xl",
  lg: "px-8 py-4 text-base rounded-2xl",
};

const spinnerSizeMap: Record<ButtonSize, "sm" | "md"> = {
  sm: "sm",
  md: "sm",
  lg: "md",
};

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  isActive = false,
  fullWidth = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2",
        "font-bold tracking-wide",
        "transition-all duration-200",
        "active:scale-[0.97]",
        "focus:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100",
        variantStyles[variant],
        isActive && activeStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Spinner size={spinnerSizeMap[size]} />}
      {children}
    </button>
  );
}
