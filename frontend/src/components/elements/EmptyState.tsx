import Link from "next/link";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  message: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}

/**
 * 検索結果が0件のときなどに表示する空状態コンポーネント。
 * アイコン + メッセージ + オプションのアクションリンク。
 */
export function EmptyState({
  message,
  actionLabel,
  actionHref,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-16 text-center",
        className,
      )}
    >
      <SearchOffIcon />

      <p className="text-sm leading-relaxed text-gray-500">{message}</p>

      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-5 py-2",
            "text-sm font-bold text-primary",
            "ring-1 ring-primary/30",
            "transition-colors hover:bg-primary/5",
          )}
        >
          {actionLabel}
          <ArrowRightIcon />
        </Link>
      )}
    </div>
  );
}

function SearchOffIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-12 w-12 text-gray-300"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="8" y1="8" x2="14" y2="14" />
      <line x1="14" y1="8" x2="8" y2="14" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4"
    >
      <path
        fillRule="evenodd"
        d="M3 10a.75.75 0 0 1 .75-.75h10.638l-3.96-3.96a.75.75 0 1 1 1.06-1.06l5.25 5.25a.75.75 0 0 1 0 1.06l-5.25 5.25a.75.75 0 1 1-1.06-1.06l3.96-3.96H3.75A.75.75 0 0 1 3 10Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
