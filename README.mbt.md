# MoonBit + Luna UI 評価プロジェクト

MoonBitとLuna UI (Sol Framework) を使用したブログ管理ツールの実装評価。

## 技術スタック

- **言語**: MoonBit
- **UIフレームワーク**: Luna UI (Sol Framework)
- **ランタイム**: Cloudflare Workers
- **データベース**: D1 (SQLite)

## セットアップ

```bash
# 依存関係のインストール
pnpm install

# 環境変数の設定
cp .env.example .env
# .envを編集して認証情報を設定

# MoonBitビルド
just build

# 開発サーバー起動
just dev

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
│   ├── routes.mbt   # ルーティング・ページ・API
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

## 評価結果

### 正常に動作した機能

- ✅ Sol Frameworkのルーティング
- ✅ D1データベースCRUD操作
- ✅ Island Componentのハイドレーション
- ✅ リアルタイムマークダウンプレビュー
- ✅ Basic認証（timingSafeEqual保護）

### 制限事項

| 問題 | 状況 | 回避策 |
|------|------|--------|
| マークダウン変換 | `@mizchi/markdown`がUTF-16サロゲートペアで`InvalidIndex`エラー | JS fallbackで正規表現変換 |
| APIリダイレクト | Sol Framework ApiHandlerが302を返せない | クライアント側でLocationヘッダーを読み取り |

## ライセンス

MIT
