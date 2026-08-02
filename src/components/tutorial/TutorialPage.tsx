"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { FiChevronDown, FiChevronRight, FiGithub, FiMenu, FiMoon, FiSearch, FiSun, FiX } from "react-icons/fi";
import styles from "./tutorial.module.css";
import type { TutorialAdjacentArticle, TutorialNavigationArticle, TutorialNavigationCategory, TutorialPagePayload, TutorialTocItem } from "@/types/tutorial";

type TutorialPageProps = Readonly<{ payload: TutorialPagePayload }>;
type SearchRow = TutorialNavigationArticle & Readonly<{ category: string }>;
type ThemeName = "light" | "dark";

const THEME_STORAGE_KEY = "ionic-tutorial-theme";

function hrefForSlug(slug: string): string {
  return `/tutorial/${encodeURIComponent(slug)}`;
}

function isSafeHttpUrl(value: string | undefined): value is string {
  if (!value) return false;
  if (value.startsWith("/")) return true;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function isExternalUrl(value: string): boolean {
  return /^https?:\/\//i.test(value);
}

function safeHref(value: string | undefined): string | null {
  if (!value) return null;
  if (value.startsWith("#") || value.startsWith("/")) return value;
  return isSafeHttpUrl(value) ? value : null;
}

function publicAssetPath(value: string | undefined, fallback: string): string {
  return safeHref(value) ?? fallback;
}

function slugifyHeading(text: string): string {
  return text.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "section";
}

function displayDate(value: string | undefined): string {
  if (!value) return "Not available";
  const date = new Date(value.replace(" ", "T"));
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "numeric" }).format(date);
}

function allSearchRows(navigation: readonly TutorialNavigationCategory[]): SearchRow[] {
  return navigation.flatMap((category) => category.articles.map((article) => ({ ...article, category: category.title })));
}

function renderSafeLink(href: string, children: ReactNode, key?: string) {
  const safe = safeHref(href);
  if (!safe) return <span key={key}>{children}</span>;
  if (safe.startsWith("/tutorial/")) return <Link href={safe} key={key}>{children}</Link>;
  return <a href={safe} key={key} rel={isExternalUrl(safe) ? "noopener noreferrer" : undefined} target={isExternalUrl(safe) ? "_blank" : undefined}>{children}</a>;
}

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text))) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    if (match[1] && match[2]) nodes.push(renderSafeLink(match[2].trim(), match[1], `link-${match.index}`));
    else if (match[3]) nodes.push(<code key={`code-${match.index}`}>{match[3]}</code>);
    else if (match[4]) nodes.push(<strong key={`strong-${match.index}`}>{match[4]}</strong>);
    lastIndex = pattern.lastIndex;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

function copyHeadingLink(id: string) {
  const url = `${window.location.origin}${window.location.pathname}#${id}`;
  try {
    return Promise.resolve(navigator.clipboard?.writeText(url)).catch(() => undefined);
  } catch {
    return Promise.resolve(undefined);
  }
}

export function TutorialBrand({ space }: Readonly<{ space: TutorialPagePayload["space"] }>) {
  const logo = publicAssetPath(space.logo, "/assets/tutorial/frappe-hr-logo.png");
  return (
    <Link className={styles.brand} href="/tutorial" aria-label={`${space.title} home`}>
      <img src={logo} width={24} height={24} alt="" />
      <span>{space.title}</span>
      <FiChevronDown className={styles.brandChevron} aria-hidden />
    </Link>
  );
}

function TopLink({ href, children }: Readonly<{ href?: string; children: ReactNode }>) {
  const safe = safeHref(href);
  if (!safe) return null;
  return <a href={safe} rel={isExternalUrl(safe) ? "noopener noreferrer" : undefined} target={isExternalUrl(safe) ? "_blank" : undefined}>{children}</a>;
}

