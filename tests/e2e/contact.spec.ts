import { expect, test } from "@playwright/test";

// Values mirror HeroData in src/data/data.ts (the spec cannot import the module:
// it resolves image assets that the Playwright transform cannot load).
const EMAIL = "truongcongchuong123@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/congchuongtruong/";
const GITHUB_URL = "https://github.com/ctru0009";
const RESUME_URL =
  "https://drive.google.com/file/d/1AW3Mq0g6_rypW3C3K0cEpBbvGI6b6Gq3/view?usp=sharing";

test.describe("contact", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("keeps one canonical contact block with Email me and copy actions", async ({
    page,
  }) => {
    const contact = page.locator("#contact");
    await expect(contact).toHaveCount(1);

    await expect(
      contact.getByText("Email is the fastest way to reach me.", {
        exact: true,
      }),
    ).toBeVisible();

    const emailMe = contact.getByRole("link", {
      name: "Email me",
      exact: true,
    });
    await expect(emailMe).toHaveCount(1);
    await expect(emailMe).toHaveAttribute("href", `mailto:${EMAIL}`);

    // The Contact block owns a single mailto action; the sidebar keeps its own
    // intentional pre-release links (asserted separately).
    await expect(contact.locator('a[href^="mailto:"]')).toHaveCount(1);

    await expect(
      page.getByRole("button", { name: "Copy email address", exact: true }),
    ).toHaveCount(1);

    const actions = contact.getByRole("group", { name: "Contact actions" });
    await expect(actions).toHaveCount(1);
    await expect(
      actions.getByRole("link", { name: "View CV", exact: true }),
    ).toHaveAttribute("href", RESUME_URL);
    await expect(actions.getByRole("link")).toHaveCount(2);
    await expect(actions.getByRole("button")).toHaveCount(1);

    await expect(contact.getByRole("status")).toHaveCount(1);
  });

  test("shows the Direct panel as the only contact block", async ({ page }) => {
    const contact = page.locator("#contact");

    await expect(page.getByText("Direct", { exact: true })).toHaveCount(1);

    // The email row is visible plain text, not a link.
    await expect(contact.getByText(EMAIL, { exact: true })).toBeVisible();
    await expect(
      contact.getByRole("link", { name: EMAIL, exact: true }),
    ).toHaveCount(0);

    await expect(contact.getByText("EMAIL", { exact: true })).toBeVisible();
    await expect(contact.getByText("LINKEDIN", { exact: true })).toBeVisible();
    await expect(contact.getByText("GITHUB", { exact: true })).toBeVisible();

    await expect(
      contact.getByRole("link", { name: "congchuongtruong", exact: true }),
    ).toHaveAttribute("href", LINKEDIN_URL);
    await expect(
      contact.getByRole("link", { name: "ctru0009", exact: true }),
    ).toHaveAttribute("href", GITHUB_URL);

    // The old duplicated Contact panels and their copy are gone.
    await expect(
      page.getByText("Contact Information", { exact: true }),
    ).toHaveCount(0);
    await expect(
      page.getByText("Let's work together", { exact: true }),
    ).toHaveCount(0);
    await expect(page.getByText("View Resume", { exact: true })).toHaveCount(0);
  });

  test("restores the intentional sidebar links and keeps the footer clean", async ({
    page,
  }) => {
    const sidebar = page.locator("aside");
    const footer = page.locator("footer");

    // D1: the sidebar's duplicate availability line is removed; the
    // pre-release links stay intentionally.
    await expect(
      sidebar.getByText("Open to software engineering opportunities"),
    ).toHaveCount(0);
    await expect(
      sidebar.getByRole("link", { name: "GitHub", exact: true }),
    ).toHaveAttribute("href", GITHUB_URL);
    await expect(
      sidebar.getByRole("link", { name: "LinkedIn", exact: true }),
    ).toHaveAttribute("href", LINKEDIN_URL);
    await expect(
      sidebar.getByRole("link", { name: "Email", exact: true }),
    ).toHaveAttribute("href", `mailto:${EMAIL}`);
    await expect(sidebar.getByText(`…or email me - ${EMAIL}`)).toBeVisible();

    // The footer keeps no links or legacy copy of its own.
    await expect(footer.getByRole("link")).toHaveCount(0);
    await expect(
      footer.getByText("Melbourne, Australia", { exact: true }),
    ).toHaveCount(0);

    // Contact keeps no availability restatement.
    const contact = page.locator("#contact");
    await expect(
      contact.getByText("Open to full-time roles", { exact: true }),
    ).toHaveCount(0);
    await expect(
      contact.getByText("Based in Melbourne", { exact: true }),
    ).toHaveCount(0);
    await expect(
      contact.getByText(/Open to full-time software engineering roles/),
    ).toHaveCount(0);
  });

  test("shows the pre-release sidebar CV box labelled View CV", async ({
    page,
  }) => {
    const sidebar = page.locator("aside");
    const viewCv = sidebar.getByRole("link", {
      name: "View CV",
      exact: true,
    });

    await expect(viewCv).toHaveCount(1);
    await expect(viewCv).toHaveAttribute("href", RESUME_URL);

    // The release-era Contents list is intentionally gone.
    await expect(sidebar.getByText("Contents", { exact: true })).toHaveCount(0);
  });
});

