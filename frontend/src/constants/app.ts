/**
 * アプリケーション全体の定数・設定値
 */

// ================================================================
// アプリ情報
// ================================================================

export const APP_NAME = "もぐビュー";

// ================================================================
// ページネーション
// ================================================================

/** バックエンドAPI（お気に入り・閲覧履歴）の1ページあたりの件数 */
export const PER_PAGE = 10;

/** ホットペッパーAPIの1リクエストあたりの取得件数 */
export const HOTPEPPER_PER_PAGE = 10;

/** デフォルトのページ番号 */
export const DEFAULT_PAGE_NUMBER = 1;

// ================================================================
// デフォルト位置情報（Geolocation 取得失敗時のフォールバック：東京駅）
// ================================================================

export const DEFAULT_LAT = 35.681236;
export const DEFAULT_LNG = 139.767125;

// ================================================================
// ホットペッパー検索範囲（range パラメータ）
// ================================================================

export const SEARCH_RANGE_OPTIONS = [
    { value: 1, label: "300m", meters: 300 },
    { value: 2, label: "500m", meters: 500 },
    { value: 3, label: "1km", meters: 1000 },
    { value: 4, label: "2km", meters: 2000 },
    { value: 5, label: "3km", meters: 3000 },
] as const;

// 検索範囲値の型
export type SearchRangeValue = typeof SEARCH_RANGE_OPTIONS[number]['value'];

// デフォルトの検索範囲
export const DEFAULT_SEARCH_RANGE: SearchRangeValue = 3 as const;

// デフォルトの検索範囲のメートル数
export const DEFAULT_SEARCH_RANGE_METERS = 1000 as const;

// ================================================================
// 認証
// ================================================================

/** 認証トークンのlocalStorageキー */
export const AUTH_TOKEN = "token";

// ================================================================
// バリデーション
// ================================================================

export const VALIDATION = {
    NAME_MAX_LENGTH: 255,
    LOGIN_ID_MAX_LENGTH: 255,
    PASSWORD_MIN_LENGTH: 8,
} as const;

// ================================================================
// ホットペッパークレジット
// ================================================================

export const HOTPEPPER_CREDIT_URL = "https://webservice.recruit.co.jp/";
export const HOTPEPPER_CREDIT_TEXT = "ホットペッパー グルメ Webサービス";

// ================================================================
// ホーム画面のカード
// ================================================================
export const FEATURES = [
    {
      emoji: "📍",
      bg: "bg-red-50",
      title: "現在地検索",
      description:
        "GPSを使って今いる場所の周辺からお店を探せます。300m〜3kmまで検索範囲も自由自在。",
      href: "/search",
    },
    {
      emoji: "🎰",
      bg: "bg-blue-50",
      title: "ルーレット",
      description:
        "タグを選択して条件に合うお店をランダムで一覧表示します。",
      href: "/roulette",
    },
    {
      emoji: "❤️",
      bg: "bg-amber-50",
      title: "お気に入り保存",
      description:
        "気になるお店はワンタップで保存。いつでもマイページから確認できます。",
      href: "/favorites",
    },
    {
      emoji: "📋",
      bg: "bg-emerald-50",
      title: "閲覧履歴",
      description:
        "過去に見たお店を自動で記録。「あのお店なんだっけ？」がなくなります。",
      href: "/history",
    },
  ] as const;
