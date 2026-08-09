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
  readonly source_base_url?: string;
  readonly attribution_text?: string;
  readonly theme_config_json?: string;
  readonly sort_order?: number;
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

export type TutorialBlockType = "Heading" | "Markdown" | "Image" | "Video" | "Image Text" | "Callout" | "Divider";

export interface TutorialContentBlock {
  readonly block_type: TutorialBlockType;
  readonly title?: string;
  readonly content?: string;
  readonly image?: string;
  readonly image_alt?: string;
  readonly caption?: string;
  readonly video_url?: string;
  readonly layout?: "image-left" | "image-right" | "image-above";
  readonly width?: "full" | "wide" | "normal";
  readonly alignment?: "left" | "center" | "right";
  readonly config_json?: string;
  readonly enabled?: boolean | number;
}

export interface TutorialArticle {
  readonly title: string;
  readonly slug: string;
  readonly summary?: string;
  readonly content_blocks: readonly TutorialContentBlock[];
  readonly seo_title?: string;
  readonly seo_description?: string;
  readonly source_url?: string;
  readonly source_hash?: string;
  readonly source_updated_at?: string;
  readonly sort_order: number;
  readonly show_sidebar?: boolean | number;
  readonly show_toc?: boolean | number;
  readonly show_breadcrumb?: boolean | number;
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
  readonly default_article_slug?: string;
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

export type TutorialApiErrorCode = "BAD_REQUEST" | "NOT_FOUND" | "ERP_UNAVAILABLE" | "INVALID_PAYLOAD" | "TIMEOUT" | "SPACE_EMPTY";

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
