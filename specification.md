# 簡易仕様書

## アプリ名

もぐビュー

## 対象OSおよびブラウザ


| OS      | ブラウザ                             |
| ------- | -------------------------------- |
| iOS     | Safari / Chrome                  |
| Android | Chrome / Firefox                 |
| Windows | Chrome / Firefox / Edge          |
| macOS   | Safari / Chrome / Firefox / Edge |


## 開発環境


| 項目      | 内容             |
| ------- | -------------- |
| パソコン本体  | Windows        |
| エディタ    | Cursor         |
| 開発言語    | TypeScript     |
| バージョン管理 | Git / GitHub   |
| コンテナ環境  | Docker（今後導入予定） |


## 開発期間

2月16日〜3月2日（2週間）

## 機能一覧


| 機能      | パス                | 状態   | 説明                     |
| ------- | ----------------- | ---- | ---------------------- |
| ホーム     | `/home`           | 実装済み | ヒーローセクションと機能紹介         |
| レストラン検索 | `/search`         | 実装済み | 地図上で位置を指定し、範囲・キーワードで検索 |
| 検索結果一覧  | `/search/results` | 実装済み | 検索結果をカード形式で一覧表示        |
| 店舗詳細    | `/restaurant/:id` | 実装済み | 店舗の詳細情報を表示             |
| お気に入り   | `/favorites`      | 今後実装予定  | お気に入り店舗の一覧管理（要ログイン）    |
| 閲覧履歴    | `/history`        | 今後実装予定  | 閲覧した店舗の履歴一覧（要ログイン）     |
| ルーレット   | `/roulette`       | 今後実装予定  | ランダムで店舗を選択             |
| ログイン    | `/login`          | 今後実装予定  | ユーザー認証                 |
| ユーザー登録  | `/register`       | 今後実装予定  | 新規ユーザー登録               |

**ルートパス `/` の扱い**: ルートパス `/` にアクセスした場合は、ホーム画面 `/home` へリダイレクトする。

## フレームワーク


| 技術                   | バージョン |
| -------------------- | ----- |
| Next.js (App Router) | 16    |
| React                | 19    |
| TypeScript           | 5     |
| Tailwind CSS         | v4    |
| Laravel              | 11    |


## 主要ライブラリ


| ライブラリ                   | 用途          |
| ----------------------- | ----------- |
| Leaflet / React Leaflet | 地図表示・操作     |
| clsx / tailwind-merge   | クラス名の結合・マージ |


## テーブル定義

バックエンド API の仕様は OpenAPI 3.0 形式で設計済み。実装は今後行う。

- フロントエンドディレクトリ設計: `[frontend/docs/directory-structure.md](frontend/docs/directory-structure.md)`
- API 仕様ファイル: `[backend/docs/api/app_api.yaml](backend/docs/api/app_api.yaml)`
- DB 設計書: `[backend/docs/db/app_db.md](backend/docs/db/app_db.md)`

## 開発環境構築手順

**デプロイ先**: [https://mogu-view.vercel.app/](https://mogu-view.vercel.app/)

### 1. リポジトリのクローン

```bash
git clone https://github.com/akito-arakawa/mogu-view.git
```

### 2. 環境変数の設定

```bash
cp frontend/.env.example frontend/.env.local
```

`frontend/.env.local` を編集し、ホットペッパー API キーを設定する。

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1
NEXT_PUBLIC_HOTPEPPER_API_KEY=your_api_key_here
```

### 3. フロントエンドの起動

```bash
cd frontend
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) でアクセスできる。

## コンセプト

**今いる場所の近くで、美味しいお店をすぐ見つけられる**

## こだわったポイント

### 検索画面

- マップを使用し、自分がいる場所を視覚的にわかりやすくしました
- 検索範囲を変えるごとに円の大きさを変えて、どこまでの範囲か分かりやすくしました
- キーワード検索を追加して、今自分が食べたい料理を絞り込みできるようにしました

### 一覧画面

- タグを使用して、お店の系統がひと目でわかるようにしました
- 値段を入れて、自分の予算に合った店を探しやすくしました
- 重くならないようにページングを使い、一度にまとめて取らない設計にしました
- 複数ページある場合のページングの設計にこだわりました

### 詳細画面

- 予約ボタンを作成し、その店舗のホットペッパーサイトに遷移できるようにしました
- 地図ボタンを追加して、お店の場所を Google Map で確認できるようにしました

### ホーム画面

- このアプリのコンセプトをパッと見てわかるようなデザインにしました

### ディレクトリ設計

- 機能単位アーキテクチャ（Feature-based Architecture）を使って、可読性・保守性を考えてディレクトリを構成しました
- 再利用しやすい設計にしました

## デザイン面でこだわったポイント

- 位置情報と地図を中心に配置し、「今いる場所から探す」という体験が直感的に分かるレイアウトにしました
- 検索範囲を変更すると地図上の円のサイズが即時に変化するようにし、操作結果がすぐに視覚で理解できる設計にしました
- 一覧画面では以下の情報をカード内に整理し、ひと目で判断できる UI にしました:
  - 店舗名
  - ジャンルタグ
  - 予算
  - アクセス情報

## 技術面でアドバイスして欲しいポイント

- `useGeolocation` フックで、`useEffect` 内から呼び出す関数の中に`setState` が含まれていたため、`Error: Calling setState synchronously within an effect can trigger cascading` のLintエラーが発生しました。
一時的に `useRef` で関数を間接化して回避しましたが、本質的な解決ではないと感じています。
effectの責務を保ちつつ、よりシンプルに実装する方法についてアドバイスをいただきたいです。
- Leaflet が SSR 非対応のため `dynamic import` で対処しました。SSR 非対応ライブラリの扱い方としてより良い方法があれば知りたいです。

## 自己評価

### 総合評価：6.5 / 10

### 良かった点

- 最低限の画面・機能が完成できたこと
- 機能単位アーキテクチャでのディレクトリ設計
- errorとloadingの画面まで対応できたこと
- Skeletonを用意して、UXを意識したこと
- スマホでも見やすいレイアウト

### 改善点

- 未実装の機能が多いこと
- テストが実装できなかったこと
- Icon用の共通フォルダにわけるべきだった
