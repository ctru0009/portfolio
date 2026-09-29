import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator } from "@playwright/test";

const sections = ["home", "about", "skills", "works", "projects", "contact"];
const featuredProjectIds = ["resource-planning", "venueops-lite", "ccswap"];
const remainingProjectIds = [
  "ai-product-enrichment",
  "catalogue-qa",
  "tradeflow",
  "pocket-lab",
  "expense-report",
  "invoice-approval",
];
const expectedProjectIds = [...featuredProjectIds, ...remainingProjectIds];

const expectSummaryTextFits = async (container: Locator) => {
  const summaries = await container
    .locator("[data-project-id] p")
    .evaluateAll((elements) =>
      elements.map((element) => {
        const paragraph = element as HTMLParagraphElement;
        return {
          text: paragraph.innerText.trim(),
          clientHeight: paragraph.clientHeight,
          scrollHeight: paragraph.scrollHeight,
          clientWidth: paragraph.clientWidth,
          scrollWidth: paragraph.scrollWidth,
          overflow: getComputedStyle(paragraph).overflow,
        };
      }),
    );

  expect(summaries.length).toBeGreaterThan(0);
  for (const summary of summaries) {
    expect(summary.text).not.toBe("");
    expect(summary.scrollHeight).toBeLessThanOrEqual(summary.clientHeight);
    expect(summary.scrollWidth).toBeLessThanOrEqual(summary.clientWidth);
    expect(summary.overflow).not.toMatch(/hidden|clip/);
  }
};

test.describe("portfolio smoke", () => {
  test("landing page loads with the expected title and section anchors", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(
      "Cong Chuong Truong — Software Engineer | Applied AI & Backend",
    );

    for (const id of sections) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }
  });

  test("find dialog filters results and closes with Escape", async ({
    page,
  }) => {
    await page.goto("/");

    await page.getByRole("button", { name: /Find/ }).first().click();

    const dialog = page.getByRole("dialog", { name: "Find" });
    await expect(dialog).toBeVisible();

    const search = dialog.getByRole("textbox", { name: "Search" });
    await search.fill("React");

    await expect(dialog.getByRole("button", { name: /^React/ })).toHaveCount(2);
    await expect(dialog.getByRole("button", { name: /^Docker/ })).toHaveCount(
      0,
    );

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("projects separate featured work from the compact list", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    const featured = page.getByRole("region", { name: "Featured projects" });
    const compact = page.getByRole("region", { name: "More projects" });
    const featuredIds = await featured
      .locator("[data-project-id]")
      .evaluateAll((elements) =>
        elements.map((element) => element.getAttribute("data-project-id")),
      );
    const compactIds = await compact
      .locator("[data-project-id]")
      .evaluateAll((elements) =>
        elements.map((element) => element.getAttribute("data-project-id")),
      );
    expect(featuredIds).toEqual(featuredProjectIds);
    expect(compactIds).toEqual(remainingProjectIds);

    const projectIds = await page
      .locator("[data-project-id]")
      .evaluateAll((elements) =>
        elements.map((element) => element.getAttribute("data-project-id")),
      );
    expect(projectIds.sort()).toEqual([...expectedProjectIds].sort());

    const longSummary = featured.locator('[data-project-id="venueops-lite"] p');
    await expect(longSummary).toBeVisible();
    await expect(longSummary).toHaveText(
      "Turns Google Sheets catering enquiries into reviewable draft replies while code enforces order rules and keeps a human in control.",
    );
    await expectSummaryTextFits(featured);
    await expectSummaryTextFits(compact);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  });

  test("projects split and image-less preview work on mobile", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);

    const featured = page.getByRole("region", { name: "Featured projects" });
    const compact = page.getByRole("region", { name: "More projects" });
    const featuredIds = await featured
      .locator("[data-project-id]")
      .evaluateAll((elements) =>
        elements.map((element) => element.getAttribute("data-project-id")),
      );
    const compactIds = await compact
      .locator("[data-project-id]")
      .evaluateAll((elements) =>
        elements.map((element) => element.getAttribute("data-project-id")),
      );
    expect(featuredIds).toEqual(featuredProjectIds);
    expect(compactIds).toEqual(remainingProjectIds);
    await expectSummaryTextFits(featured);
    await expectSummaryTextFits(compact);

    const pocketLab = compact.locator('[data-project-id="pocket-lab"]');
    await expect(
      pocketLab.getByRole("link", { name: "GitHub ↗" }),
    ).toHaveAttribute("href", "https://github.com/ctru0009/pocket-lab");
    await pocketLab.getByRole("button", { name: "Preview pocket-lab" }).click();

    const preview = page.getByRole("dialog", { name: "Preview — pocket-lab" });
    await expect(preview).toBeVisible();
    await expect(
      preview.getByText(/An installer that keeps AI coding sessions/),
    ).toBeVisible();
    await expect(preview.locator(".mac-hatch")).toHaveCount(0);
    await expect(
      preview.getByRole("link", { name: "Open on GitHub ↗" }),
    ).toHaveAttribute("href", "https://github.com/ctru0009/pocket-lab");
  });

  test("landing page has no critical accessibility violations", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.locator("#contact")).toBeVisible();

    const results = await new AxeBuilder({ page }).analyze();
    const critical = results.violations.filter(
      (violation) => violation.impact === "critical",
    );

    expect(critical).toEqual([]);
  });
});
