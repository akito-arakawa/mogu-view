# フロントエンド ディレクトリ構成

## アーキテクチャ

**Feature-based Architecture（機能単位アーキテクチャ）** を採用。

機能ごとにフォルダを分割し、関連するコード（コンポーネント・フック・型・アクション）を近くにコロケーションすることで、可読性と保守性を高める。変更が必要な際に、該当フォルダを見ればすぐに対応できることを目指す。

## 技術スタック

- **Next.js 16**（App Router）
- **React 19**
- **TypeScript 5**
- **Tailwind CSS v4**

## ディレクトリツリー

```
src/
├── app/                              # ルーティング層（Next.js App Router）
│   ├── globals.css                   #   グローバルCSS・Tailwind設定
│   ├── layout.tsx                    #   ルートレイアウト
│   ├── page.tsx                      #   ルートページ（プレースホルダー）
│   │
│   ├── (auth)/                       #   認証系ルートグループ
│   │   ├── login/                    #     ログインページ（/login）
│   │   └── register/                 #     ユーザー登録ページ（/register）
│   │
│   └── (app)/                        #   アプリ本体ルートグループ
│       ├── layout.tsx                #     アプリ共通レイアウト（ヘッダー・フッター）
│       ├── home/
│       │   └── page.tsx              #     ホーム画面（/home）※ヒーロー＋機能紹介
│       ├── search/
│       │   ├── page.tsx              #     検索フォーム（/search）※地図＋条件入力
│       │   └── results/
│       │       ├── page.tsx          #     検索結果一覧（/search/results?lat=...&lng=...&range=...）
│       │       ├── loading.tsx       #     検索結果ローディングUI
│       │       └── error.tsx         #     検索結果エラーUI
│       ├── restaurant/
│       │   └── [id]/
│       │       ├── page.tsx          #     店舗詳細ページ（/restaurant/:id）
│       │       ├── loading.tsx       #     店舗詳細ローディングUI
│       │       └── error.tsx         #     店舗詳細エラーUI
│       ├── favorites/
│       │   └── page.tsx              #     お気に入り一覧ページ（/favorites）※未実装
│       ├── history/
│       │   └── page.tsx              #     閲覧履歴一覧ページ（/history）※未実装
│       └── roulette/
│           └── page.tsx              #     ルーレットページ（/roulette）※未実装
│
├── features/                         # 機能単位モジュール
│   ├── home/                         #   ホーム画面機能
│   │   └── components/               #     ホーム専用コンポーネント
│   │
│   ├── auth/                         #   認証機能
│   │   ├── actions/                  #     Server Actions
│   │   ├── components/               #     認証専用コンポーネント
│   │   ├── hooks/                    #     認証専用カスタムフック
│   │   └── types/                    #     認証専用型定義
│   │
│   ├── restaurant/                   #   レストラン検索・詳細機能
│   │   ├── actions/                  #     Server Actions（検索・詳細取得）
│   │   ├── components/               #     検索フォーム・検索結果・店舗詳細
│   │   ├── hooks/                    #     位置情報取得等のカスタムフック
│   │   ├── types/                    #     ホットペッパーAPI型定義
│   │   └── utils/                    #     検索パラメータのパース等
│   │
│   ├── favorites/                    #   お気に入り機能
│   │   ├── actions/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── types/
│   │
│   ├── history/                      #   閲覧履歴機能
│   │   ├── actions/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── types/
│   │
│   └── user/                         #   ユーザー・マイページ機能
│       ├── actions/
│       ├── components/
│       ├── hooks/
│       └── types/
│
├── components/                       # 共有コンポーネント（feature横断）
│   ├── ui/                           #   汎用UIパーツ
│   ├── layouts/                      #   レイアウトコンポーネント
│   └── elements/                     #   組み合わせコンポーネント
│
├── hooks/                            # 共有カスタムフック
├── lib/                              # ユーティリティ・APIクライアント
├── constants/                        # 定数・設定値
└── types/                            # 共有型定義
```

## 各ディレクトリの役割

### `app/` — ルーティング層

Next.js App Router のルーティングを定義する。**ページの見た目やロジックは `features/` から import し、`app/` 自体は薄く保つ**。

#### ルートグループとレイアウト

