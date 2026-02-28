"use client";

import { useState, useCallback, useTransition } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";
import { useGeolocation } from "@/features/restaurant/hooks/useGeolocation";
import {
  SEARCH_RANGE_OPTIONS,
  DEFAULT_SEARCH_RANGE,
  type SearchRangeValue,
} from "@/constants/app";

const SearchMap = dynamic(
  () =>
    import("@/features/restaurant/components/SearchMap").then(
      (mod) => mod.SearchMap,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[280px] items-center justify-center rounded-2xl bg-gray-50 sm:h-[340px]">
        <Spinner size="lg" />
      </div>
    ),
  },
);

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-5 w-5"
    >
      <path
        fillRule="evenodd"
        d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function SearchForm() {
  const router = useRouter();
  const { position, loading: geoLoading, error: geoError } = useGeolocation();
  const [range, setRange] = useState<SearchRangeValue>(DEFAULT_SEARCH_RANGE);
  const [keyword, setKeyword] = useState("");
  const [isSearching, startSearchTransition] = useTransition();

  // 検索ボタンクリック時の処理
  const handleSearch = useCallback(() => {
    startSearchTransition(() => {
      const params = new URLSearchParams({
        lat: position.lat.toString(),
        lng: position.lng.toString(),
        range: range.toString(),
      });
      if (keyword.trim()) {
        params.set("keyword", keyword.trim());
      }
      router.push(`/search/results?${params.toString()}`);
    });
  }, [router, position, range, keyword, startSearchTransition]);

  // 検索範囲のメートル数を取得
  const radiusMeters =
    SEARCH_RANGE_OPTIONS.find((opt) => opt.value === range)?.meters ?? 1000;

  return (
    <div className="mx-auto max-w-2xl px-5 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">お店を探す</h1>
        <p className="mt-1 text-sm text-gray-500">
          現在地とキーワードから周辺のお店を検索できます
        </p>
      </div>
      <div className="space-y-5">
        {geoLoading ? (
          <div className="flex h-[280px] items-center justify-center rounded-2xl bg-gray-50 sm:h-[340px]">
            <div className="flex flex-col items-center gap-3">
              <Spinner size="lg" />
              <p className="text-sm text-gray-400">現在地を取得中…</p>
            </div>
          </div>
        ) : (
          <>
            {geoError && (
              <div className="flex items-center gap-3 rounded-xl bg-amber-50 px-4 py-3 text-sm ring-1 ring-amber-200">
                <span className="text-lg">📍</span>
                <div>
                  <p className="font-medium text-amber-800">
                    東京駅付近で検索します
                  </p>
                  <p className="mt-0.5 text-[12px] text-amber-600">
                    {geoError}
                  </p>
                </div>
              </div>
            )}
            <SearchMap position={position} radiusMeters={radiusMeters} />
          </>
        )}
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
          <p className="mb-3 text-sm font-bold text-gray-600">検索範囲</p>
          <div className="grid grid-cols-5 gap-2">
            {SEARCH_RANGE_OPTIONS.map((opt) => (
              <Button
                key={opt.value}
                variant="muted"
                size="sm"
                isActive={range === opt.value}
                onClick={() => setRange(opt.value)}
                className="w-full justify-center py-2.5 text-sm"
              >
                {opt.label}
              </Button>
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
          <Input
            label="キーワード（任意）"
            icon={<SearchIcon />}
            placeholder="料理名・お店の名前"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
        </div>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isSearching}
          onClick={handleSearch}
          disabled={geoLoading}
          className="text-base"
        >
          <SearchIcon />
          この条件で検索
        </Button>
      </div>
    </div>
  );
}