export function TutorialThemeToggle({ theme, onToggle }: Readonly<{ theme: ThemeName; onToggle: () => void }>) {
  return <button className={styles.iconButton} type="button" aria-label="Toggle theme" aria-pressed={theme === "dark"} onClick={onToggle}>{theme === "dark" ? <FiSun /> : <FiMoon />}</button>;
}

export function TutorialHeader({ payload, theme, onToggleTheme, onOpenSearch, onOpenMenu }: Readonly<{ payload: TutorialPagePayload; theme: ThemeName; onToggleTheme: () => void; onOpenSearch: () => void; onOpenMenu: () => void }>) {
  const { space } = payload;
  return (
    <header className={styles.topbar} role="banner">
      <TutorialBrand space={space} />
      <button type="button" className={styles.desktopSearch} aria-label="Open search" onClick={onOpenSearch}>
        <FiSearch aria-hidden /><span>Search documentation</span><kbd>Ctrl K</kbd>
      </button>
      <nav className={styles.topLinks} aria-label="Community links">
        <TopLink href={space.learn_url}>Learn</TopLink>
        <TopLink href={space.discuss_url}>Discuss</TopLink>
        <TopLink href={space.website_url}>Website</TopLink>
        {isSafeHttpUrl(space.github_url) ? <a className={styles.iconLink} href={space.github_url} aria-label="Github" rel="noopener noreferrer" target="_blank"><FiGithub /></a> : null}
        <TutorialThemeToggle theme={theme} onToggle={onToggleTheme} />
        <button className={styles.mobileSearch} type="button" aria-label="Open mobile search" onClick={onOpenSearch}><FiSearch /></button>
        <button className={styles.mobileMenuButton} type="button" aria-label="Open menu" onClick={onOpenMenu}><FiMenu /></button>
      </nav>
    </header>
  );
}

export function TutorialCategory({ group, activeSlug, defaultOpen, onNavigate }: Readonly<{ group: TutorialNavigationCategory; activeSlug: string; defaultOpen: boolean; onNavigate?: () => void }>) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className={styles.navGroup}>
      <button type="button" className={styles.navGroupButton} aria-expanded={isOpen} onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? <FiChevronDown aria-hidden /> : <FiChevronRight aria-hidden />}<span>{group.title}</span>
      </button>
      {isOpen ? (
        <div className={styles.navLinks}>
          {group.articles.map((article) => {
            const isActive = article.slug === activeSlug;
            return <Link className={isActive ? styles.activeNavLink : styles.navLink} href={hrefForSlug(article.slug)} key={article.slug} onClick={onNavigate} aria-current={isActive ? "page" : undefined}>{article.title}</Link>;
          })}
        </div>
      ) : null}
    </div>
  );
}

export function TutorialSidebar({ navigation, activeSlug, onNavigate }: Readonly<{ navigation: readonly TutorialNavigationCategory[]; activeSlug: string; onNavigate?: () => void }>) {
  return (
    <nav className={styles.navigation} aria-label="Documentation navigation">
      {navigation.map((group) => <TutorialCategory key={group.slug} group={group} activeSlug={activeSlug} defaultOpen={group.articles.some((article) => article.slug === activeSlug)} onNavigate={onNavigate} />)}
    </nav>
  );
}

