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
│   │
│   ├── (auth)/                       #   認証系ルートグループ
│   │   ├── layout.tsx                #     認証ページ共通レイアウト
│   │   ├── login/                    #     ログインページ（/login）
│   │   └── register/                 #     ユーザー登録ページ（/register）
│   │
│   └── (app)/                        #   アプリ本体ルートグループ
│       ├── layout.tsx                #     アプリ共通レイアウト（ヘッダー・フッター）
│       ├── page.tsx                  #     ホーム画面（/）※検索フォーム
│       ├── search/                   #     店舗一覧ページ（/search?keyword=xxx）
│       ├── restaurant/
│       │   └── [id]/                 #     店舗詳細ページ（/restaurant/:id）
│       ├── favorites/                #     お気に入り一覧ページ（/favorites）
│       ├── history/                  #     閲覧履歴一覧ページ（/history）
│       └── mypage/                   #     マイページ（/mypage）
│
├── features/                         # 機能単位モジュール
│   ├── auth/                         #   認証機能
│   │   ├── actions/                  #     Server Actions
│   │   ├── components/               #     認証専用コンポーネント
│   │   ├── hooks/                    #     認証専用カスタムフック
│   │   └── types/                    #     認証専用型定義
│   │
│   ├── restaurant/                   #   レストラン検索・詳細機能
│   │   ├── actions/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── types/
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
├── providers/                        # React Context Provider
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
| `(auth)` | ログイン・ユーザー登録ページ | ヘッダー・フッターなし。画面中央にロゴ + フォームカードを配置するシンプルなレイアウト |
| `(app)` | アプリ本体ページ（ログイン不問） | 上部にヘッダー（ロゴ・検索リンク・お気に入り・マイページ・ログアウト）、下部にフッター、中央にメインコンテンツ |

> **注意**: ホーム画面（`/`）は `(app)/page.tsx` に配置する。
> `(app)` はルートグループのため URL に影響せず、`/` でアクセスできる。
> ルートの `app/page.tsx` は使用しない（`(app)/page.tsx` と競合するため）。

#### 認証の要否

検索・閲覧はログインなしで利用可能。お気に入り・履歴・マイページはログインが必要。

| 認証 | ページ |
|---|---|
| **不要** | ホーム、店舗一覧、店舗詳細 |
| **必要** | お気に入り一覧、閲覧履歴一覧、マイページ |

店舗詳細はログイン状態によって動作が変わる：
- **未ログイン**: ホットペッパーAPIのデータをそのまま表示する
- **ログイン済み**: 表示に加えて閲覧履歴の記録（`POST /restaurants/:id/view`）とお気に入りボタンを有効化する

#### ページ一覧

| ページ | パス | ファイル | 認証 | 説明 |
|---|---|---|---|---|
| ホーム | `/` | `(app)/page.tsx` | 不要 | 検索フォーム。キーワードやエリアを入力して検索を実行する |
| 店舗一覧 | `/search?keyword=xxx` | `(app)/search/page.tsx` | 不要 | 検索結果の店舗一覧をカード形式で表示する |
| 店舗詳細 | `/restaurant/:id` | `(app)/restaurant/[id]/page.tsx` | 不要 | 店舗の詳細情報を表示する |
| お気に入り一覧 | `/favorites` | `(app)/favorites/page.tsx` | 必要 | お気に入り登録した店舗一覧 |
| 閲覧履歴一覧 | `/history` | `(app)/history/page.tsx` | 必要 | 閲覧した店舗の履歴一覧 |
| マイページ | `/mypage` | `(app)/mypage/page.tsx` | 必要 | ユーザー情報・お気に入り数・履歴数 |
| ログイン | `/login` | `(auth)/login/page.tsx` | — | ログインフォーム |
| ユーザー登録 | `/register` | `(auth)/register/page.tsx` | — | 新規登録フォーム |

#### 動的ルート

`restaurant/[id]/` は動的ルートセグメント。`/restaurant/J001234567` のようなURLで店舗詳細ページを表示する。

---

### `features/` — 機能単位モジュール

アプリの各機能を独立したモジュールとして管理する。各featureは以下のサブフォルダを持つ。

