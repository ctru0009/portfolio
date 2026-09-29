import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const sections = ["home", "about", "skills", "works", "projects", "contact"];

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
    await expect(featured.locator("[data-project-id]")).toHaveCount(3);
    await expect(compact.locator("[data-project-id]")).toHaveCount(6);

    const projectIds = await page
      .locator("[data-project-id]")
      .evaluateAll((elements) =>
        elements.map((element) => element.getAttribute("data-project-id")),
      );
    expect(projectIds).toHaveLength(9);
    expect(new Set(projectIds).size).toBe(9);

    const longSummary = featured.locator('[data-project-id="venueops-lite"] p');
    await expect(longSummary).toBeVisible();
    await expect(longSummary).not.toHaveClass(/line-clamp/);
    await expect(longSummary).toContainText("Google Sheets");
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
    await expect(featured.locator("[data-project-id]")).toHaveCount(3);
    await expect(compact.locator("[data-project-id]")).toHaveCount(6);

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
