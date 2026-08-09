"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { FiCheck, FiChevronDown, FiChevronRight, FiEdit3, FiMenu, FiSearch, FiX } from "react-icons/fi";
import styles from "./tutorial.module.css";
import type { TutorialAdjacentArticle, TutorialArticle, TutorialNavigationArticle, TutorialNavigationCategory, TutorialPagePayload, TutorialSpaceSettings, TutorialTocItem } from "@/types/tutorial";

type TutorialPageProps = Readonly<{
  payload: TutorialPagePayload;
  spaces?: TutorialSpaceSettings[] | null;
  defaultSpace?: string;
}>;
type SearchRow = TutorialNavigationArticle & Readonly<{ category: string }>;

const TUTORIAL_LINK_PREFETCH = false;
const DEFAULT_SPACE_SLUG = "ionic-tutorial";
const SEARCH_PAGE_SIZE = 8;

function hrefForSlug(slug: string, space?: string | null, defaultSpace?: string | null): string {
  const base = `/tutorial/${encodeURIComponent(slug)}`;
  if (space && space !== defaultSpace) return `${base}?space=${encodeURIComponent(space)}`;
  return base;
}

function hrefForHome(space?: string | null, defaultSpace?: string | null): string {
  if (space && space !== defaultSpace) return `/tutorial?space=${encodeURIComponent(space)}`;
  return "/tutorial";
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

/** Hide a broken space logo instead of showing the browser's broken-image icon. */
function hideOnError(event: { currentTarget: HTMLImageElement }): void {
  event.currentTarget.style.display = "none";
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

function renderSafeLink(href: string, children: ReactNode, key: string | undefined, space?: string | null, defaultSpace?: string | null) {
  const safe = safeHref(href);
  if (!safe) return <span key={key}>{children}</span>;
  if (safe.startsWith("/tutorial/")) return <Link href={hrefForSlug(safe.replace(/^\/tutorial\//, "").split("?")[0], space, defaultSpace)} key={key} prefetch={TUTORIAL_LINK_PREFETCH}>{children}</Link>;
  return <a href={safe} key={key} rel={isExternalUrl(safe) ? "noopener noreferrer" : undefined} target={isExternalUrl(safe) ? "_blank" : undefined}>{children}</a>;
}

function renderInline(text: string, space?: string | null, defaultSpace?: string | null): ReactNode[] {
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

function copyHeadingLink(id: string) {
  const url = `${window.location.origin}${window.location.pathname}#${id}`;
  try {
    return Promise.resolve(navigator.clipboard?.writeText(url)).catch(() => undefined);
  } catch {
    return Promise.resolve(undefined);
  }
}

export function TutorialSpaceDropdown({ current, spaces, defaultSpace }: Readonly<{ current: TutorialSpaceSettings; spaces: TutorialSpaceSettings[] | null; defaultSpace: string }>) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const items = useMemo(() => (spaces && spaces.length > 0 ? spaces : [current]), [spaces, current]);

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const logo = publicAssetPath(current.logo, "/assets/tutorial/frappe-hr-logo.png");

  return (
    <div className={styles.spaceDropdown} ref={rootRef}>
      <button type="button" className={styles.brand} aria-haspopup="listbox" aria-expanded={open} aria-label={`${current.title} — choose tutorial space`} onClick={() => setOpen((isOpen) => !isOpen)}>
        <img src={logo} width={24} height={24} alt="" onError={hideOnError} />
        <span>{current.title}</span>
        <FiChevronDown className={open ? `${styles.brandChevron} ${styles.brandChevronOpen}` : styles.brandChevron} aria-hidden />
      </button>
      {open ? (
        <ul className={styles.spaceMenu} role="listbox" aria-label="Tutorial spaces">
          {items.map((item) => {
            const isCurrent = item.slug === current.slug;
            return (
              <li key={item.slug} role="option" aria-selected={isCurrent} aria-current={isCurrent ? "true" : undefined}>
                <Link className={isCurrent ? styles.spaceMenuItemCurrent : styles.spaceMenuItem} href={hrefForHome(item.slug, defaultSpace)} onClick={() => setOpen(false)} prefetch={TUTORIAL_LINK_PREFETCH}>
                  {item.logo ? <img className={styles.spaceMenuLogo} src={publicAssetPath(item.logo, "")} width={20} height={20} alt="" onError={hideOnError} /> : null}
                  <span className={styles.spaceMenuText}>
                    <strong>{item.title}</strong>
                    {item.short_description ? <small>{item.short_description}</small> : null}
                  </span>
                  {isCurrent ? <FiCheck className={styles.spaceMenuCheck} aria-hidden /> : null}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

export function TutorialHeader({ payload, spaces, defaultSpace, onOpenSearch }: Readonly<{ payload: TutorialPagePayload; spaces: TutorialSpaceSettings[] | null; defaultSpace: string; onOpenSearch: () => void }>) {
  const { space } = payload;
  return (
    <header className={styles.topbar} role="banner">
      <TutorialSpaceDropdown current={space} spaces={spaces} defaultSpace={defaultSpace} />
      <button type="button" className={styles.desktopSearch} aria-label="Open search" onClick={onOpenSearch}>
        <FiSearch aria-hidden /><span>Search documentation</span><kbd>Ctrl K</kbd>
      </button>
      <Link className={styles.backHome} href="/" prefetch={TUTORIAL_LINK_PREFETCH}>Back to Home</Link>
    </header>
  );
}

export function TutorialCategory({ group, activeSlug, defaultOpen, space, defaultSpace, onNavigate }: Readonly<{ group: TutorialNavigationCategory; activeSlug: string; defaultOpen: boolean; space: string; defaultSpace: string; onNavigate?: () => void }>) {
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
            return <Link className={isActive ? styles.activeNavLink : styles.navLink} href={hrefForSlug(article.slug, space, defaultSpace)} key={article.slug} onClick={onNavigate} aria-current={isActive ? "page" : undefined} prefetch={TUTORIAL_LINK_PREFETCH}>{article.title}</Link>;
          })}
        </div>
      ) : null}
    </div>
  );
}

export function TutorialSidebar({ navigation, activeSlug, space, defaultSpace, onNavigate }: Readonly<{ navigation: readonly TutorialNavigationCategory[]; activeSlug: string; space: string; defaultSpace: string; onNavigate?: () => void }>) {
  const visibleGroups = navigation.filter((group) => group.articles.length > 0);
  return (
    <nav className={styles.navigation} aria-label="Documentation navigation">
      {visibleGroups.map((group) => <TutorialCategory key={group.slug} group={group} activeSlug={activeSlug} defaultOpen={group.articles.some((article) => article.slug === activeSlug)} space={space} defaultSpace={defaultSpace} onNavigate={onNavigate} />)}
    </nav>
  );
}

function MarkdownArticle({ markdown, space, defaultSpace }: Readonly<{ markdown: string; space: string; defaultSpace: string }>) {
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
      if (line.startsWith(">")) result.push(<blockquote key={`quote-${result.length}`}>{renderInline(line.replace(/^>\s?/, ""), space, defaultSpace)}</blockquote>);
      else result.push(<p key={`p-${result.length}`}>{renderInline(line, space, defaultSpace)}</p>);
    }
    flushList();
    flushCode();
    return result;
  }, [markdown, space, defaultSpace]);

  return <>{blocks}</>;
}

export function TutorialPager({ previous, next, space, defaultSpace }: Readonly<{ previous: TutorialAdjacentArticle | null; next: TutorialAdjacentArticle | null; space: string; defaultSpace: string }>) {
  return (
    <nav className={styles.pager} aria-label="Article pagination">
      {previous ? <Link className={styles.nextPage} href={hrefForSlug(previous.slug, space, defaultSpace)} prefetch={TUTORIAL_LINK_PREFETCH}><span>Previous</span><strong>{previous.title}</strong><FiChevronRight aria-hidden /></Link> : <span />}
      {next ? <Link className={styles.nextPage} href={hrefForSlug(next.slug, space, defaultSpace)} prefetch={TUTORIAL_LINK_PREFETCH}><span>Next</span><strong>{next.title}</strong><FiChevronRight aria-hidden /></Link> : null}
    </nav>
  );
}

export function TutorialFeedback() {
  const [value, setValue] = useState<string | null>(null);
  return <div className={styles.feedback}><span>{value ? "Thanks for the feedback." : "Was this helpful?"}</span><div><button type="button" aria-label="Helpful" onClick={() => setValue("yes")}>Yes</button><button type="button" aria-label="Not helpful" onClick={() => setValue("no")}>No</button></div></div>;
}

function editHref(article: TutorialArticle, space: TutorialSpaceSettings): string | null {
  const source = article.source_url;
  if (source && /^https?:\/\//i.test(source)) return source;
  const base = space.source_base_url;
  if (base && source?.startsWith("content://")) {
    const path = source.replace(/^content:\/\/[^/]+\//, "");
    return `${base.replace(/\/+$/, "")}/${path}`;
  }
  return space.github_url ?? null;
}

export function TutorialArticle({ payload, space, defaultSpace }: Readonly<{ payload: TutorialPagePayload; space: string; defaultSpace: string }>) {
  const { article } = payload;
  const coverImage = publicAssetPath(article.cover_image, "");
  const editUrl = editHref(article, payload.space);
  return (
    <article className={styles.article} aria-labelledby="page-title">
      <div className={styles.articleToolbar}><h1 id="page-title">{article.title}</h1>{editUrl ? <a className={styles.editLink} href={editUrl} target="_blank" rel="noopener noreferrer"><FiEdit3 aria-hidden />Edit</a> : null}</div>
      <div className={styles.rule} />
      {article.summary ? <p>{article.summary}</p> : null}
      {coverImage ? <img className={styles.heroImage} src={coverImage} alt={article.title} /> : null}
      <MarkdownArticle markdown={article.body_markdown} space={space} defaultSpace={defaultSpace} />
      <TutorialPager previous={payload.previous_article} next={payload.next_article} space={space} defaultSpace={defaultSpace} />
      <p className={styles.updated}>Last updated {displayDate(article.source_updated_at || payload.last_modified)}</p>
      <TutorialFeedback />
    </article>
  );
}

export function TutorialTableOfContents({ toc, activeId }: Readonly<{ toc: readonly TutorialTocItem[]; activeId?: string }>) {
  return <aside className={styles.onThisPage} aria-label="On this page"><div className={styles.stickyContents}><strong>On this page</strong>{toc.map((section) => <a className={`${section.level > 2 ? styles.nestedContentLink : ""} ${activeId === section.id ? styles.activeTocLink : ""}`.trim()} href={`#${section.id}`} key={section.id}>{section.title}</a>)}</div></aside>;
}

export function TutorialSearchDialog({ rows, open, onClose, space, defaultSpace }: Readonly<{ rows: readonly SearchRow[]; open: boolean; onClose: () => void; space: string; defaultSpace: string }>) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const matches = useMemo(() => rows.filter((row) => `${row.title} ${row.summary || ""} ${row.category}`.toLowerCase().includes(query.trim().toLowerCase())), [rows, query]);
  const pageCount = Math.max(1, Math.ceil(matches.length / SEARCH_PAGE_SIZE));
  const pageRows = matches.slice(page * SEARCH_PAGE_SIZE, (page + 1) * SEARCH_PAGE_SIZE);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 0); }, [open]);
  if (!open) return null;
  function handleClose() {
    setQuery("");
    setPage(0);
    onClose();
  }
  const hasQuery = query.trim().length > 0;
  const shownStart = matches.length === 0 ? 0 : page * SEARCH_PAGE_SIZE + 1;
  const shownEnd = Math.min(matches.length, (page + 1) * SEARCH_PAGE_SIZE);
  return (
    <div className={styles.searchOverlay} role="dialog" aria-modal="true" aria-label="Search documentation" onKeyDown={(event) => { if (event.key === "Escape") handleClose(); }}>
      <button className={styles.searchBackdrop} type="button" aria-label="Close search" onClick={handleClose} />
      <div className={styles.searchPanel}>
        <label className={styles.searchBox}><FiSearch aria-hidden /><input ref={inputRef} role="searchbox" value={query} onChange={(event) => { setQuery(event.target.value); setPage(0); }} placeholder="Search documentation" /></label>
        {hasQuery && matches.length === 0 ? <p className={styles.searchEmpty}>No results for “{query.trim()}”.</p> : (
          <>
            <div className={styles.searchResults}>{pageRows.map((row) => <Link key={row.slug} href={hrefForSlug(row.slug, space, defaultSpace)} onClick={handleClose} prefetch={TUTORIAL_LINK_PREFETCH}><strong>{row.title}</strong><span>{row.category}</span>{row.summary ? <p>{row.summary}</p> : null}</Link>)}</div>
            {matches.length > SEARCH_PAGE_SIZE ? (
              <div className={styles.searchPager}>
                <span>Showing {shownStart}–{shownEnd} of {matches.length}</span>
                <div>
                  <button type="button" disabled={page === 0} onClick={() => setPage((current) => Math.max(0, current - 1))}>Previous</button>
                  <button type="button" disabled={page >= pageCount - 1} onClick={() => setPage((current) => Math.min(pageCount - 1, current + 1))}>Next</button>
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}

export function TutorialMobileDrawer({ open, navigation, activeSlug, space, defaultSpace, onClose }: Readonly<{ open: boolean; navigation: readonly TutorialNavigationCategory[]; activeSlug: string; space: string; defaultSpace: string; onClose: () => void }>) {
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  if (!open) return null;
  return <div className={styles.mobileDrawer} role="dialog" aria-modal="true" aria-label="Documentation menu" onKeyDown={(event) => { if (event.key === "Escape") onClose(); }}><button className={styles.drawerBackdrop} type="button" aria-label="Close menu" onClick={onClose} /><aside className={styles.drawerPanel}><div className={styles.drawerHeader}><strong>Menu</strong><button type="button" aria-label="Close menu" onClick={onClose}><FiX /></button></div><TutorialSidebar navigation={navigation} activeSlug={activeSlug} space={space} defaultSpace={defaultSpace} onNavigate={onClose} /></aside></div>;
}

export function TutorialErrorState({ title = "Tutorial unavailable", message = "Please try again later." }: Readonly<{ title?: string; message?: string }>) {
  return <main className={styles.errorState}><h1>{title}</h1><p>{message}</p><Link href="/tutorial" prefetch={TUTORIAL_LINK_PREFETCH}>Back to tutorial home</Link></main>;
}

export function TutorialShell({ payload, spaces = null, defaultSpace = DEFAULT_SPACE_SLUG }: TutorialPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeId, setActiveId] = useState(payload.table_of_contents[0]?.id);
  const searchRows = useMemo(() => allSearchRows(payload.navigation), [payload.navigation]);
  const space = payload.space.slug;

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

  return (
    <div className={`tutorial-page ${styles.page}`} data-theme="light">
      <TutorialHeader payload={payload} spaces={spaces} defaultSpace={defaultSpace} onOpenSearch={() => setSearchOpen(true)} />
      <div className={styles.shell}>
        <aside className={styles.sidebar}><TutorialSidebar navigation={payload.navigation} activeSlug={payload.article.slug} space={space} defaultSpace={defaultSpace} /></aside>
        <div className={styles.main}><TutorialArticle payload={payload} space={space} defaultSpace={defaultSpace} /></div>
        <TutorialTableOfContents toc={payload.table_of_contents} activeId={activeId} />
      </div>
      <TutorialSearchDialog rows={searchRows} open={searchOpen} onClose={() => setSearchOpen(false)} space={space} defaultSpace={defaultSpace} />
      <TutorialMobileDrawer open={mobileMenuOpen} navigation={payload.navigation} activeSlug={payload.article.slug} space={space} defaultSpace={defaultSpace} onClose={() => setMobileMenuOpen(false)} />
      <button className={styles.floatingMenu} type="button" onClick={() => setMobileMenuOpen(true)}><FiMenu aria-hidden /> Menu</button>
    </div>
  );
}

export default function TutorialPage({ payload, spaces = null, defaultSpace = DEFAULT_SPACE_SLUG }: TutorialPageProps) {
  return <TutorialShell payload={payload} spaces={spaces} defaultSpace={defaultSpace} />;
}
