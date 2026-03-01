import { type InputHTMLAttributes, type ReactNode, useId } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  error?: string;
}

export function Input({
  label,
  icon,
  error,
  id: externalId,
  className,
  ...props
}: InputProps) {
  const internalId = useId();
  const id = externalId ?? internalId;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-bold text-gray-700">
          {label}
        </label>
      )}

      <div
        className={cn(
          "flex items-center gap-2",
          "rounded-2xl border-2 bg-white px-4 py-3",
          "transition-colors duration-200",
          "focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
          error ? "border-red-400" : "border-gray-200",
        )}
      >
        {icon && (
          <span className="flex shrink-0 text-lg text-gray-400">{icon}</span>
        )}
        <input
          id={id}
          className={cn(
            "w-full bg-transparent text-sm text-foreground",
            "placeholder:text-muted-foreground",
            "focus:outline-none",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          {...props}
        />
      </div>

      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}
