"use client";
import { useEffect } from "react";

import { ErrorMessage } from "@/components/elements/ErrorMessage";

export default function RestaurantDetailError({
  reset,
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-5xl px-4 pb-16 pt-6">
      <ErrorMessage
        message="店舗情報の取得に失敗しました。時間をおいて再度お試しください。"
        onRetry={reset}
      />
    </div>
  );
}
