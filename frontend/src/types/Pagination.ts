/**
 * ページネーション情報
 */

import type { HotPepperPaginationInfo } from "@/features/restaurant/types/HotPepper";

// ページネーションクエリパラメータ
export interface PaginationQuery {
    // ページ番号
    page?: number;
}

// ページネーションレスポンスのメタデータ
export interface Pagination {
    // 現在のページ番号
    current_page: number;
    // 最終ページ番号
    last_page: number;
    // 1ページあたりの件数
    per_page: number;
    // 総件数
    total: number;
}

// ページネーションレスポンス
export interface PaginationResponse<T> {
    // データリスト
    data: T[];
    // ページネーションメタデータ
    pagination: Pagination;
}

/**
 * ホットペッパーAPIのオフセットベースのページネーション情報を
 * 共通の Pagination型に変換する。
 */
export function toPagePagination(
    hp: HotPepperPaginationInfo,
    perPage: number
): Pagination {
    const total = hp.results_available;
    const currentPage = Math.floor((hp.results_start - 1) / perPage) + 1;
    const lastPage = Math.max(1, Math.ceil(total / perPage));

    return {
        current_page: currentPage,
        last_page: lastPage,
        per_page: perPage,
        total,
    };
}