function MarkdownArticle({ markdown }: Readonly<{ markdown: string }>) {
  const blocks = useMemo(() => {
    const lines = markdown.split(/\r?\n/);
    const result: ReactNode[] = [];
    let listItems: string[] = [];
    let orderedItems: string[] = [];
    let codeLines: string[] = [];
    let inCode = false;

    function flushList() {
      if (listItems.length) result.push(<ul key={`ul-${result.length}`}>{listItems.map((item, index) => <li key={`${item}-${index}`}>{renderInline(item)}</li>)}</ul>);
      if (orderedItems.length) result.push(<ol key={`ol-${result.length}`}>{orderedItems.map((item, index) => <li key={`${item}-${index}`}>{renderInline(item)}</li>)}</ol>);
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
      result.push(<div className={styles.tableScroller} key={`table-${result.length}`}><table><thead><tr>{headers.map((cell) => <th key={cell}>{renderInline(cell)}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={`row-${rowIndex}`}>{row.map((cell, cellIndex) => <td key={`${cell}-${cellIndex}`}>{renderInline(cell)}</td>)}</tr>)}</tbody></table></div>);
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
        const level = Math.min(4, Math.max(2, heading[1].length));
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
      if (line.startsWith(">")) result.push(<blockquote key={`quote-${result.length}`}>{renderInline(line.replace(/^>\s?/, ""))}</blockquote>);
      else result.push(<p key={`p-${result.length}`}>{renderInline(line)}</p>);
    }
    flushList();
    flushCode();
    return result;
  }, [markdown]);

  return <>{blocks}</>;
}

export function TutorialPager({ previous, next }: Readonly<{ previous: TutorialAdjacentArticle | null; next: TutorialAdjacentArticle | null }>) {
  return (
    <nav className={styles.pager} aria-label="Article pagination">
      {previous ? <Link className={styles.nextPage} href={hrefForSlug(previous.slug)}><span>Previous</span><strong>{previous.title}</strong><FiChevronRight aria-hidden /></Link> : <span />}
      {next ? <Link className={styles.nextPage} href={hrefForSlug(next.slug)}><span>Next</span><strong>{next.title}</strong><FiChevronRight aria-hidden /></Link> : null}
    </nav>
  );
}

export function TutorialFeedback() {
  const [value, setValue] = useState<string | null>(null);
  return <div className={styles.feedback}><span>{value ? "Thanks for the feedback." : "Was this helpful?"}</span><div><button type="button" aria-label="Helpful" onClick={() => setValue("yes")}>Yes</button><button type="button" aria-label="Not helpful" onClick={() => setValue("no")}>No</button></div></div>;
}

export function TutorialArticle({ payload }: Readonly<{ payload: TutorialPagePayload }>) {
  const { article } = payload;
  const coverImage = publicAssetPath(article.cover_image, "");
  return (
    <article className={styles.article} aria-labelledby="page-title">
      <div className={styles.articleToolbar}><h1 id="page-title">{article.title}</h1></div>
      <div className={styles.rule} />
      {article.summary ? <p>{article.summary}</p> : null}
      {coverImage ? <img className={styles.heroImage} src={coverImage} alt={article.title} /> : null}
      <MarkdownArticle markdown={article.body_markdown} />
      <TutorialPager previous={payload.previous_article} next={payload.next_article} />
      <p className={styles.updated}>Last updated {displayDate(article.source_updated_at || payload.last_modified)}</p>
      <TutorialFeedback />
    </article>
  );
}

export function TutorialTableOfContents({ toc, activeId }: Readonly<{ toc: readonly TutorialTocItem[]; activeId?: string }>) {
  return <aside className={styles.onThisPage} aria-label="On this page"><div className={styles.stickyContents}><strong>On this page</strong>{toc.map((section) => <a className={`${section.level > 2 ? styles.nestedContentLink : ""} ${activeId === section.id ? styles.activeTocLink : ""}`.trim()} href={`#${section.id}`} key={section.id}>{section.title}</a>)}</div></aside>;
}

export function TutorialSearchDialog({ rows, open, onClose }: Readonly<{ rows: readonly SearchRow[]; open: boolean; onClose: () => void }>) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const results = rows.filter((row) => `${row.title} ${row.summary || ""} ${row.category}`.toLowerCase().includes(query.toLowerCase())).slice(0, 20);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 0); }, [open]);
  if (!open) return null;
  return (
    <div className={styles.searchOverlay} role="dialog" aria-modal="true" aria-label="Search documentation" onKeyDown={(event) => { if (event.key === "Escape") onClose(); }}>
      <button className={styles.searchBackdrop} type="button" aria-label="Close search" onClick={onClose} />
      <div className={styles.searchPanel}>
        <label className={styles.searchBox}><FiSearch aria-hidden /><input ref={inputRef} role="searchbox" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search documentation" /></label>
        <div className={styles.searchResults}>{results.map((row) => <Link key={row.slug} href={hrefForSlug(row.slug)} onClick={onClose}><strong>{row.title}</strong><span>{row.category}</span>{row.summary ? <p>{row.summary}</p> : null}</Link>)}</div>
      </div>
    </div>
  );
}

