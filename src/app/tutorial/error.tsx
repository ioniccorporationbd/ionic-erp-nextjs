"use client";

import styles from "@/components/tutorial/tutorial.module.css";

export default function TutorialError({ reset }: Readonly<{ error: Error; reset: () => void }>) {
  return (
    <div className={`tutorial-page ${styles.page}`} lang="en">
      <main className={styles.main}>
        <article className={styles.article}>
          <div className={styles.articleToolbar}><h1>Unable to load tutorial</h1></div>
          <div className={styles.rule} />
          <p>The tutorial API returned an error. Please try again; if it continues, check the ERP API deployment.</p>
          <button type="button" onClick={reset}>Retry</button>
        </article>
      </main>
    </div>
  );
}
