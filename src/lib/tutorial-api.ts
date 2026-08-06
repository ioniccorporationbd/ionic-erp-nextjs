import "@/lib/server-only";

import { mockTutorialPages, mockTutorialSpace, mockTutorialSpaces } from "@/lib/tutorial-mock";
import { parseTutorialPagePayload, parseTutorialSearchPayload, parseTutorialSpacePayload, parseTutorialSpacesPayload } from "@/lib/tutorial-schema";
import { TutorialApiError, type TutorialPagePayload, type TutorialSearchPayload, type TutorialSpacePayload, type TutorialSpacesPayload } from "@/types/tutorial";

export const DEFAULT_FRAPPE_BASE_URL = "https://next.ionicerp.xyz";
export const DEFAULT_TUTORIAL_SPACE = "ionic-tutorial";
export const DEFAULT_TUTORIAL_REVALIDATE_SECONDS = 60;
export const TUTORIAL_REQUEST_TIMEOUT_MS = 10_000;
export const TUTORIAL_SPACES_LIST_LIMIT = 100;

const METHOD_PREFIX = "/api/method/ionic_tutorial.api.v1.";

function env(name: string, fallback: string): string {
  const value = process.env[name]?.trim();
  return value ? value : fallback;
}

export function getTutorialConfig() {
  const revalidate = Number.parseInt(env("TUTORIAL_REVALIDATE_SECONDS", String(DEFAULT_TUTORIAL_REVALIDATE_SECONDS)), 10);
  return {
    frappeBaseUrl: env("FRAPPE_BASE_URL", DEFAULT_FRAPPE_BASE_URL).replace(/\/+$/, ""),
    tutorialSpace: env("TUTORIAL_SPACE", DEFAULT_TUTORIAL_SPACE),
    // 0 explicitly disables caching (no-store) so ERP edits appear instantly;
    // invalid values fall back to the default.
    revalidateSeconds: Number.isFinite(revalidate) && revalidate >= 0 ? revalidate : DEFAULT_TUTORIAL_REVALIDATE_SECONDS,
    useMocks: process.env.TUTORIAL_USE_MOCKS === "1",
  };
}

function buildUrl(method: "get_space" | "get_page" | "search" | "list_spaces", params: Record<string, string | number>): string {
  const { frappeBaseUrl } = getTutorialConfig();
  const url = new URL(`${frappeBaseUrl}${METHOD_PREFIX}${method}`);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, String(value)));
  return url.toString();
}

// The ERP API reports missing content as 404 (current code) and 417
// (older deployed versions used ValidationError). Treat both as not-found.
function isNotFoundStatus(status: number): boolean {
  return status === 404 || status === 417;
}

async function fetchJson(url: string): Promise<unknown> {
  const { revalidateSeconds } = getTutorialConfig();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TUTORIAL_REQUEST_TIMEOUT_MS);
  try {
    const init: RequestInit & { next?: { revalidate: number } } = {
      method: "GET",
      cache: revalidateSeconds === 0 ? "no-store" : "force-cache",
      headers: { accept: "application/json" },
      signal: controller.signal,
    };
    if (revalidateSeconds > 0) init.next = { revalidate: revalidateSeconds };
    const response = await fetch(url, init);
    const contentType = response.headers.get("content-type") ?? "";
    if (isNotFoundStatus(response.status)) {
      throw new TutorialApiError("NOT_FOUND", "Tutorial content was not found", response.status);
    }
    if (!response.ok) {
      throw new TutorialApiError("ERP_UNAVAILABLE", "Tutorial ERP API is unavailable", response.status);
    }
    if (!contentType.toLowerCase().includes("application/json")) {
      throw new TutorialApiError("ERP_UNAVAILABLE", "Tutorial ERP API returned a non-JSON response", response.status);
    }
    return await response.json();
  } catch (error) {
    if (error instanceof TutorialApiError) throw error;
    if (error instanceof Error && error.name === "AbortError") {
      throw new TutorialApiError("TIMEOUT", "Tutorial ERP API request timed out");
    }
    throw new TutorialApiError("ERP_UNAVAILABLE", "Tutorial ERP API request failed");
  } finally {
    clearTimeout(timeout);
  }
}

// Frappe serves public assets under both /assets/... and /files/...; the
// frontend runs on a different origin, so any root-relative asset path must
// be absolutized against the ERP base URL (absolute URLs stay untouched).
function withFrappeAssetBase(value: string | undefined, frappeBaseUrl: string): string | undefined {
  if (!value) return value;
  if (value.startsWith("/") && !value.startsWith("//")) return `${frappeBaseUrl}${value}`;
  return value;
}

