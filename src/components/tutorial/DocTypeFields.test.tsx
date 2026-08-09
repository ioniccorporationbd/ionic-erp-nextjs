import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DocTypeFields } from "./DocTypeFields";
import { mockTutorialPages } from "@/lib/tutorial-mock";

describe("DocTypeFields", () => {
  it("renders a collapsible panel with all three DocTypes and every field row", () => {
    render(<DocTypeFields payload={mockTutorialPages.welcome} />);

    const region = screen.getByRole("region", { name: /DocType Fields/ });
    const groups = within(region).getAllByRole("article");
    expect(groups).toHaveLength(3);

    // Space: 16 rows, category: 6 rows, article: 10 rows
    expect(within(groups[0]).getAllByRole("term")).toHaveLength(16);
    expect(within(groups[1]).getAllByRole("term")).toHaveLength(6);
    expect(within(groups[2]).getAllByRole("term")).toHaveLength(10);
  });

  it("shows every Article field value from the payload", () => {
    render(<DocTypeFields payload={mockTutorialPages.welcome} />);
    const region = screen.getByRole("region", { name: /DocType Fields/ });
    const articleGroup = within(region).getAllByRole("article")[2];

    expect(within(articleGroup).getByText("body_markdown")).toBeInTheDocument();
    expect(within(articleGroup).getByText("getting-started")).toBeInTheDocument();
    expect(within(articleGroup).getByText("2026-08-02 00:00:00")).toBeInTheDocument();
  });

  it("links http(s) URL fields safely and keeps content:// values as plain text", () => {
    render(<DocTypeFields payload={mockTutorialPages.welcome} />);
    const region = screen.getByRole("region", { name: /DocType Fields/ });
    const spaceGroup = within(region).getAllByRole("article")[0];

    const discuss = within(spaceGroup).getByRole("link", {
      name: "https://github.com/ioniccorporationbd/ionic_tutorial/discussions",
    });
    expect(discuss).toHaveAttribute("target", "_blank");
    expect(discuss).toHaveAttribute("rel", expect.stringContaining("noopener"));

    // source_url is content:// → rendered as text, not a link
    const articleGroup = within(region).getAllByRole("article")[2];
    expect(within(articleGroup).getByText("content://ionic-tutorial/articles/welcome.md")).toBeInTheDocument();
  });

  it("marks fields without a value as missing (—)", () => {
    render(<DocTypeFields payload={mockTutorialPages.welcome} />);
    const region = screen.getByRole("region", { name: /DocType Fields/ });
    const groups = within(region).getAllByRole("article");

    // space mock lacks source_base_url + attribution_text + theme_config_json +
    // default_article + published + sort_order (6); category: published;
    // article: source_hash + published (2)
    expect(within(groups[0]).getAllByText("—")).toHaveLength(6);
    expect(within(groups[1]).getAllByText("—")).toHaveLength(1);
    expect(within(groups[2]).getAllByText("—")).toHaveLength(2);
    expect(within(region).getAllByText(/public API-তে নেই \/ খালি/)).toHaveLength(9);
  });

  it("expands and collapses on click of the summary", () => {
    render(<DocTypeFields payload={mockTutorialPages.welcome} />);
    const summary = screen.getByText(/DocType Fields/);
    const details = summary.closest("details")!;

    expect(details.open).toBe(false);
    fireEvent.click(summary);
    expect(details.open).toBe(true);
    fireEvent.click(summary);
    expect(details.open).toBe(false);
  });
});
