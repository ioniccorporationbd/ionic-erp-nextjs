"use client";

import { useEffect } from "react";
import styles from "@/components/tutorial/tutorial.module.css";

export default function TutorialError({ error, reset }: Readonly<{ error: Error; reset: () => void }>) {
  useEffect(() => {
    console.error("Tutorial page error boundary:", error);
  }, [error]);
  return (
    <div className={`tutorial-page ${styles.page}`}>
      <main className={styles.main}>
        <article className={styles.article}>
          <div className={styles.articleToolbar}><h1>Unable to load tutorial</h1></div>
          <div className={styles.rule} />
          <p>The tutorial API returned an error. Please try again; if it continues, check the ERP API deployment.</p>
          {error.message ? <p className={styles.errorDetail}>Details: {error.message}</p> : null}
          <button type="button" onClick={reset}>Retry</button>
        </article>
      </main>
    </div>
  );
}
