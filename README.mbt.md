# MoonBit + Luna UI 評価プロジェクト

MoonBitとLuna UI (Sol Framework) を使用したブログ管理ツールの実装評価。

## 技術スタック

- **言語**: MoonBit
- **UIフレームワーク**: Luna UI (Sol Framework)
- **ランタイム**: Cloudflare Workers
- **データベース**: D1 (SQLite)
- **Cloudflare Bindings**: mizchi/cloudflare パッケージ

## 言語比率（アプリケーションコード）

| 言語 | 行数 | 比率 | 用途 |
|------|------|------|------|
| **MoonBit** | 1,799 | **94.7%** | ルーティング、DB、UI、ビジネスロジック |
| TypeScript | 100 | 5.3% | Cloudflare Workerエントリーポイント（認証ラッパー） |

> 🎯 **目標達成**: MoonBit最大化の評価方針に基づき、アプリケーションロジックのほぼ全てをMoonBitで実装。

## セットアップ

```bash
# 依存関係のインストール
pnpm install

# 環境変数の設定
cp .env.example .env
# .envを編集して認証情報を設定

# ビルド
pnpm build

# 開発サーバー起動
pnpm dev

# ブラウザでアクセス
open http://localhost:8787
```

## 認証設定

Basic認証の認証情報は`.env`ファイルで管理：

```bash
BASIC_AUTH_USER=your_username
BASIC_AUTH_PASS=your_secure_password
```

`.dev.vars`は`.env`へのシンボリックリンクです（Wrangler用）。

## E2Eテスト

```bash
pnpm run test:e2e
```

## ディレクトリ構成

```
app/
├── server/          # サーバーサイド（MoonBit）
│   ├── routes.mbt   # ルーティング・ページ・API・Server Actions
│   └── db.mbt       # D1データベースアクセス
├── client/          # クライアントサイド（MoonBit）
│   └── markdown_editor.mbt  # Island Component
└── __gen__/         # 自動生成ファイル

static/              # 静的ファイル（Wranglerが配信）
├── loader.js        # Luna UIハイドレーションスクリプト
└── markdown_editor.js  # ビルド済みクライアントJS

src/
└── worker.ts        # Cloudflare Workerエントリーポイント（認証ラッパー）

tests/e2e/           # E2Eテスト（Playwright）
```

## MoonBit実装率

### JS FFI → MoonBit移行

| カテゴリ | 移行前FFI | 移行後FFI | 削減率 |
|---------|----------|----------|--------|
| データヘルパー | 6 | 0 | 100% |
| 文字列/JSON | 5 | 0 | 100% |
| クライアント | 5 | 3 | 40% |
| フレームワーク連携 | 3 | 0 | 100% |
| D1 SQL | 7 | 1 | **86%** |
| その他 | 0 | 2 | - |
| **合計** | **26** | **6** | **77%** |

> 🎯 **mizchi/cloudflare パッケージ採用**: D1アクセスを本家パッケージに移行し、FFIを7→1に削減

### MoonBit化された機能

- **データアクセス**: `get_str`, `get_int`, `is_null`, `array_len`, `array_get`
- **文字列処理**: `normalize_newlines`, `safe_excerpt`
- **JSON処理**: `parse_json`, `api_json_success`, `action_json_response`
- **URLパース**: `parse_form_urlencoded`, `safe_decode_uri`
- **クライアント**: `get_message`, `get_slug`, `generate_slug`
- **フレームワーク連携**: `parseBody()`, `redirect()` (Sol Framework API使用)

### 残存FFI（6件）

| FFI | 場所 | 理由 |
|-----|------|------|
| `get_global_db` | server | D1バインディング取得（1件に削減） |
| `get_timestamp` | server | JavaScript Date API |
| `safe_decode_uri` | server | decodeURIComponent例外処理 |
| `redirect_to` | client | DOM window.location API |
| `confirm_delete` | client | DOM window.confirm API |
| `get_form_data_from_form` | client | DOM FormData API |

> ✅ **D1アクセス最適化**: `mizchi/cloudflare`パッケージの`D1Database`/`D1PreparedStatement`型を使用し、SQL操作を型安全に実行

## 技術的知見

### MoonBit標準APIの活用

```moonbit
// JSオブジェクトのプロパティアクセス
let val = obj._get("field")

// null/undefinedチェック
if @core.is_nullish(val) { ... }

// JSオブジェクト生成
@core.from_entries([("key", @core.any(value))])

// JS例外のキャッチ
@core.try_sync(fn() { ... })
```

### Sol Framework APIの活用

```moonbit
// フォームボディの取得
let body = props.ctx.req.parseBody()

// HTTPリダイレクト
@core.any(props.ctx.redirect("/path"))
```

## 評価結果

### 正常に動作した機能

- ✅ Sol Frameworkのルーティング
- ✅ D1データベースCRUD操作
- ✅ Island Componentのハイドレーション
- ✅ リアルタイムマークダウンプレビュー（MoonBit `@markdown`使用）
- ✅ Basic認証（timingSafeEqual保護）
- ✅ Server Actions

### 制限事項

| 問題 | 状況 | 回避策 |
|------|------|--------|
| D1 SQL | MoonBitから直接呼び出せない | JS FFIでCloudflare D1 APIを呼び出し |
| DOM API | MoonBitから直接操作できない | `redirect_to`, `get_form_data_from_form`はFFI維持 |
| JS例外処理 | `@core.try_sync`の戻り値型制約 | 例外処理が必要な場合はFFI |

## デプロイ

```bash
# 本番デプロイ
wrangler deploy
```

## ライセンス

MIT
