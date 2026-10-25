const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

test("portfolio and local assets load without runtime or request errors", async ({
  page,
  request,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const failed = [];
  page.on("requestfailed", (req) => failed.push(req.url()));
  await page.goto("/");
  await expect(page).toHaveTitle(/Əli.*AliVerse Studio/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "İdeyadanrəqəmsaltəcrübəyə.",
  );
  for (const image of await page.locator("main img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() => image.evaluate((el) => el.complete && el.naturalWidth > 0))
      .toBe(true);
  }
  await expect(page.locator(".selected-card")).toHaveCount(2);
  await expect(page.locator(".archive-card")).toHaveCount(7);
  const links = await request.get("/links.json");
  expect(links.ok()).toBe(true);
  const data = await links.json();
  expect(data.websites.some((link) => link.url.endsWith("/k.a.d.r/"))).toBe(
    true,
  );
  expect(data.websites.some((link) => link.url.endsWith("/mini-games/"))).toBe(
    true,
  );
  expect(errors).toEqual([]);
  expect(failed).toEqual([]);
});

test("archive filters show the expected projects and announce the result", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Oyunlar 02" }).click();
  await expect(page.locator(".archive-card:visible")).toHaveCount(2);
  await expect(
    page.getByRole("status").filter({ hasText: "2 layihə göstərilir" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Oyunlar 02" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Yaradıcı təcrübələr 05" }).click();
  await expect(page.locator(".archive-card:visible")).toHaveCount(5);
  await page.getByRole("button", { name: "Hamısı 07" }).click();
  await expect(page.locator(".archive-card:visible")).toHaveCount(7);
});

test("all project dialogs show matching content, trap focus and restore it", async ({
  page,
}) => {
  await page.goto("/");
  const names = {
    unec: "UNEC Students Hub",
    kadr: "K.A.D.R",
    arcade: "Əli’s Arcade",
  };
  for (const [id, name] of Object.entries(names)) {
    const trigger = page.locator(`[data-project="${id}"]`);
    await trigger.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("heading", { level: 2 })).toHaveText(name);
    await expect(dialog.locator(".dialog-section")).toHaveCount(4);
    await expect(
      dialog.getByRole("link", { name: "Mənbə kodu" }),
    ).toHaveAttribute("href", /github\.com\/EricIsMyHero\/.+/);
    // The native dialog must cycle focus inside itself.
    for (let i = 0; i < 5; i++) await page.keyboard.press("Tab");
    expect(
      await dialog.evaluate((el) => el.contains(document.activeElement)),
    ).toBe(true);
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(trigger).toBeFocused();
    await expect(page.locator("body")).not.toHaveClass(/dialog-open/);
  }
  await page.locator('[data-project="kadr"]').click();
  await page.getByRole("button", { name: "Layihə məlumatını bağla" }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
});

test("navigation works at the selected viewport", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  if (testInfo.project.name === "mobile") {
    const toggle = page.getByRole("button", { name: "Menyu" });
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toBeFocused();
    await toggle.click();
  }
  await page
    .getByRole("navigation", { name: "Əsas naviqasiya" })
    .getByRole("link", { name: "Haqqımda" })
    .click();
  await expect(page).toHaveURL(/#about$/);
  await expect(
    page.getByRole("heading", { name: /Salam, mən Əliyəm/ }),
  ).toBeInViewport();
  if (testInfo.project.name === "mobile")
    await expect(page.getByRole("button", { name: "Menyu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
});

test("copy email reports success and provides a useful failure state", async ({
  page,
}) => {
  await page.addInitScript(() => {
    window.copiedText = null;
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async (text) => {
          window.copiedText = text;
        },
      },
    });
  });
  await page.goto("/");
  await page.getByRole("button", { name: "E-poçt ünvanını kopyala" }).click();
  await expect(page.locator("#copy-status")).toHaveText(
    "E-poçt ünvanı kopyalandı.",
  );
  expect(await page.evaluate(() => window.copiedText)).toBe(
    "ericismyhero2467@gmail.com",
  );
  await page.evaluate(() => {
    navigator.clipboard.writeText = async () => {
      throw Error("Denied");
    };
  });
  await page.getByRole("button", { name: "E-poçt ünvanını kopyala" }).click();
  await expect(page.locator("#copy-status")).toContainText(
    "əl ilə kopyalaya bilərsən",
  );
  await expect(
    page.getByRole("link", { name: "ericismyhero2467@gmail.com", exact: true }),
  ).toHaveAttribute("href", "mailto:ericismyhero2467@gmail.com");
});

test("core content and navigation work with JavaScript disabled", async ({
  browser,
  baseURL,
}, testInfo) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: testInfo.project.use.viewport,
  });
  const page = await context.newPage();
  await page.goto(baseURL);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator(".archive-card:visible")).toHaveCount(7);
  await expect(page.locator(".detail-button:visible")).toHaveCount(0);
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Əlaqə" })
    .click();
  await expect(page).toHaveURL(/#contact$/);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await context.close();
});

test("all internal links resolve and external tabs have safe attributes", async ({
  page,
}) => {
  await page.goto("/");
  const broken = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) =>
      links
        .filter(
          (a) => a.hash.length < 2 || !document.getElementById(a.hash.slice(1)),
        )
        .map((a) => a.outerHTML),
    );
  expect(broken).toEqual([]);
  const unsafe = await page
    .locator('a[target="_blank"]')
    .evaluateAll((links) =>
      links
        .filter(
          (a) =>
            !a.relList.contains("noopener") ||
            !a.relList.contains("noreferrer"),
        )
        .map((a) => a.href),
    );
  expect(unsafe).toEqual([]);
  expect(
    await page
      .locator('a[href="https://github.com/EricIsMyHero/k.a.d.r"]')
      .count(),
  ).toBe(1);
  expect(
    await page
      .locator('a[href="https://github.com/EricIsMyHero/mini-games"]')
      .count(),
  ).toBe(1);
});

test("layout fits small phones, tablets and desktop widths", async ({
  page,
}) => {
  for (const width of [320, 375, 640, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `Overflow at ${width}px`,
    ).toBe(true);
    await expect(page.locator(".hero-actions .button")).toBeVisible();
  }
});

test("page and project dialog meet automated WCAG AA checks", async ({
  page,
}) => {
  await page.goto("/");
  // Scroll through lazy-loaded images before checking the rendered page.
  for (const image of await page.locator("main img").all())
    await image.scrollIntoViewIfNeeded();
  const analyze = () =>
    new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
  let result = await analyze();
  expect(result.violations).toEqual([]);
  await page.locator('[data-project="kadr"]').click();
  result = await analyze();
  expect(result.violations).toEqual([]);
});
