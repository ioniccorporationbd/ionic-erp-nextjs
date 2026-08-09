"use client";

import Link from "next/link";
import { useMemo, type ReactNode } from "react";
import type { TutorialContentBlock } from "@/types/tutorial";
import styles from "./tutorial.module.css";

/** Hide a broken image instead of showing the browser's broken-image icon. */
export function hideOnError(event: { currentTarget: HTMLImageElement }): void {
  event.currentTarget.style.display = "none";
}

export function isSafeHttpUrl(value: string | undefined): value is string {
  if (!value) return false;
  if (value.startsWith("/")) return true;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export function isExternalUrl(value: string): boolean {
  return /^https?:\/\//i.test(value);
}

export function safeHref(value: string | undefined): string | null {
  if (!value) return null;
  if (value.startsWith("#") || value.startsWith("/")) return value;
  return isSafeHttpUrl(value) ? value : null;
}

export function slugifyHeading(text: string): string {
  return text.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "section";
}

function copyHeadingLink(id: string) {
  const url = `${window.location.origin}${window.location.pathname}#${id}`;
  try {
    return Promise.resolve(navigator.clipboard?.writeText(url)).catch(() => undefined);
  } catch {
    return Promise.resolve(undefined);
  }
}

export function renderSafeLink(href: string, children: ReactNode, key: string | undefined, space?: string | null, defaultSpace?: string | null) {
  const safe = safeHref(href);
  if (!safe) return <span key={key}>{children}</span>;
  if (safe.startsWith("/tutorial/")) {
    const slug = safe.replace(/^\/tutorial\//, "").split("?")[0];
    const base = `/tutorial/${encodeURIComponent(slug)}`;
    const finalHref = space && space !== defaultSpace ? `${base}?space=${encodeURIComponent(space)}` : base;
    return <Link href={finalHref} key={key} prefetch={false}>{children}</Link>;
  }
  return <a href={safe} key={key} rel={isExternalUrl(safe) ? "noopener noreferrer" : undefined} target={isExternalUrl(safe) ? "_blank" : undefined}>{children}</a>;
}

export function renderInline(text: string, space?: string | null, defaultSpace?: string | null): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text))) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    if (match[1] && match[2]) nodes.push(renderSafeLink(match[2].trim(), match[1], `link-${match.index}`, space, defaultSpace));
    else if (match[3]) nodes.push(<code key={`code-${match.index}`}>{match[3]}</code>);
    else if (match[4]) nodes.push(<strong key={`strong-${match.index}`}>{match[4]}</strong>);
    lastIndex = pattern.lastIndex;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

