import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TutorialPage from "@/components/tutorial/TutorialPage";
import { getTutorialPage, tutorialCanonicalUrl } from "@/lib/tutorial-api";
import { TutorialApiError, type TutorialPagePayload } from "@/types/tutorial";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const payload = await getTutorialPage();
    const title = payload.article.seo_title || payload.article.title;
    const description = payload.article.seo_description || payload.article.summary || payload.space.short_description;
    const canonical = tutorialCanonicalUrl(null);
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

async function loadTutorialHome(): Promise<TutorialPagePayload> {
  try {
    return await getTutorialPage();
  } catch (error) {
    if (error instanceof TutorialApiError && error.code === "NOT_FOUND") notFound();
    throw error;
  }
}

export default async function TutorialRoute() {
  const payload = await loadTutorialHome();
  return <TutorialPage payload={payload} />;
}
