import { expect, test, type Browser, type Page } from "@playwright/test";

const BASE_URL = "http://localhost:4173";
const STATEMENT = "Open to backend/software engineering roles";
const SECTION_IDS = ["home", "works", "projects", "skills", "about", "contact"];
const FRAGMENTS = ["projects", "contact"] as const;

const DESKTOP = {
  name: "desktop-1440x900",
  width: 1440,
  height: 900,
  deviceScaleFactor: 1,
};
const MOBILE = {
  name: "mobile-390x844",
  width: 390,
  height: 844,
  deviceScaleFactor: 2,
};
type ViewportSpec = typeof DESKTOP;

const EXPECTED_SECTIONS = [
  { id: "works", step: "01", label: "Work" },
  { id: "projects", step: "02", label: "Projects" },
  { id: "skills", step: "03", label: "Skills" },
  { id: "about", step: "04", label: "About" },
  { id: "contact", step: "05", label: "Contact" },
];

const EXPECTED_NAV = [
  { text: "Home", href: "#home" },
  { text: "Work", href: "#works" },
  { text: "Projects", href: "#projects" },
  { text: "Skills", href: "#skills" },
  { text: "About", href: "#about" },
  { text: "Contact", href: "#contact" },
];

const openPage = async (browser: Browser, viewport: ViewportSpec) => {
  const context = await browser.newContext({
    baseURL: BASE_URL,
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: viewport.deviceScaleFactor,
  });
  const page = await context.newPage();
  return { context, page };
};

const activeNavHrefs = (page: Page) =>
  page.evaluate(() =>
    Array.from(
      document.querySelectorAll(
        'nav[aria-label="Main navigation"] a[aria-current="true"]',
      ),
    ).map((link) => link.getAttribute("href")),
  );

const measureLanding = (page: Page, fragment: string) =>
  page.evaluate((fragment) => {
    const element = document.getElementById(fragment);
    if (!element) return null;
    const rect = element.getBoundingClientRect();
    const maxScrollY =
      document.documentElement.scrollHeight - window.innerHeight;
    const targetOffset = rect.top + window.scrollY;
    return {
      scrollY: Math.round(window.scrollY),
      targetOffset: Math.round(targetOffset),
      expectedScrollY: Math.round(
        Math.max(0, Math.min(targetOffset - 56, maxScrollY)),
      ),
      maxScrollY: Math.round(maxScrollY),
      rectTop: Math.round(rect.top),
      rectBottom: Math.round(rect.bottom),
      viewportHeight: window.innerHeight,
    };
  }, fragment);

// Loads only the images that precede the fragment target, then returns to it.
const settleImagesBefore = async (
  page: Page,
  fragment: string,
  budgetMs: number,
) =>
  page.evaluate(
    async ({ fragment, budgetMs }) => {
      const target = document.getElementById(fragment);
      if (!target) return [] as Array<{ src: string; status: string }>;
      const targetTop = () =>
        target.getBoundingClientRect().top + window.scrollY;
      const images = Array.from(document.images).filter(
        (image) =>
          image.getBoundingClientRect().top + window.scrollY < targetTop(),
      );
      const outcomes: Array<{ src: string; status: string }> = [];
      for (const image of images) {
        const src = image.getAttribute("src") ?? "";
        if (image.complete && image.naturalWidth > 0) {
          outcomes.push({ src, status: "already-complete" });
          continue;
        }
        image.scrollIntoView({ block: "center", behavior: "auto" });
        const status = await new Promise<string>((resolve) => {
          const timer = setTimeout(() => resolve("unresolved"), budgetMs);
          const done = (value: string) => {
            clearTimeout(timer);
            resolve(value);
          };
          image.addEventListener("load", () => done("loaded"), { once: true });
          image.addEventListener("error", () => done("error"), { once: true });
        });
        outcomes.push({ src, status });
      }
      target.scrollIntoView({ block: "start", behavior: "auto" });
      return outcomes;
    },
    { fragment, budgetMs },
  );

