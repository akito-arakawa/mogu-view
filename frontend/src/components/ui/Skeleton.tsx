import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-200",
        className,
      )}
    />
  );
}

/**
 * レストランカード用のスケルトン。
 * 検索結果の読み込み中プレースホルダーとして使用。
 * レイアウト: 左=サムネイル、右=バッジ・店名・説明・予算・アクセス
 */
export function CardSkeleton() {
  return (
    <div className="flex gap-4 rounded-2xl bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] ring-1 ring-gray-100">
      {/* 左: サムネイル */}
      <Skeleton className="h-28 w-28 shrink-0 rounded-xl" />

      {/* 右: コンテンツ */}
      <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
        <div>
          {/* バッジ */}
          <Skeleton className="mb-1.5 h-5 w-14 rounded-md" />
          {/* 店名 */}
          <Skeleton className="mb-1 h-4 w-3/4" />
          {/* 説明 */}
          <Skeleton className="h-3 w-full" />
        </div>
        {/* 予算・アクセス */}
        <div className="mt-2 flex gap-4">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
}

export function CardSkeletonGrid({ count = 10 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {Array.from({ length: count }, (_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
