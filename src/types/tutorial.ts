export interface TutorialSpaceSettings {
  readonly title: string;
  readonly slug: string;
  readonly route_prefix: string;
  readonly source_app?: string;
  readonly logo?: string;
  readonly short_description?: string;
  readonly learn_url?: string;
  readonly discuss_url?: string;
  readonly website_url?: string;
  readonly github_url?: string;
  readonly attribution_text?: string;
}

export interface TutorialNavigationArticle {
  readonly title: string;
  readonly slug: string;
  readonly summary?: string;
  readonly sort_order: number;
}

export interface TutorialNavigationCategory {
  readonly title: string;
  readonly slug: string;
  readonly description?: string;
  readonly sort_order: number;
  readonly articles: readonly TutorialNavigationArticle[];
}

export interface TutorialArticle {
  readonly title: string;
  readonly slug: string;
  readonly summary?: string;
  readonly body_markdown: string;
  readonly cover_image?: string;
  readonly seo_title?: string;
  readonly seo_description?: string;
  readonly source_url?: string;
  readonly source_updated_at?: string;
  readonly sort_order: number;
}

export interface TutorialTocItem {
  readonly id: string;
  readonly title: string;
  readonly level: number;
}

export interface TutorialBreadcrumb {
  readonly title: string;
  readonly slug?: string;
}

export interface TutorialAdjacentArticle {
  readonly title: string;
  readonly slug: string;
}

export interface TutorialSpacePayload {
  readonly schema_version: "v1";
  readonly space: TutorialSpaceSettings;
  readonly navigation: readonly TutorialNavigationCategory[];
  readonly default_article_slug: string;
  readonly last_modified: string;
}

export type TutorialSpacesPayload = {
  schema_version: "v1";
  items: TutorialSpaceSettings[];
  last_modified?: string;
};

export type TutorialPagePayload = {
  readonly schema_version: "v1";
  readonly space: TutorialSpaceSettings;
  readonly navigation: readonly TutorialNavigationCategory[];
  readonly article: TutorialArticle;
  readonly table_of_contents: readonly TutorialTocItem[];
  readonly previous_article: TutorialAdjacentArticle | null;
  readonly next_article: TutorialAdjacentArticle | null;
  readonly breadcrumbs: readonly TutorialBreadcrumb[];
  readonly last_modified: string;
}

export interface TutorialSearchResult {
  readonly title: string;
  readonly slug: string;
  readonly category: string;
  readonly excerpt: string;
  readonly matched_heading?: string;
}

export interface TutorialSearchPayload {
  readonly schema_version: "v1";
  readonly space: string;
  readonly q: string;
  readonly limit: number;
  readonly results: readonly TutorialSearchResult[];
}

export type TutorialApiErrorCode = "BAD_REQUEST" | "NOT_FOUND" | "ERP_UNAVAILABLE" | "INVALID_PAYLOAD" | "TIMEOUT";

export class TutorialApiError extends Error {
  readonly code: TutorialApiErrorCode;
  readonly status?: number;

  constructor(code: TutorialApiErrorCode, message: string, status?: number) {
    super(message);
    this.name = "TutorialApiError";
    this.code = code;
    this.status = status;
  }
}