ルートグループ `()` は URL パスに影響を与えずにレイアウトを分離できる Next.js の機能。
`(auth)` と `(app)` でそれぞれ別の `layout.tsx` を持たせることで、ページの用途に応じた見た目を切り替える。

| グループ | 用途 | レイアウト |
|---|---|---|
| `(auth)` | ログイン・ユーザー登録ページ | ヘッダー・フッターなし。画面中央にロゴ + フォームカードを配置するシンプルなレイアウト（未実装） |
| `(app)` | アプリ本体ページ（ログイン不問） | 上部にヘッダー（ロゴ・検索リンク・お気に入り・閲覧履歴・ルーレット）、下部にフッター、中央にメインコンテンツ |

> **注意**: ルートの `app/page.tsx` はプレースホルダーとして存在する。
> ホーム画面は `(app)/home/page.tsx` に配置しており、`/home` でアクセスする。

#### 認証の要否

検索・閲覧はログインなしで利用可能。お気に入り・履歴はログインが必要。

| 認証 | ページ |
|---|---|
| **不要** | ホーム、検索フォーム、検索結果一覧、店舗詳細 |
| **不要（未実装）** | ルーレット |
| **必要（未実装）** | お気に入り一覧、閲覧履歴一覧 |

店舗詳細はログイン状態によって動作が変わる：
- **未ログイン**: ホットペッパーAPIのデータをそのまま表示する
- **ログイン済み**: 表示に加えて閲覧履歴の記録（`POST /restaurants/:id/view`）とお気に入りボタンを有効化する

#### ページ一覧

| ページ | パス | ファイル | 認証 | 説明 |
|---|---|---|---|---|
| ホーム | `/home` | `(app)/home/page.tsx` | 不要 | ヒーローセクションと機能紹介カード |
| 検索フォーム | `/search` | `(app)/search/page.tsx` | 不要 | 地図・検索範囲・キーワードで検索条件を入力する |
| 検索結果一覧 | `/search/results?lat=...&lng=...&range=...` | `(app)/search/results/page.tsx` | 不要 | 検索結果の店舗一覧をカード形式で表示する |
| 店舗詳細 | `/restaurant/:id` | `(app)/restaurant/[id]/page.tsx` | 不要 | 店舗の詳細情報を表示する |
| お気に入り一覧 | `/favorites` | `(app)/favorites/page.tsx` | 必要 | お気に入り登録した店舗一覧（未実装） |
| 閲覧履歴一覧 | `/history` | `(app)/history/page.tsx` | 必要 | 閲覧した店舗の履歴一覧（未実装） |
| ルーレット | `/roulette` | `(app)/roulette/page.tsx` | 不要 | ランダムでお店を選ぶ（未実装） |
| ログイン | `/login` | `(auth)/login/page.tsx` | — | ログインフォーム（未実装） |
| ユーザー登録 | `/register` | `(auth)/register/page.tsx` | — | 新規登録フォーム（未実装） |

#### 動的ルート

`restaurant/[id]/` は動的ルートセグメント。`/restaurant/J001234567` のようなURLで店舗詳細ページを表示する。

#### loading.tsx / error.tsx

`search/results/` と `restaurant/[id]/` には `loading.tsx` と `error.tsx` を配置。Next.js の Streaming SSR によりデータ取得中はローディングUIを表示し、エラー時はエラーUIを表示する。

---

### `features/` — 機能単位モジュール

アプリの各機能を独立したモジュールとして管理する。各featureは以下のサブフォルダを持つ。

| サブフォルダ | 役割 | 配置するファイル例 |
|---|---|---|
| `actions/` | Server Actions（サーバー側処理） | `search.ts`, `getById.ts` |
| `components/` | その機能専用のUIコンポーネント | `SearchForm.tsx`, `RestaurantDetail.tsx` |
| `hooks/` | その機能専用のカスタムフック | `useGeolocation.ts` |
| `types/` | その機能専用の型定義 | `HotPepper.ts` |
| `utils/` | その機能専用のユーティリティ | `parseSearchParams.ts` |

#### feature一覧

