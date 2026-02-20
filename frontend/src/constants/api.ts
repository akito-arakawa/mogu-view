/**
 * API関連の定数
 */

// ================================================================
// バックエンドAPI
// ================================================================

export const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api/v1";

/** バックエンドAPIのエンドポイントパス */
export const API_ENDPOINTS = {
    // Auth
    AUTH_REGISTER: "/auth/register",
    AUTH_LOGIN: "/auth/login",
    AUTH_LOGOUT: "/auth/logout",

    // User
    USERS_ME: "/users/me",

    // Favorites
    FAVORITES: "/favorites",
    FAVORITE_DETAIL: (restaurantId: string) =>
        `/favorites/${restaurantId}` as const,

    // Histories
    HISTORIES: "/histories",

    // Restaurants
    RESTAURANT_VIEW: (restaurantId: string) =>
        `/restaurants/${restaurantId}/view` as const,
} as const;

// ================================================================
// ホットペッパーグルメAPI
// ================================================================

export const HOTPEPPER_API_KEY =
    process.env.HOTPEPPER_API_KEY ?? "";

export const HOTPEPPER_API_BASE_URL =
    "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/";
    