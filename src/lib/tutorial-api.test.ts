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
      logo: "/assets/logo.svg",
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
      body_markdown: "# Welcome\n\nBody",
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
    expect(fetchMock).toHaveBeenCalledWith(
      "https://next.ionicerp.xyz/api/method/ionic_tutorial.api.v1.get_space?space=ionic-tutorial",
      expect.objectContaining({ cache: "force-cache", next: { revalidate: 300 } }),
    );
    expect(fetchMock.mock.calls[0][1]?.headers).not.toHaveProperty("authorization");
  });

  it("rejects malformed payloads instead of rendering incorrect content", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ message: { bad: true } })));
    const api = await loadApi();
    await expect(api.getTutorialSpace()).rejects.toMatchObject({ code: "INVALID_PAYLOAD" });
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
});
