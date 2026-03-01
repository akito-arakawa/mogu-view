"use client";

import { ErrorMessage } from "@/components/elements/ErrorMessage";

export default function SearchResultsError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-16 pt-6">
      <ErrorMessage
        message="検索結果の取得に失敗しました。時間をおいて再度お試しください。"
        onRetry={reset}
      />
    </div>
  );
}
