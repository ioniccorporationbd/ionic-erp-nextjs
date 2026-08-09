import { expect, test, type Page } from "@playwright/test";

async function openMobileDrawerIfNeeded(page: Page) {
  if (page.viewportSize()!.width <= 767) {
    await page.getByRole("button", { name: "Menu", exact: true }).click();
    await expect(page.getByRole("dialog", { name: "Documentation menu" })).toBeVisible();
  }
}

async function openSearchWithShortcut(page: Page) {
  await page.locator("body").click({ position: { x: 20, y: 20 } });
  await page.evaluate(() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true })));
}

test.describe("Ionic Tutorial API-driven documentation", () => {
  test.describe.configure({ mode: "serial" });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
  });

  test("tutorial pages hydrate without hydration mismatch warnings", async ({ page }) => {
    // Regression guard: a server/client HTML mismatch (e.g. a component
    // branching on data that differs between SSR and the first client
    // render) logs a React hydration warning even in production builds.
    const hydrationWarnings: string[] = [];
    page.on("console", (message) => {
      const text = message.text();
      if (/hydrat|didn't match|did not match/i.test(text)) hydrationWarnings.push(text);
    });
    page.on("pageerror", (error) => {
      if (/hydrat|didn't match|did not match/i.test(error.message)) hydrationWarnings.push(error.message);
    });

    for (const path of ["/tutorial", "/tutorial/long-article", "/tutorial?space=ionic-pos", "/tutorial/runtime-article"]) {
      await page.goto(path);
      await expect(page.locator("#__next_error__")).toHaveCount(0);
    }
    expect(hydrationWarnings, hydrationWarnings.join("\n---\n") || "no hydration warnings logged").toEqual([]);
  });

  test("default article, landmarks, navigation, heading order, and visual baseline", async ({ page }, testInfo) => {
    await page.goto("/tutorial");
    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("main")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1, name: "Welcome" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    if (page.viewportSize()!.width <= 767) {
      await page.getByRole("button", { name: "Menu", exact: true }).click();
      await expect(page.getByRole("dialog", { name: "Documentation menu" }).getByRole("navigation", { name: "Documentation navigation" })).toBeVisible();
      await page.keyboard.press("Escape");
    } else {
      await expect(page.getByRole("navigation", { name: "Documentation navigation" }).first()).toBeAttached();
    }
    await expect(page.locator("#__next_error__")).toHaveCount(0);
    await expect(page).toHaveScreenshot(`tutorial-default-${testInfo.project.name}.png`, { fullPage: true, animations: "disabled" });
  });

  test("deep article link, long article, code blocks, tables, alerts, external links, and visual baseline", async ({ page }, testInfo) => {
    await page.goto("/tutorial/long-article");
    await expect(page.getByRole("heading", { level: 1, name: /Long Article/ })).toBeVisible();
    await expect(page.getByText("bench --site next.ionicerp.xyz migrate")).toBeVisible();
    await expect(page.getByRole("table")).toBeVisible();
    await expect(page.getByText("Alert content for accessibility")).toBeVisible();
    await expect(page.getByRole("link", { name: "External Link" })).toHaveAttribute("rel", /noopener/);
    await expect(page.getByRole("link", { name: "Unsafe Link" })).toHaveCount(0);
    await expect(page).toHaveScreenshot(`tutorial-long-${testInfo.project.name}.png`, { animations: "disabled" });
  });

  test("category expansion, previous/next, and new runtime article added after build", async ({ page }) => {
    await page.goto("/tutorial/runtime-article");
    await openMobileDrawerIfNeeded(page);
    const longCategory = page.getByRole("button", { name: /Long Navigation Category/ }).first();
    await longCategory.click();
    await expect(longCategory).toHaveAttribute("aria-expanded", "true");
    const navScope = page.viewportSize()!.width <= 767 ? page.getByRole("dialog", { name: "Documentation menu" }) : page;
    await navScope.getByRole("link", { name: /Long Article/ }).first().click();
    await expect(page).toHaveURL(/\/tutorial\/long-article$/);
    await page.getByRole("link", { name: /Next New Article Added After Frontend Build/ }).click();
    await expect(page).toHaveURL(/\/tutorial\/post-build-article$/);
    await expect(page.getByRole("heading", { level: 1, name: "Post Build" })).toBeVisible();
  });

  test("heading anchors and table-of-contents navigation", async ({ page }) => {
    await page.goto("/tutorial/long-article");
    const toc = page.getByLabel("On this page");
    if (await toc.isVisible()) {
      await page.getByRole("link", { name: "Table section" }).click();
      await expect(page).toHaveURL(/#table-section$/);
    } else {
      await page.goto("/tutorial/long-article#table-section");
      await expect(page.locator("#table-section")).toBeVisible();
    }
    await page.getByRole("button", { name: "Copy link to Table section" }).click();
  });

  test("Ctrl/Cmd+K search, keyboard selection, escape, and accessible search", async ({ page }) => {
    await page.goto("/tutorial");
    await expect(page.getByRole("heading", { level: 1, name: "Welcome" })).toBeVisible();
    await openSearchWithShortcut(page);
    let dialog = page.getByRole("dialog", { name: "Search documentation" });
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    if (page.viewportSize()!.width > 767) {
      await page.getByRole("button", { name: "Open search" }).click();
    } else {
      await openSearchWithShortcut(page);
    }
    dialog = page.getByRole("dialog", { name: "Search documentation" });
    await expect(dialog).toBeVisible();
    await page.getByRole("searchbox").fill("runtime");
    await expect(dialog.getByRole("link", { name: /Runtime Article/ })).toBeVisible();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/tutorial\/runtime-article$/);
  });

  test("back to home button redirects home and mobile drawer works", async ({ page }) => {
    await page.goto("/tutorial");
    const backHome = page.getByRole("link", { name: "Back to Home" });
    await expect(backHome).toHaveAttribute("href", "/");
    await backHome.click();
    await expect(page).toHaveURL(/\/$/);
    if (page.viewportSize()!.width <= 767) {
      await page.goto("/tutorial");
      await page.getByRole("button", { name: "Menu", exact: true }).click();
      await expect(page.getByRole("dialog", { name: "Documentation menu" })).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.getByRole("dialog", { name: "Documentation menu" })).toHaveCount(0);
    }
  });

  test("space dropdown lists published spaces and scopes navigation with ?space=", async ({ page }) => {
    await page.goto("/tutorial");
    await page.getByRole("button", { name: /choose tutorial space/ }).click();
    const listbox = page.getByRole("listbox", { name: "Tutorial spaces" });
    await expect(listbox).toBeVisible();
    await expect(listbox.getByRole("option", { name: /Ionic POS/ })).toBeVisible();
    await expect(listbox.getByRole("option", { name: /Ionic Tutorial/ })).toHaveAttribute("aria-current", "true");
    await listbox.getByRole("option", { name: /Ionic POS/ }).getByRole("link").click();
    await expect(page).toHaveURL(/\?space=ionic-pos$/);
    // The pager is present on every viewport (the sidebar link is hidden on mobile).
    await expect(page.getByRole("link", { name: /Next Runtime Article/ })).toHaveAttribute("href", "/tutorial/runtime-article?space=ionic-pos");
  });

  test("404 and API error states render without leaking ERP details", async ({ page }) => {
    await page.goto("/tutorial/does-not-exist");
    await expect(page.getByRole("heading", { name: "Tutorial page not found" })).toBeVisible();
    await page.goto("/tutorial/api-error");
    await expect(page.getByRole("heading", { name: "Unable to load tutorial" })).toBeVisible();
    await expect(page.getByText(/API returned an error/)).toBeVisible();
  });

  test("a published space without content renders a friendly empty state instead of an error", async ({ page }) => {
    await page.goto("/tutorial?space=empty-space");
    await expect(page.getByRole("heading", { level: 1, name: "খালি Space" })).toBeVisible();
    await expect(page.getByText("এই space-এ এখনো কোনো প্রকাশিত নথি নেই।")).toBeVisible();
    // Other published spaces stay reachable from the empty state.
    await expect(page.getByRole("link", { name: "Ionic Tutorial" })).toHaveAttribute("href", "/tutorial");
    await expect(page.getByRole("link", { name: "Ionic POS" })).toHaveAttribute("href", "/tutorial?space=ionic-pos");
    await expect(page.locator("#__next_error__")).toHaveCount(0);
  });
});
