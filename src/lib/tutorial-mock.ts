import type { TutorialPagePayload, TutorialSpacePayload, TutorialSpacesPayload } from "@/types/tutorial";

export const mockTutorialSpaces: TutorialSpacesPayload = {
  schema_version: "v1",
  items: [
    {
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
    {
      title: "Ionic POS",
      slug: "ionic-pos",
      route_prefix: "/tutorial",
      source_app: "ionic_tutorial",
      logo: "/assets/tutorial/frappe-hr-logo.png",
      short_description: "Point of sale mock space.",
    },
  ],
  last_modified: "2026-08-02 00:00:00",
};

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
    {
      title: "Long Navigation Category With A Name That Must Wrap On Small Screens",
      slug: "long-navigation",
      description: "Stress cases.",
      sort_order: 2,
      articles: [
        { title: "Long Article With Code Blocks Tables Alerts Large Images And Very Very Long Titles", slug: "long-article", summary: "Stress article for responsive QA.", sort_order: 1 },
        { title: "New Article Added After Frontend Build", slug: "post-build-article", summary: "Runtime slug coverage.", sort_order: 2 },
      ],
    },
  ],
  default_article_slug: "welcome",
  last_modified: "2026-08-02 00:00:00",
};

const basePage: TutorialPagePayload = {
  ...mockTutorialSpace,
  article: {
    title: "Welcome",
    slug: "welcome",
    summary: "Development mock welcome article.",
    body_sections: [
      {
        section_title: "Welcome",
        section_description: "This development-only mock proves the frontend can render ERP tutorial content.",
      },
      {
        section_title: "Next steps",
        section_description: "Use the live Frappe API outside tests. [Runtime Article](/tutorial/runtime-article)",
      },
    ],
    seo_title: "Welcome to Ionic Tutorial",
    seo_description: "Development mock tutorial page.",
    source_url: "content://ionic-tutorial/articles/welcome.md",
    source_updated_at: "2026-08-02 00:00:00",
    sort_order: 1,
  },
  table_of_contents: [
    { id: "welcome", title: "Welcome", level: 2 },
    { id: "next-steps", title: "Next steps", level: 2 },
  ],
  previous_article: null,
  next_article: { title: "Runtime Article", slug: "runtime-article" },
  breadcrumbs: [{ title: "Ionic Tutorial", slug: "ionic-tutorial" }, { title: "Welcome", slug: "welcome" }],
  last_modified: "2026-08-02 00:00:00",
};

export const mockTutorialPages: Record<string, TutorialPagePayload> = {
  welcome: basePage,
  "runtime-article": {
    ...basePage,
    article: {
      ...basePage.article,
      title: "Runtime Article",
      slug: "runtime-article",
      body_sections: [
        {
          section_title: "Runtime heading",
          section_description: "This page is not generated from static params.\n\nNew runtime content loads without a frontend rebuild.",
        },
      ],
    },
    table_of_contents: [{ id: "runtime-heading", title: "Runtime heading", level: 2 }],
    previous_article: { title: "Welcome", slug: "welcome" },
    next_article: { title: "Long Article With Code Blocks Tables Alerts Large Images And Very Very Long Titles", slug: "long-article" },
    breadcrumbs: [{ title: "Ionic Tutorial", slug: "ionic-tutorial" }, { title: "Runtime Article", slug: "runtime-article" }],
  },
  "long-article": {
    ...basePage,
    article: {
      ...basePage.article,
      title: "Long Article With Code Blocks Tables Alerts Large Images And Very Very Long Titles",
      slug: "long-article",
      summary: "A deterministic article for long content, long navigation, and responsive visual coverage.",
      body_sections: [
        { section_description: "LongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLong" },
        {
          section_title: "Code block",
          section_description: "```bash\nbench --site next.ionicerp.xyz migrate\nbench --site next.ionicerp.xyz clear-cache\n```",
        },
        {
          section_title: "Table section",
          section_description: "| Feature | Status |\n| --- | --- |\n| Navigation | API driven |\n| Runtime slugs | Supported |",
        },
        {
          section_title: "Lists and alert",
          section_description: "- Complete left navigation\n- Keyboard search\n- Mobile drawer\n\n> Alert content for accessibility and wrapping.\n\n[External Link](https://example.com) and [Unsafe Link](javascript:alert(1)).",
        },
      ],
      source_updated_at: "2026-08-02 18:37:15.196692",
      sort_order: 3,
    },
    table_of_contents: [
      { id: "code-block", title: "Code block", level: 2 },
      { id: "table-section", title: "Table section", level: 2 },
      { id: "lists-and-alert", title: "Lists and alert", level: 2 },
    ],
    previous_article: { title: "Runtime Article", slug: "runtime-article" },
    next_article: { title: "New Article Added After Frontend Build", slug: "post-build-article" },
    breadcrumbs: [{ title: "Ionic Tutorial", slug: "ionic-tutorial" }, { title: "Long Article", slug: "long-article" }],
  },
  "post-build-article": {
    ...basePage,
    article: {
      ...basePage.article,
      title: "New Article Added After Frontend Build",
      slug: "post-build-article",
      body_sections: [
        {
          section_title: "Post Build",
          section_description: "This article simulates ERP content added after the frontend build.",
        },
      ],
      sort_order: 4,
    },
    table_of_contents: [{ id: "post-build", title: "Post Build", level: 2 }],
    previous_article: { title: "Long Article With Code Blocks Tables Alerts Large Images And Very Very Long Titles", slug: "long-article" },
    next_article: null,
    breadcrumbs: [{ title: "Ionic Tutorial", slug: "ionic-tutorial" }, { title: "Post Build", slug: "post-build-article" }],
  },
};
