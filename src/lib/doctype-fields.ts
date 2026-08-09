import type {
  TutorialNavigationCategory,
  TutorialPagePayload,
  TutorialSpaceSettings,
} from "@/types/tutorial";

/**
 * DocType field explorer registry.
 *
 * The three lists below mirror the authoritative Frappe DocType definitions in the
 * backend `ionic_tutorial` app (ionic_tutorial_space.json, ionic_tutorial_category.json,
 * ionic_tutorial_article.json) — field names, labels and field types come straight
 * from those JSON files. The public API exposes a subset of these fields; rows for
 * fields the public API does not return are rendered as "—" (not exposed).
 */

export type DocTypeName = "space" | "category" | "article";

export interface DocTypeFieldDef {
  /** Frappe fieldname, e.g. "body_markdown" */
  readonly fieldname: string;
  /** Frappe label, e.g. "Body Markdown" */
  readonly label: string;
  /** Frappe fieldtype, e.g. "Markdown Editor" */
  readonly type: string;
}

export const DOCTYPE_FIELDS: Readonly<Record<DocTypeName, readonly DocTypeFieldDef[]>> = {
  space: [
    { fieldname: "title", label: "Title", type: "Data" },
    { fieldname: "slug", label: "Slug", type: "Data" },
    { fieldname: "route_prefix", label: "Route Prefix", type: "Data" },
    { fieldname: "source_app", label: "Source App", type: "Data" },
    { fieldname: "logo", label: "Logo", type: "Attach Image" },
    { fieldname: "short_description", label: "Short Description", type: "Small Text" },
    { fieldname: "default_article", label: "Default Article", type: "Link" },
    { fieldname: "learn_url", label: "Learn URL", type: "Data" },
    { fieldname: "discuss_url", label: "Discuss URL", type: "Data" },
    { fieldname: "website_url", label: "Website URL", type: "Data" },
    { fieldname: "github_url", label: "GitHub URL", type: "Data" },
    { fieldname: "source_base_url", label: "Source Base URL", type: "Data" },
    { fieldname: "attribution_text", label: "Attribution Text", type: "Small Text" },
    { fieldname: "theme_config_json", label: "Theme Config JSON", type: "Code" },
    { fieldname: "published", label: "Published", type: "Check" },
    { fieldname: "sort_order", label: "Sort Order", type: "Int" },
  ],
  category: [
    { fieldname: "title", label: "Title", type: "Data" },
    { fieldname: "slug", label: "Slug", type: "Data" },
    { fieldname: "space", label: "Space", type: "Link" },
    { fieldname: "description", label: "Description", type: "Small Text" },
    { fieldname: "sort_order", label: "Sort Order", type: "Int" },
    { fieldname: "published", label: "Published", type: "Check" },
  ],
  article: [
    { fieldname: "slug", label: "Slug", type: "Data" },
    { fieldname: "space", label: "Space", type: "Link" },
    { fieldname: "category", label: "Category", type: "Link" },
    { fieldname: "body_markdown", label: "Body Markdown", type: "Markdown Editor" },
    { fieldname: "body_sections", label: "Body Sections", type: "Table" },
    { fieldname: "seo_title", label: "SEO Title", type: "Data" },
    { fieldname: "source_url", label: "Source URL", type: "Data" },
    { fieldname: "source_hash", label: "Source Hash", type: "Data" },
    { fieldname: "source_updated_at", label: "Source Updated At", type: "Datetime" },
    { fieldname: "sort_order", label: "Sort Order", type: "Int" },
    { fieldname: "published", label: "Published", type: "Check" },
  ],
};

export type DocTypeFieldKind =
  | "text"
  | "url"
  | "json"
  | "markdown"
  | "image"
  | "missing";

export interface DocTypeFieldRow extends DocTypeFieldDef {
  /** Formatted display value ("—" when missing). */
  readonly value: string;
  /** False when the public API does not expose the field or it is empty. */
  readonly present: boolean;
  /** How the value should be rendered. */
  readonly kind: DocTypeFieldKind;
  /** Machine href for url/image rows (sanitized), otherwise undefined. */
  readonly href?: string;
}

export interface DocTypeRows {
  readonly space: readonly DocTypeFieldRow[];
  readonly category: readonly DocTypeFieldRow[];
  readonly article: readonly DocTypeFieldRow[];
}

const MISSING = "—";

const URL_FIELDS = new Set([
  "learn_url",
  "discuss_url",
  "website_url",
  "github_url",
  "source_base_url",
  "source_url",
]);

