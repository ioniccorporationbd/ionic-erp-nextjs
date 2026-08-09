import { buildDocTypeRows, type DocTypeFieldRow, type DocTypeName } from "@/lib/doctype-fields";
import type { TutorialPagePayload } from "@/types/tutorial";
import styles from "./tutorial.module.css";

const GROUPS: ReadonlyArray<{ name: DocTypeName; title: string; caption: string }> = [
  { name: "space", title: "Ionic Tutorial Space", caption: "স্পেস ডকটাইপ — ১৬টি ফিল্ড" },
  { name: "category", title: "Ionic Tutorial Category", caption: "ক্যাটাগরি ডকটাইপ — ৬টি ফিল্ড" },
  { name: "article", title: "Ionic Tutorial Article", caption: "আর্টিকেল ডকটাইপ — ১০টি ফিল্ড" },
];

function FieldValue({ row }: { row: DocTypeFieldRow }) {
  if (!row.present) {
    return (
      <span className={styles.doctypeMissing}>
        {row.value} <small>public API-তে নেই / খালি</small>
      </span>
    );
  }
  if (row.kind === "url" && row.href) {
    return (
      <a className={styles.doctypeLink} href={row.href} target="_blank" rel="noopener noreferrer">
        {row.value}
      </a>
    );
  }
  if (row.kind === "image" && row.href) {
    return (
      <span className={styles.doctypeImageWrap}>
        <img className={styles.doctypeImage} src={row.href} alt="" loading="lazy" />
        <code>{row.value}</code>
      </span>
    );
  }
  if (row.kind === "json") {
    return <pre className={styles.doctypeJson}>{row.value}</pre>;
  }
  return <span className={styles.doctypeText}>{row.value}</span>;
}

function DocTypeGroup({
  name,
  title,
  caption,
  rows,
}: {
  name: DocTypeName;
  title: string;
  caption: string;
  rows: readonly DocTypeFieldRow[];
}) {
  return (
    <article className={styles.doctypeGroup} aria-label={title}>
      <h3 className={styles.doctypeGroupTitle}>
        <code>{name}</code> {title}
        <span className={styles.doctypeGroupCaption}>{caption}</span>
      </h3>
      <dl className={styles.doctypeList}>
        {rows.map((row) => (
          <div className={styles.doctypeRow} key={`${name}-${row.fieldname}`}>
            <dt className={styles.doctypeTerm}>
              <code className={styles.doctypeFieldname}>{row.fieldname}</code>
              <span className={styles.doctypeLabel}>{row.label}</span>
              <em className={styles.doctypeType}>{row.type}</em>
            </dt>
            <dd className={styles.doctypeValue}>
              <FieldValue row={row} />
            </dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

export function DocTypeFields({ payload }: { payload: TutorialPagePayload }) {
  const rows = buildDocTypeRows(payload);
  return (
    <section className={styles.doctypeFields} aria-labelledby="doctype-fields-heading">
      <details className={styles.doctypeDetails}>
        <summary id="doctype-fields-heading" className={styles.doctypeSummary}>
          DocType Fields
          <span className={styles.doctypeBadge}>৩টি ডকটাইপ · ফিল্ড + data</span>
        </summary>
        <p className={styles.doctypeIntro}>
          এই পেজে ব্যবহৃত ৩টি DocType-এর ফিল্ড ও তার বর্তমান data নিচে দেখানো হলো।
          যে ফিল্ডগুলো public API expose করে না, সেগুলো <strong>“—”</strong> হিসেবে দেখানো হয়েছে।
        </p>
        {GROUPS.map((group) => (
          <DocTypeGroup
            key={group.name}
            name={group.name}
            title={group.title}
            caption={group.caption}
            rows={rows[group.name]}
          />
        ))}
      </details>
    </section>
  );
}
