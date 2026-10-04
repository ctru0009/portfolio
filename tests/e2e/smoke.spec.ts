import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const sections = ["home", "works", "projects", "skills", "about", "contact"];

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

  test("skip link focuses main content", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await page.keyboard.press("Enter");
    expect(await page.evaluate(() => document.activeElement?.id)).toBe(
      "main-content",
    );
  });

  test("find dialog filters results and closes with Escape", async ({
    page,
  }) => {
    await page.goto("/");

    await page.getByRole("button", { name: /Find/ }).first().click();

    const dialog = page.getByRole("dialog", { name: "Find" });
    await expect(dialog).toBeVisible();

    const search = dialog.getByRole("combobox", { name: "Search" });
    await search.fill("React");

    await expect(dialog.getByRole("option", { name: /^React/ })).toHaveCount(2);
    await expect(dialog.getByRole("option", { name: /^Docker/ })).toHaveCount(
      0,
    );

    await search.press("ArrowDown");
    await expect(search).toHaveAttribute(
      "aria-activedescendant",
      /^find-option-/,
    );

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("find dialog caps the rendered results and keeps the active option resolvable", async ({
    page,
  }) => {
    await page.goto("/");

    await page.getByRole("button", { name: /Find/ }).first().click();

    const dialog = page.getByRole("dialog", { name: "Find" });
    const search = dialog.getByRole("combobox", { name: "Search" });
    await search.fill("e");

    await expect(dialog.getByRole("option")).toHaveCount(30);
    await expect(dialog.getByRole("status")).toHaveText(
      /Showing first 30 of \d+ results/,
    );

    for (let index = 0; index < 60; index += 1) {
      await search.press("ArrowDown");
    }

    const activeId = await search.getAttribute("aria-activedescendant");
    expect(activeId).toMatch(/^find-option-/);

    await expect(page.locator(`#${activeId}`)).toHaveCount(1);
  });

  test("landing page has no moderate-or-higher accessibility violations", async ({
    page,
  }) => {
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
