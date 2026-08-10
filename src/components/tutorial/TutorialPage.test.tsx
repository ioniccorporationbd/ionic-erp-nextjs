import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import TutorialPage from "./TutorialPage";
import type { TutorialPagePayload } from "@/types/tutorial";

vi.mock("next/link", () => ({
  default: ({ children, href, prefetch, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode; href: string; prefetch?: boolean }) => (
    <a href={href} data-prefetch={String(prefetch)} {...props}>{children}</a>
  ),
}));

const payload: TutorialPagePayload = {
  schema_version: "v1",
  space: {
    title: "Ionic Tutorial",
    slug: "ionic-tutorial",
    route_prefix: "/tutorial",
    short_description: "Real docs",
    website_url: "https://next.ionicerp.xyz",
    github_url: "https://github.com/ioniccorporationbd/ionic_tutorial",
  },
  navigation: [
    {
      title: "Getting Started With A Very Long Category Name That Must Wrap",
      slug: "getting-started",
      sort_order: 1,
      subcategories: [
        {
          title: "Basics",
          slug: "basics",
          sort_order: 1,
          articles: [
            { title: "Welcome", slug: "welcome", summary: "Start", sort_order: 1 },
            { title: "Runtime Article", slug: "runtime-article", summary: "New", sort_order: 2 },
          ],
        },
      ],
    },
  ],
  article: {
    title: "Welcome",
    slug: "welcome",
    summary: "Start here",
    content_blocks: [
      {
        block_type: "Heading",
        title: "Install",
      },
      {
        block_type: "Markdown",
        content: "LongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLong\n\n```bash\nbench --site next.ionicerp.xyz migrate\n```\n\n| Key | Value |\n| --- | --- |\n| Space | ionic-tutorial |\n\n> Note for admins\n\n[External](https://example.com) and [bad](javascript:alert(1)).",
      },
    ],
    source_updated_at: "2026-08-02 18:37:15.196692",
    sort_order: 1,
  },
  table_of_contents: [{ id: "install", title: "Install", level: 2 }],
  previous_article: null,
  next_article: { title: "Runtime Article", slug: "runtime-article" },
  breadcrumbs: [{ title: "Ionic Tutorial", slug: "ionic-tutorial" }, { title: "Welcome", slug: "welcome" }],
  last_modified: "2026-08-02 18:37:15.196692",
};

