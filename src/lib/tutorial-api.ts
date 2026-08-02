import "@/lib/server-only";

import { mockTutorialPages, mockTutorialSpace } from "@/lib/tutorial-mock";
import { parseTutorialPagePayload, parseTutorialSearchPayload, parseTutorialSpacePayload } from "@/lib/tutorial-schema";
import { TutorialApiError, type TutorialPagePayload, type TutorialSearchPayload, type TutorialSpacePayload } from "@/types/tutorial";

export const DEFAULT_FRAPPE_BASE_URL = "https://next.ionicerp.xyz";
export const DEFAULT_TUTORIAL_SPACE = "ionic-tutorial";
export const DEFAULT_TUTORIAL_REVALIDATE_SECONDS = 300;
export const TUTORIAL_REQUEST_TIMEOUT_MS = 10_000;

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
    revalidateSeconds: Number.isFinite(revalidate) && revalidate > 0 ? revalidate : DEFAULT_TUTORIAL_REVALIDATE_SECONDS,
    useMocks: process.env.TUTORIAL_USE_MOCKS === "1" && process.env.NODE_ENV !== "production",
  };
}

function buildUrl(method: "get_space" | "get_page" | "search", params: Record<string, string | number>): string {
  const { frappeBaseUrl } = getTutorialConfig();
  const url = new URL(`${frappeBaseUrl}${METHOD_PREFIX}${method}`);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, String(value)));
  return url.toString();
}

function isNotFoundStatus(status: number): boolean {
  return status === 404;
}

async function fetchJson(url: string): Promise<unknown> {
  const { revalidateSeconds } = getTutorialConfig();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TUTORIAL_REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      method: "GET",
      cache: "force-cache",
      next: { revalidate: revalidateSeconds },
      headers: { accept: "application/json" },
      signal: controller.signal,
    });
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

export async function getTutorialSpace(): Promise<TutorialSpacePayload> {
  const config = getTutorialConfig();
  if (config.useMocks) return mockTutorialSpace;
  return parseTutorialSpacePayload(await fetchJson(buildUrl("get_space", { space: config.tutorialSpace })));
}

export async function getTutorialPage(slug?: string): Promise<TutorialPagePayload> {
  const config = getTutorialConfig();
  const safeSlug = slug?.trim();
  if (!safeSlug) {
    const space = await getTutorialSpace();
    return getTutorialPage(space.default_article_slug);
  }
  if (config.useMocks) {
    const page = mockTutorialPages[safeSlug];
    if (!page) throw new TutorialApiError("NOT_FOUND", "Tutorial content was not found", 404);
    return page;
  }
  return parseTutorialPagePayload(await fetchJson(buildUrl("get_page", { space: config.tutorialSpace, slug: safeSlug })));
}

export async function searchTutorial(q: string, limit = 10): Promise<TutorialSearchPayload> {
  const config = getTutorialConfig();
  return parseTutorialSearchPayload(await fetchJson(buildUrl("search", { space: config.tutorialSpace, q, limit })));
}

export function tutorialHref(slug?: string | null): string {
  return slug ? `/tutorial/${encodeURIComponent(slug)}` : "/tutorial";
}

export function tutorialCanonicalUrl(slug?: string | null): string {
  const base = (process.env.SITE_BASE_URL || "https://www.ionicerp.xyz").replace(/\/+$/, "");
  return `${base}${tutorialHref(slug)}`;
}
