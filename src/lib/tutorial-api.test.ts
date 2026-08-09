import { afterEach, describe, expect, it, vi } from "vitest";

const originalEnv = { ...process.env };

async function loadApi() {
  vi.resetModules();
  return import("./tutorial-api");
}

function jsonResponse(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), {
    status: init.status ?? 200,
    headers: { "content-type": "application/json", ...(init.headers ?? {}) },
  });
}

const validSpacePayload = {
  message: {
    schema_version: "v1",
    space: {
      title: "Ionic Tutorial",
      slug: "ionic-tutorial",
      route_prefix: "/tutorial",
      logo: "/assets/ionic_tutorial/content/spaces/ionic-tutorial/assets/ionic-tutorial-logo.svg",
      learn_url: "https://next.ionicerp.xyz/tutorial/ionic-tutorial/welcome",
      website_url: "https://next.ionicerp.xyz",
      github_url: "https://github.com/ioniccorporationbd/ionic_tutorial",
    },
    navigation: [
      {
        title: "Getting Started",
        slug: "getting-started",
        sort_order: 1,
        articles: [{ title: "Welcome", slug: "welcome", summary: "Start", sort_order: 1 }],
      },
    ],
    default_article_slug: "welcome",
    last_modified: "2026-08-02 00:00:00",
  },
};

const validPagePayload = {
  message: {
    ...validSpacePayload.message,
    article: {
      title: "Welcome",
      slug: "welcome",
      summary: "Start",
      content_blocks: [{ block_type: "Heading", title: "Welcome" }, { block_type: "Markdown", content: "Body" }],
      seo_title: "Welcome SEO",
      seo_description: "SEO description",
      source_url: "content://ionic-tutorial/articles/welcome.md",
      sort_order: 1,
    },
    table_of_contents: [{ id: "welcome", title: "Welcome", level: 1 }],
    previous_article: null,
    next_article: null,
    breadcrumbs: [{ title: "Ionic Tutorial", slug: "ionic-tutorial" }, { title: "Welcome", slug: "welcome" }],
  },
};

afterEach(() => {
  vi.unstubAllGlobals();
  process.env = { ...originalEnv };
});