describe("TutorialPage Frappe-style shell", () => {
  it("renders API-driven navigation, safe markdown, search, pager, and back-to-home link", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn();
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });

    render(<TutorialPage payload={payload} />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Documentation navigation" })).toBeInTheDocument();
    const nav = screen.getByRole("navigation", { name: "Documentation navigation" });
    expect(screen.getByRole("complementary", { name: "On this page" })).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(within(nav).getByRole("link", { name: "Welcome" })).toHaveAttribute("aria-current", "page");
    expect(within(nav).getByRole("link", { name: "Welcome" })).toHaveAttribute("data-prefetch", "false");
    expect(screen.getByRole("link", { name: /Next Runtime Article/ })).toHaveAttribute("href", "/tutorial/runtime-article");
    expect(screen.getByRole("link", { name: /Next Runtime Article/ })).toHaveAttribute("data-prefetch", "false");

    expect(screen.getByText("bench --site next.ionicerp.xyz migrate")).toBeInTheDocument();
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("Note for admins")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "External" })).toHaveAttribute("rel", expect.stringContaining("noopener"));
    expect(screen.queryByRole("link", { name: "bad" })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Open search" }));
    const dialog = screen.getByRole("dialog", { name: "Search documentation" });
    await user.type(within(dialog).getByRole("searchbox"), "runtime");
    expect(within(dialog).getByRole("link", { name: /Runtime Article/ })).toHaveAttribute("href", "/tutorial/runtime-article");
    expect(within(dialog).getByRole("link", { name: /Runtime Article/ })).toHaveAttribute("data-prefetch", "false");
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog", { name: "Search documentation" })).not.toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Back to Home" })).toHaveAttribute("href", "/");
    expect(screen.queryByRole("button", { name: "Toggle theme" })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Copy link to Install" }));
    expect(writeText).toHaveBeenCalledWith(expect.stringContaining("#install"));
  });

  it("renders typed content blocks with safe media and drops unsafe URLs", () => {
    const blockPayload: TutorialPagePayload = {
      ...payload,
      article: {
        ...payload.article,
        content_blocks: [
          {
            block_type: "Heading",
            title: "Getting Started",
            subtitle: "Follow the guide",
            description: "Start here for a quick tour.",
          },
          {
            block_type: "Markdown",
            content: "Install the app and log in.",
          },
          {
            block_type: "Image",
            image: "https://example.com/a.png",
            image_alt: "Getting Started",
            caption: "Setup screen",
            attachment: "https://example.com/guide.pdf",
          },
          {
            block_type: "Video",
            title: "Setup video",
            video_url: "https://www.youtube.com/watch?v=abc123def45",
          },
          {
            block_type: "Image Text",
            image: "https://example.com/b.png",
            image_alt: "Side by side",
            title: "Side by side",
            content: "Prose beside media.",
            layout: "image-right",
          },
          {
            block_type: "Callout",
            title: "Heads up",
            description: "Callout extra note.",
            content: "Callout note.",
          },
          {
            block_type: "Divider",
          },
          {
            block_type: "Image",
            image: "javascript:alert(1)",
            image_alt: "Unsafe Section",
            attachment: "javascript:alert(2)",
          },
          {
            block_type: "Video",
            title: "Unsafe video",
            video_url: "chrome://settings",
          },
        ],
      },
    };
    render(<TutorialPage payload={blockPayload} />);

    // The article title becomes the page h1 when blocks are present
    expect(screen.getByRole("heading", { level: 1, name: "Welcome" })).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 2, name: /Getting Started/ })).toBeInTheDocument();
    expect(screen.getByText("Install the app and log in.")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Side by side" })).toBeInTheDocument();
    expect(screen.getByText("Callout note.")).toBeInTheDocument();
    expect(screen.getAllByRole("separator").length).toBeGreaterThan(0);

    // The markdown body of the base fixture is NOT rendered for block articles
    expect(screen.queryByText("bench --site next.ionicerp.xyz migrate")).not.toBeInTheDocument();

    // Safe image renders lazily with alt + caption
    const image = screen.getByAltText("Getting Started");
    expect(image).toHaveAttribute("src", "https://example.com/a.png");
    expect(image).toHaveAttribute("loading", "lazy");
    expect(screen.getByText("Setup screen")).toBeInTheDocument();

    // Video renders as a safe YouTube embed iframe
    const video = screen.getByTitle("Setup video");
    expect(video.tagName).toBe("IFRAME");
    expect(video).toHaveAttribute("src", "https://www.youtube.com/embed/abc123def45");
    expect(video).toHaveAttribute("allowFullScreen");

    // Unsafe block URLs are dropped entirely
    expect(screen.queryByAltText("Unsafe Section")).not.toBeInTheDocument();
    expect(screen.queryByTitle("Unsafe video")).not.toBeInTheDocument();

    // Subtitle and description render under the block title; attachment becomes a download link
    expect(screen.getByText("Follow the guide")).toBeInTheDocument();
    expect(screen.getByText("Start here for a quick tour.")).toBeInTheDocument();
    expect(screen.getByText("Callout extra note.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Download guide.pdf" })).toHaveAttribute("href", "https://example.com/guide.pdf");
    expect(screen.getAllByRole("link", { name: /Download/ })).toHaveLength(1);
  });

  it("renders an accessible space dropdown with the current space highlighted and ?space= links", async () => {
    const user = userEvent.setup();
    const spaces = [
      { title: "Ionic Tutorial", slug: "ionic-tutorial", route_prefix: "/tutorial", short_description: "Docs" },
      { title: "Ionic POS", slug: "ionic-pos", route_prefix: "/tutorial", short_description: "POS docs" },
    ];
    render(<TutorialPage payload={payload} spaces={spaces} defaultSpace="ionic-tutorial" />);

    const trigger = screen.getByRole("button", { name: /choose tutorial space/ });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    const listbox = screen.getByRole("listbox", { name: "Tutorial spaces" });
    const current = within(listbox).getByRole("option", { name: /Ionic Tutorial/ });
    expect(current).toHaveAttribute("aria-current", "true");
    const pos = within(listbox).getByRole("option", { name: /Ionic POS/ });
    expect(within(pos).getByRole("link")).toHaveAttribute("href", "/tutorial?space=ionic-pos");
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("listbox", { name: "Tutorial spaces" })).not.toBeInTheDocument();
  });

  it("falls back to the current space only when the space list is unavailable", async () => {
    const user = userEvent.setup();
    render(<TutorialPage payload={payload} spaces={null} defaultSpace="ionic-tutorial" />);
    await user.click(screen.getByRole("button", { name: /choose tutorial space/ }));
    const listbox = screen.getByRole("listbox", { name: "Tutorial spaces" });
    expect(within(listbox).getAllByRole("option")).toHaveLength(1);
    expect(within(listbox).getByRole("option", { name: /Ionic Tutorial/ })).toHaveAttribute("aria-current", "true");
  });

  it("scopes every navigation, pager, and search link with ?space= for a non-default space", async () => {
    const user = userEvent.setup();
    const posPayload = { ...payload, space: { ...payload.space, slug: "ionic-pos", title: "Ionic POS" } };
    render(<TutorialPage payload={posPayload} spaces={null} defaultSpace="ionic-tutorial" />);

    const posNav = screen.getByRole("navigation", { name: "Documentation navigation" });
    expect(within(posNav).getByRole("link", { name: "Welcome" })).toHaveAttribute("href", "/tutorial/welcome?space=ionic-pos");
    expect(screen.getByRole("link", { name: /Next Runtime Article/ })).toHaveAttribute("href", "/tutorial/runtime-article?space=ionic-pos");
    await user.click(screen.getByRole("button", { name: "Open search" }));
    const dialog = screen.getByRole("dialog", { name: "Search documentation" });
    expect(within(dialog).getByRole("link", { name: /Runtime Article/ })).toHaveAttribute("href", "/tutorial/runtime-article?space=ionic-pos");
  });

  it("hides sidebar categories that have no published articles", () => {
    const emptyGroup = { title: "Empty Category", slug: "empty", sort_order: 9, subcategories: [] };
    const withEmpty = { ...payload, navigation: [...payload.navigation, emptyGroup] };
    render(<TutorialPage payload={withEmpty} />);
    expect(screen.queryByRole("button", { name: /Empty Category/ })).not.toBeInTheDocument();
  });

  it("shows an empty state and paginates search results", async () => {
    const user = userEvent.setup();
    const manyArticles = Array.from({ length: 10 }, (_, index) => ({ title: `Article ${index + 1}`, slug: `article-${index + 1}`, summary: "Match me", sort_order: index + 1 }));
    const manyPayload = { ...payload, navigation: [{ title: "Many", slug: "many", sort_order: 1, subcategories: [{ title: "All", slug: "all", sort_order: 1, articles: manyArticles }] }] };
    render(<TutorialPage payload={manyPayload} />);
    await user.click(screen.getByRole("button", { name: "Open search" }));
    const dialog = screen.getByRole("dialog", { name: "Search documentation" });
    const searchbox = within(dialog).getByRole("searchbox");
    await user.type(searchbox, "match");
    expect(within(dialog).getByText(/Showing 1–8 of 10/)).toBeInTheDocument();
    const next = within(dialog).getByRole("button", { name: "Next" });
    expect(within(dialog).getByRole("button", { name: "Previous" })).toBeDisabled();
    await user.click(next);
    expect(within(dialog).getByText(/Showing 9–10 of 10/)).toBeInTheDocument();
    expect(within(dialog).getByRole("link", { name: /Article 10/ })).toBeInTheDocument();
    expect(next).toBeDisabled();
    await user.clear(searchbox);
    await user.type(searchbox, "zzz-no-match");
    expect(within(dialog).getByText(/No results for/)).toBeInTheDocument();
  });

  it("hides the brand logo in the header when it fails to load", () => {
    render(<TutorialPage payload={payload} />);
    const brand = screen.getByRole("button", { name: "Ionic Tutorial — choose tutorial space" });
    const brandImg = brand.querySelector("img");
    expect(brandImg).not.toBeNull();
    fireEvent.error(brandImg as HTMLImageElement);
    expect(brandImg).toHaveStyle({ display: "none" });
  });

  it("hides a broken space logo in the dropdown instead of showing a broken-image icon", async () => {
    const user = userEvent.setup();
    const spaces = [
      { title: "Ionic Tutorial", slug: "ionic-tutorial", route_prefix: "/tutorial" },
      {
        title: "Ionic POS",
        slug: "ionic-pos",
        route_prefix: "/tutorial",
        short_description: "Point of sale docs",
        logo: "/assets/ionic_tutorial/content/spaces/ionic-pos/assets/logo.svg",
      },
    ];
    render(<TutorialPage payload={payload} spaces={spaces} defaultSpace="ionic-tutorial" />);
    await user.click(screen.getByRole("button", { name: "Ionic Tutorial — choose tutorial space" }));
    const posOption = screen.getByRole("option", { name: /Ionic POS/ });
    const posImg = posOption.querySelector("img");
    expect(posImg).not.toBeNull();
    expect(posImg).toHaveAttribute("src", "/assets/ionic_tutorial/content/spaces/ionic-pos/assets/logo.svg");
    fireEvent.error(posImg as HTMLImageElement);
    expect(posImg).toHaveStyle({ display: "none" });
  });
});
