# DB設計書：グルメサーチアプリ

## 設計方針

- レストラン情報はHotPepper APIからリアルタイムに取得する（DBには保存しない）
- DBにはユーザー情報・認証トークン・お気に入り/履歴の関係性のみを保持する
- ユーザーの状態管理は `user_tokens` テーブルでトークンベースに管理する
- 全テーブルの外部キーは `ON DELETE CASCADE` を設定する


## テーブル定義

### 1. users（ユーザー）

ユーザーの基本情報を管理する。認証状態は `user_tokens` に委譲する。

| カラム名 | 型 | 制約 | 説明 |
|---|---|---|---|
| `id` | BIGINT UNSIGNED | PK, AUTO_INCREMENT | ユーザーID |
| `name` | VARCHAR(255) | NOT NULL | ユーザー名 |
| `logint_id` | VARCHAR(255) | NOT NULL, UNIQUE | loginID |
| `password` | VARCHAR(255) | NOT NULL | パスワード（ハッシュ） |
| `created_at` | TIMESTAMP | NULLABLE | 作成日時 |
| `updated_at` | TIMESTAMP | NULLABLE | 更新日時 |

### 2. user_tokens（認証トークン）

トークンベースでユーザーの認証状態を管理する。ログイン時にトークンを発行し、リクエストごとにトークンの有効性を検証する。

| カラム名 | 型 | 制約 | 説明 |
|---|---|---|---|
| `user_id` | BIGINT UNSIGNED | PK,FK → users.id, NOT NULL | ユーザーID |
| `token` | VARCHAR(255) | NOT NULL, UNIQUE | 認証トークン（ランダム生成） |
| `expired_at` | TIMESTAMP | NOT NULL | トークン有効期限 |
| `created_at` | TIMESTAMP | NULLABLE | トークン発行日時 |
| `updated_at` | TIMESTAMP | NULLABLE | 更新日時 |

**インデックス:**

- `UNIQUE KEY uq_token (token)` — トークンの一意性保証・高速検索用
- `INDEX idx_expired_at (expired_at)` — 期限切れトークン一括削除用

**外部キー:**

- `FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE`

---

### 3. favorites（お気に入り）

ユーザーがお気に入り登録した店舗IDを管理する。店舗情報はHotPepper APIの `id` パラメータで取得する。

| カラム名 | 型 | 制約 | 説明 |
|---|---|---|---|
| `id` | BIGINT UNSIGNED | PK, AUTO_INCREMENT | ID |
| `user_id` | BIGINT UNSIGNED | FK → users.id, NOT NULL | ユーザーID |
| `restaurant_id` | VARCHAR(30) | NOT NULL | HotPepper店舗ID（例: J999999999） |
| `created_at` | TIMESTAMP | NULLABLE | お気に入り登録日時 |
| `updated_at` | TIMESTAMP | NULLABLE | 更新日時 |

**インデックス:**

- `UNIQUE KEY uq_user_restaurant (user_id, restaurant_id)` — 同一店舗の重複登録防止
- `INDEX idx_user_id (user_id)` — ユーザー別お気に入り一覧取得用

**外部キー:**

- `FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE`

---

### 4. browse_histories（閲覧履歴）

ユーザーが店舗詳細を閲覧した履歴を管理する。同一店舗はUPSERTで1レコードに集約し、`updated_at` で最終閲覧日時を管理する。

| カラム名 | 型 | 制約 | 説明 |
|---|---|---|---|
| `id` | BIGINT UNSIGNED | PK, AUTO_INCREMENT | ID |
| `user_id` | BIGINT UNSIGNED | FK → users.id, NOT NULL | ユーザーID |
| `restaurant_id` | VARCHAR(30) | NOT NULL | HotPepper店舗ID（例: J999999999） |
| `created_at` | TIMESTAMP | NULLABLE | 初回閲覧日時 |
| `updated_at` | TIMESTAMP | NULLABLE | 最終閲覧日時 |

**インデックス:**

- `UNIQUE KEY uq_user_restaurant (user_id, restaurant_id)` — 同一店舗を1レコードに集約
- `INDEX idx_user_updated (user_id, updated_at DESC)` — 最終閲覧順の取得用

**外部キー:**

- `FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE`