/** Only http(s) URLs are rendered as links; everything else stays plain text. */
function safeHref(value: string): string | undefined {
  return /^https?:\/\//i.test(value) ? value : undefined;
}

function truncate(value: string, max = 160): string {
  return value.length > max ? `${value.slice(0, max).trimEnd()}…` : value;
}

function formatJson(value: string): string {
  try {
    return JSON.stringify(JSON.parse(value), null, 2);
  } catch {
    return truncate(value, 240);
  }
}

function imageHref(value: string): string | undefined {
  return safeHref(value) ?? (/^\//.test(value) ? value : undefined);
}

function spaceValue(space: TutorialSpaceSettings, fieldname: string): string | undefined {
  switch (fieldname) {
    case "default_article":
    case "published":
      return undefined; // not exposed by the public API
    default: {
      const value = (space as unknown as Record<string, unknown>)[fieldname];
      if (typeof value === "string" && value !== "") return value;
      if (typeof value === "number" && Number.isFinite(value)) return String(value);
      return undefined;
    }
  }
}

function categoryValue(
  category: TutorialNavigationCategory | null,
  spaceSlug: string,
  fieldname: string,
): string | undefined {
  switch (fieldname) {
    case "space":
      return spaceSlug;
    case "published":
      return undefined; // not exposed by the public API
    case "title":
    case "slug":
    case "description":
      return category ? category[fieldname] ?? undefined : undefined;
    case "sort_order":
      return category ? String(category.sort_order) : undefined;
    default:
      return undefined;
  }
}

function articleValue(
  payload: TutorialPagePayload,
  categorySlug: string | undefined,
  fieldname: string,
): string | undefined {
  const article = payload.article;
  switch (fieldname) {
    case "space":
      return payload.space.slug;
    case "category":
      return categorySlug;
    case "published":
      return undefined; // not exposed by the public API
    case "title":
    case "slug":
    case "summary":
    case "body_markdown":
    case "cover_image":
    case "seo_title":
    case "seo_description":
    case "source_url":
    case "source_hash":
    case "source_updated_at": {
      const value = article[fieldname];
      return typeof value === "string" && value !== "" ? value : undefined;
    }
    case "body_sections": {
      const value = article.body_sections;
      if (!Array.isArray(value) || value.length === 0) return undefined;
      const count = value.length;
      return `${count} ${count === 1 ? "row" : "rows"}`;
    }
    case "sort_order":
      return String(article.sort_order);
    default:
      return undefined;
  }
}

function kindFor(fieldname: string, type: string, value: string): DocTypeFieldKind {
  if (URL_FIELDS.has(fieldname) && safeHref(value)) return "url";
  if (type === "Attach Image" && imageHref(value)) return "image";
  if (fieldname === "theme_config_json") return "json";
  if (fieldname === "body_markdown") return "markdown";
  return "text";
}

function buildRows(
  defs: readonly DocTypeFieldDef[],
  resolve: (fieldname: string) => string | undefined,
): DocTypeFieldRow[] {
  return defs.map((def) => {
    const raw = resolve(def.fieldname);
    if (raw === undefined) {
      return { ...def, value: MISSING, present: false, kind: "missing" };
    }
    const kind = kindFor(def.fieldname, def.type, raw);
    const value =
      kind === "json"
        ? formatJson(raw)
        : kind === "markdown"
          ? truncate(raw.replace(/\s+/g, " ").trim())
          : truncate(raw, 240);
    return { ...def, value, present: true, kind, href: kind === "url" ? raw : kind === "image" ? imageHref(raw) : undefined };
  });
}

/** The navigation category that contains the current article, if any. */
export function findArticleCategory(payload: TutorialPagePayload): TutorialNavigationCategory | null {
  const slug = payload.article.slug;
  for (const category of payload.navigation) {
    if (category.articles.some((article) => article.slug === slug)) return category;
  }
  return null;
}

/** Builds every DocType field row for the current article page, purely from the API payload. */
export function buildDocTypeRows(payload: TutorialPagePayload): DocTypeRows {
  const category = findArticleCategory(payload);
  const categorySlug = category?.slug;
  return {
    space: buildRows(DOCTYPE_FIELDS.space, (fieldname) => spaceValue(payload.space, fieldname)),
    category: buildRows(DOCTYPE_FIELDS.category, (fieldname) =>
      categoryValue(category, payload.space.slug, fieldname),
    ),
    article: buildRows(DOCTYPE_FIELDS.article, (fieldname) =>
      articleValue(payload, categorySlug, fieldname),
    ),
  };
}
