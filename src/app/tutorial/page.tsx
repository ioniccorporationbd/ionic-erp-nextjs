import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TutorialPage from "@/components/tutorial/TutorialPage";
import { getTutorialConfig, getTutorialPage, getTutorialSpaces, tutorialCanonicalUrl } from "@/lib/tutorial-api";
import { TutorialApiError, type TutorialPagePayload } from "@/types/tutorial";

interface TutorialRouteProps {
  readonly searchParams: Promise<{ space?: string }>;
}

function selectedSpace(searchParams: { space?: string }): string | undefined {
  const raw = searchParams.space?.trim();
  return raw ? raw : undefined;
}

export async function generateMetadata({ searchParams }: TutorialRouteProps): Promise<Metadata> {
  try {
    const space = selectedSpace(await searchParams);
    const payload = await getTutorialPage(undefined, space);
    const title = payload.article.seo_title || payload.article.title;
    const description = payload.article.seo_description || payload.article.summary || payload.space.short_description;
    const canonical = tutorialCanonicalUrl(null, space);
    return {
      metadataBase: new URL((process.env.SITE_BASE_URL || "https://www.ionicerp.xyz").replace(/\/+$/, "")),
      title,
      description,
      alternates: { canonical },
      openGraph: {
        title,
        description,
        url: canonical,
        type: "article",
        images: payload.article.cover_image ? [payload.article.cover_image] : undefined,
      },
    };
  } catch {
    return { title: "Ionic Tutorial", description: "Ionic ERP tutorial documentation." };
  }
}

async function loadTutorialHome(space?: string): Promise<TutorialPagePayload> {
  try {
    return await getTutorialPage(undefined, space);
  } catch (error) {
    if (error instanceof TutorialApiError && error.code === "NOT_FOUND") notFound();
    throw error;
  }
}

export default async function TutorialRoute({ searchParams }: TutorialRouteProps) {
  const space = selectedSpace(await searchParams);
  const payload = await loadTutorialHome(space);
  // The space list powers the header dropdown; if it is temporarily
  // unavailable the page still renders with the current space only.
  const spacesPayload = await getTutorialSpaces().catch(() => null);
  return <TutorialPage payload={payload} spaces={spacesPayload?.items ?? null} defaultSpace={getTutorialConfig().tutorialSpace} />;
}
