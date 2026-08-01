import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TutorialPage from "@/components/tutorial/TutorialPage";
import { findTutorialTopic, tutorialTopics } from "@/content/tutorial-navigation";

interface TutorialTopicRouteProps {
  readonly params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return tutorialTopics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: TutorialTopicRouteProps): Promise<Metadata> {
  const topic = findTutorialTopic((await params).slug);
  return topic ? {
    title: `${topic.title} Tutorial`,
    description: `${topic.title} documentation in the ${topic.group} section of Frappe HR.`,
  } : {};
}

export default async function TutorialTopicRoute({ params }: TutorialTopicRouteProps) {
  const topic = findTutorialTopic((await params).slug);
  if (!topic) notFound();
  return <TutorialPage topic={topic} />;
}
