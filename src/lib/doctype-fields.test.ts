import { describe, expect, it } from "vitest";
import {
  buildDocTypeRows,
  DOCTYPE_FIELDS,
  findArticleCategory,
} from "./doctype-fields";
import { mockTutorialPages, mockTutorialSpace } from "./tutorial-mock";

describe("DOCTYPE_FIELDS registry", () => {
  it("mirrors the backend Ionic Tutorial Space DocType (16 fields)", () => {
    expect(DOCTYPE_FIELDS.space.map((f) => f.fieldname)).toEqual([
      "title",
      "slug",
      "route_prefix",
      "source_app",
      "logo",
      "short_description",
      "default_article",
      "learn_url",
      "discuss_url",
      "website_url",
      "github_url",
      "source_base_url",
      "attribution_text",
      "theme_config_json",
      "published",
      "sort_order",
    ]);
    expect(DOCTYPE_FIELDS.space).toHaveLength(16);
  });

  it("mirrors the backend Ionic Tutorial Category DocType (6 fields)", () => {
    expect(DOCTYPE_FIELDS.category.map((f) => f.fieldname)).toEqual([
      "title",
      "slug",
      "space",
      "description",
      "sort_order",
      "published",
    ]);
    expect(DOCTYPE_FIELDS.category).toHaveLength(6);
  });

  it("shows the curated Ionic Tutorial Article field set (10 visible fields)", () => {
    expect(DOCTYPE_FIELDS.article.map((f) => f.fieldname)).toEqual([
      "slug",
      "space",
      "category",
      "body_markdown",
      "seo_title",
      "source_url",
      "source_hash",
      "source_updated_at",
      "sort_order",
      "published",
    ]);
    expect(DOCTYPE_FIELDS.article).toHaveLength(10);
  });
});

describe("buildDocTypeRows", () => {
  it("fills every Space field from the payload and marks non-public fields missing", () => {
    const rows = buildDocTypeRows(mockTutorialPages.welcome).space;
    const byName = Object.fromEntries(rows.map((row) => [row.fieldname, row]));

    expect(byName.title.value).toBe("Ionic Tutorial");
    expect(byName.title.present).toBe(true);
    expect(byName.slug.value).toBe("ionic-tutorial");
    expect(byName.route_prefix.value).toBe("/tutorial");
    expect(byName.source_app.value).toBe("ionic_tutorial");
    expect(byName.short_description.value).toBe("Development tutorial mock content.");
    expect(byName.logo.kind).toBe("image");
    expect(byName.logo.href).toBe("/assets/tutorial/frappe-hr-logo.png");
    // relative path → rendered as text, not a clickable link
    expect(byName.learn_url.kind).toBe("text");
    expect(byName.learn_url.href).toBeUndefined();

    // default_article + published are not exposed by the public API
    expect(byName.default_article.present).toBe(false);
    expect(byName.published.present).toBe(false);
    expect(byName.published.kind).toBe("missing");
  });

  it("resolves Category rows from the navigation category containing the article", () => {
    const rows = buildDocTypeRows(mockTutorialPages.welcome).category;
    const byName = Object.fromEntries(rows.map((row) => [row.fieldname, row]));

    expect(byName.title.value).toBe("Getting Started");
    expect(byName.slug.value).toBe("getting-started");
    expect(byName.space.value).toBe("ionic-tutorial");
    expect(byName.description.value).toBe("Start here.");
    expect(byName.sort_order.value).toBe("1");
    expect(byName.published.present).toBe(false);
  });

  it("resolves Article rows including derived space/category links", () => {
    const rows = buildDocTypeRows(mockTutorialPages.welcome).article;
    const byName = Object.fromEntries(rows.map((row) => [row.fieldname, row]));

    expect(byName.slug.value).toBe("welcome");
    expect(byName.space.value).toBe("ionic-tutorial");
    expect(byName.category.value).toBe("getting-started");
    expect(byName.body_markdown.kind).toBe("markdown");
    expect(byName.body_markdown.value).toContain("Welcome");
    expect(byName.seo_title.value).toBe("Welcome to Ionic Tutorial");
    expect(byName.source_url.kind).toBe("text"); // content:// is not a clickable href
    expect(byName.source_updated_at.value).toBe("2026-08-02 00:00:00");
    expect(byName.sort_order.value).toBe("1");
    expect(byName.source_hash.present).toBe(false);
    expect(byName.published.present).toBe(false);
  });

  it("renders an http URL as a clickable link and pretty-prints theme JSON", () => {
    const payload = {
      ...mockTutorialPages.welcome,
      space: {
        ...mockTutorialSpace.space,
        theme_config_json: '{"accent":"#2563eb","layout":"docs"}',
        sort_order: 2,
      },
    };
    const rows = buildDocTypeRows(payload);
    const space = Object.fromEntries(rows.space.map((row) => [row.fieldname, row]));

    expect(space.discuss_url.kind).toBe("url");
    expect(space.discuss_url.href).toBe(
      "https://github.com/ioniccorporationbd/ionic_tutorial/discussions",
    );
    expect(space.theme_config_json.kind).toBe("json");
    expect(space.theme_config_json.value).toContain('"accent": "#2563eb"');
    expect(space.sort_order.value).toBe("2");
  });

  it("keeps removed fields out of the article rows (title, summary, cover_image, seo_description)", () => {
    const rows = buildDocTypeRows(mockTutorialPages["long-article"]).article;
    const fieldnames = rows.map((row) => row.fieldname);
    expect(fieldnames).not.toContain("title");
    expect(fieldnames).not.toContain("summary");
    expect(fieldnames).not.toContain("cover_image");
    expect(fieldnames).not.toContain("seo_description");
    // remaining rows still resolve from the payload
    expect(rows.find((row) => row.fieldname === "slug")?.value).toBe("long-article");
  });

  it("leaves Category/Article rows missing when the article has no navigation category", () => {
    const payload = {
      ...mockTutorialPages.welcome,
      article: { ...mockTutorialPages.welcome.article, slug: "orphan" },
    };
    expect(findArticleCategory(payload)).toBeNull();
    const rows = buildDocTypeRows(payload);
    const category = Object.fromEntries(rows.category.map((row) => [row.fieldname, row]));
    const article = Object.fromEntries(rows.article.map((row) => [row.fieldname, row]));

    expect(category.title.present).toBe(false);
    expect(article.category.present).toBe(false);
  });
});

describe("findArticleCategory", () => {
  it("finds the navigation category that owns the current article", () => {
    const category = findArticleCategory(mockTutorialPages["runtime-article"]);
    expect(category?.slug).toBe("getting-started");
  });
});
