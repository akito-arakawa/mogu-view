"use server";

import { HOTPEPPER_API_KEY, HOTPEPPER_API_BASE_URL } from "@/constants/api";
import { throwIfHotPepperError } from "@/lib/hotpepper";
import type {
  HotPepperResponse,
  HotPepperShop,
} from "@/features/restaurant/types/HotPepper";

export async function getRestaurantById(
  id: string,
): Promise<HotPepperShop | null> {
  if (!HOTPEPPER_API_KEY) {
    throw new Error("環境変数 HOTPEPPER_API_KEY が設定されていません。");
  }

  const url = new URL(HOTPEPPER_API_BASE_URL);
  url.searchParams.set("key", HOTPEPPER_API_KEY);
  url.searchParams.set("format", "json");
  url.searchParams.set("id", id);

  const response = await fetch(url.toString());
  const raw: HotPepperResponse = await response.json();
  throwIfHotPepperError(raw);

  if (!raw.results.shop || raw.results.shop.length === 0) {
    return null;
  }

  return raw.results.shop[0];
}
