import { expect, test } from "@playwright/test";

const STEP_HEADINGS = [
  { id: "works", number: "01", label: "Work" },
  { id: "projects", number: "02", label: "Projects" },
  { id: "skills", number: "03", label: "Skills" },
  { id: "about", number: "04", label: "About" },
  { id: "contact", number: "05", label: "Contact" },
];

const TRIMMED_FIRST_PARAGRAPH =
  "I started in full-stack .NET and now build AI-integrated product features with the same bar for reliability, privacy and delivery.";

const KEPT_PARAGRAPHS = [
  "AI interprets. Deterministic software acts. I use models where interpretation, summarisation or classification creates value, and I keep state changes, permissions and workflow transitions in ordinary software. Model output is validated, failures degrade safely, and high-risk ambiguity stays reviewable.",
  "I use coding agents for investigation, implementation, testing and review, and I keep architecture, acceptance criteria and production checks human-owned. Outside work I'm usually with friends or playing guitar.",
];

test.describe("section step headings", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  for (const { id, number, label } of STEP_HEADINGS) {
    test(`#${id} is numbered ${number} ${label}`, async ({ page }) => {
      const heading = page.locator(`#${id}`).getByRole("heading", {
        level: 2,
        name: label,
        exact: true,
      });

      await expect(heading).toHaveCount(1);
      await expect(heading).toBeVisible();

      // The step badge keeps the two-digit number separate from the label.
      await expect(heading.getByText(number, { exact: true })).toBeVisible();
      await expect(heading).toHaveText(new RegExp(`^${number}\\s*${label}$`));
    });
  }
});

test.describe("about copy", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("shows the trimmed first paragraph", async ({ page }) => {
    await expect(
      page
        .locator("#about")
        .getByText(TRIMMED_FIRST_PARAGRAPH, { exact: true }),
    ).toBeVisible();
  });

  test("removes the repeated self-introduction", async ({ page }) => {
    await expect(
      page.locator("#about").getByText("Hey, I'm Cong.", { exact: true }),
    ).toHaveCount(0);
  });

  test("keeps the remaining biography and education line", async ({ page }) => {
    const about = page.locator("#about");

    for (const paragraph of KEPT_PARAGRAPHS) {
      await expect(about.getByText(paragraph, { exact: true })).toBeVisible();
    }

    await expect(
      about.getByText(
        "Education — Bachelor of Computer Science, Monash University, 2021–2024",
        { exact: true },
      ),
    ).toBeVisible();
  });
});
