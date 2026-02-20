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

        if (params.keyword) {
            url.searchParams.set("keyword", params.keyword);
        }

        const response = await fetch(url.toString());

        if (!response.ok) {
            throw new Error(`HotPepper API error: ${response.status}`);
        }

        const raw: HotPepperResponse = await response.json();
        return {
            data: raw.results.shop.map(toRestaurantSummary),
            pagination: toPagePagination(raw.results, perPage),
        };
    }
