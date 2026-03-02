# もぐビュー

近くのグルメを簡単に探せるレストラン検索アプリケーション。
ホットペッパーグルメ API と地図を活用し、現在地周辺の飲食店を条件付きで検索・閲覧できる。


**デプロイ先**: https://mogu-view.vercel.app/
> **注意**: 現在バックエンドは未実装のため、フロントエンドのレストラン検索機能のみ動作します。
> 認証・お気に入り・閲覧履歴などバックエンド連携が必要な機能は利用できません。

## 技術スタック

### フロントエンド

| 技術 | バージョン |
|---|---|
| Next.js (App Router) | 16 |
| React | 19 |
| TypeScript | 5 |
| Tailwind CSS | 4 |
| Leaflet / React Leaflet | 1.9 / 5 |

### バックエンド（未実装）

| 技術 | バージョン |
|---|---|
| PHP | 8.3 |
| Laravel | 11 |
| MySQL | 8.0 |

### インフラ

| 技術 | 用途 |
|---|---|
| Docker Compose | コンテナオーケストレーション |
| Nginx | リバースプロキシ |
| PHP-FPM | PHP 実行環境 |

## アーキテクチャ

```
┌──────────────┐     ┌────────────────────┐     ┌──────────────┐
│              │     │                    │     │              │
│   Frontend   │────▶│  HotPepper API     │     │   Backend    │
│  (Next.js)   │     │  (レストラン検索)    │     │  (Laravel)   │
│              │     │                    │     │              │
│  localhost:   │     └────────────────────┘     │  localhost:  │
│    3000      │                                │    8080      │
│              │ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ▶│              │
│              │  認証・お気に入り・閲覧履歴      │              │
└──────────────┘       （未実装）                └──────┬───────┘
                                                       │
                                                       ▼
                                                ┌──────────────┐
                                                │    MySQL      │
                                                │  localhost:   │
                                                │    3306       │
                                                └──────────────┘
```

- **レストラン検索**: フロントエンドからホットペッパーグルメ API を直接呼び出す
- **認証・お気に入り・閲覧履歴**: バックエンド API 経由で管理（未実装）

## 機能一覧

| 機能 | パス | 状態 | 説明 |
|---|---|---|---|
| ホーム | `/home` | 実装済み | ヒーローセクションと機能紹介 |
| レストラン検索 | `/search` | 実装済み | 地図上で位置を指定し、範囲・キーワードで検索 |
| 検索結果一覧 | `/search/results` | 実装済み | 検索結果をカード形式で一覧表示 |
| 店舗詳細 | `/restaurant/:id` | 実装済み | 店舗の詳細情報を表示 |
| お気に入り | `/favorites` | 未実装 | お気に入り店舗の一覧管理（要ログイン） |
| 閲覧履歴 | `/history` | 未実装 | 閲覧した店舗の履歴一覧（要ログイン） |
| ルーレット | `/roulette` | 未実装 | ランダムで店舗を選択 |
| ログイン | `/login` | 未実装 | ユーザー認証 |
| ユーザー登録 | `/register` | 未実装 | 新規ユーザー登録 |

## 前提条件

- [Node.js](https://nodejs.org/) v18 以上がインストール済みであること
- [ホットペッパーグルメ API](https://webservice.recruit.co.jp/doc/hotpepper/reference.html) の API キーを取得済みであること

## セットアップ

### 1. リポジトリのクローン

```bash
git clone <repository-url>
```

### 2. 環境変数の設定

```bash
cp frontend/.env.example frontend/.env.local
```

`frontend/.env.local` を編集し、ホットペッパー API キーを設定する。

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1
NEXT_PUBLIC_HOTPEPPER_API_KEY=your_api_key_here
```

### 3. フロントエンドの起動

```bash
cd frontend
npm install
npm run dev
```

http://localhost:3000 でアクセスできる。

## プロジェクト構成

```
Gourmet-Search/
├── frontend/                  # フロントエンド（Next.js）
│   ├── src/
│   │   ├── app/               #   ルーティング層（App Router）
│   │   ├── features/          #   機能単位モジュール
│   │   ├── components/        #   共有コンポーネント
│   │   ├── hooks/             #   共有カスタムフック
│   │   ├── lib/               #   ユーティリティ・APIクライアント
│   │   ├── constants/         #   定数・設定値
│   │   └── types/             #   共有型定義
│   └── docs/                  #   フロントエンド設計ドキュメント
│
├── backend/                   # バックエンド（Laravel）※未実装
│   ├── src/                   #   Laravel アプリケーション
│   └── docs/                  #   API仕様書・DB設計書
│       ├── api/               #     OpenAPI 仕様（app_api.yaml）
│       └── db/                #     DB設計書・ER図
│
├── docker/                    # Docker 設定 ※未実装
│   ├── nginx/                 #   Nginx 設定
│   ├── php/                   #   PHP-FPM 設定
│   └── mysql/                 #   MySQL 設定
│
└── docker-compose.yaml        # Docker Compose 定義
```

フロントエンドは **Feature-based Architecture（機能単位アーキテクチャ）** を採用している。
詳細は [`frontend/docs/directory-structure.md`](frontend/docs/directory-structure.md) を参照。

## API ドキュメント（設計のみ・未実装）

バックエンド API の仕様は OpenAPI 3.0 形式で設計済み。実装は今後行う。

- 仕様ファイル: [`backend/docs/api/app_api.yaml`](backend/docs/api/app_api.yaml)
- DB 設計書: [`backend/docs/db/app_db.md`](backend/docs/db/app_db.md)

### 主要エンドポイント（予定）

| メソッド | パス | 説明 |
|---|---|---|
| POST | `/api/v1/auth/register` | ユーザー登録 |
| POST | `/api/v1/auth/login` | ログイン |
| POST | `/api/v1/auth/logout` | ログアウト |
| GET | `/api/v1/users/me` | マイページ情報取得 |
| GET | `/api/v1/favorites` | お気に入り一覧取得 |
| POST | `/api/v1/favorites` | お気に入り登録 |
| DELETE | `/api/v1/favorites/{restaurantId}` | お気に入り解除 |
| GET | `/api/v1/histories` | 閲覧履歴一覧取得 |
| POST | `/api/v1/restaurants/{restaurantId}/view` | 店舗閲覧記録 |

## 開発コマンド

### フロントエンド

```bash
cd frontend
npm run dev       # 開発サーバー起動
npm run build     # プロダクションビルド
npm run start     # プロダクションサーバー起動
npm run lint      # ESLint 実行
```

### バックエンド（Docker 経由）※未実装

```bash
docker compose up -d                                     # コンテナ起動
docker exec -it gourmet-php composer install              # 依存パッケージインストール
docker exec -it gourmet-php php artisan key:generate      # アプリキー生成
docker exec -it gourmet-php php artisan migrate           # マイグレーション実行
docker exec -it gourmet-php php artisan migrate:fresh     # DB リセット＋再マイグレーション
docker compose down                                      # コンテナ停止
```