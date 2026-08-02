"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  FiChevronDown,
  FiChevronRight,
  FiEdit2,
  FiGithub,
  FiMenu,
  FiMoon,
  FiMoreHorizontal,
  FiSearch,
  FiX,
} from "react-icons/fi";
import styles from "./tutorial.module.css";
import type { TutorialNavigationCategory, TutorialPagePayload, TutorialTocItem } from "@/types/tutorial";

type TutorialPageProps = Readonly<{ payload: TutorialPagePayload }>;

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

function publicAssetPath(value: string | undefined, fallback: string): string {
  if (!value) return fallback;
  if (value.startsWith("/")) return value;
  try {
    const url = new URL(value);
    if (url.protocol === "https:" || url.protocol === "http:") return value;
  } catch {
    return fallback;
  }
  return fallback;
}

function DocumentationNavigation({
  navigation,
  activeSlug,
  onNavigate,
}: Readonly<{ navigation: readonly TutorialNavigationCategory[]; activeSlug: string; onNavigate?: () => void }>) {
  const activeGroup = navigation.find((group) => group.articles.some((article) => article.slug === activeSlug));
  const [openGroup, setOpenGroup] = useState(activeGroup?.title ?? navigation[0]?.title ?? "");

  return (
    <nav className={styles.navigation} aria-label="Documentation navigation">
      {navigation.map((group) => {
        const isOpen = openGroup === group.title;
        return (
          <div key={group.slug} className={styles.navGroup}>
            <button
              type="button"
              className={styles.navGroupButton}
              aria-expanded={isOpen}
              onClick={() => setOpenGroup(isOpen ? "" : group.title)}
            >
              {isOpen ? <FiChevronDown aria-hidden /> : <FiChevronRight aria-hidden />}
              <span>{group.title}</span>
            </button>
            {isOpen ? (
              <div className={styles.navLinks}>
                {group.articles.map((article) => {
                  const isActive = article.slug === activeSlug;
                  return (
                    <Link
                      className={isActive ? styles.activeNavLink : styles.navLink}
                      href={hrefForSlug(article.slug)}
                      key={article.slug}
                      onClick={onNavigate}
                      aria-current={isActive ? "page" : undefined}
                      data-tutorial-link={article.slug}
                    >
                      {article.title}
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}

function slugifyHeading(text: string): string {
  return text.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "section";
}

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text))) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    if (match[1] && match[2]) {
      const href = match[2];
      nodes.push(isSafeHttpUrl(href) ? <a href={href} key={`${href}-${match.index}`}>{match[1]}</a> : match[1]);
    } else if (match[3]) {
      nodes.push(<code key={`code-${match.index}`}>{match[3]}</code>);
    } else if (match[4]) {
      nodes.push(<strong key={`strong-${match.index}`}>{match[4]}</strong>);
    }
    lastIndex = pattern.lastIndex;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

function MarkdownArticle({ markdown }: Readonly<{ markdown: string }>) {
  const blocks = useMemo(() => {
    const lines = markdown.split(/\r?\n/);
    const result: ReactNode[] = [];
    let listItems: string[] = [];

    function flushList() {
      if (!listItems.length) return;
      result.push(<ul key={`ul-${result.length}`}>{listItems.map((item, index) => <li key={`${item}-${index}`}>{renderInline(item)}</li>)}</ul>);
      listItems = [];
    }

    lines.forEach((rawLine) => {
      const line = rawLine.trim();
      if (!line) {
        flushList();
        return;
      }
      const heading = /^(#{1,3})\s+(.+)$/.exec(line);
      if (heading) {
        flushList();
        const level = heading[1].length;
        const title = heading[2].replace(/#+$/, "").trim();
        const id = slugifyHeading(title);
        if (level === 1) result.push(<h1 id={id} key={id}>{title}</h1>);
        else if (level === 2) result.push(<h2 id={id} key={id}><a href={`#${id}`} aria-label={`Link to ${title}`}>#</a>{title}</h2>);
        else result.push(<h3 id={id} key={id}><a href={`#${id}`} aria-label={`Link to ${title}`}>#</a>{title}</h3>);
        return;
      }
      const list = /^[-*]\s+(.+)$/.exec(line);
      if (list) {
        listItems.push(list[1]);
        return;
      }
      flushList();
      result.push(<p key={`p-${result.length}`}>{renderInline(line)}</p>);
    });
    flushList();
    return result;
  }, [markdown]);

  return <>{blocks}</>;
}

function TopLink({ href, children }: Readonly<{ href?: string; children: ReactNode }>) {
  if (!isSafeHttpUrl(href)) return null;
  return <a href={href}>{children}</a>;
}

function OnThisPage({ toc }: Readonly<{ toc: readonly TutorialTocItem[] }>) {
  return (
    <aside className={styles.onThisPage}>
      <div className={styles.stickyContents}>
        <strong>On this page</strong>
        {toc.map((section) => (
          <a className={section.level > 2 ? styles.nestedContentLink : undefined} href={`#${section.id}`} key={section.id}>{section.title}</a>
        ))}
      </div>
    </aside>
  );
}

export default function TutorialPage({ payload }: TutorialPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { space, article, navigation } = payload;
  const logo = publicAssetPath(space.logo, "/assets/tutorial/frappe-hr-logo.png");
  const coverImage = publicAssetPath(article.cover_image, "");

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <div className={`tutorial-page ${styles.page}`} lang="en">
      <header className={styles.topbar}>
        <Link className={styles.brand} href="/tutorial" aria-label={`${space.title} home`}>
          <img src={logo} width={24} height={24} alt="" />
          <span>{space.title}</span>
          <FiChevronDown className={styles.brandChevron} aria-hidden />
        </Link>

        <button type="button" className={styles.desktopSearch} aria-label="Open search">
          <FiSearch aria-hidden />
          <span>Search documentation</span>
          <kbd>Ctrl K</kbd>
        </button>

        <nav className={styles.topLinks} aria-label="Community links">
          <TopLink href={space.learn_url}>Learn</TopLink>
          <TopLink href={space.discuss_url}>Discuss</TopLink>
          <TopLink href={space.website_url}>Website</TopLink>
          {isSafeHttpUrl(space.github_url) ? <a className={styles.iconLink} href={space.github_url} aria-label="Github"><FiGithub /></a> : null}
          <button className={styles.iconButton} type="button" aria-label="Toggle theme"><FiMoon /></button>
          <button className={styles.mobileSearch} type="button" aria-label="Open search"><FiSearch /></button>
          <button className={styles.mobileMenuButton} type="button" aria-label="Open menu" onClick={() => setMobileMenuOpen(true)}><FiMenu /></button>
        </nav>
      </header>

      <div className={styles.shell}>
        <aside className={styles.sidebar}>
          <DocumentationNavigation key={article.slug} navigation={navigation} activeSlug={article.slug} />
        </aside>

        <main className={styles.main}>
          <article className={styles.article}>
            <div className={styles.articleToolbar}>
              <h1 id="page-title">{article.title}</h1>
              <div className={styles.pageActions}>
                {isSafeHttpUrl(article.source_url) ? <a href={article.source_url}><FiEdit2 aria-hidden /><span>Source</span></a> : <button type="button"><FiEdit2 aria-hidden /><span>Read</span></button>}
                <button type="button" aria-label="More page actions"><FiChevronDown aria-hidden /></button>
              </div>
            </div>
            <div className={styles.rule} />

            {article.summary ? <p>{article.summary}</p> : null}
            {coverImage ? <img className={styles.heroImage} src={coverImage} alt="" /> : null}
            <MarkdownArticle markdown={article.body_markdown} />

            {payload.next_article ? (
              <Link className={styles.nextPage} href={hrefForSlug(payload.next_article.slug)}>
                <span>Next</span>
                <strong>{payload.next_article.title}</strong>
                <FiChevronRight aria-hidden />
              </Link>
            ) : payload.previous_article ? (
              <Link className={styles.nextPage} href={hrefForSlug(payload.previous_article.slug)}>
                <span>Previous</span>
                <strong>{payload.previous_article.title}</strong>
                <FiChevronRight aria-hidden />
              </Link>
            ) : null}
            <p className={styles.updated}>Last updated {payload.last_modified}</p>
            <div className={styles.feedback}>
              <span>Was this helpful?</span>
              <div><button type="button" aria-label="Bad">☹</button><button type="button" aria-label="Ok">●</button><button type="button" aria-label="Good">☺</button></div>
            </div>
          </article>
        </main>

        <OnThisPage toc={payload.table_of_contents} />
      </div>

      {mobileMenuOpen ? (
        <div className={styles.mobileDrawer} role="dialog" aria-modal="true" aria-label="Documentation menu">
          <button className={styles.drawerBackdrop} type="button" aria-label="Close menu" onClick={() => setMobileMenuOpen(false)} />
          <aside className={styles.drawerPanel}>
            <div className={styles.drawerHeader}><strong>Menu</strong><button type="button" aria-label="Close menu" onClick={() => setMobileMenuOpen(false)}><FiX /></button></div>
            <DocumentationNavigation key={`drawer-${article.slug}`} navigation={navigation} activeSlug={article.slug} onNavigate={() => setMobileMenuOpen(false)} />
          </aside>
        </div>
      ) : null}

      <button className={styles.floatingMenu} type="button" onClick={() => setMobileMenuOpen(true)}><FiMenu aria-hidden /> Menu</button>
      <button className={styles.floatingMore} type="button" aria-label="More page actions"><FiMoreHorizontal /></button>
    </div>
  );
}
