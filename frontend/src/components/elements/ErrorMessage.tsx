import { cn } from "@/lib/utils";

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

/**
 * API エラー時の表示コンポーネント。
 * アイコン + エラーメッセージ + リトライボタン。
 */
export function ErrorMessage({
  message = "データの取得に失敗しました。時間をおいて再度お試しください。",
  onRetry,
  className,
}: ErrorMessageProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-16 text-center",
        className,
      )}
    >
      <AlertIcon />

      <p className="text-sm leading-relaxed text-gray-600">{message}</p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-5 py-2",
            "text-sm font-bold text-red-600",
            "ring-1 ring-red-200",
            "transition-colors hover:bg-red-50",
            "active:scale-[0.97]",
          )}
        >
          <RetryIcon />
          再試行
        </button>
      )}
    </div>
  );
}

function AlertIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-12 w-12 text-red-300"
    >
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function RetryIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4"
    >
      <path
        fillRule="evenodd"
        d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.451a.75.75 0 0 0 0-1.5H4.5a.75.75 0 0 0-.75.75v3.75a.75.75 0 0 0 1.5 0v-2.033a7 7 0 0 0 11.712-3.122.75.75 0 0 0-1.449-.39Zm-10.624-2.85a5.5 5.5 0 0 1 9.201-2.465l.312.31H11.75a.75.75 0 0 0 0 1.5H15.5a.75.75 0 0 0 .75-.75V3.42a.75.75 0 0 0-1.5 0v2.033A7 7 0 0 0 3.038 8.575a.75.75 0 0 0 1.45.389l.2.01Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
