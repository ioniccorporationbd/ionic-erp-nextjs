import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TutorialPage from "@/components/tutorial/TutorialPage";
import { getTutorialConfig, getTutorialPage, getTutorialSpaces, tutorialCanonicalUrl } from "@/lib/tutorial-api";
import { TutorialApiError, type TutorialPagePayload } from "@/types/tutorial";

interface TutorialTopicRouteProps {
  readonly params: Promise<{ slug: string }>;
  readonly searchParams: Promise<{ space?: string }>;
}

function selectedSpace(searchParams: { space?: string }): string | undefined {
  const raw = searchParams.space?.trim();
  return raw ? raw : undefined;
}

export async function generateMetadata({ params, searchParams }: TutorialTopicRouteProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const space = selectedSpace(await searchParams);
    const payload = await getTutorialPage(slug, space);
    const title = payload.article.seo_title || payload.article.title;
    const description = payload.article.seo_description || payload.article.summary || payload.space.short_description;
    const canonical = tutorialCanonicalUrl(payload.article.slug, space);
    const coverImage = payload.article.body_sections.find((section) => section.section_image)?.section_image;
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
        images: coverImage ? [coverImage] : undefined,
      },
    };
  } catch (error) {
    if (error instanceof TutorialApiError && error.code === "NOT_FOUND") return { title: "Tutorial page not found" };
    return { title: "Ionic Tutorial", description: "Ionic ERP tutorial documentation." };
  }
}

async function loadTutorialPage(slug: string, space?: string): Promise<TutorialPagePayload> {
  try {
    return await getTutorialPage(slug, space);
  } catch (error) {
    if (error instanceof TutorialApiError && error.code === "NOT_FOUND") notFound();
    throw error;
  }
}

export default async function TutorialTopicRoute({ params, searchParams }: TutorialTopicRouteProps) {
  const { slug } = await params;
  const space = selectedSpace(await searchParams);
  const payload = await loadTutorialPage(slug, space);
  const spacesPayload = await getTutorialSpaces().catch(() => null);
  return <TutorialPage payload={payload} spaces={spacesPayload?.items ?? null} defaultSpace={getTutorialConfig().tutorialSpace} />;
}