| サブフォルダ | 役割 | 配置するファイル例 |
|---|---|---|
| `actions/` | Server Actions（サーバー側処理） | `login.ts`, `add-favorite.ts` |
| `components/` | その機能専用のUIコンポーネント | `LoginForm.tsx`, `FavoriteButton.tsx` |
| `hooks/` | その機能専用のカスタムフック | `useAuth.ts`, `useFavorites.ts` |
| `types/` | その機能専用の型定義 | `auth.ts`, `restaurant.ts` |

#### feature一覧

| feature | 対応するAPI | 説明 |
|---|---|---|
| `auth` | `/auth/register`, `/auth/login`, `/auth/logout` | ユーザー登録・ログイン・ログアウト |
| `restaurant` | `/restaurants/{id}/view`, ホットペッパーAPI | レストラン検索・店舗詳細表示・閲覧記録 |
| `favorites` | `/favorites` (GET/POST/DELETE) | お気に入りの一覧表示・登録・解除 |
| `history` | `/histories` (GET) | 閲覧履歴の一覧表示 |
| `user` | `/users/me` (GET) | マイページ情報の取得・表示 |

---

### `components/` — 共有コンポーネント

複数のfeatureで横断的に使うコンポーネントを配置する。

| サブフォルダ | 役割 | 配置するファイル例 |
|---|---|---|
| `ui/` | 汎用UIパーツ（最小単位） | `Button.tsx`, `Input.tsx`, `Modal.tsx`, `Badge.tsx` |
| `layouts/` | ページレイアウト構成部品 | `Header.tsx`, `Footer.tsx`, `Sidebar.tsx` |
| `elements/` | UIパーツを組み合わせたコンポーネント | `RestaurantCard.tsx`, `Pagination.tsx`, `SearchBar.tsx` |

#### components と features/xxx/components の使い分け

- **`components/`**: feature に依存しない汎用的なもの（例: `Button` はどこでも使う）
- **`features/xxx/components/`**: 特定のfeature でしか使わないもの（例: `LoginForm` は auth でしか使わない）

---

### `hooks/` — 共有カスタムフック

feature 横断で使う汎用的なカスタムフックを配置する。

| 配置するファイル例 | 用途 |
|---|---|
| `useDebounce.ts` | 入力値のデバウンス処理（検索入力等） |
| `useMediaQuery.ts` | レスポンシブ対応の判定 |
| `useLocalStorage.ts` | ローカルストレージの読み書き |

> feature 固有のフック（例: `useAuth`）は `features/auth/hooks/` に配置する。

---

### `lib/` — ユーティリティ・APIクライアント

外部ライブラリのラッパーやユーティリティ関数を配置する。

| 配置するファイル例 | 用途 |
|---|---|
| `api-client.ts` | バックエンドAPI呼び出しの共通クライアント（fetch ラッパー） |
| `hotpepper.ts` | ホットペッパーグルメAPI呼び出し |
| `utils.ts` | 汎用ヘルパー関数（日付フォーマット等） |

---

### `providers/` — React Context Provider

アプリ全体で共有する状態を管理する Context Provider を配置する。`layout.tsx` からツリー全体に注入して使う。

| 配置するファイル例 | 用途 |
|---|---|
| `auth-provider.tsx` | 認証状態（ユーザー情報・トークン）の管理 |

---

### `constants/` — 定数・設定値

アプリ全体で使う定数や設定値を配置する。

| 配置するファイル例 | 用途 |
|---|---|
| `api.ts` | APIのベースURL、エンドポイントパス |
| `app.ts` | アプリ名、ページネーション件数等 |

---

### `types/` — 共有型定義

feature 横断で使う共通の型定義を配置する。

| 配置するファイル例 | 用途 |
|---|---|
| `api.ts` | APIレスポンスの共通型（`Pagination`, `ErrorResponse` 等） |
| `restaurant.ts` | レストランの共通型（複数featureで参照する場合） |

> feature 固有の型（例: `LoginRequest`）は `features/auth/types/` に配置する。

---

## 設計原則

### 1. app/ は薄く保つ

`app/` にはルーティングとレイアウトのみ。UIロジックは `features/` から import する。

```tsx
// app/(app)/search/page.tsx
import { SearchPage } from "@/features/restaurant/components/SearchPage";

export default function Page() {
  return <SearchPage />;
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
import { useAuth } from "@/features/auth/hooks/useAuth";
```
