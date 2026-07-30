import { describe, expect, it } from "vitest";
import { routes } from "@/lib/routes";

describe("public route registry", () => {
  it("preserves all source public URLs", () => {
    expect(Object.values(routes)).toEqual([
      "/",
      "/contact",
      "/manufacturing-industry-ionic-erp-software",
      "/healthcare",
      "/trading-ionic-erp",
      "/chemical-industry-ionic-erp",
      "/lone-management-ionic-erp",
      "/agriculture-ionic-erp",
      "/all-services-ionic-erp",
    ]);
  });

  it("contains no duplicate route values", () => {
    const values = Object.values(routes);
    expect(new Set(values).size).toBe(values.length);
  });
});
