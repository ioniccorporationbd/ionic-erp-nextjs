import type {
  TutorialAdjacentArticle,
  TutorialArticle,
  TutorialArticleSection,
  TutorialBreadcrumb,
  TutorialNavigationArticle,
  TutorialNavigationCategory,
  TutorialPagePayload,
  TutorialSearchPayload,
  TutorialSearchResult,
  TutorialSpacePayload,
  TutorialSpaceSettings,
  TutorialSpacesPayload,
  TutorialTocItem,
} from "@/types/tutorial";
import { TutorialApiError } from "@/types/tutorial";

type RecordValue = Record<string, unknown>;

function isRecord(value: unknown): value is RecordValue {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringField(record: RecordValue, key: string, required = true): string | undefined {
  const value = record[key];
  if (typeof value === "string") return value;
  if (!required && value == null) return undefined;
  throw new TutorialApiError("INVALID_PAYLOAD", `Invalid tutorial payload field: ${key}`);
}

function numberField(record: RecordValue, key: string): number {
  const value = record[key];
  if (typeof value === "number" && Number.isFinite(value)) return value;
  throw new TutorialApiError("INVALID_PAYLOAD", `Invalid tutorial payload field: ${key}`);
}

function numberFieldOptional(record: RecordValue, key: string): number | undefined {
  const value = record[key];
  if (value == null) return undefined;
  if (typeof value === "number" && Number.isFinite(value)) return value;
  throw new TutorialApiError("INVALID_PAYLOAD", `Invalid tutorial payload field: ${key}`);
}

function nullableRecord(record: RecordValue, key: string): RecordValue | null {
  const value = record[key];
  if (value === null) return null;
  if (isRecord(value)) return value;
  throw new TutorialApiError("INVALID_PAYLOAD", `Invalid tutorial payload field: ${key}`);
}

function arrayField(record: RecordValue, key: string): unknown[] {
  const value = record[key];
  if (Array.isArray(value)) return value;
  throw new TutorialApiError("INVALID_PAYLOAD", `Invalid tutorial payload field: ${key}`);
}

function optionalArrayField(record: RecordValue, key: string): unknown[] | undefined {
  const value = record[key];
  if (value == null) return undefined;
  if (Array.isArray(value)) return value;
  throw new TutorialApiError("INVALID_PAYLOAD", `Invalid tutorial payload field: ${key}`);
}

function messagePayload(payload: unknown): RecordValue {
  const envelope = isRecord(payload) && isRecord(payload.message) ? payload.message : payload;
  if (!isRecord(envelope)) {
    throw new TutorialApiError("INVALID_PAYLOAD", "Tutorial API response is not an object");
  }
  if (envelope.schema_version !== "v1") {
    throw new TutorialApiError("INVALID_PAYLOAD", "Unsupported tutorial API schema version");
  }
  return envelope;
}

function parseSpaceSettings(value: unknown): TutorialSpaceSettings {
  if (!isRecord(value)) throw new TutorialApiError("INVALID_PAYLOAD", "Invalid tutorial space settings");
  return {
    title: stringField(value, "title")!,
    slug: stringField(value, "slug")!,
    route_prefix: stringField(value, "route_prefix")!,
    source_app: stringField(value, "source_app", false),
    logo: stringField(value, "logo", false),
    short_description: stringField(value, "short_description", false),
    learn_url: stringField(value, "learn_url", false),
    discuss_url: stringField(value, "discuss_url", false),
    website_url: stringField(value, "website_url", false),
    github_url: stringField(value, "github_url", false),
    source_base_url: stringField(value, "source_base_url", false),
    attribution_text: stringField(value, "attribution_text", false),
    theme_config_json: stringField(value, "theme_config_json", false),
    sort_order: numberFieldOptional(value, "sort_order"),
  };
}

function parseNavArticle(value: unknown): TutorialNavigationArticle {
  if (!isRecord(value)) throw new TutorialApiError("INVALID_PAYLOAD", "Invalid tutorial navigation article");
  return {
    title: stringField(value, "title")!,
    slug: stringField(value, "slug")!,
    summary: stringField(value, "summary", false),
    sort_order: numberField(value, "sort_order"),
  };
}

function parseNavCategory(value: unknown): TutorialNavigationCategory {
  if (!isRecord(value)) throw new TutorialApiError("INVALID_PAYLOAD", "Invalid tutorial navigation category");
  return {
    title: stringField(value, "title")!,
    slug: stringField(value, "slug")!,
    description: stringField(value, "description", false),
    sort_order: numberField(value, "sort_order"),
    articles: arrayField(value, "articles").map(parseNavArticle),
  };
}

function parseArticleSection(value: unknown): TutorialArticleSection {
  if (!isRecord(value)) throw new TutorialApiError("INVALID_PAYLOAD", "Invalid tutorial article section");
  return {
    section_title: stringField(value, "section_title", false),
    section_subtitle: stringField(value, "section_subtitle", false),
    section_image: stringField(value, "section_image", false),
    section_video_link: stringField(value, "section_video_link", false),
    section_description: stringField(value, "section_description", false),
    section_link_title: stringField(value, "section_link_title", false),
    section_link: stringField(value, "section_link", false),
  };
}

function parseArticle(value: unknown): TutorialArticle {
  if (!isRecord(value)) throw new TutorialApiError("INVALID_PAYLOAD", "Invalid tutorial article");
  return {
    title: stringField(value, "title")!,
    slug: stringField(value, "slug")!,
    summary: stringField(value, "summary", false),
    body_markdown: stringField(value, "body_markdown")!,
    body_sections: optionalArrayField(value, "body_sections")?.map(parseArticleSection),
    cover_image: stringField(value, "cover_image", false),
    seo_title: stringField(value, "seo_title", false),
    seo_description: stringField(value, "seo_description", false),
    source_url: stringField(value, "source_url", false),
    source_hash: stringField(value, "source_hash", false),
    source_updated_at: stringField(value, "source_updated_at", false),
    sort_order: numberField(value, "sort_order"),
  };
}

function parseTocItem(value: unknown): TutorialTocItem {
  if (!isRecord(value)) throw new TutorialApiError("INVALID_PAYLOAD", "Invalid tutorial table of contents item");
  return {
    id: stringField(value, "id")!,
    title: stringField(value, "title")!,
    level: numberField(value, "level"),
  };
}

function parseAdjacent(value: RecordValue | null): TutorialAdjacentArticle | null {
  if (value === null) return null;
  return { title: stringField(value, "title")!, slug: stringField(value, "slug")! };
}

function parseBreadcrumb(value: unknown): TutorialBreadcrumb {
  if (!isRecord(value)) throw new TutorialApiError("INVALID_PAYLOAD", "Invalid tutorial breadcrumb");
  return { title: stringField(value, "title")!, slug: stringField(value, "slug", false) };
}

function parseSearchResult(value: unknown): TutorialSearchResult {
  if (!isRecord(value)) throw new TutorialApiError("INVALID_PAYLOAD", "Invalid tutorial search result");
  return {
    title: stringField(value, "title")!,
    slug: stringField(value, "slug")!,
    category: stringField(value, "category")!,
    excerpt: stringField(value, "excerpt")!,
    matched_heading: stringField(value, "matched_heading", false),
  };
}

export function parseTutorialSpacesPayload(payload: unknown): TutorialSpacesPayload {
  const message = messagePayload(payload);
  return {
    schema_version: "v1",
    items: arrayField(message, "items").map(parseSpaceSettings),
    last_modified: stringField(message, "last_modified", false),
  };
}

export function parseTutorialSpacePayload(payload: unknown): TutorialSpacePayload {
  const message = messagePayload(payload);
  return {
    schema_version: "v1",
    space: parseSpaceSettings(message.space),
    navigation: arrayField(message, "navigation").map(parseNavCategory),
    default_article_slug: stringField(message, "default_article_slug", false),
    last_modified: stringField(message, "last_modified")!,
  };
}

export function parseTutorialPagePayload(payload: unknown): TutorialPagePayload {
  const message = messagePayload(payload);
  return {
    schema_version: "v1",
    space: parseSpaceSettings(message.space),
    navigation: arrayField(message, "navigation").map(parseNavCategory),
    article: parseArticle(message.article),
    table_of_contents: arrayField(message, "table_of_contents").map(parseTocItem),
    previous_article: parseAdjacent(nullableRecord(message, "previous_article")),
    next_article: parseAdjacent(nullableRecord(message, "next_article")),
    breadcrumbs: arrayField(message, "breadcrumbs").map(parseBreadcrumb),
    last_modified: stringField(message, "last_modified")!,
  };
}

export function parseTutorialSearchPayload(payload: unknown): TutorialSearchPayload {
  const message = messagePayload(payload);
  return {
    schema_version: "v1",
    space: stringField(message, "space")!,
    q: stringField(message, "q")!,
    limit: numberField(message, "limit"),
    results: arrayField(message, "results").map(parseSearchResult),
  };
}
