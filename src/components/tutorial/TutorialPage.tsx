"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiCheck, FiChevronDown, FiChevronRight, FiEdit3, FiMenu, FiSearch, FiX } from "react-icons/fi";
import { DocTypeFields } from "./DocTypeFields";
import { TutorialBlockRenderer, hideOnError, safeHref, slugifyHeading } from "./tutorial-blocks";
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

function publicAssetPath(value: string | undefined, fallback: string): string {
  return safeHref(value) ?? fallback;
}

function allSearchRows(navigation: readonly TutorialNavigationCategory[]): SearchRow[] {
  return navigation.flatMap((category) =>
    (category.subcategories ?? []).flatMap((sub) =>
      sub.articles.map((article) => ({ ...article, category: `${category.title} › ${sub.title}` })),
    ),
  );
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
  const hasActive = (group.subcategories ?? []).some((sub) => sub.articles.some((a) => a.slug === activeSlug));
  const [isOpen, setIsOpen] = useState(defaultOpen || hasActive);
  return (
    <div className={styles.navGroup}>
      <button type="button" className={styles.navGroupButton} aria-expanded={isOpen} onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? <FiChevronDown aria-hidden /> : <FiChevronRight aria-hidden />}<span>{group.title}</span>
      </button>
      {isOpen ? (
        <div className={styles.navLinks}>
          {(group.subcategories ?? []).map((sub) =>
            sub.articles.map((article) => {
              const isActive = article.slug === activeSlug;
              return <Link className={isActive ? styles.activeNavLink : styles.navLink} href={hrefForSlug(article.slug, space, defaultSpace)} key={article.slug} onClick={onNavigate} aria-current={isActive ? "page" : undefined} prefetch={TUTORIAL_LINK_PREFETCH}>{article.title}</Link>;
            }),
          )}
        </div>
      ) : null}
    </div>
  );
}

export function TutorialSidebar({ navigation, activeSlug, space, defaultSpace, onNavigate }: Readonly<{ navigation: readonly TutorialNavigationCategory[]; activeSlug: string; space: string; defaultSpace: string; onNavigate?: () => void }>) {
  const visibleGroups = navigation.filter((group) => (group.subcategories ?? []).some((sub) => sub.articles.length > 0));
  return (
    <nav className={styles.navigation} aria-label="Documentation navigation">
      {visibleGroups.map((group) => <TutorialCategory key={group.slug} group={group} activeSlug={activeSlug} defaultOpen={(group.subcategories ?? []).some((sub) => sub.articles.some((a) => a.slug === activeSlug))} space={space} defaultSpace={defaultSpace} onNavigate={onNavigate} />)}
    </nav>
  );
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
  const editUrl = editHref(article, payload.space);
  const blocks = article.content_blocks;
  const hasBlocks = Array.isArray(blocks) && blocks.length > 0;
  return (
    <article className={styles.article}>
      {editUrl ? <div className={styles.articleToolbar}><a className={styles.editLink} href={editUrl} target="_blank" rel="noopener noreferrer"><FiEdit3 aria-hidden />Edit</a></div> : null}
      <div className={styles.rule} />
      <h1 id={slugifyHeading(article.title)}>{article.title}</h1>
      {hasBlocks ? <TutorialBlockRenderer blocks={blocks} space={space} defaultSpace={defaultSpace} /> : null}
      <TutorialPager previous={payload.previous_article} next={payload.next_article} space={space} defaultSpace={defaultSpace} />
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
  const article = payload.article;

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
        {article.show_sidebar === 0 || article.show_sidebar === false ? null : <aside className={styles.sidebar}><TutorialSidebar navigation={payload.navigation} activeSlug={payload.article.slug} space={space} defaultSpace={defaultSpace} /></aside>}
        <div className={styles.main}><TutorialArticle payload={payload} space={space} defaultSpace={defaultSpace} /><DocTypeFields payload={payload} /></div>
        {article.show_toc === 0 || article.show_toc === false ? null : <TutorialTableOfContents toc={payload.table_of_contents} activeId={activeId} />}
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
