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
      articles: [
        { title: "Welcome", slug: "welcome", summary: "Start", sort_order: 1 },
        { title: "Runtime Article", slug: "runtime-article", summary: "New", sort_order: 2 },
      ],
    },
  ],
  article: {
    title: "Welcome",
    slug: "welcome",
    summary: "Start here",
    body_sections: [
      {
        section_title: "Install",
        section_description: "LongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLong\n\n```bash\nbench --site next.ionicerp.xyz migrate\n```\n\n| Key | Value |\n| --- | --- |\n| Space | ionic-tutorial |\n\n> Note for admins\n\n[External](https://example.com) and [bad](javascript:alert(1)).",
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
    expect(screen.getByRole("complementary", { name: "On this page" })).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("link", { name: "Welcome" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Welcome" })).toHaveAttribute("data-prefetch", "false");
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

  it("renders structured Body Sections (child table) when present, skipping the markdown body", () => {
    const sectionPayload: TutorialPagePayload = {
      ...payload,
      article: {
        ...payload.article,
        body_sections: [
          {
            section_title: "Getting Started",
            section_subtitle: "First steps",
            section_image: "https://example.com/a.png",
            section_video_link: "https://www.youtube.com/watch?v=abc123",
            section_description: "Install the app and log in.",
            section_link_title: "Full setup guide",
            section_link: "https://example.com/setup",
          },
          {
            section_title: "Unsafe Section",
            section_image: "javascript:alert(1)",
            section_video_link: "chrome://settings",
            section_link: "javascript:alert(2)",
          },
        ],
      },
    };
    render(<TutorialPage payload={sectionPayload} />);

    // The article title becomes the page h1 when sections are present
    expect(screen.getByRole("heading", { level: 1, name: "Welcome" })).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 2, name: /Getting Started/ })).toBeInTheDocument();
    expect(screen.getByText("First steps")).toBeInTheDocument();
    expect(screen.getByText("Install the app and log in.")).toBeInTheDocument();

    // The markdown body is NOT rendered for section-based articles
    expect(screen.queryByText("bench --site next.ionicerp.xyz migrate")).not.toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();

    // Safe image renders lazily; video renders as an external link
    const image = screen.getByAltText("Getting Started");
    expect(image).toHaveAttribute("src", "https://example.com/a.png");
    expect(image).toHaveAttribute("loading", "lazy");
    const video = screen.getByRole("link", { name: "▶ Watch video" });
    expect(video).toHaveAttribute("href", "https://www.youtube.com/watch?v=abc123");
    expect(video).toHaveAttribute("target", "_blank");
    expect(video).toHaveAttribute("rel", expect.stringContaining("noopener"));

    // Section link renders with its title
    expect(screen.getByRole("link", { name: "Full setup guide" })).toHaveAttribute("href", "https://example.com/setup");

    // Unsafe section URLs are dropped entirely
    expect(screen.queryByAltText("Unsafe Section")).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Learn more" })).not.toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "▶ Watch video" })).toHaveLength(1);
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

    expect(screen.getByRole("link", { name: "Welcome" })).toHaveAttribute("href", "/tutorial/welcome?space=ionic-pos");
    expect(screen.getByRole("link", { name: /Next Runtime Article/ })).toHaveAttribute("href", "/tutorial/runtime-article?space=ionic-pos");
    await user.click(screen.getByRole("button", { name: "Open search" }));
    const dialog = screen.getByRole("dialog", { name: "Search documentation" });
    expect(within(dialog).getByRole("link", { name: /Runtime Article/ })).toHaveAttribute("href", "/tutorial/runtime-article?space=ionic-pos");
  });

  it("hides sidebar categories that have no published articles", () => {
    const emptyGroup = { title: "Empty Category", slug: "empty", sort_order: 9, articles: [] };
    const withEmpty = { ...payload, navigation: [...payload.navigation, emptyGroup] };
    render(<TutorialPage payload={withEmpty} />);
    expect(screen.queryByRole("button", { name: /Empty Category/ })).not.toBeInTheDocument();
  });

  it("shows an empty state and paginates search results", async () => {
    const user = userEvent.setup();
    const manyArticles = Array.from({ length: 10 }, (_, index) => ({ title: `Article ${index + 1}`, slug: `article-${index + 1}`, summary: "Match me", sort_order: index + 1 }));
    const manyPayload = { ...payload, navigation: [{ title: "Many", slug: "many", sort_order: 1, articles: manyArticles }] };
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