for (const viewport of [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
]) {
  test.describe(`initial viewport (${viewport.name})`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    test("keeps the sidebar CV action inside the first screen", async ({
      page,
    }) => {
      await page.goto("/");
      await page.evaluate(() => window.scrollTo(0, 0));

      const viewCv = page
        .locator("aside")
        .getByRole("link", { name: "View CV", exact: true });
      await expect(viewCv).toBeInViewport();

      const box = await viewCv.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.y).toBeGreaterThanOrEqual(0);
      expect(box!.y + box!.height).toBeLessThanOrEqual(viewport.height);
    });
  });
}

test.describe("copy email feedback", () => {
  test.use({ permissions: ["clipboard-read", "clipboard-write"] });

  test("announces success and writes the address to the clipboard", async ({
    page,
  }) => {
    await page.goto("/");
    const status = page.locator("#contact").getByRole("status");
    await expect(status).toBeEmpty();

    await page
      .getByRole("button", { name: "Copy email address", exact: true })
      .click();

    await expect(status).toHaveText("Email address copied.");
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
      EMAIL,
    );
    await expect(
      page.getByRole("link", { name: "Email me", exact: true }),
    ).toHaveAttribute("href", `mailto:${EMAIL}`);
  });

  test("falls back to the visible email when the clipboard rejects", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: {
          writeText: () => Promise.reject(new Error("clipboard blocked")),
        },
      });
    });
    await page.goto("/");

    const status = page.locator("#contact").getByRole("status");
    await expect(status).toBeEmpty();

    await page
      .getByRole("button", { name: "Copy email address", exact: true })
      .click();

    await expect(status).toHaveText("Copy failed - use Email me.");
    await expect(
      page.locator("#contact").getByText(EMAIL, { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Email me", exact: true }),
    ).toHaveAttribute("href", `mailto:${EMAIL}`);
  });

  test("falls back when the clipboard is unavailable", async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: undefined,
      });
    });
    await page.goto("/");

    await page
      .getByRole("button", { name: "Copy email address", exact: true })
      .click();

    await expect(page.locator("#contact").getByRole("status")).toHaveText(
      "Copy failed - use Email me.",
    );
  });
});

test.describe("small screens", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("keeps the contact and restored sidebar targets at 44px with a visible focus ring", async ({
    page,
  }) => {
    await page.goto("/");

    const sidebar = page.locator("aside");
    const targets = [
      sidebar.getByRole("link", { name: "GitHub", exact: true }),
      sidebar.getByRole("link", { name: "LinkedIn", exact: true }),
      sidebar.getByRole("link", { name: "Email", exact: true }),
      sidebar.getByRole("link", { name: /or email me/ }),
      sidebar.getByRole("link", { name: "View CV", exact: true }),
      page.getByRole("link", { name: "Email me", exact: true }),
      page.getByRole("button", { name: "Copy email address", exact: true }),
      page
        .locator("#contact")
        .getByRole("link", { name: "View CV", exact: true }),
    ];

    for (const target of targets) {
      await target.scrollIntoViewIfNeeded();
      const box = await target.boundingBox();
      expect(box, "tap target box").not.toBeNull();
      expect(box!.height, "tap target height").toBeGreaterThanOrEqual(44);
    }

    // Keyboard focus must show the focus-visible outline on the primary action.
    const emailMe = page.getByRole("link", { name: "Email me", exact: true });
    await emailMe.focus();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Shift+Tab");
    await expect(emailMe).toBeFocused();

    const outline = await emailMe.evaluate((node) => {
      const style = getComputedStyle(node);
      return { width: style.outlineWidth, style: style.outlineStyle };
    });
    expect(outline.style).toBe("solid");
    expect(Number.parseFloat(outline.width)).toBeGreaterThanOrEqual(3);
  });
});
