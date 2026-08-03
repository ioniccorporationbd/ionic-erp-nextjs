import { render, screen, within } from "@testing-library/react";
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
    body_markdown: "## Install\n\nLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLong\n\n```bash\nbench --site next.ionicerp.xyz migrate\n```\n\n| Key | Value |\n| --- | --- |\n| Space | ionic-tutorial |\n\n> Note for admins\n\n[External](https://example.com) and [bad](javascript:alert(1)).",
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
  it("renders API-driven navigation, safe markdown, search, pager, and theme interactions", async () => {
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

    await user.click(screen.getByRole("button", { name: "Toggle theme" }));
    expect(localStorage.getItem("ionic-tutorial-theme")).toBe("dark");

    await user.click(screen.getByRole("button", { name: "Copy link to Install" }));
    expect(writeText).toHaveBeenCalledWith(expect.stringContaining("#install"));
  });
});
