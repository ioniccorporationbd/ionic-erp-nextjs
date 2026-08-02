import Link from "next/link";
import styles from "@/components/tutorial/tutorial.module.css";

export default function TutorialNotFound() {
  return (
    <div className={`tutorial-page ${styles.page}`} lang="en">
      <main className={styles.main}>
        <article className={styles.article}>
          <div className={styles.articleToolbar}><h1>Tutorial page not found</h1></div>
          <div className={styles.rule} />
          <p>This tutorial article is not published or does not exist.</p>
          <Link href="/tutorial">Back to tutorial home</Link>
        </article>
      </main>
    </div>
  );
}