function normalizeSpaceAssets(space: TutorialSpacePayload["space"], frappeBaseUrl: string): TutorialSpacePayload["space"] {
  return {
    ...space,
    logo: withFrappeAssetBase(space.logo, frappeBaseUrl),
  };
}

function normalizeSpacePayload(payload: TutorialSpacePayload, frappeBaseUrl: string): TutorialSpacePayload {
  return { ...payload, space: normalizeSpaceAssets(payload.space, frappeBaseUrl) };
}

function normalizePageAssets(payload: TutorialPagePayload, frappeBaseUrl: string): TutorialPagePayload {
  return {
    ...payload,
    space: normalizeSpaceAssets(payload.space, frappeBaseUrl),
    article: {
      ...payload.article,
      cover_image: withFrappeAssetBase(payload.article.cover_image, frappeBaseUrl),
    },
  };
}

export async function getTutorialSpaces(limit: number = TUTORIAL_SPACES_LIST_LIMIT): Promise<TutorialSpacesPayload> {
  const config = getTutorialConfig();
  if (config.useMocks) return mockTutorialSpaces;
  const payload = parseTutorialSpacesPayload(await fetchJson(buildUrl("list_spaces", { limit })));
  return {
    ...payload,
    items: payload.items.map((item) => normalizeSpaceAssets(item, config.frappeBaseUrl)),
  };
}

export async function getTutorialSpace(space?: string): Promise<TutorialSpacePayload> {
  const config = getTutorialConfig();
  const safeSpace = space?.trim() || config.tutorialSpace;
  if (config.useMocks) {
    if (safeSpace !== "ionic-tutorial") {
      const item = mockTutorialSpaces.items.find((candidate) => candidate.slug === safeSpace);
      return { ...mockTutorialSpace, space: { ...mockTutorialSpace.space, slug: safeSpace, title: item?.title ?? safeSpace } };
    }
    return mockTutorialSpace;
  }
  return normalizeSpacePayload(parseTutorialSpacePayload(await fetchJson(buildUrl("get_space", { space: safeSpace }))), config.frappeBaseUrl);
}

export async function getTutorialPage(slug?: string, space?: string): Promise<TutorialPagePayload> {
  const config = getTutorialConfig();
  const safeSlug = slug?.trim();
  if (!safeSlug) {
    const spacePayload = await getTutorialSpace(space);
    return getTutorialPage(spacePayload.default_article_slug, space);
  }
  const safeSpace = space?.trim() || config.tutorialSpace;
  if (config.useMocks) {
    if (safeSlug === "api-error") throw new TutorialApiError("ERP_UNAVAILABLE", "Mock tutorial ERP API error", 503);
    const page = mockTutorialPages[safeSlug];
    if (!page) throw new TutorialApiError("NOT_FOUND", "Tutorial content was not found", 404);
    if (safeSpace !== "ionic-tutorial") {
      const item = mockTutorialSpaces.items.find((candidate) => candidate.slug === safeSpace);
      return { ...page, space: { ...page.space, slug: safeSpace, title: item?.title ?? safeSpace } };
    }
    return page;
  }
  return normalizePageAssets(parseTutorialPagePayload(await fetchJson(buildUrl("get_page", { space: safeSpace, slug: safeSlug }))), config.frappeBaseUrl);
}

export async function searchTutorial(q: string, limit = 10, space?: string): Promise<TutorialSearchPayload> {
  const config = getTutorialConfig();
  const safeSpace = space?.trim() || config.tutorialSpace;
  return parseTutorialSearchPayload(await fetchJson(buildUrl("search", { space: safeSpace, q, limit })));
}

// Article/home links keep clean URLs for the default space and carry an
// explicit ?space= query for every other selected space.
export function tutorialHref(slug?: string | null, space?: string | null, defaultSpace?: string | null): string {
  const base = slug ? `/tutorial/${encodeURIComponent(slug)}` : "/tutorial";
  if (space && space !== defaultSpace) {
    return `${base}${base.includes("?") ? "&" : "?"}space=${encodeURIComponent(space)}`;
  }
  return base;
}

export function tutorialCanonicalUrl(slug?: string | null, space?: string | null): string {
  const base = (process.env.SITE_BASE_URL || "https://www.ionicerp.xyz").replace(/\/+$/, "");
  return `${base}${tutorialHref(slug, space, getTutorialConfig().tutorialSpace)}`;
}