export function TutorialMobileDrawer({ open, navigation, activeSlug, onClose }: Readonly<{ open: boolean; navigation: readonly TutorialNavigationCategory[]; activeSlug: string; onClose: () => void }>) {
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  if (!open) return null;
  return <div className={styles.mobileDrawer} role="dialog" aria-modal="true" aria-label="Documentation menu" onKeyDown={(event) => { if (event.key === "Escape") onClose(); }}><button className={styles.drawerBackdrop} type="button" aria-label="Close menu" onClick={onClose} /><aside className={styles.drawerPanel}><div className={styles.drawerHeader}><strong>Menu</strong><button type="button" aria-label="Close menu" onClick={onClose}><FiX /></button></div><TutorialSidebar navigation={navigation} activeSlug={activeSlug} onNavigate={onClose} /></aside></div>;
}

export function TutorialErrorState({ title = "Tutorial unavailable", message = "Please try again later." }: Readonly<{ title?: string; message?: string }>) {
  return <main className={styles.errorState} lang="en"><h1>{title}</h1><p>{message}</p><Link href="/tutorial">Back to tutorial home</Link></main>;
}

export function TutorialShell({ payload }: TutorialPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeId, setActiveId] = useState(payload.table_of_contents[0]?.id);
  const [theme, setTheme] = useState<ThemeName>("light");
  const searchRows = useMemo(() => allSearchRows(payload.navigation), [payload.navigation]);

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "dark" || stored === "light") window.setTimeout(() => setTheme(stored), 0);
  }, []);

  useEffect(() => {
    const handler = (event: globalThis.KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setSearchOpen(true); }
      if (event.key === "Escape") { setSearchOpen(false); setMobileMenuOpen(false); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.find((entry) => entry.isIntersecting);
      if (visible?.target.id) setActiveId(visible.target.id);
    }, { rootMargin: "-96px 0px -60% 0px" });
    payload.table_of_contents.forEach((item) => { const el = document.getElementById(item.id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [payload.table_of_contents]);

  function toggleTheme() {
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark";
      localStorage.setItem(THEME_STORAGE_KEY, next);
      return next;
    });
  }

  return (
    <div className={`tutorial-page ${styles.page}`} data-theme={theme} lang="en">
      <TutorialHeader payload={payload} theme={theme} onToggleTheme={toggleTheme} onOpenSearch={() => setSearchOpen(true)} onOpenMenu={() => setMobileMenuOpen(true)} />
      <div className={styles.shell}>
        <aside className={styles.sidebar}><TutorialSidebar navigation={payload.navigation} activeSlug={payload.article.slug} /></aside>
        <div className={styles.main}><TutorialArticle payload={payload} /></div>
        <TutorialTableOfContents toc={payload.table_of_contents} activeId={activeId} />
      </div>
      <TutorialSearchDialog rows={searchRows} open={searchOpen} onClose={() => setSearchOpen(false)} />
      <TutorialMobileDrawer open={mobileMenuOpen} navigation={payload.navigation} activeSlug={payload.article.slug} onClose={() => setMobileMenuOpen(false)} />
      <button className={styles.floatingMenu} type="button" onClick={() => setMobileMenuOpen(true)}><FiMenu aria-hidden /> Menu</button>
    </div>
  );
}

export default function TutorialPage({ payload }: TutorialPageProps) {
  return <TutorialShell payload={payload} />;
}
