import type { TutorialPagePayload, TutorialSpacePayload } from "@/types/tutorial";

export const mockTutorialSpace: TutorialSpacePayload = {
  schema_version: "v1",
  space: {
    title: "Ionic Tutorial",
    slug: "ionic-tutorial",
    route_prefix: "/tutorial",
    source_app: "ionic_tutorial",
    logo: "/assets/tutorial/frappe-hr-logo.png",
    short_description: "Development tutorial mock content.",
    learn_url: "/tutorial/welcome",
    discuss_url: "https://github.com/ioniccorporationbd/ionic_tutorial/discussions",
    website_url: "https://next.ionicerp.xyz",
    github_url: "https://github.com/ioniccorporationbd/ionic_tutorial",
  },
  navigation: [
    {
      title: "Getting Started",
      slug: "getting-started",
      description: "Start here.",
      sort_order: 1,
      articles: [
        { title: "Welcome", slug: "welcome", summary: "Development mock welcome article.", sort_order: 1 },
        { title: "Runtime Article", slug: "runtime-article", summary: "A mock runtime-only article.", sort_order: 2 },
      ],
    },
  ],
  default_article_slug: "welcome",
  last_modified: "2026-08-02 00:00:00",
};

export const mockTutorialPages: Record<string, TutorialPagePayload> = {
  welcome: {
    ...mockTutorialSpace,
    article: {
      title: "Welcome",
      slug: "welcome",
      summary: "Development mock welcome article.",
      body_markdown: "# Welcome\n\nThis development-only mock proves the frontend can render ERP tutorial content.\n\n## Next steps\n\nUse the live Frappe API outside tests.",
      seo_title: "Welcome to Ionic Tutorial",
      seo_description: "Development mock tutorial page.",
      source_url: "content://ionic-tutorial/articles/welcome.md",
      sort_order: 1,
    },
    table_of_contents: [
      { id: "welcome", title: "Welcome", level: 1 },
      { id: "next-steps", title: "Next steps", level: 2 },
    ],
    previous_article: null,
    next_article: { title: "Runtime Article", slug: "runtime-article" },
    breadcrumbs: [{ title: "Ionic Tutorial", slug: "ionic-tutorial" }, { title: "Welcome", slug: "welcome" }],
  },
};

mockTutorialPages["runtime-article"] = {
  ...mockTutorialPages.welcome,
  article: {
    ...mockTutorialPages.welcome.article,
    title: "Runtime Article",
    slug: "runtime-article",
    body_markdown: "# Runtime Article\n\nThis page is not generated from static params.",
  },
  previous_article: { title: "Welcome", slug: "welcome" },
  next_article: null,
  breadcrumbs: [{ title: "Ionic Tutorial", slug: "ionic-tutorial" }, { title: "Runtime Article", slug: "runtime-article" }],
};
