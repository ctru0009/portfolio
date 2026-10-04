import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const CANONICAL_URL = "https://www.congchuongtruong.net/";
const SOCIAL_IMAGE_ALT =
  "Cong Chuong Truong - Software Engineer | Applied AI & Backend";

interface ImageFacts {
  alt: string;
  naturalWidth: number;
  naturalHeight: number;
  attrWidth: string | null;
  attrHeight: string | null;
  renderedWidth: number;
  renderedHeight: number;
  inFeaturedList: boolean;
  inDialog: boolean;
}

const collectImages = (page: Page) =>
  page.evaluate((): ImageFacts[] =>
    Array.from(document.images).map((img) => {
      const rect = img.getBoundingClientRect();
      return {
        alt: img.alt,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        attrWidth: img.getAttribute("width"),
        attrHeight: img.getAttribute("height"),
        renderedWidth: rect.width,
        renderedHeight: rect.height,
        inFeaturedList: !!img.closest(
          'ul[aria-labelledby="featured-projects-heading"]',
        ),
        inDialog: !!img.closest('[role="dialog"]'),
      };
    }),
  );

// Lazy images below the fold report natural size 0 until scrolled into range.
const loadAllImages = async (page: Page) => {
  await page.evaluate(async () => {
    const step = Math.max(200, Math.floor(window.innerHeight * 0.8));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    window.scrollTo(0, 0);
  });
  await expect
    .poll(
      async () =>
        page.evaluate(() =>
          Array.from(document.images).every(
            (img) => img.complete && img.naturalWidth > 0,
          ),
        ),
      { message: "all rendered images have loaded" },
    )
    .toBe(true);
};

