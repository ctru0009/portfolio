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
          fontSize: getComputedStyle(paragraph).fontSize,
        };
      }),
    );

  expect(summaries.length).toBeGreaterThan(0);
  for (const summary of summaries) {
    expect(summary.text).not.toBe("");
    expect(summary.scrollHeight).toBeLessThanOrEqual(summary.clientHeight);
    expect(summary.scrollWidth).toBeLessThanOrEqual(summary.clientWidth);
    expect(summary.overflow).not.toMatch(/hidden|clip/);
    expect(summary.fontSize).toBe("13px");
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
    await page.keyboard.press("Shift+Tab");
    await expect(dialog.getByRole("button", { name: "Close" })).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(search).toBeFocused();
    await search.fill("React");

    const reactTargets = await dialog
      .locator("[data-target-id]")
      .evaluateAll((elements) =>
        elements.map((element) => element.getAttribute("data-target-id")),
      );
    expect(reactTargets.sort()).toEqual(
      [
        "skill-react",
        "project-resource-planning",
        "project-tradeflow",
        "project-expense-report",
        "project-invoice-approval",
      ].sort(),
    );

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("Find ignores arrow and Enter keys with an empty query and closes with Escape", async ({
    page,
  }) => {
    await page.goto("/");
    const opener = page.getByRole("button", { name: /Find/ }).first();
    await opener.click();

    const dialog = page.getByRole("dialog", { name: "Find" });
    const search = dialog.getByRole("textbox", { name: "Search" });
    const originalUrl = page.url();
    for (const key of ["ArrowDown", "ArrowUp", "Enter"]) {
      await page.keyboard.press(key);
      await expect(dialog).toBeVisible();
      await expect(search).toBeFocused();
      await expect(dialog.locator("[data-target-id]")).toHaveCount(0);
      await expect(dialog.getByText(/↑↓.*Enter.*Esc/)).toBeVisible();
      expect(page.url()).toBe(originalUrl);
    }

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(opener).toBeFocused();
  });

  test("Find gives an empty hint, meaningful item results, and no-results feedback", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.getByRole("button", { name: "≡ Menu" }).click();
    await page
      .locator("#menu-bar-dropdown")
      .getByRole("button", { name: /Find/ })
      .click();

    const dialog = page.getByRole("dialog", { name: "Find" });
    const search = dialog.getByRole("textbox", { name: "Search" });
    await expect(dialog.getByText(/↑↓.*Enter.*Esc/)).toBeVisible();
    await expect(dialog.locator("[data-target-id]")).toHaveCount(0);
    const skillIds = await page
      .locator('table.mac-table [id^="skill-"]')
      .evaluateAll((elements) => elements.map((element) => element.id));
    expect(skillIds).toHaveLength(22);
    expect(new Set(skillIds).size).toBe(22);

    await search.fill("Docker");
    const dockerTargetIds = await dialog
      .locator("[data-target-id]")
      .evaluateAll((elements) =>
        elements.map((element) => element.getAttribute("data-target-id")),
      );
    expect(dockerTargetIds).toContain("skill-docker");
    expect(dockerTargetIds).toContain("project-venueops-lite");
    expect(dockerTargetIds).toContain("project-catalogue-qa");
    expect(new Set(dockerTargetIds).size).toBe(dockerTargetIds.length);
    const resultHeights = await dialog
      .locator("[data-target-id]")
      .evaluateAll((elements) =>
        elements.map((element) => element.getBoundingClientRect().height),
      );
    expect(resultHeights.every((height) => height >= 44)).toBe(true);

    const credibleQueries: [string, string[]][] = [
      ["backend", ["skill-node-js", "works"]],
      ["applied AI", ["skill-aws-bedrock", "project-venueops-lite"]],
      ["LLM", ["project-catalogue-qa"]],
      ["cloud", ["skill-aws", "skill-azure", "skill-docker"]],
      ["CI/CD", ["skill-github-actions", "skill-azure-devops"]],
      ["Melbourne", ["about", "contact"]],
      ["CV", ["contact"]],
    ];
    for (const [term, expectedTargets] of credibleQueries) {
      await search.fill(term);
      const targetIds = await dialog
        .locator("[data-target-id]")
        .evaluateAll((elements) =>
          elements.map((element) => element.getAttribute("data-target-id")),
        );
      for (const targetId of expectedTargets) {
        expect(targetIds).toContain(targetId);
      }
    }

    await search.fill("no-such-portfolio-result");
    await expect(dialog.getByText(/No results found/)).toBeVisible();
  });

  test("Find selection focuses items without changing history and clears highlights", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const originalUrl = page.url();
    const originalHistoryLength = await page.evaluate(() => history.length);

    await page.getByRole("button", { name: /Find/ }).first().click();
    const dialog = page.getByRole("dialog", { name: "Find" });
    const search = dialog.getByRole("textbox", { name: "Search" });
    await search.fill("Bedrock");
    await search.press("Enter");

    const bedrockSkill = page.locator("#skill-aws-bedrock");
    await expect(dialog).toBeHidden();
    await expect(bedrockSkill).toHaveAttribute("tabindex", "-1");
    await expect(bedrockSkill).toBeFocused();
    await expect(bedrockSkill).toHaveCSS("background-color", "rgb(17, 17, 17)");
    expect(page.url()).toBe(originalUrl);
    expect(await page.evaluate(() => history.length)).toBe(
      originalHistoryLength,
    );
    const targetTop = await bedrockSkill.evaluate(
      (element) => element.getBoundingClientRect().top,
    );
    const menuBottom = await page
      .locator("header")
      .evaluate((element) => element.getBoundingClientRect().bottom);
    expect(targetTop).toBeGreaterThanOrEqual(menuBottom);

    await page.keyboard.press("Tab");
    await expect(bedrockSkill).not.toHaveCSS(
      "background-color",
      "rgb(17, 17, 17)",
    );
    await expect(
      page
        .locator("#project-resource-planning")
        .getByRole("link", { name: "GitHub ↗" }),
    ).toBeFocused();
    await page.getByRole("button", { name: /Find/ }).click();
    await expect(bedrockSkill).not.toBeFocused();
    await page
      .getByRole("dialog", { name: "Find" })
      .getByRole("textbox", { name: "Search" })
      .fill("AWS");
    await page.keyboard.press("Escape");

    await page.getByRole("button", { name: /Find/ }).click();
    const pointerSearch = page
      .getByRole("dialog", { name: "Find" })
      .getByRole("textbox", { name: "Search" });
    await pointerSearch.fill("Docker");
    await page
      .getByRole("dialog", { name: "Find" })
      .locator('[data-target-id="project-venueops-lite"]')
      .click();

    const venueOps = page.locator("#project-venueops-lite");
    await expect(venueOps).toBeFocused();
    await expect(venueOps).toHaveCSS("background-color", "rgb(17, 17, 17)");
    expect(page.url()).toBe(originalUrl);
    expect(await page.evaluate(() => history.length)).toBe(
      originalHistoryLength,
    );
    await page.getByRole("link", { name: "Projects", exact: true }).click();
    await expect(venueOps).not.toBeFocused();
    await expect(venueOps).toHaveCSS("background-color", "rgb(255, 255, 255)");
    expect(new URL(page.url()).hash).toBe("#projects");
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
    expect([...projectIds].sort()).toEqual([...expectedProjectIds].sort());
    const projectDomIds = await page
      .locator("[data-project-id]")
      .evaluateAll((elements) => elements.map((element) => element.id));
    expect(projectDomIds).toEqual(
      projectIds.map((projectId) => `project-${projectId}`),
    );

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
    await expect(compact.locator("h3").first()).toHaveCSS("font-size", "16px");
    const featuredSummaries = featured.locator("[data-project-id] p");
    await expect(featuredSummaries).toHaveCount(3);
    for (let index = 0; index < 3; index += 1) {
      await expect(featuredSummaries.nth(index)).toBeVisible();
    }
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
