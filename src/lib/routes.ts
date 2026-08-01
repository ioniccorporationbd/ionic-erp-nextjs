export const routes = {
  home: "/",
  contact: "/contact",
  manufacturing: "/manufacturing-industry-ionic-erp-software",
  healthcare: "/healthcare",
  trading: "/trading-ionic-erp",
  chemical: "/chemical-industry-ionic-erp",
  loan: "/lone-management-ionic-erp",
  agriculture: "/agriculture-ionic-erp",
  services: "/all-services-ionic-erp",
  tutorial: "/tutorial",
} as const;

export type PublicRoute = (typeof routes)[keyof typeof routes];
