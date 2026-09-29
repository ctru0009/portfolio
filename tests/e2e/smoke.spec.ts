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