describe("Ionic Tutorial API client", () => {
  it("fetches a successful payload from Frappe with server revalidation", async () => {
    process.env.FRAPPE_BASE_URL = "https://next.ionicerp.xyz";
    process.env.TUTORIAL_REVALIDATE_SECONDS = "300";
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(validSpacePayload));
    vi.stubGlobal("fetch", fetchMock);
    const api = await loadApi();

    const payload = await api.getTutorialSpace();

    expect(payload.space.slug).toBe("ionic-tutorial");
    expect(payload.space.logo).toBe("https://next.ionicerp.xyz/assets/ionic_tutorial/content/spaces/ionic-tutorial/assets/ionic-tutorial-logo.svg");
    expect(fetchMock).toHaveBeenCalledWith(
      "https://next.ionicerp.xyz/api/method/ionic_tutorial.api.v1.get_space?space=ionic-tutorial",
      expect.objectContaining({ cache: "force-cache", next: { revalidate: 300 } }),
    );
    expect(fetchMock.mock.calls[0][1]?.headers).not.toHaveProperty("authorization");
  });

  it("parses article content_blocks (child table rows) when present", async () => {
    process.env.FRAPPE_BASE_URL = "https://next.ionicerp.xyz";
    const pagePayload = {
      message: {
        ...validPagePayload.message,
        article: {
          ...validPagePayload.message.article,
          content_blocks: [
            { block_type: "Heading", title: "Getting Started", subtitle: "Follow the guide", description: "A quick tour" },
            {
              block_type: "Markdown",
              content: "Body text",
              image: "javascript:alert(1)",
              video_url: "",
              attachment: "/files/guide.pdf",
            },
          ],
        },
      },
    };
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse(pagePayload)));
    const api = await loadApi();
    const payload = await api.getTutorialPage("welcome");

    expect(payload.article.content_blocks).toHaveLength(2);
    expect(payload.article.content_blocks?.[0].block_type).toBe("Heading");
    expect(payload.article.content_blocks?.[0].title).toBe("Getting Started");
    expect(payload.article.content_blocks?.[0].subtitle).toBe("Follow the guide");
    expect(payload.article.content_blocks?.[0].description).toBe("A quick tour");
    expect(payload.article.content_blocks?.[1].content).toBe("Body text");
    expect(payload.article.content_blocks?.[1].image).toBe("javascript:alert(1)");
    expect(payload.article.content_blocks?.[1].video_url).toBe("");
    expect(payload.article.content_blocks?.[1].attachment).toBe("https://next.ionicerp.xyz/files/guide.pdf");
  });

  it("rejects an article whose content_blocks contain a malformed row", async () => {
    process.env.FRAPPE_BASE_URL = "https://next.ionicerp.xyz";
    const bad = {
      message: {
        ...validPagePayload.message,
        article: { ...validPagePayload.message.article, content_blocks: ["nope"] },
      },
    };
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse(bad)));
    const api = await loadApi();

    await expect(api.getTutorialPage("welcome")).rejects.toMatchObject({ code: "INVALID_PAYLOAD" });
  });

  it("rejects malformed payloads instead of rendering incorrect content", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ message: { bad: true } })));
    const api = await loadApi();
    await expect(api.getTutorialSpace()).rejects.toMatchObject({ code: "INVALID_PAYLOAD" });
  });

  it("accepts a published space whose default article is not published yet", async () => {
    process.env.FRAPPE_BASE_URL = "https://next.ionicerp.xyz";
    const emptySpace = { message: { ...validSpacePayload.message, default_article_slug: null, navigation: [] } };
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse(emptySpace)));
    const api = await loadApi();

    const payload = await api.getTutorialSpace();

    expect(payload.default_article_slug).toBeUndefined();
    expect(payload.space.slug).toBe("ionic-tutorial");
  });

  it("maps a space without published content to a typed empty-space error", async () => {
    process.env.FRAPPE_BASE_URL = "https://next.ionicerp.xyz";
    const emptySpace = { message: { ...validSpacePayload.message, default_article_slug: null, navigation: [] } };
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse(emptySpace)));
    const api = await loadApi();

    await expect(api.getTutorialPage(undefined)).rejects.toMatchObject({ code: "SPACE_EMPTY" });
  });

  it("maps ERP 404 to a typed not-found error", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ exc_type: "DoesNotExistError" }, { status: 404 })));
    const api = await loadApi();
    await expect(api.getTutorialPage("new-runtime-slug")).rejects.toMatchObject({ code: "NOT_FOUND", status: 404 });
  });

  it("surfaces ERP unavailable and non-JSON errors", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("bad gateway", { status: 502, headers: { "content-type": "text/plain" } })));
    const api = await loadApi();
    await expect(api.getTutorialPage("welcome")).rejects.toMatchObject({ code: "ERP_UNAVAILABLE", status: 502 });
  });

  it("enforces a request timeout", async () => {
    vi.useFakeTimers();
    vi.stubGlobal("fetch", vi.fn((_url, init?: RequestInit) => new Promise((_resolve, reject) => {
      init?.signal?.addEventListener("abort", () => reject(Object.assign(new Error("aborted"), { name: "AbortError" })));
    })));
    const api = await loadApi();
    const promise = api.getTutorialPage("welcome");
    const assertion = expect(promise).rejects.toMatchObject({ code: "TIMEOUT" });
    await vi.advanceTimersByTimeAsync(10_001);
    await assertion;
    vi.useRealTimers();
  });

  it("uses a development-only mock adapter for tests", async () => {
    process.env.TUTORIAL_USE_MOCKS = "1";
    const api = await loadApi();
    const page = await api.getTutorialPage("welcome");
    expect(page.article.slug).toBe("welcome");
  });

  it("fetches runtime slugs without generateStaticParams from hard-coded navigation", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ ...validPagePayload, message: { ...validPagePayload.message, article: { ...validPagePayload.message.article, slug: "new-runtime-slug" } } }));
    vi.stubGlobal("fetch", fetchMock);
    const api = await loadApi();
    const page = await api.getTutorialPage("new-runtime-slug");
    expect(page.article.slug).toBe("new-runtime-slug");
  });

  it("maps legacy ERP 417 validation errors to not-found like 404", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ exc_type: "ValidationError" }, { status: 417 })));
    const api = await loadApi();
    await expect(api.getTutorialPage("missing-article")).rejects.toMatchObject({ code: "NOT_FOUND", status: 417 });
  });

  it("absolutizes /files/ asset paths against the ERP base URL", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({
      ...validPagePayload,
      message: {
        ...validPagePayload.message,
        space: { ...validPagePayload.message.space, logo: "/files/tamim-hassan-logo.png" },
        article: {
          ...validPagePayload.message.article,
          content_blocks: [{ block_type: "Image", image: "/files/cover.png" }],
        },
      },
    })));
    const api = await loadApi();
    const page = await api.getTutorialPage("welcome");
    expect(page.space.logo).toBe("https://next.ionicerp.xyz/files/tamim-hassan-logo.png");
    expect(page.article.content_blocks?.[0].image).toBe("https://next.ionicerp.xyz/files/cover.png");
  });

  it("defaults to a 60s revalidate and allows 0 to disable caching entirely", async () => {
    const fetchMock = vi.fn().mockImplementation(() => Promise.resolve(jsonResponse(validSpacePayload)));
    vi.stubGlobal("fetch", fetchMock);
    let api = await loadApi();
    await api.getTutorialSpace();
    expect(fetchMock.mock.calls[0][1]).toMatchObject({ cache: "force-cache", next: { revalidate: 60 } });

    process.env.TUTORIAL_REVALIDATE_SECONDS = "0";
    api = await loadApi();
    await api.getTutorialSpace();
    expect(fetchMock.mock.calls[1][1]).toMatchObject({ cache: "no-store" });
    expect(fetchMock.mock.calls[1][1]).not.toHaveProperty("next");
  });

  it("fetches and normalizes the published space list for the dropdown", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({
      message: {
        schema_version: "v1",
        items: [
          { title: "Ionic Tutorial", slug: "ionic-tutorial", route_prefix: "/tutorial", logo: "/files/logo-a.svg", short_description: "Docs" },
          { title: "Ionic POS", slug: "ionic-pos", route_prefix: "/tutorial" },
        ],
        last_modified: "2026-08-02 00:00:00",
      },
    }));
    vi.stubGlobal("fetch", fetchMock);
    const api = await loadApi();
    const payload = await api.getTutorialSpaces(50);
    expect(payload.items.map((item) => item.slug)).toEqual(["ionic-tutorial", "ionic-pos"]);
    expect(payload.items[0].logo).toBe("https://next.ionicerp.xyz/files/logo-a.svg");
    expect(fetchMock).toHaveBeenCalledWith(
      "https://next.ionicerp.xyz/api/method/ionic_tutorial.api.v1.list_spaces?limit=50",
      expect.anything(),
    );
  });

  it("threads an explicit ?space= selection into every ERP call", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(validPagePayload));
    vi.stubGlobal("fetch", fetchMock);
    const api = await loadApi();
    await api.getTutorialPage("welcome", "ionic-pos");
    expect(fetchMock.mock.calls[0][0]).toContain("api/method/ionic_tutorial.api.v1.get_page?space=ionic-pos&slug=welcome");
  });

  it("keeps clean hrefs for the default space and scopes others with ?space=", async () => {
    const api = await loadApi();
    expect(api.tutorialHref("welcome", "ionic-tutorial", "ionic-tutorial")).toBe("/tutorial/welcome");
    expect(api.tutorialHref("welcome", "ionic-pos", "ionic-tutorial")).toBe("/tutorial/welcome?space=ionic-pos");
    expect(api.tutorialHref(null, "ionic-pos", "ionic-tutorial")).toBe("/tutorial?space=ionic-pos");
    expect(api.tutorialHref("welcome")).toBe("/tutorial/welcome");
  });
});