| feature | 主な内容 | 説明 |
|---|---|---|
| `home` | `HomePage.tsx`, `OrangeBlob.tsx`, `FloatingCard.tsx` | ホーム画面のヒーローセクション・機能紹介カード |
| `auth` | （未実装） | ユーザー登録・ログイン・ログアウト |
| `restaurant` | `SearchForm.tsx`, `SearchResults.tsx`, `SearchMap.tsx`, `RestaurantDetail.tsx` | レストラン検索（地図＋条件入力）・検索結果一覧・店舗詳細表示 |
| `favorites` | （未実装） | お気に入りの一覧表示・登録・解除 |
| `history` | （未実装） | 閲覧履歴の一覧表示 |
| `user` | （未実装） | マイページ情報の取得・表示 |

---

### `components/` — 共有コンポーネント

複数のfeatureで横断的に使うコンポーネントを配置する。

| サブフォルダ | 役割 | 実際のファイル |
|---|---|---|
| `ui/` | 汎用UIパーツ（最小単位） | `Button.tsx`, `Input.tsx`, `Badge.tsx`, `Spinner.tsx`, `Skeleton.tsx` |
| `layouts/` | ページレイアウト構成部品 | `Header.tsx`, `Footer.tsx` |
| `elements/` | UIパーツを組み合わせたコンポーネント | `RestaurantCard.tsx`, `Pagination.tsx`, `BackButton.tsx`, `EmptyState.tsx`, `ErrorMessage.tsx` |

#### components と features/xxx/components の使い分け

- **`components/`**: feature に依存しない汎用的なもの（例: `Button` はどこでも使う）
- **`features/xxx/components/`**: 特定のfeature でしか使わないもの（例: `SearchForm` は restaurant でしか使わない）

---

### `hooks/` — 共有カスタムフック

feature 横断で使う汎用的なカスタムフックを配置する。

> feature 固有のフック（例: `useGeolocation`）は `features/restaurant/hooks/` に配置する。

---

### `lib/` — ユーティリティ・APIクライアント

外部ライブラリのラッパーやユーティリティ関数を配置する。

| ファイル | 用途 |
|---|---|
| `hotpepper.ts` | ホットペッパーグルメAPI呼び出し（Server Action から利用） |
| `utils.ts` | 汎用ヘルパー関数（`cn` 等のクラス名マージ） |

---

### `constants/` — 定数・設定値

アプリ全体で使う定数や設定値を配置する。

| ファイル | 用途 |
|---|---|
| `api.ts` | APIのベースURL、エンドポイントパス、ホットペッパーAPI設定 |
| `app.ts` | アプリ名、ページネーション件数、検索範囲オプション、デフォルト位置情報、バリデーション定数 |

---

### `types/` — 共有型定義

feature 横断で使う共通の型定義を配置する。

| ファイル | 用途 |
|---|---|
| `Restaurant.ts` | レストランの共通型（`RestaurantBase`, `RestaurantSummary`） |
| `Error.ts` | エラーレスポンスの型（`ErrorResponse`, `ValidationError`） |
| `Pagination.ts` | ページネーションの型（`Pagination`, `PaginationResponse`）と変換関数 |

> feature 固有の型（例: `HotPepperSearchParams`）は `features/restaurant/types/` に配置する。

---

## 設計原則

### 1. app/ は薄く保つ

`app/` にはルーティングとレイアウトのみ。UIロジックは `features/` から import する。

```tsx
// app/(app)/home/page.tsx
import { HomePage } from "@/features/home/components/HomePage";

export default function Page() {
  return <HomePage />;
}
```

```tsx
// app/(app)/search/results/page.tsx
import { searchRestaurants } from "@/features/restaurant/actions";
import { parseSearchParams } from "@/features/restaurant/utils/parseSearchParams";
import { SearchResults } from "@/features/restaurant/components/SearchResults";

export default async function SearchResultsPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const params = parseSearchParams(resolvedParams);
  const result = await searchRestaurants(params);
  return <SearchResults params={params} result={result} />;
}
```

### 2. feature 内で完結させる

ある機能の変更は、基本的にその feature フォルダ内で完結する。

### 3. 依存の方向

```
app/ → features/ → components/, hooks/, lib/, types/, constants/
```

- `features/` 同士の直接的な依存は避ける
- 共有が必要なものは `components/`, `hooks/`, `types/` に引き上げる

### 4. パスエイリアス

`@/` で `src/` を参照できる（tsconfig.json で設定済み）。

```typescript
import { Button } from "@/components/ui/Button";
import { useGeolocation } from "@/features/restaurant/hooks/useGeolocation";
```
