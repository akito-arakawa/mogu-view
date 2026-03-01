import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

/**
 * オレンジ背景の小ラベル（「居酒屋」「寿司」等のカテゴリ表示用）
 */
export function Badge({ children, className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center",
        "rounded-full px-3 py-1",
        "bg-primary-light text-primary",
        "text-xs font-bold",
        "whitespace-nowrap",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
