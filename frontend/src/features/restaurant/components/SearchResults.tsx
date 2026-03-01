import Link from "next/link";
import type { HotPepperSearchParams } from "@/features/restaurant/types/HotPepper";
import type { PaginationResponse } from "@/types/Pagination";
import type { RestaurantSummary } from "@/types/Restaurant";
import { RestaurantCard } from "@/components/elements/RestaurantCard";
import { Pagination } from "@/components/elements/Pagination";
import { EmptyState } from "@/components/elements/EmptyState";
import { SEARCH_RANGE_OPTIONS } from "@/constants/app";

interface SearchResultsProps {
  params: HotPepperSearchParams;
  result: PaginationResponse<RestaurantSummary>;
}

function buildSearchHref(params: HotPepperSearchParams, page: number) {
  const searchParams = new URLSearchParams({
    lat: params.lat.toString(),
    lng: params.lng.toString(),
    range: params.range.toString(),
    page: page.toString(),
  });
  if (params.keyword) searchParams.set("keyword", params.keyword);
  return `/search/results?${searchParams.toString()}`;
}

export function SearchResults({ params, result }: SearchResultsProps) {
  const { data: restaurants, pagination } = result;

  const rangeLabel =
    SEARCH_RANGE_OPTIONS.find((o) => o.value === params.range)?.label ?? "";

  return (
    <div className="mx-auto max-w-6xl px-6 pb-16 pt-6">
      <div className="mb-6">
        <Link
          href="/search"
          className="text-[13px] font-medium text-gray-400 transition hover:text-primary"
        >
          ← 条件を変更
        </Link>
        <p className="mt-2 text-lg font-bold text-foreground">
          {params.keyword ? `「${params.keyword}」` : "周辺"}
          {rangeLabel && `（${rangeLabel}圏内）`}のお店{" "}
          <span className="text-primary">{pagination.total}</span>
          <span className="text-sm font-normal text-gray-400">件</span>
        </p>
      </div>

      {restaurants.length === 0 ? (
        <EmptyState
          message="条件に一致するお店が見つかりませんでした。"
          actionLabel="条件を変えて再検索"
          actionHref="/search"
        />  
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {restaurants.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>

          <Pagination
            pagination={pagination}
            buildHref={(page) => buildSearchHref(params, page)}
            className="mt-10"
          />
        </>
      )}
    </div>
  );
}