export function MarkdownText({ markdown, space, defaultSpace }: Readonly<{ markdown: string; space: string; defaultSpace: string }>) {
  const blocks = useMemo(() => {
    const lines = markdown.split(/\r?\n/);
    const result: ReactNode[] = [];
    let listItems: string[] = [];
    let orderedItems: string[] = [];
    let codeLines: string[] = [];
    let inCode = false;

    function flushList() {
      if (listItems.length) result.push(<ul key={`ul-${result.length}`}>{listItems.map((item, index) => <li key={`${item}-${index}`}>{renderInline(item, space, defaultSpace)}</li>)}</ul>);
      if (orderedItems.length) result.push(<ol key={`ol-${result.length}`}>{orderedItems.map((item, index) => <li key={`${item}-${index}`}>{renderInline(item, space, defaultSpace)}</li>)}</ol>);
      listItems = [];
      orderedItems = [];
    }
    function flushCode() {
      if (!codeLines.length) return;
      result.push(<pre key={`pre-${result.length}`}><code>{codeLines.join("\n")}</code></pre>);
      codeLines = [];
    }
    function tryTable(index: number): number {
      const header = lines[index]?.trim();
      const separator = lines[index + 1]?.trim();
      if (!header?.startsWith("|") || !/^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(separator || "")) return index;
      const headers = header.split("|").map((cell) => cell.trim()).filter(Boolean);
      const rows: string[][] = [];
      let cursor = index + 2;
      while (cursor < lines.length && lines[cursor].trim().startsWith("|")) {
        rows.push(lines[cursor].split("|").map((cell) => cell.trim()).filter(Boolean));
        cursor += 1;
      }
      result.push(<div className={styles.tableScroller} key={`table-${result.length}`}><table><thead><tr>{headers.map((cell) => <th key={cell}>{renderInline(cell, space, defaultSpace)}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={`row-${rowIndex}`}>{row.map((cell, cellIndex) => <td key={`${cell}-${cellIndex}`}>{renderInline(cell, space, defaultSpace)}</td>)}</tr>)}</tbody></table></div>);
      return cursor - 1;
    }

    for (let index = 0; index < lines.length; index += 1) {
      const rawLine = lines[index];
      const line = rawLine.trim();
      if (line.startsWith("```")) {
        if (inCode) { inCode = false; flushCode(); } else { flushList(); inCode = true; }
        continue;
      }
      if (inCode) { codeLines.push(rawLine); continue; }
      if (!line) { flushList(); continue; }
      const nextIndex = tryTable(index);
      if (nextIndex !== index) { flushList(); index = nextIndex; continue; }
      const heading = /^(#{1,4})\s+(.+)$/.exec(line);
      if (heading) {
        flushList();
        // Demote headings by one level so a migrated markdown body nests
        // under the article title (h1 is reserved for the article itself).
        const level = Math.min(4, Math.max(2, heading[1].length + 1));
        const title = heading[2].replace(/#+$/, "").trim();
        const id = slugifyHeading(title);
        const copy = <button className={styles.headingLink} type="button" aria-label={`Copy link to ${title}`} onClick={() => void copyHeadingLink(id)}>#</button>;
        if (level === 2) result.push(<h2 id={id} key={id}>{copy}{title}</h2>);
        else if (level === 3) result.push(<h3 id={id} key={id}>{copy}{title}</h3>);
        else result.push(<h4 id={id} key={id}>{copy}{title}</h4>);
        continue;
      }
      const unordered = /^[-*]\s+(.+)$/.exec(line);
      if (unordered) { listItems.push(unordered[1]); continue; }
      const ordered = /^\d+\.\s+(.+)$/.exec(line);
      if (ordered) { orderedItems.push(ordered[1]); continue; }
      flushList();
      if (line.startsWith(">")) result.push(<blockquote key={`quote-${result.length}`}>{renderInline(line.replace(/^>\s?/, ""), space, defaultSpace)}</blockquote>);
      else result.push(<p key={`p-${result.length}`}>{renderInline(line, space, defaultSpace)}</p>);
    }
    flushList();
    flushCode();
    return result;
  }, [markdown, space, defaultSpace]);

  return <>{blocks}</>;
}

/** Extract the YouTube video id from watch / embed / shorts / youtu.be URLs. */
export function youtubeVideoId(value: string | undefined): string | null {
  if (!value) return null;
  const url = value.trim();
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return match ? match[1] : null;
}

function blockWidthClass(block: TutorialContentBlock): string {
  switch (block.width) {
    case "full": return styles.blockWidthFull;
    case "wide": return styles.blockWidthWide;
    default: return "";
  }
}

function blockAlignClass(block: TutorialContentBlock): string {
  switch (block.alignment) {
    case "center": return styles.blockAlignCenter;
    case "right": return styles.blockAlignRight;
    default: return "";
  }
}

export function TutorialBlockRenderer({ blocks, space, defaultSpace }: Readonly<{ blocks: readonly TutorialContentBlock[]; space: string; defaultSpace: string }>) {
  return (
    <>
      {blocks.map((block, index) => {
        const key = `${block.block_type}-${index}`;
        const widthClass = blockWidthClass(block);
        const alignClass = blockAlignClass(block);
        switch (block.block_type) {
          case "Heading": {
            const title = block.title?.trim();
            if (!title) return null;
            const id = slugifyHeading(title);
            return (
              <h2 id={id} key={key} className={`${styles.blockHeading} ${widthClass}`}>
                <button className={styles.headingLink} type="button" aria-label={`Copy link to ${title}`} onClick={() => void copyHeadingLink(id)}>#</button>
                {title}
              </h2>
            );
          }
          case "Markdown": {
            if (!block.content?.trim()) return null;
            return (
              <div key={key} className={`${styles.blockMarkdown} ${widthClass}`}>
                <MarkdownText markdown={block.content} space={space} defaultSpace={defaultSpace} />
              </div>
            );
          }
          case "Image": {
            const image = safeHref(block.image);
            if (!image) return null;
            const alt = block.image_alt?.trim() || block.caption?.trim() || block.title?.trim() || "Image";
            return (
              <figure key={key} className={`${styles.blockImage} ${alignClass}`}>
                <img src={image} alt={alt} loading="lazy" onError={hideOnError} />
                {block.caption?.trim() ? <figcaption>{block.caption.trim()}</figcaption> : null}
              </figure>
            );
          }
          case "Video": {
            const videoId = youtubeVideoId(block.video_url);
            if (!videoId) return null;
            const title = block.title?.trim() || "Video";
            return (
              <div key={key} className={`${styles.blockVideo} ${widthClass}`}>
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                {block.caption?.trim() ? <p className={styles.blockVideoCaption}>{block.caption.trim()}</p> : null}
              </div>
            );
          }
          case "Image Text": {
            const image = safeHref(block.image);
            if (!image) return null;
            const alt = block.image_alt?.trim() || block.caption?.trim() || block.title?.trim() || "Image";
            const layoutClass = block.layout === "image-right" ? styles.imageTextRight : block.layout === "image-above" ? styles.imageTextAbove : styles.imageTextLeft;
            return (
              <div key={key} className={`${styles.imageText} ${layoutClass} ${widthClass}`}>
                <img src={image} alt={alt} loading="lazy" onError={hideOnError} />
                <div className={styles.imageTextBody}>
                  {block.title?.trim() ? <h3 className={styles.imageTextTitle}>{block.title.trim()}</h3> : null}
                  {block.content?.trim() ? <MarkdownText markdown={block.content} space={space} defaultSpace={defaultSpace} /> : null}
                </div>
              </div>
            );
          }
          case "Callout": {
            if (!block.content?.trim()) return null;
            return (
              <aside key={key} className={`${styles.callout} ${alignClass}`}>
                {block.title?.trim() ? <strong className={styles.calloutTitle}>{block.title.trim()}</strong> : null}
                <MarkdownText markdown={block.content} space={space} defaultSpace={defaultSpace} />
              </aside>
            );
          }
          case "Divider":
            return <hr key={key} className={styles.divider} />;
          default:
            return null;
        }
      })}
    </>
  );
}
