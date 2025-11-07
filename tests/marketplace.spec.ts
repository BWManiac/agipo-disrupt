import { test, expect } from "@playwright/test";

const MARKETPLACE_URL = "/marketplace";

test.describe("Home navigation", () => {
  test("Browse marketplace CTA routes to marketplace page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Browse marketplace" }).click();
    await expect(page).toHaveURL(/\/marketplace$/);
    await expect(page.getByRole("heading", { name: "Agent Marketplace" })).toBeVisible();
  });
});

test.describe("Marketplace page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(MARKETPLACE_URL);
  });

  test("Hero shows stats and view controls", async ({ page }) => {
    const hero = page.locator("section").first();
    await expect(hero.getByPlaceholder("Search agents, categories, or creators...")).toBeVisible();
    await expect(hero.getByRole("button", { name: "Grid" })).toBeVisible();
    await expect(hero.getByRole("button", { name: "List" })).toBeVisible();
    await expect(hero.locator("[data-slot='card']")).toHaveCount(3);
    await expect(hero.locator("[data-slot='card']").filter({ hasText: "Agents" }).first()).toBeVisible();
  });

  test("Search field accepts input and sort options are present", async ({ page }) => {
    const search = page.getByPlaceholder("Search agents, categories, or creators...");
    await search.fill("support");
    await expect(search).toHaveValue("support");
    await expect(page.getByRole("combobox")).toContainText("Most Popular");
  });

  test("Featured collections render three explore CTAs", async ({ page }) => {
    await expect(page.getByRole("button", { name: "Explore collection" })).toHaveCount(3);
  });

  test("Filter sidebar exposes key filter categories", async ({ page }) => {
    await expect(page.getByLabel("Customer Support")).toBeVisible();
    await expect(page.getByLabel("Beginner-friendly")).toBeVisible();
    await expect(page.getByLabel("Free")).toBeVisible();
  });

  test("Agent cards display tags and usage metrics", async ({ page }) => {
    const firstCard = page.locator("[data-slot='card']").filter({ hasText: "Customer Support Triage" }).first();
    await expect(firstCard.locator("span.rounded-full").filter({ hasText: "Support" }).first()).toBeVisible();
    await expect(firstCard.locator("text=1.2k uses")).toBeVisible();
  });

  test("Preview drawer opens and shows key sections", async ({ page }) => {
    await page.getByRole("button", { name: "Add to workspace" }).first().click();
    await expect(page.getByRole("heading", { name: "Customer Support Triage" })).toBeVisible();
    await expect(page.getByText("Key Features")).toBeVisible();
    await expect(page.getByText("Requirements")).toBeVisible();
    await expect(page.getByText("Recent Reviews")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByText("Recent Reviews")).not.toBeVisible();
  });

  test("Trust strip shows all compliance badges", async ({ page }) => {
    for (const label of ["Trusted by teams worldwide", "SOC 2 Certified", "ISO 27001", "GDPR Compliant", "Browser-based"]) {
      await expect(page.getByText(label, { exact: true })).toBeVisible();
    }
  });

  test("Creator spotlight lists four creators", async ({ page }) => {
    await expect(page.getByRole("button", { name: "View profile" })).toHaveCount(4);
    await expect(page.getByText("AGIPO Official")).toBeVisible();
  });

  test("Footer contains all link columns", async ({ page }) => {
    const footer = page.locator("footer");
    for (const heading of ["Marketplace", "Product", "Community", "Legal"]) {
      await expect(footer.getByText(heading, { exact: true })).toBeVisible();
    }
  });
});
