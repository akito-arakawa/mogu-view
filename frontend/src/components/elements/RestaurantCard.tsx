import Image from "next/image";
import Link from "next/link";
import type { RestaurantSummary } from "@/types/Restaurant";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface RestaurantCardProps {
  restaurant: RestaurantSummary;
  className?: string;
}

/**
 * 一覧用レストランカード。
 * レイアウト: 左=サムネイル、右=バッジ・店名・予算・アクセス
 * CardSkeleton と同一レイアウトを維持すること。
 */
export function RestaurantCard({ restaurant, className }: RestaurantCardProps) {
  const { id, name, logoImage, photoUrl, genreName, budgetName, access, catchCopy } =
    restaurant;

  return (
    <Link
      href={`/restaurant/${id}`}
      className={cn(
        "flex gap-4 rounded-2xl bg-white p-4",
        "shadow-[0_1px_3px_rgba(0,0,0,0.04)] ring-1 ring-gray-100",
        "transition-shadow hover:shadow-md",
        className,
      )}
    >
      {/* 左: サムネイル */}
      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-muted">
        <Image
          src={logoImage || photoUrl || ""}
          alt={name}
          fill
          sizes="112px"
          className="object-cover"
        />
      </div>

      {/* 右: コンテンツ */}
      <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
        <div>
          {genreName && <Badge className="mb-1.5">{genreName}</Badge>}

          <h3 className="truncate text-sm font-bold text-foreground">
            {name}
          </h3>

          {catchCopy && (
            <p className="mt-0.5 line-clamp-1 text-xs text-gray-500">
              {catchCopy}
            </p>
          )}
        </div>

        {/* 予算・アクセス */}
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
          {budgetName && (
            <span className="flex items-center gap-1">
              <WalletIcon />
              {budgetName}
            </span>
          )}
          {access && (
            <span className="flex min-w-0 items-center gap-1">
              <MapPinIcon />
              <span className="truncate">{access}</span>
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

function WalletIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-3.5 w-3.5 shrink-0 text-gray-400"
    >
      <path
        fillRule="evenodd"
        d="M1 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-1.054a2.5 2.5 0 0 0 0-2H17V5H3v6h11.946a2.5 2.5 0 0 0 0 2H2a1 1 0 0 1-1-1V4Zm13.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-3.5 w-3.5 shrink-0 text-gray-400"
    >
      <path
        fillRule="evenodd"
        d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