test.describe("chrome, metadata and work dates", () => {
  test("canonical URL and social image alt metadata are present", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute(
      "href",
      CANONICAL_URL,
    );
    await expect(
      page.locator('head meta[property="og:image:alt"]'),
    ).toHaveAttribute("content", SOCIAL_IMAGE_ALT);
    await expect(
      page.locator('head meta[name="twitter:image:alt"]'),
    ).toHaveAttribute("content", SOCIAL_IMAGE_ALT);
  });

  test("theme-color metadata is present", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator('head meta[name="theme-color"]')).toHaveAttribute(
      "content",
      "#ffffff",
    );
  });

  test("images reserve dimensions and keep their source ratios", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.locator("#contact")).toBeVisible();
    await loadAllImages(page);

    const images = await collectImages(page);
    expect(images.length).toBeGreaterThan(0);

    for (const image of images) {
      expect(
        image.attrWidth,
        `${image.alt} has a width attribute`,
      ).not.toBeNull();
      expect(
        image.attrHeight,
        `${image.alt} has a height attribute`,
      ).not.toBeNull();
      expect(
        Number(image.attrWidth),
        `${image.alt} width attribute is a positive number`,
      ).toBeGreaterThan(0);
      expect(
        Number(image.attrHeight),
        `${image.alt} height attribute is a positive number`,
      ).toBeGreaterThan(0);
    }

    const featured = images.filter((image) => image.inFeaturedList);
    expect(featured.length).toBe(3);
    for (const image of featured) {
      const attrRatio = Number(image.attrWidth) / Number(image.attrHeight);
      expect(attrRatio, `${image.alt} reserved ratio`).toBeGreaterThanOrEqual(
        2.79,
      );
      expect(attrRatio, `${image.alt} reserved ratio`).toBeLessThanOrEqual(
        2.81,
      );
      expect(
        Math.abs(attrRatio - image.naturalWidth / image.naturalHeight),
        `${image.alt} reserved ratio matches natural ratio`,
      ).toBeLessThan(0.01);
    }

    const otherImages = images.filter(
      (image) =>
        !image.inFeaturedList &&
        !image.inDialog &&
        image.alt !== "Portrait of Cong Chuong Truong",
    );
    for (const image of otherImages) {
      expect(
        Math.abs(
          Number(image.attrWidth) / Number(image.attrHeight) -
            image.naturalWidth / image.naturalHeight,
        ),
        `${image.alt} reserved ratio matches natural ratio`,
      ).toBeLessThan(0.01);
    }

    // A project Details dialog renders its image at the intrinsic ratio.
    await page.getByRole("button", { name: "Details - VenueOps Lite" }).click();
    const details = page.getByRole("dialog", {
      name: "Details - VenueOps Lite",
    });
    await expect(details).toBeVisible();

    const dialogImage = details.locator("img");
    await expect(dialogImage).toHaveCount(1);
    await expect
      .poll(async () => dialogImage.evaluate((img) => img.naturalWidth))
      .toBeGreaterThan(0);

    const dialogFacts = await dialogImage.evaluate((img) => {
      const rect = img.getBoundingClientRect();
      return {
        attrWidth: Number(img.getAttribute("width")),
        attrHeight: Number(img.getAttribute("height")),
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        renderedWidth: rect.width,
        renderedHeight: rect.height,
      };
    });
    const naturalRatio = dialogFacts.naturalWidth / dialogFacts.naturalHeight;
    expect(
      Math.abs(dialogFacts.attrWidth / dialogFacts.attrHeight - naturalRatio),
    ).toBeLessThan(0.01);
    expect(
      Math.abs(
        dialogFacts.renderedWidth / dialogFacts.renderedHeight - naturalRatio,
      ),
    ).toBeLessThan(0.02);

    await page.keyboard.press("Escape");

    // pocket-lab has no image: Details stays useful text, never a placeholder.
    await page.getByRole("button", { name: "Details - pocket-lab" }).click();
    const pocketDialog = page.getByRole("dialog", {
      name: "Details - pocket-lab",
    });
    await expect(pocketDialog).toBeVisible();
    await expect(pocketDialog.locator("img")).toHaveCount(0);
    await expect(pocketDialog).toContainText(
      "An installer that keeps AI coding sessions reachable from your phone",
    );
    await expect(
      pocketDialog.getByRole("link", { name: /GitHub/ }),
    ).toBeVisible();
  });

  test("avatar uses a display-size square source", async ({ page }) => {
    await page.goto("/");

    const avatar = page.locator('img[alt="Portrait of Cong Chuong Truong"]');
    await expect(avatar).toHaveCount(1);
    await expect(avatar).toHaveAttribute("width", "140");
    await expect(avatar).toHaveAttribute("height", "140");
    await expect
      .poll(async () =>
        avatar.evaluate((img) => `${img.naturalWidth}x${img.naturalHeight}`),
      )
      .toBe("140x140");

    const box = await avatar.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeGreaterThan(0);
    expect(
      Math.abs(box!.width / box!.height - 1),
      "rendered avatar is square",
    ).toBeLessThanOrEqual(0.02);
  });

  test("work dates keep precision with normalized separators", async ({
    page,
  }) => {
    await page.goto("/");

    const works = page.locator("#works");
    await expect(works).toBeVisible();
    await expect(
      works.getByText("2026-Present", { exact: true }),
    ).toBeVisible();
    await expect(
      works.getByText("January 2023-February 2026", { exact: true }),
    ).toBeVisible();

    await expect(page.locator("#about")).toContainText("2021-2024");
  });

  test("window chrome text sits inside named landmarks", async ({ page }) => {
    await page.goto("/");

    const windowTitle = page.getByRole("region", { name: "Window title" });
    await expect(windowTitle).toBeVisible();
    await expect(windowTitle).toContainText("congchuongtruong.net");

    const roleRegion = page.getByRole("region", { name: "Role and location" });
    await expect(roleRegion).toBeVisible();
    await expect(roleRegion).toContainText("SOFTWARE ENGINEER - APPLIED AI");
  });

  test("has no moderate-or-higher axe violations", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#contact")).toBeVisible();

    const results = await new AxeBuilder({ page }).analyze();
    const blocking = results.violations.filter(
      (violation) =>
        violation.impact === "moderate" ||
        violation.impact === "serious" ||
        violation.impact === "critical",
    );

    expect(
      blocking.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        targets: violation.nodes.map((node) => node.target),
      })),
      "moderate-or-higher axe violations",
    ).toEqual([]);
  });
});
