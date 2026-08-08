import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TutorialHeader } from "./TutorialPage";

const basePayload = {
  schema_version: "v1",
  space: {
    title: "Ionic ERP",
    slug: "ionic-erp",
    route_prefix: "/erp-tutorial",
    source_app: "ionic_tutorial",
    logo: "/assets/tutorial/frappe-hr-logo.png",
    short_description: "desc",
    learn_url: "/erp-tutorial/introduction",
    discuss_url: "https://github.com/ioniccorporationbd/ionic_tutorial/discussions",
    website_url: "https://next.ionicerp.xyz",
    github_url: "https://github.com/ioniccorporationbd/ionic_tutorial",
  },
  navigation: [],
  default_article_slug: "introduction",
  last_modified: "x",
  article: null as never,
  table_of_contents: [],
  breadcrumbs: [],
  previous_article: null,
  next_article: null,
};

describe("Learn link redirect (relative learn_url)", () => {
  it("redirects relative learn_url to the space home with ?space=", () => {
    render(
      <TutorialHeader
        payload={basePayload as never}
        spaces={null}
        defaultSpace="ionic-tutorial"
        theme="light"
        onToggleTheme={() => {}}
        onOpenSearch={() => {}}
        onOpenMenu={() => {}}
      />
    );
    const learn = screen.getByRole("link", { name: "Learn" });
    expect(learn.getAttribute("href")).toBe("/tutorial?space=ionic-erp");
  });

  it("keeps external learn_url untouched", () => {
    const external = {
      ...basePayload,
      space: { ...basePayload.space, learn_url: "https://docs.frappe.io" },
    };
    render(
      <TutorialHeader
        payload={external as never}
        spaces={null}
        defaultSpace="ionic-tutorial"
        theme="light"
        onToggleTheme={() => {}}
        onOpenSearch={() => {}}
        onOpenMenu={() => {}}
      />
    );
    const learn = screen.getByRole("link", { name: "Learn" });
    expect(learn.getAttribute("href")).toBe("https://docs.frappe.io");
  });
});
