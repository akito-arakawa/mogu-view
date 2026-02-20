/**
 * レストランベースフィールド
 */

// レストラン共通フィールド
export interface RestaurantBase {
    name: string;
    logoImage: string;
    access?: string;
    catchCopy?: string;
    genreName?: string;
    budgetName?: string;
}

// レストランサマリー
export interface RestaurantSummary extends RestaurantBase {
    id: string; // HotPepper店舗ID
}
