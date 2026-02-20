/**
 * ホットペッパーグルメAPI関連の型定義
 *
 * @see https://webservice.recruit.co.jp/doc/hotpepper/reference.html
 */

// ----------------------------------------------------------------
// リクエスト
// ----------------------------------------------------------------

/** グルメサーチAPIの検索パラメータ */
export interface HotPepperSearchParams {
    page?: number;
    keyword?: string;
    lat: number;
    lng: number;
    range: 1 | 2 | 3 | 4 | 5;
}

// ----------------------------------------------------------------
// レスポンス
// ----------------------------------------------------------------

/** APIレスポンスのルート */
export interface HotPepperResponse {
    results: HotPepperResults;
}

/** results 直下の構造 */
export interface HotPepperResults {
    api_version: string;
    results_available: number;
    results_returned: number;
    results_start: number;
    shop: HotPepperShop[];
}

/** shop 配列の各要素（必要なフィールドのみ抽出） */
export interface HotPepperShop {
    id: string;
    name: string;
    logo_image: string;
    name_kana: string;
    address: string;
    access: string;
    lat: number;
    lng: number;
    catch: string;
    genre: {
        name: string;
        catch: string;
    };
    budget: {
        name: string;
        average: string;
    };
    urls: {
        pc: string;
    };
    photo: {
        pc: {
            l: string;
            m: string;
            s: string;
        };
        mobile: {
            l: string;
            s: string;
        };
    };
    open: string;
    close: string;
}

/** HotPepperレスポンスからページネーション情報だけを抽出した型 */
export interface HotPepperPaginationInfo {
    results_available: number;
    results_returned: number;
    results_start: number;
}
