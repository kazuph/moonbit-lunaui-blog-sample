import { Page, expect } from '@playwright/test';

/**
 * Navigation Helper Functions
 *
 * All navigation must go through UI elements (links, buttons).
 * Only `goto('/')` is allowed - all other pages must be reached via UI navigation.
 *
 * Note: We use page.setExtraHTTPHeaders() to add Basic Auth headers to all requests
 * because Playwright's httpCredentials doesn't work with browser navigations
 * (link clicks), only with the request API.
 */

/**
 * Setup Basic Auth header for all requests
 * This is needed because Playwright's httpCredentials doesn't work with
 * browser navigations (link clicks), only with the request API
 */
export async function setupAuthHeaders(page: Page): Promise<void> {
  const username = process.env.BASIC_AUTH_USER || '';
  const password = process.env.BASIC_AUTH_PASS || '';

  if (!username || !password) {
    console.warn('Warning: BASIC_AUTH credentials not found');
    return;
  }

  const credentials = Buffer.from(`${username}:${password}`).toString('base64');

  // Set extra HTTP headers for all requests
  await page.setExtraHTTPHeaders({
    'Authorization': `Basic ${credentials}`,
  });
}

/**
 * Navigate to homepage (the only allowed direct goto)
 */
export async function goToHome(page: Page): Promise<void> {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
}

/**
 * Navigate to admin page via UI link from homepage or current page
 */
export async function navigateToAdmin(page: Page): Promise<void> {
  // Look for admin link in navigation
  const adminLink = page.locator('a[href="/admin"], a:has-text("管理"), a:has-text("Admin")');
  await expect(adminLink.first()).toBeVisible({ timeout: 10000 });
  await adminLink.first().click();
  await page.waitForLoadState('networkidle');

  // Verify we're on admin page
  await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });
}

/**
 * Navigate to new post page via admin list
 */
export async function navigateToNewPost(page: Page): Promise<void> {
  // First ensure we're on admin page
  if (!page.url().includes('/admin')) {
    await navigateToAdmin(page);
  }

  // Click new post link
  const newPostLink = page.locator('a[href="/admin/posts/new"], a:has-text("新規作成"), a:has-text("New Post"), a:has-text("Create")');
  await expect(newPostLink.first()).toBeVisible({ timeout: 10000 });
  await newPostLink.first().click();
  await page.waitForLoadState('networkidle');

  // Wait for Island Component hydration (form may take time to load)
  await expect(page.locator('form')).toBeVisible({ timeout: 15000 });
}

/**
 * Navigate to edit page for a specific post via admin list
 */
export async function navigateToEditPost(page: Page, postTitle: string): Promise<void> {
  // First ensure we're on admin page
  if (!page.url().includes('/admin') || page.url().includes('/edit') || page.url().includes('/new')) {
    await navigateToAdmin(page);
  }

  // Find the post row and click edit link
  const postRow = page.locator(`tr:has-text("${postTitle}"), .post-item:has-text("${postTitle}")`);
  await expect(postRow.first()).toBeVisible({ timeout: 10000 });

  const editLink = postRow.first().locator('a:has-text("Edit"), a:has-text("編集")');
  await editLink.click();
  await page.waitForLoadState('networkidle');

  // Wait for Island component to hydrate
  await expect(page.locator('form, input[name="title"], button[type="submit"]').first()).toBeVisible({ timeout: 10000 });
}

/**
 * Navigate to a specific post detail page via homepage
 */
export async function navigateToPostDetail(page: Page, postSlug: string): Promise<void> {
  // Go to homepage first
  await goToHome(page);

  // Click the post link
  const postLink = page.locator(`a[href="/posts/${postSlug}"]`);
  await expect(postLink.first()).toBeVisible({ timeout: 10000 });
  await postLink.first().click();
  await page.waitForLoadState('networkidle');

  // Verify we're on the post page
  expect(page.url()).toContain(`/posts/${postSlug}`);
}

/**
 * Navigate from admin page back to homepage via UI
 */
export async function navigateToHomeFromAdmin(page: Page): Promise<void> {
  const homeLink = page.locator('a[href="/"], .main-nav a:first-child, a:has-text("Home"), a:has-text("ホーム")');
  await expect(homeLink.first()).toBeVisible({ timeout: 10000 });
  await homeLink.first().click();
  await page.waitForLoadState('networkidle');
}

/**
 * Start a fresh test by navigating to homepage with auth setup
 * This is the entry point for all tests that need auth
 */
export async function startFromHome(page: Page): Promise<void> {
  // Setup auth headers for all requests
  await setupAuthHeaders(page);

  await goToHome(page);
  await expect(page.locator('body')).toBeVisible();
}

/**
 * Full navigation flow: Home -> Admin -> New Post
 */
export async function navigateHomeToNewPost(page: Page): Promise<void> {
  await startFromHome(page);
  await navigateToAdmin(page);
  await navigateToNewPost(page);
}

/**
 * Full navigation flow: Home -> Admin -> Edit specific post
 */
export async function navigateHomeToEditPost(page: Page, postTitle: string): Promise<void> {
  await startFromHome(page);
  await navigateToAdmin(page);
  await navigateToEditPost(page, postTitle);
}
