import {
  DEFAULT_LAT,
  DEFAULT_LNG,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_SEARCH_RANGE,
  SEARCH_RANGE_OPTIONS,
  type SearchRangeValue,
} from "@/constants/app";
import type { HotPepperSearchParams } from "@/features/restaurant/types/HotPepper";

type RawSearchParams = Record<string, string | string[] | undefined>;

/**
 * URLクエリパラメータをパース・バリデーションし、
 * HotPepperSearchParams 型に変換する。
 * 不正値はデフォルト値へフォールバックする。
 */
export function parseSearchParams(
  raw: RawSearchParams,
): HotPepperSearchParams {
  return {
    lat: parseFloat_(raw.lat, DEFAULT_LAT),
    lng: parseFloat_(raw.lng, DEFAULT_LNG),
    range: parseRange(raw.range),
    keyword: parseString(raw.keyword),
    page: parsePageNumber(raw.page, DEFAULT_PAGE_NUMBER),
  };
}

const VALID_RANGES = new Set<number>(
  SEARCH_RANGE_OPTIONS.map((o) => o.value),
);


function parseFloat_(
  value: string | string[] | undefined,
  fallback: number,
): number {
  const s = first(value);
  if (s === undefined) return fallback;
  const n = Number(s);
  return Number.isFinite(n) ? n : fallback;
}

function parseRange(value: string | string[] | undefined): SearchRangeValue {
  const s = first(value);
  if (s === undefined) return DEFAULT_SEARCH_RANGE;
  const n = Number(s);
  return VALID_RANGES.has(n) ? (n as SearchRangeValue) : DEFAULT_SEARCH_RANGE;
}

function parsePageNumber(
  value: string | string[] | undefined,
  fallback: number,
): number {
  const s = first(value);
  if (s === undefined) return fallback;
  const n = Number(s);
  return Number.isInteger(n) && n >= 1 ? n : fallback;
}

function parseString(
  value: string | string[] | undefined,
): string | undefined {
  const s = first(value);
  if (s === undefined) return undefined;
  const trimmed = s.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

// 文字列が配列の場合は先頭の要素を返す
function first(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}