const runColdCase = async (
  browser: Browser,
  viewport: ViewportSpec,
  fragment: string,
  throttled: boolean,
) => {
  const label = `${viewport.name} /#${fragment}${throttled ? " (500 kbps / 4x CPU)" : " (fast)"}`;
  const { context, page } = await openPage(browser, viewport);
  try {
    if (throttled) {
      const cdp = await context.newCDPSession(page);
      const through = Math.round((500 * 1024) / 8);
      await cdp.send("Network.enable");
      await cdp.send("Network.emulateNetworkConditions", {
        offline: false,
        latency: 20,
        downloadThroughput: through,
        uploadThroughput: through,
        connectionType: "cellular3g",
      });
      await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    }

    await page.goto(`/#${fragment}`, { waitUntil: "load" });
    await page.waitForSelector("#home", { timeout: 30_000 });
    // The app applies the fragment scroll after fonts settle; wait for that
    // before measuring (this is not test-driven scrolling).
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);

    // Cold evidence: measured before any test-driven scrolling.
    const landing = await measureLanding(page, fragment);
    if (!landing) throw new Error(`#${fragment} did not render`);
    console.log(
      `[cold-anchor] ${label} initial scrollY=${landing.scrollY} expected=${landing.expectedScrollY} targetOffset=${landing.targetOffset} maxScrollY=${landing.maxScrollY} rectTop=${landing.rectTop}`,
    );

    expect(
      Math.abs(landing.scrollY - landing.expectedScrollY),
      `${label} cold scroll position`,
    ).toBeLessThanOrEqual(8);
    expect(
      landing.rectTop < landing.viewportHeight && landing.rectBottom > 0,
      `${label} target intersects the viewport`,
    ).toBe(true);

    // Drift protocol: trigger only the images before the target, then compare
    // the target's settled document offset with its initial offset.
    const budgetMs = throttled ? 60_000 : 20_000;
    const outcomes = await settleImagesBefore(page, fragment, budgetMs);
    await page.waitForTimeout(300);
    const settled = await measureLanding(page, fragment);
    if (!settled) throw new Error(`#${fragment} disappeared`);
    const drift = settled.targetOffset - landing.targetOffset;
    console.log(
      `[cold-anchor] ${label} settledOffset=${settled.targetOffset} drift=${drift} images=${JSON.stringify(outcomes)}`,
    );
    expect(Math.abs(drift), `${label} settled drift`).toBeLessThanOrEqual(2);
  } finally {
    await context.close();
  }
};

test("sections render in Work → Contact order with unique ids", async ({
  page,
}) => {
  await page.goto("/");

  const sections = await page.locator("main > div[id]").evaluateAll((nodes) =>
    nodes.map((node) => ({
      id: node.id,
      step: node.querySelector("h2 > span:first-child")?.textContent?.trim(),
      label: node.querySelector("h2 > span:nth-child(2)")?.textContent?.trim(),
    })),
  );
  expect(sections).toEqual(EXPECTED_SECTIONS);

  for (const id of SECTION_IDS) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
});

test("navigation exposes the new labels and order", async ({ page }) => {
  await page.goto("/");

  const navItems = await page
    .locator('nav[aria-label="Main navigation"] a')
    .evaluateAll((links) =>
      links.map((link) => ({
        text: link.textContent?.trim(),
        href: link.getAttribute("href"),
      })),
    );
  expect(navItems).toEqual(EXPECTED_NAV);
});

test("the sidebar no longer renders a Contents list", async ({ page }) => {
  await page.goto("/");

  const sidebar = page.locator("aside");
  await expect(sidebar.getByText("Contents", { exact: true })).toHaveCount(0);
  await expect(sidebar.locator("nav")).toHaveCount(0);
});

test("desktop nav marks the active section", async ({ browser }) => {
  const { context, page } = await openPage(browser, DESKTOP);
  await page.goto("/");
  await page.waitForSelector("#home");
  await page.waitForTimeout(200);

  await expect.poll(() => activeNavHrefs(page)).toEqual(["#home"]);

  const positions = ["works", "projects", "skills", "about"];
  for (const id of positions) {
    await page.evaluate((id) => {
      const element = document.getElementById(id);
      if (!element) return;
      window.scrollTo(
        0,
        Math.max(0, element.getBoundingClientRect().top + window.scrollY - 56),
      );
    }, id);
    await expect.poll(() => activeNavHrefs(page)).toEqual([`#${id}`]);
  }

  await page.evaluate(() =>
    window.scrollTo(0, document.documentElement.scrollHeight),
  );
  await expect.poll(() => activeNavHrefs(page)).toEqual(["#contact"]);

  await context.close();
});

