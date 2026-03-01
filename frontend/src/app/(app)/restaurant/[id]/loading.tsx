import { Skeleton } from "@/components/ui/Skeleton";

export default function RestaurantDetailLoading() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-16">
      {/* 戻るリンク */}
      <div className="pt-4">
        <Skeleton className="h-4 w-36" />
      </div>

      {/* ヒーロー画像 */}
      <Skeleton className="mt-4 h-72 w-full rounded-3xl sm:h-80" />

      {/* アクションボタン */}
      <div className="mt-5 flex gap-3">
        <Skeleton className="h-12 flex-1 rounded-full" />
        <Skeleton className="h-12 flex-1 rounded-full" />
      </div>

      {/* 店舗情報 */}
      <div className="mt-10">
        <Skeleton className="h-5 w-24" />
        <div className="mt-4 overflow-hidden rounded-2xl bg-white ring-1 ring-gray-100">
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className="flex gap-6 border-b border-gray-100 px-4 py-3.5 last:border-b-0"
            >
              <Skeleton className="h-4 w-16 shrink-0" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
