import { expect, test } from "@playwright/test";

const FEATURED_PROJECTS = [
  "VenueOps Lite",
  "ccswap",
  "Expense Report Management System",
];

const COMPACT_PROJECTS = [
  "AI-Powered Resource Planning System",
  "AI Product Data Enrichment Pipeline",
  "LLM-Assisted Catalogue QA",
  "TradeFlow — Electrical Enquiry Intake",
  "pocket-lab",
  "Invoice Approval Dashboard",
];

const ALL_PROJECTS = [...FEATURED_PROJECTS, ...COMPACT_PROJECTS];

// Exact strings from src/data/data.ts (summaries, descriptions and links).
const SUMMARIES: Record<string, string> = {
  "AI-Powered Resource Planning System":
    "Capacity, dependency and skill constraints run in application code; Gemini adds Zod-validated impact analysis, and planning stays deterministic without it.",
  "AI Product Data Enrichment Pipeline":
    "A TypeScript CLI that Zod-validates every Gemini response, retries with backoff, and isolates failures per row so one bad row can't kill a run.",
  "VenueOps Lite":
    "Each Google Sheets enquiry becomes a schema-validated extraction via an OpenRouter tool call; deterministic rules enforce notice and minimum-order constraints, and human approval gates every reply.",
  "LLM-Assisted Catalogue QA":
    "Deterministic validation runs first; only ambiguous catalogue taxonomy reaches a model, whose Zod-validated suggestion still needs human approval.",
  "TradeFlow — Electrical Enquiry Intake":
    "Free-text electrical enquiries become structured jobs; incomplete jobs park for review, and emergency language blocks approval until acknowledged.",
  ccswap:
    "A single-binary Go CLI that switches Claude Code between provider profiles; every swap rewrites ~/.claude/settings.json atomically and never touches permissions, MCP servers or other config.",
  "pocket-lab":
    "Keeps AI coding sessions reachable from your phone: an always-on machine, Tailscale access, and ntfy or Telegram alerts for task, input-needed and sub-agent events.",
  "Expense Report Management System":
    "A full-stack expense workflow with JWT auth and a state-machine review flow; receipt extraction sits behind an OpenAI-compatible interface, so the AI path can be swapped or mocked.",
  "Invoice Approval Dashboard":
    "A design-to-code proof of concept: a dashboard composed in Pencil.dev and generated into a working React + Tailwind page through its MCP server.",
};

const DESCRIPTIONS: Record<string, string> = {
  "AI-Powered Resource Planning System":
    "A resource-planning MVP where capacity, dependency and skill constraints are enforced in application code while Gemini provides bounded impact and risk analysis. Zod validates model responses before they reach the React UI, and deterministic planning remains available without AI-generated analysis.",
  "AI Product Data Enrichment Pipeline":
    "A TypeScript CLI that classifies DummyJSON product records with Gemini. Every model response is Zod-validated; batches retry with backoff; checkpoints and row-level isolation mean a bad row or provider blip does not kill the run.",
  "VenueOps Lite":
    "A catering enquiry workflow where the model interprets and software acts: an OpenRouter tool call turns each Google Sheets row into a schema-validated extraction, deterministic rules enforce notice and minimum-order constraints, and a human approves every reply — with at most one follow-up and an append-only activity log.",
  "LLM-Assisted Catalogue QA":
    "An n8n-orchestrated catalogue QA workflow that keeps rules and models in their lanes: deterministic validation runs first and only ambiguous taxonomy reaches an OpenAI-compatible model, whose Zod-validated suggestion still waits for human approval.",
  "TradeFlow — Electrical Enquiry Intake":
    "A consultancy-style demo that sits in front of a fictional electrical shop's job system: free text becomes a structured summary, routine jobs are created, incomplete ones park for review, emergency language blocks approval until acknowledged, and quote follow-ups are tracked as explicit state instead of memory.",
  ccswap:
    "A single-binary Go CLI that switches Claude Code between provider profiles such as Anthropic, Z.ai, Ollama Cloud and OpenRouter. Every swap rewrites ~/.claude/settings.json atomically and never touches permissions, MCP servers or other config.",
  "pocket-lab":
    "An installer that keeps AI coding sessions reachable from your phone: run the machine always-on, connect over Tailscale, and get ntfy or Telegram notifications for task completion, input-needed and sub-agent events.",
  "Expense Report Management System":
    "A full-stack expense workflow with JWT auth, a state-machine review flow and admin approval. Receipt uploads are extracted through an OpenAI-compatible service behind an interface, so the AI path can be swapped or mocked without touching the workflow.",
  "Invoice Approval Dashboard":
    "A design-to-code proof of concept: the dashboard was composed visually in Pencil.dev with its Shadcn template, then generated into a working React + Tailwind page through the Pencil MCP server.",
};