test("menu availability statement follows the locked responsive treatment", async ({
  browser,
}) => {
  // ≥1024: shown in the bar and complete (never ellipsised).
  const wide = await openPage(browser, DESKTOP);
  await wide.page.goto("/");
  const wideStatement = wide.page.getByText(STATEMENT, { exact: true }).first();
  await expect(wideStatement).toBeVisible();
  expect(
    await wideStatement.evaluate((el) => el.scrollWidth <= el.clientWidth + 1),
    "statement is complete at 1440",
  ).toBe(true);
  await wide.context.close();

  // 1024: complete (primary) or intentionally absent (locked 1120 fallback).
  const mid = await openPage(browser, {
    ...DESKTOP,
    name: "desktop-1024x900",
    width: 1024,
  });
  await mid.page.goto("/");
  const midStatement = mid.page.getByText(STATEMENT, { exact: true }).first();
  if ((await midStatement.count()) > 0 && (await midStatement.isVisible())) {
    expect(
      await midStatement.evaluate((el) => el.scrollWidth <= el.clientWidth + 1),
      "statement is either complete or absent at 1024",
    ).toBe(true);
  }
  await mid.context.close();

  // 800–1023: intentionally absent from the bar and the document.
  const band = await openPage(browser, {
    ...DESKTOP,
    name: "desktop-900x900",
    width: 900,
  });
  await band.page.goto("/");
  await expect(
    band.page.getByText(STATEMENT, { exact: true }).first(),
  ).toBeHidden();
  await band.context.close();

  // <800: first row of the open dropdown, non-interactive.
  const narrow = await openPage(browser, MOBILE);
  await narrow.page.goto("/");
  await narrow.page.getByRole("button", { name: "≡ Menu" }).click();
  const dropdown = narrow.page.locator("#menu-bar-dropdown");
  await expect(dropdown).toBeVisible();
  const firstRow = dropdown.locator(":scope > :first-child");
  await expect(firstRow).toHaveText(STATEMENT);
  expect(await firstRow.evaluate((el) => el.tagName)).toBe("DIV");
  await narrow.context.close();
});

test("status bar content lives inside the footer landmark", async ({
  page,
}) => {
  await page.goto("/");

  const contentinfo = page.getByRole("contentinfo");
  await expect(contentinfo).toHaveCount(1);
  await expect(contentinfo).toContainText("2026 · Cong Chuong Truong");
  await expect(contentinfo).toContainText(
    "React · Vite · GitHub Pages — no trackers",
  );
});

for (const viewport of [DESKTOP, MOBILE]) {
  for (const fragment of FRAGMENTS) {
    test(`cold deep link fast: ${viewport.name} /#${fragment}`, async ({
      browser,
    }) => {
      test.setTimeout(90_000);
      await runColdCase(browser, viewport, fragment, false);
    });

    test(`cold deep link throttled: ${viewport.name} /#${fragment}`, async ({
      browser,
    }) => {
      test.setTimeout(240_000);
      await runColdCase(browser, viewport, fragment, true);
    });
  }
}

test("same-document anchors and back/forward traversal", async ({ page }) => {
  await page.goto("/");
  await expect.poll(() => activeNavHrefs(page)).toEqual(["#home"]);

  await page
    .locator('nav[aria-label="Main navigation"] a[href="#projects"]')
    .click();
  await expect.poll(() => page.evaluate(() => location.hash)).toBe("#projects");
  await expect
    .poll(() =>
      page.evaluate(() =>
        Math.round(
          document.getElementById("projects")!.getBoundingClientRect().top,
        ),
      ),
    )
    .toBeLessThanOrEqual(64);

  await page.goBack();
  await expect.poll(() => page.evaluate(() => location.hash)).toBe("");
  await page.goForward();
  await expect.poll(() => page.evaluate(() => location.hash)).toBe("#projects");
});

