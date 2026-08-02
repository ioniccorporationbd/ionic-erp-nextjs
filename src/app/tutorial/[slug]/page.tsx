import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TutorialPage from "@/components/tutorial/TutorialPage";
import { getTutorialPage, tutorialCanonicalUrl } from "@/lib/tutorial-api";
import { TutorialApiError, type TutorialPagePayload } from "@/types/tutorial";

interface TutorialTopicRouteProps {
  readonly params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: TutorialTopicRouteProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const payload = await getTutorialPage(slug);
    const title = payload.article.seo_title || payload.article.title;
    const description = payload.article.seo_description || payload.article.summary || payload.space.short_description;
    const canonical = tutorialCanonicalUrl(payload.article.slug);
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
  } catch (error) {
    if (error instanceof TutorialApiError && error.code === "NOT_FOUND") return { title: "Tutorial page not found" };
    return { title: "Ionic Tutorial", description: "Ionic ERP tutorial documentation." };
  }
}

async function loadTutorialPage(slug: string): Promise<TutorialPagePayload> {
  try {
    return await getTutorialPage(slug);
  } catch (error) {
    if (error instanceof TutorialApiError && error.code === "NOT_FOUND") notFound();
    throw error;
  }
}

export default async function TutorialTopicRoute({ params }: TutorialTopicRouteProps) {
  const { slug } = await params;
  const payload = await loadTutorialPage(slug);
  return <TutorialPage payload={payload} />;
}