const GITHUB_LINKS: Record<string, string> = {
  "AI-Powered Resource Planning System":
    "https://github.com/ctru0009/resource-planning-system",
  "AI Product Data Enrichment Pipeline":
    "https://github.com/ctru0009/ai-enrichment-pipeline",
  "VenueOps Lite": "https://github.com/ctru0009/venue-ops",
  "LLM-Assisted Catalogue QA":
    "https://github.com/ctru0009/llm-assisted-catalogue-qa",
  "TradeFlow — Electrical Enquiry Intake":
    "https://github.com/ctru0009/tradeflow",
  ccswap: "https://github.com/ctru0009/ccswap",
  "pocket-lab": "https://github.com/ctru0009/pocket-lab",
  "Expense Report Management System":
    "https://github.com/ctru0009/expense-report-managemen-system",
  "Invoice Approval Dashboard":
    "https://github.com/ctru0009/invoice-approval-dashboard",
};

const TRADEFLOW_LIVE_DEMO = "https://tradeflow-fawn-three.vercel.app";

const detailsOpenerName = (title: string) => `Details — ${title}`;

test.describe("projects", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("keeps all nine projects visible with their repository links", async ({
    page,
  }) => {
    const projects = page.locator("#projects");

    for (const title of ALL_PROJECTS) {
      await expect(projects.getByText(title, { exact: true })).toHaveCount(1);
      await expect(projects.getByText(title, { exact: true })).toBeVisible();
    }

    await expect(projects.getByRole("link", { name: /GitHub/ })).toHaveCount(9);
  });

  test("renders exactly three featured projects and six compact entries in order", async ({
    page,
  }) => {
    const projects = page.locator("#projects");

    const featured = projects.getByRole("list", { name: "Featured" });
    await expect(featured).toBeVisible();
    await expect(featured.getByRole("heading")).toHaveText(FEATURED_PROJECTS);

    const compact = projects.getByRole("list", { name: "Other projects" });
    await expect(compact).toBeVisible();
    await expect(compact.getByRole("heading")).toHaveText(COMPACT_PROJECTS);

    await expect(projects.getByRole("listitem")).toHaveCount(9);
  });

  test("shows every summary in full and keeps descriptions inside Details only", async ({
    page,
  }) => {
    const projects = page.locator("#projects");

    for (const title of ALL_PROJECTS) {
      const summary = projects.getByText(SUMMARIES[title], { exact: true });
      await expect(summary, `${title} summary`).toHaveCount(1);
      await expect(summary, `${title} summary`).toBeVisible();

      const clipping = await summary.evaluate((node) => {
        const style = getComputedStyle(node);
        const clamp = style.getPropertyValue("-webkit-line-clamp").trim();
        return {
          lineClamp: clamp === "" ? "none" : clamp,
          overflow: `${style.overflowX}/${style.overflowY}`,
          clipsVertically: node.scrollHeight > node.clientHeight + 1,
        };
      });
      expect(clipping, `${title} summary must not be clipped`).toEqual({
        lineClamp: "none",
        overflow: "visible/visible",
        clipsVertically: false,
      });

      await expect(
        projects.getByText(DESCRIPTIONS[title], { exact: true }),
        `${title} description should stay inside Details`,
      ).toHaveCount(0);
    }
  });

  test("reserves a 2.8:1 thumbnail on featured cards and keeps compact entries text-only", async ({
    page,
  }) => {
    const projects = page.locator("#projects");
    const featured = projects.getByRole("list", { name: "Featured" });
    const compact = projects.getByRole("list", { name: "Other projects" });

    await expect(featured.getByRole("img")).toHaveCount(3);
    for (const title of FEATURED_PROJECTS) {
      const image = featured.getByRole("img", {
        name: `Screenshot of ${title}`,
        exact: true,
      });
      await expect(image).toBeVisible();

      const width = Number(await image.getAttribute("width"));
      const height = Number(await image.getAttribute("height"));
      expect(width, `${title} reserved width`).toBeGreaterThan(0);
      expect(height, `${title} reserved height`).toBeGreaterThan(0);
      expect(
        Math.abs(width / height - 2.8),
        `${title} intrinsic ratio`,
      ).toBeLessThan(0.01);

      const box = await image.boundingBox();
      expect(box, `${title} thumbnail box`).not.toBeNull();
      expect(
        Math.abs(box!.width / box!.height - 2.8),
        `${title} rendered thumbnail ratio`,
      ).toBeLessThan(0.05);
    }

    await expect(compact.getByRole("img")).toHaveCount(0);

    // The card grid stays text-first: no technology chip walls.
    await expect(featured.getByText("NestJS", { exact: true })).toHaveCount(0);
    await expect(compact.getByText("SQLite", { exact: true })).toHaveCount(0);
  });

  test("keeps TradeFlow's live demo link distinct and unique", async ({
    page,
  }) => {
    const projects = page.locator("#projects");

    const liveLinks = projects.getByRole("link", { name: /^Live/ });
    await expect(liveLinks).toHaveCount(1);
    await expect(liveLinks.first()).toHaveAttribute(
      "href",
      TRADEFLOW_LIVE_DEMO,
    );

    await expect(projects.getByRole("link", { name: /GitHub/ })).toHaveCount(9);
  });

  test("opens a Details dialog per project with the complete description", async ({
    page,
  }) => {
    const projects = page.locator("#projects");

    for (const title of ALL_PROJECTS) {
      const opener = projects.getByRole("button", {
        name: detailsOpenerName(title),
        exact: true,
      });
      await expect(opener, `${title} Details opener`).toBeVisible();
      await opener.click();

      const dialog = page.getByRole("dialog", {
        name: detailsOpenerName(title),
        exact: true,
      });
      await expect(dialog, `${title} Details dialog`).toBeVisible();
      await expect(dialog).toContainText(DESCRIPTIONS[title]);
      await expect(
        dialog.getByRole("link", { name: /GitHub/ }),
      ).toHaveAttribute("href", GITHUB_LINKS[title]);

      if (title === "pocket-lab") {
        await expect(dialog.getByRole("img")).toHaveCount(0);
      } else {
        await expect(
          dialog.getByRole("img", {
            name: `Screenshot of ${title}`,
            exact: true,
          }),
        ).toBeVisible();
      }

      if (title === "TradeFlow — Electrical Enquiry Intake") {
        await expect(
          dialog.getByRole("link", { name: /^Live/ }),
        ).toHaveAttribute("href", TRADEFLOW_LIVE_DEMO);
      } else {
        await expect(dialog.getByRole("link", { name: /^Live/ })).toHaveCount(
          0,
        );
      }

      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();
      await expect(opener).toBeFocused();
    }
  });
});

