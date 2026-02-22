/*
 ** ホットペッパーグルメAPIクライアント
 */

import { HOTPEPPER_API_KEY, HOTPEPPER_API_BASE_URL } from "@/constants/api";
import { HOTPEPPER_PER_PAGE } from "@/constants/app";
import { toPagePagination, type PaginationResponse } from "@/types/Pagination";
import type { RestaurantSummary } from "@/types/Restaurant";
import type {
  HotPepperSearchParams,
  HotPepperResponse,
  HotPepperShop,
} from "@/features/restaurant/types/HotPepper";

// ----------------------------------------------------------------
// エラーハンドリング
// ----------------------------------------------------------------
const ERROR_MESSAGES: Record<number, string> = {
  1000: "HotPepper API サーバ障害が発生しています。",
  2000: "HotPepper API の認証に失敗しました（APIキーまたはIPアドレスが無効です）。",
  3000: "HotPepper API へのリクエストパラメータが不正です。",
};

/**
 * HotPepper API レスポンスのエラーを検査し、エラーがあればスローする。
 * HTTP ステータスは常に 200 のため、レスポンスボディで判定する。
 */
export function throwIfHotPepperError(response: HotPepperResponse): void {
  const errors = response.results.error;
  if (!errors || errors.length === 0) return;

  const { code, message } = errors[0];
  const description = ERROR_MESSAGES[code] ?? "不明なエラーが発生しました。";
  throw new Error(`${description}（code: ${code}, message: ${message}）`);
}

// ----------------------------------------------------------------
// 型変換関数
// ----------------------------------------------------------------
function toRestaurantSummary(shop: HotPepperShop): RestaurantSummary {
  return {
    id: shop.id,
    name: shop.name,
    logoImage: shop.logo_image,
    access: shop.access,
    catchCopy: shop.catch,
    genreName: shop.genre.name,
    budgetName: shop.budget.name,
  };
}

// ----------------------------------------------------------------
// 検索API
// ----------------------------------------------------------------
export async function getHotpepper(
  params: HotPepperSearchParams,
): Promise<PaginationResponse<RestaurantSummary>> {
  const page = params.page ?? 1;
  const perPage = HOTPEPPER_PER_PAGE;
  const start = (page - 1) * perPage + 1;
  const url = new URL(HOTPEPPER_API_BASE_URL);
  url.searchParams.set("key", HOTPEPPER_API_KEY);
  url.searchParams.set("format", "json");
  url.searchParams.set("count", perPage.toString());
  url.searchParams.set("start", start.toString());
  url.searchParams.set("lat", params.lat.toString());
  url.searchParams.set("lng", params.lng.toString());
  url.searchParams.set("range", params.range.toString());

  if (!HOTPEPPER_API_KEY) {
    throw new Error("環境変数 HOTPEPPER_API_KEY が設定されていません。");
  }
  
  if (params.keyword) {
    url.searchParams.set("keyword", params.keyword);
  }

  const response = await fetch(url.toString());
  const raw: HotPepperResponse = await response.json();
  throwIfHotPepperError(raw);

  return {
    data: raw.results.shop.map(toRestaurantSummary),
    pagination: toPagePagination(raw.results, perPage),
  };
}