test("back/forward into a cold fragment entry", async ({ browser }) => {
  const { context, page } = await openPage(browser, DESKTOP);
  try {
    // Browser scroll restoration must not mask a broken fragment handler.
    await context.addInitScript(() => {
      history.scrollRestoration = "manual";
    });
    await page.goto("/#contact");
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(200);

    await page.goto("/");
    await page.goBack();

    await expect
      .poll(() => page.evaluate(() => location.hash))
      .toBe("#contact");
    await expect
      .poll(
        () =>
          page.evaluate(() => {
            const element = document.getElementById("contact");
            if (!element) return Number.POSITIVE_INFINITY;
            const rect = element.getBoundingClientRect();
            const maxScrollY =
              document.documentElement.scrollHeight - window.innerHeight;
            const expected = Math.max(
              0,
              Math.min(rect.top + window.scrollY - 56, maxScrollY),
            );
            return Math.abs(window.scrollY - expected);
          }),
        { timeout: 10_000 },
      )
      .toBeLessThanOrEqual(8);
  } finally {
    await context.close();
  }
});

test("absent and invalid fragments are no-ops", async ({ browser }) => {
  for (const path of ["/", "/#nope"]) {
    const { context, page } = await openPage(browser, DESKTOP);
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(String(error)));
    await page.goto(path);
    await page.waitForSelector("#home");
    await page.waitForTimeout(500);
    expect(
      await page.evaluate(() => window.scrollY),
      `${path} stays at the top`,
    ).toBe(0);
    expect(errors, `${path} has no page errors`).toEqual([]);
    await context.close();
  }
});

test("mobile menu closes on navigation, Escape and outside click", async ({
  browser,
}) => {
  const { context, page } = await openPage(browser, MOBILE);
  await page.goto("/");
  const menuButton = page.getByRole("button", { name: "≡ Menu" });
  const dropdown = page.locator("#menu-bar-dropdown");

  await menuButton.click();
  await expect(dropdown).toBeVisible();
  const heights = await dropdown
    .locator("a")
    .evaluateAll((links) =>
      links.map((link) => Math.round(link.getBoundingClientRect().height)),
    );
  expect(heights.length).toBeGreaterThan(0);
  for (const height of heights) {
    expect(height).toBeGreaterThanOrEqual(44);
  }

  await dropdown.getByRole("link", { name: "Work", exact: true }).click();
  await expect(dropdown).toBeHidden();
  await expect.poll(() => page.evaluate(() => location.hash)).toBe("#works");
  await expect
    .poll(() =>
      page.evaluate(() =>
        Math.round(
          document.getElementById("works")!.getBoundingClientRect().top,
        ),
      ),
    )
    .toBeLessThanOrEqual(64);

  await menuButton.click();
  await expect(dropdown).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dropdown).toBeHidden();

  await menuButton.click();
  await expect(dropdown).toBeVisible();
  await page.mouse.click(8, 800);
  await expect(dropdown).toBeHidden();

  await context.close();
});

test("mobile dropdown marks the active section", async ({ browser }) => {
  const { context, page } = await openPage(browser, MOBILE);
  await page.goto("/");
  await page.evaluate(() => {
    const works = document.getElementById("works");
    if (!works) return;
    window.scrollTo(
      0,
      Math.max(0, works.getBoundingClientRect().top + window.scrollY - 56),
    );
  });

  await page.getByRole("button", { name: "≡ Menu" }).click();
  const dropdown = page.locator("#menu-bar-dropdown");
  await expect(dropdown).toBeVisible();
  await expect
    .poll(() => dropdown.locator('a[aria-current="true"]').getAttribute("href"))
    .toBe("#works");
  await expect(dropdown.locator('a[aria-current="true"]')).toHaveCount(1);

  await context.close();
});

test("Find remains section-oriented", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Find/ }).first().click();
  const dialog = page.getByRole("dialog", { name: "Find" });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("combobox", { name: "Search" }).fill("Docker");
  await dialog
    .getByRole("option", { name: /^Docker/ })
    .first()
    .click();
  await expect(dialog).toBeHidden();
  await expect
    .poll(() =>
      page.evaluate(() =>
        Math.round(
          document.getElementById("skills")!.getBoundingClientRect().top,
        ),
      ),
    )
    .toBeLessThanOrEqual(64);
});
