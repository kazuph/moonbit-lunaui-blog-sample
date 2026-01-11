# E2E Tests

MoonBit + Luna UI Blog Admin の E2E テストスイート。

## Overview

Playwright を使用したブラウザベースの E2E テスト。

```
e2e/
├── auth.spec.ts         # 認証フロー
├── editor.spec.ts       # エディタ機能
├── blog-crud.spec.ts    # ブログCRUD操作
├── playwright.config.ts # Playwright設定
└── README.md            # このファイル
```

## Prerequisites

```bash
# Playwrightブラウザのインストール
npx playwright install chromium

# 環境変数設定 (.env)
BASIC_AUTH_USER=your_user
BASIC_AUTH_PASS=your_pass
```

## Running Tests

```bash
# 全E2Eテスト実行
npm run test:e2e

# UI モードで実行（デバッグ向け）
npm run test:e2e:ui

# ブラウザ表示付きで実行
npm run test:e2e:headed

# デバッグモードで実行
npm run test:e2e:debug

# 特定ファイルのみ実行
npx playwright test --config=e2e/playwright.config.ts e2e/auth.spec.ts
```

## Test Artifacts

テスト成果物は `.artifacts/` に出力されます:

```
.artifacts/
├── test-reports/   # HTMLレポート
└── test-results/   # スクリーンショット、動画、トレース
```

**レポート閲覧**:
```bash
npx playwright show-report .artifacts/test-reports
```

## Writing Tests

### Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test('should do something', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Expected Title/);
  });
});
```

### Best Practices

1. **Problem Detection First**
   - アサーションだけでなく、UIの異常を検知するJSを注入
   - 視覚的リグレッション検知を含める

2. **Real Environment Only**
   - モック禁止、実際のサービスを使用
   - ローカルエミュレータ許可（Firebase Emulator等）

3. **Reusable Test Assets**
   - テストは再利用可能なアセットとして整理
   - ドメイン別にディレクトリ分け推奨

4. **Evidence Collection**
   - 失敗時は自動でスクリーンショット・動画保存
   - トレースで詳細なデバッグ

### Example: Detecting UI Issues

```typescript
test('editor should have correct layout', async ({ page }) => {
  await page.goto('/editor');

  // 標準アサーション
  await expect(page.locator('.editor')).toBeVisible();

  // UI異常検知スクリプト
  const layoutIssues = await page.evaluate(() => {
    const editor = document.querySelector('.editor');
    if (!editor) return ['Editor not found'];

    const rect = editor.getBoundingClientRect();
    const issues: string[] = [];

    if (rect.width < 300) issues.push('Editor too narrow');
    if (rect.height < 200) issues.push('Editor too short');

    return issues;
  });

  expect(layoutIssues).toEqual([]);
});
```

## Configuration

`playwright.config.ts` の主要設定:

| 項目 | 値 | 説明 |
|------|-----|------|
| `baseURL` | `http://localhost:8787` | テスト対象URL |
| `retries` | 0 (CI: 2) | 失敗時リトライ |
| `workers` | auto (CI: 1) | 並列実行数 |
| `webServer` | `npm run dev` | 自動サーバー起動 |

## Troubleshooting

### 認証エラー

```bash
# .env の認証情報を確認
cat .env | grep BASIC_AUTH
```

### サーバー起動失敗

```bash
# 手動でサーバー起動してからテスト実行
npm run dev &
npm run test:e2e
```

### トレース確認

```bash
npx playwright show-trace .artifacts/test-results/*/trace.zip
```
