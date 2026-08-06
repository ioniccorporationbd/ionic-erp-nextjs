import Link from "next/link";
import styles from "./tutorial-empty.module.css";
import type { TutorialSpaceSettings } from "@/types/tutorial";

type TutorialEmptyStateProps = Readonly<{
  space: TutorialSpaceSettings | null;
  spaces?: TutorialSpaceSettings[] | null;
  defaultSpace?: string;
}>;

/**
 * Rendered when a published space has no published content yet (the API
 * returns no default_article_slug). Keeps the tutorial routes usable and
 * lets the visitor switch to another space instead of showing an error.
 */
export default function TutorialEmptyState({ space, spaces, defaultSpace }: TutorialEmptyStateProps) {
  const title = space?.title ?? "Ionic Tutorial";
  return (
    <main className={styles.main}>
      <section className={styles.card} aria-labelledby="tutorial-empty-title">
        {space?.logo ? <img className={styles.logo} src={space.logo} alt="" /> : null}
        <h1 id="tutorial-empty-title">{title}</h1>
        {space?.short_description ? <p className={styles.description}>{space.short_description}</p> : null}
        <p className={styles.message}>এই space-এ এখনো কোনো প্রকাশিত নথি নেই।</p>
        {spaces && spaces.length > 0 ? (
          <nav className={styles.spaceLinks} aria-label="অন্য space-সমূহ">
            {spaces.map((item) => (
              <Link
                key={item.slug}
                className={styles.spaceLink}
                href={item.slug === defaultSpace ? "/tutorial" : `/tutorial?space=${encodeURIComponent(item.slug)}`}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        ) : null}
      </section>
    </main>
  );
}
