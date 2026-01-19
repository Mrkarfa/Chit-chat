import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";
const TEST_EMAIL = "souvikkarfa40227@gmail.com";
const TEST_PASSWORD = "Souvik@9120";

test.describe("Chugli Chat App - Core Tests", () => {
  test("TC001 - Landing page loads correctly", async ({ page }) => {
    await page.goto(BASE_URL);

    // Verify logo/brand name in header
    await expect(page.locator('header span:has-text("Chugli")')).toBeVisible();

    // Verify hero headline
    await expect(page.locator("h1")).toContainText(/Chat Different/i);

    // Verify navigation links exist
    await expect(page.getByRole("link", { name: /sign up/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /login/i })).toBeVisible();

    // Verify hero section exists with CTA buttons
    await expect(
      page.getByRole("link", { name: /get started/i }),
    ).toBeVisible();
  });

  test("TC002 - Login page renders correctly", async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);

    // Verify form elements
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();

    // Verify signup link
    await expect(page.getByRole("link", { name: /sign up/i })).toBeVisible();
  });

  test("TC003 - Login with invalid credentials shows error", async ({
    page,
  }) => {
    await page.goto(`${BASE_URL}/login`);

    await page.getByLabel(/email/i).fill("invalid@test.com");
    await page.getByLabel(/password/i).fill("wrongpassword");
    await page.getByRole("button", { name: /sign in/i }).click();

    // Wait for error message
    await expect(page.locator("text=/invalid|incorrect|error/i")).toBeVisible({
      timeout: 5000,
    });
  });

  test("TC004 - Login with valid credentials succeeds", async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);

    await page.getByLabel(/email/i).fill(TEST_EMAIL);
    await page.getByLabel(/password/i).fill(TEST_PASSWORD);
    await page.getByRole("button", { name: /sign in/i }).click();

    // Wait for navigation to chat page
    await expect(page).toHaveURL(/\/chat/, { timeout: 10000 });
  });

  test("TC005 - Signup page renders correctly", async ({ page }) => {
    await page.goto(`${BASE_URL}/signup`);

    // Verify form elements
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/username/i)).toBeVisible();
    await expect(page.getByLabel(/^password$/i)).toBeVisible();
    await expect(page.getByLabel(/confirm.*password/i)).toBeVisible();

    // Verify age confirmation checkbox
    await expect(page.getByText(/16 years/i)).toBeVisible();

    // Verify terms checkbox
    await expect(page.getByText(/terms of service/i)).toBeVisible();
  });

  test("TC006 - Signup validates password requirements", async ({ page }) => {
    await page.goto(`${BASE_URL}/signup`);

    // Enter weak password
    const passwordInput = page.locator('input[type="password"]').first();
    await passwordInput.fill("weak");

    // Check password requirement indicators
    await expect(page.locator("text=/8\+.*character/i")).toBeVisible();
    await expect(page.locator("text=/uppercase/i")).toBeVisible();
    await expect(page.locator("text=/number/i")).toBeVisible();
  });

  test("TC007 - Chat layout loads after login", async ({ page }) => {
    // Login first
    await page.goto(`${BASE_URL}/login`);
    await page.getByLabel(/email/i).fill(TEST_EMAIL);
    await page.getByLabel(/password/i).fill(TEST_PASSWORD);
    await page.getByRole("button", { name: /sign in/i }).click();

    // Wait for chat page
    await expect(page).toHaveURL(/\/chat/, { timeout: 10000 });

    // Verify sidebar elements using exact text match to avoid strict mode violation
    await expect(
      page.getByRole("link", { name: "New Chat", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Random Chat", exact: true }),
    ).toBeVisible();
  });

  test("TC008 - New chat page accessible", async ({ page }) => {
    // Login first
    await page.goto(`${BASE_URL}/login`);
    await page.getByLabel(/email/i).fill(TEST_EMAIL);
    await page.getByLabel(/password/i).fill(TEST_PASSWORD);
    await page.getByRole("button", { name: /sign in/i }).click();
    await expect(page).toHaveURL(/\/chat/, { timeout: 10000 });

    // Navigate to new chat
    await page.getByRole("link", { name: "New Chat", exact: true }).click();
    await expect(page).toHaveURL(/\/chat\/new/, { timeout: 5000 });

    // Verify search input exists
    await expect(page.getByPlaceholder(/search.*user/i)).toBeVisible();
  });

  test("TC009 - Random chat page accessible", async ({ page }) => {
    // Login first
    await page.goto(`${BASE_URL}/login`);
    await page.getByLabel(/email/i).fill(TEST_EMAIL);
    await page.getByLabel(/password/i).fill(TEST_PASSWORD);
    await page.getByRole("button", { name: /sign in/i }).click();
    await expect(page).toHaveURL(/\/chat/, { timeout: 10000 });

    // Navigate to random chat
    await page.getByRole("link", { name: "Random Chat", exact: true }).click();
    await expect(page).toHaveURL(/\/chat\/random/, { timeout: 5000 });

    // Verify start button exists
    await expect(
      page.getByRole("button", { name: /start.*random/i }),
    ).toBeVisible();
  });

  test("TC010 - Settings page accessible", async ({ page }) => {
    // Login first
    await page.goto(`${BASE_URL}/login`);
    await page.getByLabel(/email/i).fill(TEST_EMAIL);
    await page.getByLabel(/password/i).fill(TEST_PASSWORD);
    await page.getByRole("button", { name: /sign in/i }).click();
    await expect(page).toHaveURL(/\/chat/, { timeout: 10000 });

    // Navigate to settings
    await page.goto(`${BASE_URL}/chat/settings`);
    await expect(page).toHaveURL(/\/chat\/settings/, { timeout: 5000 });

    // Verify settings tabs
    await expect(page.getByRole("button", { name: /profile/i })).toBeVisible();
    await expect(
      page.getByRole("button", { name: /appearance/i }),
    ).toBeVisible();
  });
});
