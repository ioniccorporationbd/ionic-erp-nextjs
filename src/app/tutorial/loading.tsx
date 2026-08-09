import styles from "@/components/tutorial/tutorial.module.css";

export default function TutorialLoading() {
  return (
    <div className={`tutorial-page ${styles.page}`}>
      <main className={styles.main}>
        <article className={styles.article}>
          <div className={styles.articleToolbar}><h1>Loading tutorial…</h1></div>
          <div className={styles.rule} />
          <p>Fetching published tutorial content from Ionic ERP.</p>
        </article>
      </main>
    </div>
  );
}
