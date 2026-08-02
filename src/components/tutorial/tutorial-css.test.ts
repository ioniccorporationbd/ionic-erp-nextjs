import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("tutorial mobile content styles", () => {
  it("wraps phone-entered long unbroken article text instead of overflowing", () => {
    const css = readFileSync(join(process.cwd(), "src/components/tutorial/tutorial.module.css"), "utf8");

    expect(css).toContain("overflow-wrap: anywhere");
    expect(css).toContain("word-break: break-word");
  });
});