test.describe("projects details on mobile", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("reaches the complete text, links and Close of every Details dialog", async ({
    page,
  }) => {
    await page.goto("/");
    const projects = page.locator("#projects");

    for (const title of ALL_PROJECTS) {
      const opener = projects.getByRole("button", {
        name: detailsOpenerName(title),
        exact: true,
      });
      await opener.scrollIntoViewIfNeeded();
      await opener.click();

      const dialog = page.getByRole("dialog", {
        name: detailsOpenerName(title),
        exact: true,
      });
      await expect(dialog, `${title} Details dialog`).toBeVisible();
      await expect(dialog).toContainText(DESCRIPTIONS[title]);

      const close = dialog.getByRole("button", { name: "Close", exact: true });
      await close.scrollIntoViewIfNeeded();
      await expect(close, `${title} Close`).toBeInViewport();

      const repository = dialog.getByRole("link", { name: /GitHub/ });
      await repository.scrollIntoViewIfNeeded();
      await expect(repository, `${title} repository link`).toBeInViewport();

      await close.focus();
      await expect(close, `${title} Close via keyboard`).toBeFocused();
      await expect(close).toBeInViewport();

      await page.keyboard.press("Enter");
      await expect(dialog).toBeHidden();
      await expect(opener).toBeFocused();
    }
  });
});
