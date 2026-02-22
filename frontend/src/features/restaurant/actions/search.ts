"use server";

import { getHotpepper } from "@/lib/hotpepper";
import type { HotPepperSearchParams } from "@/features/restaurant/types/HotPepper";
import type { PaginationResponse } from "@/types/Pagination";
import type { RestaurantSummary } from "@/types/Restaurant";

export async function searchRestaurants(
  params: HotPepperSearchParams,
): Promise<PaginationResponse<RestaurantSummary>> {
  return getHotpepper(params);
}
