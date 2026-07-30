import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/contact",
  "/manufacturing-industry-ionic-erp-software",
  "/healthcare",
  "/trading-ionic-erp",
  "/chemical-industry-ionic-erp",
  "/lone-management-ionic-erp",
  "/agriculture-ionic-erp",
  "/all-services-ionic-erp",
] as const;

for (const route of routes) {
  test(`${route} renders without a route error`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("body")).toContainText("আইওনিক");
    await expect(page.locator("#__next_error__")).toHaveCount(0);
  });
}

test("unknown routes render the Bengali not-found page", async ({ page }) => {
  await page.goto("/does-not-exist");
  await expect(page.getByText("পৃষ্ঠা পাওয়া যায়নি")).toBeVisible();
});

test("request triggers share one reliable contact dialog", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "অনুরোধ করুন" }).first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.locator("dialog")).toHaveCount(1);
  await expect(page.locator("#my_modal_5")).toHaveCount(0);
});

test("mobile navigation opens and navigates", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.getByLabel("open sidebar").click();
  await page.getByRole("link", { name: /হোম/ }).last().click();
  await expect(page).toHaveURL("/");
});
